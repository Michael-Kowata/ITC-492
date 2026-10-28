# Capstone Paper

`main.tex` is the write-up; `references.bib` holds verified sources. Match
citation keys to the wiki Reading page when recording new reading notes. The
bibliography includes Google's platform documentation, Smith's Tesseract paper,
the CRNN and PP-OCR preprints, and Tesseract.js software documentation. The paper
distinguishes research findings from implementation guidance and project inferences.

The paper is a living proposal and development report, with a title page,
contents page, numbered sections, references, and an appendix. Update design
and evaluation sections as work happens; do not wait until the final milestone.
Keep planned behavior distinct from implementation and measured results.

With a LaTeX distribution and latexmk installed, run from this directory:

```sh
latexmk -pdf -interaction=nonstopmode -halt-on-error main.tex
```

Add citations with `\cite{key}` when real sources are entered. Follow the
instructor's formatting requirements when they are available.
