// slide-03.js — 背景と動機
const { theme, fonts, SLIDE_W } = require('./theme');
const { drawTitleBar, drawKeySentence, drawPageNumber, drawBulletBlock, paragraphs } = require('./helpers');

function createSlide(pres) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  drawTitleBar(slide, '背景と動機');
  drawKeySentence(slide, '長い計算を、1 つの SNARK に詰め込みたい');

  drawBulletBlock(slide, paragraphs([
    {
      title: 'ZK 証明の応用領域が爆発的に拡大',
      bullets: [
        { text: 'zkVM（RISC-V / EVM の実行証明）', level: 1 },
        { text: 'ZK-Rollup（Polygon zkEVM, zkSync, Scroll, Linea）', level: 1 },
        { text: 'succinct blockchain（Mina）', level: 1 },
        { text: 'LLM provenance（ZKPROV, arXiv 2506.20915）', level: 1 },
      ],
    },
    {
      title: 'しかし，全ての state transition を 1 つの SNARK で証明するのは非現実的',
      bullets: [
        { text: '巨大な回路は prover のメモリと時間が破綻する', level: 1 },
        { text: '数百万ステップの EVM 実行を monolithic に証明できない', level: 1 },
      ],
    },
    {
      title: '解決策 ── 「インクリメンタルに証明を更新する」フレームワーク',
      bullets: [
        { text: '各ステップの結果を 1 ステップずつ証明していく', level: 1 },
        { text: '最終ステップの証明が，全計算の正当性を代表する', level: 1 },
      ],
    },
  ]), { fontSize: 14 });

  drawPageNumber(slide, 3);
}
module.exports = { createSlide };
