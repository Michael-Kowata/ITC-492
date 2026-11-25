# Roster Review Acceptance (#12)

Recorded November 25, 2026 from owner testing. Exact deployed revision, timings,
browser/assistive-technology details, and screenshots were not supplied.

| Scenario | Owner-reported result |
| --- | --- |
| Correct names/attendance and exclude staff/fragments, then refresh | Desired roster achieved: 17 included, 2 in-person, 15 online |
| Add a distinct student with a duplicate name | Warning only; no blocking failure reported |
| Keyboard operation | Program operated with Tab navigation and without a mouse |
| Approval invalidation and cancellation | Previously confirmed in review/isolation checks; no state carryover on subsequent reviews |

The duplicate report does not independently inspect hidden row IDs; implementation
and automated checks are separate evidence for identity preservation. Manual
duplicate entries differ from exact cross-screenshot overlap skipping. Do not
interpret the latter as a reliable way to distinguish different same-name people.

Keyboard operation is a smoke check, not a screen-reader, focus-order, contrast,
or comprehensive accessibility audit. No independent non-developer usability
study or production Form-generation result is claimed.

Deployment uses one canonical control spreadsheet operated by student IT staff,
one operator at a time. Review uses document-scoped state. Cancellation retains
the review tab for records; the review path does not create output Forms/rosters.

## Closeout

Keep #12 open until its final criteria review, finishing commit, and milestone
integration are complete. Update the PR Change, Verification, and Documentation
sections with this evidence; do not imply a fresh CI pass before it executes.
