// slide-11.js - 改行・字下げ・強調のルール集 (リファレンススライド)
//
// このスライドは DESIGN.md §「改行ルール」を実装で実証する見本。
// 新しい論文を書くときに「こう書けばこう見える」を参照するためのもの。

const { theme, fonts } = require('./theme');
const {
  drawTitleBar, drawKeySentence, drawPageNumber,
  drawBulletBlock, drawCallout
} = require('./helpers');

function createSlide(pres) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  drawTitleBar(slide, '改行・字下げ・強調のルール集');
  drawKeySentence(slide, '雛形が理解する 4 つの改行・強調ルール');

  drawBulletBlock(slide, [
    // ─ 例 1 ─────────────────────────────────────────
    { text: '例 1：長い括弧書きを 2 行に', level: 0 },
    { text: 'タイトルが長い場合、本体と補足で改行する', level: 1 },
    { runs: [
      { text: '（論文の原題＋和訳：' },
      { text: '和訳の続きを次の行に流す）', color: theme.secondary },
    ], level: 2 },

    // ─ 例 2 ─────────────────────────────────────────
    { text: '例 2：原因 → 結果の矢印（インライン）', level: 0 },
    { runs: [
      { text: 'A が原因のとき' },
      { text: '→', color: theme.accent, bold: true },
      { text: 'B 这样的構造が自然。' },
    ], level: 1 },

    // ─ 例 3 ─────────────────────────────────────────
    { text: '例 3：サブ結論は → マーカー（自動判定）', level: 0 },
    { text: '信頼性：モデルのパラメータの数に対し、測定データが不足', level: 1 },
    { text: '→ 学習データに合わせすぎる（過学習）', level: 2 },
    { text: '汎化性：内挿の評価が中心', level: 1 },
    { text: '→ 外挿（学習していない通り）の評価は少数', level: 2 },

    // ─ 例 4 ─────────────────────────────────────────
    { text: '例 4：空行でグループを区切る', level: 0 },
    { text: '• 短く緊密な 1 行', level: 1 },
    { text: '• 同じく 1 行で収まる', level: 1 },
    { blank: true },
    { text: '別の章へ（章ギャップを空行で示す）', level: 0 },
    { text: '• ここから次の章', level: 1 },

    // ─ 例 5 ─────────────────────────────────────────
    { text: '例 5：インラインで色を変える', level: 0 },
    { runs: [
      { text: '重要・肯定は' },
      { text: '青太字', color: theme.accent, bold: true },
      { text: '、弱点・否定は' },
      { text: '赤太字', color: theme.danger, bold: true },
      { text: 'で示す。' },
    ], level: 1 },
  ], { fontSize: 13, h: 5.2 });

  drawCallout(slide,
    '→ 結論：長い括弧書き・矢印・空行・色強調の組み合わせで「見る」のリズムを作る',
    { y: 6.6 });

  drawPageNumber(slide, 11);
}

module.exports = { createSlide };