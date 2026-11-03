# GitHub Actions deployment

The `ALICE CI/CD` workflow runs the full validation suite for pull requests and
pushes to `main`. A push to `main` deploys only after validation succeeds. The
deployment asks the VPS's existing systemd service to deploy, then waits for
Docker Compose health checks and reports the service status in the Actions log.

## Required repository Actions secrets

Add these under **Settings → Secrets and variables → Actions → New repository
secret**:

| Secret | Value |
| --- | --- |
| `ALICE_VPS_HOST` | VPS SSH host or IP address |
| `ALICE_VPS_USER` | Dedicated SSH deploy user configured on the VPS |
| `ALICE_VPS_SSH_KEY` | Private key for that deploy user |
| `ALICE_VPS_KNOWN_HOSTS` | Verified `known_hosts` entry for the VPS |

The SSH key should be restricted to a forced command that accepts only
`deploy <40-character-commit-sha>`. That command can run only the existing
`chatbot-alice-auto-deploy.service` via `sudo`, then verify the deployed SHA and
wait for the Compose health checks. Keep the existing systemd timer enabled
until the workflow has completed a successful production deployment. Then
disable the timer so GitHub Actions is the only deployment trigger.

The deploy service uses a `flock` lock, so a timer tick and an Actions-triggered
run cannot deploy the same checkout concurrently. Deployment fails if the
expected commit is not checked out or if containers do not become healthy.
