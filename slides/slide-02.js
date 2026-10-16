// slide-02.js — 目次
const { theme, fonts, SLIDE_W } = require('./theme');
const { drawTitleBar, drawPageNumber, drawBulletBlock } = require('./helpers');

function createSlide(pres) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  drawTitleBar(slide, '目次');

  drawBulletBlock(slide, [
    { text: '1. 背景と動機 ── なぜ recursive SNARK が必要か', level: 0 },
    { text: '2. zk-SNARK の基本 ── 用語と 3 性質', level: 0 },
    { text: '3. 制約システムの比較 ── R1CS / Plonkish / AIR / CCS', level: 0 },
    { text: '4. Recursive SNARK と IVC ── 概念と流れ', level: 0 },
    { text: '5. Folding Scheme と Nova ── 先行研究', level: 0 },
    { text: '6. HyperNova の提案 ── CCS への一般化', level: 0 },
    { text: '7. 主な技術貢献 ── multi-folding / CycleFold / NovaBlindFold', level: 0 },
    { text: '8. 性能評価と応用', level: 0 },
    { text: '9. 限界と今後 ── まとめ', level: 0 },
  ], { fontSize: 20 });

}
module.exports = { createSlide };
