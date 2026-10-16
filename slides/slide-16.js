// slide-16.js — 数式編 (3): 性能実データ
const { theme, fonts } = require('./theme');
const { drawTitleBar, drawKeySentence, drawPageNumber, drawTable, drawBulletBlock } = require('./helpers');

function createSlide(pres) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  drawTitleBar(slide, '実データ編 ── HyperNova vs Nova のベンチマーク');
  drawKeySentence(slide, '「1 つの主張」を 4 つの数字で裏付ける');

  // 表: ベンチマーク比較 (論文 Table / Github README より)
  drawTable(slide, [
    ['項目', 'Nova (R1CS)', 'SuperNova (R1CS, 非均一)', 'HyperNova (CCS)'],
    ['prover / step', 'O(|C|) の Scalar Mult.', 'O(|step|) の Scalar Mult.', '1 × MSM (size N) + O(log N) hash'],
    ['verifier 回路サイズ', '約 10K gates', '約 10K gates', '同程度（汎用の加算）'],
    ['proof size', 'O(1) 数 kB', 'O(1) 数 kB', 'O(1) 数 kB'],
    ['trusted setup', '不要', '不要', 'HyperKZG 利用時のみ必要'],
    ['双子楕円曲線', '必要', '必要', '必要（CycleFold 経由）'],
    ['ZK (hiding) 化', '別 SNARK が必要', '別 SNARK が必要', 'NovaBlindFold で不要'],
  ], {
    x: 0.43, y: 1.34, w: 9.06,
    colW: [2.0, 2.2, 2.5, 2.36],
    rowH: 0.42, fontSize: 11,
  });

  // 下の考察
  drawBulletBlock(slide, [
    { text: '■ 読み取り', level: 0, color: theme.accent },
    { text: 'HyperNova の prover コストは「実行された 1 命令の回路サイズの変数数 N」だけ', level: 1 },
    { text: '─ zkVM で命令が混在する workload では，殆どの step で N ≪ |C| にできる', level: 1 },
    { text: '─ たとえば EVM 実行では，ADD 命令の N は数 100，JUMPI は数千 ── 全体を再証明する必要なし', level: 1 },
    { text: 'verifier 回路は Nova 系と同じ ~10K gates 前後 ── L1 での on-chain verify に十分軽い', level: 1 },
    { text: 'proof size は O(1) ── どの IVC でも最終証明のサイズは変わらない', level: 1 },
  ], { x: 0.43, y: 4.55, w: 9.06, h: 2.2, fontSize: 12 });

  // 出典
  slide.addText('出典: HyperNova paper (ePrint 2023/573) §6 / microsoft/Nova README / Nexus zkVM blog (2025)', {
    x: 0.43, y: 6.85, w: 9.06, h: 0.3,
    fontFace: fonts.en, fontSize: 10,
    color: theme.secondary, italic: true,
    align: 'left', valign: 'middle',
  });

}
module.exports = { createSlide };
