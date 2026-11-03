#!/usr/bin/env bash
set -euo pipefail

cd /opt/chatbot-alice
exec 9>/run/lock/chatbot-alice-auto-deploy.lock
flock -n 9 || exit 0

git fetch --quiet origin main
current_commit=$(git rev-parse HEAD)
target_commit=$(git rev-parse origin/main)

if [[ "$current_commit" == "$target_commit" ]]; then
  exit 0
fi

if ! python3 - "$target_commit" <<'PY'
import json
import sys
import urllib.request

commit = sys.argv[1]
url = (
    "https://api.github.com/repos/AuPairMexicoTi/chatbot-alice/commits/"
    f"{commit}/check-runs?per_page=100"
)
request = urllib.request.Request(
    url,
    headers={
        "Accept": "application/vnd.github+json",
        "User-Agent": "chatbot-alice-auto-deploy",
    },
)
with urllib.request.urlopen(request, timeout=15) as response:
    check_runs = json.load(response).get("check_runs", [])

validation = [run for run in check_runs if run.get("name") == "validate"]
passed = any(
    run.get("status") == "completed" and run.get("conclusion") == "success"
    for run in validation
)
sys.exit(0 if passed else 1)
PY
then
  echo "Waiting for the validate GitHub Actions check on $target_commit"
  exit 0
fi

git merge --ff-only --quiet origin/main
docker compose -f compose.production.yml up -d --build --wait --wait-timeout 300
docker compose -f compose.production.yml ps
printf 'ALICE deployed at %s\n' "$(git rev-parse --short HEAD)"
