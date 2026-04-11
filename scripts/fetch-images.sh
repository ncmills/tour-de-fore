#!/usr/bin/env bash
# Thin wrapper: pulls latest shared cache, fetches anything this project
# needs, commits + pushes back so all other projects benefit.
#
# Usage: npm run fetch:images [-- --limit=20]
set -e

SHARED_REPO="${SHARED_IMAGE_CACHE_PATH:-$HOME/shared-image-cache}"

if [ ! -d "$SHARED_REPO" ]; then
  echo "Cloning shared-image-cache to $SHARED_REPO ..."
  git clone https://github.com/ncmills/shared-image-cache.git "$SHARED_REPO"
else
  echo "Pulling latest shared cache..."
  git -C "$SHARED_REPO" pull --rebase --quiet
fi

# Forward all extra args to the shared fetcher (e.g. --limit=20)
cd "$SHARED_REPO"
npx tsx scripts/fetch.ts --project=tdf --commit "$@"
