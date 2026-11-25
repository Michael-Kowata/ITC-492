# Test Assets

Only fictional, non-sensitive fixtures belong here. `expected-names.json` is a
starter roster, not OCR evidence. Repeated display names represent separate people.

## AI-Edited Zoom Capture

`Zoom Screenshot Sample.png` is a real Zoom Participants capture with
all names replaced using AI, as reported by the owner on November 8, 2026.
It is not wholly synthetic. It has 19 visible rows in a dark participant layout.
AI editing may affect text rendering; this fixture alone cannot establish OCR
accuracy on unedited captures.

`video-conference-attendance.expected.json` contains manually transcribed display
text, not OCR results or an approved student roster. Role labels and `- IP` are
preserved for extraction comparison. The owner confirmed that source rows 1 and
2 (IT Support and Instructor) are excluded from the student roster. The `- IP`
suffix denotes in-person attendance and remains in reviewed roster names.
Strip it only when naming copied Forms and Drive files, not from this reference.
The expected roster has 17 students: 2 in-person and 15 online. Riley Carter - IP
and Quinn Harmon - IP come first, followed by the other students in screenshot
order. `expectedStudentSourceRows` uses one-based positions in the raw `rows`
array, keeping extraction evidence separate from roster filtering and ordering.
The older `expected-names.json` is an unrelated duplicate-name fixture.

The owner supplied a replacement cropped to remove avatars on November 8, 2026.
Visual inspection found no avatars, emails, or meeting IDs; all 19 display rows
match the reference transcription. The PNG is 172 x 612 pixels, 123,905 bytes.
Its chunks contain image data, color-space/gamma, and pixel-density information;
no text or EXIF chunks were found. The replacement is available for versioning;
the original `Video conference attendance list.png` remains ignored as a safeguard.
No image modification was performed by Codex.

The small text size is an OCR test condition, not evidence of general extraction
accuracy. The owner supplied live OCR output on November 8, 2026. The
[recorded comparison](../../../sandbox/google-cloud-vision/observations/README.md)
found 18/19 exact reference-row matches, with `Quinn Harmon - IP` split into
`Quinn Harmon - I` and a separate `IP` line. Manual review is required.
Exact input identity and deployed revision were not independently verified;
this one sample does not establish accuracy on other screenshots.

## Upload Acceptance Checks: November 25, 2026

For [issue #11](https://github.com/Michael-Kowata/ITC-492/issues/11), the owner
reported these live checks:

| Input | Reported outcome |
| --- | --- |
| Valid JPEG | Successfully processed |
| Oversized image | Gracefully rejected with an explanation |
| Corrupted image | Gracefully rejected with an explanation |
| Image containing no text | Gracefully rejected with an explanation |

These are owner-reported passes, not independent reruns or newly committed
fixtures. Exact files, sizes, error wording, execution times, and deployed
revision were not supplied. The JPEG check establishes format support, not
an additional measured OCR accuracy result. No claim is made that these checks
independently verified unchanged roster state or service-side data retention.

Keep real screenshots and their expected names under the root ignored `data/`
directory, for example `data/ocr/private-case-01/`. Never commit student names,
emails, faces, meeting IDs, actual Form/folder links, or access tokens. Review
staged files: ignore rules do not protect previously tracked files.

Technology-specific trial instructions and sanitized observations go in
`sandbox/<technology>/README.md`; reference fixtures rather than duplicating them.
Selection previews the file locally. Choosing Extract text sends it through
Apps Script to Cloud Vision; the current inline OCR path does not save an image
to Drive. Live recognition is supported by the owner evidence above; independent
data-handling validation and service-retention verification are not established.
