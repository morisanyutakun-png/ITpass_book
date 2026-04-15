# assets/icons/

本文・ボックスに添える**アイコン**を置く場所です。

## ルール

- 原則 **SVG**（単色・線画）で統一。色は `currentColor` にしておくと CSS から色を変えられます。
- サイズは統一（例：`24 × 24` の viewBox）
- ファイル名は用途ベース：`caution.svg`, `trap.svg`, `qr.svg`, `check.svg` など

## CSS からの色指定例

```css
.caution-box::before {
  background-image: url("/assets/icons/caution.svg");
  background-color: var(--caution-700);
}
```

SVG 内で `fill="currentColor"` としておけば、親要素の `color` に追従します。

## 参考素材

- [Bootstrap Icons](https://icons.getbootstrap.com/) — MIT
- [Tabler Icons](https://tabler.io/icons) — MIT
- [Phosphor Icons](https://phosphoricons.com/) — MIT

ライセンス表記を保持しながら再配布可能なもののみを取り込んでください。
