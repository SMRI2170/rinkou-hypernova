// helpers.js - 共通レイアウトコンポーネント
// 参考スライドの「いつもの形」を関数化。呼び出し側でテキスト・データを渡すだけ。

const { theme, fonts, SLIDE_W, SLIDE_H } = require('./theme');

// ===== 上部ヘッダー (タイトルバー + タイトル文字)  =========================================
function drawTitleBar(slide, title) {
  // ライトグレーの帯
  slide.addShape('rect', {
    x: 0, y: 0, w: SLIDE_W, h: 0.67,
    fill: { color: theme.light },
    line: { type: 'none' },
  });
  // タイトル文字
  slide.addText(title, {
    x: 0.43, y: 0.10, w: SLIDE_W - 0.86, h: 0.47,
    fontFace: fonts.jpTitle, fontSize: 26,
    color: theme.primary, bold: true,
    valign: 'middle', align: 'left',
    fit: 'shrink',
  });
}

// ===== キーフレーズ帯 (縦青バー + 太字青文) =================================================
function drawKeySentence(slide, text) {
  // 縦のアクセントバー
  slide.addShape('rect', {
    x: 0.43, y: 0.89, w: 0.07, h: 0.30,
    fill: { color: theme.accent },
    line: { type: 'none' },
  });
  // キーフレーズ
  slide.addText(text, {
    x: 0.63, y: 0.86, w: SLIDE_W - 1.06, h: 0.36,
    fontFace: fonts.jp, fontSize: 18,
    color: theme.accent, bold: true,
    valign: 'middle', align: 'left',
  });
}

// ===== ページ番号 (左下) ===================================================================
function drawPageNumber(slide, n) {
  slide.addText(String(n), {
    x: 0.43, y: 7.22, w: 0.59, h: 0.20,
    fontFace: fonts.en, fontSize: 14,
    color: theme.primary, bold: true,
    valign: 'middle', align: 'left',
  });
}

// ===== 箇条書き (レベルに応じて ■ / • / • / → を切替) =====================================
// items 1 要素 = 1 段落 (=1 行) が基本。
//
//   { text, level }                                       黒テキストの通常の弾
//   { text, level, marker: '→' | '■' | '' }              マーカーを強制指定
//   { runs: [{text, color?, bold?}, ...], level }         インラインで色を混ぜる
//   { text, level, blankBefore: true }                    直前に空行を挿入
//   { text, level, blankAfter: true }                     直後に空行を挿入
//   { text, level, paraSpaceBefore: N }                   段落前余白を pt で上書き
//   { text, level, color: 'C0504D' }                      文字色を上書き
//   { text, level, bold: true }                           太字を上書き
//
// level と prefix の既定対応:
//   level 0 → '■ ' (青太字 17pt)
//   level 1 → '  • ' (黒 14pt)
//   level 2 → '    • ' または '    → ' (テキスト先頭が → なら自動切替)
//
// また、独立した `{ blank: true }` 要素を渡すと空行を強制できる (Visual style guidance §B)。
function bulletItems(items, baseFontSize = 14) {
  const out = [];
  for (const it of items) {
    // 強制空行
    if (it.blank) {
      out.push({
        text: '',
        options: {
          fontSize: 6, // 視覚的に余白だけになるよう極小サイズ
          paraSpaceBefore: 0,
          paraSpaceAfter: 0,
          breakLine: true,
        },
      });
      continue;
    }

    const level = (it.level === undefined || it.level === null) ? 1 : it.level;
    let prefix = '';
    let color = it.color || theme.primary;
    let bold = it.bold || false;
    let fontSize = baseFontSize;

    // 既定マーカー / 色 / 太字 (ユーザー指定があれば上書き)
    if (it.marker === undefined) {
      if (level === 0) {
        prefix = '■ ';
        if (color === theme.primary) color = theme.accent;
        bold = true;
        fontSize = baseFontSize + 3;
      } else if (level === 1) {
        prefix = '  • ';
      } else if (level === 2) {
        // text 先頭が → なら → マーカー (Visual style guidance §C)
        // ただし接頭辞を二重に付けないよう、text が → で始まる場合は prefix を空白だけにする
        const head = it.runs ? it.runs.map(r => r.text).join('') : it.text || '';
        if (head.trim().startsWith('→')) {
          prefix = '    ';       // インデントだけ。マーカーは text に既に含まれる
        } else {
          prefix = '    • ';
        }
        fontSize = baseFontSize - 1;
      } else if (level >= 3) {
        prefix = '      • ';
        fontSize = baseFontSize - 2;
      }
    } else {
      prefix = it.marker === '' ? '' : (it.marker + ' ');
    }

    // 本文の組み立て
    let bodyText;
    if (it.runs) {
      bodyText = prefix + it.runs.map(r => r.text).join('');
    } else {
      bodyText = prefix + (it.text || '');
    }

    // 段落余白 (Visual style guidance §B: 章は広く、項目は密に)
    const paraSpaceBefore = it.paraSpaceBefore !== undefined
      ? it.paraSpaceBefore
      : (level === 0 ? 6 : (level === 1 ? 3 : 2));

    out.push({
      text: bodyText,
      options: {
        color, bold, fontSize,
        paraSpaceBefore,
        paraSpaceAfter: it.paraSpaceAfter !== undefined ? it.paraSpaceAfter : 0,
        indentLevel: level,
        bullet: false,
        breakLine: true,
      },
    });

    // 強制空行 (後)
    if (it.blankAfter) {
      out.push({
        text: '',
        options: {
          fontSize: 6,
          paraSpaceBefore: 0,
          paraSpaceAfter: 0,
          breakLine: true,
        },
      });
    }
  }
  return out;
}

function drawBulletBlock(slide, items, opts = {}) {
  const x = opts.x || 0.43;
  const y = opts.y || 1.34;
  const w = opts.w || 9.06;
  const h = opts.h || 5.6;
  const font = opts.font || fonts.jp;
  const baseFontSize = opts.fontSize || 14;
  slide.addText(bulletItems(items, baseFontSize), {
    x, y, w, h,
    fontFace: font,
    valign: 'top',
    align: 'left',
    margin: 0,
  });
}

// ===== 段落グループ (章・節を空行で区切る) =============================================
// paragraph(items, opts) を bulletItems に展開し、各グループの最後に空行を自動挿入する。
// 例: paragraphs([
//   { title: '標準化', bullets: [...] },
//   { title: '正規化', bullets: [...] },
// ])
function paragraphs(groups, opts = {}) {
  const out = [];
  groups.forEach((g, gi) => {
    if (gi > 0) out.push({ blank: true });          // グループ間に空行
    if (g.title) {
      out.push({ text: g.title, level: 0, ...(g.titleOpts || {}) });
    }
    g.bullets.forEach((b) => out.push(b));
    if (g.blankAfter) out.push({ blank: true });    // グループ末尾の余白 (任意)
  });
  return out;
}

// ===== 長いテキストの整形 ================================================================
// 改行位置の候補 (→、`：`、`・`、`、`) の前後に自然改行を強制する。
// text 内の \n はそのまま保持。空行 (連続した \n) は 1 個にまとめる。
// maxCharsPerLine: 目安。強制ではなく、自然な切れ目を採用。
function splitSoftBreaks(text, maxCharsPerLine = 38) {
  if (!text) return text;
  const lines = text.split('\n');
  const out = [];
  const breakChars = ['→', '：', '・', '、', '. ', '? ', '! '];
  for (const line of lines) {
    if (line.length <= maxCharsPerLine) { out.push(line); continue; }
    // 候補文字で分割を試みる
    let bestIdx = -1;
    let bestDist = Infinity;
    for (const ch of breakChars) {
      const i = line.indexOf(ch);
      if (i >= 0) {
        const d = Math.abs(i - maxCharsPerLine);
        if (d < bestDist) { bestDist = d; bestIdx = i; }
      }
    }
    if (bestIdx > 0) {
      out.push(line.substring(0, bestIdx + 1));
      out.push(line.substring(bestIdx + 1));
    } else {
      out.push(line);
    }
  }
  return out.join('\n');
}

// ===== 表 (シンプル、参考スライドの「関連研究(1/2)」型) ====================================
// rows: [['col1', 'col2', ...], [...], ...]
// headerRow: 1 段目のみ色を変える (省略可)
function drawTable(slide, rows, opts = {}) {
  const x = opts.x || 0.43;
  const y = opts.y || 1.34;
  const w = opts.w || 9.06;
  const fontSize = opts.fontSize || 12;
  const headerColor = opts.headerColor || theme.accent;
  const stripeColor = opts.stripeColor || 'F3F4F6';

  const tableData = rows.map((cells, ri) =>
    cells.map((c) => ({
      text: String(c),
      options: {
        fontFace: fonts.jp,
        fontSize,
        color: theme.primary,
        bold: ri === 0,
        fill: { color: ri === 0 ? headerColor : (ri % 2 === 0 ? stripeColor : 'FFFFFF') },
        color: ri === 0 ? 'FFFFFF' : theme.primary,
        valign: 'middle',
        align: opts.align || 'left',
        margin: 0.05,
      },
    }))
  );

  slide.addTable(tableData, {
    x, y, w,
    colW: opts.colW,
    rowH: opts.rowH || 0.35,
    border: { type: 'solid', pt: 0.5, color: 'D1D5DB' },
  });
}

// ===== 画像 + キャプション (右半分に置く典型パターン) ======================================
function drawRightImage(slide, imagePath, caption, opts = {}) {
  const x = opts.x || 5.6;
  const y = opts.y || 1.34;
  const w = opts.w || 3.95;
  const h = opts.h || 2.5;
  const captionY = opts.captionY || (y + h + 0.08);

  slide.addImage({ path: imagePath, x, y, w, h });
  if (caption) {
    slide.addText(caption, {
      x, y: captionY, w, h: 0.25,
      fontFace: fonts.jp, fontSize: 10,
      color: theme.secondary, italic: true,
      valign: 'top', align: 'left',
    });
  }
}

// ===== 結論用の囲み (薄い青帯 + 太字黒文字) ================================================
function drawCallout(slide, text, opts = {}) {
  const x = opts.x || 0.43;
  const y = opts.y || 6.0;
  const w = opts.w || 9.06;
  const h = opts.h || 0.55;
  slide.addShape('rect', {
    x, y, w, h,
    fill: { color: 'E8EFF8' },
    line: { color: theme.accent, width: 0.5 },
  });
  slide.addText(text, {
    x: x + 0.15, y, w: w - 0.3, h,
    fontFace: fonts.jp, fontSize: 13,
    color: theme.primary, bold: true,
    valign: 'middle', align: 'left',
  });
}

// ===== 用語の定義 (1つの概念を大きく説明) ===================================================
// 「経路損失」のように、タイトル下に大きな見出し + 青補足、その下に本文、という構造。
// 参考スライド 5 のような構成。
function drawConceptDefinition(slide, term, sub, body, opts = {}) {
  const x = opts.x || 0.43;
  const y = opts.y || 1.34;
  const w = opts.w || 9.06;
  // 太字の用語 (黒)
  slide.addText([
    { text: term, options: { bold: true, fontSize: 20, color: theme.primary } },
    { text: sub ? '（' + sub + '）' : '', options: { fontSize: 16, color: theme.accent, bold: true } },
  ], {
    x, y, w, h: 0.45,
    fontFace: fonts.jp,
    valign: 'middle', align: 'left', margin: 0,
  });
  // 本文
  slide.addText(body, {
    x, y: y + 0.5, w, h: opts.bodyH || 4.8,
    fontFace: fonts.jp, fontSize: opts.fontSize || 14,
    color: theme.primary, valign: 'top', align: 'left', margin: 0,
  });
}

// ===== 左右対比 (2 カラム) =================================================================
// leftCol, rightCol: { title, items: [{text, level}] }
function drawComparison(slide, leftCol, rightCol, opts = {}) {
  const x = opts.x || 0.43;
  const y = opts.y || 1.34;
  const colW = (opts.w || 9.06) / 2 - 0.15;

  // 左カラム
  drawBulletBlock(slide, [
    { text: leftCol.title, level: 0 },
    ...leftCol.items.map(t => ({ text: t.text, level: t.level !== undefined ? t.level : 1 })),
  ], { x, y, w: colW, h: opts.h || 5.4, fontSize: opts.fontSize || 13 });

  // 右カラム
  drawBulletBlock(slide, [
    { text: rightCol.title, level: 0 },
    ...rightCol.items.map(t => ({ text: t.text, level: t.level !== undefined ? t.level : 1 })),
  ], { x: x + colW + 0.3, y, w: colW, h: opts.h || 5.4, fontSize: opts.fontSize || 13 });

  // 中央の縦区切り (薄いグレー)
  slide.addShape('line', {
    x: x + colW + 0.13, y: y + 0.1, w: 0, h: (opts.h || 5.4) - 0.2,
    line: { color: 'D1D5DB', width: 0.5 },
  });
}

// ===== ランキング表 (重要度順、2 列) ========================================================
// rows: [{ rank: '1', item: '三次元距離', score: '−8.5' }, ...]
//   1 位だけ青太字、薄い背景は交互
function drawRankedList(slide, rows, opts = {}) {
  const x = opts.x || 0.43;
  const y = opts.y || 1.34;
  const w = opts.w || 5.5;
  const rowH = opts.rowH || 0.42;
  const rankW = opts.rankW || 0.7;
  const itemW = w - rankW - (opts.scoreW || 1.2);
  const scoreW = opts.scoreW || 1.2;
  const highlightTop = opts.highlightTop || 4;     // 上位 N 位を青くハイライト

  rows.forEach((r, i) => {
    const ry = y + i * rowH;
    const isHighlight = i < highlightTop;

    // 行全体の背景 (縞 + 上位行は薄青)
    const fillColor = isHighlight ? 'E8EFF8' : (i % 2 === 0 ? 'FFFFFF' : 'F9FAFB');
    slide.addShape('rect', {
      x, y: ry, w, h: rowH,
      fill: { color: fillColor },
      line: { type: 'none' },
    });

    // 順位
    slide.addText(r.rank, {
      x, y: ry, w: rankW, h: rowH,
      fontFace: fonts.en, fontSize: 14,
      color: isHighlight ? theme.accent : theme.secondary,
      bold: true,
      align: 'center', valign: 'middle', margin: 0,
    });
    // 項目名
    slide.addText(r.item, {
      x: x + rankW, y: ry, w: itemW, h: rowH,
      fontFace: fonts.jp, fontSize: 13,
      color: isHighlight ? theme.accent : theme.primary,
      bold: isHighlight,
      align: 'left', valign: 'middle', margin: 0.05,
    });
    // スコア
    if (r.score !== undefined) {
      slide.addText(r.score, {
        x: x + rankW + itemW, y: ry, w: scoreW, h: rowH,
        fontFace: fonts.en, fontSize: 12,
        color: theme.primary,
        align: 'right', valign: 'middle', margin: 0.05,
      });
    }
  });
}

// ===== 色付きボックス (図解用) ==============================================================
// label: ボックス内のテキスト, color: 塗り (6文字 hex)
function drawColorBox(slide, label, color, x, y, w, h, opts = {}) {
  slide.addShape('rect', {
    x, y, w, h,
    fill: { color },
    line: { color: opts.borderColor || '000000', width: opts.borderWidth || 0.5 },
  });
  slide.addText(label, {
    x, y, w, h,
    fontFace: opts.fontFace || fonts.jp,
    fontSize: opts.fontSize || 11,
    color: opts.color || 'FFFFFF',
    bold: opts.bold !== false,
    align: 'center', valign: 'middle', margin: 0.05,
  });
}

// ===== 矢印 (図解用) ======================================================================
function drawArrow(slide, x, y, w, h, opts = {}) {
  slide.addShape('line', {
    x, y, w, h,
    line: {
      color: opts.color || theme.primary,
      width: opts.width || 1.5,
      endArrowType: 'triangle',
    },
  });
}

// ===== 結論・まとめリスト (赤で弱点を強調) ==================================================
// items: [{ text, type: 'positive'|'negative'|'neutral' }]
function drawConclusion(slide, items, opts = {}) {
  const x = opts.x || 0.43;
  const y = opts.y || 1.34;
  const w = opts.w || 9.06;
  const h = opts.h || 5.6;

  const paragraphs = items.map((it) => {
    let prefix = '';
    let color = theme.primary;
    let bold = true;
    let fontSize = 16;
    if (it.type === 'positive') { prefix = '✓ '; color = theme.accent; }
    else if (it.type === 'negative') { prefix = '✗ '; color = theme.danger; }
    else { prefix = '→ '; color = theme.primary; }
    return {
      text: prefix + it.text,
      options: {
        color, bold, fontSize,
        paraSpaceBefore: 8,
        indentLevel: 0,
        bullet: false,
        breakLine: true,
      },
    };
  });

  slide.addText(paragraphs, {
    x, y, w, h,
    fontFace: fonts.jp, valign: 'top', align: 'left', margin: 0,
  });
}

// ===== インライン強調 (1 つの addText 内で青/赤太字を混在) ==================================
// runs: [{ text, color?, bold?, fontSize? }]   ※ text は ASCII 引用符で囲む (中国 smart quote 不可)
function drawInlineText(slide, runs, opts = {}) {
  const x = opts.x || 0.43;
  const y = opts.y || 1.34;
  const w = opts.w || 9.06;
  const h = opts.h || 0.4;
  const segments = runs.map((r) => ({
    text: r.text,
    options: {
      fontFace: fonts.jp,
      fontSize: r.fontSize || opts.fontSize || 14,
      color: r.color || theme.primary,
      bold: r.bold !== false,
      valign: 'top',
    },
  }));
  slide.addText(segments, {
    x, y, w, h,
    valign: 'top', align: 'left', margin: 0,
  });
}

module.exports = {
  drawTitleBar,
  drawKeySentence,
  drawPageNumber,
  drawBulletBlock,
  bulletItems,
  paragraphs,
  splitSoftBreaks,
  drawTable,
  drawRightImage,
  drawCallout,
  drawConceptDefinition,
  drawComparison,
  drawRankedList,
  drawColorBox,
  drawArrow,
  drawConclusion,
  drawInlineText,
};