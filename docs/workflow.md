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

## Living Pull Request Record

Maintain the PR's Change, Verification, and Documentation sections alongside
the issue, paper, Wiki, and agent log. Open a draft PR when an issue's branch is
ready to publish; use its milestone branch as the base. If no PR exists yet,
record evidence in the issue/agent log and transfer it when creating the PR.

- After a meaningful implementation change, summarize actual changes, affected
  behavior, and remaining scope in Change.
- After testing or owner feedback, update Verification with commands/scenarios,
  outcomes, tested commit, dates, and CI/evidence links. Distinguish local mocks,
  hosted checks, owner reports, and independent live tests. Record failures and
  limitations; do not infer a pass from a merge or a fixed environment blocker.
- After documentation updates, link relevant paper sections, Wiki pages, fixture
  notes, and agent-log entries in Documentation. State human acceptance status.
- At each pushed checkpoint and before merge/closure, review all three sections
  against the issue criteria. Replace empty placeholders with evidence, Pending,
  or Not applicable plus a reason. Link the finishing commit only when available.

Edit the existing PR body rather than relying only on scattered comments.
Preserve reviewer/user-written notes. A changed template affects new PRs, not
existing ones; update those explicitly through GitHub or `gh pr edit`.
If remote access is unavailable, retain a local/issue record and report that the
PR remains unsynchronized. Do not claim publishing succeeded without checking.

Screenshots or recordings are optional supporting evidence, not mandatory for
every change. Use fictional/sanitized inputs; never attach student records,
credentials, or private Form/Drive links. Prefer links over duplicating long
paper passages. Historical PR backfills must be labeled retrospective and must
not imply checks were performed before merge when they occurred afterward.

## Wiki Updates

Edit Home, Log, Design, Results, Reading, and Appendix directly in the
[GitHub Wiki](https://github.com/Michael-Kowata/ITC-492/wiki). Do not recreate a
local `wiki/` copy in this repository. The Wiki has its own Git history at
`https://github.com/Michael-Kowata/ITC-492.wiki.git`; clone it separately for
scripted edits and commit checks there. Keep proposal, requirements, issue
plans, and the agent log in the application repository.

The initial scaffold may precede issue creation. Link its finishing commit to
the setup issue once that issue exists; do not invent issue numbers.
