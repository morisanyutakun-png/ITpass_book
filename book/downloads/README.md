# book/downloads/

本ディレクトリには、読者向けに配布する補助 PDF を配置します。

GitHub Actions が `site/downloads/` へ同内容を複製するため、ファイル名はそのまま公開 URL のパスになります。

## 想定ファイル

- `one-page-summary.pdf` — 章末「1 枚まとめ」集
- `last-minute-check.pdf` — 直前チェック資料
- `itpass-book.pdf` — （任意）本書本体 PDF

## 運用メモ

- ファイル名は英小文字・ハイフン区切りで統一する
- 本書の QR コードは URL ベースで指すので、ファイル名を変更する場合は本書本体の参照箇所も合わせて更新する
- 大きなバイナリを Git LFS なしで扱う場合、サイズに注意する
