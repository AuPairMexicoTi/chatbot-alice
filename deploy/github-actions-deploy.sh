#!/usr/bin/env bash
set -euo pipefail

expected_commit=${1:-}
if [[ ! "$expected_commit" =~ ^[a-f0-9]{40}$ ]]; then
  echo 'Invalid commit SHA.' >&2
  exit 64
fi

cd /opt/chatbot-alice
exec 9>/run/lock/chatbot-alice-auto-deploy.lock
flock -n 9 || {
  echo 'Another ALICE deployment is already running.' >&2
  exit 75
}

git fetch --quiet origin main
git cat-file -e "${expected_commit}^{commit}"
git merge-base --is-ancestor "$expected_commit" origin/main || {
  echo "Refusing to deploy $expected_commit because it is not on origin/main." >&2
  exit 1
}

current_commit=$(git rev-parse HEAD)
if [[ "$current_commit" != "$expected_commit" ]]; then
  git merge-base --is-ancestor "$current_commit" "$expected_commit" || {
    echo "Refusing non-fast-forward deploy: VPS is at $current_commit, requested $expected_commit." >&2
    exit 1
  }
  git merge --ff-only --quiet "$expected_commit"
fi

deployed_commit=$(git rev-parse HEAD)
if [[ "$deployed_commit" != "$expected_commit" ]]; then
  echo "Checkout verification failed: expected $expected_commit, found $deployed_commit." >&2
  exit 1
fi

docker compose -f compose.production.yml up -d --build --wait --wait-timeout 300
docker compose -f compose.production.yml ps
systemctl disable --now chatbot-alice-auto-deploy.timer >/dev/null 2>&1 || true
printf 'ALICE deployed and healthy at %s\n' "$deployed_commit"
