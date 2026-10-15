// slide-04.js — zk-SNARK の基本
const { theme } = require('./theme');
const { drawTitleBar, drawKeySentence, drawPageNumber, drawConceptDefinition } = require('./helpers');

function createSlide(pres) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  drawTitleBar(slide, 'zk-SNARK の基本');
  drawKeySentence(slide, 'zk-SNARK = Zero-Knowledge Succinct Non-Interactive ARgument of Knowledge');

  drawConceptDefinition(
    slide,
    'zk-SNARK',
    'Zero-Knowledge Succinct Non-Interactive ARgument of Knowledge',
    [
      '証明したい命題 x と，証明者だけが知っている証拠 ω に対し，',
      'Verify(vk, x, π) → {0,1} で誰でも検証できる小さな証明 π を生成するプロトコル。',
      '',
      '■ 満たすべき 3 性質',
      '  ・ Completeness ── 真の命題は真と証明される',
      '  ・ Soundness ── 偽の命題は偽と判定される',
      '  ・ Zero-Knowledge ── 命題の真偽以外は何も漏れない',
      '',
      '■ 主な既存 SNARK',
      '  ・ Groth16 ── 証明サイズ最小，trusted setup',
      '  ・ PLONK ── universal setup，Plonkish arithmetization',
      '  ・ STARK ── trusted setup 不要，post-quantum 安全',
      '',
      '※ HyperNova は SNARK そのものではなく「SNARK の合成法」を提案する論文。',
    ].join('\n'),
    { fontSize: 12, bodyH: 5.4 }
  );

  drawPageNumber(slide, 4);
}
module.exports = { createSlide };
