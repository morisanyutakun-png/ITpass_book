#!/usr/bin/env bash
# =============================================================
# build_book.sh
# book/main.tex を LuaLaTeX でビルドする
# 前提: TeX Live 2022 以降 / luatexja / qrcode / tikz / latexmk
# =============================================================
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BOOK_DIR="$ROOT_DIR/book"

if ! command -v latexmk >/dev/null 2>&1; then
  echo "[ERROR] latexmk が見つかりません。TeX Live をインストールしてください。" >&2
  exit 1
fi

cd "$BOOK_DIR"
echo "[build_book] running latexmk in $BOOK_DIR"
latexmk main.tex

echo "[build_book] done -> $BOOK_DIR/main.pdf"
