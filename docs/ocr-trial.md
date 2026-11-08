# First OCR Trial

Milestone: M2. Related issue: [#9](https://github.com/Michael-Kowata/ITC-492/issues/9).
Status: Google Cloud Vision OCR selected by the owner on November 8, 2026.
The owner reports successful live OCR output on November 8, 2026. Raw output,
timing, and exact run metadata were initially pending. The subsequent
[owner-supplied output comparison](../sandbox/google-cloud-vision/observations/README.md)
records 18/19 exact display-row matches and a split attendance suffix. Timing and
exact run metadata remain pending; this is not a general accuracy estimate.
See [Cloud Vision trial setup](../sandbox/google-cloud-vision/README.md).

## Inputs and Reference

- Image: `roster-form-automation/tests/fixtures/Zoom Screenshot Sample.png`.
- Reference: `roster-form-automation/tests/fixtures/video-conference-attendance.expected.json`.
- Provenance: real Zoom capture with AI-replaced names and avatars cropped out.
- Native size: 172 x 612 pixels; 19 visible rows.
- Expected student roster: 17 entries, excluding IT Support and Instructor.
- Preserve `- IP`; place the two in-person students first, retaining source order
  within each attendance group. Instructor review is still required.

## Procedure

1. Configure Google Cloud Vision for the trial after reviewing permissions,
   billing, data handling, and Apps Script integration. Start with
   `TEXT_DETECTION`; compare `DOCUMENT_TEXT_DETECTION` separately if needed.
   Record reproduction instructions in `sandbox/google-cloud-vision/`.
2. Use only the sanitized fixture. Record engine/version, language, configuration,
   source commit (and uncommitted changes), environment, and input dimensions.
3. Run recognition at native resolution first. Preserve the raw response before
   name cleanup or manual correction, and record elapsed recognition time.
4. Compare extracted display rows with all 19 reference rows in sequence. Ignore
   leading/trailing whitespace only for the first exact-match comparison; retain
   punctuation, spelling, case, and attendance/role suffixes. Document any other
   normalization separately. Preserve repeated names as separate occurrences.
5. Report exact row matches out of 19, missing rows, extra rows, and incorrect
   rows. Count each reference row at most once; do not silently drop failures.
6. Separately apply the reviewed roster policy and compare with the 17 ordered
   reference entries. Check staff exclusion, both retained `- IP` suffixes, and
   stable in-person-first ordering. Record required manual corrections.
7. If recognition is poor, vary one preprocessing condition at a time and retain
   the native-resolution baseline. Do not claim that resizing restores missing
   detail. A higher-resolution sanitized fixture can be a separate trial.
8. Record whether any image left the browser, which temporary resources were
   created, and whether cleanup succeeded. Test failure/cancellation cleanup if
   the candidate uses temporary storage. Never put tokens or private IDs in logs.

## Evidence and Completion

Store sanitized raw output, measurements, reproduction steps, and limitations in
the technology sandbox. Update the paper Results section only with observed
outcomes. No accuracy threshold is asserted before the first trial.

This trial is complete when another person can reproduce recognition, inspect
the measured errors, and understand whether the candidate should be integrated
or replaced. It does not complete all of M2 or verify Google Form permissions.
Next integration: sidebar upload -> OCR -> editable roster review, with no Form
creation until explicit approval. Template/folder permission checks remain a
separate Google integration trial.

The screenshot has no duplicate names; the separate duplicate-name JSON fixture
tests roster handling only. A duplicate-name image is still needed to evaluate
OCR on repeated names. One AI-edited, cropped screenshot is not representative
evidence for all Zoom screenshots or real classroom accuracy.
