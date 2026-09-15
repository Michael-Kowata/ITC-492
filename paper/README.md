# Capstone Paper

`main.tex` is the write-up; `references.bib` holds verified sources. Match
citation keys to the wiki Reading page. The bibliography is initially empty.

With a LaTeX distribution and latexmk installed, run from this directory:

```sh
latexmk -pdf -interaction=nonstopmode -halt-on-error main.tex
```

Add citations with `\cite{key}` when real sources are entered. Follow the
instructor's formatting requirements when they are available.
