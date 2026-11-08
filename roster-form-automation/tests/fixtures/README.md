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
suffix denotes in-person attendance and must remain in names and Form titles.
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

The small text size is an OCR test condition, not evidence of extraction accuracy.
Record results at this native resolution before considering preprocessing.
No OCR has been run. A higher-resolution privacy-preserving capture may be useful
for comparison if recognition is poor.

Keep real screenshots and their expected names under the root ignored `data/`
directory, for example `data/ocr/private-case-01/`. Never commit student names,
emails, faces, meeting IDs, actual Form/folder links, or access tokens. Review
staged files: ignore rules do not protect previously tracked files.

Technology-specific trial instructions and sanitized observations go in
`sandbox/<technology>/README.md`; reference fixtures rather than duplicating them.
Selection previews the file locally. Choosing Extract text sends it through
Apps Script to Cloud Vision; the current inline OCR path does not save an image
to Drive. Live recognition and data-handling validation remain pending.
