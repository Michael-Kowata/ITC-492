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

## Entry Template

- Date and task/issue:
- Codex work and affected files:
- Codex checks and actual outcomes:
- Human checks before acceptance:
- Acceptance: pending / accepted / changes requested
- Limitations and follow-up issues:
