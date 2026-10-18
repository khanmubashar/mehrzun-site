#!/usr/bin/env bash
# Build the static site and publish ./out to the gh-pages branch (GitHub Pages "deploy from branch").
# Use this while GitHub Actions is unavailable; otherwise pushing to main runs .github/workflows/deploy.yml.
set -euo pipefail
cd "$(dirname "$0")/.."

REPO_URL="$(git remote get-url origin)"
BASE_PATH="${NEXT_PUBLIC_BASE_PATH-/mehrzun-site}"   # set to "" when using a custom domain

NEXT_PUBLIC_BASE_PATH="$BASE_PATH" npm run build
touch out/.nojekyll

TMP="$(mktemp -d)"
cp -R out/. "$TMP"
cd "$TMP"
git init -q -b gh-pages
git add -A
git commit -qm "Deploy $(date -u +%Y-%m-%dT%H:%MZ)"
git push -f "$REPO_URL" gh-pages
rm -rf "$TMP"
echo "Published. GitHub Pages updates in about a minute."
