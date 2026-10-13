// slide-01.js — 表紙
const { theme, fonts, SLIDE_W, SLIDE_H } = require('./theme');

function createSlide(pres) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // 薄いアクセントバー (左端、表紙用)
  slide.addShape('rect', {
    x: 0.43, y: 2.0, w: 0.08, h: 1.6,
    fill: { color: theme.accent },
    line: { type: 'none' },
  });

  // メインタイトル
  slide.addText('HyperNova', {
    x: 0.43, y: 2.0, w: SLIDE_W - 0.86, h: 0.95,
    fontFace: fonts.jpTitle, fontSize: 54,
    color: theme.primary, bold: true,
    valign: 'middle', align: 'left',
    margin: 0,
  });

  // 副題
  slide.addText('Recursive Arguments for Customizable Constraint Systems', {
    x: 0.63, y: 2.95, w: SLIDE_W - 1.06, h: 0.55,
    fontFace: fonts.en, fontSize: 22,
    color: theme.accent, bold: true,
    valign: 'middle', align: 'left',
  });

  // 日本語の補足
  slide.addText('CCS に対する folding scheme ── Nova / SuperNova の後継', {
    x: 0.63, y: 3.5, w: SLIDE_W - 1.06, h: 0.35,
    fontFace: fonts.jp, fontSize: 14,
    color: theme.secondary, italic: true,
    valign: 'middle', align: 'left',
  });

  // 罫線
  slide.addShape('line', {
    x: 0.43, y: 4.4, w: 4.5, h: 0,
    line: { color: theme.primary, width: 1 },
  });

  // 著者・学会
  slide.addText([
    { text: 'Abhiram Kothapalli  ・  Srinath Setty', options: { bold: true, fontSize: 16 } },
    { text: '\n', options: {} },
    { text: 'Microsoft Research  /  CMU', options: { fontSize: 13, color: theme.secondary } },
    { text: '\n', options: {} },
    { text: 'IACR ePrint 2023/573  ・  CRYPTO 2024', options: { fontSize: 13, color: theme.secondary } },
  ], {
    x: 0.43, y: 4.6, w: 6.5, h: 1.4,
    fontFace: fonts.jp,
    valign: 'top', align: 'left',
    paraSpaceAfter: 4,
  });

  // 発表メタ情報 (右下)
  slide.addText([
    { text: '代 2 回 輪講発表', options: { fontSize: 12, bold: true, color: theme.primary } },
    { text: '\n', options: {} },
    { text: '発表時間 15 分  ・  全 13 枚', options: { fontSize: 11, color: theme.secondary } },
  ], {
    x: SLIDE_W - 3.0, y: SLIDE_H - 1.1, w: 2.6, h: 0.7,
    fontFace: fonts.jp,
    valign: 'top', align: 'right',
  });
}
module.exports = { createSlide };
