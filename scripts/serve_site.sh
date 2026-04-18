#!/usr/bin/env bash
# ==============================================
# serve_site.sh — サポートサイトをローカルで確認
# Usage: ./scripts/serve_site.sh
# ==============================================
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SITE_DIR="$SCRIPT_DIR/../site"

echo "=== サポートサイト起動 ==="
echo "Site directory: $SITE_DIR"
echo "URL: http://localhost:8000"
echo "Ctrl+C で終了"

cd "$SITE_DIR"
python3 -m http.server 8000
