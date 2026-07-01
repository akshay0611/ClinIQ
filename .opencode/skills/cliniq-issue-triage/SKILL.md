---
name: cliniq-issue-triage
description: >
  Triages GitHub issues for the ClinIQ healthcare platform (ELUSOC 2026).
  Reads an issue, recommends the correct ELUSOC difficulty label
  (NEWBIE 10pts, ADVENTURER 25pts, or VETERAN 50pts), asks the maintainer
  who to assign, then applies the label and assignee via gh CLI.
  Use when the user shares a GitHub issue number or URL from akshay0611/ClinIQ
  and wants to label it, assign it, or respond to a contributor asking to be
  assigned. Triggers include: "triage this issue", "assign this", "what label
  for #N", "add label to issue", "assign to contributor", or when a screenshot
  or link to a ClinIQ issue is shared.
---

## ELUSOC Difficulty Labels

| Label | Points | When to use |
|-------|--------|-------------|
| **NEWBIE** | 10 | Single-file UI changes, copy edits, adding a missing prop, small bug fixes with clear reproduction steps and obvious fix location |
| **ADVENTURER** | 25 | Multi-file changes, new components, moderate logic (form handling, state, routing), integration of existing patterns in a new context |
| **VETERAN** | 50 | Architecture-level changes, new feature systems (auth flows, data pipelines, dashboard modules), cross-cutting concerns, or anything requiring deep understanding of the codebase |

**When in doubt, go one level lower.** It's better to reward a contributor with a slightly easier label than to discourage them with an over-complex one.

---

## Workflow

### Step 1 — Fetch the issue

```bash
gh issue view <ISSUE_NUMBER> \
  --repo akshay0611/ClinIQ \
  --json number,title,body,labels,assignees,comments,author
```

Extract:
- Issue title and description
- Related components/files mentioned
- Any existing labels already applied
- Commenters who have asked to be assigned (from `comments`)

### Step 2 — Analyze complexity

Read the title, description, and related components. Apply the label criteria above.

Consider:
- How many files are likely touched?
- Is this purely UI or does it involve logic/state/data?
- Does it require understanding existing patterns or inventing new ones?
- Are the steps to implement clearly spelled out or does the contributor need to figure it out?

### Step 3 — Present recommendation to maintainer

Show a brief analysis and your label recommendation:

```
Issue #N: <title>

Complexity analysis:
<2–3 sentences explaining what the issue requires and why you picked this label>

Recommended label: NEWBIE (10pts) | ADVENTURER (25pts) | VETERAN (50pts)

Contributors who asked to be assigned:
- @username1 (comment: "please assign me")
- @username2 (comment: "I'd love to work on this")

Who would you like to assign this to?
(Type a username, or say "none" to skip assignment for now)
```

Wait for the maintainer's response before proceeding.

### Step 4 — Apply label and assignee

Once the maintainer confirms the label and provides a username (or overrides the label):

```bash
# Apply the difficulty label (gh CLI works fine for labels)
gh issue edit <ISSUE_NUMBER> \
  --repo akshay0611/ClinIQ \
  --add-label "NEWBIE"   # or ADVENTURER or VETERAN
```

**IMPORTANT — use the GitHub API for assignment, not `gh issue edit`.**

`gh issue edit --add-assignee` only works for repo collaborators. ELUSOC contributors are external users who are NOT collaborators, so it will always fail with "not found". Use the REST API instead, which can assign anyone who has interacted with the repo:

```bash
gh api \
  --method POST \
  repos/akshay0611/ClinIQ/issues/<ISSUE_NUMBER>/assignees \
  --field 'assignees[]=<username>'
```

If this also fails (rare), it means the user has never interacted with the repo at all. In that case, tell the maintainer:

```
@<username> could not be assigned automatically — they may need to
comment on the issue first, or you can assign them manually via the
GitHub UI at: https://github.com/akshay0611/ClinIQ/issues/<ISSUE_NUMBER>
```

Do NOT try `--add-assignee` via `gh issue edit` as a fallback — it will always fail for external users.

### Step 5 — Post an assignment comment

After applying the label and assignee, post a friendly comment to notify the contributor:

```bash
gh issue comment <ISSUE_NUMBER> \
  --repo akshay0611/ClinIQ \
  --body "<comment body>"
```

Comment template:

```
Hey @<username>! 👋 You've been assigned to this issue.

This is labeled as **ADVENTURER (25 Points)** under ELUSOC 2026.

A few things to keep in mind:
- Fork the repo and work on a new branch (`feature/` or `fix/` prefix)
- Link this issue in your PR with `Closes #<ISSUE_NUMBER>`
- Feel free to ask questions here if you get stuck

Looking forward to your contribution! 🚀
```

Adjust the label name and points in the comment to match what was actually applied.

---

## Edge Cases

**Issue already has a difficulty label:**
Point it out to the maintainer and ask if they want to change it or keep it.

```bash
# To remove an existing label before adding the new one:
gh issue edit <ISSUE_NUMBER> \
  --repo akshay0611/ClinIQ \
  --remove-label "NEWBIE"
```

**No one has asked to be assigned yet:**
Skip the assignee list. Just show the label recommendation and ask if they want to pre-assign anyone or leave it open.

**Maintainer overrides the label recommendation:**
Respect it without pushback. Apply whatever they say.

**Multiple people asked to be assigned:**
List all of them and let the maintainer choose. Don't pick one yourself.

**Assignment via `gh issue edit --add-assignee` fails:**
This is expected for external contributors. Always use the REST API path in Step 4 instead. Never retry with `gh issue edit --add-assignee` — it will always fail for non-collaborators.

**`gh api` assignment also fails:**
The user likely has zero interaction with the repo. Tell the maintainer and provide the direct GitHub UI link to assign manually. Still post the comment in Step 5 so the contributor is notified.

---

## Label Names (exact strings for gh CLI)

Use these exact strings — they must match the label names in the repo:

- `NEWBIE`
- `ADVENTURER`
- `VETERAN`
- `ELUSOC` (the base program label — usually already applied by github-actions bot, don't re-add unless missing)
