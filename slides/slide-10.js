// slide-10.js — 性能評価
const { theme } = require('./theme');
const { drawTitleBar, drawKeySentence, drawPageNumber, drawTable, drawBulletBlock } = require('./helpers');

function createSlide(pres) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  drawTitleBar(slide, '性能評価');
  drawKeySentence(slide, 'prover cost を O(1) MSM に ── 既存 folding scheme との比較');

  drawTable(slide, [
    ['項目', 'Nova (CRYPTO 2022)', 'SuperNova (2022)', 'HyperNova (本論文)'],
    ['対象制約系', 'R1CS', 'R1CS（非均一）', 'CCS（R1CS / Plonkish / AIR）'],
    ['prover / step', 'O(|C|) SM', 'O(|step|) SM', 'O(N) MSM（1 回）'],
    ['verifier', '一定', '一定', '一定'],
    ['trusted setup', '不要', '不要', 'HyperKZG 利用時は必要'],
    ['サイクル曲線', '必要', '必要', '必要（CycleFold）'],
    ['非均一ステップ', '✗', '◎', '◎'],
    ['ZK 性', '別 SNARK が必要', '別 SNARK が必要', 'NovaBlindFold で SNARK 不要'],
  ], {
    x: 0.43, y: 1.34, w: 5.6,
    colW: [1.5, 1.3, 1.4, 1.4],
    rowH: 0.36, fontSize: 11,
  });

  // 右側の考察
  drawBulletBlock(slide, [
    { text: '考察', level: 0 },
    { text: 'HyperNova は prover コストを「回路サイズ」から「実行命令の回路サイズ」に分離した', level: 1 },
    { text: 'zkVM / ZK-Rollup のように命令が混在する workload で特に有利', level: 1 },
    { text: '代償: HyperKZG に trusted setup，CycleFold 用の楕円曲線ペア', level: 1, color: theme.danger },
    { text: 'NovaBlindFold で別 SNARK 不要 ── 全体の回路サイズを縮小', level: 1, color: theme.accent, bold: true },
  ], { x: 6.2, y: 1.34, w: 3.3, h: 4.0, fontSize: 12 });

  // 下部注釈
  slide.addText('MSM: Multi-Scalar Multiplication  /  SM: Scalar Multiplication  /  N: 回路の変数数  /  |C|: 回路全体のサイズ', {
    x: 0.43, y: 6.65, w: 9.06, h: 0.3,
    fontFace: 'Calibri', fontSize: 10,
    color: theme.secondary, italic: true,
    align: 'left', valign: 'middle',
  });

  drawPageNumber(slide, 10);
}
module.exports = { createSlide };
