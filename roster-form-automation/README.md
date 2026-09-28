# Student Roster Form Automation

Application workspace for the JavaScript Google Apps Script project described in the
[project requirements](../docs/requirements.md).

Status: project foundation only. There is no runnable application yet.
The `.gs` server code, HTML sidebar, and required services will be established in M2 after
the OCR and Google integration experiments.

The intended flow is a saved screenshot, reviewed student names, a Google Sheet,
and a separate template-based Google Form linked beside every student.

Keep screenshots and real roster files in the repository's ignored `data/`
directory, credentials in `secrets/`, and exported run state in `runs/`.
Only synthetic fixtures may be committed. Ignore rules do not protect files
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
