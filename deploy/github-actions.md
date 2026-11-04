# GitHub Actions deployment

The `ALICE CI/CD` workflow runs the full validation suite for pull requests and
pushes to `main`. A push to `main` deploys only after validation succeeds. The
workflow sends the exact commit SHA to the VPS. The VPS fetches `main`, checks
that the requested SHA belongs to it, fast-forwards its checkout to that SHA,
builds the Compose stack, and waits for healthy containers.

## Required repository Actions secrets

Add these under **Settings → Secrets and variables → Actions → New repository
secret**:

| Secret | Value |
| --- | --- |
| `ALICE_VPS_HOST` | VPS SSH host or IP address |
| `ALICE_VPS_USER` | Dedicated SSH deploy user configured on the VPS |
| `ALICE_VPS_SSH_KEY` | Private key for that deploy user |
| `ALICE_VPS_KNOWN_HOSTS` | Verified `known_hosts` entry for the VPS |

The SSH key is restricted to a forced command that accepts only
`deploy <40-character-commit-sha>`. Install
`deploy/github-actions-entrypoint.sh` as
`/usr/local/sbin/chatbot-alice-actions-deploy` on the VPS, owned by root and
mode `0755`. The existing `alice-deploy-proxy` should invoke that executable
with the validated SHA using non-interactive sudo. The entrypoint loads the
versioned `deploy/github-actions-deploy.sh` from the requested commit, so the
VPS does not need to be checked out at that commit before deployment starts.

The deploy script shares a `flock` lock with the legacy timer, rejects
non-fast-forward deployments, verifies the exact checkout SHA, and waits up to
five minutes for healthy Compose services. The legacy timer is disabled after a
successful GitHub Actions deployment; Actions does not depend on that timer or
on a GitHub API check-run lookup.
