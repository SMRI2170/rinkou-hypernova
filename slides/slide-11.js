// slide-11.js — 応用例 図解
const { theme } = require('./theme');
const { drawTitleBar, drawKeySentence, drawPageNumber, drawColorBox, drawArrow } = require('./helpers');

function createSlide(pres) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  drawTitleBar(slide, 'HyperNova の応用');
  drawKeySentence(slide, '「長い計算の証明」が必要な領域で広く使われる');

  // 4 つの応用ボックスを 2x2 に配置
  const items = [
    {
      title: 'zkVM（RISC-V / EVM の実行証明）',
      body: '各命令の回路サイズに比例する prover で VM の実行全体を表せるため，最適な IVC バックエンドとして HyperNova 系が採用されつつある。',
      color: 'DBEAFE',
    },
    {
      title: 'ZK-Rollup',
      body: 'Polygon zkEVM, zkSync などの Validity Proof 系 rollup のバックエンド候補。トランザクション集約のコストを抑えられる。',
      color: 'E8EFF8',
    },
    {
      title: 'LLM provenance（ZKPROV）',
      body: 'arXiv 2506.20915 で，各層の binding 制約を HyperNova で multi-fold し，1 つの succinct 証明に集約する手法が提案されている。',
      color: 'FEF3C7',
    },
    {
      title: '信頼最小化クロスチェーンブリッジ',
      body: 'bridge 文献（HyperNova とは別系統・同名の Supra 製品）では ZKP を destination chain SC で検証するが，証明生成側に folding 系を使う構成も研究されている。',
      color: 'DCFCE7',
    },
  ];

  // 配置
  const positions = [
    { x: 0.43, y: 1.45 },
    { x: 5.07, y: 1.45 },
    { x: 0.43, y: 4.20 },
    { x: 5.07, y: 4.20 },
  ];

  items.forEach((item, i) => {
    const pos = positions[i];
    drawColorBox(slide, item.title, item.color, pos.x, pos.y, 4.40, 0.5, {
      fontSize: 14, bold: true, color: theme.primary, borderColor: item.color, borderWidth: 0,
    });
    drawColorBox(slide, item.body, 'FFFFFF', pos.x, pos.y + 0.55, 4.40, 2.0, {
      fontSize: 12, bold: false, color: theme.primary, borderColor: 'D1D5DB',
    });
  });

}
module.exports = { createSlide };
