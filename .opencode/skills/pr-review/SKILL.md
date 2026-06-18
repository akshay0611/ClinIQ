---
name: pr-review
description: >
  Reviews pull requests for the ClinIQ healthcare platform (ELUSOC 2026).
  Performs structured code review covering correctness, security (HIPAA/RLS),
  React/TypeScript best practices, Tailwind consistency, and PR hygiene.
  Drafts a review comment for maintainer approval before posting.
  Use when user says "review pr", "review pull request", "check pr",
  "pr feedback", "check this PR", "is my PR ready", "feedback on PR",
  "review #N", "look at this contribution", or provides a PR number or
  GitHub PR URL for the ClinIQ repository.
---

## Core Rules

1. **Draft before posting.** Never post a review directly.
   Always show the full review to the maintainer and wait for
   explicit confirmation before running `gh pr review`.
2. **Read the full file, not just the diff.** Diffs are misleading
   without surrounding context.
3. **Tone is constructive, not critical.** Contributors are students
   making their first open source contributions. Every review must
   include genuine positive observations alongside issues.
4. **Check CONTRIBUTING.md compliance.** ELUSOC PRs must follow
   the contribution guidelines.
5. **Security findings are always BLOCKERs.** Healthcare data —
   no exceptions.

---

## Workflow

### Step 1 — Gather PR context

```bash
# PR metadata
gh pr view <PR_NUMBER> \
  --repo akshay0611/ClinIQ \
  --json title,body,state,additions,deletions,changedFiles,\
baseRefName,headRefName,url,author,labels,reviewDecision

# Full diff
gh pr diff <PR_NUMBER> --repo akshay0611/ClinIQ

# CI status
gh pr checks <PR_NUMBER> --repo akshay0611/ClinIQ

# Existing reviews (avoid duplicate feedback)
gh api repos/akshay0611/ClinIQ/pulls/<PR_NUMBER>/reviews
```

### Step 2 — Read changed files in full

```bash
gh pr view <PR_NUMBER> --repo akshay0611/ClinIQ \
  --json files --jq '.files[].path'
```

Read every changed file completely — not just the diff lines.

### Step 3 — Check CONTRIBUTING.md compliance

```bash
gh api repos/akshay0611/ClinIQ/contents/CONTRIBUTING.md \
  --jq '.content' | base64 -d
```

Check:
- [ ] Branch naming follows guidelines
- [ ] Commit message format is correct
- [ ] PR template is filled out (not left as placeholder text)
- [ ] Issue is linked if required
- [ ] Screenshots provided for UI changes

---

### Step 4 — Review checklist

Flag issues by severity:
- **BLOCKER** — Must fix before merge (bugs, security, data loss)
- **WARNING** — Should fix, not a hard gate
- **NIT** — Minor suggestion, completely optional

#### A. PR Hygiene
- [ ] Title follows `type: description` convention
- [ ] Description explains what and why (not just "fixed bug")
- [ ] Related issue linked (`Closes #N`)
- [ ] Branch name follows convention
- [ ] UI changes include screenshots
- [ ] Testing steps are realistic and specific
- [ ] PR checklist completed (no unchecked boxes left as placeholders)

#### B. Correctness
- [ ] Code does what the PR description claims
- [ ] Edge cases handled (empty arrays, null values, loading states)
- [ ] No unreachable or dead code
- [ ] Async operations have try/catch or .catch()
- [ ] No stale closure bugs in useEffect/onClick
- [ ] Conditional rendering handles loading, error, empty, and success states
- [ ] No race conditions in async state updates

#### C. Security & Healthcare Data
> ClinIQ handles health information. These are non-negotiable.

- [ ] No secrets, API keys, or tokens in source
- [ ] Supabase queries filter by `user.id` (RLS compliance)
- [ ] Auth-gated routes use `ProtectedRoute`
- [ ] No `dangerouslySetInnerHTML` without sanitization
- [ ] PHI not logged to console (symptoms, diagnoses, health records)
- [ ] Gemini API calls don't send more data than necessary
- [ ] No raw `localStorage` for sensitive data (use `LocalStorageService`)
- [ ] No new `console.log` of email, tokens, or health data

#### D. React & TypeScript
- [ ] No `any` types without justification
- [ ] Props interfaces defined for reusable components
- [ ] useEffect has correct dependency array and cleanup
- [ ] No object/array literals created inside render
- [ ] Keys in `.map()` are stable IDs, not indices
- [ ] Lazy-loaded routes use `React.lazy()` + `Suspense`

#### E. Tailwind & UI Consistency
- [ ] Uses project color tokens (`primary-*`, `secondary-*`, `accent-*`, `neutral-*`)
- [ ] Dark mode variants present (`dark:` prefix)
- [ ] Responsive: mobile-first with `sm:`, `md:`, `lg:` breakpoints
- [ ] Animations use `framer-motion` (not raw CSS transitions)
- [ ] Icons use `lucide-react` only
- [ ] Interactive elements have `whileHover` and `whileTap`
- [ ] Focus styles accessible (`focus:ring-*`)

#### F. Error Handling & UX
- [ ] Loading states rendered (`PageLoader` or inline)
- [ ] Error states show user-friendly messages
- [ ] Empty states handled
- [ ] Form validation before submission
- [ ] Destructive actions have confirmation
- [ ] Toast notifications use `react-hot-toast`

#### G. Accessibility
- [ ] Keyboard navigable
- [ ] Form inputs have `<label>`
- [ ] Images have `alt` text
- [ ] Color not the sole state indicator
- [ ] Modals trap focus and handle Escape

---

### Step 5 — Draft the review

Structure:

```markdown
## Review: <PR Title>

<1-2 sentences on overall quality and verdict. Be specific and honest.>

### What looks great ✅
<Genuine specific observations — not generic praise.
Call out good patterns, clean code, thoughtful implementation.
Every review must have this section.>

### Blockers 🚫 (must fix before merge)
- **`file.ts:line`** — <issue and why it blocks>

### Suggestions 💡 (should fix)
- **`file.ts:line`** — <issue and suggested fix>

### Nits 🔧 (optional)
- **`file.ts:line`** — <minor suggestion>

### Verdict
<APPROVE | REQUEST_CHANGES | COMMENT>

<If REQUEST_CHANGES: end with an encouraging note that the
contributor is close and the feedback is to help them improve,
not a rejection.>
```

---

### Step 6 — ⛔ PAUSE — Confirm before posting

**Do NOT run `gh pr review` yet.**

Show the full drafted review and ask:
> "Here is the draft review for PR #N. Does this look correct?
> Reply 'approve', 'request-changes', or 'comment-only' to post it,
> or tell me what to change."

Wait for explicit instruction.

---

### Step 7 — Post the review (only after confirmation)

```bash
cat > /tmp/cliniq-review.md << 'EOF'
<confirmed review body>
EOF

# Based on maintainer instruction:
gh pr review <PR_NUMBER> --repo akshay0611/ClinIQ \
  --approve --body-file /tmp/cliniq-review.md

# or
gh pr review <PR_NUMBER> --repo akshay0611/ClinIQ \
  --request-changes --body-file /tmp/cliniq-review.md

# or
gh pr review <PR_NUMBER> --repo akshay0611/ClinIQ \
  --comment --body-file /tmp/cliniq-review.md
```

---

## ClinIQ-Specific Patterns

New code must follow these established patterns:

| Pattern | File |
|---------|------|
| Auth gating | `src/components/common/ProtectedRoute.tsx` |
| Supabase client | `src/services/supabaseClient.ts` — never create a second instance |
| Auth state | `useAuth()` from `src/context/AuthContext.tsx` |
| Theme | `useTheme()` from `src/context/ThemeContext.tsx` |
| Routing | `react-router-dom` v6 — `Routes`/`Route` in `App.tsx` |
| Lazy pages | `React.lazy()` + `Suspense` in `App.tsx` |
| Icons | `lucide-react` only |
| Animations | `framer-motion` |
| Toasts | `react-hot-toast` |
| Forms | `react-hook-form` for complex forms |
| Local storage | `src/services/LocalStorageService.ts` |
| AI integration | `src/services/GeminiSymptomService.ts` |
| Types | `src/types/index.ts` |

## Security Red Flags (Instant BLOCKER)

1. API keys or secrets in source
2. `console.log` of health data, tokens, or emails
3. Missing auth check on a route accessing user data
4. Raw `localStorage` for sensitive data
5. `dangerouslySetInnerHTML` without sanitization
6. Supabase queries without `user.id` filter
7. Gemini API call without error handling for missing key

## Healthcare Review Notes

- Medical disclaimers required on any health information feature
- AI outputs must be labeled informational, not diagnostic
- User consent required before processing health data
- Data minimization — collect only what the feature needs
- Never log symptoms, diagnoses, or health records anywhere

## Tone Guidelines for ELUSOC Contributors

These are student contributors making open source contributions,
possibly for the first time. Review tone matters:

- Always start with what they did well — be specific, not generic
- Frame issues as "this could be improved" not "this is wrong"
- For BLOCKERs, explain why it matters, not just that it's wrong
- End REQUEST_CHANGES reviews with encouragement
- Never comment on code style unless it violates a project pattern
- A good review teaches — include a brief explanation or example
  for every BLOCKER and WARNING