# book/ — 書籍本体（LaTeX）

本ディレクトリは『図でつながる ITパスポート』本体の LaTeX プロジェクトです。

## 前提

- TeX Live 2022 以降（LuaLaTeX が使えること）
- `luatexja`, `luatexja-fontspec`
- `tikz`, `tcolorbox`, `qrcode`, `hyperref`, `geometry`, `titlesec`
- `latexmk`

macOS の場合は MacTeX、Linux は TeX Live、Windows は TeX Live もしくは MiKTeX で揃います。

## ビルド

```bash
latexmk main.tex
# もしくは、リポジトリルートから:
../scripts/build_book.sh
```

初回は luatexja のフォントキャッシュ生成に少し時間がかかります。

## 構成

```
book/
├── main.tex                 # エントリポイント
├── latexmkrc                # LuaLaTeX を既定にするための設定
├── styles/
│   ├── theme.tex            # 色定義（先に読み込む）
│   ├── preamble.tex         # パッケージとレイアウト
│   └── macros.tex           # 教材用カスタムマクロ
├── chapters/
│   ├── 00_intro.tex
│   ├── 01_strategy.tex
│   ├── 02_management.tex
│   ├── 03_technology.tex
│   ├── 04_cross_review.tex
│   └── 05_mock_exam.tex
├── assets/
│   ├── diagrams/            # TikZ 図版（\input で読み込む）
│   └── images/              # ラスタ画像（必要になれば配置）
└── downloads/               # 補助PDFのひな型（ダミー）
```

## 主なマクロ

`styles/macros.tex` で定義しています。

| コマンド | 用途 |
| :-- | :-- |
| `\definitionbx{タイトル}{本文}` | 定義ボックス |
| `\pitfall{タイトル}{本文}` | つまずきポイント |
| `\comparisonbx{タイトル}{本文}` | 比較ボックス（中に比較表を書く） |
| `\onelinesummary[タイトル]{本文}` | 1 枚まとめ |
| `\advice{本文}` | 学習アドバイス |
| `\checkquestion{問}{A}{B}{C}{D}{正解}{解説}` | 章末 4 択確認 |
| `\chaptersummary{本文}` | 章末まとめセクション |
| `\figurebox{caption}{label}{中身}` | 図番号付き挿入 |
| `\comptable{ヘッダ}{本体}` | 軽量な比較表テンプレ |
| `\supporturl{errata}` | サポートサイトの該当ページURL |
| `\supportqr{errata}{正誤表}` | QR コード + 説明ボックス |

## サポートサイト URL の変更

QR が指すベース URL は [styles/macros.tex](styles/macros.tex) 冒頭の `\supportbaseurl` で定義しています。GitHub Pages の公開 URL が決まったら **この 1 箇所だけ** 更新してください。

```tex
\newcommand{\supportbaseurl}{https://<username>.github.io/<repo>/}
```

## 章の追加

1. `chapters/` に `NN_topic.tex` を作成
2. `\chapter{...}` から始める
3. [main.tex](main.tex) に `\include{chapters/NN_topic}` を追加

## 図版の追加

- TikZ で書く場合: `assets/diagrams/xxx.tex` に配置し、本文から `\input{assets/diagrams/xxx}` で呼び出す
- ラスタ画像: `assets/images/xxx.png` 等に配置し、`\includegraphics{assets/images/xxx}` で呼び出す

## 著者向けトーン規定

- 用語を出すときは必ず「既出の用語との関係」を先に書く
- 「何に困るか」→「直感」→「定義」→「比較」→「試験で問われ方」→「1 問確認」の順を崩さない
- 単語単独で丸暗記させるトーンを避ける
- 過剰装飾を避ける（色を乱用しない、記号を増やさない）
