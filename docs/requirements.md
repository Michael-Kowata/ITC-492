# Requirements and Acceptance Criteria

Status: proposed baseline, with the separate-form requirement confirmed by the
project owner. Zoom's Participants panel is the confirmed input layout;
The project owner accepted the revised baseline, including Apps Script and sidebar
upload. Sample validation belongs to M2; advisor approval is not claimed.

## Workflow

Sheets sidebar upload -> OCR -> staging-tab review and approval -> create separate roster
Sheet -> copy template per student -> write each matching responder link.

| ID | Requirement | Acceptance evidence | Task |
| --- | --- | --- | --- |
| R01 | Upload one PNG or JPEG of Zoom's Participants panel through a Sheets sidebar | Extract visible names, excluding controls and role/self labels; validate missing, invalid, empty, and oversized input before processing | T07 |
| R02 | Allow correction, removal, and addition of extracted names | Operator can inspect the complete roster and cancel without creating output rosters or student forms; temporary OCR resources follow the cleanup policy | T08 |
| R03 | Give each approved entry a stable ID | Two identical names remain separate entries throughout a run and resume | T08 |
| R04 | Create a Google Sheet for the approved roster | Exactly one row per approved entry, with entry ID, name, responder link, and status | T09 |
| R05 | Make a distinct copy of the template for every entry | Unique form ID per entry; name in title; template questions preserved; source template unchanged | T10 |
| R06 | Keep responses independent | Synthetic submissions to two forms appear only in their respective response sets | T10 |
| R07 | Match names to responder links | Every completed row opens the corresponding form as an intended respondent, not its editor | T11 |
| R08 | Resume without extra resources | Interrupt after Sheet creation, form copy, state save, and row update; retry finds existing resources and completes remaining work | T12 |
| R09 | Report partial failures | Failed entries have an actionable status; successful entries and resource IDs remain recoverable | T12 |
| R10 | Protect private working data | Local private artifacts use ignored directories; cloud data access and cleanup are documented; committed fixtures use synthetic names | T06, T14 |

## Evaluation Baseline

Use a fictional-name Participants panel sample with two identical display names.
Target 20 names if they fit legibly; otherwise record the actual visible count.
Compare OCR output with a checked expected roster before manual correction and
report exact-name accuracy and correction count. Do not claim an OCR accuracy
threshold until the M2 experiment establishes a realistic target.

After review, require one distinct form and correct link per approved entry,
with zero additional forms after replaying the same interrupted run. Record total
runtime and the account, template settings, OS, versions, and commit used.
These are planned checks, not completed results.

## Constraints and Open Decisions

- JavaScript in Google Apps Script V8, bound to a control spreadsheet; server logic in `Code.gs` and sidebar UI in `Sidebar.html`.
- Users select a local image from Downloads or another folder; no manual Drive upload or Drive link is required.
- One authenticated Google account that can access the template and create resources.
- No automatic public sharing, email distribution, or identity enforcement.
- An individual form is not proof of the respondent's identity; access settings
  need to be tested with the intended audience.
- The operator corrects display names and removes non-students. Hidden names,
  gallery-view tiles, scrolling, and multiple screenshots are outside initial scope.
- Sample layout validation, template settings, Google authentication method, and
  performance target remain decisions for the technology trials.

## Sidebar Upload Baseline (2026-09-27)

A control spreadsheet hosts the custom menu, HTML sidebar, and roster review
staging tab. Upload a PNG or JPEG directly from the computer; no manual Drive
upload is required. After approval, generate a separate roster spreadsheet
and one template-based form per student.

OCR may require temporary Drive resources. M2 will select OCR, authorization
scopes, upload limits, persistent cloud run state, and cleanup on success,
failure, or cancellation. M3 implements upload and review. No OCR results are
claimed and milestone dates are unchanged.
