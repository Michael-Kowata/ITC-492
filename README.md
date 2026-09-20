# ITC-492: Student Roster Form Automation

Senior capstone project organized around a 14-week semester. A Python script
will extract student names from a roster screenshot, let the user correct them,
create a Google Sheet, and copy a template Google Form separately for each
student. Each roster row will contain the student's name and their own form's
responder link. Implementation has not started.

## Focused Scope

1. Accept a saved roster screenshot; direct screen capture is a later option.
2. Extract names with OCR and require review before creating Google resources.
3. Create a Google Sheet from the approved roster.
4. Copy one existing template into a distinct Google Form per student, with
   the student's name in its title and independent responses.
5. Write the matching responder link beside each name.

The initial version targets one roster layout, one template, and one Google
account. A shared form with prefilled links does not meet the requirement.
Duplicate names remain separate roster entries. Interrupted runs must resume
without creating duplicate forms. Public roster sharing, email delivery, a web
interface, and response aggregation are outside the initial scope.

## Repository Map

| Path | Purpose |
| --- | --- |
| [roster-form-automation/](roster-form-automation/README.md) | Python application workspace |
| [Proposal](docs/proposal.md) | Problem, deliverables, scope, and responsibilities |
| [Requirements](docs/requirements.md) | Observable acceptance criteria for the script |
| [M1 issues](docs/issues/M1.md) | Detailed setup, scope, and reporting tasks |
| [Project workflow](docs/workflow.md) | Task branches, commits, issues, and verification |
| [Semester schedule](docs/milestones.md) | Milestones, dates, and schedule changes |
| [Issue backlog](docs/backlog.md) | Tasks to create as GitHub issues |
| [Wiki Home](wiki/Home.md) | Local source for the six required wiki pages |
| `sandbox/` | One documented experiment per technology evaluated |
| [AGENT-LOG.md](AGENT-LOG.md) | Codex contributions and human acceptance checks |
| `paper/` | LaTeX write-up and bibliography |
| `presentations/` | Presentation outlines and live repository checkpoints |

## Deliverable Status

- Repository structure: scaffolded; application implementation has not started.
- GitHub issues and milestones: planned locally, not yet created remotely.
- Milestone calendar: August 24 through November 29, 2026 (14 weeks).
- Wiki: local Markdown source; not yet published to the GitHub Wiki.
- M1: proposal, requirements, and issue drafts prepared; approval and remote tracking pending.
- Weekly reports: week 4 records project setup and the scope change.
- Experiments, results, and presentations: templates only.

Start with [the workflow](docs/workflow.md) and [the backlog](docs/backlog.md).
