// slide-13.js — まとめ
const { theme } = require('./theme');
const { drawTitleBar, drawKeySentence, drawPageNumber, drawBulletBlock, drawCallout } = require('./helpers');

function createSlide(pres) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  drawTitleBar(slide, 'まとめ');
  drawKeySentence(slide, 'HyperNova ── ZKP の表現力と効率を大きく前進させた');

  drawBulletBlock(slide, [
    { text: '✓ HyperNova = CCS に対する folding scheme', level: 1, color: theme.success, bold: true },
    { text: '  R1CS / Plonkish / AIR を統一的に扱える初の IVC フレームワーク', level: 1 },
    { text: '✓ Prover cost を「回路サイズ」から「呼ばれた命令の回路」に分離', level: 1, color: theme.success, bold: true },
    { text: '  zkVM / ZK-Rollup / LLM provenance で特に有利', level: 1 },
    { text: '✓ Multi-folding / CycleFold / NovaBlindFold を同時提供', level: 1, color: theme.success, bold: true },
    { text: '  非均一ステップ，楕円曲線サイクルの汎用化，ZK の簡素化', level: 1 },
    { text: '✗ 双子楕円曲線と（HyperKZG 利用時の）trusted setup は残る', level: 1, color: theme.danger, bold: true },
    { text: '  post-quantum 安全性は今後の課題', level: 1 },
  ], { fontSize: 13, h: 4.4 });

  drawCallout(slide,
    '結論 ── HyperNova は「zkVM 時代の IVC バックエンド」候補として最有力。CCS general 化により，ZKP の表現力と効率を同時に押し上げた。',
    { y: 5.8, h: 0.9, fontSize: 14 }
  );

  // Q&A
  drawCallout(slide,
    'Q & A ── ご清聴ありがとうございました。',
    { y: 6.8, h: 0.45, fontSize: 13 }
  );

}
module.exports = { createSlide };
