// slide-14.js — 数式編 (1): IVC と Folding の形式定義
const { theme, fonts } = require('./theme');
const { drawTitleBar, drawKeySentence, drawPageNumber } = require('./helpers');

function createSlide(pres) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  drawTitleBar(slide, '数式編 (1) ── IVC と Folding の形式定義');
  drawKeySentence(slide, 'HyperNova の主張を数式で正確に');

  // =========== 上段: IVC の定義 ===========
  slide.addText([
    { text: '■  Incrementally Verifiable Computation (IVC) とは', options: { bold: true, fontSize: 16, color: theme.accent, breakLine: true } },
    { text: '\n', options: {} },
    { text: '  ◾ ', options: {} },
    { text: 'Setup', options: { italic: true, bold: true, fontSize: 13 } },
    { text: '(1', options: { fontSize: 13 } },
    { text: 'λ', options: { italic: true, fontSize: 13 } },
    { text: ') → (pk, vk).', options: { fontSize: 13, breakLine: true } },

    { text: '  ◾ ', options: {} },
    { text: 'Prover', options: { italic: true, bold: true, fontSize: 13 } },
    { text: ' は各ステップの witness ', options: { fontSize: 13 } },
    { text: 'ω', options: { italic: true, fontSize: 13 } },
    { text: '_i を渡されて ', options: { fontSize: 13 } },
    { text: 'π', options: { italic: true, fontSize: 13 } },
    { text: '_i を更新する:', options: { fontSize: 13, breakLine: true } },

    { text: '        ', options: {} },
    { text: 'π', options: { italic: true, bold: true, color: theme.accent, fontSize: 14 } },
    { text: '_i ← ', options: { fontSize: 14 } },
    { text: 'Prove', options: { italic: true, fontSize: 14 } },
    { text: '(pk, F, z_0, i, (z_1, ω_1), …, (z_i, ω_i))', options: { fontSize: 14, breakLine: true } },

    { text: '  ◾ ', options: {} },
    { text: 'Verifier', options: { italic: true, bold: true, fontSize: 13 } },
    { text: ' は最終 π だけ見て判定:', options: { fontSize: 13, breakLine: true } },

    { text: '        ', options: {} },
    { text: 'Verify', options: { italic: true, fontSize: 14 } },
    { text: '(vk, F, z_0, i, z_i, π_i) → ', options: { fontSize: 14 } },
    { text: '{accept, reject}', options: { italic: true, bold: true, color: theme.accent, fontSize: 14 } },

    { text: '\n', options: {} },
    { text: '  ◾ 性質 3 つ ── ', options: { fontSize: 13, color: theme.secondary } },
    { text: 'Completeness', options: { italic: true, fontSize: 13 } },
    { text: ' / ', options: { fontSize: 13, color: theme.secondary } },
    { text: 'Soundness', options: { italic: true, fontSize: 13 } },
    { text: ' / ', options: { fontSize: 13, color: theme.secondary } },
    { text: 'ZK (Hiding)', options: { italic: true, fontSize: 13, bold: true, color: theme.accent } },
  ], {
    x: 0.43, y: 1.34, w: 9.06, h: 2.3,
    fontFace: fonts.jp,
    valign: 'top', align: 'left', margin: 0,
    paraSpaceAfter: 2,
  });

  // 仕切り
  slide.addShape('line', {
    x: 0.43, y: 3.75, w: 9.06, h: 0,
    line: { color: 'D1D5DB', width: 0.75 },
  });

  // =========== 下段: Folding Scheme の定義 ===========
  slide.addText([
    { text: '■  Folding Scheme とは', options: { bold: true, fontSize: 16, color: theme.accent, breakLine: true } },
    { text: '\n', options: {} },
    { text: '  ◾ 2 つの NP instance を 1 つの instance に集約する暗号プリミティブ', options: { fontSize: 13, breakLine: true } },

    { text: '        ', options: {} },
    { text: '(u_1, u_2)  ── Fold ──→  u_3', options: { fontSize: 14, color: theme.accent, bold: true, breakLine: true } },

    { text: '  ◾ Prover と Verifier の動作:', options: { fontSize: 13, breakLine: true } },

    { text: '        ', options: {} },
    { text: 'Fold.Prove', options: { italic: true, fontSize: 13 } },
    { text: '(pk, u_1, u_2, w_1, w_2) → ', options: { fontSize: 13 } },
    { text: 'π', options: { italic: true, fontSize: 13 } },
    { text: '_3      (folded proof)', options: { fontSize: 13, breakLine: true } },

    { text: '        ', options: {} },
    { text: 'Fold.Verify', options: { italic: true, fontSize: 13 } },
    { text: '(vk, u_1, u_2, u_3, π_3) → ', options: { fontSize: 13 } },
    { text: '{accept}', options: { italic: true, bold: true, color: theme.accent, fontSize: 13 } },

    { text: '\n', options: {} },
    { text: '  ◾ Folding のコスト:', options: { fontSize: 13, breakLine: true } },
    { text: '        ', options: {} },
    { text: 'prover は 1 回の ', options: { fontSize: 13 } },
    { text: 'MSM (multi-scalar multiplication)', options: { italic: true, fontSize: 13 } },
    { text: ' で 1 step を完了', options: { fontSize: 13, breakLine: true } },
    { text: '        ', options: {} },
    { text: 'cost = ', options: { fontSize: 13 } },
    { text: 'O(1)·MSM(size N)', options: { italic: true, bold: true, color: theme.accent, fontSize: 14 } },
    { text: '   ← ', options: { fontSize: 13 } },
    { text: 'N', options: { italic: true, fontSize: 13 } },
    { text: ' は制約システムの変数数', options: { fontSize: 13 } },
  ], {
    x: 0.43, y: 3.95, w: 9.06, h: 2.85,
    fontFace: fonts.jp,
    valign: 'top', align: 'left', margin: 0,
    paraSpaceAfter: 2,
  });

  // 下部のポイント
  slide.addText([
    { text: 'ポイント：', options: { bold: true, fontSize: 12, color: theme.primary } },
    { text: ' Nova は ', options: { fontSize: 12 } },
    { text: 'R1CS', options: { italic: true, fontSize: 12 } },
    { text: ' に閉じていた。HyperNova は ', options: { fontSize: 12 } },
    { text: 'CCS', options: { italic: true, fontSize: 12 } },
    { text: ' で同じコスト特性を実現 ── ', options: { fontSize: 12 } },
    { text: 'これが Slide 8 の「1 MSM」の主張', options: { fontSize: 12, italic: true, color: theme.accent } },
  ], {
    x: 0.43, y: 6.85, w: 9.06, h: 0.3,
    fontFace: fonts.jp,
    valign: 'middle', align: 'left',
  });

  drawPageNumber(slide, 14);
}
module.exports = { createSlide };
