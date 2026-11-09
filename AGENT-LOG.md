# Agent Log

## 2026-11-09: Pre-Form-Creation Checkpoint

- Owner requested reconciliation and a checkpoint before Form copying.
- Updated naming requirements, paper, fixture policy, evidence, and schedule
  status. Form/Drive names omit trailing - IP; roster attendance stays unchanged.
- Recorded owner-reported review, approval, compact sidebar, and batch success;
  latest exact-overlap skipping remains pending live confirmation.
- No Form creation or milestone closure claimed. Existing dates retained.
- Verification: all 167 mocked assertions passed via injected V8 source;
  whitespace passed. Native Node/CI, live Google retests, and PDF compilation
  are not claimed. Checkpoint archives source, not a verified deployed revision.

## 2026-11-09: Skip Overlap Rows Before Append

- Owner requested avoiding repeated unchecked rows and excessive warnings.
  Exact name/attendance matches against included entries in earlier screenshots
  are now skipped before row-limit validation. Per-image counts replace warnings.
- Added receipts for all-overlap uploads so retries work even with zero new rows;
  no-new-row uploads retain approval. Existing review rows are not deleted.
- Documented distinct same-name students may require manual addition. Same-image
  duplicates and uncertain matches remain unchanged.
- Checks: 49 review and 16 batch assertions passed in mocked/injected V8;
  whitespace passed. Live Sheets validation remains pending.

## 2026-11-09: Three-Image Batch Upload and Reversible Overlap Exclusion

- Owner confirmed the compact sidebar and requested up to three images per
  selection plus automatic overlap removal. Implemented sequential batch OCR
  and append, progress, failed-only retries, and target-review guards.
- Exact cross-source name/attendance matches are unchecked with a visible reason,
  never deleted. Same-image duplicates and ambiguous matches remain included for
  review; restoring a distinct same-name student is possible.
- Added Batch.gs, tests, setup steps, and updated scope/paper. Live batch testing
  remains pending; no images were sent to Google by Codex.
- Verification: 164 assertions across batch, review, OCR, scaffold, and compact
  sidebar tests passed using injected V8 source and mocked services/DOM. Whitespace
  check passed. Native Node, live browser/Sheets, and PDF compilation not run.

## 2026-11-09: Compact Sidebar Review

- Moved approval before collapsible issue/roster lists, capped list scrolling at
  220px, added visible counts, and collapsed setup/raw OCR during review.
- Blocking errors automatically expand without moving approval below the list.
  Names and warnings remain available; validation rules are unchanged.
- Checks: 14 mocked DOM assertions cover 300 entries and approval gating;
  whitespace checked. Live Sheets/browser rendering remains pending.

## 2026-11-09: Attendance Summary Labels

- Owner confirmed successful approval of 17 students and requested replacing
  "other" with "online". Sidebar now counts Online explicitly and reports
  unresolved attendance separately when present. Approval rules are unchanged.

## 2026-11-08: Sequential Screenshot Review

- Owner confirmed the original editable review works and approved multiple
  screenshots per draft. Added append with filename/upload ID, repeat-request
  detection, overlap warnings, and approval invalidation; existing edits remain.
- Expanded staging capacity to 300 rows and chunked approval storage (250 KB cap).
- Updated scope, setup instructions, and paper. Live multi-image validation
  remains pending. No Forms, commit, or remote update performed.
- Verification: 40 review, 72 OCR, and 16 scaffold assertions passed with mocked
  services in injected V8; sidebar syntax and whitespace checks passed. Native
  Node, browser rendering, Google integration, and PDF compilation not run.

## 2026-11-08: Editable Roster Review (Issue #12)

- Added Review.gs staging-sheet draft, explicit include/attendance editing,
  split-suffix validation, stable IDs, in-person-first approval snapshot, stale
  preview checks, edit invalidation, resume, and cancel without output generation.
- Added sidebar review actions and current-sheet scope, setup instructions,
  live acceptance checklist, and paper/design notes. Review state is document
  scoped; retained tabs contain roster data and must be removed before distribution.
- Created task/12-roster-review from the OCR checkpoint branch; no merge or
  issue closure. Live Sheets and copied-template validation remain pending.
- Checks: 27 review assertions plus 72 OCR and 16 scaffold assertions passed
  with mocked Sheets/storage in injected V8; whitespace and sidebar syntax passed;
  these are not a live Google or browser-rendering test. Node/PDF tools unavailable.

## 2026-11-08: OCR Checkpoint Reconciliation

- Owner requested documentation reconciliation, Wiki/progress updates, and a
  checkpoint commit before proceeding to roster review.
- Corrected stale implementation/evaluation statements across paper, READMEs,
  design, and timeline. M2 is past target; M3 extraction overlaps it. Due dates
  remain unchanged, with December 7 the final target; unfinished issues stay open.
- Re-ran 72 OCR and 16 scaffold assertions in the tool V8 runtime with source
  injection replacing Node imports. Node and LaTeX tools are unavailable, so
  native Node execution, CI, and PDF compilation are not claimed.
- Owner tested sidebar/OCR; broader usability, permissions, copied-spreadsheet
  isolation, run state, and Form generation remain pending.

## 2026-11-08: First Raw OCR Output Comparison

- Owner supplied raw text with Quinn Harmon's attendance suffix split into two
  lines. Codex preserved it and documented 18/19 exact reference-row matches,
  one incorrect row, and one extra fragment, using sequence alignment.
- Updated the paper, sandbox observations, and trial status. No runtime logic
  changed or automatic correction applied. Exact run metadata/timing remain unknown.
- Human action pending: confirm the reconstructed attendance label during review.

## 2026-11-08: Owner-Reported Live OCR Success

- Owner confirmed that OCR output works as intended after integration.
- Codex updated trial status, application README, sandbox observations, and
  paper to record this limited live functionality check without inventing metrics.
- Raw output, exact test input/version, timing, and reference comparison remain
  pending. No issue closed, live request made by Codex, or runtime code changed.
- Human acceptance: OCR output functionality confirmed; full trial acceptance
  and roster-generation checks remain pending.

## Cloud Vision Sidebar Wiring

- Owner reported Cloud/script setup and observed the old format-check message.
- Codex added file upload via google.script.run, server-side PNG/JPEG/size checks,
  OAuth-authenticated Vision requests, raw text display, and actionable errors.
- Added manifest scopes, reauthorization instructions, and mocked API tests.
- Checks: 72 OCR assertions passed in the tool V8 runtime with source injected
  in place of Node file imports; whitespace check passed. Node execution and
  live Google/browser checks were not performed.
- No live API request, permission verification, roster approval, or Form creation
  performed by Codex. Human acceptance and live fixture evaluation pending.

## 2026-11-08: Cloud Vision Selection

- Owner selected Google Cloud OCR; recorded Google Cloud Vision as the initial
  service, with TEXT_DETECTION as the trial baseline.
- Codex checked official setup/OCR documentation, added the technology sandbox
  plan, updated the trial checklist and paper design, and added a platform citation.
- No Cloud configuration, billing changes, credentials, uploads, or API calls
  performed. Authentication and measured results remain pending.
- Human review pending; source whitespace checked, PDF compilation not run.

Record one entry per Codex-assisted change. Human checks must be filled in by
the reviewer after they occur; Codex must not mark its own work accepted.

## 2026-11-08: OCR Trial Preparation

- Codex added a reproducible trial checklist distinguishing 19-row extraction
  from 17-student filtering/ordering, with native-resolution baseline, raw
  evidence, cleanup checks, and limitations of AI-edited input.
- Updated application README and paper Evaluation/Results with fixture readiness
  and the owner's limited sidebar smoke-check report, not measured OCR results.
- No engine selected, image uploaded to an OCR service, or OCR run performed.
- Human review: pending. Full Google integration and LaTeX compilation untested.

## 2026-11-08: Attendance Policy and Expected Roster

- Owner confirmed excluding IT Support and Instructor, preserving `- IP` for
  in-person students, and administering their tests first.
- Codex updated requirements, design, paper, and fixture expectations: 17
  students, two in-person first; raw 19-row transcription remains unchanged.
- Baseline uses screenshot order within attendance groups and manual link
  distribution; no automatic access gating or working generation claimed.
- Human review pending for implementation details; no OCR or Google calls made.

## 2026-11-08: Cropped Zoom Fixture Review

- Owner replaced the fixture with `Zoom Screenshot Sample.png`, removing avatars.
- Codex visually checked all 19 rows against the manual reference and updated
  the reference filename and fixture documentation. No image edits performed.
- Inspected PNG dimensions and chunk types: 172 x 612 pixels, 123,905 bytes,
  no text or EXIF chunks. Recorded native resolution as an OCR test condition.
- Original image remains ignored; replacement is eligible for versioning.
  No commit, publication, or OCR execution performed.
- Roster exclusion and suffix-cleanup rules remain pending owner clarification.

## 2026-11-08: AI-Edited Zoom Test Capture

- Owner supplied a real Zoom capture with all names replaced using AI.
- Codex inspected it, documented provenance, and manually transcribed 19 rows
  into reference JSON, preserving labels. No OCR results claimed.
- Temporarily ignored the image pending avatar/metadata privacy review.
  No image changes, commit, or publication performed.
- Human checks pending: transcription, avatar/metadata privacy, and label rules.
- Owner clarified earlier sidebar testing: valid links accepted, invalid links
  rejected. No validation bug was demonstrated by that report.

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

## 2026-10-29: M2 Workflow Design (Issue #8)

- Owner specified a template Form link and destination Drive folder link before
  screenshot upload, OCR, individual form creation, and student access.
- Codex work: documented resource validation, retained name approval, proposed
  run/entry fields and retry states, and separated copying from respondent access.
  Updated requirements and paper with the same design.
- Proposed default: output roster uses the same folder; access audience remains
  configurable pending clarification. No Google resources created or tested.
- Checks: whitespace, changed local documentation links, and LaTeX environment
  balance passed. PDF compilation and Google integration untested. Issue #8
  remains in progress pending design review and technology trials.

## 2026-10-29: Clarify Respondent Audience

- Owner clarified participants are OSHA-course learners who may use any Google
  account, not necessarily a school account. Recorded Google sign-in with no
  school-domain restriction and personal-account access tests for M2.
- Updated design, requirements, proposal, and paper; no access test claimed.

## 2026-10-30: Minimal Apps Script Scaffold (Issue #10)

- Codex added menu/sidebar source, a minimal manifest, fictional roster fixture,
  fixture privacy policy, setup instructions, and an Apps Script sandbox trial.
- Updated repository status and paper design to distinguish implemented preview
  from planned upload, OCR, permission checks, and output generation.
- Created `task/10-apps-script-scaffold` from the current workflow-design branch;
  it includes that branch's design changes. No issue closed or merge performed.
- Checks: 16 mocked menu/validation assertions passed in the tool's V8 runtime
  using the test body with source injected instead of Node file imports.
  Node is unavailable locally, so the documented Node entry point is unverified.
  `git diff --check` passed before this log update.
- Human checks before acceptance: run the documented live Sheets smoke checks,
  inspect the narrow sidebar and fixture privacy policy. Acceptance pending.
- No live Google, browser-rendering, OCR, or LaTeX compilation result claimed.

## 2026-10-30: Non-Technical Instructor Interface (Issue #8)

- Owner approved a user-friendly interface for instructors beyond the developer.
- Updated scope, guided interaction design, R13-R15, and paper introduction,
  design, requirements, and evaluation. Independent spreadsheet copies are the
  initial model; shared simultaneous operation remains deferred.
- Added formative usability and copy-isolation checks; no usability or runtime
  results claimed. Updated six GitHub tasks and published Wiki design notes.
- Checks: whitespace and LaTeX environment balance passed; corrected the source
  check to recognize zero-padded IDs, then verified R01-R15 once in order.
  PDF compilation remains unavailable without a LaTeX toolchain.

## Entry Template

## 2026-10-28: Confirm December 7 Final Delivery

- Owner clarified final delivery as December 7, 2026, superseding the January target.
- Revised M2-M6 to one-week windows and M7 to December 3-7; retained M1 completion
  and all previous dates in schedule history. Updated the project and paper text.
- Completed publication October 29: repository and Wiki timelines synchronized;
  six contiguous planning windows and GitHub dates verified through December 7.
- Limitations: dates are planning targets; no future work or presentation date
  is represented as completed or confirmed by this change.

## Entry Template

- Date and task/issue:
- Codex work and affected files:
- Codex checks and actual outcomes:
- Human checks before acceptance:
- Acceptance: pending / accepted / changes requested
- Limitations and follow-up issues:
