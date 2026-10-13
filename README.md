# rinkou-hypernova — HyperNova 代 2 回輪講発表スライド

[HyperNova: Recursive Arguments for Customizable Constraint Systems](https://eprint.iacr.org/2023/573) (Kothapalli & Setty, CRYPTO 2024) を題材とした 15 分発表用スライド一式。

| 項目 | 内容 |
|---|---|
| 題材論文 | [HyperNova](https://eprint.iacr.org/2023/573)（CRYPTO 2024 / IACR ePrint 2023/573） |
| 発表時間 | 15 分 |
| スライド枚数 | 16 枚（本編 13 + 数式・実データ編 3） |
| 雛形継承元 | `rinkou-template/`（theme.js / helpers.js / 4:3 レイアウト） |
| レイアウト | 4:3 (10.0 × 7.5 in) カスタムレイアウト |
| GitHub Pages | `docs/` から配信（後述） |

## ブラウザでスライドを見る

GitHub Pages 経由で配信される URL:
```
https://<user>.github.io/rinkou-hypernova/
```
ランディングページから 2 通りのビューを選べます:

- **🟦 Slidev 版**（Markdown、Web アプリ風）: `/slides/`
- **📄 PPTX ファイル**: `/pptx/hypernova-rinkou.pptx`

## GitHub に push する手順

```bash
git init                                  # 初回のみ
git add .
git commit -m "initial commit: HyperNova rinkou slides"
git branch -M main
git remote add origin https://github.com/<user>/rinkou-hypernova.git
git push -u origin main
```

GitHub リポジトリ設定で **Settings → Pages → Source: `main` branch / `/docs` folder** を選択すれば、`docs/` がそのまま公開されます。

## ディレクトリ構成

```
rinkou-hypernova/
├── DESIGN.md                 # 設計仕様書（スライドの意図・構造）
├── README.md                 # このファイル
├── package.json              # pptxgenjs 依存 + lint スクリプト
├── slides-md/                # Slidev プロジェクト
│   ├── package.json
│   └── slides.md             # Markdown 16 枚
├── slides/                   # pptxgenjs 雛形
│   ├── theme.js
│   ├── helpers.js
│   ├── slide-01.js 〜 slide-16.js
│   ├── compile.js
│   └── output/hypernova-rinkou.pptx   # PPTX 生成物（pptxgenjs）
├── docs/                     # GitHub Pages 用配信ディレクトリ
│   ├── index.html            # ランディング
│   ├── slides/               # Slidev 静的ビルド（自動生成）
│   ├── pptx/hypernova-rinkou.pptx
│   └── .nojekyll
└── .gitignore
```

## PPTX をローカルで再生成

```bash
cd rinkou-hypernova
node slides/compile.js   # → slides/output/hypernova-rinkou.pptx
```

## Slidev 版をローカルで開発

```bash
cd slides-md
npm install
npm run dev          # http://localhost:3030 でローカル編集
npm run build        # docs/slides/ に静的書き出し
npm run export       # PDF 書き出し（要 Chromium）
```

## 16 枚構成（再掲）

| # | タイトル | パターン |
|---|---|---|
| 01 | 表紙 | P1 |
| 02 | 目次 | P2 |
| 03 | 背景と動機 | P3 |
| 04 | zk-SNARK の基本 | P6 |
| 05 | 制約システムの比較 | P5 |
| 06 | Recursive SNARK と IVC | P9 |
| 07 | Folding Scheme と Nova | P6 |
| 08 | HyperNova の提案 | P6 |
| 09 | 主な技術貢献 4 つ | P3 |
| 10 | 性能評価 | P5 |
| 11 | HyperNova の応用 | P9 |
| 12 | 限界と今後 | P7 |
| 13 | まとめ | P10 |
| 14 | 数式編 (1) ── IVC と Folding | 数式レイアウト |
| 15 | 数式編 (2) ── ZK-IVC と Hiding | 数式レイアウト |
| 16 | 実データ編 ── ベンチマーク | P5（実測値） |

## 視覚仕様

- **色**: `primary #282629` / `accent #3E7EC7` / `light #F3F4F6` / `danger #C0504D`
- **フォント**: Yu Gothic / Yu Gothic UI（日本語）／ Calibri（英数）
- **寸法**: 4:3 (10.0 × 7.5 in)

## 参考リンク

- Kothapalli, A., Setty, S. (2024). **HyperNova: Recursive Arguments for Customizable Constraint Systems**. CRYPTO 2024. [ePrint 2023/573](https://eprint.iacr.org/2023/573)
- Microsoft Nova リポジトリ: https://github.com/microsoft/Nova
- Nova 論文 (CRYPTO 2022): [ePrint 2021/370](https://eprint.iacr.org/2021/370)
