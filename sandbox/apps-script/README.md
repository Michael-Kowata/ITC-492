# Apps Script Scaffold Trial

## Question

Can a spreadsheet-bound script expose the initial setup and image-selection
interface without requiring instructors to edit code during routine use?

## Setup and Reproduction

Follow [maintainer setup and smoke checks](../../roster-form-automation/README.md).
Use fictional inputs from the [fixture policy](../../roster-form-automation/tests/fixtures/README.md).

## Observations

On November 8, the owner confirmed setup and sidebar functionality: valid links
were accepted and invalid links rejected. The owner subsequently tested live
Cloud Vision OCR and supplied raw output. These are owner-reported checks, not
independent usability testing. Keyboard navigation, independent-copy behavior,
and the complete failure-case checklist remain unverified.

## What It Showed

The tested sidebar can send an image through Apps Script and display OCR text.
See [OCR observations](../google-cloud-vision/observations/README.md). Template
and folder permissions, persistent run state, review, and output creation remain
open. The trial does not establish ease of use for every instructor.

## Cleanup

Close the sidebar to discard its selections. Delete the disposable test Sheet
after testing. This scaffold contains no Drive writes or persistent settings.
