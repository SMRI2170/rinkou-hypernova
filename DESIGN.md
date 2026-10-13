# DESIGN.md — HyperNova 代2回輪講スライドの設計仕様

このドキュメントは `rinkou-hypernova/slides/` に実装された **13 枚のスライド**の意図・構造を明文化する。

## 0. 発表の前提

| 項目 | 内容 |
|---|---|
| 題材論文 | **HyperNova: Recursive Arguments for Customizable Constraint Systems** — Abhiram Kothapalli, Srinath Setty (CRYPTO 2024 / IACR ePrint 2023/573) |
| 発表時間 | 15 分 |
| スライド枚数 | 13 枚 |
| 分野 | 暗号理論 (ゼロ知識証明 / Recursive SNARK / IVC) |
| 雛形継承元 | `rinkou-template/` の theme / helpers / 4:3 レイアウト |

## 1. 全体構成（章立て）

```
1. 表紙
2. 目次
3. 背景と動機 ── なぜ recursive SNARK / IVC が必要か
4. zk-SNARK の基本 ── 用語と 3 性質
5. 制約システム比較 ── R1CS / Plonkish / AIR / CCS
6. Recursive SNARK と IVC ── 概念
7. Folding Scheme と Nova ── 先行研究
8. HyperNova の提案 ── CCS への一般化
9. 主な技術貢献 4 つ ── multi-folding / CycleFold / NovaBlindFold / à la carte
10. 性能評価 ── 表 + 考察
11. 応用例 ── zkVM / LLM provenance / 信頼最小化
12. 限界と今後 ── 双子楕円曲線 / post-quantum
13. まとめ
14. 数式編 (1) ── IVC と Folding の形式定義
15. 数式編 (2) ── ZK-IVC と Hiding (NovaBlindFold)
16. 実データ編 ── HyperNova vs Nova のベンチマーク
```

スライド 14–16 は発表中に「数式で正確に」「実測値で裏付ける」ための補強スライド。本編（01–13）に直接入れず、章の後に設けることで、本編の理解を妨げない。

## 2. 各スライドの意図

### Slide 01 — 表紙
- パターン P1: 大きなタイトル + 著者 + 学会 + 発表者
- タイトル: **HyperNova — Recursive Arguments for Customizable Constraint Systems**
- 副題: 「Nova / SuperNova の後継，CCS による folding scheme の一般化」
- 著者: Abhiram Kothapalli, Srinath Setty (CMU, Microsoft Research)
- 学会: **CRYPTO 2024** (Best Paper Award) / arXiv preprint 2023/573

### Slide 02 — 目次
- パターン P2: 大きな箇条書き（fontSize 22）
- 6 章構成（背景 / 基本 / 制約システム / Recursion / HyperNova / 応用・限界）

### Slide 03 — 背景と動機
- パターン P3: 全幅テキスト、■ + • の混在
- キーフレーズ: 「長い計算を 1 つの証明で圧縮したい」
- ZK proving の応用領域の爆発（zkVM, Rollup, succinct blockchain, LLM provenance）
- 全ての state transition を 1 つの SNARK で証明するのは現実的でない
- → 「インクリメンタルに証明を更新する」フレームワークの必要性

### Slide 04 — zk-SNARK の基本
- パターン P6: 用語の定義（大きな用語 + 補足 + 本文）
- 用語: 「zk-SNARK」
- サブ: Zero-Knowledge Succinct Non-Interactive ARgument of Knowledge
- 本体: 3 性質 (Completeness / Soundness / Zero-Knowledge) + succinctness
- 代表実装: Groth16, PLONK, STARK

### Slide 05 — 制約システム (R1CS / Plonkish / AIR)
- パターン P5: 左に表 + 右に補足考察
- 表: 制約システム比較（R1CS / Plonkish / AIR / CCS）
- 考察: 「それぞれ独立して発展 → 相互運用が難しい」→ HyperNova への布石

### Slide 06 — Recursive SNARK と IVC
- パターン P9: 図解メイン（色付きボックス + 矢印フロー）
- IVC (Incrementally Verifiable Computation) の概念図
  - ステップ t の証明 πₜ → ステップ t+1 の証明 πₜ₊₁ に「圧縮」
  - 最終ステップの π_最終 = 全計算の正当性を証明
- 応用先: zkVM, 長期実行プロセスの証明

### Slide 07 — Folding Scheme と Nova（先行研究）
- パターン P6: 用語の定義
- 用語: 「Folding Scheme」
- サブ: 2 つの NP instance を 1 つに「折り畳む」暗号プリミティブ
- 本体: Nova (CRYPTO 2022) の制限 = R1CS のみ・双対楕円曲線サイクル必要
- 「各ステップの回路サイズに比例する prover cost」 という制約

### Slide 08 — HyperNova の提案（メイン貢献）
- パターン P6: 用語の定義
- 用語: 「HyperNova」
- サブ: 「CCS に対する folding scheme + multi-folding」
- 本体:
  - CCS (Customizable Constraint System) = R1CS / Plonkish / AIR を subsume
  - Prover cost: 1 multi-scalar multiplication (MSM)
  - 高次制約・非均一ステップ対応

### Slide 09 — 主な技術貢献 4 つ
- パターン P3: 全幅テキスト、■ + •
- 4 つの貢献を箇条書き:
  1. **CCS folding scheme** — prover コストが |C| で最適
  2. **Multi-folding** — 異なる NP relation を同時に fold
  3. **CycleFold** — 楕円曲線サイクル汎用技術
  4. **NovaBlindFold** — ZK を追加 SNARK なしで実現

### Slide 10 — 性能評価
- パターン P5: 左表 + 右考察
- 表: Nova / SuperNova / HyperNova の比較項目
- 考察: 「HyperNova は prover cost を O(1) MSM に削減」

### Slide 11 — 応用例
- パターン P9: 図解メイン（ボックス + 矢印）
- 4 つの応用領域を並べる:
  1. zkVM（RISC-V / EVM の実行証明）
  2. ZK-Rollup（Polygon zkEVM など）
  3. LLM provenance（ZKPROV, arXiv 2506.20915）
  4. 信頼最小化クロスチェーンブリッジ（zkBridge 系）

### Slide 12 — 限界と今後
- パターン P7: 左右対比
- 左: 「現状の限界」
  - 双子楕円曲線（CycleFold）に依存
  - HyperKZG に trusted setup
  - post-quantum 安全性は未対応
- 右: 「今後の方向性」
  - 楕円曲線サイクル不要化
  - hash-based / lattice-based への展開
  - zkVM エコシステムでの実用化

### Slide 13 — まとめ
- パターン P10: 貢献 + 限界 + 結論コールアウト
- ✓ HyperNova = CCS general の folding scheme
- ✓ Prover cost を O(1) MSM に
- ✗ CycleFold / trusted setup の依存は残る
- → 「ZKP の表現力と効率を大きく前進させた，zkVM 時代の基盤」

### Slide 14 — 数式編 (1): IVC と Folding の形式定義
- パターン: 数式レイアウト（カスタム）
- 上段: **IVC の定義**
  - Setup(1^λ) → (pk, vk)
  - Prove(pk, F, z_0, i, (z_1, ω_1), …, (z_i, ω_i)) → π_i
  - Verify(vk, F, z_0, i, z_i, π_i) → {accept, reject}
  - 3 性質: Completeness / Soundness / ZK (Hiding)
- 下段: **Folding Scheme の定義**
  - (u_1, u_2) → u_3 (集約)
  - Fold.Prove(pk, u_1, u_2, w_1, w_2) → π_3
  - Fold.Verify(vk, u_1, u_2, u_3, π_3) → {accept}
  - コスト: `O(1)·MSM(size N)` ← HyperNova の主張

### Slide 15 — 数式編 (2): ZK-IVC と Hiding (NovaBlindFold)
- パターン: 数式レイアウト（カスタム）
- 上段: **ZK-IVC の定義**
  - 中間状態 / witness / linkability の 3 つを一切明かさない
  - LLM / 医療データ / 秘密鍵計算で必要
- 下段: **NovaBlindFold**
  - π_zk ← Fold(π_n, ρ)   （ランダム instance ρ を mix）
  - blinding property = "ランダム化証明との区別不能性"
  - 既存 Nova 系: 別 SNARK を被せて ZK 化（回路大）
  - HyperNova: 上の Fold(π, ρ) だけで ZK 化（回路小）

### Slide 16 — 実データ編: ベンチマーク比較
- パターン P5: 左表 + 右考察（実測値）
- 表: Nova / SuperNova / HyperNova の 7 項目比較
  - prover / step
  - verifier 回路サイズ
  - proof size
  - trusted setup 要否
  - 双子楕円曲線 要否
  - ZK 化コスト
- 考察: 「zkVM で命令ごとに N ≪ |C| にできる」「verifier ~10K gates」「proof size O(1)」
- 出典: HyperNova paper §6 / microsoft/Nova README / Nexus zkVM blog (2025)

## 3. スタイル指針

- **色**: `primary #282629` / `accent #3E7EC7` / `light #F3F4F6` / `danger #C0504D`（雛形と同一）
- **フォント**: Yu Gothic / Yu Gothic UI / Calibri
- **スライド寸法**: 4:3 (10.0 × 7.5 in) — `theme.js` の `SLIDE_W` / `SLIDE_H`
- **キーフレーズ帯**: 縦バー `#3E7EC7` + 青太字 18pt
- **論文固有の記号**: $\pi$ (proof), $\omega$ (witness), $C$ (circuit) を本文中で使う場合は Unicode のギリシャ文字（π, ω）は使わず、Powepoint ではテキスト扱いにして Italic 体で表記

## 4. 禁則事項

- **全角句読点（、 。 （ ） ：）は使う**: 日本語の正式表記のため雛形 lint の特例を継承
- **スマートクォート / 非改行スペース (\u201c\u201d\u2018\u2019\u00a0) は禁止**: `npm run lint` で検出

## 5. 改行・字下げのルール（雛形から継承）

- 意味の切れ目（■ キーフレーズ、結論→補完の区切り）で改行
- ■ キーフレーズは 1 行に収める
- 章タイトル直後の本文は字下げせず、章内の独立段落は字下げで開始
- bullets の `level: 0` = ■ `level: 1` = • `level: 2` = • または → （自動）
