#!/usr/bin/env bash
# =============================================================
# serve_site.sh
# サポートサイトをローカルで確認する
# =============================================================
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SITE_DIR="$ROOT_DIR/site"
PORT="${1:-8000}"

if ! command -v python3 >/dev/null 2>&1; then
  echo "[ERROR] python3 が見つかりません。" >&2
  exit 1
fi

echo "[serve_site] http://localhost:${PORT}  (Ctrl-C で終了)"
cd "$SITE_DIR"
exec python3 -m http.server "$PORT"
