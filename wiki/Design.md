# Design

Status: scope confirmed; implementation and technology selection pending.

## Problem and Scope

Help an instructor turn a saved roster screenshot into a Google Sheet with
one separate Google Form per student. Begin with a command-line script, one
roster layout, one existing form template, and one Google account.

The user reviews and corrects OCR output before any Google resources are
created. Each form has the student's name in its title and its own responses.
Automatic screen capture, email delivery, response aggregation, and a web UI
are deferred. The script does not make the roster publicly accessible.

## Architecture

Planned flow: image input -> OCR -> roster review -> Google Sheet creation ->
template copies -> corresponding responder links written to the sheet.

Track a stable roster entry ID, name, form ID, responder URL, and completion
status for each row. Names are display values, not unique identifiers. Store
run progress locally so a failed write or retry can reconcile existing copies
before creating anything new. Form copying, responder access, and authentication
must be proven in sandbox experiments before implementation choices are final.

## Acceptance Criteria

- Every approved roster entry has exactly one distinct form copied from the template.
- Template questions are preserved and each form title includes the student name.
- Every sheet row has the correct responder URL, never the edit URL.
- Two students with the same name receive distinct forms and roster entries.
- Retrying an interrupted run does not create additional copies.
- A representative intended respondent can open and submit the assigned form.
- Test submissions appear only in the corresponding form's responses.

## Data Handling

Keep screenshots, real rosters, credentials, tokens, and run state out of Git.
Use synthetic student names in demonstrations. Document access permissions and
local data cleanup. A separate form does not by itself enforce student identity;
respondent restrictions depend on the selected Google account and form settings.

## Decisions

| Date | Decision | Alternatives and evidence | Related issue |
| --- | --- | --- | --- |
| 2026-09-20 | Separate form per student | User confirmed independent forms; shared prefilled links are excluded | Pending |
