# M2 Acceptance Review

Reviewed November 15, 2026 against the live GitHub issue bodies. All five issues
remain open. Subsequent owner clarification on November 15 replaces mandatory
sign-in with the organization's standard template policy. Signed-out and external
personal-account submissions are owner-confirmed passes under that policy.
GitHub issues #8/#9 and Wiki Design/Log were synchronized during the closeout
pass (Wiki commit ab208ec). No issue or milestone was closed.

| Issue | Evidence available | Remaining action |
| --- | --- | --- |
| [#8 Design](https://github.com/Michael-Kowata/ITC-492/issues/8) | architecture.md describes guided flow, row IDs, review approval, state and independent copies | Review design against current prototype, reconcile stale status notes, record owner acceptance and finishing commit |
| [#9 Technology trials](https://github.com/Michael-Kowata/ITC-492/issues/9) | OCR/sidebar/review evidence; two-student copy trial, passing template checks, signed-out and external-account submissions; successful-trial cleanup owner-confirmed | Reconcile upload/execution limits and failure/cancellation cleanup evidence; complete sanitized run metadata and finishing commit |
| [#10 Setup/checks](https://github.com/Michael-Kowata/ITC-492/issues/10) | Maintainer setup instructions and local mocked tests | Add/run CI; validate first-use authorization and isolated state in two clean control-sheet copies; record results and finishing commit |
| [#23 Week 3 log](https://github.com/Michael-Kowata/ITC-492/issues/23) | Historical reporting period September 7-13 | Review actual Wiki entry, document only work supported for that period, checks/blockers/next steps and finishing commit |
| [#24 Week 4 log](https://github.com/Michael-Kowata/ITC-492/issues/24) | Historical reporting period September 14-20 | Review actual Wiki entry and repository-setup evidence, checks/blockers/next steps and finishing commit |

## Suggested Order

Deployment clarification: the owner intends one canonical control spreadsheet
operated by student IT staff, not independent instructor deployments. The owner
completed the A/B edit/approval/cancellation isolation test successfully; this
does not validate authorization by another account or same-document concurrency.
Revise #8/#10 scope explicitly to sequential reuse and staff handoff before closure.
Session reset must invalidate prior approval without deleting previous outputs.
The owner subsequently confirmed only one operator accesses the instance and
canceling/finishing reviews does not carry state into the next review. Record
review reuse as owner-tested; production-output preservation is not established
by that test. Wiki deployment/results were synchronized November 15; GitHub
issue #8/#10 deployment wording still needs reconciliation.

1. Reconcile remaining failure/cancellation and other evidence checks for #9.
   Successful-trial cleanup and access tests are owner-confirmed; access policy
   is synchronized on GitHub. Do not record private emails or responder links.
2. Review and accept the current design for #8. Full production generation and
   recovery belong to M4/M5, not this feasibility trial.
3. Finish reproducible setup/CI and reconcile #10 with the shared staff deployment;
   document authorization and session-reset/handoff checks, retaining A/B evidence.
4. Reconcile the two historical Wiki logs without backdating current work.
5. Link reviewed finishing commits and close only issues whose criteria are met;
   close M2 after all assigned requirements are reconciled.

The core trial's results are in
[integration observations](../sandbox/google-forms-integration/observations.md).
Latest template checks PASS; the earlier aggregate failure has no established
cause. Successful-trial cleanup has separate owner confirmation; failure/cancellation
cleanup and detailed quiz-setting checks are not implied by either pass.
Wiki contents and CI run history were not independently audited in this review;
The closeout pass added .github/workflows/checks.yml for all six mock suites on
push, pull request, and manual dispatch. All 239 assertions passed locally via
injected V8; native Node is unavailable and hosted CI has not run for this change.
Week 3 remains an unsupported placeholder: owner history is needed. Week 4 has
an existing entry and September repository commits, but needs its final linked
review. No historical work was invented. Dates remain planning targets,
with final delivery December 7, 2026.
