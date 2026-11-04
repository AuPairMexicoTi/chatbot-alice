#!/usr/bin/env bash
set -euo pipefail

expected_commit=${1:-}
if [[ ! "$expected_commit" =~ ^[a-f0-9]{40}$ ]]; then
  echo 'Invalid commit SHA.' >&2
  exit 64
fi

repo=/opt/chatbot-alice
git -C "$repo" fetch --quiet origin main

if ! git -C "$repo" cat-file -e "${expected_commit}^{commit}" 2>/dev/null; then
  echo "Commit $expected_commit is not present in the VPS checkout." >&2
  exit 1
fi

if ! git -C "$repo" merge-base --is-ancestor "$expected_commit" origin/main; then
  echo "Commit $expected_commit is not part of origin/main." >&2
  exit 1
fi

git -C "$repo" show "${expected_commit}:deploy/github-actions-deploy.sh" \
  | /usr/bin/bash -s -- "$expected_commit"
