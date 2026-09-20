# Development Workflow

1. Create a GitHub issue from the task template and assign it to a milestone.
2. Create a branch from the current main branch: `task/<issue-number>-<short-name>`.
3. Implement one coherent change per commit. Record what was checked in every
   commit message; report unavailable checks honestly.
4. Update relevant documentation and AGENT-LOG.md for Codex-assisted work.
5. Put `Fixes #<issue-number>` in the commit that completes the issue. Use `Refs`
   in intermediate commits. Verify acceptance criteria before finishing.
6. Merge into the default branch and confirm GitHub closed the issue. Preserve
   the finishing commit's closing keyword if squashing.

Example commit message (replace placeholders with actual evidence):

```text
feat: extract student names from a roster image

Checked: <command or manual check and actual outcome>
Fixes #<issue-number>
```

Keep unfinished work on its task branch. Do not claim that a test passed or a
person accepted a change unless it happened. Record schedule changes in
`docs/milestones.md`, update GitHub milestone due dates, and mention the change
in the weekly wiki log.

## Wiki Updates

Edit Home, Log, Design, Results, Reading, and Appendix directly in the
[GitHub Wiki](https://github.com/Michael-Kowata/ITC-492/wiki). Do not recreate a
local `wiki/` copy in this repository. The Wiki has its own Git history at
`https://github.com/Michael-Kowata/ITC-492.wiki.git`; clone it separately for
scripted edits and commit checks there. Keep proposal, requirements, issue
plans, and the agent log in the application repository.

The initial scaffold may precede issue creation. Link its finishing commit to
the setup issue once that issue exists; do not invent issue numbers.
