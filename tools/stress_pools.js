// 压测 Shawn 数学思维全部题目生成器，找出卡死的池子
const fs = require('fs');
const path = require('path');
const src = fs.readFileSync(path.join(__dirname, '..', 'js', 'app.js'), 'utf8');

function grabBlock(code, marker, openCh, closeCh) {
  const start = code.indexOf(marker);
  if (start < 0) throw new Error('not found: ' + marker);
  let depth = 0, began = false;
  for (let i = start; i < code.length; i++) {
    if (code[i] === openCh) { depth++; began = true; }
    else if (code[i] === closeCh) { depth--; if (began && depth === 0) return code.slice(start, i + 1); }
  }
  throw new Error('unbalanced: ' + marker);
}

const helpers = 'function ri(a, b) { return a + Math.floor(Math.random() * (b - a + 1)); }\n' +
  'function pick(a) { return a[ri(0, a.length - 1)]; }\n' +
  'function shuffle(a) { return a.slice(); }\n' +
  'function gcd(a, b) { return b ? gcd(b, a % b) : Math.abs(a); }\n' +
  'function fracStr(n, d) { const g = gcd(n, d) || 1; n /= g; d /= g; return d === 1 ? String(n) : n + "/" + d; }\n';

const dsrc = fs.readFileSync(path.join(__dirname, '..', 'js', 'data.js'), 'utf8');
const ratCode = grabBlock(dsrc, 'const RATIONAL500', '[', ']') + ';';
const poolCode = grabBlock(src, 'const SHAWN_POOLS', '{', '}') + ';';

const bootstrap = `
SHAWN_POOLS.all = [];
Object.keys(SHAWN_POOLS).forEach(function (k) { if (k !== 'all') SHAWN_POOLS.all = SHAWN_POOLS.all.concat(SHAWN_POOLS[k]); });
globalThis.__POOLS = SHAWN_POOLS;
`;
eval(helpers + ratCode + poolCode + bootstrap);

const pools = globalThis.__POOLS;
for (const k of Object.keys(pools)) {
  const t0 = Date.now();
  let n = 0;
  for (let i = 0; i < 200; i++) {
    for (const gen of pools[k]) {
      const it = gen(); n++;
      if (!it || typeof it.q === 'undefined') throw new Error(k + ' produced bad item');
    }
  }
  const ms = Date.now() - t0;
  console.log(k.padEnd(14), String(pools[k].length).padStart(4) + ' gens', String(n).padStart(7) + ' calls', ms + 'ms' + (ms > 2000 ? '  <-- SLOW' : ''));
}
console.log('ALL DONE');
