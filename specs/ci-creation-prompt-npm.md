Create a GitHub Actions workflow at .github/workflows/playwright-tests.yml with the following exact requirements:

Triggers
Run only on pull requests targeting the main branch (pull_request with branches: [ ci ]).

Runner & toolchain
Use ubuntu-latest.
Use the latest LTS Node.js via actions/setup-node@v4 with cache: 'npm'.

Install
Install dependencies with npm (uses package-lock.json, fails if lock file is missing or out of sync):

Install Playwright browsers with system deps:

Test
Run Playwright tests in parallel:

Set CI=true in the job env.
Set timeout-minutes: 30 on the job.

Artifacts (always upload)
Upload the HTML report directory (playwright-report) as artifact named playwright-html-report.
Upload Playwright traces (e.g. test-results/**/trace*.zip or the default traces folder) as artifact named playwright-traces.
Use if: always() on artifact upload steps.

YAML quality
Single job named playwright-tests.
Minimal permissions (read-only) and concurrency to cancel in-progress runs per PR (use a sensible group expression).
Add a final steps order: checkout → setup-node → npm ci → playwright install → test → artifact uploads.
Include brief comments explaining key steps.

Deliverable
Output only the complete YAML. No additional explanation or commentary.