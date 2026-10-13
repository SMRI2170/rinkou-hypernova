// theme.js - 參考 輪講1.pptx から直接抽出した色 / フォント
// 4:3 (10 x 7.5 in) を採用。pptxgenjs 既定の LAYOUT_16x9 は使いません。

const fonts = {
  // 日本語フォント (Mac/Win 双方を意識。なければ Hiragino Sans, Yu Gothic UI, Noto Sans CJK JP にフォールバック)
  jp: 'Yu Gothic',
  jpTitle: 'Yu Gothic UI',
  // 英数
  en: 'Calibri',
};

const theme = {
  primary: '282629',   // タイトル・本文・ページ番号 (ほぼ黒)
  secondary: '6B7280', // 図キャプション・補助テキスト (グレー)
  accent: '3E7EC7',     // キーフレーズ・■見出し・重要強調 (青)
  light: 'F3F4F6',     // タイトルバー背景 (淡グレー)
  bg: 'FFFFFF',        // スライド背景 (白)
  danger: 'C0504D',    // 赤字強調 (マイナス・弱点)
  success: '196B24',   // 緑強調 (補足)
};

// スライド寸法 (4:3, original = 10 x 7.5 in)
const SLIDE_W = 10.0;
const SLIDE_H = 7.5;

module.exports = { theme, fonts, SLIDE_W, SLIDE_H };