// slide-09.js — 主な技術貢献 4 つ
const { theme } = require('./theme');
const { drawTitleBar, drawKeySentence, drawPageNumber, drawBulletBlock, paragraphs } = require('./helpers');

function createSlide(pres) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  drawTitleBar(slide, '主な技術貢献');
  drawKeySentence(slide, 'CCS folding を中心に，4 つの副次的貢献を同時に提供');

  drawBulletBlock(slide, paragraphs([
    {
      title: '1. CCS に対する folding scheme',
      bullets: [
        { text: 'R1CS / Plonkish / AIR を統一的に扱える', level: 1 },
        { text: 'prover cost = 1 回の MSM（変数数 N に比例）', level: 1 },
      ],
    },
    {
      title: '2. Multi-folding scheme',
      bullets: [
        { text: '異なる構造を持つ NP relation を同時に 1 つの instance に fold', level: 1 },
        { text: '例: CCS instance + LCCS instance を 1 つの LCCS に集約', level: 1 },
        { text: '非均一 IVC（SuperNova 系）の自然な一般化', level: 1 },
      ],
    },
    {
      title: '3. CycleFold ── 楕円曲線サイクルの汎用化',
      bullets: [
        { text: 'Nova / SuperNova / HyperNova いずれでも再利用可能', level: 1 },
        { text: 'IVC を楕円曲線サイクル上で構成するときの共通インフラ', level: 1 },
      ],
    },
    {
      title: '4. NovaBlindFold ── ZK を SNARK なしで追加',
      bullets: [
        { text: 'Nova 自身が持つ blinding 性質を利用', level: 1 },
        { text: '別途 zk-SNARK を被さずに IVC 証明をゼロ知識化', level: 1 },
        { text: '実装コスト・回路サイズの双方を削減', level: 1 },
      ],
    },
  ]), { fontSize: 12, h: 5.4 });

}
module.exports = { createSlide };
