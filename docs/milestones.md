# Semester Milestones

Week 1 start date: **2026-08-24**, confirmed by the project owner. Week N starts 7 * (N - 1) days after
week 1 starts; its end is six days later. Use the final day of each milestone's
last week as its due date.

| ID | Milestone | Weeks | Start | Due | Exit evidence |
| --- | --- | --- | --- | --- | --- |
| M1 | Scope and project foundation | 1-2 | 2026-08-24 | 2026-09-06 | Approved scope, workflow, issue board, wiki |
| M2 | Design and technology trials | 3-4 | 2026-09-07 | 2026-09-20 | Apps Script sidebar upload, OCR, temporary storage, and Google integration trials |
| M3 | Screenshot extraction and review | 5-6 | 2026-09-21 | 2026-10-04 | Validated sidebar upload and staging-tab approval with duplicate-name handling |
| M4 | Sheet and individual form creation | 7-8 | 2026-10-05 | 2026-10-18 | Distinct template copy per approved student |
| M5 | Link matching and recovery | 9-10 | 2026-10-19 | 2026-11-01 | Matching responder links and duplicate-free retries |
| M6 | Evaluation and documentation | 11-12 | 2026-11-02 | 2026-11-15 | OCR accuracy, form/link checks, installation guide |
| M7 | Final delivery | 13-14 | 2026-11-16 | 2026-11-29 | Paper, bibliography, final presentation, release |

## Schedule Changes

M1 status as of 2026-09-20: local foundation and scope documents prepared;
Wiki and GitHub tracking published; human approval remains pending. See
[the M1 checklist](issues/M1.md). The original due date has passed; M1 remains
open until its exit criteria are met.

Record changes here and update the matching GitHub milestone due date. Keep
the original date so schedule history remains visible.

| Recorded on | Milestone | Previous due date | New due date | Reason | Affected issues |
| --- | --- | --- | --- | --- | --- |

Presentation dates are provisional until the course calendar is confirmed.

## Live Tracking

Manage milestone status and due dates in
[GitHub Milestones](https://github.com/Michael-Kowata/ITC-492/milestones).
Each milestone has an integration branch named `milestone/m1` through
`milestone/m7`. Keep this schedule as the baseline and date-change history;
issue acceptance checklists live only on GitHub.

## Scope Revision: 2026-09-20

Replaced the IDS scope with roster-to-form automation. Semester dates remain
unchanged; milestone dates are targets, not evidence of completion. Review the
M2 technology trials immediately because its target date is today. Record any
necessary date changes in the table above after replanning.

## Sidebar Upload Baseline (2026-09-27)

A control spreadsheet hosts the custom menu, HTML sidebar, and roster review
staging tab. Upload a PNG or JPEG directly from the computer; no manual Drive
upload is required. After approval, generate a separate roster spreadsheet
and one template-based form per student.

OCR may require temporary Drive resources. M2 will select OCR, authorization
scopes, upload limits, persistent cloud run state, and cleanup on success,
failure, or cancellation. M3 implements upload and review. No OCR results are
claimed and milestone dates are unchanged.
