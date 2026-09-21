# Development Workflow

1. Create a GitHub issue from the task template and assign it to a milestone.
2. Use `milestone/m1` through `milestone/m7` for milestone integration. Create
   `task/<issue-number>-<short-name>` from its milestone branch for each task.
3. Implement one coherent change per commit. Record what was checked in every
   commit message; report unavailable checks honestly.
4. Update relevant documentation and AGENT-LOG.md for Codex-assisted work.
5. Put `Fixes #<issue-number>` in the commit that completes the issue. Use `Refs`
   in intermediate commits. Verify acceptance criteria before finishing.
6. Reuse one task branch per issue, including documentation and clarifications.
   When acceptance criteria are met, merge and push it to the milestone branch,
   link its finishing commit on the issue, and close the issue as completed.
   Delete the merged task branch locally and remotely after verifying publication.
7. When all milestone tasks and exit criteria are complete, merge and push the
   milestone to `main`, close the GitHub milestone, and delete its branch locally
   and remotely. Do not delete a branch containing unmerged work.

GitHub closing keywords act automatically only on the default branch. Close a
completed issue explicitly after milestone integration so it does not remain
open until the end of the milestone. Preserve `Fixes` references as evidence.

Example commit message (replace placeholders with actual evidence):

```text
feat: extract student names from a roster image

Checked: <command or manual check and actual outcome>
Fixes #<issue-number>
```

Keep unfinished work on its task branch. Do not claim that a test passed or a
person accepted a change unless it happened. Record schedule changes in
`docs/milestones.md`, update GitHub milestone due dates, and mention the change
in the weekly wiki log. Update each milestone branch from `main` before starting
its work so it includes earlier completed milestones. Branches organize code;
GitHub milestones group issues and due dates separately.

## Wiki Updates

Edit Home, Log, Design, Results, Reading, and Appendix directly in the
[GitHub Wiki](https://github.com/Michael-Kowata/ITC-492/wiki). Do not recreate a
local `wiki/` copy in this repository. The Wiki has its own Git history at
`https://github.com/Michael-Kowata/ITC-492.wiki.git`; clone it separately for
scripted edits and commit checks there. Keep proposal, requirements, issue
plans, and the agent log in the application repository.

The initial scaffold may precede issue creation. Link its finishing commit to
the setup issue once that issue exists; do not invent issue numbers.
