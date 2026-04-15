# 図でつながる ITパスポート

**副題**: 大学生・新社会人のための、理解で受かるITパスポート参考書

本リポジトリは、ITパスポート試験の参考書本体（LaTeX）と、読者向けの静的サポートサイト（GitHub Pages）を一体で管理するプロジェクトです。

---

## プロジェクトの目的

大学生・新社会人・非IT系初学者を対象に、

- **図で理解する**
- **用語の関係性で覚える**
- **ひっかけの理由までわかる**

ことを重視した ITパスポート参考書を作ります。網羅性や問題数ではなく、**概念のつながり**と**つまずきの先回り解消**で差別化します。

---

## 教材コンセプト

- 図で理解する
- 用語の関係性で覚える
- ひっかけの理由までわかる
- 最後までやり切れる
- ストラテジ・マネジメント・テクノロジのつながりが見える
- 「なぜそうなるか」を一段だけ深く説明する
- 直感と定義を両立する
- 試験対策と IT リテラシーの基礎を両立する

## 想定読者

- 大学生
- 就活生
- 新社会人
- 非IT系初学者
- 一度挫折した再受験者
- 高校生・専門学校生など（将来の拡張対象）

## 差別化ポイント

1. **ダイアグラム中心**: 各章に「1枚でわかる構造図」を置く。単語帳型ではなく関係図で覚える。
2. **痛み起点の説明**: 用語辞典順ではなく、読者がどこで混乱するかを起点に構成する。
3. **初学者向けだが浅くしない**: やさしいが雑ではない。本質を削らない。
4. **静的な補助導線**: アプリ前提にしない。本の価値を中心に、補助資料と軽い確認テストで支える。

---

## ディレクトリ構成

```
ITpass_book/
├── README.md
├── .gitignore
├── .github/workflows/pages.yml     # GitHub Pages デプロイ
├── book/                            # 書籍本体（LaTeX）
│   ├── main.tex
│   ├── latexmkrc
│   ├── styles/
│   │   ├── preamble.tex             # パッケージ読込
│   │   ├── macros.tex               # カスタムマクロ
│   │   └── theme.tex                # 配色・デザイン
│   ├── chapters/
│   │   ├── 00_intro.tex
│   │   ├── 01_strategy.tex
│   │   ├── 02_management.tex
│   │   ├── 03_technology.tex
│   │   ├── 04_cross_review.tex
│   │   └── 05_mock_exam.tex
│   ├── assets/
│   │   ├── images/
│   │   └── diagrams/                # TikZ 図版サンプル
│   └── downloads/                   # 補助PDFのひな型
├── site/                            # サポートサイト（GitHub Pages）
│   ├── index.html
│   ├── about.html
│   ├── downloads.html
│   ├── errata.html
│   ├── changelog.html
│   ├── quiz.html
│   ├── assets/{css,js,img}/
│   └── data/{quiz,errata,changelog}.json
└── scripts/
    ├── build_book.sh
    └── serve_site.sh
```

---

## book のビルド方法

**前提**: TeX Live 2022 以降、LuaLaTeX、luatexja、`latexmk`、`qrcode`、`tikz` が利用可能であること。

```bash
cd book
latexmk main.tex
```

または：

```bash
./scripts/build_book.sh
```

初回のみ luatexja のフォントキャッシュ生成に時間がかかることがあります。

---

## site のローカル確認方法

```bash
./scripts/serve_site.sh
# または
cd site && python3 -m http.server 8000
```

ブラウザで `http://localhost:8000` を開いてください。

---

## GitHub Pages の公開方法

1. このリポジトリを GitHub にプッシュ
2. リポジトリの **Settings → Pages → Build and deployment** で **Source = GitHub Actions** を選択
3. `main` ブランチへの push をトリガーに `.github/workflows/pages.yml` が `site/` をデプロイ

公開URLの想定: `https://<username>.github.io/<repo>/`

書籍の QR コードが指す URL は [book/styles/macros.tex](book/styles/macros.tex) の `\supportbaseurl` で一元管理しているため、デプロイURLが決まったら 1 箇所だけ書き換えてください。

---

## 今後の執筆ルール

- 各節は「何に困るか → 直感 → 定義 → 比較 → 試験での問われ方 → 1 問確認」の順を意識する
- 章ごとに「1 枚まとめ」を必ず置く
- 新しい用語を出すときは、既出の用語との関係を図または比較表で必ず示す
- 本文は「やさしいが浅すぎない」トーンを保つ
- 用語辞典のような羅列説明を避ける

### 追加章の作り方

1. `book/chapters/` に `NN_topic.tex` を新規作成
2. [book/main.tex](book/main.tex) から `\include{chapters/NN_topic}` を追加
3. 見出しは `\chapter{}` → `\section{}` → `\subsection{}` の順

### 図版の追加方法

- TikZ で `book/assets/diagrams/*.tex` として作成し、本文から `\input{assets/diagrams/xxx}` で読み込む
- ビットマップ画像は `book/assets/images/` に置き、`\includegraphics{assets/images/xxx}` で読み込む
- 差し替えを前提に、同名ファイルを上書きできる構造を保つ

### 補助資料の追加方法

- PDF は `book/downloads/` に配置
- 追加したファイルは `site/downloads.html` と `site/data/changelog.json` に追記
- 配布URLは GitHub Pages 経由（`/downloads/xxx.pdf` のようなパス）で参照

---

## 権利面で注意すべき点（要確認事項）

本プロジェクトは、**市販参考書・市販問題集の問題文や解説を模倣しません**。
公式公開問題（IPA 等）を扱う場合に備えて、データ構造には出典フィールドを用意していますが、現時点のサンプル問題はすべてオリジナルのダミーです。

以下は、出版・配布前に必ず個別確認してください（本 README では法的断定を行いません）：

- 公式公開問題の引用範囲・再配布可否・改変可否
- 図版に第三者素材を含める場合のライセンス
- 商標（試験名など）の表記ガイドライン
- 読者提供コンテンツ（確認テスト等）の権利表示

## 運用上の考え方

- **本が主役、Web は補助**。サイトは「付録置き場」「更新案内」「正誤表」「軽い確認テスト」に役割を限定する。
- サーバ・DB・認証は使わない。すべて静的で完結させる。
- AI は執筆補助・図版補助・整形補助に使ってよいが、**内容の品質判断は人間が最終責任を持つ**。
- まず完成させ、その後保守性を整える。TODO で止めない。

---

## ライセンス

現時点では未確定（出版形態が決まってから設定します）。コードとサンプル本文の扱いは出版契約に合わせて別途明示します。
