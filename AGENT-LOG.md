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

## 2026-09-20: M1 Foundation and Project Rename

- Request: rename the application workspace and begin the first milestone.
- Codex work: renamed the scaffold to `roster-form-automation/`; added private
  working-directory ignore rules, proposal, requirements, and T01-T03 issue
  drafts; updated navigation, workflow example, M1 status, and week 4 reporting.
- Codex checks: whitespace checks passed; 23 local Markdown links resolved;
  all 14 weekly date ranges and six wiki pages verified; renamed workspace
  verified; ignore rules matched sample data, credential, run-state, environment,
  virtual-environment, and Python cache paths.
- Human checks before acceptance: not reported.
- Acceptance: pending.
- Limitations: GitHub fetch still fails for missing HTTPS credentials. Remote
  issue/milestone creation and wiki publication remain blocked; no runtime
  functionality or measured experiment results are claimed.

## 2026-09-20: Publish GitHub Wiki

- Request: migrate the local wiki documentation to the initialized GitHub Wiki.
- Codex work: published Home, Log, Design, Results, Reading, and Appendix;
  updated Wiki navigation and the migration status in the weekly log. Removed
  duplicate local pages and updated repository navigation and M1 tracking.
- Codex checks: Wiki push succeeded; remote HEAD verified as
  `846d1280c37b1b6e8b298620bd279119845c8c41` before removing local copies.
  Whitespace checks passed; 17 local Markdown links resolved; all six published
  page files and the 14 weekly entries verified in the pushed Wiki checkout.
- Human checks before acceptance: not reported.
- Acceptance: pending.
- Limitations: no application behavior changed; remote issues and milestones
  are outside this migration and remain outstanding.

## 2026-09-20: Publish Issues and Milestones

- Request: migrate issue and milestone tracking to GitHub and use milestone branches.
- Codex work: published seven dated milestones and 32 issues (16 implementation
  tasks, 14 weekly reports, two presentations); retained T16 for final delivery.
  Replaced local issue checklists with live links and documented task branches
  feeding milestone/m1 through milestone/m7 before merging into main.
- Codex checks: verified all 32 issues are open and assigned to the expected
  milestone, and all seven milestones have due dates. All seven remote branches
  verified after atomic publication; 14 local Markdown links and whitespace
  checks passed. M1 contains foundation work; M2-M7 start at current remote main.
- Human checks before acceptance: not reported.
- Acceptance: pending.
- Limitations: original semester dates retained, including overdue milestones;
  no unfinished issue was closed and no schedule revision was assumed.

## 2026-09-20: Accept Repository Structure (Issue #5)

- Request: record the project owner's confirmation that the structure covers
  every requested deliverable.
- Codex work: recorded human acceptance and prepared the finishing commit for
  T01, GitHub issue #5.
- Codex checks: the preceding issue review verified 14 local Markdown links,
  private-directory ignore behavior, and whitespace; all passed.
- Human checks before acceptance: the project owner confirmed the repository,
  issues, milestones, wiki, sandbox, AGENT-LOG.md, paper, and presentations cover
  every requested deliverable.
- Acceptance: accepted for repository structure (T01) by the project owner.
- Limitations: this accepts the structure, not application functionality or
  other M1 issues. Automatic issue closure awaits the finishing commit on main.

## Entry Template

- Date and task/issue:
- Codex work and affected files:
- Codex checks and actual outcomes:
- Human checks before acceptance:
- Acceptance: pending / accepted / changes requested
- Limitations and follow-up issues:
