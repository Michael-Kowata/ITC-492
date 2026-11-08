# Owner Output 01

Evidence: sidebar OCR text pasted by the owner on November 8, 2026, saved in
`owner-output-01.txt` with its line breaks preserved. This is not the complete
Vision JSON response. Exact deployed source revision, elapsed time, API model
version, and input file hash were not supplied. Comparison uses the current
`Zoom Screenshot Sample.png` reference; exact input identity is not independently
verified.

Comparison trims surrounding whitespace and aligns rows in sequence, allowing
insertions rather than shifting every row after a split. Eighteen of 19 reference
display rows match exactly (94.7% reference-row match rate). Reference row 9,
`Quinn Harmon - IP`, appears as `Quinn Harmon - I` followed by a separate `IP`
line. There are 20 output lines: one incorrect row and one extra fragment;
no entire participant is missing in the manual alignment. This is not character
accuracy or a general accuracy estimate. The denominator includes two staff rows.

Required correction: reconstruct `Quinn Harmon - IP` as one reviewed entry and
remove the standalone fragment. Merely joining the lines would produce `- I IP`,
so blind newline removal is insufficient. The other 18 display rows are unchanged.
An actual operator correction count/time has not been measured.

The review implementation should flag incomplete attendance suffixes and
standalone fragments for confirmation, not create an extra student or classify
Quinn as online. After correction and staff exclusion, the expected roster stays
17 students, including two in-person students first. This output does not prove
that filtering, ordering, or Form generation works.
