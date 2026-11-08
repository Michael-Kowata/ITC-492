# Google Cloud Vision OCR Trial

## Question

Can Cloud Vision extract the 19 display rows in our sanitized screenshot well
enough to support instructor review and the 17-student roster policy?

Status: selected for evaluation by the owner on November 8, 2026. Owner reports
Cloud/script configuration is connected. Sidebar/server OCR source is now added;
the owner reports that live OCR output works as intended. Codex has not
independently executed the live test.

## Setup

1. Select a dedicated Google Cloud test project, confirm billing is enabled,
   and enable the Cloud Vision API. Review usage/cost controls before testing.
2. Establish server-side authentication and the required project permissions.
   The intended integration calls Vision from Apps Script, not sidebar JavaScript.
   OAuth configuration and independent instructor-copy authorization still need
   validation. Do not embed API keys, tokens, or service-account keys in source,
   HTML, fixtures, logs, or a reusable spreadsheet template.
3. Implement a small Apps Script trial caller for the synchronous
   `https://vision.googleapis.com/v1/images:annotate` endpoint using inline
   base64 image content and `TEXT_DETECTION`. The caller is now in
   `roster-form-automation/src/Code.gs`; setup and reauthorization steps are in
   [the application README](../../roster-form-automation/README.md).

Cloud Vision supports inline image content, so this trial need not create a
Drive file or Cloud Storage object. The image still leaves the browser and is
sent to Google for processing; this is not local OCR. Provider data handling
must be reviewed before processing real student data.

## Reproduction

Use the sanitized PNG and procedure in [the OCR trial checklist](../../docs/ocr-trial.md).
Record the request feature, API version, date, language settings, native image
dimensions, elapsed time, and sanitized raw response. If an underlying model
version is not exposed, say so rather than inventing one.
Evaluate `DOCUMENT_TEXT_DETECTION` only as a separately labeled comparison.

## Observations and What It Showed

On November 8, 2026, the owner reported testing OCR output successfully after
the sidebar integration. This is evidence of a working OCR path in the tested
environment, not verification of every account. The owner subsequently supplied
[raw sidebar text and a documented comparison](observations/README.md): 18 of 19
reference display rows match exactly, with Quinn's suffix split across two lines.
Exact deployed version, input hash, and elapsed time remain unrecorded. Staff exclusion,
attendance ordering, and Form generation have not been demonstrated by this test.
This report alone does not close issue #9 or complete M2.

## Cleanup

The planned inline trial creates no persistent image resource. Avoid logging
image payloads or credentials; remove unnecessary private trial artifacts and
revoke any temporary credentials after testing. Record actual cleanup outcomes.

## Sources

- [Cloud Vision setup](https://docs.cloud.google.com/vision/docs/setup)
- [Image OCR and inline REST requests](https://docs.cloud.google.com/vision/docs/ocr)

These are platform documentation, not empirical research or project results.
