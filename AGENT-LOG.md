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

## 2026-09-20: Task Lifecycle and Zoom Input Baseline

- Request: use one branch per task, integrate into the milestone, and clean up
  completed branches; implement the previously confirmed Participants panel input.
- Codex work: documented issue closure after milestone integration and branch
  deletion after completion; clarified visible-name input and M2 sample validation.
- Codex checks: documentation whitespace checked; no OCR implementation tested.
- Human checks before acceptance: owner confirmed Participants panel input and
  the branch lifecycle. Overall proposal acceptance remains pending.
- Acceptance: input and workflow decisions confirmed; issue #6 remains in progress.
- Follow-up: issue #5 is already accepted and integrated, so close it and remove
  its task branch under the updated workflow. Retain issue #6's active branch.

## 2026-09-27: Apps Script Sidebar Baseline

- Request: adopt JavaScript Apps Script with direct sidebar screenshot upload.
- Codex work: updated baseline and milestone scope; removed the empty Python
  dependency placeholder. M2 covers OCR and temporary-resource cleanup.
- Human review: owner accepted the control spreadsheet baseline and sidebar upload.
- Checks: 14 local Markdown links resolved; repository and Wiki whitespace checks
  passed; Wiki design published as 5df238f. No application behavior tested.
- Limitations: no runtime implementation; milestone dates unchanged.

## 2026-09-27: Accept Revised Baseline (Issue #6)

- Human review: owner accepted the proposed workflow and requested implementation
  of the JavaScript Apps Script/sidebar revisions, then authorized closing
  issues whose requirements are met.
- Acceptance: project-owner acceptance recorded for the M1 baseline.
- Codex work: aligned requirements and README with that acceptance.
- Checks: documentation whitespace verified; no runtime result claimed.
- Limits: OCR trials remain in M2; no advisor approval or presentation claimed.

## 2026-09-27: Weekly Reports and Schedule Context

- Owner supplied a combined weeks 1-2 account: suitable-project research and
  baseline GitHub/VS Code setup. Published as explicitly retrospective Wiki
  entries in c6b3470; no contemporaneous evidence or delivery dates invented.
- GitHub API verified repository creation on September 14 local time.
- Recorded that milestone dates are planning targets, preserving the semester
  start and original due dates. Presentation completion remains unconfirmed.
- Checks: Wiki and repository whitespace passed; owner account used as evidence.

## 2026-09-28: Proposal Presentation Preparation

- Owner confirmed September 28 as the proposal presentation date.
- Prepared an eight-slide HTML deck, speaker notes, repository walkthrough,
  and post-delivery feedback record. All output examples are fictional.
- Checks: eight slide sections, navigation elements, print CSS, and whitespace
  verified. Browser rendering not tested: browser automation is unavailable.
- Delivery and feedback remain pending; no application demo results claimed.

## 2026-10-28: Develop the Proposal Paper (Issue #19)

- Owner reported a successful proposal presentation and feedback to develop
  the paper incrementally and organize it across multiple pages.
- Codex work: expanded the LaTeX proposal into a structured development report,
  added verified Google references and an ongoing documentation plan.
- Human review: presentation outcome and feedback supplied by the owner;
  actual delivery date and demonstrated commit not inferred.
- Checks: whitespace, balanced LaTeX environments, bibliography keys, explicit
  page divisions, and removal of placeholder sections verified. LaTeX tools
  are not installed locally, so PDF compilation and visual pagination are unverified.
- Limitations: no implementation, OCR performance, or runtime results claimed.

## 2026-10-28: OCR Research for the Paper (Issue #19)

- Request: add research supporting OCR and its scripting integration.
- Codex work: consulted primary Tesseract, CRNN, and PP-OCR publications and
  Tesseract.js documentation; added related work, bibliography entries, and
  research-driven trial questions. Preprints and software docs are identified.
- Checks: six unique bibliography keys, resolved citations, balanced LaTeX
  environments, and whitespace verified; no engine selected or tested.
- Human acceptance: pending review of the expanded paper.
- Limits: published results are not evidence of performance on Zoom screenshots;
  PDF compilation remains unavailable without a LaTeX toolchain.

## 2026-10-28: Modular Paper Source (Issue #19)

- Request: organize the growing paper into smaller LaTeX files.
- Codex work: extracted ten topic files under paper/sections, retaining main.tex
  as the entry point, and documented editing and compilation in paper/README.md.
- Checks: expanding all input directives exactly reproduced the original source,
  preserving prose, citations, section order, and explicit page breaks.
- Limits: PDF compilation remains unverified because no LaTeX toolchain is installed.
- Human acceptance: pending review.

## 2026-10-28: Complete M1 and Proposal Presentation

- Owner reported a successful proposal presentation and requested M1 completion.
- Recorded delivery evidence and feedback in the presentation README, including
  links to paper commits and ongoing issues #19 and #9.
- Actual presentation date and displayed commit remain unspecified; no details
  beyond the owner report are inferred.
- Checks: GitHub showed #35 as the sole open M1 issue; paper feedback changes
  are already on main. Final whitespace and publication checks follow.
- Acceptance: M1 scope and presentation completion supported by owner reports.

## 2026-10-28: Revise Development Timeline

- Owner authorized extending development beyond November 29.
- Recorded September 14 repository creation and October 28 M1 completion;
  planned M2-M7 in two-week windows through January 20, 2027.
- Preserved original semester dates, weekly reporting periods, and target history.
- Updated project and paper schedule descriptions and published the Wiki timeline.
- Checks: six contiguous two-week windows verified; whitespace passed; GitHub
  milestone dates updated with original dates retained and states preserved.
- Limitations: planning estimates are not course deadline extensions; no future
  work is represented as complete.

## Entry Template

- Date and task/issue:
- Codex work and affected files:
- Codex checks and actual outcomes:
- Human checks before acceptance:
- Acceptance: pending / accepted / changes requested
- Limitations and follow-up issues:
