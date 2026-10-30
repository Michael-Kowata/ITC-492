# Project Proposal

## Problem

An instructor needs a separate copy of a Google Form for every student and a
roster that links each name to the correct form. Manually transcribing names,
copying forms, and assembling links creates repetitive work and opportunities
for mismatched links.

## Objective

Build a JavaScript Google Apps Script project that accepts a sidebar screenshot upload, lets
the operator correct extracted names, creates a Google Sheet, and makes one
independent copy of an existing Google Form for every approved roster entry.

## Initial Scope

Participants are non-traditional learners taking a course toward OSHA
certification. Respondents need a Google account, but not a school-issued
account. The project does not issue certifications or verify eligibility.

- Multiple instructors use independent copies of a reusable control spreadsheet.
  Each copy uses its operator's Google account, settings, and run records.
- One operator, one form template, and one roster per run; simultaneous shared
  operation within one control spreadsheet is outside the initial scope.
- A guided sidebar supports setup, upload, review, generation, and results.
  Routine users must not edit source code or supply internal resource IDs.
- Configure the template Form link and destination Drive folder link before upload.
- Store student form copies in that folder; proposed default is to store the
  output roster there too. Validate intended respondent access before reporting success.
- A saved PNG or JPEG of Zoom's Participants panel, containing visible names.
- Exclude interface controls and role/self labels; let the operator remove non-students.
- Manual review and correction in a control spreadsheet staging tab before creating
  the separate output roster spreadsheet and student forms.
- Student name in each copied form's title and its responder link in the roster.
- Duplicate-name support and recovery from interrupted runs.

The owner confirmed the Participants panel input. Validate it against a sample
with fictional names in M2; sample testing is not needed to define M1 scope.
Only names visible in one screenshot are included. Gallery tiles, scrolling,
and combining screenshots are deferred. Direct screen capture,
handwriting, arbitrary table layouts, email delivery, dashboards, grading, and
aggregating responses are outside the initial scope.

## Deliverables and Evaluation

Deliver the script, setup instructions, synthetic fixtures, repeatable evaluation,
and the semester artifacts listed in the root README. Evaluate raw OCR accuracy,
manual corrections, correct form/link matching, template preservation, independent
responses, and recovery without extra copies. Detailed pass criteria are in
[requirements.md](requirements.md); no measured results are claimed yet.

## Responsibilities

The student owns scope decisions, Google account setup, human verification,
weekly reports, the paper, and presentations. Codex assists with implementation
and checks recorded in AGENT-LOG.md. Advisor approval is not yet recorded.

## Schedule and Risks

Follow the [revised project milestones](milestones.md). M1 completed October 28;
M2-M7 are planned from October 29 through December 7, 2026, the owner's confirmed
final delivery deadline. Other course requirements and presentation dates require
separate confirmation. Authentication and form-copy behavior must be proven
in M2; OCR errors are handled through mandatory roster review. Test with synthetic
names and keep private inputs and credentials out of version control.

## Sidebar Upload Baseline (2026-09-27)

A control spreadsheet hosts the custom menu, HTML sidebar, and roster review
staging tab. Upload a PNG or JPEG directly from the computer; no manual Drive
upload is required. After approval, generate a separate roster spreadsheet
and one template-based form per student.

OCR may require temporary Drive resources. M2 will select OCR, authorization
scopes, upload limits, persistent cloud run state, and cleanup on success,
failure, or cancellation. M3 implements upload and review. No OCR results are
claimed and milestone dates are unchanged.
