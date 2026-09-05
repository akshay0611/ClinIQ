

## Overview

EduLinkUp acts as the trusted Identity Provider (IdP) for all ELU Build SaaS applications. Each SaaS has its own Supabase project and Supabase Auth instance. SSO is implemented using standards-based **OAuth 2.1 / OpenID Connect**, with Supabase providing both sides of the federation.

> **Verification Status**: All API names, endpoints, and flows in this document have been verified against the current Supabase documentation (as of August 2026). See [Verification Notes](#verification-notes) for details.

---

## Target Architecture

```
                    EduLinkUp
                ┌────────────────┐
                │ Supabase Auth  │
                │ OAuth 2.1      │
                │ Server (IdP)   │
                └───────┬────────┘
                        │
                     OIDC SSO
                        │
            ┌───────────┴───────────┐
            │                       │
     ┌──────▼──────┐        ┌───────▼─────┐
     │ Resume SaaS │        │ Other SaaS  │
     │ Supabase B  │        │ Supabase C  │
     │ (RP)        │        │ (RP)        │
     └─────────────┘        └─────────────┘
            │                       │
            ▼                       ▼
 resume.edulinkup.dev       app.edulinkup.dev
```

---

## How It Works

Supabase provides two native features that solve this without any custom auth server:

| Role | Supabase Feature | Configured On |
|------|-----------------|---------------|
| Identity Provider (IdP) | **OAuth 2.1 Server** | EduLinkUp's Supabase project |
| Relying Party (RP) | **Custom OIDC Providers** | Each SaaS's Supabase project |

### SSO Flow

```
resume.edulinkup.dev (SaaS)
  │
  ├─ No local Supabase session?
  │
  ├─ signInWithOAuth({ provider: 'custom:edulinkup' })
  │     ↓
  │  EduLinkUp Supabase OAuth authorize endpoint
  │     ↓
  │  User already logged into edulinkup.dev?
  │     ├─ YES → auto-approve → redirect back with code
  │     └─ NO → show EduLinkUp login → approve → redirect back with code
  │     ↓
  │  SaaS Supabase exchanges code for tokens (PKCE)
  │     ↓
  │  SaaS Supabase creates local session
  │     ↓
  │  User is now authenticated in the SaaS
  │  with its OWN Supabase Auth session
```

---

## Implementation Plan

### Phase 1: EduLinkUp Supabase (Identity Provider)

#### 1.1 Enable OAuth 2.1 Server

1. Go to **Authentication → OAuth Server** in EduLinkUp's Supabase Dashboard
2. Enable OAuth 2.1 server capabilities
3. Set **Authorization Path** to `/oauth/consent`
4. Configure **asymmetric JWT signing keys** (RS256) — required for OIDC ID tokens

#### 1.2 Configure Asymmetric JWT Signing

ID tokens require asymmetric algorithms (RS256 or ES256). The default HS256 will not work for OIDC.

Go to **Authentication → Providers → JWT Signing Key** and migrate to RS256 or ES256.

#### 1.3 Build the Consent UI

Create an `/oauth/consent` page on edulinkup.dev that:

1. Extracts `authorization_id` from the URL query parameter
2. Checks if the user is authenticated; if not, redirects to login (preserving `authorization_id`)
3. Calls `supabase.auth.oauth.getAuthorizationDetails(authorization_id)` to fetch client info
4. Shows consent screen (or auto-approves for first-party ELU Build apps)
5. Calls `supabase.auth.oauth.approveAuthorization(authorization_id)` to approve
6. Redirects user to the returned `redirect_url`

**For seamless SSO between EduLinkUp-owned apps**, auto-approve without showing a consent screen. The consent UI only needs to be shown when untrusted third-party apps request access.

#### 1.4 Register Each SaaS as an OAuth Client

Via Dashboard → Authentication → OAuth Apps, or programmatically:

```javascript
const { data, error } = await supabase.auth.admin.oauth.createClient({
  name: 'ELU Build - Resume Builder',
  redirect_uris: [
    'https://resume.edulinkup.dev/auth/callback'
  ],
  client_type: 'confidential',  // or 'public' for SPAs
  token_endpoint_auth_method: 'client_secret_basic',  // for confidential
})
```

Store the returned `client_id` and `client_secret` securely. These credentials are used by the SaaS to configure its Custom OIDC Provider.

### Phase 2: SaaS Supabase (Relying Party)

#### 2.1 Register EduLinkUp as Custom OIDC Provider

On each SaaS's Supabase project, add EduLinkUp as a custom OIDC provider:

```javascript
const { data, error } = await supabase.auth.admin.customProviders.createProvider({
  provider_type: 'oidc',
  identifier: 'custom:edulinkup',
  name: 'EduLinkUp SSO',
  client_id: '<oauth-client-id-from-phase-1.4>',
  client_secret: '<oauth-client-secret-from-phase-1.4>',
  issuer: 'https://<edulinkup-project-ref>.supabase.co/auth/v1',
  scopes: ['openid', 'email', 'profile'],
})
```

#### 2.2 Build Auth Callback Route

Create an `/auth/callback` page in the SaaS that:

1. Receives the OAuth redirect with `code` and `state` parameters
2. The Supabase SDK automatically exchanges the authorization code for tokens using PKCE
3. Creates a local Supabase Auth session in the SaaS project
4. Redirects the user into the application

#### 2.3 SSO Trigger Logic

On app load, check for an existing SaaS session. If none exists, redirect to EduLinkUp SSO:

```javascript
const { data: { session } } = await supabase.auth.getSession()

if (!session) {
  await supabase.auth.signInWithOAuth({
    provider: 'custom:edulinkup',
    options: {
      redirectTo: 'https://resume.edulinkup.dev/auth/callback'
    }
  })
}
```

### Phase 3: POC Implementation (ClinIQ)

The current ClinIQ codebase is a **Vite + React SPA** (not Next.js), which simplifies implementation — no server-side middleware or SSR concerns.

#### Files to Create/Modify

| File | Purpose |
|------|---------|
| `src/pages/OAuthCallback.tsx` | Handles OAuth redirect, exchanges code for session |
| `src/pages/OAuthConsent.tsx` | Consent UI on EduLinkUp side (if building the IdP) |
| `src/services/supabaseClient.ts` | Already exists — no changes needed |
| `src/context/AuthContext.tsx` | Add SSO login method, handle `custom:edulinkup` provider |
| `src/App.tsx` | Add `/auth/callback` and `/oauth/consent` routes |
| `src/pages/Login.tsx` | Add "Sign in with EduLinkUp" button |

#### OAuthCallback.tsx

```tsx
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../services/supabaseClient'

export default function OAuthCallback() {
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        navigate('/profile')
      }
    })
  }, [navigate])

  return <div>Completing sign-in...</div>
}
```

#### Login.tsx — Add SSO Button

```tsx
async function handleEduLinkUpSSO() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'custom:edulinkup',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`
    }
  })
  if (error) console.error('SSO error:', error)
}
```

#### AuthContext.tsx — Add SSO Awareness

```typescript
// Add to AuthContext
const signInWithEduLinkUp = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'custom:edulinkup',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`
    }
  })
  if (error) throw error
}
```

#### App.tsx — Add Routes

```tsx
<Route path="/auth/callback" element={<OAuthCallback />} />
<Route path="/oauth/consent" element={<OAuthConsent />} />
```

---

## Onboarding a New SaaS

When a new winning project joins ELU Build:

1. **EduLinkUp side**: Register new OAuth client with the SaaS's redirect URI → get `client_id` + `client_secret`
2. **SaaS side**: Configure Custom OIDC Provider with the EduLinkUp issuer URL + the client credentials
3. **Done** — SSO works identically for all SaaS apps

### Scalability: Future SaaS Apps

```
resume.edulinkup.dev      ← same SSO contract
finance.edulinkup.dev     ← same SSO contract
planner.edulinkup.dev     ← same SSO contract
analytics.edulinkup.dev   ← same SSO contract
```

All apps follow the same pattern. EduLinkUp is the single identity source. Each SaaS has its own Supabase project with its own database, users, and RLS policies.

---

## Developer SDK (ELU Auth Starter Template)

For ELU Build participants, provide a starter template:

```
elu-auth-starter/
├── src/
│   ├── services/
│   │   └── elu-sso.ts           # SSO helper functions
│   ├── pages/
│   │   └── AuthCallback.tsx     # OAuth callback handler
│   └── config/
│       └── elu-auth.ts          # ELU_APP_ID, ELU_REDIRECT_URI config
├── .env.example                 # VITE_ELU_SUPABASE_URL, etc.
└── README.md                    # Integration guide
```

### elu-auth.ts

```typescript
export const ELU_AUTH_CONFIG = {
  edulinkupIssuer: import.meta.env.VITE_EDU_SUPABASE_URL,
  providerIdentifier: 'custom:edulinkup',
  callbackPath: '/auth/callback',
  get callbackUrl() {
    return `${window.location.origin}${this.callbackPath}`
  }
}
```

### elu-sso.ts

```typescript
import { supabase } from './supabaseClient'
import { ELU_AUTH_CONFIG } from '../config/elu-auth'

export async function signInWithEduLinkUp() {
  return supabase.auth.signInWithOAuth({
    provider: ELU_AUTH_CONFIG.providerIdentifier as any,
    options: {
      redirectTo: ELU_AUTH_CONFIG.callbackUrl
    }
  })
}

export async function handleEduLinkUpCallback() {
  const { data: { session }, error } = await supabase.auth.getSession()
  if (error) throw error
  return session
}
```

---

## Supabase Configuration Summary

### EduLinkUp Project (IdP)

| Setting | Value |
|---------|-------|
| OAuth 2.1 Server | Enabled |
| Authorization Path | `/oauth/consent` |
| JWT Signing | RS256 or ES256 (asymmetric) |
| Site URL | `https://edulinkup.dev` |

### Each SaaS Project (RP)

| Setting | Value |
|---------|-------|
| Custom OIDC Provider | `custom:edulinkup` |
| Issuer | `https://<edulinkup-project-ref>.supabase.co/auth/v1` |
| Scopes | `openid`, `email`, `profile` |
| PKCE | Enabled (default) |

---

## Security Considerations

1. **PKCE mandatory** — Supabase OAuth 2.1 enforces PKCE, preventing authorization code interception attacks
2. **Asymmetric JWT signing** — Use RS256/ES256 on EduLinkUp so SaaS apps validate tokens via JWKS without shared secrets
3. **No database sharing** — Each SaaS has its own Supabase project with its own `auth.users` table
4. **No token forwarding** — The SaaS Supabase creates its own session; EduLinkUp tokens are only used during the OAuth exchange
5. **RLS isolation** — Each SaaS can use the `client_id` claim in RLS policies to control OAuth client access
6. **Redirect URI validation** — Exact-match only, no wildcards; register each SaaS domain precisely
7. **Authorization codes** — Short-lived (10 minutes), single-use, PKCE-bound
8. **Consent flow** — For first-party ELU Build apps, auto-approve is acceptable; for untrusted third-party apps, show consent UI

### Public vs Confidential Clients

| Client Type | Use Case | Security Model |
|-------------|----------|----------------|
| **Public** | Pure SPAs (Vite + React, no server) | PKCE only, no client secret |
| **Confidential** | Next.js apps with server components | Client secret + PKCE |

For the POC (ClinIQ as Vite SPA), use a **public client** to avoid storing secrets in client-side code. For production ELU Build apps with a server component, use **confidential clients** with `client_secret_basic`.

---

## Endpoints Reference

### EduLinkUp (IdP) Endpoints

| Endpoint | URL |
|----------|-----|
| Authorization | `https://<ref>.supabase.co/auth/v1/oauth/authorize` |
| Token | `https://<ref>.supabase.co/auth/v1/oauth/token` |
| JWKS | `https://<ref>.supabase.co/auth/v1/.well-known/jwks.json` |
| OIDC Discovery | `https://<ref>.supabase.co/auth/v1/.well-known/openid-configuration` |
| UserInfo | `https://<ref>.supabase.co/auth/v1/oauth/userinfo` |

### SaaS (RP) Callback

| Endpoint | URL |
|----------|-----|
| Auth Callback | `https://<saas-domain>/auth/callback` |

---

## Verification Notes

All items verified against current Supabase documentation (August 2026):

### 1. OAuth 2.1 Server as OIDC IdP — CONFIRMED

Supabase Auth can act as an OAuth 2.1 and OpenID Connect (OIDC) identity provider. Feature is in **public beta** (since November 2025). Exposes standard OIDC endpoints including `/.well-known/openid-configuration`.

### 2. Custom OIDC Providers consuming Supabase OAuth — CONFIRMED

Custom OIDC Providers (launched April 2026) can consume any standards-compliant OIDC provider. A Supabase project with OAuth 2.1 Server enabled exposes valid OIDC discovery, making it a valid issuer for Custom OIDC Providers on other Supabase projects.

### 3. Exact API Names — CONFIRMED

| API | Signature | Source |
|-----|-----------|--------|
| Register OAuth client | `supabase.auth.admin.oauth.createClient({ name, redirect_uris, client_type, token_endpoint_auth_method })` | [OAuth Admin API docs](https://supabase.com/docs/reference/javascript/auth-admin) |
| Create custom OIDC provider | `supabase.auth.admin.customProviders.createProvider({ provider_type, identifier, name, client_id, client_secret, issuer, scopes })` | [Custom OIDC Providers docs](https://supabase.com/docs/guides/auth/custom-oauth-providers) |
| Client-side SSO | `supabase.auth.signInWithOAuth({ provider: 'custom:my-provider' })` | [signInWithOAuth docs](https://supabase.com/docs/reference/javascript/auth-signinwithoauth) |
| Consent approval | `supabase.auth.oauth.approveAuthorization(authorizationId)` | [OAuth Server docs](https://supabase.com/docs/guides/auth/oauth-server) |
| Consent details | `supabase.auth.oauth.getAuthorizationDetails(authorizationId)` | [OAuth Server docs](https://supabase.com/docs/guides/auth/oauth-server) |

All admin APIs require a `secret` key and must only be called server-side.

### 4. Vite/React OAuth Callback — CONFIRMED

For client-side SPAs (Vite + React):
- `signInWithOAuth` with `redirectTo` pointing to `/auth/callback`
- On callback, the Supabase SDK **automatically exchanges** the auth code for a session (PKCE handled internally)
- Use `onAuthStateChange` to detect `SIGNED_IN` event and redirect user
- `exchangeCodeForSession(code)` is available for server-side or manual exchange if needed

### 5. Endpoint URLs — CONFIRMED

| Endpoint | URL |
|----------|-----|
| Authorization | `https://<project-ref>.supabase.co/auth/v1/oauth/authorize` |
| Token | `https://<project-ref>.supabase.co/auth/v1/oauth/token` |
| JWKS | `https://<project-ref>.supabase.co/auth/v1/.well-known/jwks.json` |
| OIDC Discovery | `https://<project-ref>.supabase.co/auth/v1/.well-known/openid-configuration` |
| UserInfo | `https://<project-ref>.supabase.co/auth/v1/oauth/userinfo` |
| Custom OIDC callback | `https://<project-ref>.supabase.co/auth/v1/callback` |

### 6. RS256/ES256 Requirement — CONFIRMED

ID tokens (OIDC) **require asymmetric signing algorithms** (RS256 or ES256). The default HS256 symmetric algorithm will cause ID token generation to fail. Must configure in **Authentication → Providers → JWT Signing Key** on the EduLinkUp project.

### 7. Public Client + PKCE — CONFIRMED

- PKCE is **mandatory** in OAuth 2.1 and enabled by default for all custom providers
- Public clients use `token_endpoint_auth_method: 'none'` (no client secret)
- PKCE code challenge/verifier is handled automatically by the Supabase SDK
- Suitable for pure SPAs (Vite + React)

### 8. Direct Navigation SSO — CONFIRMED

When visiting `resume.edulinkup.dev` directly:
1. Check for existing SaaS session
2. If none, redirect to `signInWithOAuth({ provider: 'custom:edulinkup' })`
3. User arrives at EduLinkUp's OAuth authorize endpoint
4. If user has an active EduLinkUp session, consent is auto-approved (or shown once)
5. Redirected back to SaaS with auth code
6. SaaS Supabase exchanges code and creates local session

---

## Phased Rollout

| Phase | Scope | Deliverable |
|-------|-------|-------------|
| **Phase 1** | EduLinkUp IdP setup | OAuth 2.1 Server enabled, consent UI, client registration |
| **Phase 2** | SaaS RP setup | Custom OIDC Provider, callback route, SSO trigger |
| **Phase 3** | POC validation | ClinIQ SSO flow working end-to-end |
| **Phase 4** | SDK + onboarding | ELU Auth starter template for participants |
