# Student Roster Form Automation

Application workspace for the Python script described in the
[project requirements](../docs/requirements.md).

Status: project foundation only. There is no runnable application yet.
Dependencies and the application entry point will be established in M2 after
the OCR and Google integration experiments.

The intended flow is a saved screenshot, reviewed student names, a Google Sheet,
and a separate template-based Google Form linked beside every student.

Keep screenshots and real roster files in the repository's ignored `data/`
directory, credentials in `secrets/`, and resumable run state in `runs/`.
Only synthetic fixtures may be committed. Ignore rules do not protect files
that were already tracked; review staged changes before every commit.
