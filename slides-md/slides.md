---
theme: default
title: "HyperNova — Recursive Arguments for Customizable Constraint Systems"
info: |
  代2回輪講発表 / 発表時間 15 分 / 全 16 枚
  CRYPTO 2024 / Kothapalli & Setty
class: text-center
---

# HyperNova
## Recursive Arguments for Customizable Constraint Systems

CCS に対する folding scheme ── Nova / SuperNova の後継

<div class="mt-12 text-sm">

**Abhiram Kothapalli ・ Srinath Setty**

Microsoft Research / CMU

IACR ePrint 2023/573 / CRYPTO 2024

代 2 回輪講発表 / 発表時間 15 分 / 全 16 枚

</div>

---
layout: default
---

# 目次

1. **背景と動機** ── なぜ recursive SNARK が必要か
2. **zk-SNARK の基本** ── 用語と 3 性質
3. **制約システムの比較** ── R1CS / Plonkish / AIR / CCS
4. **Recursive SNARK と IVC** ── 概念と流れ
5. **Folding Scheme と Nova** ── 先行研究
6. **HyperNova の提案** ── CCS への一般化
7. **主な技術貢献 4 つ** ── multi-folding / CycleFold / NovaBlindFold
8. **性能評価**
9. **応用例**
10. **限界と今後**
11. **まとめ**
12. **数式編 (1)** ── IVC と Folding の形式定義
13. **数式編 (2)** ── ZK-IVC と Hiding
14. **実データ編** ── ベンチマーク

---
layout: default
---

# 1. 背景と動機

長い計算を、1 つの SNARK に詰め込みたい

<br>

### ZK 証明の応用領域が爆発的に拡大

- **zkVM**（RISC-V / EVM の実行証明）
- **ZK-Rollup**（Polygon zkEVM, zkSync, Scroll, Linea）
- **succinct blockchain**（Mina）
- **LLM provenance**（ZKPROV, arXiv 2506.20915）

### しかし，全ての state transition を 1 つの SNARK で証明するのは非現実的

- 巨大な回路は prover のメモリと時間が破綻する
- 数百万ステップの EVM 実行を monolithic に証明できない

### 解決策 ── 「インクリメンタルに証明を更新する」フレームワーク

- 各ステップの結果を 1 ステップずつ証明していく
- 最終ステップの証明が，全計算の正当性を代表する

---
layout: default
---

# 2. zk-SNARK の基本

## zk-SNARK

**Zero-Knowledge Succinct Non-Interactive ARgument of Knowledge**

<br>

証明したい命題 x と，証明者だけが知っている証拠 ω に対し，

**Verify(vk, x, π) → {0, 1}** によって誰でも検証できる小さな証明 π を生成する暗号プロトコル。

### 満たすべき 3 性質

- **Completeness** ── 真の命題は真と証明される
- **Soundness** ── 偽の命題は偽と判定される
- **Zero-Knowledge** ── 命題の真偽以外は何も漏れない

### 主な既存 SNARK

- **Groth16** ── 証明サイズ最小，trusted setup が必要
- **PLONK** ── universal setup，Plonkish arithmetization
- **STARK** ── trusted setup 不要，post-quantum 安全性

---

# 3. 制約システムの比較

R1CS / Plonkish / AIR / CCS ── それぞれ独立して発展

| システム | 制約の形 | 自由度 | 代表実装 |
|---|---|---|---|
| **R1CS** | 二次 (a·b = c) のみ | 低 | Groth16, Nova |
| **Plonkish** | 高次ゲート + コピー制約 | 中 | PLONK, Halo2 |
| **AIR** | トレース + 遷移多項式 | 中 | STARK, RISC0 |
| **CCS（HyperNova）** | 任意次数を統一的に表現 | 高 | HyperNova, ProtoStar |

<br>

### 考察

- それぞれ独立したツールで実装されてきた
- 回路表現が異なるため，相互運用が困難
- **CCS = R1CS / Plonkish / AIR を subsume する表現**
- folding scheme を一度作れば，全ての形式に使える

---

# 4. Recursive SNARK と IVC

各ステップの証明を次ステップへ「圧縮」

<br>

<div class="text-center">

```
Step 1 → Step 2 → Step 3 → Step 4
  ↓        ↓        ↓        ↓
π_1  →   π_2  →   π_3  →   π_4
                               ↓
                         最終 π_4 だけ見れば
                       全ステップの正当性が検証できる
```

</div>

<br>

### IVC = Incrementally Verifiable Computation

「次のステップを実行した + 過去の証明を継承した」を一体で証明する。
HyperNova はこの IVC フレームワークを CCS 上で効率化したもの。

---

# 5. Folding Scheme と Nova

「2 つの NP instance を 1 つに折り畳む」暗号プリミティブ

<br>

### アイデア

- NP 関係 R の instance 2 つ (u₁, u₂) を，新しい instance u が満たす式に reduce
- **u₁ が真 ⟺ u₂ が真 ⟺ u が真** ── 等価性を保つ
- 並列で複数の証明を 1 つに集約できる

### Nova（CRYPTO 2022）

- folding scheme を SNARK の再帰に使う初の構成
- 双子楕円曲線（Pallas / Vesta など）のサイクル上で動作
- **R1CS 専用** ── 他の制約システムではそのまま使えない

### Nova の制約

- prover のコストが「ステップ回路サイズ |C|」に比例してしまう
- Plonkish / AIR 上で同じ folding をすると効率が大きく落ちる

---

# 6. HyperNova の提案

CCS に対する folding scheme + multi-folding ── 一般化された IVC

<br>

### 何が新しいか

- **R1CS に限定されず，CCS（R1CS / Plonkish / AIR を subsume）上で直接 folding**
- 各ステップの回路を表現する「constraint system」の形に依存しない
- 高次の non-uniform constraint（ステップごとに回路が異なる）を扱う

### 性能上の主張

- Prover cost が「**回路内の変数数 N の 1 回の MSM**」で完了
- ── Nova は各ステップで回路全体 |C| に比例した prover が必要だった
- ── HyperNova は「呼ばれた命令の回路サイズ」に比例する à la carte コスト
- ── zkVM のように実行ステップごとに命令が変わるケースで特に有利

### 同時に提供される副次的な貢献

- **Multi-folding**（異なる NP relation 同士の fold）
- **CycleFold**（双子楕円曲線サイクルの汎用化）
- **NovaBlindFold**（追加 SNARK なしで ZK を加える技法）

---

# 7. 主な技術貢献 4 つ

CCS folding を中心に，4 つの副次的貢献を同時に提供

<br>

### 1. CCS に対する folding scheme

- R1CS / Plonkish / AIR を統一的に扱える
- prover cost = 1 回の MSM（変数数に比例）
- Nova の |C| 比例コストを CCS の N 比例に改善

### 2. Multi-folding scheme

- 異なる構造を持つ NP relation を同時に 1 つの instance に fold
- ── 例: CCS instance + LCCS instance を 1 つの LCCS に集約
- ── 非均一 IVC（SuperNova 系）の自然な一般化

### 3. CycleFold ── 楕円曲線サイクルの汎用化

- 任意の modern folding-scheme ベース再帰 SNARK に適用可
- ── Nova / SuperNova / HyperNova いずれでも再利用可能

### 4. NovaBlindFold ── ZK を SNARK なしで追加

- Nova 自身が持つ blinding 性質を利用
- ── 別途 zk-SNARK を被さずに IVC 証明をゼロ知識化

---

# 8. 性能評価

prover cost を O(1) MSM に ── 既存 folding scheme との比較

<br>

| 項目 | Nova (2022) | SuperNova (2022) | HyperNova (本論文) |
|---|---|---|---|
| 対象制約系 | R1CS | R1CS（非均一） | CCS（R1CS / Plonkish / AIR） |
| prover / step | O(\|C\|) SM | O(\|step\|) SM | **O(N) MSM（1 回）** |
| verifier | 一定 | 一定 | 一定 |
| trusted setup | 不要 | 不要 | HyperKZG 利用時は必要 |
| 非均一ステップ | ✗ | ◎ | ◎ |
| ZK 性 | 別 SNARK が必要 | 別 SNARK が必要 | NovaBlindFold で不要 |

<br>

HyperNova は prover コストを「回路サイズ」から「実行命令の回路サイズ」に分離した。
zkVM / ZK-Rollup のように命令が混在する workload で特に有利。

---

# 9. HyperNova の応用

長い計算の証明が必要な領域で広く使われる

<br>

### zkVM（RISC-V / EVM の実行証明）

各命令の回路サイズに比例する prover で VM の実行全体を表せる。

### ZK-Rollup

Polygon zkEVM, zkSync などの Validity Proof 系 rollup のバックエンド候補。

### LLM provenance（ZKPROV）

arXiv 2506.20915 ── 各層の binding 制約を HyperNova で multi-fold。

### 信頼最小化クロスチェーンブリッジ

bridge では destination chain SC で ZKP を検証する。証明生成側に folding 系を使う構成も研究。

---

# 10. 限界と今後

最も強い SNARK ではなく、最も実用化に近い folding 系

<br>

### 現状の限界

- 双子楕円曲線（CycleFold）に依存
- HyperKZG 利用時は trusted setup が必要
- post-quantum 安全性は未対応
- Nova / SuperNova ほどの実装成熟度はまだ浅い

### 今後の方向性

- 楕円曲線サイクル不要な構成への拡張
- hash-based / lattice-based 証明系への展開
- zkVM / ZK-Rollup のバックエンドとして本番採用が進行
- 後続研究: ProtoStar, Protogalaxy, KiloNova への流れ

---

# 11. まとめ

HyperNova ── ZKP の表現力と効率を大きく前進させた

<br>

### ✓ 主な貢献

- **HyperNova = CCS に対する folding scheme** ── R1CS / Plonkish / AIR を統一的に扱える初の IVC フレームワーク
- **Prover cost を「回路サイズ」から「呼ばれた命令の回路」に分離** ── zkVM / ZK-Rollup / LLM provenance で特に有利
- **Multi-folding / CycleFold / NovaBlindFold を同時提供**

### ✗ 残る制約

- 双子楕円曲線と（HyperKZG 利用時の）trusted setup
- post-quantum 安全性は今後の課題

<br>

**結論 ── HyperNova は「zkVM 時代の IVC バックエンド」候補として最有力。**

---

# 12. 数式編 (1) ── IVC と Folding

<div class="text-sm leading-relaxed">

**■  Incrementally Verifiable Computation (IVC)**

```
Setup(1^λ) → (pk, vk)

π_i ← Prove(pk, F, z_0, i, (z_1, ω_1), …, (z_i, ω_i))

Verify(vk, F, z_0, i, z_i, π_i) → {accept, reject}
```

性質 3 つ ── Completeness / Soundness / **ZK (Hiding)**

</div>

<br>

<div class="text-sm leading-relaxed">

**■  Folding Scheme**

```
(u_1, u_2) ── Fold ──→ u_3

Fold.Prove(pk, u_1, u_2, w_1, w_2) → π_3
Fold.Verify(vk, u_1, u_2, u_3, π_3) → {accept}
```

**コスト: O(1)·MSM(size N)** ← HyperNova の主張

N は制約システムの変数数。Nova は R1CS に閉じていたが、HyperNova は CCS で同じコスト特性を実現。

</div>

---

# 13. 数式編 (2) ── ZK-IVC と Hiding

<div class="text-sm leading-relaxed">

**■  ZK-IVC (Zero-Knowledge IVC)**

IVC にさらに **Zero-Knowledge (Hiding)** を加えたもの。

Hiding = 次の 3 つを **一切** 明かさない:
1. 中間状態 z_1, z_2, …, z_{i-1}（隠蔽）
2. 各 step の witness ω_1, …, ω_i（秘匿）
3. 証明 π_i と witness のリンク性

LLM inference / 医療データ / 秘密鍵計算など、中身を知られずに「正しく実行された」ことだけを示したい場面で重要。

</div>

<br>

<div class="text-sm leading-relaxed">

**■  NovaBlindFold ── 追加 SNARK なしで ZK を加える技法**

Nova の folding 自体がもつ **blinding property** を利用する。

```
π_zk ← Fold(π_n, ρ)         ← ランダム instance ρ を mix
```

Verify(vk, z_0, n, z_n, π_zk) は **任意のランダム化された証明との区別不能性** を満たす。

</div>

---

# 14. 実データ編 ── ベンチマーク

| 項目 | Nova (R1CS) | SuperNova (R1CS, 非均一) | HyperNova (CCS) |
|---|---|---|---|
| **prover / step** | O(\|C\|) Scalar Mult. | O(\|step\|) Scalar Mult. | **1 × MSM (size N) + O(log N) hash** |
| verifier 回路サイズ | 約 10K gates | 約 10K gates | 同程度（汎用の加算） |
| proof size | O(1) 数 kB | O(1) 数 kB | O(1) 数 kB |
| trusted setup | 不要 | 不要 | HyperKZG 利用時のみ必要 |
| 双子楕円曲線 | 必要 | 必要 | 必要（CycleFold 経由） |
| **ZK (hiding) 化** | 別 SNARK が必要 | 別 SNARK が必要 | **NovaBlindFold で不要** |

<br>

### 読み取り

- HyperNova の prover コストは「実行された 1 命令の回路サイズの変数数 N」だけ
- ── zkVM で命令が混在する workload では，殆どの step で N ≪ |C| にできる
- ── たとえば EVM 実行では，ADD 命令の N は数 100，JUMPI は数千 ── 全体を再証明する必要なし
- verifier 回路は Nova 系と同じ ~10K gates 前後 ── L1 on-chain verify に十分軽い
- proof size は O(1) ── どの IVC でも最終証明のサイズは変わらない

<br>

<div class="text-xs text-gray-500">

出典: HyperNova paper (ePrint 2023/573) §6 / microsoft/Nova README / Nexus zkVM blog (2025)

</div>

---
layout: center
---

# Q & A

ご清聴ありがとうございました。

<br>

**主要な出典**

- IACR ePrint 2023/573 (HyperNova paper) ── [eprint.iacr.org/2023/573](https://eprint.iacr.org/2023/573)
- Microsoft Nova repository ── [github.com/microsoft/Nova](https://github.com/microsoft/Nova)
- CRYPTO 2024 採録版
