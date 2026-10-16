// slide-12.js — 限界と今後
const { theme } = require('./theme');
const { drawTitleBar, drawKeySentence, drawPageNumber, drawComparison } = require('./helpers');

function createSlide(pres) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  drawTitleBar(slide, '限界と今後');
  drawKeySentence(slide, '「最も強い SNARK」ではなく「最も実用化に近い folding 系」');

  drawComparison(slide,
    {
      title: '現状の限界',
      items: [
        { text: '双子楕円曲線（CycleFold）に依存', level: 1 },
        { text: '高効率なペアリング可能曲線ペア（Pallas / Vesta 等）が必要', level: 1 },
        { text: 'HyperKZG 利用時は trusted setup が必要', level: 1 },
        { text: 'post-quantum 安全性は未対応', level: 1, color: theme.danger },
        { text: 'Nova / SuperNova ほどの実装成熟度はまだ浅い', level: 1 },
      ],
    },
    {
      title: '今後の方向性',
      items: [
        { text: '楕円曲線サイクル不要な構成への拡張', level: 1 },
        { text: 'hash-based / lattice-based 証明系への展開', level: 1 },
        { text: 'zkVM / ZK-Rollup のバックエンドとして本番採用が進行', level: 1 },
        { text: 'Lurk / Sonobe / VIMz などモジュールへの取り込み', level: 1 },
        { text: '後続研究: ProtoStar, Protogalaxy, KiloNova への流れ', level: 1, color: theme.accent, bold: true },
      ],
    },
    { fontSize: 12 }
  );

}
module.exports = { createSlide };
