# Requirements and Acceptance Criteria

Status: proposed baseline, with the separate-form requirement confirmed by the
project owner. Zoom's Participants panel is the confirmed input layout;
full proposal acceptance remains pending. Sample validation belongs to M2.

## Workflow

Saved image -> extract names -> operator corrects and approves -> create roster
Sheet -> copy template per student -> write each matching responder link.

| ID | Requirement | Acceptance evidence | Task |
| --- | --- | --- | --- |
| R01 | Read one PNG or JPEG of Zoom's Participants panel | Extract visible names, excluding controls and role/self labels; missing, invalid, or empty input stops before Google writes | T07 |
| R02 | Allow correction, removal, and addition of extracted names | Operator can inspect the complete roster and cancel with no Google resources created | T08 |
| R03 | Give each approved entry a stable ID | Two identical names remain separate entries throughout a run and resume | T08 |
| R04 | Create a Google Sheet for the approved roster | Exactly one row per approved entry, with entry ID, name, responder link, and status | T09 |
| R05 | Make a distinct copy of the template for every entry | Unique form ID per entry; name in title; template questions preserved; source template unchanged | T10 |
| R06 | Keep responses independent | Synthetic submissions to two forms appear only in their respective response sets | T10 |
| R07 | Match names to responder links | Every completed row opens the corresponding form as an intended respondent, not its editor | T11 |
| R08 | Resume without extra resources | Interrupt after Sheet creation, form copy, state save, and row update; retry finds existing resources and completes remaining work | T12 |
| R09 | Report partial failures | Failed entries have an actionable status; successful entries and resource IDs remain recoverable | T12 |
| R10 | Protect private working data | Screenshots, real names, credentials, and run state use ignored directories; committed fixtures use synthetic names | T06, T14 |

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

- Python command-line application; dependencies selected in M2.
- Linux development environment; supported runtime platforms confirmed in M2.
- One authenticated Google account that can access the template and create resources.
- No automatic public sharing, email distribution, or identity enforcement.
- An individual form is not proof of the respondent's identity; access settings
  need to be tested with the intended audience.
- The operator corrects display names and removes non-students. Hidden names,
  gallery-view tiles, scrolling, and multiple screenshots are outside initial scope.
- Sample layout validation, template settings, Google authentication method, and
  performance target remain decisions for the technology trials.
