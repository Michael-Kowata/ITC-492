# Project Proposal

## Problem

An instructor needs a separate copy of a Google Form for every student and a
roster that links each name to the correct form. Manually transcribing names,
copying forms, and assembling links creates repetitive work and opportunities
for mismatched links.

## Objective

Build a Python command-line script that takes a saved roster screenshot, lets
the operator correct extracted names, creates a Google Sheet, and makes one
independent copy of an existing Google Form for every approved roster entry.

## Initial Scope

- One operator, one Google account, one form template, and one roster per run.
- A saved PNG or JPEG with a single column of printed student names, one per line.
- Manual review and correction before creating any Google resources.
- Student name in each copied form's title and its responder link in the roster.
- Duplicate-name support and recovery from interrupted runs.

The saved-image format is a proposed baseline for the first implementation;
confirm it against a synthetic sample before M2 concludes. Direct screen capture,
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

Follow the [semester milestones](milestones.md). M1's original deadline has
passed; record actual progress in week 4 and retain the original dates until a
revised schedule is agreed. Authentication and form-copy behavior must be proven
in M2; OCR errors are handled through mandatory roster review. Test with synthetic
names and keep private inputs and credentials out of version control.
