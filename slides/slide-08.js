// slide-08.js — HyperNova の提案
const { theme } = require('./theme');
const { drawTitleBar, drawKeySentence, drawPageNumber, drawConceptDefinition } = require('./helpers');

function createSlide(pres) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  drawTitleBar(slide, 'HyperNova の提案');
  drawKeySentence(slide, 'CCS に対する folding scheme + multi-folding ── 一般化された IVC');

  drawConceptDefinition(
    slide,
    'HyperNova',
    'CCS に対する folding scheme（Kothapalli & Setty, CRYPTO 2024）',
    [
      '■ 何が新しいか',
      '  ・ R1CS に限定されず，CCS（R1CS / Plonkish / AIR を subsume）上で直接 folding',
      '  ・ 各ステップの回路を表現する「constraint system」の形に依存しない',
      '  ・ 高次の non-uniform constraint（ステップごとに回路が異なる）を扱う',
      '',
      '■ 性能上の主張',
      '  ・ Prover cost が「回路内の変数数 N」の 1 回の MSM で完了',
      '  ・─ Nova は各ステップで回路全体 |C| に比例した prover が必要だった',
      '  ・─ HyperNova は「呼ばれた命令の回路サイズ」に比例する à la carte コスト',
      '  ・─ zkVM のように実行ステップごとに命令が変わるケースで特に有利',
      '',
      '■ 同時に提供される副次的な貢献',
      '  ・ Multi-folding（異なる NP relation 同士の fold）',
      '  ・ CycleFold（双子楕円曲線サイクルの汎用化）',
      '  ・ NovaBlindFold（追加 SNARK なしで ZK を加える技法）',
    ].join('\n'),
    { fontSize: 12, bodyH: 5.4 }
  );

  drawPageNumber(slide, 8);
}
module.exports = { createSlide };
