// slide-07.js — Folding Scheme と Nova
const { theme } = require('./theme');
const { drawTitleBar, drawKeySentence, drawPageNumber, drawConceptDefinition } = require('./helpers');

function createSlide(pres) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  drawTitleBar(slide, 'Folding Scheme と Nova ── 先行研究');
  drawKeySentence(slide, '「2 つの NP instance を 1 つに折り畳む」暗号プリミティブ');

  drawConceptDefinition(
    slide,
    'Folding Scheme',
    '2 つの instance を 1 つに reduce する暗号プリミティブ',
    [
      '■ アイデア',
      '  ・ NP 関係 R の instance 2 つ (u₁, u₂) を新しい instance u に reduce',
      '  ・ u₁ が真 ⟺ u₂ が真 ⟺ u が真 ── 等価性を保つ',
      '  ・ 並列で複数の証明を 1 つに集約できる',
      '',
      '■ Nova（CRYPTO 2022）',
      '  ・ folding scheme を SNARK の再帰に使う初の構成',
      '  ・ 双子楕円曲線（Pallas / Vesta）サイクル上で動作',
      '  ・ R1CS 専用 ── 他システムではそのまま使えない',
      '',
      '■ Nova の制約',
      '  ・ prover のコストが「ステップ回路サイズ |C|」に比例',
      '  ・ Plonkish / AIR 上で同じ folding をすると効率が大きく落ちる',
      '  ・ R1CS に閉じているため，他 SNARK 系で個別最適化が必要',
    ].join('\n'),
    { fontSize: 12, bodyH: 5.4 }
  );

  drawPageNumber(slide, 7);
}
module.exports = { createSlide };
