// slide-06.js — Recursive SNARK と IVC の図解
const { theme } = require('./theme');
const { drawTitleBar, drawKeySentence, drawPageNumber, drawColorBox, drawArrow } = require('./helpers');

function createSlide(pres) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  drawTitleBar(slide, 'Recursive SNARK と IVC');
  drawKeySentence(slide, '各ステップの証明を次ステップへ「圧縮」');

  // IVC の概念図
  // ステップ t → 証明 π_t → ステップ t+1 → 証明 π_{t+1} → ...
  const baseY = 1.6;
  const boxH = 0.65;
  const boxW = 1.5;
  const startX = 0.5;
  const gap = 0.35;

  // タイトル「ステップ」
  for (let i = 0; i < 4; i++) {
    const x = startX + i * (boxW + gap);
    // ステップ box
    drawColorBox(slide, `Step ${i + 1}\n(F${i+1})`, 'DBEAFE', x, baseY, boxW, boxH, { fontSize: 11, bold: true, color: theme.primary });
    // 下の証明 box
    drawColorBox(slide, `proof (${i + 1})`, 'E8EFF8', x, baseY + 1.2, boxW, boxH, { fontSize: 12, bold: true, color: theme.accent });
    // 矢印 (ステップ → 証明)
    drawArrow(slide, x + boxW / 2 - 0.3, baseY + boxH, 0.6, 0.45, { color: theme.secondary });
  }

  // ステップ間圧縮の矢印（横方向）
  for (let i = 0; i < 3; i++) {
    const x = startX + i * (boxW + gap) + boxW;
    drawArrow(slide, x, baseY + boxH + 0.3, gap - 0.05, 0, { color: theme.accent });
  }

  // 最終行：IVC 説明
  drawColorBox(slide, '最終 proof', 'F3F4F6', 7.2, baseY + 1.2, 1.7, boxH, {
    fontSize: 13, bold: true, color: theme.primary,
  });

  // 説明テキスト
  slide.addText('IVC = Incrementally Verifiable Computation', {
    x: 0.5, y: baseY + 2.4, w: 8.5, h: 0.4,
    fontFace: 'Calibri', fontSize: 16, color: theme.accent, bold: true,
    valign: 'middle', align: 'center',
  });

  // 説明
  drawColorBox(slide,
    '次のステップを実行した + 過去の証明を継承した を一体で証明する。\n最終 proof だけ見れば，全ステップの正当性が検証できる。',
    'FFFFFF', 0.5, baseY + 2.95, 8.5, 1.1,
    { fontSize: 13, bold: false, color: theme.primary, borderColor: 'D1D5DB' }
  );

  // 下部のポイント
  drawColorBox(slide,
    'HyperNova はこの IVC フレームワークを CCS 上で効率化したもの。',
    theme.light, 0.5, baseY + 4.3, 8.5, 0.6,
    { fontSize: 12, bold: true, color: theme.primary, borderColor: theme.light, borderWidth: 0 }
  );

}
module.exports = { createSlide };
