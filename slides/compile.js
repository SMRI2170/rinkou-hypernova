// compile.js — HyperNova 代 2 回輪講スライドのビルドエントリ
const pptxgen = require('pptxgenjs');
const { theme, SLIDE_W, SLIDE_H } = require('./theme');

const pres = new pptxgen();
pres.defineLayout({ name: 'HYPERNOVA_4_3', width: SLIDE_W, height: SLIDE_H });
pres.layout = 'HYPERNOVA_4_3';

// メタ情報
pres.author = 'Rinkou 2nd presentation';
pres.title = 'HyperNova - Recursive Arguments for Customizable Constraint Systems';
pres.subject = 'CRYPTO 2024 paper overview';

// 16 枚のスライドを順次ロード (01-13 本編 + 14-16 数式・実データ編)
for (let i = 1; i <= 16; i++) {
  const id = String(i).padStart(2, '0');
  const mod = require('./slide-' + id + '.js');
  mod.createSlide(pres);
}

// ビルドして output/ に保存
const path = require('path');
const fs = require('fs');
const outDir = path.join(__dirname, 'output');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, 'hypernova-rinkou.pptx');

pres.writeFile({ fileName: outPath }).then((p) => {
  console.log('Generated: ' + p);
});
