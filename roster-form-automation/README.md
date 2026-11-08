# Student Roster Form Automation

Application workspace for the JavaScript Google Apps Script project described in the
[project requirements](../docs/requirements.md).

Status: minimal Apps Script scaffold. A Sheets menu opens a sidebar with two
resource-link fields, local screenshot preview, and input-format checks.
Cloud Vision OCR is wired to the sidebar; the owner reports successful live output.
One owner-supplied sample matches 18/19 reference display rows exactly; timing
and broader evaluation remain pending. Permission
verification, persistence, roster generation, and Form copying remain unimplemented.
The owner reported successful setup and valid/invalid link
checks; the remaining smoke checks are not yet individually confirmed.

## Maintainer Setup

1. Create an empty test Google Sheet, then open Extensions > Apps Script.
2. Replace `Code.gs` with `src/Code.gs` and add an HTML file named `Sidebar`
   containing `src/Sidebar.html`.
3. In project settings, enable showing `appsscript.json`; replace its contents
   with `src/appsscript.json`. Save the project and reload the spreadsheet.
4. Select Roster Forms > Open setup and authorize if prompted.
5. Supply a template editor link, a folder link, and a fictional screenshot.
   Select Extract text. The image is sent to Google Cloud Vision and raw text
   appears in the sidebar; template/folder permissions are not checked yet.

This is developer setup for a bound script, not the final instructor installation
experience. No web-app deployment or Drive service is needed. OCR uses the
executing user's OAuth token, not an API key. Link the script to your configured
standard Cloud project with billing and Vision API enabled. The manifest now
requests `cloud-platform` and `script.external_request` in addition to sidebar
access. Save all three source files, run `showSidebar` in the editor to authorize
the new scopes, then reopen the sidebar in Sheets. If your OAuth consent setup
is in testing, ensure your account is an allowed test user.

If quota-project attribution is required, add `VISION_PROJECT_ID` in Apps Script
Project Settings > Script Properties, using the actual Cloud project ID (not
its display name). The executing account must have permission to consume services
in that project. Do not put OAuth tokens or service-account keys in properties.
No image is saved to Drive, and neither images nor raw OCR are logged by this code.
Settings are not saved; reopening the sidebar starts fresh. The 5 MiB image cap
is a provisional application choice, not a claimed Google upload limit.

## Manual Smoke Check (Pending)

Local automated checks with Node.js: `node roster-form-automation/tests/scaffold.mjs`
from the repository root. These mock Google services and check input validation;
they do not validate permissions or browser rendering.
Run `node roster-form-automation/tests/ocr.mjs` for mocked OCR request/error checks.

- Confirm the menu and sidebar open in a real Google Sheet.
- Tab through all controls; check readable layout in the narrow sidebar.
- Try valid editor/folder links, a responder link, and a non-Google URL.
- Preview a fictional PNG/JPEG; replace it and cancel selection.
- Reject empty, oversized, unsupported, and unreadable image files.
- Confirm no Drive file, roster, or Form is created and no settings persist.

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
