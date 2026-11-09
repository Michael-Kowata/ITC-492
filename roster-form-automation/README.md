# Student Roster Form Automation

Application workspace for the JavaScript Google Apps Script project described in the
[project requirements](../docs/requirements.md).

Status: minimal Apps Script scaffold. A Sheets menu opens a sidebar with two
resource-link fields, local screenshot preview, and input-format checks.
Cloud Vision OCR is wired to the sidebar; the owner reports successful live output.
One owner-supplied sample matches 18/19 reference display rows exactly; timing
and broader evaluation remain pending. Permission
verification, output roster generation, and Form copying remain unimplemented.
Editable staging-sheet review and approval were owner-tested successfully.
The owner also confirmed compact review and three-image batches work. Only the
latest exact-overlap skipping change awaits live confirmation; broader failure
and independent-copy checks remain pending.
The owner reported successful setup and valid/invalid link
checks; the remaining smoke checks are not yet individually confirmed.

## Maintainer Setup

1. Create an empty test Google Sheet, then open Extensions > Apps Script.
2. Replace `Code.gs` with `src/Code.gs` and add an HTML file named `Sidebar`
   containing `src/Sidebar.html`.
   Add a script file named `Review` containing `src/Review.gs`.
   Add a script file named `Batch` containing `src/Batch.gs`.
3. In project settings, enable showing `appsscript.json`; replace its contents
   with `src/appsscript.json`. Save the project and reload the spreadsheet.
4. Select Roster Forms > Open setup and authorize if prompted.
5. Supply a template editor link, a folder link, and 1-3 fictional screenshots.
   Select Extract and add screenshots. Images are processed sequentially and
   a draft is created or extended automatically. Template/folder permissions
   are not checked yet. No student Forms or separate output spreadsheet are created.

This is developer setup for a bound script, not the final instructor installation
experience. No web-app deployment or Drive service is needed. OCR uses the
executing user's OAuth token, not an API key. Link the script to your configured
standard Cloud project with billing and Vision API enabled. The manifest now
requests `cloud-platform`, `script.external_request`, and `spreadsheets.currentonly`
in addition to sidebar access. Save all five source files, run `showSidebar` in the editor to authorize
the new scopes, then reopen the sidebar in Sheets. If your OAuth consent setup
is in testing, ensure your account is an allowed test user.

If quota-project attribution is required, add `VISION_PROJECT_ID` in Apps Script
Project Settings > Script Properties, using the actual Cloud project ID (not
its display name). The executing account must have permission to consume services
in that project. Do not put OAuth tokens or service-account keys in properties.
No image is saved to Drive, and neither images nor raw OCR are logged by this code.
Resource-link fields are not saved. Review state persists in the bound document;
use Refresh review after reopening the sidebar. The 5 MiB image cap
is a provisional application choice, not a claimed Google upload limit.

## Manual Smoke Check (Pending)

Local automated checks with Node.js: `node roster-form-automation/tests/scaffold.mjs`
from the repository root. These mock Google services and check input validation;
they do not validate permissions or browser rendering.
Run `node roster-form-automation/tests/ocr.mjs` for mocked OCR request/error checks.
Run `node roster-form-automation/tests/review.mjs` for review/approval checks.
Run `node roster-form-automation/tests/batch.mjs` for batch and failed-image retry checks.

## Editable Review

Approval controls and counts appear above collapsible warnings and roster preview.
The preview starts collapsed and scrolls within a bounded area when expanded.
Blocking errors open their section automatically; validation still prevents
approval. Setup and screenshots collapses after loading review; reopen it to add
another screenshot. Run `node roster-form-automation/tests/sidebar-review.mjs`
for mocked layout-state and approval-control checks (not browser rendering).

1. Select Extract and add screenshots. A draft tab is created automatically if
   none is active; otherwise new rows are appended. Only one review is active.
2. Edit Student name and Attendance; use Include checkboxes to exclude staff or
   fragments. The original OCR columns retain the initial text and hints, not
   current validation errors. Entry IDs are hidden; do not copy or edit them.
3. For this sample, change `Quinn Harmon - I` to `Quinn Harmon - IP`, choose
   In-person, and uncheck the standalone `IP` row. Staff start unchecked as a
   suggestion that the instructor must verify. Correct other errors as needed.
4. Add missing students in blank rows below the data, supplying a name, attendance,
   and checked Include box. Refresh assigns an ID. To merge fragments, correct
   the retained row and exclude the extra row. Equal names remain separate entries.
5. Select Refresh review. The sidebar displays current errors, counts, and the
   proposed in-person-first order. Within each group, staging-sheet order is kept.
6. Resolve errors, check the confirmation box, and select Approve roster. The
   server checks the current sheet against the preview and saves a snapshot.
   Edits invalidate approval; refresh and approve again. Approval does not generate
   any files. Future generation must revalidate the snapshot, never trust sidebar state.

Cancel review clears active/approved state but retains its tab for inspection.
A new review creates a new tab, never overwrites the previous one. Delete retained
tabs manually when no longer needed. Cancel reviews and remove private review
tabs before distributing a clean spreadsheet copy. Raw OCR and names are stored
in the control Sheet and are visible to anyone with access to it.

Prototype bounds: at most 300 staging rows and a 250 KB serialized approval roster,
stored in document-property chunks. Excess inputs are rejected, not truncated.
One operator per control Sheet remains the supported model.
Locks coordinate script calls, not concurrent manual spreadsheet edits. Fingerprint
checks and the edit trigger detect changes; they are not a multiuser transaction.

### Additional Screenshots

Choose up to 3 PNG/JPEG images (5 MiB each) per batch. One action processes them
sequentially with per-image status. Existing corrections and IDs are preserved.
Failures do not roll back successful images. Retry failed screenshots processes
only failed items, retaining their upload IDs; completed items are skipped.
The pending batch exists only while this sidebar is open. Reopening requires
selecting files again; successful rows remain in the draft.

Exact full-name matches (case/whitespace normalized, same attendance) against
included entries from earlier screenshots are skipped before adding rows. A
single per-image skipped count replaces repeated rows and warnings. If a skipped
name belongs to a distinct student, add that student manually. Equal names within
one screenshot are retained. Attendance conflicts, spelling differences, and
entries without known screenshot provenance are not automatically excluded.
Overlap warnings still require review before final approval.

An image containing only overlaps adds no rows and preserves approval. Every
actual addition invalidates approval. The 300-row limit includes
excluded rows. Retries recognize retained upload IDs; re-extraction assigns a
new ID and uses the overlap policy. Keep hidden IDs intact. To avoid confusion,
do not cancel or switch reviews while a batch is running.

Existing unchecked overlap rows from older versions are not removed automatically;
delete those rows manually or start a fresh review to use the new behavior.

Live acceptance: test three images, one failing image, retry, all-overlap uploads,
equal names within one image, and a batch added after approval. Reject a fourth
selected image before processing. Verify original corrections and sources remain.

### Review Acceptance Check

Verify the split suffix blocks approval; correct it and confirm 17 included,
3 excluded raw rows (two staff and one fragment), 2 in-person, and 15 online.
Verify duplicate names keep distinct IDs, blank names/attendance block approval,
and a new student can be added. Edit after preview and after approval; approval
must be refused or invalidated. Reopen the sidebar and Refresh review. Cancel,
then start a new review and verify earlier tabs and unrelated sheets are preserved.
Confirm that no Forms or separate output spreadsheet exist.

- Confirm the menu and sidebar open in a real Google Sheet.
- Tab through all controls; check readable layout in the narrow sidebar.
- Try valid editor/folder links, a responder link, and a non-Google URL.
- Preview a fictional PNG/JPEG; replace it and cancel selection.
- Reject empty, oversized, unsupported, and unreadable image files.
- Confirm only the staging tab and review state are saved, not output Forms,
  a separate roster spreadsheet, or uploaded images in Drive.

Record actual outcomes in the technology sandbox before closing issue #10.
Automated checks/CI and copy-isolation tests remain part of that issue.

## Test Asset Storage

See [fixture policy](tests/fixtures/README.md). Commit fictional fixtures under
`tests/fixtures/`; keep real screenshots and expected rosters in root `data/`
(ignored). The initial fictional JSON roster deliberately includes duplicate
names. A cropped Zoom capture with AI-replaced names and its 19-row reference
are now available; see the [first OCR trial checklist](../docs/ocr-trial.md).

The intended flow is a saved screenshot, reviewed student names, a Google Sheet,
and a separate template-based Google Form linked beside every student.

Keep screenshots and real roster files in the repository's ignored `data/`
directory, credentials in `secrets/`, and exported run state in `runs/`.
Only privacy-reviewed fictional-name fixtures may be committed. Ignore rules do not protect files
that were already tracked; review staged changes before every commit.

## Sidebar Upload Baseline (2026-09-27)

A control spreadsheet hosts the custom menu, HTML sidebar, and roster review
staging tab. Upload a PNG or JPEG directly from the computer; no manual Drive
upload is required. After approval, generate a separate roster spreadsheet
and one template-based form per student.

OCR may require temporary Drive resources. M2 will select OCR, authorization
scopes, upload limits, persistent cloud run state, and cleanup on success,
failure, or cancellation. M3 implements upload and review. No OCR results are
claimed and milestone dates are unchanged.
