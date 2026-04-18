#!/usr/bin/env bash
# ==============================================
# build_book.sh — 問題集PDFをビルドする
# Usage: ./scripts/build_book.sh
# ==============================================
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
BOOK_DIR="$SCRIPT_DIR/../book"

echo "=== 図で解ける ITパスポート — ビルド開始 ==="
echo "Book directory: $BOOK_DIR"

cd "$BOOK_DIR"

# latexmk でビルド
latexmk main.tex

BUILD_DIR="$BOOK_DIR/_build"
if [ -f "$BUILD_DIR/main.pdf" ]; then
  echo "=== ビルド完了 ==="
  echo "PDF: $BUILD_DIR/main.pdf"
  echo "$(wc -c < "$BUILD_DIR/main.pdf" | tr -d ' ') bytes"
else
  echo "=== ビルド失敗: PDF が見つかりません ==="
  exit 1
fi
