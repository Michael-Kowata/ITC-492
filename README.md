# ITC-492: Student Roster Form Automation

Senior capstone project with a revised development schedule extending beyond the original semester. A JavaScript Google Apps Script project
will extract student names from a roster screenshot, let the user correct them,
create a Google Sheet, and copy a template Google Form separately for each
student. Each roster row will contain the student's name and their own form's
responder link. Implementation has not started.

## Focused Scope

1. Upload a Zoom Participants panel screenshot from the computer through a Sheets sidebar.
2. Extract names with OCR and require staging-tab review before creating the output roster and student forms.
3. Create a Google Sheet from the approved roster.
4. Copy one existing template into a distinct Google Form per student, with
   the student's name in its title and independent responses.
5. Write the matching responder link beside each name.

The initial version targets one roster layout, one template, and one Google
account. A shared form with prefilled links does not meet the requirement.
Duplicate names remain separate roster entries. Interrupted runs must resume
without creating duplicate forms. Public roster sharing, email delivery, a standalone web
application, and response aggregation are outside the initial scope.

## Repository Map

| Path | Purpose |
| --- | --- |
| [roster-form-automation/](roster-form-automation/README.md) | Google Apps Script application workspace |
| [Proposal](docs/proposal.md) | Problem, deliverables, scope, and responsibilities |
| [Requirements](docs/requirements.md) | Observable acceptance criteria for the script |
| [M1 issues](docs/issues/M1.md) | Links to live setup, scope, and reporting tasks |
| [Project workflow](docs/workflow.md) | Task branches, commits, issues, and verification |
| [Project schedule](docs/milestones.md) | Revised milestones, original dates, and schedule changes |
| [Issue backlog](docs/backlog.md) | Index of live GitHub tasks |
| [GitHub Wiki](https://github.com/Michael-Kowata/ITC-492/wiki) | Home, Log, Design, Results, Reading, and Appendix; updated directly on GitHub |
| `sandbox/` | One documented experiment per technology evaluated |
| [AGENT-LOG.md](AGENT-LOG.md) | Codex contributions and human acceptance checks |
| `paper/` | LaTeX write-up and bibliography |
| `presentations/` | Presentation outlines and live repository checkpoints |

## Deliverable Status

- Repository structure: scaffolded; application implementation has not started.
- GitHub issues and milestones: published; update task status and due dates on GitHub.
- Development timeline: foundation work from September 14, 2026; M1 completed October 28. M2-M7 targets run October 29, 2026-January 20, 2027.
- Wiki: all six pages published to GitHub Wiki; no duplicate local wiki files.
- M1: completed October 28, 2026; scope, foundation, tracking, and proposal presentation recorded. M2 technology trials are next.
- Weekly reports: week 4 records project setup and the scope change.
- Experiments, results, and presentations: templates only.

Start with [the workflow](docs/workflow.md) and [the backlog](docs/backlog.md).
