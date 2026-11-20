# M2 Acceptance Record

M2 and all five issues closed November 15, 2026 with owner acceptance.
Source e93ae29 was merged through PR #44 as b72df3d. Hosted CI was accepted
with a billing exception at closure; that exception was resolved November 20.
Final delivery remains December 7, 2026.

## Closed Issues

- #8: workflow design and single shared staff-operated control spreadsheet accepted.
- #9: core OCR/Google feasibility accepted, including owner-tested copying,
  access, isolated responses, template checks, and successful-trial cleanup.
- #10: setup, review reuse and A/B isolation accepted; hosted CI now verified.
- #23: no work logged September 7-13, owner-confirmed; Wiki commit e86b202.
- #24: September 14-20 repository evidence reviewed; Wiki commit ba0537b.

Acceptance was recorded in Wiki commit d18874d; CI resolution in ff93097.
See [Wiki Results](https://github.com/Michael-Kowata/ITC-492/wiki/Results).

## CI Resolution: November 20

Billing initially prevented jobs from starting, not an observed test failure.
These runs now report success:

- [Checkpoint push](https://github.com/Michael-Kowata/ITC-492/actions/runs/43771430365), e93ae29.
- [Pull request](https://github.com/Michael-Kowata/ITC-492/actions/runs/43771457473), e93ae29.
- [Merged main](https://github.com/Michael-Kowata/ITC-492/actions/runs/43773008874), b72df3d, rerun after billing resolution.

The workflow runs six JavaScript mock suites on Node 22 and checks whitespace.
Earlier local injected-V8 checks passed 239 assertions. Hosted success is separate
evidence; neither environment tests live Google services or browser usability.
Local native Node availability is not implied by hosted CI.

## Evidence Limits

The organization controls template settings. Required name/email answers provide
self-reported identification, not authenticated identity. Owner tests confirmed
signed-out and external-account access, A/B isolation, and no carryover between
reviews. One operator uses the canonical control spreadsheet at a time.

See [trial observations](../sandbox/google-forms-integration/observations.md).
Latest template checks PASS; the earlier aggregate failure has no established
cause. Acceptance does not establish live failure/cancellation cleanup, complete
quiz-setting fidelity, measured execution limits, production recovery/output
preservation, or another operator's first-use authorization. Production generation,
recovery and broader evaluation remain later work. Historical log dates are
preserved, not rewritten to imply November work happened in September.
