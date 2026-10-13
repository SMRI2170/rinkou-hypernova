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
      '証明したい命題 x と，証明者だけが知っている証拠 ω（witness）に対し，',
      'Verify(vk, x, π) → {0,1} によって誰でも検証できる小さな証明 π を生成する暗号プロトコル。',
      '',
      '■ 満たすべき 3 性質',
      '  ・ Completeness（完全性）── 真の命題は真と証明される',
      '  ・ Soundness（健全性）── 偽の命題は偽と判定される',
      '  ・ Zero-Knowledge（ゼロ知識性）── 命題の真偽以外は何も漏れない',
      '',
      '■ 主な既存 SNARK',
      '  ・ Groth16 ── 証明サイズ最小，trusted setup が必要',
      '  ・ PLONK ── universal setup，Plonkish arithmetization',
      '  ・ STARK ── trusted setup 不要，post-quantum 安全性',
      '',
      '■ HyperNova は SNARK そのものではなく「SNARK の合成法」を提案する論文。',
    ].join('\n'),
    { fontSize: 13, bodyH: 5.4 }
  );

  drawPageNumber(slide, 4);
}
module.exports = { createSlide };
