// 从 js/data-listen.js 导出 en 文本 -> tools/listen_articles.json（供 gen_audio.py 用）
const fs = require('fs');
const path = require('path');
const src = fs.readFileSync(path.join(__dirname, '..', 'js', 'data-listen.js'), 'utf8');
const all = eval('(' + src.replace(/^\/\*[\s\S]*?\*\/\s*const LISTEN_ARTICLES =/, '').replace(/;\s*$/, '') + ')');
if (all.length !== 100) throw new Error('expected 100, got ' + all.length);
for (let i = 0; i < 100; i++) if (all[i].n !== i + 1) throw new Error('order broken at ' + i);
fs.writeFileSync(path.join(__dirname, 'listen_articles.json'), JSON.stringify(all.map(a => ({ n: a.n, en: a.en }))));
console.log('ok, 100 articles exported');
