// slide-05.js — 制約システムの比較
const { theme } = require('./theme');
const { drawTitleBar, drawKeySentence, drawPageNumber, drawTable, drawBulletBlock } = require('./helpers');

function createSlide(pres) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  drawTitleBar(slide, '制約システムの比較');
  drawKeySentence(slide, 'R1CS / Plonkish / AIR / CCS ── それぞれ独立して発展');

  drawTable(slide, [
    ['システム', '制約の形', '自由度', '代表実装'],
    ['R1CS', '二次 (a·b = c) のみ', '低', 'Groth16, Nova'],
    ['Plonkish', '高次ゲート + コピー制約', '中', 'PLONK, Halo2'],
    ['AIR', 'トレース + 遷移多項式', '中', 'STARK, RISC0'],
    ['CCS（本論文）', '任意次数を統一的に表現', '高', 'HyperNova, ProtoStar'],
  ], { x: 0.43, y: 1.34, w: 5.4, colW: [1.3, 2.1, 0.7, 1.3], rowH: 0.45, fontSize: 12 });

  // 右側の考察
  drawBulletBlock(slide, [
    { text: '考察', level: 0 },
    { text: 'それぞれ独立したツールで実装されてきた', level: 1 },
    { text: '回路表現が異なるため，相互運用が困難', level: 1 },
    { text: 'CCS = R1CS / Plonkish / AIR を subsume する表現', level: 1 },
    { text: 'folding scheme を一度作れば，全ての形式に使える', level: 1, color: theme.accent, bold: true },
  ], { x: 6.0, y: 1.34, w: 3.5, h: 4.5, fontSize: 12 });

  // 下部注釈
  slide.addText('CCS = Customizable Constraint System （Setty et al., ePrint 2023/552）', {
    x: 0.43, y: 6.5, w: 9.06, h: 0.3,
    fontFace: 'Calibri', fontSize: 11,
    color: theme.secondary, italic: true,
    align: 'left', valign: 'middle',
  });

}
module.exports = { createSlide };
