# Google Forms / Sheets Integration Trial

Milestone M2; issue [#9](https://github.com/Michael-Kowata/ITC-492/issues/9).
Status: owner confirmed successful copies and separate responses after the
unlinked-destination fix. Owner confirmed all template diagnostic checks PASS
after updating the script. Signed-out and external-account submissions also
confirmed. Remaining cleanup, settings, and evidence checks are listed in
observations.md. Earlier failure cause
is unconfirmed, not assumed to be timestamp-only.

A template does not need a linked response spreadsheet. If an older script
reports "The form currently has no response destination.", update the test
project's Code.gs to this revision. If no trial was recorded, retry creation.
If a trial was recorded, inspect and clean up its outputs, then use a new control
spreadsheet as described below; do not bypass the rerun guard.

## Question

Can Apps Script copy a template into two independent student Forms, create a
separate roster Sheet with matching responder links, and support the intended
Google-account audience? This is a small feasibility trial, not M4 production
generation or M5 retry/recovery. It does not read or change the OCR/review app.

## Setup

Use a **new blank control spreadsheet and its own bound Apps Script project**.
Do not add this script to the main application's project: both have `onOpen`,
and this sandbox deliberately requests broader Forms/Drive/Sheets scopes.

1. Prepare a dedicated private folder in My Drive containing no real class data.
   Review folder collaborators/inherited access; the script does not change them.
2. Prepare a disposable test template Form with fictional questions and no
   responses. Use a separate copy of a real template if necessary; do not alter
   a live classroom Form. Close responses and unpublish where supported. The
   trial refuses an accepting/published template or one with existing responses.
3. In the blank control Sheet, open Extensions > Apps Script. Replace `Code.gs`
   with this sandbox's `src/Code.gs`. Enable manifest visibility in project
   settings and use this sandbox's `src/appsscript.json`.
4. Authorize the script using your test operator account and reload the Sheet.
   The **M2 Integration Trial** menu should appear. No API keys, service account,
   Cloud Vision connection, or web-app deployment is needed for these built-in
   Apps Script services. Workspace policy may still block requested access.

Scopes: spreadsheet access creates the separate roster; Forms access inspects
and configures copies; Drive access copies, moves, and trashes tracked outputs;
container UI provides prompts. These are broad scopes, suitable only for this
explicitly authorized test. They have not been added to the main app manifest.

## Reproduction

### 1. Create the Small Trial

Choose **Create two test copies**, supply the template editor link and the test
folder link, then confirm creation. Canceling prompts creates nothing.

Fixed fictional students, in order:

| Reviewed name | Attendance | Title when template is `OSHA Final Exam` |
| --- | --- | --- |
| Riley Carter - IP | In-person | Riley Carter - OSHA Final Exam |
| Taylor Brooks | Online | Taylor Brooks - OSHA Final Exam |

The code reads the Form title, not its Drive filename. Both copied titles and
filenames use the agreed format. Original roster names/attendance remain intact.
Both copies start closed/unpublished and any inherited response spreadsheet
destination is unlinked from the copies only. The template is read, not edited.

A separate roster spreadsheet is created in the folder, containing exactly two
student rows, distinct Form IDs, and responder links. Editor links and the
roster URL are recorded in a timestamped **Trial report** tab in the control
Sheet. Do not share the control report or roster publicly. The copied Forms are
not published automatically; a responder URL alone does not establish access.

### 2. Inspect the Copies

Check the report's PASS/FAIL rows. Automated structural checks cover description,
quiz flag, and item order/type/title/help text. **Manually compare** choices,
required flags, answer keys/points, feedback, images, section routing, and other
template settings. A matching structure digest is not proof of full fidelity.
Confirm the source template has not changed and each name opens its own Form.

### 3. Test Respondent Access and Independent Responses

In each copied Form editor, publish/enable responses using the organization's
standard template access settings. Do not enable additional sign-in requirements
or choose a different audience policy. The current organization policy permits
signed-out and external personal-account submissions. Preserve required student
name and email questions as self-reported identification. Do not change the source template or
make the folder/roster public. Use fictional submissions, not student records.
This is an explicit operator step; the script never silently broadens access.

1. Run **Refresh verification**: expect response counts `0 / 0`.
2. Open each responder link in a signed-out/private session. Record whether
   sign-in is required. An owner/editor session is not a valid respondent test.
3. Use an intended student/test account, including an external personal Google
   account, to submit a recognizable fictional answer to Riley's copy only.
4. Refresh verification: expect counts `1 / 0`. Inspect the Forms' Responses
   tabs to verify that the answer appears only in Riley's copy.
5. Submit a different fictional answer to Taylor's copy. Refresh again: expect
   `1 / 1`. Check each answer remains in its own response set and the source
   template still has zero responses.
6. If organization policy prevents this audience, document the blocker; do not
   claim success or silently change access. Record observed publication settings.

The report records counts and publication flags, not response bodies or emails.
It never marks respondent access as passed automatically. Manually record that
evidence in the observations template after performing the checks.

## Observations and What It Showed

See [observations.md](observations.md) for owner-reported live results, including
separate answers and staged counts of 1/0 then 1/1. Local mocked checks exercise
creation, naming, report fields, rerun guards, and cleanup; they cannot validate
Google permissions, actual question fidelity, or respondent access.

Run from the repository root with Node.js:

```sh
node sandbox/google-forms-integration/tests/trial.mjs
```

Current local verification: 72 assertions passed using an injected V8 harness
with mocked Google services. Native Node execution and the live menu/authorization
path were not run in the development environment.

### Reading Template Diagnostics

Update Code.gs in the existing test project and choose **Refresh verification**;
do not recreate the trial or reset its stored baseline. Read the newest rows.
Each template field has its own PASS/FAIL result, with expected and observed
values for changed scalar fields. Question structure reports a digest mismatch,
not individual question differences; full settings still require manual review.
A timestamp-only change yields REVIEW, not proof of content changes. Any other
tracked difference makes the summary FAIL. A template read error records ERROR
and stops that refresh without claiming a successful comparison. Earlier report
rows remain as historical evidence. Keep resource IDs and report details private.

## Failure Handling and Cleanup

One trial is permitted per control Sheet, including after cleanup. State and
returned resource IDs are recorded in document properties before subsequent
steps. An unsuccessful run retains the known outputs and report; **do not rerun
creation** expecting automatic recovery. Use a new blank control Sheet for a
deliberate new trial only after inspecting and cleaning the old test folder.

Choose **Trash trial outputs** and confirm. Only recorded copies and the generated
roster are trashed. The source template, folder, control Sheet, and report remain.
Cleanup can be retried if permissions temporarily prevent trashing an output.
Files remain in Drive Trash until removed under your retention policy.

A resource creation call may succeed before its ID is recorded, or Apps Script
may time out between steps. The ledger cannot reconcile that ambiguity. Inspect
the dedicated test folder and My Drive recent files for untracked copies/rosters
after failures; remove only resources you can identify as part of this trial.
No broad folder deletion or production-grade retry is implemented.

Keep private IDs, resource links, account identities, and unsanitized reports out
of Git. Export private evidence under root `data/` (ignored). Commit only sanitized
observations; record the source revision and the actual deployed version if known.

## Sources

- [Apps Script Form methods](https://developers.google.com/apps-script/reference/forms/form)
- [Drive file copying and movement](https://developers.google.com/apps-script/reference/drive/file)
- [Publishing and managing respondents](https://developers.google.com/workspace/forms/api/guides/publish-form)
- [Google Forms respondent sharing and sign-in](https://support.google.com/docs/answer/2839588)

Platform documentation guides the trial; it is not project evaluation evidence.
