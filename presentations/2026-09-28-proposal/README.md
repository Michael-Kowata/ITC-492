# Proposal Presentation

- Scheduled date: September 28, 2026
- Audience: ITC-492 class and instructor
- Status: delivered successfully, as reported by the project owner on October 28, 2026
- Issue: https://github.com/Michael-Kowata/ITC-492/issues/35
- Format: open `slides.html` in a browser; print to PDF in landscape if needed.
- Controls: arrow keys or Previous/Next; Home/End jump to first/last slide.
- Suggested duration: 7-10 minutes including the repository walkthrough.
- Demonstrated commit: not recorded; preparation commit is `a1ce678`.

## Repository Walkthrough

Keep the repository open in another tab throughout the presentation.

1. README: objective, sidebar workflow, and deliverable map.
2. docs/requirements.md: one form per student, name/link matching, and retry checks.
3. GitHub M1 and issues #6, #9, #35: accepted scope, upcoming experiments, presentation.
4. Wiki Design and Log: architecture and retrospective progress.
5. sandbox/_template/README.md: how technology trials will record evidence.
6. AGENT-LOG.md and a commit: what Codex changed and what was checked.
7. paper/ and presentations/: semester artifacts.

This is a proposal walkthrough, not a working software demonstration. The
illustrative roster in the deck uses fictional names and contains no real forms.

## Speaker Notes

1. Introduce the goal: turn a Zoom participant screenshot into an editable roster
   and a separate form for each approved student. State that this is the proposal.
2. Explain the repeated copying and transcription the project aims to reduce.
   Time savings are a hypothesis to evaluate, not an existing measured result.
3. Explain local upload and the distinction between the control spreadsheet and
   the output roster. Review is mandatory because display names can be wrong.
4. Explain separate form IDs and response sets; identical names remain separate
   entries. A personalized form does not by itself authenticate its respondent.
5. Explain the small initial scope and why gallery screenshots and multiple images
   are deferred. Focus on a complete path for one supported input layout.
6. Explain Apps Script, HTML sidebar, and OCR as the main technical uncertainty.
   Backend temporary Drive files may be needed even without a manual Drive upload.
7. Explain the planned checks and failure recovery. No accuracy or performance
   results exist yet. The sample size will depend on readable visible entries.
8. Show the repository in the order above. Explain that dates are planning targets,
   M1 is awaiting presentation delivery, and M2 experiments are the next work.

## After Delivery

- Delivery evidence: the project owner reported a successful presentation on
  October 28. September 28 was the scheduled date; the actual date and displayed
  commit were not separately supplied.
- Feedback: develop the paper alongside implementation, organize it across
  multiple pages, and add research on OCR and its scripting integration.
- Response: expanded the proposal into a development report (`f66863b`), added
  OCR research (`b50c7ec`), and split the paper into topic files (`6c7b50e`).
  These changes are published on `main`.
- Follow-up: [issue #19](https://github.com/Michael-Kowata/ITC-492/issues/19)
  tracks continued paper development and final delivery in M7; OCR trials remain
  in [issue #9](https://github.com/Michael-Kowata/ITC-492/issues/9), M2.
- Verification: owner report establishes delivery and feedback. No application
  demonstration, advisor approval, or unreported presentation details are claimed.
