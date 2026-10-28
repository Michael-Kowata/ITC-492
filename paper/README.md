# Capstone Paper

`main.tex` assembles the write-up; `sections/` contains the text and
`references.bib` holds verified sources. Match
citation keys to the wiki Reading page when recording new reading notes. The
bibliography includes Google's platform documentation, Smith's Tesseract paper,
the CRNN and PP-OCR preprints, and Tesseract.js software documentation. The paper
distinguishes research findings from implementation guidance and project inferences.

The paper is a living proposal and development report, with a title page,
contents page, numbered sections, references, and an appendix. Update design
and evaluation sections as work happens; do not wait until the final milestone.
Keep planned behavior distinct from implementation and measured results.

## File Structure

Edit the file for the topic you are working on:

| File under `sections/` | Contents |
| --- | --- |
| `front-matter.tex` | Title page and abstract |
| `introduction.tex` | Problem, objectives, and scope |
| `related-work.tex` | OCR research and scripting background |
| `requirements.tex` | Requirements and data handling |
| `design.tex` | Proposed workflow and components |
| `evaluation.tex` | Planned tests and measurements |
| `results.tex` | Evidence, presentation feedback, and limitations |
| `development-plan.tex` | Development and ongoing documentation plan |
| `conclusion.tex` | Conclusions and future work |
| `appendix.tex` | Supporting artifacts |

`main.tex` keeps the packages, author/title settings, section order, page breaks,
contents, and bibliography. Each `\input{sections/name}` inserts that file's
contents at that position. Section files do not need their own document preamble.
Always compile `main.tex` from the `paper/` directory, not an individual section.

File boundaries are for organization, not fixed PDF pages: LaTeX flows text
across pages automatically. The existing `\clearpage` commands remain in
`main.tex`. We use `\input` rather than `\include` to avoid adding page breaks
at every file boundary.

With a LaTeX distribution and latexmk installed, run from this directory:

```sh
latexmk -pdf -interaction=nonstopmode -halt-on-error main.tex
```

Add citations with `\cite{key}` when real sources are entered. Follow the
instructor's formatting requirements when they are available.
