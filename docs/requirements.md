# Requirements and Acceptance Criteria

Status: proposed baseline, with the separate-form requirement confirmed by the
project owner. Zoom's Participants panel is the confirmed input layout;
The project owner accepted the revised baseline, including Apps Script and sidebar
upload. Sample validation belongs to M2; advisor approval is not claimed.

## Workflow

Configure template Form and destination folder -> validate resources -> sidebar
upload -> OCR -> staging-tab review and approval -> create separate roster
Sheet -> copy template per student -> write each matching responder link.

| ID | Requirement | Acceptance evidence | Task |
| --- | --- | --- | --- |
| R01 | Upload 1-3 PNG/JPEG Participants screenshots per selection into one draft | Process sequentially; retain successful images on failure; retry failed items; preserve corrections and sources; skip exact cross-image overlaps and invalidate approval after additions | T07, T08 |
| R02 | Allow correction, removal, and addition of extracted names | Operator can inspect the complete roster and cancel without creating output rosters or student forms; temporary OCR resources follow the cleanup policy | T08 |
| R03 | Give each approved entry a stable ID | Two identical names remain separate entries throughout a run and resume | T08 |
| R04 | Create a Google Sheet for the approved roster | Exactly one row per approved entry, with entry ID, name, responder link, and status | T09 |
| R05 | Make a distinct copy of the template for every entry | Unique form ID per entry; name in title; template questions preserved; source template unchanged | T10 |
| R06 | Keep responses independent | Synthetic submissions to two forms appear only in their respective response sets | T10 |
| R07 | Match names to responder links | Every completed row opens the corresponding form as an intended respondent, not its editor | T11 |
| R08 | Resume without extra resources | Interrupt after Sheet creation, form copy, state save, and row update; retry finds existing resources and completes remaining work | T12 |
| R09 | Report partial failures | Failed entries have an actionable status; successful entries and resource IDs remain recoverable | T12 |
| R10 | Protect private working data | Local private artifacts use ignored directories; cloud data access and cleanup are documented; committed fixtures use synthetic names | T06, T14 |
| R11 | Configure template Form and destination folder links | Resolve and confirm resource names and IDs; reject invalid types or inadequate access before processing; snapshot configuration per run | T04, T05, T10 |
| R12 | Prepare copied forms for the intended respondents | Validate publication/response settings and chosen access policy; report failures without silently broadening access; no automatic public sharing of roster or folder | T05, T10, T11 |
| R13 | Provide a guided interface for non-technical instructors | Setup, upload, review, approval, progress, and results can be completed without source edits or internal IDs; resolved resource names and approved count are shown | T04, T06, T08 |
| R14 | Support independent instructor copies | Two separately configured copies use only their own run records and selected resources; copied templates contain no prior roster, private configuration, or credentials | T04, T06, T14 |
| R15 | Provide usable feedback and recovery | Keyboard-accessible labeled controls, textual status, actionable errors, and retry of failed entries without duplicate creation; observe at least one non-technical instructor completing the representative workflow without developer intervention | T08, T12, T13 |

See [workflow design](architecture.md) for the proposed record fields, resource
validation, publication steps, and failure recovery.

## Attendance and Administration Policy

Exclude IT Support and Instructor entries from Form creation; the instructor
confirms exclusions during review. Do not treat every host/co-host as a
non-student solely because of their Zoom role.

Preserve the `- IP` suffix in approved names and roster rows, but not Form titles: it
denotes in-person attendance. Entries without it are treated as online under
the current naming convention, subject to instructor correction during review.
Create and list in-person entries first, preserving screenshot order within
each group as the baseline ordering. Keep stable entry IDs when reordering.
The instructor administers the in-person tests first through the existing
link-distribution workflow. Creation order alone does not prevent online
students from responding; automatic timed release/access gating is not included.

Acceptance: the current 19-row fixture yields 17 student Forms, with Riley
Carter - IP and Quinn Harmon - IP first, suffixes intact, and no IT Support or
Instructor Form. These are expected outcomes, not implemented/tested results.

## Form Naming Policy (November 9)

Planned Form title and Drive filename: `Student Name - Template Form Title`.
Read the title from the template Form, not its link or Drive filename. Remove
only the student's trailing `- IP` attendance marker when naming; preserve
internal hyphens, reviewed attendance, and in-person-first ordering.
Example: `Riley Carter - IP` becomes `Riley Carter - OSHA Final Exam` for template
`OSHA Final Exam`. Keep the template unchanged. Equal names receive distinct
Form IDs; titles are not identity or retry keys. Snapshot the template title
with generation configuration for consistent retries. These are M4/#14
requirements, not implemented behavior.

## Evaluation Method

Usability is a core acceptance criterion. In addition to technical checks,
observe a non-technical instructor completing the workflow using brief written
instructions without developer assistance; record failures and requested help.

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

- Multiple instructors use separate copies of the control spreadsheet, with
  independent configuration and run records. Shared simultaneous operation is deferred.

- JavaScript in Google Apps Script V8, bound to a control spreadsheet; server logic in `Code.gs` and sidebar UI in `Sidebar.html`.
- Users select a local image from Downloads or another folder; no manual Drive upload or Drive link is required.
- One authenticated Google account that can access the template and create resources.
- Respondents are OSHA-course learners: require Google sign-in, accept personal
  accounts, and do not restrict responses to a school domain. Validate with an
  external personal account and a signed-out session in M2.
- No automatic public sharing, email distribution, or identity enforcement.
- An individual form is not proof of the respondent's identity; access settings
  need to be tested with the intended audience.
- The operator corrects display names and removes non-students. Hidden names,
  gallery-view tiles and automatic scrolling are outside scope. The operator may
  scroll manually and supply successive screenshots; only visible entries are
  considered. Matching names require manual overlap review.
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
