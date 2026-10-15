// slide-15.js — 数式編 (2): Hiding / ZK-IVC / NovaBlindFold
const { theme, fonts } = require('./theme');
const { drawTitleBar, drawKeySentence, drawPageNumber } = require('./helpers');

function createSlide(pres) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  drawTitleBar(slide, '数式編 (2) ── ZK-IVC と Hiding (NovaBlindFold)');
  drawKeySentence(slide, '"計算の正当性" だけでなく "中身を秘匿" する');

  // =========== 上段: ZK-IVC の定義 ===========
  slide.addText([
    { text: '■  ZK-IVC (Zero-Knowledge IVC) とは', options: { bold: true, fontSize: 14, color: theme.accent, breakLine: true } },
    { text: '\n', options: {} },
    { text: '  ◾ IVC にさらに ', options: { fontSize: 12 } },
    { text: 'Zero-Knowledge (Hiding)', options: { italic: true, bold: true, color: theme.accent, fontSize: 12 } },
    { text: ' を加えたもの', options: { fontSize: 12, breakLine: true } },

    { text: '  ◾ Hiding = 次の 3 つを ', options: { fontSize: 12, breakLine: true } },
    { text: '一切', options: { bold: true, color: theme.danger, fontSize: 12 } },
    { text: ' 明かさない:', options: { fontSize: 12, breakLine: true } },

    { text: '        ① 中間状態 z_1, z_2, …, z_{i-1} （隠蔽）', options: { fontSize: 12, breakLine: true } },
    { text: '        ② 各 step の witness ω_1, …, ω_i （秘匿）', options: { fontSize: 12, breakLine: true } },
    { text: '        ③ 証明 π_i と witness のリンク性', options: { fontSize: 12, breakLine: true } },

    { text: '\n', options: {} },
    { text: '  ◾ なぜ重要か（zkVM の文脈）', options: { fontSize: 12, bold: true, breakLine: true } },
    { text: '        LLM inference / 医療データ / 秘密鍵計算など', options: { fontSize: 12, breakLine: true } },
    { text: '        中身を知られずに「正しく実行された」ことだけを示したい', options: { fontSize: 12 } },
  ], {
    x: 0.43, y: 1.34, w: 9.06, h: 2.55,
    fontFace: fonts.jp,
    valign: 'top', align: 'left', margin: 0,
    paraSpaceAfter: 2,
  });

  // 仕切り
  slide.addShape('line', {
    x: 0.43, y: 4.00, w: 9.06, h: 0,
    line: { color: 'D1D5DB', width: 0.75 },
  });

  // =========== 下段: NovaBlindFold ===========
  slide.addText([
    { text: '■  NovaBlindFold ── 追加 SNARK なしで ZK を加える技法', options: { bold: true, fontSize: 14, color: theme.accent, breakLine: true } },
    { text: '\n', options: {} },
    { text: '  ◾ Nova の folding 自体がもつ ', options: { fontSize: 12 } },
    { text: 'blinding property', options: { italic: true, fontSize: 12 } },
    { text: ' を利用する', options: { fontSize: 12, breakLine: true } },

    { text: '        ランダム instance ', options: { fontSize: 12 } },
    { text: 'ρ', options: { italic: true, fontSize: 12 } },
    { text: ' を fold して IVC 証明に混ぜる:', options: { fontSize: 12, breakLine: true } },

    { text: '        ', options: {} },
    { text: 'π', options: { italic: true, bold: true, color: theme.accent, fontSize: 13 } },
    { text: '_zk ← ', options: { fontSize: 13 } },
    { text: 'Fold', options: { italic: true, fontSize: 13 } },
    { text: '(π_n, ', options: { fontSize: 13 } },
    { text: 'ρ', options: { italic: true, fontSize: 13 } },
    { text: ')', options: { fontSize: 13, breakLine: true } },

    { text: '  ◾ blinding 性の意味:', options: { fontSize: 12, breakLine: true } },

    { text: '        Verify(vk, z_0, n, z_n, π_zk) は ', options: { fontSize: 12 } },
    { text: '「任意のランダム化された証明との区別不能性」', options: { italic: true, fontSize: 12, color: theme.accent } },
    { text: ' を満たす', options: { fontSize: 12, breakLine: true } },

    { text: '\n', options: {} },
    { text: '  ◾ 既存方式との比較:', options: { fontSize: 12, bold: true, breakLine: true } },
    { text: '        ', options: {} },
    { text: '既存 Nova 系', options: { fontSize: 12 } },
    { text: ' ── 別 SNARK（Groth16 等）を被せて ZK 化', options: { fontSize: 12, color: theme.danger, breakLine: true } },
    { text: '        ', options: {} },
    { text: 'HyperNova (本論文)', options: { fontSize: 12, bold: true } },
    { text: ' ── 上の Fold(π, ρ) だけで ZK 化（回路サイズ小）', options: { fontSize: 12, color: theme.accent, bold: true } },
  ], {
    x: 0.43, y: 4.15, w: 9.06, h: 2.7,
    fontFace: fonts.jp,
    valign: 'top', align: 'left', margin: 0,
    paraSpaceAfter: 2,
  });

  drawPageNumber(slide, 15);
}
module.exports = { createSlide };
