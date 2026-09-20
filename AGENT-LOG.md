# Agent Log

Record one entry per Codex-assisted change. Human checks must be filled in by
the reviewer after they occur; Codex must not mark its own work accepted.

## 2026-09-14: Project Structure

- Request: structure the capstone around the required deliverables.
- Codex work: added workflow and issue templates, milestone plan, issue backlog,
  six wiki source pages, experiment template, LaTeX skeleton, and presentation
  guidance. Replaced the empty root README with a project map.
- Codex checks: `git diff --check` passed; a Python structural check passed for
  12 local Markdown links, all six wiki pages, and 14 weekly entries.
  The initial Node-based check could not run because Node is unavailable;
  the replacement Python check passed. PDF compilation was not run because
  `latexmk` is unavailable.
- Human checks before acceptance: pending user review.
- Acceptance: pending.
- Semester start: user confirmed August 24, 2026; schedule and weekly entries dated.
- Outstanding: remote issue/milestone creation, wiki publishing,
  and LaTeX compilation if the toolchain is unavailable.

## 2026-09-20: Roster Automation Scope

- Request: simplify the capstone to screenshot-to-roster automation with a
  separate Google Form for each student.
- Codex work: revised README, design, backlog, milestone outcomes, evaluation
  criteria, wiki title, experiment template, and paper title/section.
- Codex checks: `git diff --check` passed; all 12 local Markdown links
  resolved; terminology scan found only the intentional historical IDS note.
- Human checks before acceptance: pending user review.
- Acceptance: pending.
- Limitations: no application implementation or Google resources created;
  saved screenshots are the proposed initial input. Google integration must
  be verified in technology trials. Existing staged deletion of
  `endpoint-ids/README.md` belongs to the user and is excluded from this change.

## 2026-09-20: Finish Documentation Changes

- Request: finish the current documentation changes.
- Codex work: confirmed the roster automation documentation is committed;
  included the user's staged deletion of the obsolete IDS scaffold README.
- Codex checks: working and staged whitespace checks passed; all 12 local
  Markdown links resolved; the weekly log contains 14 entries.
- Human checks before acceptance: not reported.
- Acceptance: pending.
- Limitations: documentation only; no application or Google integration tests.

## Entry Template

- Date and task/issue:
- Codex work and affected files:
- Codex checks and actual outcomes:
- Human checks before acceptance:
- Acceptance: pending / accepted / changes requested
- Limitations and follow-up issues:
