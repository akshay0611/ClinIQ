# Security Policy

## Supported Versions

Currently, only the `main` branch is receiving security updates.

| Version | Supported          |
| ------- | ------------------ |
| `main`  | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

Security is a top priority for ClinIQ, especially given the sensitive nature of healthcare data.

If you discover any security vulnerability in this project, please **do not** report it by opening a public GitHub issue. 
Instead, please open a draft security advisory if GitHub Advanced Security is enabled, or contact the maintainers directly.

Please provide the following details in your report:
- A description of the vulnerability.
- Steps to reproduce the issue.
- Potential impact (especially regarding patient data exposure).
- Any suggested mitigations.

We will endeavor to respond to your report within 48 hours and provide an estimated timeline for a patch.

## Secure Usage & HIPAA Compliance
ClinIQ is a foundational platform. If deploying this to production to handle real patient data, you **must** ensure the surrounding infrastructure (e.g., Supabase) is configured securely with encryption at rest, proper Role-Based Access Control (RBAC), and Row Level Security (RLS) policies to meet HIPAA standards.
