# assets/diagrams/

章冒頭や本文に挿入する**構造図**を置く場所です。

## ルール

- 原則として **SVG** で作成します（拡大しても劣化しない／テキスト検索できる）
- 写真や質感の強いグラフィックだけ PNG を使います（`assets/images/` に分離してもOK）
- ファイル名は `NN-topic-name.svg`（例：`01-three-fields.svg`）
- 色・フォント・太さは、`theme/variables.css` のトークンに寄せます

## 作り方

手書きで書くのが大変な場合は、以下のいずれかが楽です。

- **draw.io / diagrams.net** で作図 → 「SVG でエクスポート」
- **Figma** で作図 → フレームを SVG でエクスポート
- Excalidraw（手描き風が好みなら）

SVG 内のテキストは **日本語フォントを埋め込まない**（読み手の環境に任せる）。
Vivliostyle 側で `.onepage-map svg text` に `font-family` を効かせることも可能です。

## 命名規則

| 用途 | 例 |
| :-- | :-- |
| 章冒頭の構造図 | `01-three-fields.svg`（章番号 + テーマ） |
| 本文中の補助図 | `01-02-swot-matrix.svg`（章 + 節 + テーマ） |
| 章扉装飾 | `chapter-01-opener.svg` |
