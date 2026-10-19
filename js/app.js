  /* ============ 工具 ============ */
  function ri(a, b) { return a + Math.floor(Math.random() * (b - a + 1)); }
  function pick(a) { return a[ri(0, a.length - 1)]; }
  function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function sample(a, n) {
    const c = a.slice(), out = [];
    for (let i = 0; i < n; i++) out.push(c.splice(ri(0, c.length - 1), 1)[0]);
    return out;
  }
  function plus(sym, n) {
    let s = '';
    for (let i = 0; i < n; i++) { if (i) s += '＋'; s += sym; }
    return s;
  }
  function escapeHtml(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function toast(msg) {
    let el = document.getElementById('toast');
    if (!el) { el = document.createElement('div'); el.id = 'toast'; document.body.appendChild(el); }
    el.textContent = msg;
    el.className = 'show';
    clearTimeout(el._t);
    el._t = setTimeout(() => { el.className = ''; }, 1800);
  }
  function normalizeNums(s) {
    const t = String(s)
      .replace(/[０-９]/g, c => String.fromCharCode(c.charCodeAt(0) - 0xFEE0))
      .replace(/[－—−–]/g, '-')
      .replace(/[、，,和与\s]+/g, ' ');
    return (t.match(/-?\d+(?:\.\d+)?/g) || []).map(Number).sort((a, b) => a - b);
  }
 function gradeOne(input, key) {
    if (key.length === 1 && typeof key[0] === 'string') {
      const a = parseNum(key[0]), b = parseNum(input);
      if (a !== null && b !== null) return Math.abs(a - b) < 0.01;
    }
    const got = Array.from(new Set(normalizeNums(input)));
    const exp = Array.from(new Set(key)).sort((a, b) => a - b);
    if (got.length !== exp.length) return false;
    return got.every((v, i) => v === exp[i]);
  }
  function parseNum(s) {
    // 统一的数值解析：支持分数 1/6、除号 3÷4、小数、负数、全角数字、带分数 1 1/2
    let t = String(s)
      .replace(/[０-９]/g, function (c) { return String.fromCharCode(c.charCodeAt(0) - 0xFEE0); })
      .replace(/[－—−–ー]/g, '-')
      .replace(/[÷／⁄∕]/g, '/')
      .replace(/[．。]/g, '.')
      .replace(/　/g, ' ')
      .trim();
    if (t === '') return null;
    const mixed = t.match(/^(-?\d+)\s+(\d+)\s*\/\s*(\d+)$/);
    if (mixed) {
      const d = Number(mixed[3]);
      if (!d) return null;
      const sign = mixed[1].charAt(0) === '-' ? -1 : 1;
      return sign * (Math.abs(Number(mixed[1])) + Number(mixed[2]) / d);
    }
    const flat = t.replace(/\s+/g, '');
    const frac = flat.match(/^(-?\d+(?:\.\d+)?)\/(-?\d+(?:\.\d+)?)$/);
    if (frac) {
      const d = Number(frac[2]);
      if (d === 0) return null;
      return Number(frac[1]) / d;
    }
    if (!/^[+-]?\d*(?:\.\d*)?$/.test(flat)) return null;
    const v = Number(flat.replace(/^\+/, ''));
    return isNaN(v) ? null : v;
  }
  function gcd(a, b) { return b ? gcd(b, a % b) : Math.abs(a); }
  function fracStr(n, d) { const g = gcd(n, d) || 1; n /= g; d /= g; return d === 1 ? String(n) : n + '/' + d; }

 // ===== 多孩子工作区：当前孩子 + 存储命名空间 =====
 const PROFILE_KEY = 'elsa_profile_v1';
 let PROFILE_ID = (function () {
   try {
     const q = (location.search.match(/[?&]p=(elsa|shawn)\b/) || [])[1];
     if (q) { try { localStorage.setItem(PROFILE_KEY, q); } catch (e2) {} return q; }
     return localStorage.getItem(PROFILE_KEY) || 'elsa';
   } catch (e) { return 'elsa'; }
 })();
 function pk(base) { return base + '::' + PROFILE_ID; }
 function lsGet(base) {
   try {
     var v = localStorage.getItem(pk(base));
     if (v === null && PROFILE_ID === 'elsa') v = localStorage.getItem(base); // 兼容升级前的旧数据
     return v;
   } catch (e) { return null; }
 }

 const NAMES = ['小明','小红','小刚','小华','小丽','小军','小方','小云','小静','小王','小张','小李','小美','小东'];
  const ANIMALS = ['小猫','小狗','小兔','小鸟','小马'];
  const COLORS = ['红','黄','蓝','绿','白','紫'];

  /* ============ 思维题库：12 类 ============ */
  function gen1() {
    function inc() { const d = ri(2,5), a = ri(1,9); return {q:`${a}，${a+d}，${a+2*d}，${a+3*d}，____，${a+5*d}`, a:`${a+4*d}（依次加${d}）`}; }
    function dec() { const d = ri(3,8), a = ri(82,100); return {q:`${a}，${a-d}，${a-2*d}，${a-3*d}，____，${a-5*d}`, a:`${a-4*d}（依次减${d}）`}; }
    function dbl() { const s = ri(2,5); return {q:`${s}，${s*2}，${s*4}，${s*8}，____，${s*32}`, a:`${s*16}（依次乘2）`}; }
    function fib() { const a = ri(1,4), b = ri(1,4); const t = [a, b, a+b, a+2*b, 2*a+3*b, 3*a+5*b, 5*a+8*b]; return {q:`${t[0]}，${t[1]}，${t[2]}，${t[3]}，${t[4]}，____，${t[6]}`, a:`${t[5]}（前两数之和等于后一数）`}; }
    function sq() { return {q:'1，4，9，16，25，____，49', a:'36（平方数）'}; }
    function tri() { return {q:'1，3，6，10，15，____，28', a:'21（依次加2、3、4、5、6）'}; }
    function nn1() { return {q:'2，6，12，20，30，____，56', a:'42（2=1×2，6=2×3……）'}; }
    function diff() { const a = ri(1,3); return {q:`${a}，${a+1}，${a+3}，${a+6}，${a+10}，____，${a+21}`, a:`${a+15}（依次加1、2、3、4、5）`}; }
    function mult() { const k = ri(3,6); return {q:`${k}，${k*2}，${k*3}，${k*4}，____，${k*6}`, a:`${k*5}（依次加${k}）`}; }
    function half() { return {q:'64，32，16，8，____，2', a:'4（依次除以2）'}; }
    const t = [inc, dec, dbl, fib, sq, tri, nn1, diff, mult, half];
    shuffle(t); return t.slice(0, 10).map(f => f());
  }
  function gen2() {
    const pairs = [['○','△'],['□','○'],['★','☆'],['●','○'],['▲','▼'],['○','□']];
    function alt2() { const c = pick(pairs); const a=c[0],b=c[1]; return {q:`按规律填空：${a}、${b}、${a}、${b}、${a}、${b}、____、${a}。`, a:b}; }
    function cyc3() { const c = pick([['□','○','△'],['△','○','□'],['○','□','△'],['●','■','▲']]); const a=c[0],b=c[1],d=c[2]; return {q:`按规律填空：${a}、${b}、${d}、${a}、${b}、${d}、${a}、${b}、____。`, a:d}; }
    function grow() { const s = ri(1,2); const g = n => plus('●', n) + '○'; return {q:`按规律接着画：${g(s)}、${g(s+1)}、${g(s+2)}、________。`, a:g(s+3) + '（黑球每次增加1个）'}; }
    function dir() { return {q:'按规律填空：上、下、左、右、上、下、左、____。', a:'右'}; }
    function bw() { const a = Math.random() < .5 ? '黑' : '白', b = a === '黑' ? '白' : '黑'; return {q:`按规律填空：${a}、${b}、${a}、${b}、${a}、${b}、____。`, a:b}; }
    function big() { const a = Math.random() < .5 ? '大' : '小', b = a === '大' ? '小' : '大'; return {q:`按规律填空：${a}、${b}、${a}、${b}、${a}、${b}、____。`, a:b}; }
    function twoone() { const c = sample(['○','△','□'], 2); const x=c[0], y=c[1]; return {q:`按规律填空：${x}、${x}、${y}、${x}、${x}、${y}、${x}、${x}、____。`, a:y}; }
    function alt2b() { const c = pick([['★','☆'],['△','▲'],['■','□']]); return {q:`按规律填空：${c[0]}、${c[1]}、${c[0]}、${c[1]}、${c[0]}、____。`, a:c[1]}; }
    function cyc2() { const c = pick([['上','下'],['左','右'],['前','后']]); return {q:`按规律填空：${c[0]}、${c[1]}、${c[0]}、${c[1]}、${c[0]}、${c[1]}、____。`, a:c[0]}; }
    function grow2() { return {q:'按规律填空：○、○、△、○、○、△、○、○、____。', a:'△'}; }
    const t = [alt2, cyc3, grow, dir, bw, big, twoone, alt2b, cyc2, grow2];
    shuffle(t); return t.slice(0, 10).map(f => f());
  }
  function gen3() {
    function height() { const n = sample(NAMES, 3); const A=n[0],B=n[1],C=n[2]; const high = Math.random() < .5; return {q:`${A}比${B}高，${B}比${C}高。三人中谁最${high?'高':'矮'}？`, a:high?A:C}; }
    function queue() { const n = sample(NAMES, 3); const A=n[0],B=n[1],C=n[2]; return {q:`三个小朋友排队，${A}不排第一，${B}不排最后，${C}排在${A}后面。谁排第一？`, a:B}; }
    function tall() { const n = sample(NAMES, 3); const A=n[0],B=n[1],C=n[2]; return {q:`${A}、${B}、${C}三人，${A}不是最高的，${B}比${C}矮。谁最高？`, a:C}; }
    function colors() { const c = sample(COLORS, 3); const c1=c[0],c2=c[1],c3=c[2]; return {q:`${c1}、${c2}、${c3}三个球排成一排，${c1}球不在左边，${c2}球不在中间，${c1}球在${c2}球的右边。写出从左到右的顺序。`, a:`${c2}、${c3}、${c1}`}; }
    function race() { const a = sample(ANIMALS, 3); const A=a[0],B=a[1],C=a[2]; return {q:`${A}、${B}、${C}赛跑。${A}不是第一，${B}不是最后，${C}在${A}后面。谁跑第一？`, a:B}; }
    function floor() { const n = sample(NAMES, 3); const A=n[0],B=n[1],C=n[2]; return {q:`${A}、${B}、${C}分别住一楼、二楼、三楼。${A}不住一楼，${B}不住三楼，${C}住二楼。${A}住几楼？`, a:'三楼'}; }
    function chain() { const n = sample(NAMES, 4); const A=n[0],B=n[1],C=n[2],D=n[3]; return {q:`四个小朋友排队，${A}在${B}前面，${B}在${C}前面，${C}在${D}前面。谁排第一？`, a:A}; }
    function skill() { const n = sample(NAMES, 3); const A=n[0],B=n[1],C=n[2]; return {q:`${A}、${B}、${C}三人中，一人会唱歌、一人会跳舞、一人会画画。${A}不会跳舞，${B}不会画画，${C}不会唱歌，${A}也不会画画。谁会唱歌？`, a:A}; }
    function tall2() { const n = sample(NAMES, 3); const A=n[0],B=n[1],C=n[2]; return {q:`三个小朋友，一个比一个高。${A}不是最矮，${C}不是最高，${B}比${A}高。谁最高？`, a:B}; }
    function score() { const n = sample(NAMES, 4); const A=n[0],B=n[1],C=n[2],D=n[3]; return {q:`四个学生考试，成绩各不相同。${A}的分数比${B}高、比${C}低，${D}的分数最低。谁分数最高？`, a:C}; }
    const t = [height, queue, tall, colors, race, floor, chain, skill, tall2, score];
    shuffle(t); return t.slice(0, 10).map(f => f());
  }
  function gen4() {
    function t1() { const k=ri(2,3),m=ri(2,4); return {q:`1个苹果可以换${k}个橘子，1个橘子可以换${m}颗糖。1个苹果可以换几颗糖？`, a:`${k*m}颗糖`}; }
    function t2() { const k=ri(2,3),m=ri(2,3); return {q:`○＝${plus('△',k)}，△＝${plus('□',m)}。一个○等于几个□？`, a:`${k*m}个□`}; }
    function t3() { const k=ri(2,3),m=ri(2,4); return {q:`1只鸡可以换${k}只鸭，1只鸭可以换${m}只鹅。1只鸡可以换几只鹅？`, a:`${k*m}只鹅`}; }
    function t4() { const n=2*ri(3,9); return {q:`${plus('△',2)}＝${n}，△等于多少？`, a:`△＝${n/2}`}; }
    function t5() { const n=3*ri(3,8); return {q:`${plus('○',3)}＝${n}，○等于多少？`, a:`○＝${n/3}`}; }
    function t6() { const s=3*ri(4,8), d=s/3; return {q:`□＋△＝${s}，且△＝${plus('□',2)}。求□和△各是多少。`, a:`□＝${d}，△＝${2*d}`}; }
    function t7() { const k=ri(2,3),m=ri(2,4),f=ri(2,3); return {q:`1条鱼可以换${k}只虾，1只虾可以换${m}只虫。${f}条鱼可以换几只虫？`, a:`${f*k*m}只虫`}; }
    function t8() { const k=ri(2,3),m=ri(2,3); return {q:`1个西瓜的重量等于${k}个哈密瓜，1个哈密瓜的重量等于${m}个苹果。1个西瓜等于几个苹果？`, a:`${k*m}个苹果`}; }
    function t9() { const q=[2,4,6][ri(0,2)], p=ri(2,4); return {q:`${plus('○',2)}＝${plus('△',q)}，${plus('△',p)}＝${plus('□',p)}。一个○等于几个□？`, a:`${q/2}个□`}; }
    function t10() { const k=ri(3,4),f=ri(2,3); return {q:`1只羊可以换${k}只兔。${f}只羊可以换几只兔？`, a:`${f*k}只兔`}; }
    const t = [t1,t2,t3,t4,t5,t6,t7,t8,t9,t10];
    shuffle(t); return t.slice(0, 10).map(f => f());
  }
  function gen5() {
    function t1() { const x=ri(6,9),d=ri(2,5); return {q:`小明今年${x}岁，哥哥比他大${d}岁。哥哥今年几岁？`, a:`哥哥今年${x+d}岁`}; }
    function t2() { const x=ri(30,40),y=ri(6,9); return {q:`爸爸今年${x}岁，小明今年${y}岁。爸爸比小明大几岁？5年后呢？`, a:`大${x-y}岁；5年后仍大${x-y}岁`}; }
    function t3() { const x=ri(9,12),y=ri(6,8); return {q:`姐姐今年${x}岁，妹妹今年${y}岁。两年后两人一共几岁？`, a:`${x+y+4}岁`}; }
    function t4() { const x=ri(28,36),y=ri(5,8); return {q:`妈妈今年${x}岁，女儿今年${y}岁。妈妈比女儿大几岁？`, a:`大${x-y}岁`}; }
    function t5() { const x=ri(8,10),d=ri(3,5); return {q:`小红今年${x}岁，她比弟弟大${d}岁。弟弟今年几岁？`, a:`弟弟今年${x-d}岁`}; }
    function t6() { const x=ri(55,65),y=ri(5,8); return {q:`爷爷今年${x}岁，孙子今年${y}岁。爷爷比孙子大几岁？20年后呢？`, a:`大${x-y}岁；20年后仍大${x-y}岁`}; }
    function t7() { const x=ri(5,7),t=ri(9,11),s=ri(t+1,t+6); return {q:`小明今年${x}岁。当他长到${t}岁时，姐姐正好${s}岁。姐姐今年几岁？`, a:`${s-(t-x)}岁`}; }
    function t8() { const x=ri(6,8),S=ri(18,24); return {q:`小华今年${x}岁。两年后，他和哥哥的年龄和是${S}岁。哥哥今年几岁？`, a:`${S-x-4}岁`}; }
    function t9() { const k=ri(3,4),m=ri(6,10); return {q:`妈妈和女儿的年龄差是${(k-1)*m}岁，妈妈的年龄是女儿的${k}倍。妈妈和女儿各几岁？`, a:`妈妈${k*m}岁，女儿${m}岁`}; }
    function t10() { const y=ri(4,6),z=ri(8,12); return {q:`爸爸今年${3*y+2*z}岁，儿子今年${y}岁。几年后爸爸的年龄是儿子的3倍？`, a:`${z}年后`}; }
    const t = [t1,t2,t3,t4,t5,t6,t7,t8,t9,t10];
    shuffle(t); return t.slice(0, 10).map(f => f());
  }
  function gen6() {
    function t1() { const d=ri(3,6),k=ri(4,6),L=d*k; return {q:`一条路长${L}米，从头到尾每隔${d}米种一棵树，一共种几棵树？`, a:`${k+1}棵`}; }
    function t2() { const d=ri(3,6),n=ri(7,10); return {q:`一条路每隔${d}米种一棵树，两端都种，一共种了${n}棵。这条路长多少米？`, a:`${(n-1)*d}米`}; }
    function t3() { const d=ri(5,10),k=ri(4,8),L=d*k; return {q:`一个圆形花坛一圈长${L}米，每隔${d}米种一棵树，一共种几棵树？`, a:`${k}棵`}; }
    function t4() { const d=ri(3,5),k=ri(4,6),L=d*k; return {q:`一条路长${L}米，每隔${d}米种一棵树，只在路的一端种，一共种几棵？`, a:`${k}棵`}; }
    function t5() { const m=ri(4,7); return {q:`一根木头要锯成${m}段，需要锯几次？`, a:`${m-1}次`}; }
    function t6() { const c=ri(2,5); return {q:`一根木头锯${c}次，能锯成几段？`, a:`${c+1}段`}; }
    function t7() { const I=ri(2,4),a=ri(3,4),b=ri(5,7); return {q:`时钟敲${a}下用${I*(a-1)}秒，敲${b}下用几秒？`, a:`${I*(b-1)}秒`}; }
    function t8() { const p=ri(3,5),a=ri(3,4),b=ri(5,7); return {q:`小明从1楼爬到${a}楼用了${p*(a-1)}分钟。照这样，他从1楼爬到${b}楼要用几分钟？`, a:`${p*(b-1)}分钟`}; }
    function t9() { const d=ri(8,10),k=ri(8,12),L=d*k; return {q:`一段公路长${L}米，从头到尾每隔${d}米栽一棵树，一共栽几棵？`, a:`${k+1}棵`}; }
    function t10() { const d=ri(4,8),k=ri(5,10),L=d*k; return {q:`一个圆形花坛一周长${L}米，每隔${d}米栽一棵树，一共栽几棵？`, a:`${k}棵`}; }
    const t = [t1,t2,t3,t4,t5,t6,t7,t8,t9,t10];
    shuffle(t); return t.slice(0, 10).map(f => f());
  }
  function gen7() {
    function t1() { const f=ri(3,6),b=ri(3,6); return {q:`同学们排队，小明前面有${f}人，后面有${b}人。这一队一共有几人？`, a:`${f+b+1}人`}; }
    function t2() { const r1=ri(4,8),r2=ri(4,8); return {q:`从前面数小明排第${r1}，从后面数小明排第${r2}。这一队一共有几人？`, a:`${r1+r2-1}人`}; }
    function t3() { const f=ri(3,5),b=ri(3,6); return {q:`小红前面有${f}人，后面有${b}人。一共有几人？`, a:`${f+b+1}人`}; }
    function t4() { const l=ri(3,6),r=ri(3,6); return {q:`从左边数小军排第${l}，从右边数小军排第${r}。一共有几人？`, a:`${l+r-1}人`}; }
    function t5() { const r=ri(6,9),b=ri(5,8); return {q:`小明从前往后数排第${r}，他后面还有${b}人。一共有几人？`, a:`${r+b}人`}; }
    function t6() { const T=ri(10,15),f=ri(3,T-2); return {q:`一队共${T}人，小明前面有${f}人，他后面有几人？`, a:`${T-f-1}人`}; }
    function t7() { const r=ri(6,8),b=ri(7,10); return {q:`从前往后数小丽排第${r}，她后面还有${b}人。一共有几人？`, a:`${r+b}人`}; }
    function t8() { const f=ri(2,5); return {q:`排队买票，小刚前面有${f}人，后面的人数是前面的2倍。一共有几人？`, a:`${3*f+1}人`}; }
    function t9() { const r1=ri(5,8),r2=ri(6,9); return {q:`从前面数小明排第${r1}，从后面数小明排第${r2}。一共有几人？`, a:`${r1+r2-1}人`}; }
    function t10() { const T=ri(10,14),r=ri(3,8); return {q:`${T}个小朋友排队，从前往后数小华排第${r}。从后往前数小华排第几？`, a:`第${T-r+1}个`}; }
    const t = [t1,t2,t3,t4,t5,t6,t7,t8,t9,t10];
    shuffle(t); return t.slice(0, 10).map(f => f());
  }
  function gen8() {
    function t1() { const big=ri(8,30),small=ri(4,20); if(small>=big)return t1(); return {q:`两个数的和是${big+small}，差是${big-small}。这两个数各是多少？`, a:`${big}和${small}`}; }
    function t2() { const big=ri(7,12),small=ri(3,9); if(small>=big)return t2(); return {q:`小明和小红一共有${big+small}个苹果，小明比小红多${big-small}个。两人各有多少个？`, a:`小明${big}个，小红${small}个`}; }
    function t3() { const big=ri(8,20),small=ri(3,15); if(small>=big)return t3(); return {q:`两个数的和是${big+small}，差是${big-small}。这两个数各是多少？`, a:`${big}和${small}`}; }
    function t4() { const big=ri(12,20),small=ri(4,15); if(small>=big)return t4(); return {q:`甲、乙两人一共有${big+small}元，甲比乙多${big-small}元。两人各有多少元？`, a:`甲${big}元，乙${small}元`}; }
    function t5() { const big=ri(8,11),small=ri(5,8); if(small>=big)return t5(); return {q:`兄弟俩年龄和是${big+small}岁，哥哥比弟弟大${big-small}岁。兄弟俩各几岁？`, a:`哥哥${big}岁，弟弟${small}岁`}; }
    function t6() { const big=ri(15,22),small=ri(8,18); if(small>=big)return t6(); return {q:`两筐苹果一共重${big+small}千克，第一筐比第二筐重${big-small}千克。两筐各重多少千克？`, a:`第一筐${big}千克，第二筐${small}千克`}; }
    function t7() { const big=ri(12,22),small=ri(3,18); if(small>=big)return t7(); return {q:`两个数的和是${big+small}，差是${big-small}。这两个数各是多少？`, a:`${big}和${small}`}; }
    function t8() { const big=ri(8,14),small=ri(3,10); if(small>=big)return t8(); return {q:`红花和黄花一共${big+small}朵，红花比黄花少${big-small}朵。红花、黄花各几朵？`, a:`红花${small}朵，黄花${big}朵`}; }
    function t9() { const big=ri(12,20),small=ri(5,16); if(small>=big)return t9(); return {q:`甲、乙两人一共有${big+small}本书，甲比乙多${big-small}本。两人各有多少本？`, a:`甲${big}本，乙${small}本`}; }
    function t10() { const big=ri(45,80),small=ri(10,45); if(small>=big)return t10(); return {q:`两个数的和是${big+small}，差是${big-small}。这两个数各是多少？`, a:`${big}和${small}`}; }
    const t = [t1,t2,t3,t4,t5,t6,t7,t8,t9,t10];
    shuffle(t); return t.slice(0, 10).map(f => f());
  }
  function gen9() {
    const res = [];
    for (let i = 0; i < 10; i++) {
      const r = ri(2,6), c = ri(3,8);
      res.push({q:`鸡兔同笼，共有${c+r}个头、${2*c+4*r}只脚。鸡和兔各几只？`, a:`鸡${c}只，兔${r}只`});
    }
    return res;
  }
  function gen10() {
    function rng(from,to,step){const a=[];for(let v=from;v<=to;v+=step)a.push(v);return a;}
    function s(a){return a.join('＋');}
    function t1() { const n=ri(8,12),a=rng(1,n,1); return {q:`计算：${s(a)}。`, a:`${n*(n+1)/2}`}; }
    function t2() { const n=ri(18,22),a=rng(1,n,1); return {q:`计算：${s(a)}。`, a:`${n*(n+1)/2}`}; }
    function t3() { const n=ri(5,8),a=rng(2,2*n,2); return {q:`计算：${s(a)}。`, a:`${n*(n+1)}`}; }
    function t4() { const n=ri(5,10),a=rng(1,2*n-1,2); return {q:`计算：${s(a)}。`, a:`${n*n}`}; }
    function t5() { const cnt=ri(4,6),a0=ri(90,99),arr=[]; for(let i=0;i<cnt;i++)arr.push(a0+i); return {q:`计算：${s(arr)}。`, a:`${(a0+(a0+cnt-1))*cnt/2}`}; }
    function t6() { const a=rng(1,20,1); return {q:`计算：${s(a)}。`, a:'210'}; }
    function t7() { const n=ri(4,7),a=rng(5,5*n,5); return {q:`计算：${s(a)}。`, a:`${5*n*(n+1)/2}`}; }
    function t8() { const n=ri(8,12); return {q:`计算：100－1－2－3－……－${n-1}－${n}。`, a:`${100-n*(n+1)/2}`}; }
    function t9() { const n=10,a=rng(1,2*n-1,2); return {q:`计算：${s(a)}。`, a:`${n*n}`}; }
    function t10() { const n=10,a=rng(2,2*n,2); return {q:`计算：${s(a)}。`, a:`${n*(n+1)}`}; }
    const t = [t1,t2,t3,t4,t5,t6,t7,t8,t9,t10];
    shuffle(t); return t.slice(0, 10).map(f => f());
  }
  function gen11() {
    function t1() { const g=ri(2,5),b=ri(5,12),a=b+2*g; return {q:`小明有${a}颗糖，小红有${b}颗。小明给小红几颗，两人的糖就一样多？`, a:`${g}颗`}; }
    function t2() { const g=ri(2,4),b=ri(3,10),a=b+2*g; return {q:`甲有${a}本书，乙有${b}本。甲给乙几本，两人的书就一样多？`, a:`${g}本`}; }
    function t3() { const g=ri(2,5),b=ri(6,14),a=b+2*g; return {q:`第一筐有${a}个苹果，第二筐有${b}个。从第一筐拿几个放到第二筐，两筐就一样多？`, a:`${g}个`}; }
    function t4() { const g=ri(2,5),b=ri(4,12),a=b+2*g; return {q:`哥哥有${a}元，弟弟有${b}元。哥哥给弟弟几元，两人的钱就一样多？`, a:`${g}元`}; }
    function t5() { const g=ri(2,5),b=ri(5,13),a=b+2*g; return {q:`红花${a}朵，黄花${b}朵。红花给黄花几朵，两种花就一样多？`, a:`${g}朵`}; }
    function t6() { const g=ri(2,5); return {q:`小明比小红多${2*g}张卡片。小明给小红几张，两人的卡片就一样多？`, a:`${g}张`}; }
    function t7() { const g=ri(1,3),T=ri(12,20); return {q:`甲、乙两人一共有${T}个橘子。甲给乙${g}个后，两人的橘子一样多。原来各有多少个？`, a:`甲${(T+2*g)/2}个，乙${(T-2*g)/2}个`}; }
    function t8() { const g=ri(2,5),b=ri(3,11),a=b+2*g; return {q:`小丽有${a}支铅笔，小军有${b}支。小丽给小军几支，两人的铅笔就一样多？`, a:`${g}支`}; }
    function t9() { const g=ri(2,4),b=ri(10,18),a=b+2*g; return {q:`大班有${a}人，小班有${b}人。从大班调几人到小班，两个班人数就一样多？`, a:`${g}人`}; }
    function t10() { const g=ri(2,5); return {q:`甲比乙多${2*g}个苹果。甲给乙几个后，两人的苹果就一样多？`, a:`${g}个`}; }
    const t = [t1,t2,t3,t4,t5,t6,t7,t8,t9,t10];
    shuffle(t); return t.slice(0, 10).map(f => f());
  }
  function gen12() {
    function C2(n){return n*(n-1)/2;}
    function t1() { const n=ri(4,7); return {q:`一条线段上有${n}个点（含两个端点），一共能数出几条线段？`, a:`${C2(n)}条`}; }
    function t2() { const r=ri(2,4); return {q:`从一个角的顶点出发，在角内画${r}条射线，一共组成几个角？`, a:`${C2(r+2)}个`}; }
    function t3() { const k=ri(1,3); return {q:`一个三角形，从顶点向对边画${k}条线段，图中一共有几个三角形？`, a:`${(k+1)*(k+2)/2}个`}; }
    function t4() { const m=ri(2,3); let sum=0; for(let i=1;i<=m;i++)sum+=i*i; return {q:`由${m}×${m}个小正方形组成的方格，一共有几个正方形？`, a:`${sum}个`}; }
    function t5() { const n=ri(5,7); return {q:`一条线段上有${n}个点，一共能数出几条线段？`, a:`${C2(n)}条`}; }
    function t6() { const k=ri(3,5); return {q:`由${k}个小正方形排成一行组成的长方形，一共有几个长方形？`, a:`${k*(k+1)/2}个`}; }
    function t7() { return {q:'一条线段上有6个点，一共能数出几条线段？', a:'15条'}; }
    function t8() { const k=ri(1,3); return {q:`一个三角形，从顶点向对边画${k}条线段（把底边分成${k+1}段），图中一共有几个三角形？`, a:`${(k+1)*(k+2)/2}个`}; }
    function t9() { const r=ri(2,4); return {q:`从一个角的顶点出发，在角内画${r}条射线，一共组成几个角？`, a:`${C2(r+2)}个`}; }
    function t10() { return {q:'由9个小正方形组成的3×3方格，一共有几个正方形？', a:'14个'}; }
    const t = [t1,t2,t3,t4,t5,t6,t7,t8,t9,t10];
    shuffle(t); return t.slice(0, 10).map(f => f());
  }

  const TYPES = [
    { id:'t1',  title:'找规律填数', badge:'一~二年级', intro:'观察数列中数与数之间的变化，找出规律后填写空缺的数。', gen:gen1 },
    { id:'t2',  title:'图形找规律', badge:'一~二年级', intro:'观察图形或符号的排列规律，找出空缺位置应填的内容。', gen:gen2 },
    { id:'t3',  title:'逻辑推理',   badge:'二~三年级', intro:'根据已知条件逐步排除、比较，推理出正确的结论。', gen:gen3 },
    { id:'t4',  title:'等量代换',   badge:'二~三年级', intro:'用相等的量互相替换，把复杂的数量关系转化成简单的数量关系。', gen:gen4 },
    { id:'t5',  title:'年龄问题',   badge:'二~三年级', intro:'牢记“两个人的年龄差永远不变”，随着时间同时增长。', gen:gen5 },
    { id:'t6',  title:'植树问题',   badge:'二~三年级', intro:'分清“两端都种、只种一端、首尾相连（封闭）”三种情况。', gen:gen6 },
    { id:'t7',  title:'排队问题',   badge:'一~二年级', intro:'数人数时注意“第几”和“前面有几人”的区别。', gen:gen7 },
    { id:'t8',  title:'和差问题',   badge:'三年级',   intro:'已知两个数的和与差：大数＝(和＋差)÷2，小数＝(和－差)÷2。', gen:gen8 },
    { id:'t9',  title:'鸡兔同笼',   badge:'三年级',   intro:'经典假设法：先假设全是鸡（或全是兔），再根据脚的差数求出另一种。', gen:gen9 },
    { id:'t10', title:'巧算速算',   badge:'二~三年级', intro:'利用凑整、配对、等差数列求和等技巧，让计算又快又准。', gen:gen10 },
    { id:'t11', title:'移多补少',   badge:'二~三年级', intro:'“给出一半，才能一样多”：多的比少的多的部分，拿出一半给对方。', gen:gen11 },
    { id:'t12', title:'数图形',     badge:'二~三年级', intro:'按顺序、按大小分类数，做到不重复、不遗漏。', gen:gen12 },
  ];

  /* ============ 错题本（思维小练） ============ */
  const WB_KEY = 'sxmath_wrongbook_v1';
  let wrongBook = loadWrongBook();
  function loadWrongBook() { try { const v = localStorage.getItem(pk(WB_KEY)); return v ? JSON.parse(v) : []; } catch (e) { return []; } }
  function saveWrongBook() { try { localStorage.setItem(pk(WB_KEY), JSON.stringify(wrongBook)); } catch (e) {} }
  function addWrong(typeId, i) {
    const p = findProblem(typeId, i);
    if (!p) return;
    if (wrongBook.some(w => w.typeId === typeId && w.q === p.q)) return;
    wrongBook.push({ id: 'wb' + Date.now() + Math.random().toString(36).slice(2, 7), typeId, typeTitle: p.title, q: p.q, a: p.a, time: new Date().toLocaleString() });
    saveWrongBook(); updateAddedMarks(); updateWrongBadge(); toast('已加入错题本');
  }
  function removeWrong(id) { wrongBook = wrongBook.filter(w => w.id !== id); saveWrongBook(); renderWrongBook(); updateAddedMarks(); updateWrongBadge(); }
  function clearWrongBook() {
    if (!wrongBook.length) { toast('错题本已经是空的'); return; }
    if (!confirm('确定要清空错题本吗？此操作不可撤销。')) return;
    wrongBook = []; saveWrongBook(); renderWrongBook(); updateAddedMarks(); updateWrongBadge(); toast('已清空错题本');
  }
  function exportWrong() {
    if (!wrongBook.length) { toast('错题本为空，无法导出'); return; }
    const data = JSON.stringify({ name: '我的错题本', exportedAt: new Date().toISOString(), items: wrongBook }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = '错题本.json';
    document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(a.href);
    toast('已导出错题本');
  }
  function importWrong(ev) {
    const file = ev.target.files && ev.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function () {
      try {
        const obj = JSON.parse(reader.result);
        const items = Array.isArray(obj) ? obj : (obj.items || []);
        if (!items.length) { toast('未找到可导入的题目'); return; }
        const merge = confirm('点“确定”=合并；点“取消”=覆盖。');
        const base = merge ? wrongBook.slice() : [];
        items.forEach(it => {
          if (!it || !it.q) return;
          const typeId = it.typeId || '';
          if (base.some(w => w.typeId === typeId && w.q === it.q)) return;
          base.push({ id: 'wb' + Date.now() + Math.random().toString(36).slice(2, 7), typeId, typeTitle: it.typeTitle || '', q: it.q, a: it.a || '', time: it.time || new Date().toLocaleString() });
        });
        wrongBook = base; saveWrongBook(); renderWrongBook(); updateAddedMarks(); updateWrongBadge(); toast('已导入 ' + items.length + ' 题');
      } catch (e) { toast('导入失败：文件格式不正确'); }
    };
    reader.readAsText(file); ev.target.value = '';
  }
  // 打印错题本：不弹新窗口（iPad 上弹窗会让人退不出来），直接在本页切换成打印视图
  function closePrintView() {
    document.body.classList.remove('printing-wb');
    const node = document.getElementById('wb-print');
    if (node) node.remove();
  }
  function printWrongBook() {
    if (!wrongBook.length) { toast('错题本为空'); return; }
    let html = '<h1>我的错题本</h1><p class="pmeta">共 ' + wrongBook.length + ' 题 · ' + new Date().toLocaleString() + '</p>';
    wrongBook.forEach(function (w, i) {
      html += '<div class="pitem"><div class="ptag">' + escapeHtml(w.typeTitle) + '</div>'
        + '<div class="pq">' + (i + 1) + '、' + escapeHtml(w.q) + '</div>'
        + '<div class="pa">答案：' + escapeHtml(w.a) + '</div></div>';
    });
    const old = document.getElementById('wb-print');
    if (old) old.remove();
    const box = document.createElement('div');
    box.id = 'wb-print';
    box.innerHTML = html;
    const back = document.createElement('button');
    back.id = 'wb-print-back';
    back.type = 'button';
    back.textContent = '← 返回错题本';
    back.addEventListener('click', closePrintView);
    box.insertBefore(back, box.firstChild);
    document.body.appendChild(box);
    document.body.classList.add('printing-wb');
    try { window.scrollTo(0, 0); } catch (e) {}
    const done = function () {
      window.removeEventListener('afterprint', done);
      closePrintView();
    };
    window.addEventListener('afterprint', done);
    setTimeout(function () { try { window.print(); } catch (e) {} }, 80);
  }
  // ===== 分步批改：逐行验算学生自己写的步骤，指出第几步不成立 =====
  // ===== AI 读草稿：把手写草稿图片交给视觉模型，直接指出错在哪一步 =====
  const AI_CFG_KEY = 'math_ai_cfg_v1';
  function aiCfg() { try { return JSON.parse(lsGet(AI_CFG_KEY) || '{}') || {}; } catch (e) { return {}; } }
  function saveAiCfg(c) { try { localStorage.setItem(pk(AI_CFG_KEY), JSON.stringify(c)); } catch (e) {} }
  function ensureAiModal() {
    let m = document.getElementById('ai-modal');
    if (m) return m;
    m = document.createElement('div');
    m.className = 'modal-backdrop';
    m.id = 'ai-modal';
    m.innerHTML = '<div class="modal-panel"><div class="modal-head"><h2>🤖 AI 设置（批改草稿 · 在线音色）</h2><button class="modal-close" type="button">✕</button></div>'
      + '<div style="padding:14px 20px 18px;">'
      + '<p class="intro">填一个「兼容 OpenAI 接口」的服务即可：<b>批改草稿</b>时会把这题的手写图片发给它；<b>磨耳朵的「在线音色」</b>也会用它合成语音（需要该服务支持 /v1/audio/speech）。地址和密钥只保存在这台设备里。</p>'
      + '<p class="intro" style="line-height:1.9;">常用地址（可直接复制）：<br>OpenAI：https://api.openai.com/v1/chat/completions<br>DeepSeek：https://api.deepseek.com/chat/completions<br>通义千问：https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions<br>智谱：https://open.bigmodel.cn/api/paas/v4/chat/completions<br>月之暗面：https://api.moonshot.cn/v1/chat/completions</p>'
      + '<label class="ai-field">接口地址<input id="ai-url" type="text" placeholder="https://api.openai.com/v1/chat/completions"></label>'
      + '<label class="ai-field">模型名称<input id="ai-model" type="text" placeholder="gpt-4o-mini"></label>'
      + '<label class="ai-field">API Key<input id="ai-key" type="password" placeholder="sk-..."></label>'
      + '<p class="intro" style="margin-top:14px;">云同步（Supabase，可选）：填上后每次数据变化会自动存到你的表里，换浏览器或重新发布都不丢。</p>'
      + '<label class="ai-field">Supabase 项目地址<input id="sb-url" type="text" placeholder="https://xxxx.supabase.co"></label>'
      + '<label class="ai-field">anon key<input id="sb-key" type="password" placeholder="eyJhbGciOi..."></label>'
      + '<label class="ai-field">表名<input id="sb-table" type="text" placeholder="elsa_kv"></label>'
      + '<div class="modal-foot" style="border-top:none;padding:4px 0 0;"><button class="primary" id="ai-save" type="button">保存</button> <button id="ai-test" type="button">测试连接</button> <button type="button" onclick="document.getElementById(\'ai-modal\').classList.remove(\'show\')">关闭</button></div>'
      + '<div id="ai-test-out" class="ai-result" style="display:none;"></div>'
      + '</div></div>';
    document.body.appendChild(m);
    m.querySelector('.modal-close').addEventListener('click', function () { m.classList.remove('show'); });
    m.addEventListener('click', function (e) { if (e.target === m) m.classList.remove('show'); });
    const sbFill = function () {
      const c = sbCfg();
      const f = function (id, v) { const el = m.querySelector('#' + id); if (el) el.value = v || ''; };
      f('sb-url', c.url); f('sb-key', c.key); f('sb-table', c.table || 'elsa_kv');
    };
    m.querySelector('#ai-save').addEventListener('click', function () {
      saveSbCfg({
        url: (m.querySelector('#sb-url') || {}).value || '',
        key: (m.querySelector('#sb-key') || {}).value || '',
        table: (m.querySelector('#sb-table') || {}).value || 'elsa_kv'
      });
      sbFill();
      if (sbReady()) { syncPush(true).then(function () { toast('äº‘åŒæ­¥å·²å¼€å¯'); }).catch(function (e) { toast('äº‘åŒæ­¥å¤±è´¥ï¼š' + e.message); }); }
    });
    sbFill();
    m.querySelector('#ai-save').addEventListener('click', function () {
      saveAiCfg({
        url: m.querySelector('#ai-url').value.trim(),
        model: m.querySelector('#ai-model').value.trim(),
        key: m.querySelector('#ai-key').value.trim()
      });
      m.classList.remove('show');
      toast('已保存，之后点「让 AI 读草稿」就能批改了');
    });
    m.querySelector('#ai-test').addEventListener('click', function () {
      const out = m.querySelector('#ai-test-out');
      const c = {
        url: m.querySelector('#ai-url').value.trim(),
        model: m.querySelector('#ai-model').value.trim(),
        key: m.querySelector('#ai-key').value.trim()
      };
      out.style.display = 'block';
      out.textContent = '⏳ 正在测试…';
      aiPost(c, [{ type: 'text', text: '仅回答：正常' }, { type: 'image_url', image_url: { url: (function () { const q = document.createElement('canvas'); q.width = 32; q.height = 32; const g = q.getContext('2d'); g.fillStyle = '#e02020'; g.fillRect(0, 0, 32, 32); return q.toDataURL('image/png'); })() } }]).then(function (t) {
        out.textContent = '✅ 连接正常，模型回复：' + t;
      }).catch(function (e) {
        out.textContent = '❌ ' + e.message + (/image|vision|content|400|model|multimodal/i.test(String(e.message)) ? '　👉 多半是这个模型不支持图片：请换成支持视觉的模型（如 gpt-4o-mini、qwen-vl-max、glm-4v、doubao-vision）。' : '');
      });
    });
    return m;
  }
  function openAiSettings() {
    const m = ensureAiModal(), c = aiCfg();
    m.querySelector('#ai-url').value = c.url || '';
    m.querySelector('#ai-model').value = c.model || '';
    m.querySelector('#ai-key').value = c.key || '';
    m.classList.add('show');
  }
  function cardAnswer(card) {
    const inp = card.querySelector('.sm-input');
    if (inp && inp.getAttribute('data-g') !== null) {
      const ks = shawnKeys[inp.getAttribute('data-g')] || [];
      const k = ks[+inp.getAttribute('data-i')];
      if (k !== undefined) return String(Array.isArray(k) ? k[0] : k);
    }
    const ci = card.querySelector('.ans-input');
    if (ci && ci.getAttribute('data-type') !== null) {
      const t = ci.getAttribute('data-type'), ii = +ci.getAttribute('data-i');
      const prob = currentCalc[t] && currentCalc[t][ii];
      if (prob) return String((prob.key && prob.key.length) ? prob.key[0] : prob.ans);
    }
    const rev = card.querySelector('.reveal');
    if (rev) { const mm = rev.textContent.match(/答案：([\s\S]*?)(解析：|$)/); if (mm) return mm[1].trim(); }
    return '';
  }
  // 统一请求：把 HTTP 状态和接口返回的原始错误显示出来，便于排查
  function aiEndpoint(u) {
    let url = (u || 'https://api.openai.com/v1/chat/completions').trim().replace(/\/+$/, '');
    if (/\/chat\/completions$/.test(url)) return url;
    if (/\/v\d+$/.test(url)) return url + '/chat/completions';
    if (/^https?:\/\/[^\/]+$/.test(url)) return url + '/v1/chat/completions';
    return url + '/chat/completions';
  }
  function aiPost(cfg, content) {
    const url = aiEndpoint(cfg.url);
    const body = { model: cfg.model || 'gpt-4o-mini', max_tokens: 3000, enable_thinking: false, thinking: { type: 'disabled' }, messages: [{ role: 'user', content: content }] };
    return fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + cfg.key },
      body: JSON.stringify(body)
    }).catch(function (e) {
      throw new Error('连不上接口（' + (e && e.name ? e.name : 'network') + '）。常见原因：接口地址写错、没联网，或者该服务不允许网页直接调用（CORS）。地址：' + url);
    }).then(function (res) {
      return res.text().then(function (raw) {
        let data = null;
        try { data = JSON.parse(raw); } catch (e) {}
        if (!res.ok) {
          let msg = '';
          if (data && data.error) msg = data.error.message || JSON.stringify(data.error);
          else msg = raw.slice(0, 200);
          throw new Error('接口返回 HTTP ' + res.status + '：' + msg + '（请求地址：' + url + '）');
        }
        let t = '';
        try {
          const msg = data.choices[0].message || {};
          t = msg.content || '';
          if (!t && msg.reasoning_content) t = String(msg.reasoning_content).replace(/[ã€‚ï¼ï¼Ÿ!?]\s*$/, '').slice(-220);
        } catch (e) {}
        if (!t) throw new Error('返回内容无法解析：' + raw.slice(0, 200));
        return String(t).trim();
      });
    });
  }
  // 草稿图片很大，先缩到宽 1000 以内再上传，避免请求过大被拒
  function shrinkCanvas(cv) {
    const maxW = 1000;
    const w = cv.width, h = cv.height;
    if (w <= maxW) return cv.toDataURL('image/png');
    const scale = maxW / w;
    const c2 = document.createElement('canvas');
    c2.width = Math.round(w * scale);
    c2.height = Math.round(h * scale);
    const g = c2.getContext('2d');
    g.fillStyle = '#ffffff';
    g.fillRect(0, 0, c2.width, c2.height);
    g.drawImage(cv, 0, 0, c2.width, c2.height);
    return c2.toDataURL('image/jpeg', 0.85);
  }
  function analyzeDraft(btn, done) {
    const card = btn.closest('.calc-item') || btn.closest('.vcol');
    if (!card) return;
    const cv = card.querySelector('canvas.scratch');
    const cfg = aiCfg();
    if (!cfg.key) { openAiSettings(); toast('请先填写接口地址与 API Key'); return; }
    if (!cv || !cv._inked) { toast('这一格还没有草稿：先在草稿区写过程，再点我'); return; }
    const qEl = card.querySelector('.q');
    const q = qEl ? (qEl.getAttribute('data-q') || qEl.textContent.replace(/^\d+、\s*/, '')) : '';
    const ans = cardAnswer(card);
    const stu = studentAnswer(card);
    const out = aiResultBox(card, '🤖 正在读你的草稿…');
    btn.disabled = true;
    let img = '';
    try { img = shrinkCanvas(cv); } catch (e) { img = ''; }
    if (!img) { out.textContent = '🤖 这一格草稿读取失败，请重新写一下再试'; btn.disabled = false; if (done) done(); return; }
    aiPost(cfg, [
      { type: 'text', text: draftPrompt(q, ans, stu) },
      { type: 'image_url', image_url: { url: img } }
    ]).then(function (t) {
      out.textContent = '🤖 ' + aiTidy(t);
    }).catch(function (e) {
      out.textContent = '🤖 出错：' + aiErr(e);
    }).then(function () { btn.disabled = false; if (done) done(); });
  }
  // 只看题目和学生的答案，让 AI 讲一遍（不需要草稿、不需要视觉模型）
  function analyzeQuestion(btn) {
    const card = btn.closest('.calc-item') || btn.closest('.vcol');
    if (!card) return;
    const cfg = aiCfg();
    if (!cfg.key) { openAiSettings(); toast('请先填写接口地址与 API Key'); return; }
    const qEl = card.querySelector('.q');
    const q = qEl ? (qEl.getAttribute('data-q') || qEl.textContent.replace(/^\d+、\s*/, '')) : '';
    const ans = cardAnswer(card);
    const stu = studentAnswer(card);
    const out = aiResultBox(card, '🤖 正在讲这题…');
    btn.disabled = true;
    aiPost(cfg, [{ type: 'text', text: explainPrompt(q, ans, stu) }]).then(function (t) {
      out.textContent = '🤖 ' + aiTidy(t);
    }).catch(function (e) {
      out.textContent = '🤖 出错：' + aiErr(e);
    }).then(function () { btn.disabled = false; });
  }

  // 一键读完这一组所有有草稿的题目
  function analyzeSectionDrafts(prefix, tid) {
    const gid = prefix + '-' + tid;
    const cards = Array.prototype.slice.call(document.querySelectorAll('.calc-item[data-gi^="' + gid + '-"]'));
    const targets = cards.filter(function (c) {
      const cv = c.querySelector('canvas.scratch');
      return !!(cv && cv._inked);
    });
    if (!targets.length) { toast('这一组还没有草稿：先在草稿区写过程，再点我'); return; }
    const cfg = aiCfg();
    if (!cfg.key) { openAiSettings(); toast('请先填写接口地址与 API Key'); return; }
    toast('正在逐题读草稿，共 ' + targets.length + ' 题…');
    let i = 0;
    (function next() {
      if (i >= targets.length) { toast('这组草稿批改完成'); return; }
      const card = targets[i++];
      let btn = card.querySelector('.ai-draft');
      if (!btn) {
        btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'ai-draft';
        btn.textContent = '🔍 让 AI 读我的草稿，指出错在哪一步';
        (card.querySelector('.calc-main') || card).appendChild(btn);
      }
      analyzeDraft(btn, next);
    })();
  }
  document.addEventListener('click', function (e) {
    if (!e.target.closest) return;
    const x = e.target.closest('.ai-explain');
    if (x) { e.preventDefault(); analyzeQuestion(x); return; }
    const b = e.target.closest('.ai-draft');
    if (b) { e.preventDefault(); analyzeDraft(b); return; }
    const s = e.target.closest('.ai-settings-btn');
    if (s) { e.preventDefault(); openAiSettings(); }
  });
  function normMathStr(s) {
    return String(s)
      .replace(/[０-９]/g, function (c) { return String.fromCharCode(c.charCodeAt(0) - 0xFEE0); })
      .replace(/＋/g, '+').replace(/[－—−–ー]/g, '-')
      .replace(/[×✕✖＊]/g, '*').replace(/[÷／⁄∕]/g, '/')
      .replace(/（/g, '(').replace(/）/g, ')')
      .replace(/[．。]/g, '.').replace(/＝/g, '=')
      .trim();
  }
  // 四则运算求值：支持整数、小数、分数 4/75、带分数 40 4/75、括号；无法识别返回 null
  function evalMath(src) {
    const s = normMathStr(src).replace(/\s+/g, ' ').trim();
    if (!s) return null;
    let pos = 0;
    function skip() { while (s[pos] === ' ') pos++; }
    function parseNumAt() {
      skip();
      let d = '';
      while (/[0-9]/.test(s[pos] || '')) { d += s[pos]; pos++; }
      if (s[pos] === '.') { d += '.'; pos++; while (/[0-9]/.test(s[pos] || '')) { d += s[pos]; pos++; } }
      if (d) {
        const base = Number(d);
        const save = pos;
        skip();
        let e = '';
        while (/[0-9]/.test(s[pos] || '')) { e += s[pos]; pos++; }
        if (e && s[pos] === '/') {
          pos++;
          let f = '';
          while (/[0-9]/.test(s[pos] || '')) { f += s[pos]; pos++; }
          if (f && Number(f) !== 0) return base + Number(e) / Number(f);
        }
        pos = save;
        return base;
      }
      if (s[pos] === '(') { pos++; const v = expr(); skip(); if (s[pos] === ')') pos++; return v; }
      if (s[pos] === '-') { pos++; const v = parseNumAt(); return v === null ? null : -v; }
      return null;
    }
    function term() {
      let v = parseNumAt();
      if (v === null) return null;
      for (;;) {
        skip();
        const op = s[pos];
        if (op === '*' || op === '/') {
          pos++;
          const r = parseNumAt();
          if (r === null) return null;
          if (op === '*') v = v * r; else { if (r === 0) return null; v = v / r; }
        } else return v;
      }
    }
    function expr() {
      let v = term();
      if (v === null) return null;
      for (;;) {
        skip();
        const op = s[pos];
        if (op === '+' || op === '-') { pos++; const r = term(); if (r === null) return null; v = (op === '+') ? v + r : v - r; }
        else return v;
      }
    }
    const res = expr();
    skip();
    if (res === null || pos !== s.length) return null;
    return res;
  }
  function fmtStepNum(n) {
    const v = Math.round(n * 10000) / 10000;
    return Object.is(v, -0) ? '0' : String(v);
  }
  function checkStepText(text) {
    const lines = String(text).split(/\r?\n/).map(function (x) { return x.trim(); }).filter(function (x) { return x.length > 0; });
    if (!lines.length) return null;
    let last = null;
    for (let i = 0; i < lines.length; i++) {
      const parts = lines[i].split('=');
      const vals = [];
      let bad = false;
      for (let j = 0; j < parts.length; j++) {
        if (!parts[j].trim()) { bad = true; break; }
        const v = evalMath(parts[j]);
        if (v === null) { bad = true; break; }
        vals.push(v);
      }
      if (bad) return { bad: 'unparsed', line: i + 1, text: lines[i] };
      for (let k = 1; k < vals.length; k++) {
        if (Math.abs(vals[k] - vals[k - 1]) > 0.01) {
          return { bad: 'notEqual', line: i + 1, text: lines[i], left: vals[k - 1], right: vals[k] };
        }
      }
      last = vals[vals.length - 1];
    }
    return { bad: 'ok', last: last };
  }
  function stepVerdictHTML(card) {
    const generic = '<span class="exp">✍️ 点「🔍 AI 读草稿指错步」，我可以直接告诉你是第几步、错在哪里。</span>';
    const ta = card.querySelector('.step-input');
    if (!ta || !ta.value.trim()) return generic;
    const res = checkStepText(ta.value);
    if (!res) return generic;
    const rev = card.querySelector('.reveal');
    let ansVal = null;
    const smInp = card.querySelector('.sm-input');
    if (smInp) {
      const gid = smInp.getAttribute('data-g'), ii = +smInp.getAttribute('data-i');
      const ks = shawnKeys[gid] || [];
      if (ks[ii] !== undefined) ansVal = parseNum(String(Array.isArray(ks[ii]) ? ks[ii][0] : ks[ii]));
    } else {
      const ci = card.querySelector('.ans-input');
      if (ci) {
        const tid = ci.getAttribute('data-type'), ii = +ci.getAttribute('data-i');
        const prob = currentCalc[tid] && currentCalc[tid][ii];
        if (prob) ansVal = parseNum(String(prob.key && prob.key.length ? prob.key[0] : prob.ans));
      }
    }
    if (res.bad === 'unparsed') {
      return '<span class="exp ai-bad">❌ 第 ' + res.line + ' 步我没读懂：「' + escapeHtml(res.text) + '」。请写成 40 4/75 = 3004/75 这样的算式（一行一步）。</span>';
    }
    if (res.bad === 'notEqual') {
      return '<span class="exp ai-bad">❌ 你的第 ' + res.line + ' 步就是出错的地方：「' + escapeHtml(res.text) + '」不成立——这一步左边算出来是 ' + fmtStepNum(res.left) + '，而你写成了 ' + fmtStepNum(res.right) + '。请重算这一步。</span>';
    }
    if (ansVal !== null && Math.abs(res.last - ansVal) > 0.01) {
      return '<span class="exp ai-bad">✅ 你的每一步都能算通，但最后结果 ' + fmtStepNum(res.last) + ' 与正确答案 ' + fmtStepNum(ansVal) + ' 不符：检查是否抄错数字或漏了一步。</span>';
    }
    return '<span class="exp ai-ok">✅ 你的每一步都验算通过了，步骤没有问题。</span>';
  }
  // è‹±æ–‡/ä¸­æ–‡ç­”æ¡ˆæ”¯æŒâ€œä¸€å¯¹å¤šâ€ï¼šç”¨ / ; ã€ æˆ– or åˆ†éš”çš„ä»»ä¸€å†™æ³•éƒ½ç®—å¯¹ï¼ˆè¦†ç›–ä¸Šé¢çš„åŒåå‡½æ•°ï¼‰
  function gradeText(input, ans) {
    const norm = function (x) { return String(x).toLowerCase().replace(/[\s'-.,!?;:]/g, ''); };
    const b = norm(input).replace(/[\u3000-\u303f\uff00-\uffef]/g, '');
    if (!b) return false;
    const variants = String(ans).split(/[\/;ã€]|\bor\b/i).map(function (x) { return norm(x).replace(/[\u3000-\u303f\uff00-\uffef]/g, ''); }).filter(function (x) { return x !== ''; });
    if (!variants.length) return false;
    if (variants.length === 1) return variants[0] === b;
    return variants.some(function (v) { return v === b; });
  }  function openWrongBook() { document.getElementById('wb-modal').classList.add('show'); renderWrongBook(); }
  function closeWrongBook() { document.getElementById('wb-modal').classList.remove('show'); }
  function renderWrongBook() {
    const list = document.getElementById('wb-list');
    const count = document.getElementById('wb-count');
    count.textContent = wrongBook.length ? '（共 ' + wrongBook.length + ' 题）' : '';
    if (!wrongBook.length) { list.innerHTML = '<p class="wb-empty">还没有错题。做题时点每题右侧的「＋错题本」即可收藏。</p>'; return; }
    let html = '';
    wrongBook.forEach(w => {
      html += '<div class="wb-item" data-id="' + w.id + '">'
        + '<div class="wb-item-top"><span class="wb-type">' + escapeHtml(w.typeTitle) + '</span><span class="wb-time">' + escapeHtml(w.time) + '</span>'
        + '<button class="wb-del" onclick="removeWrong(\'' + w.id + '\')">删除</button></div>'
        + '<div class="wb-q">' + escapeHtml(w.q) + '</div>'
        + '<details class="wb-a"><summary>答案</summary><div>' + escapeHtml(w.a) + '</div></details></div>';
    });
    list.innerHTML = html;
  }
  function updateWrongBadge() { document.querySelectorAll('.wb-badge').forEach(function (b) { b.textContent = wrongBook.length; }); }
  function updateAddedMarks() {
    document.querySelectorAll('.add-wrong').forEach(btn => {
      const typeId = btn.getAttribute('data-type');
      const i = +btn.getAttribute('data-i');
      const p = findProblem(typeId, i);
      if (!p) return;
      const exists = wrongBook.some(w => w.typeId === typeId && w.q === p.q);
      btn.textContent = exists ? '已收录' : '＋错题本';
      btn.classList.toggle('added', exists);
    });
  }

  /* ============ 打卡 & 星星 ============ */
  const PTS_KEY = 'math_points_v1';
  const NAME_KEY = 'math_child_name_v1';
  let practiceStart = Date.now();
  let stats = loadStats();
  function todayKey() { const d = new Date(); return dateKey(d); }
  function dateKey(d) { return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
  function loadStats() { try { const v = localStorage.getItem(pk(PTS_KEY)); const d = v ? JSON.parse(v) : {}; return { points: d.points || 0, diamonds: d.diamonds || 0, bestAvg: (typeof d.bestAvg === 'number') ? d.bestAvg : null, days: d.days || {} }; } catch (e) { return { points: 0, diamonds: 0, bestAvg: null, days: {} }; } }
  function saveStats() { try { localStorage.setItem(pk(PTS_KEY), JSON.stringify(stats)); } catch (e) {} }
  function isPracticed(key) { const r = stats.days[key]; return !!(r && (r.checkin || (r.modules && Object.keys(r.modules).length))); }
  function computeStreak() {
    let d = new Date();
    if (!isPracticed(dateKey(d))) d.setDate(d.getDate() - 1);
    let n = 0;
    while (isPracticed(dateKey(d))) { n++; d.setDate(d.getDate() - 1); }
    return n;
  }
  function childName() { try { return localStorage.getItem(pk(NAME_KEY)) || curProfile().name; } catch (e) { return '小朋友'; } }
  function setName() {
    const cur = childName();
    const n = prompt('小朋友叫什么名字呀？', cur);
    if (!n || !n.trim()) return;
    try { localStorage.setItem(pk(NAME_KEY), n.trim()); } catch (e) {}
    setText('child-name', n.trim());
  }
  function gardenStage(points) {
    const stages = [
      { min: 0,   emoji: '🌱', tip: '小嫩芽探出头啦', next: 30 },
      { min: 30,  emoji: '🌿', tip: '嫩芽正在长大', next: 80 },
      { min: 80,  emoji: '🪴', tip: '小苗茁壮成长', next: 160 },
      { min: 160, emoji: '🌷', tip: '开出了第一朵花', next: 300 },
      { min: 300, emoji: '🌳', tip: '花园枝繁叶茂', next: null },
    ];
    let i = 0;
    for (let k = 0; k < stages.length; k++) { if (points >= stages[k].min) i = k; }
    const cur = stages[i];
    let pct = 100;
    if (cur.next !== null) pct = Math.max(0, Math.min(100, Math.round((points - cur.min) / (cur.next - cur.min) * 100)));
    return { emoji: cur.emoji, tip: cur.tip, pct: pct };
  }
  function setText(id, v) { const el = document.getElementById(id); if (el) el.textContent = v; }
  function dayRecord() {
    const tk = todayKey();
    if (!stats.days[tk]) stats.days[tk] = { correct: 0, total: 0, seconds: 0, avg: null, acc: 0, earned: 0, modules: {}, checkin: false };
    return stats.days[tk];
  }
  function moduleDone(id) { const r = stats.days[todayKey()]; return !!(r && r.modules && r.modules[id]); }
  function accBonus(acc) { if (acc >= 0.9) return 10; if (acc >= 0.8) return 6; if (acc >= 0.7) return 3; return 0; }
  function completeModule(id, title, bonusPts, note) {
    if (moduleDone(id)) { toast(title + ' 今天已经完成，不再重复加分'); return false; }
    const rec = dayRecord();
    let pts = 10 + (bonusPts || 0);
    const parts = note ? [note] : [];
    if (!rec.checkin) {
      const streakNow = computeStreak() + 1;
      rec.checkin = true;
      const streakPts = Math.min((streakNow - 1) * 2, 20);
      pts += 10 + streakPts;
      parts.push('首次打卡+10');
      if (streakPts) parts.push('连续+' + streakPts);
      if (streakNow % 7 === 0) { stats.diamonds += 1; parts.push('满7天+1💎'); }
    }
    rec.modules[id] = true;
    stats.points += pts;
    rec.earned += pts;
    saveStats();
    updatePointsUI();
    toast('完成「' + title + '」 +' + pts + '⭐' + (parts.length ? '（' + parts.join('、') + '）' : ''));
    return true;
  }
  function recordPractice(correct, total, seconds) {
    const acc = total > 0 ? correct / total : 0;
    const avg = total > 0 ? Math.round(seconds / total) : null;
    let speedPts = 0;
    if (avg !== null) {
      if (stats.bestAvg === null) { stats.bestAvg = avg; }
      else if (avg < stats.bestAvg) { speedPts = 5; stats.bestAvg = avg; }
    }
    const rec = dayRecord();
    rec.correct = correct; rec.total = total; rec.seconds = Math.round(seconds); rec.avg = avg; rec.acc = Math.round(acc * 100);
    const ab = accBonus(acc);
    completeModule('calc', '计算小练', ab + speedPts, '正确率+' + ab + (speedPts ? '、提速+' + speedPts : ''));
    saveStats();
  }
  function updatePointsUI() {
    const tk = todayKey();
    const streak = computeStreak();
    const todayRec = stats.days[tk];
    setText('child-name', childName());
    setText('pts-total', stats.points);
    setText('pts-diamond', stats.diamonds);
    setText('pts-today-earn', todayRec ? todayRec.earned : 0);
    setText('pts-streak', streak);
    setText('pts-today', todayRec ? '今日：已打卡 ✓' : '今日：未打卡');
    const g = gardenStage(stats.points);
    setText('garden-plant', g.emoji);
    setText('garden-tip', g.tip);
    const fill = document.getElementById('garden-fill'); if (fill) fill.style.width = g.pct + '%';
    setText('garden-pct', g.pct + '%');
    setText('garden-gifts', stats.diamonds);
    const goals = curProfile().modules.filter(function (mm) { return mm.goal; }).map(function (mm) {
      return { label: mm.title, done: moduleDone(mm.id) };
    });
    const list = document.getElementById('goal-list');
    if (list) list.innerHTML = goals.map(g => '<li class="' + (g.done ? 'done' : '') + '"><span class="tick">' + (g.done ? '✓' : '') + '</span>' + g.label + '</li>').join('');
    setText('goal-progress', goals.filter(g => g.done).length + '/' + goals.length);
  }
  function openPoints() { renderPoints(); document.getElementById('pts-modal').classList.add('show'); }
  function closePoints() { document.getElementById('pts-modal').classList.remove('show'); }
  function renderPoints() {
    const t = document.getElementById('pts-m-total'); if (t) t.textContent = stats.points;
    const dm = document.getElementById('pts-m-diamond'); if (dm) dm.textContent = stats.diamonds;
    const s = document.getElementById('pts-m-streak'); if (s) s.textContent = computeStreak();
    const b = document.getElementById('pts-m-best'); if (b) b.textContent = stats.bestAvg !== null ? (stats.bestAvg + '秒') : '—';
    const h = document.getElementById('pts-history');
    const keys = Object.keys(stats.days).sort().slice(-7).reverse();
    if (!keys.length) { h.innerHTML = '<p class="wb-empty">还没有记录，完成一次练习批改即可打卡。</p>'; return; }
    let html = '<table class="pts-table"><tr><th>日期</th><th>题数</th><th>正确率</th><th>用时</th><th>星星</th></tr>';
    keys.forEach(k => { const r = stats.days[k]; html += '<tr><td>' + k + '</td><td>' + r.correct + '/' + r.total + '</td><td>' + (r.acc || 0) + '%</td><td>' + (r.seconds || 0) + '秒</td><td>+' + r.earned + '</td></tr>'; });
    html += '</table>';
    h.innerHTML = html;
  }
  function resetPoints() {
    if (!confirm('确定要重置全部星星、钻石和打卡记录吗？此操作不可撤销。')) return;
    stats = { points: 0, diamonds: 0, bestAvg: null, days: {} };
    saveStats();
    updatePointsUI();
    renderPoints();
    toast('已重置');
  }

  /* ============ 功能模块 & 计时 ============ */
  const TASKS = [
    { id: 'read', icon: '📖', title: '阅读', target: '15 分钟', kind: 'timer', minutes: 15 },
    { id: 'sport', icon: '🏃', title: '运动', target: '30 分钟', kind: 'timer', minutes: 30 },
    { id: 'chore', icon: '🧹', title: '做家务', target: '整理房间', kind: 'check' },
  ];
  const timers = {};
  function fmtTime(s) { const m = Math.floor(s / 60); return String(m).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0'); }
  /* ============ 阅读记录 ============ */
  const READ_KEY = 'math_read_log_v1';
  let readLog = loadReadLog();
  function loadReadLog() { try { const v = localStorage.getItem(pk(READ_KEY)); return v ? JSON.parse(v) : []; } catch (e) { return []; } }
  function saveReadLog() { try { localStorage.setItem(pk(READ_KEY), JSON.stringify(readLog)); } catch (e) {} }
  function initReadDate() { const el = document.getElementById('read-date'); if (el && !el.value) el.value = todayKey(); }
  function saveRead() {
    const book = (document.getElementById('read-book').value || '').trim();
    const page = (document.getElementById('read-page').value || '').trim();
    const min = parseInt(document.getElementById('read-min').value, 10) || 0;
    const date = document.getElementById('read-date').value || todayKey();
    if (!book && !page) { toast('请至少填写书名或页码'); return; }
    readLog.push({ id: 'r' + Date.now(), date: date, book: book || '未命名', page: page || '—', minutes: min });
    saveReadLog();
    document.getElementById('read-book').value = '';
    document.getElementById('read-page').value = '';
    renderReadLog();
    if (min >= 15) completeModule('read', '阅读', 0, '阅读' + min + '分钟');
    toast('已保存阅读记录');
  }
  function renderReadLog() {
    const el = document.getElementById('read-log');
    if (!el) return;
    const list = readLog.slice().sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 30);
    if (!list.length) { el.innerHTML = '<p class="log-empty">还没有阅读记录，去记录第一本书吧～</p>'; return; }
    const totalMin = readLog.reduce((s, r) => s + (r.minutes || 0), 0);
    let html = '<div class="log-stat">已读 <b>' + readLog.length + '</b> 次 · 累计 <b>' + totalMin + '</b> 分钟</div>';
    html += list.map(r => '<div class="log-item"><div class="log-date">' + escapeHtml(r.date) + '</div><div class="log-body"><div class="log-book">' + escapeHtml(r.book) + '</div><div class="log-meta">读到 ' + escapeHtml(r.page) + ' 页 · ' + r.minutes + ' 分钟</div></div></div>').join('');
    el.innerHTML = html;
  }

  /* ============ 做家务 ============ */
  const CHORES = ['整理书桌', '整理房间', '叠衣服', '扫地', '擦桌子', '洗碗'];
  function renderChores() {
    const el = document.getElementById('chore-list');
    if (!el) return;
    const done = moduleDone('chore');
    el.innerHTML = CHORES.map(c => '<button class="chore-item' + (done ? ' done' : '') + '" onclick="doChore(\'' + c + '\')">' + (done ? '✓ ' : '') + c + '</button>').join('');
  }
  function doChore(name) {
    completeModule('chore', '做家务', 0, name);
    renderChores();
  }

  /* ============ 日历 ============ */
  const MODULE_COLORS = { read: '#4f9cf7', sport: '#43b96a', chore: '#f0a13a', calc: '#f39bbd', think: '#9b7ede', listen: '#7c6cf0', paper: '#d9a441' };
  function renderCalendar() {
    const el = document.getElementById('calendar');
    if (!el) return;
    const now = new Date();
    const y = now.getFullYear(), m = now.getMonth();
    const startWeekday = new Date(y, m, 1).getDay();
    const daysInMonth = new Date(y, m + 1, 0).getDate();
    let html = '<div class="cal-head">' + y + ' 年 ' + (m + 1) + ' 月</div><div class="cal-grid cal-week">';
    ['日', '一', '二', '三', '四', '五', '六'].forEach(w => { html += '<div class="cal-wd">' + w + '</div>'; });
    html += '</div><div class="cal-grid">';
    for (let i = 0; i < startWeekday; i++) html += '<div class="cal-day empty"></div>';
    const pcolors = curProfile().colors;
    for (let d = 1; d <= daysInMonth; d++) {
      const key = dateKey(new Date(y, m, d));
      const rec = stats.days[key];
      const mods = rec && rec.modules ? rec.modules : {};
      const doneKeys = Object.keys(mods).filter(k => mods[k]);
      let dots = '';
      Object.keys(pcolors).forEach(mid => { if (mods[mid]) dots += '<i class="dot" style="background:' + pcolors[mid] + '"></i>'; });
      const cls = 'cal-day' + (d === now.getDate() ? ' today' : '') + (doneKeys.length === 0 ? ' missed' : '');
      html += '<div class="' + cls + '"><span class="cal-num">' + d + '</span><div class="cal-dots">' + dots + '</div></div>';
    }
    const plabels = {};
    curProfile().modules.forEach(function (mm) { plabels[mm.id] = mm.title; });
    html += '</div><div class="cal-legend">' + Object.keys(pcolors).map(function (k) { return '<span class="lg"><i class="dot" style="background:' + pcolors[k] + '"></i>' + (plabels[k] || k) + '</span>'; }).join('') + '</div>';
    el.innerHTML = html;
  }
  function startTimer(id) {
    const t = TASKS.find(x => x.id === id);
    if (!t || timers[id]) return;
    timers[id] = { remaining: t.minutes * 60 };
    timers[id].interval = setInterval(function () {
      timers[id].remaining--;
      const el = document.querySelector('.task-timer[data-timer="' + id + '"]');
      if (el) el.textContent = fmtTime(timers[id].remaining);
      if (timers[id].remaining <= 0) {
        clearInterval(timers[id].interval);
        delete timers[id];
        completeModule(id, t.title, 0, '');
      }
    }, 1000);
  }
  function resetTimer(id) {
    if (timers[id]) { clearInterval(timers[id].interval); delete timers[id]; }
    const t = TASKS.find(x => x.id === id);
    const el = document.querySelector('.task-timer[data-timer="' + id + '"]');
    if (el && t) el.textContent = fmtTime(t.minutes * 60);
  }

  /* ============ 全屏 ============ */
  function toggleFullscreen() {
    const el = document.documentElement;
    const isFs = document.fullscreenElement || document.webkitFullscreenElement;
    if (isFs) {
      const ex = document.exitFullscreen || document.webkitExitFullscreen;
      if (ex) try { ex.call(document); } catch (e) {}
    } else {
      const req = el.requestFullscreen || el.webkitRequestFullscreen;
      if (!req) { toast('这个浏览器不支持全屏，可用“添加到主屏幕”获得全屏体验'); return; }
      try {
        const p = req.call(el, { navigationUI: 'hide' });
        if (p && p.catch) p.catch(function () {});
      } catch (e) { try { req.call(el); } catch (e2) {} }
    }
  }
  function onFullscreenChange() {
    const on = !!(document.fullscreenElement || document.webkitFullscreenElement);
    document.body.classList.toggle('fs-full', on);
    const b = document.getElementById('fs-btn');
    if (b) b.textContent = on ? '🗗' : '⛶';
  }
  document.addEventListener('fullscreenchange', onFullscreenChange);
  document.addEventListener('webkitfullscreenchange', onFullscreenChange);

  /* ============ 思维题批改 ============ */
  const thinkKeys = {};
  const SYMBOLS = ['○', '△', '□', '●', '★', '☆', '▲', '▼', '■', '黑', '白', '大', '小', '上', '下', '右', '左', '前', '后'];
  function permutations(arr) {
    if (arr.length <= 1) return [arr.slice()];
    const out = [];
    for (let i = 0; i < arr.length; i++) {
      const rest = arr.slice(0, i).concat(arr.slice(i + 1));
      permutations(rest).forEach(function (p) { out.push([arr[i]].concat(p)); });
    }
    return out;
  }
  function makeOptions(q, a) {
    const correct = String(a).replace(/（.*$/, '').trim();
    const opts = [correct];
    const parts = correct.split(/[、,，]/).map(function (s) { return s.trim(); }).filter(Boolean);
    // 答案由多个元素组成（如颜色顺序）→ 用它的排列做干扰项
    if (parts.length > 1) {
      const perms = permutations(parts);
      for (let k = 0; k < perms.length && opts.length < 3; k++) {
        const s = perms[k].join('、');
        if (opts.indexOf(s) === -1) opts.push(s);
      }
      return shuffle(opts);
    }
    // 图形串答案（如 ●●●○）→ 通过增减符号做干扰项
    const SYMCHARS = ['●', '○', '△', '□', '★', '☆', '▲', '▼', '■'];
    if (correct.length > 1 && correct.split('').every(function (c) { return SYMCHARS.indexOf(c) !== -1; })) {
      const freq = {};
      correct.split('').forEach(function (c) { freq[c] = (freq[c] || 0) + 1; });
      let top = correct[0], tn = 0;
      Object.keys(freq).forEach(function (c) { if (freq[c] > tn) { tn = freq[c]; top = c; } });
      if (tn >= 2) { opts.push(correct.replace(top, '')); opts.push(correct.replace(top, top + top)); }
      return shuffle(opts.slice(0, 3));
    }
    // 干扰项只取「和正确答案同类」且题目里出现过的元素（避免“小”混进人名题）
    q = q || '';
    const cands = [];
    let pool = SYMBOLS;
    if (NAMES.indexOf(correct) !== -1) {
      pool = NAMES;
      NAMES.forEach(function (n) { if (q.indexOf(n) !== -1 && n !== correct && cands.indexOf(n) === -1) cands.push(n); });
    } else if (ANIMALS.indexOf(correct) !== -1) {
      pool = ANIMALS;
      ANIMALS.forEach(function (n) { if (q.indexOf(n) !== -1 && n !== correct && cands.indexOf(n) === -1) cands.push(n); });
    } else if (SYMBOLS.indexOf(correct) !== -1) {
      SYMBOLS.forEach(function (s) { if (q.indexOf(s) !== -1 && s !== correct && cands.indexOf(s) === -1) cands.push(s); });
    } else {
      (q.match(/[一二三四五六七八九十0-9]+楼/g) || []).forEach(function (t) { if (t !== correct && cands.indexOf(t) === -1) cands.push(t); });
    }
    shuffle(cands);
    cands.forEach(function (c) { if (opts.length < 3 && opts.indexOf(c) === -1) opts.push(c); });
    // 不够再用同类池补齐
    if (opts.length < 3) {
      const p = shuffle(pool.slice());
      for (let k = 0; k < p.length && opts.length < 3; k++) {
        if (p[k] !== correct && opts.indexOf(p[k]) === -1) opts.push(p[k]);
      }
    }
    return shuffle(opts);
  }
  function gradeThink(id) {
    const t = TYPES.find(x => x.id === id);
    if (!t) return;
    const keys = thinkKeys[id] || [];
    let total = 0, correct = 0;
    keys.forEach(function (k, i) {
      total++;
      let ok = false;
      if (k.type === 'num') {
        const inp = document.querySelector('.think-input[data-type="' + id + '"][data-i="' + i + '"]');
        ok = inp ? gradeOne(inp.value, k.key) : false;
      } else {
        const sel = document.querySelector('.mc-opt.sel[data-type="' + id + '"][data-i="' + i + '"]');
        ok = sel ? (sel.textContent === k.key) : false;
      }
      if (ok) correct++;
      const li = document.querySelector('.think-item[data-type="' + id + '"][data-i="' + i + '"]');
      if (li) {
        li.classList.remove('right', 'wrong');
        li.classList.add(ok ? 'right' : 'wrong');
        const mk = li.querySelector('.mark'); if (mk) mk.textContent = ok ? '✓' : '✗';
        if (!ok) { const r = li.querySelector('.reveal'); if (r) r.style.display = 'block'; }
      }
    });
    const acc = total > 0 ? correct / total : 0;
    const ab = accBonus(acc);
    completeModule('think', '思维小练', ab, '正确率+' + ab);
    const sc = document.getElementById(id + '-score');
    if (sc) sc.textContent = correct + '/' + total;
  }

  /* ============ 思维小练渲染 ============ */
  const currentProblems = {};
  function buildSection(t, idx) {
    const problems = t.gen();
    currentProblems[t.id] = problems;
    thinkKeys[t.id] = [];
    let ol = '<ol class="problems">';
    problems.forEach((p, i) => {
      const answerPart = String(p.a).split(/[（(]/)[0].split(/[；;。]/)[0].trim();
      const nums = Array.from(new Set(normalizeNums(answerPart)));
      let item = '<li class="think-item" data-type="' + t.id + '" data-i="' + i + '"><div class="q-text">' + escapeHtml(p.q) + '</div>';
      if (nums.length) {
        thinkKeys[t.id].push({ type: 'num', key: nums });
        item += '<div class="a-row"><input class="ans-input think-input" data-type="' + t.id + '" data-i="' + i + '" type="text" inputmode="numeric" placeholder="✏️" autocomplete="off"><span class="mark"></span></div>';
      } else {
        const key = String(p.a).replace(/（.*$/, '').trim();
        thinkKeys[t.id].push({ type: 'mc', key: key });
        item += '<div class="mc">' + makeOptions(p.q, p.a).map(o => '<button class="mc-opt" data-type="' + t.id + '" data-i="' + i + '">' + escapeHtml(o) + '</button>').join('') + '</div><span class="mark"></span>';
      }
      item += '<div class="reveal">答案：' + escapeHtml(p.a) + '</div><button class="add-wrong" data-type="' + t.id + '" data-i="' + i + '">＋错题本</button></li>';
      ol += item;
    });
    ol += '</ol>';
    let ans = '<ol class="answer-list">';
    problems.forEach(p => { ans += '<li>' + escapeHtml(p.a) + '</li>'; });
    ans += '</ol>';
    return '<h2><span class="num">' + idx + '</span>' + escapeHtml(t.title) + ' <span class="badge">' + escapeHtml(t.badge) + '</span></h2>'
      + '<p class="intro">' + escapeHtml(t.intro) + '</p>' + '<div class="mod-toolbar"><button class="primary-btn" onclick="gradeThink(\'' + t.id + '\')">✔ 批改本组</button> <span class="sec-score" id="' + t.id + '-score"></span></div>' + ol
      + '<details class="answers"><summary>查看本组答案</summary>' + ans + '</details>'
      + '<div class="refresh"><button onclick="refreshSection(\'' + t.id + '\')">🎲 换一批题目</button></div>';
  }
  function refreshSection(id) {
    const t = TYPES.find(x => x.id === id);
    const sec = document.getElementById(id);
    if (!t || !sec) return;
    sec.innerHTML = buildSection(t, TYPES.indexOf(t) + 1);
    updateAddedMarks();
    sec.classList.add('flash'); setTimeout(() => sec.classList.remove('flash'), 350);
  }
  function refreshAllThink() { TYPES.forEach(t => { const s = document.getElementById(t.id); if (s) s.innerHTML = buildSection(t, TYPES.indexOf(t) + 1); }); updateAddedMarks(); }
  function setAnswers(open) { document.querySelectorAll('#page-think details.answers').forEach(d => { d.open = open; }); }

  /* ============ 计算小练：30 题（15/10/5） ============ */
  function genChain() {
    const res = [];
    while (res.length < 15) {
      const a = ri(1, 49), b = ri(1, 49), c = ri(1, 49);
      const op1 = Math.random() < .5 ? '＋' : '－';
      const op2 = Math.random() < .5 ? '＋' : '－';
      const r1 = op1 === '＋' ? a + b : a - b;
      if (r1 < 0 || r1 > 100) continue;
      const r2 = op2 === '＋' ? r1 + c : r1 - c;
      if (r2 < 0 || r2 > 100) continue;
      const pos = ri(0, 3);
      let q, ans;
      if (pos === 0) { q = `（　） ${op1} ${b} ${op2} ${c} ＝ ${r2}`; ans = a; }
      else if (pos === 1) { q = `${a} ${op1} （　） ${op2} ${c} ＝ ${r2}`; ans = b; }
      else if (pos === 2) { q = `${a} ${op1} ${b} ${op2} （　） ＝ ${r2}`; ans = c; }
      else { q = `${a} ${op1} ${b} ${op2} ${c} ＝ （　）`; ans = r2; }
      res.push({ q: q, ans: ans, key: [ans] });
    }
    return res;
  }
  function genVertical() {
    const res = [];
    for (let i = 0; i < 10; i++) {
      const kind = ri(1, 4);
      let a, b, op, ans;
      if (kind === 1) { do { a = ri(11, 88); b = ri(11, 88); } while (a + b > 99); op = '+'; ans = a + b; }
      else if (kind === 2) { a = ri(21, 99); b = ri(11, a - 1); op = '-'; ans = a - b; }
      else if (kind === 3) { do { a = ri(11, 89); b = ri(2, 9); } while (a + b > 99); op = '+'; ans = a + b; }
      else { a = ri(20, 99); b = ri(1, 9); op = '-'; ans = a - b; }
      res.push({ a: a, b: b, op: op, ans: ans, key: [ans] });
    }
    return res;
  }
  function genThink() {
    function t1() { const k = ri(20, 45); return {q:`两个相邻的数相加等于${2*k+1}，这两个数各是多少？`, ans:`${k} 和 ${k+1}`, key:[k, k+1]}; }
    function t2() { const m = ri(10, 30); return {q:`○＋○＋○＝${3*m}，○＝多少？`, ans:`${m}`, key:[m]}; }
    function t3() { const d = 2 * ri(5, 20); return {q:`两个数的和是100，差是${d}。这两个数各是多少？`, ans:`${(100+d)/2} 和 ${(100-d)/2}`, key:[(100+d)/2, (100-d)/2]}; }
    function t4() { return {q:'找规律填数：2，4，8，16，32，____。', ans:'64', key:[64]}; }
    function t5() { const n = ri(10, 13); return {q:`计算：1＋2＋3＋……＋${n-1}＋${n}。`, ans:`${n*(n+1)/2}`, key:[n*(n+1)/2]}; }
    function t6() { const m = ri(5, 15); return {q:`三个连续的数相加等于${3*m}，这三个数各是多少？`, ans:`${m-1}、${m}、${m+1}`, key:[m-1, m, m+1]}; }
    function t7() { const a = ri(3, 9), b = ri(1, 8), c = ri(40, 90); return {q:`一个数加${a}，再减${b}，结果是${c}。这个数是几？`, ans:`${c-a+b}`, key:[c-a+b]}; }
    function t8() { const d = ri(2, 4), e = ri(1, 9 - d); return {q:`一个两位数，十位上的数字比个位大${d}，两个数字之和是${2*e+d}。这个数是多少？`, ans:`${10*(e+d)+e}`, key:[10*(e+d)+e]}; }
    const t = [t1, t2, t3, t4, t5, t6, t7, t8];
    shuffle(t);
    return t.slice(0, 5).map(f => f());
  }

  const CALC = [
    { id:'c1', title:'连加连减', badge:'15题', emoji:'➕', intro:'三步连加连减，括号（　）可能出现在任意位置。', gen:genChain, vertical:false },
    { id:'c2', title:'竖式计算', badge:'10题', emoji:'📏', intro:'两位数加减的竖式计算，注意进位和退位。', gen:genVertical, vertical:true },
    { id:'c3', title:'思维', badge:'5题', emoji:'💡', intro:'100 以内的趣味思维题，换个角度想一想。', gen:genThink, vertical:false },
  ];
  const currentCalc = {};

  function renderCalcText(items, typeId) {
    let html = '';
    items.forEach((it, i) => {
      html += '<div class="calc-item" data-type="' + typeId + '" data-i="' + i + '">'
        + '<div class="calc-main">'
        + '<div class="q">' + (i + 1) + '、' + fmtMath(it.q) + '</div>'
        + '<div class="a-row"><input class="ans-input" data-type="' + typeId + '" data-i="' + i + '" type="text" inputmode="numeric" placeholder="✏️ 写答案" autocomplete="off"><span class="mark"></span></div>'
        + '<div class="reveal">答案：' + escapeHtml(it.ans) + '</div>'
        + '</div>'
        + '<canvas class="scratch" width="2" height="2" aria-label="草稿区"></canvas>'
        + '</div>';
    });
    return html;
  }
  function renderCalcVertical(items, typeId) {
    let html = '<div class="vgrid">';
    items.forEach((it, i) => {
      html += '<div class="vcol" data-type="' + typeId + '" data-i="' + i + '">'
        + '<div class="vrow">' + it.a + '</div>'
        + '<div class="vrow op">' + it.op + ' ' + it.b + '</div>'
        + '<div class="vmarks"><input class="vmk" type="text" inputmode="numeric" maxlength="1" autocomplete="off" aria-label="进位/退位标记"><input class="vmk" type="text" inputmode="numeric" maxlength="1" autocomplete="off" aria-label="进位/退位标记"></div>'
        + '<div class="vline"></div>'
        + '<div class="vans"><input class="ans-input vinput" data-type="' + typeId + '" data-i="' + i + '" type="text" inputmode="numeric" placeholder="?" autocomplete="off"><span class="mark"></span></div>'
        + '<div class="reveal">答案：' + it.ans + '</div>'
        + '</div>';
    });
    html += '</div>';
    return html;
  }
  let scratchMode = 'pen';
  function scratchToolsHTML() {
    return '<button class="st-mode' + (scratchMode === 'pen' ? ' active' : '') + '" data-mode="pen" onclick="setScratchMode(\'pen\')">✏️ 画笔</button>'
      + '<button class="st-mode' + (scratchMode === 'eraser' ? ' active' : '') + '" data-mode="eraser" onclick="setScratchMode(\'eraser\')">🧽 橡皮擦</button>'
      + '<button onclick="clearScratchHost(this)">🧹 清空草稿</button>';
  }
  function setScratchMode(m) {
    scratchMode = (m === 'eraser') ? 'eraser' : 'pen';
    document.querySelectorAll('.st-mode').forEach(function (b) {
      b.classList.toggle('active', b.getAttribute('data-mode') === scratchMode);
    });
    document.body.classList.toggle('scratch-eraser', scratchMode === 'eraser');
    toast(scratchMode === 'eraser' ? '橡皮擦：在草稿区滑动就能擦掉笔迹' : '画笔：可以在草稿区写草稿了');
  }
  function clearScratchHost(btn) {
    const host = (btn && btn.closest('section')) || document;
    clearScratch(host);
    toast('草稿已清空');
  }
  function clearOneScratch(cv) {
    const c = cv.getContext('2d');
    c.save(); c.setTransform(1, 0, 0, 1, 0, 0); c.clearRect(0, 0, cv.width, cv.height); c.restore();
    cv._inked = false; cv._ink = null;
  }
  // 在每个草稿区右上角放一组浮动按钮，滚动到哪儿都能就地换笔 / 擦除
  function decorateScratch(cv) {
    if (!cv.parentNode || cv.parentNode.classList.contains('scratch-box')) return;
    const box = document.createElement('div');
    box.className = 'scratch-box';
    cv.parentNode.insertBefore(box, cv);
    box.appendChild(cv);
    const tools = document.createElement('div');
    tools.className = 'scratch-tools';
    tools.innerHTML =
      '<button type="button" class="st-mini st-mode' + (scratchMode === 'pen' ? ' active' : '') + '" data-mode="pen" title="画笔" aria-label="画笔">✏️</button>' +
      '<button type="button" class="st-mini st-mode' + (scratchMode === 'eraser' ? ' active' : '') + '" data-mode="eraser" title="橡皮擦" aria-label="橡皮擦">🧽</button>';
    const wipe = document.createElement('div');
    wipe.className = 'scratch-wipe';
    wipe.innerHTML = '<button type="button" class="st-mini st-wipe" title="清空这一格" aria-label="清空这一格">🧹</button>';
    function pick(m) {
      return function (e) { e.preventDefault(); e.stopPropagation(); setScratchMode(m); };
    }
    tools.querySelector('[data-mode="pen"]').addEventListener('click', pick('pen'));
    tools.querySelector('[data-mode="eraser"]').addEventListener('click', pick('eraser'));
    wipe.querySelector('.st-wipe').addEventListener('click', function (e) {
      e.preventDefault(); e.stopPropagation();
      clearOneScratch(cv);
      toast('这一格草稿已清空');
    });
    box.appendChild(tools);
    box.appendChild(wipe);
  }
  // ===== 草稿区显存管理：离开视野就把画布缩到 1×1 释放显存，回到视野再还原笔迹 =====
  // iPad 上 100 多个 200px 高的画布同时占用显存会把页面拖死，这是"用一会儿就卡住"的主因。
  let scratchIO = null;
  function scratchDpr() { return Math.min(window.devicePixelRatio || 1, 2); }
  function parkScratch(cv) {
    if (!cv || !cv._inked || cv._parked || cv._drawing) return;
    if (cv.width < 8 || cv.height < 8) return;
    try {
      cv._ink = cv.toDataURL('image/png');
      cv.width = 1; cv.height = 1;
      cv._parked = true;
    } catch (e) {}
  }
  function unparkScratch(cv) {
    if (!cv || !cv._parked) return;
    cv._parked = false;
    const dpr = scratchDpr();
    const w = Math.max(1, Math.round(cv.clientWidth || 300));
    const h = Math.max(1, Math.round(cv.clientHeight || 150));
    cv.width = w * dpr; cv.height = h * dpr;
    const c = cv.getContext('2d');
    c.setTransform(dpr, 0, 0, dpr, 0, 0);
    c.lineCap = 'round'; c.lineJoin = 'round';
    if (cv._ink) {
      const img = new Image();
      img.onload = function () {
        try {
          const cc = cv.getContext('2d');
          cc.save();
          cc.setTransform(1, 0, 0, 1, 0, 0);
          cc.globalCompositeOperation = 'source-over';
          cc.drawImage(img, 0, 0, cv.width, cv.height);
          cc.restore();
        } catch (e) {}
      };
      img.src = cv._ink;
    }
  }
  function observeAllScratch() {
    if (!('IntersectionObserver' in window)) return;
    if (!scratchIO) {
      scratchIO = new IntersectionObserver(function (list) {
        list.forEach(function (en) {
          if (en.isIntersecting) unparkScratch(en.target);
          else parkScratch(en.target);
        });
      }, { rootMargin: '600px 0px' });
    }
    scratchIO.disconnect();
    document.querySelectorAll('canvas.scratch').forEach(function (cv) { scratchIO.observe(cv); });
  }
  function setupScratch(cv) {
    if (cv._scratchReady) return;
    cv._scratchReady = true;
    decorateScratch(cv);
    let ctx = null, drawing = false, lastX = 0, lastY = 0;
    const PEN_COLOR = '#7d6672', PEN_WIDTH = 2, ERASER_WIDTH = 16;
    function erasing() { return scratchMode === 'eraser'; }
    function ensure() {
      const dpr = scratchDpr();
      const w = Math.max(1, Math.round(cv.clientWidth));
      const h = Math.max(1, Math.round(cv.clientHeight));
      if (cv.width !== w * dpr || cv.height !== h * dpr) {
        cv.width = w * dpr; cv.height = h * dpr;
        cv._inked = false; cv._ink = null;   // 尺寸变化会清空画布
      }
      ctx = cv.getContext('2d');
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    }
    // 画笔 / 橡皮擦：橡皮擦用 destination-out 真正擦掉笔迹，草稿底纹依然可见
    function applyTool() {
      if (erasing()) {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.lineWidth = ERASER_WIDTH;
        ctx.strokeStyle = 'rgba(0,0,0,1)';
        ctx.fillStyle = 'rgba(0,0,0,1)';
      } else {
        ctx.globalCompositeOperation = 'source-over';
        ctx.lineWidth = PEN_WIDTH;
        ctx.strokeStyle = PEN_COLOR;
        ctx.fillStyle = PEN_COLOR;
      }
    }
    function pos(e) { const r = cv.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; }
    // 在草稿区落笔时事件到此为止：不冒泡、不触发页面其它功能、不滚动、不缩放
    function isolate(e) {
      e.stopPropagation();
      if (e.cancelable) e.preventDefault();
    }
    cv.addEventListener('pointerdown', function (e) {
      if (e.pointerType === 'touch') return;   // æ‰‹æŒ‡ä¸ç”»ï¼Œåªè®¤ Apple Pencil
      isolate(e); ensure();
      if (!ctx) return;
      cv._drawing = true;
      cv._parked = false;
      cv._ink = null;
      drawing = true;
      const p = pos(e); lastX = p.x; lastY = p.y;
      applyTool();
      ctx.beginPath(); ctx.arc(p.x, p.y, erasing() ? ERASER_WIDTH / 2 : 1, 0, 6.2832); ctx.fill();
      try { cv.setPointerCapture(e.pointerId); } catch (_) {}
    });
    cv.addEventListener('pointermove', function (e) {
      if (e.pointerType === 'touch') return;
      if (!drawing) return;
      isolate(e); ensure();
      if (!ctx) return;
      const p = pos(e);
      cv._inked = true;
      applyTool();
      ctx.beginPath(); ctx.moveTo(lastX, lastY); ctx.lineTo(p.x, p.y); ctx.stroke();
      lastX = p.x; lastY = p.y;
    });
    function end(e) { if (e) isolate(e); drawing = false; cv._drawing = false; }
    cv.addEventListener('pointerup', end);
    cv.addEventListener('pointercancel', end);
    cv.addEventListener('pointerleave', function () { drawing = false; cv._drawing = false; });
    cv.addEventListener('lostpointercapture', function () { drawing = false; cv._drawing = false; });
    // 阻断平板浏览器的手势（滚动 / 双指缩放 / 长按菜单）：写草稿时页面不做任何别的反应
    ['touchstart', 'touchmove', 'touchend', 'touchcancel'].forEach(function (t) {
      cv.addEventListener(t, function (e) { e.preventDefault(); e.stopPropagation(); }, { passive: false });
    });
    cv.addEventListener('contextmenu', function (e) { e.preventDefault(); });
    cv.addEventListener('gesturestart', function (e) { e.preventDefault(); });
    cv.addEventListener('dblclick', function (e) { e.preventDefault(); });
  }
  function initScratchCanvases(root) {
    (root || document).querySelectorAll('canvas.scratch').forEach(setupScratch);
    observeAllScratch();
  }
  function clearScratch(root) {
    (root || document).querySelectorAll('canvas.scratch').forEach(function (cv) {
      const c = cv.getContext('2d');
      c.save(); c.setTransform(1, 0, 0, 1, 0, 0); c.clearRect(0, 0, cv.width, cv.height); c.restore();
      cv._inked = false; cv._ink = null;
    });
  }
  function buildCalcModule(m, idx) {
    const items = m.gen();
    currentCalc[m.id] = items;
    const body = m.vertical ? renderCalcVertical(items, m.id) : renderCalcText(items, m.id);
    return '<h2><span class="num">' + idx + '</span>' + m.emoji + ' ' + escapeHtml(m.title) + ' <span class="badge">' + escapeHtml(m.badge) + '</span></h2>'
      + '<p class="intro">' + escapeHtml(m.intro) + '</p>'
      + '<div class="mod-toolbar">'
      + '<button class="primary-btn" onclick="gradeCalcModule(\'' + m.id + '\')">✔ 批改本组</button>'
      + '<button class="toggle" onclick="toggleCalcAns(this,\'' + m.id + '-body\')">显示答案</button>'
      + '<button onclick="refreshCalcModule(\'' + m.id + '\')">🎲 换一批</button>'
      + scratchToolsHTML()
      + '<span class="sec-score" id="' + m.id + '-score"></span>'
      + '</div>'
      + '<div class="mod-body' + (m.vertical ? '' : ' text') + '" id="' + m.id + '-body">' + body + '</div>';
  }
  function refreshCalcModule(id) {
    const m = CALC.find(x => x.id === id);
    const sec = document.getElementById(id);
    if (!m || !sec) return;
    sec.innerHTML = buildCalcModule(m, CALC.indexOf(m) + 1);
    initScratchCanvases(sec);
    resetScore();
    sec.classList.add('flash'); setTimeout(() => sec.classList.remove('flash'), 350);
  }
  function refreshAllCalc() { CALC.forEach(m => { const s = document.getElementById(m.id); if (s) s.innerHTML = buildCalcModule(m, CALC.indexOf(m) + 1); }); initScratchCanvases(); resetScore(); }
  function toggleCalcAns(btn, bodyId) {
    const body = document.getElementById(bodyId);
    if (!body) return;
    const show = !body.classList.contains('show-ans');
    body.classList.toggle('show-ans', show);
    btn.textContent = show ? '隐藏答案' : '显示答案';
  }
  function setAllCalcAnswers(open) {
    document.querySelectorAll('#page-calc .mod-body').forEach(b => b.classList.toggle('show-ans', open));
    document.querySelectorAll('#page-calc .mod-toolbar .toggle').forEach(b => { b.textContent = open ? '隐藏答案' : '显示答案'; });
  }
  function gradeCalcInputs(inputs) {
    const perType = {};
    let total = 0, correct = 0;
    inputs.forEach(inp => {
      const t = inp.getAttribute('data-type');
      const i = +inp.getAttribute('data-i');
      const prob = currentCalc[t] && currentCalc[t][i];
      if (!prob) return;
      total++;
      const ok = gradeOne(inp.value, prob.key);
      if (ok) correct++;
      if (!perType[t]) perType[t] = { total: 0, correct: 0 };
      perType[t].total++;
      if (ok) perType[t].correct++;
      const card = inp.closest('.calc-item,.vcol');
      if (card) {
        card.classList.remove('right', 'wrong');
        card.classList.add(ok ? 'right' : 'wrong');
        const mk = card.querySelector('.mark'); if (mk) mk.textContent = ok ? '✓' : '✗';
        if (!ok) {
          const r = card.querySelector('.reveal');
          if (r) {
            r.style.display = 'block';
            const sc = card.querySelector('canvas.scratch');
            const ta = card.querySelector('.step-input');
            addAiVerdict(r, card);
          }
        }
      }
    });
    Object.keys(perType).forEach(t => {
      const sc = document.getElementById(t + '-score');
      if (sc) sc.textContent = perType[t].correct + ' / ' + perType[t].total;
    });
    return { total: total, correct: correct };
  }
  function gradeCalcModule(id) {
    const inputs = Array.from(document.querySelectorAll('#page-calc .ans-input[data-type="' + id + '"]'));
    const r = gradeCalcInputs(inputs);
    const elapsed = Math.round((Date.now() - practiceStart) / 1000);
    recordPractice(r.correct, r.total, elapsed);
    practiceStart = Date.now();
  }
  function gradeAll() {
    const inputs = Array.from(document.querySelectorAll('#page-calc .ans-input'));
    const r = gradeCalcInputs(inputs);
    const sc = document.getElementById('score');
    sc.textContent = r.correct + ' / ' + r.total;
    sc.classList.add('done');
    const elapsed = Math.round((Date.now() - practiceStart) / 1000);
    recordPractice(r.correct, r.total, elapsed);
    practiceStart = Date.now();
  }
  function resetCalc() {
    document.querySelectorAll('#page-calc .ans-input, #page-calc .vmk').forEach(inp => { inp.value = ''; });
    clearScratch(document.getElementById('page-calc'));
    document.querySelectorAll('#page-calc .calc-item, #page-calc .vcol').forEach(card => {
      card.classList.remove('right', 'wrong');
      const mk = card.querySelector('.mark'); if (mk) mk.textContent = '';
      const r = card.querySelector('.reveal'); if (r) r.style.display = '';
    });
    document.querySelectorAll('#page-calc .mod-body').forEach(b => b.classList.remove('show-ans'));
    document.querySelectorAll('#page-calc .mod-toolbar .toggle').forEach(b => { b.textContent = '显示答案'; });
    document.querySelectorAll('#page-calc .sec-score').forEach(s => { s.textContent = ''; });
    resetScore();
  }
  function resetScore() { const sc = document.getElementById('score'); sc.textContent = '— / 30'; sc.classList.remove('done'); practiceStart = Date.now(); }

  /* ============ 标签切换与初始化 ============ */
  function showPage(name) {
    try { renderBuildBadge(); } catch (e) {}
    if (name !== 'module') { try { releaseScratch(document.getElementById('module-content')); } catch (e) {} }
    setTimeout(function () { if (typeof ggSync === 'function') ggSync(); }, 0);
    document.querySelectorAll('.page').forEach(p => { p.style.display = 'none'; });
    const el = document.getElementById('page-' + name);
    if (el) el.style.display = 'block';
    document.querySelectorAll('.bottom-nav button').forEach(b => b.classList.toggle('active', b.getAttribute('data-page') === name));
    window.scrollTo(0, 0);
    const wrapEl = document.querySelector('.wrap');
    if (wrapEl) wrapEl.scrollTop = 0;
    if (name === 'read') { initReadDate(); renderReadLog(); }
    if (name === 'chore') renderChores();
    if (name === 'listen') renderListen();
    if (name === 'paper') paperInit();
    if (name === 'dashboard') renderCalendar();
  }

  /* ===== 100以内口算练习：在线作答 + 按组批改 + Excel 生成 ===== */
  var PAPER = null;
  var PAPER_DEFS = [
    {
      id: 'p1', title: '一、不进退位加减', desc: '个位、十位都不进位、不退位。',
      gen: (function () { var n = 0; return function () { n++; return n % 2 ? paperNoCarryAdd() : paperNoCarrySub(); }; })()
    },
    {
      id: 'p2', title: '二、进位退位加减', desc: '注意个位进位和退位。',
      gen: (function () { var n = 0; return function () { n++; return n % 2 ? paperCarryAdd() : paperBorrowSub(); }; })()
    },
    {
      id: 'p3', title: '三、连加连减', desc: '两步计算；可以在草稿区写分步过程。',
      gen: function () { return pick([paperThreeAddAdd, paperThreeSubSub, paperThreeAddSub, paperThreeSubAdd])(); }
    },
    {
      id: 'p4', title: '四、连加连减填缺数', desc: '根据得数倒推括号里的数；可以在草稿区写过程。',
      gen: function () { return pick([paperFillMidAdd, paperFillMidSub, paperFillEndSub, paperFillEndAdd, paperFillFirst])(); }
    }
  ];
  function paperNoCarryAdd() {
    var A = ri(1, 8), B = ri(0, 8), C = ri(0, 9 - A), D = C === 0 ? ri(1, 9 - B) : ri(0, 9 - B);
    var a = A * 10 + B, b = C * 10 + D, r = a + b;
    return { q: a + ' ＋ ' + b + ' ＝ ', a: String(r), ansText: a + ' ＋ ' + b + ' ＝ ' + r };
  }
  function paperNoCarrySub() {
    var A = ri(1, 9), B = ri(1, 9), C = ri(0, A - 1), D = C === 0 ? ri(1, B) : ri(0, B);
    var a = A * 10 + B, b = C * 10 + D, r = a - b;
    return { q: a + ' － ' + b + ' ＝ ', a: String(r), ansText: a + ' － ' + b + ' ＝ ' + r };
  }
  function paperCarryAdd() {
    var A = ri(1, 8), B = ri(1, 9), C = ri(0, 8 - A), D = ri(10 - B, 9);
    var a = A * 10 + B, b = C * 10 + D, r = a + b;
    return { q: a + ' ＋ ' + b + ' ＝ ', a: String(r), ansText: a + ' ＋ ' + b + ' ＝ ' + r };
  }
  function paperBorrowSub() {
    var A = ri(2, 9), B = ri(0, 8), C = ri(0, A - 2), D = ri(B + 1, 9);
    var a = A * 10 + B, b = C * 10 + D, r = a - b;
    return { q: a + ' － ' + b + ' ＝ ', a: String(r), ansText: a + ' － ' + b + ' ＝ ' + r };
  }
  function paperThreeAddAdd() {
    var a = ri(10, 50), b = ri(10, 90 - a), c = ri(10, 100 - a - b), r = a + b + c;
    return { q: a + ' ＋ ' + b + ' ＋ ' + c + ' ＝ ', a: String(r), ansText: a + ' ＋ ' + b + ' ＋ ' + c + ' ＝ ' + r };
  }
  function paperThreeSubSub() {
    var a = ri(40, 99), b = ri(10, a - 20), c = ri(10, a - b - 10), r = a - b - c;
    return { q: a + ' － ' + b + ' － ' + c + ' ＝ ', a: String(r), ansText: a + ' － ' + b + ' － ' + c + ' ＝ ' + r };
  }
  function paperThreeAddSub() {
    var a = ri(10, 60), b = ri(10, 90 - a), c = ri(10, a + b - 10), r = a + b - c;
    return { q: a + ' ＋ ' + b + ' － ' + c + ' ＝ ', a: String(r), ansText: a + ' ＋ ' + b + ' － ' + c + ' ＝ ' + r };
  }
  function paperThreeSubAdd() {
    var a = ri(40, 90), b = ri(10, a - 10), c = ri(10, 100 - (a - b)), r = a - b + c;
    return { q: a + ' － ' + b + ' ＋ ' + c + ' ＝ ', a: String(r), ansText: a + ' － ' + b + ' ＋ ' + c + ' ＝ ' + r };
  }
  function paperFillMidAdd() {
    var a = ri(10, 45), b = ri(10, 45), c = ri(10, 100 - a - b), t = a + b + c;
    return { q: a + ' ＋ （　　） ＋ ' + c + ' ＝ ' + t, a: String(b), ansText: a + ' ＋ （' + b + '） ＋ ' + c + ' ＝ ' + t };
  }
  function paperFillMidSub() {
    var a = ri(60, 99), b = ri(10, a - 30), c = ri(10, a - b - 10), t = a - b - c;
    return { q: a + ' － （　　） － ' + c + ' ＝ ' + t, a: String(b), ansText: a + ' － （' + b + '） － ' + c + ' ＝ ' + t };
  }
  function paperFillEndSub() {
    var a = ri(10, 50), b = ri(10, 90 - a), c = a + b - ri(10, a + b - 10), t = a + b - c;
    return { q: a + ' ＋ ' + b + ' － （　　） ＝ ' + t, a: String(c), ansText: a + ' ＋ ' + b + ' － （' + c + '） ＝ ' + t };
  }
  function paperFillEndAdd() {
    var a = ri(50, 90), b = ri(10, a - 20), base = a - b, c = ri(base + 10, 100) - base, t = base + c;
    return { q: a + ' － ' + b + ' ＋ （　　） ＝ ' + t, a: String(c), ansText: a + ' － ' + b + ' ＋ （' + c + '） ＝ ' + t };
  }
  function paperFillFirst() {
    var a = ri(30, 80), b = ri(10, 100 - a), c = ri(10, a - 20), t = a + b - c;
    return { q: '（　　） ＋ ' + b + ' － ' + c + ' ＝ ' + t, a: String(a), ansText: '（' + a + '） ＋ ' + b + ' － ' + c + ' ＝ ' + t };
  }
  function paperBuildSection(def) {
    var items = [], seen = {}, guard = 0;
    while (items.length < 5 && guard++ < 300) {
      var it = def.gen();
      if (!it || seen[it.q]) continue;
      seen[it.q] = 1; items.push(it);
    }
    while (items.length < 5) items.push(def.gen());
    return { id: def.id, title: def.title, desc: def.desc, items: items };
  }
  function paperBuildAll() { return PAPER_DEFS.map(paperBuildSection); }
  function paperInit() {
    if (!PAPER) { PAPER = paperBuildAll(); paperRender(); }
  }
  function paperSectionHTML(sec, idx) {
    regGeneric(sec.id, sec.title, sec.items.map(function (it) { return { q: it.q, a: it.a }; }));
    var cls = sec.id === 'p4' ? 'mod-body text onecol' : 'mod-body text';
    var hasDraft = sec.id === 'p3' || sec.id === 'p4';
    var secCls = 'mod paper-module' + (sec.id === 'p4' ? ' paper-fill' : '') + (hasDraft ? ' paper-draft' : '');
    var h = '<section class="' + secCls + '" id="paper-sec-' + sec.id + '">' +
      '<h2><span class="num">' + (idx + 1) + '</span>' + escapeHtml(sec.title) + ' <span class="badge">5题</span></h2>' +
      '<p class="intro">' + escapeHtml(sec.desc) + '</p>' +
      '<div class="mod-toolbar">' +
        '<button class="primary-btn" onclick="paperGradeSection(\'' + sec.id + '\')">✔ 批改本组</button>' +
        '<button onclick="paperRefreshSection(\'' + sec.id + '\')">🎲 换一批</button>' +
        '<button onclick="paperShowSectionAnswers(\'' + sec.id + '\',true)">显示答案</button>' +
        '<span class="sec-score" id="' + sec.id + '-score"></span>' +
      '</div><div class="' + cls + '" id="' + sec.id + '-body">';
    sec.items.forEach(function (it, i) {
      var draft = hasDraft ? '<canvas class="scratch" width="2" height="2" aria-label="草稿区"></canvas>' : '';
      var input = '<input class="paper-inline g-input" data-g="' + sec.id + '" data-i="' + i + '" type="text" inputmode="numeric" autocomplete="off">';
      var qHtml;
      if (sec.id === 'p4') {
        var fillQ = escapeHtml(it.q).replace(/（[\s　]*）/, '（' + input + '）');
        qHtml = '<div class="q"><span class="paper-no">' + (i + 1) + '.</span> ' + fillQ + ' <span class="mark"></span></div>';
      } else {
        var plainQ = escapeHtml(it.q).replace(/\s*＝\s*$/, '');
        qHtml = '<div class="q"><span class="paper-no">' + (i + 1) + '.</span> ' + plainQ + ' ＝ <span class="paper-ans">（' + input + '）</span><span class="mark"></span></div>';
      }
      h += '<div class="calc-item paper-item" data-gi="' + sec.id + '-' + i + '">' +
        '<div class="calc-main">' + qHtml +
        '<button class="add-wrong" data-type="' + sec.id + '" data-i="' + i + '">＋错题本</button>' +
        '<div class="reveal">答案：' + escapeHtml(it.a) + '</div></div>' + draft + '</div>';
    });
    return h + '</div></section>';
  }
  function paperRender() {
    var host = document.getElementById('paper-modules');
    if (!host) return;
    host.innerHTML = PAPER.map(paperSectionHTML).join('');
    initScratchCanvases(host);
    updateAddedMarks();
  }
  function paperRenderSection(id) {
    var idx = -1;
    PAPER.forEach(function (s, i) { if (s.id === id) idx = i; });
    if (idx < 0) return;
    var old = document.getElementById('paper-sec-' + id);
    if (old) old.outerHTML = paperSectionHTML(PAPER[idx], idx);
    initScratchCanvases(document.getElementById('paper-sec-' + id));
    updateAddedMarks();
  }
  function paperGradeSection(id) {
    var sec = null;
    (PAPER || []).forEach(function (s) { if (s.id === id) sec = s; });
    if (!sec) return { correct: 0, total: 0 };
    var correct = 0;
    sec.items.forEach(function (it, i) {
      var inp = document.querySelector('#paper-sec-' + id + ' .g-input[data-i="' + i + '"]');
      var ok = inp ? gradeOne(inp.value, [it.a]) : false;
      if (ok) correct++;
      var card = document.querySelector('.paper-item[data-gi="' + id + '-' + i + '"]');
      if (card) {
        card.classList.remove('right', 'wrong');
        card.classList.add(ok ? 'right' : 'wrong');
        var mk = card.querySelector('.mark'); if (mk) mk.textContent = ok ? '✓' : '✗';
      }
    });
    setText(id + '-score', correct + ' / ' + sec.items.length);
    calLog(id, correct, sec.items.length);
    return { correct: correct, total: sec.items.length };
  }
  function recordPaperPractice(correct, total, seconds) {
    var acc = total ? correct / total : 0;
    var rec = dayRecord();
    rec.correct = correct; rec.total = total; rec.seconds = Math.round(seconds);
    rec.avg = total ? Math.round(seconds / total) : null; rec.acc = Math.round(acc * 100);
    completeModule('paper', '口算练习', accBonus(acc), '正确率+' + accBonus(acc));
    saveStats();
  }
  function paperGradeAll() {
    if (!PAPER) paperInit();
    var t0 = Date.now(), correct = 0, total = 0;
    PAPER.forEach(function (sec) { var r = paperGradeSection(sec.id); correct += r.correct; total += r.total; });
    setText('paper-score', correct + ' / ' + total);
    recordPaperPractice(correct, total, (Date.now() - t0) / 1000);
    toast('本页得分 ' + correct + ' / ' + total + '，已记录');
  }
  function paperReset() {
    document.querySelectorAll('#page-paper .g-input').forEach(function (inp) { inp.value = ''; });
    clearScratch(document.getElementById('page-paper'));
    document.querySelectorAll('#page-paper .paper-item').forEach(function (card) {
      card.classList.remove('right', 'wrong');
      var mk = card.querySelector('.mark'); if (mk) mk.textContent = '';
    });
    document.querySelectorAll('#page-paper .mod-body').forEach(function (b) { b.classList.remove('show-ans'); });
    document.querySelectorAll('#page-paper .sec-score').forEach(function (s) { s.textContent = ''; });
    setText('paper-score', '— / 20');
  }
  function paperRefreshAll() {
    PAPER = paperBuildAll(); paperRender(); paperReset(); toast('已换一批 20 题');
  }
  function paperRefreshSection(id) {
    var idx = -1;
    (PAPER || []).forEach(function (s, i) { if (s.id === id) idx = i; });
    if (idx < 0) return;
    PAPER[idx] = paperBuildSection(PAPER_DEFS[idx]);
    paperRenderSection(id);
    setText(id + '-score', '');
    setText('paper-score', '— / 20');
    toast('这一组已换新题');
  }
  function paperShowAnswers(open) {
    document.querySelectorAll('#page-paper .mod-body').forEach(function (b) { b.classList.toggle('show-ans', !!open); });
  }
  function paperShowSectionAnswers(id, open) {
    var b = document.getElementById(id + '-body');
    if (b) b.classList.toggle('show-ans', !!open);
  }
  function paperClearScratch() {
    clearScratch(document.getElementById('page-paper'));
    toast('草稿已清空');
  }
  var paperExcelLoading = false;
  function ensureExcelJS(cb, fail) {
    if (window.ExcelJS) return cb();
    if (paperExcelLoading) { setTimeout(function () { ensureExcelJS(cb, fail); }, 60); return; }
    paperExcelLoading = true;
    var s = document.createElement('script');
    s.src = 'js/exceljs.min.js';
    s.onload = function () { paperExcelLoading = false; cb(); };
    s.onerror = function () { paperExcelLoading = false; if (fail) fail(new Error('Excel 组件加载失败')); };
    document.head.appendChild(s);
  }
  function paperExcelSheet(wb, name, isAnswer) {
    var ws = wb.addWorksheet(name);
    ws.views = [{ showGridLines: false }];
    [5, 25, 4, 5, 25, 4, 5, 31].forEach(function (w, i) { ws.getColumn(i + 1).width = w; });
    function font(cell, size, bold, color) { cell.font = { name: '微软雅黑', size: size, bold: !!bold, color: { argb: color } }; }
    function border(cell) { cell.border = { top: { style: 'thin', color: { argb: 'FFB7C4D4' } }, left: { style: 'thin', color: { argb: 'FFB7C4D4' } }, bottom: { style: 'thin', color: { argb: 'FFB7C4D4' } }, right: { style: 'thin', color: { argb: 'FFB7C4D4' } } }; }
    function fill(cell, argb) { cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: argb } }; }
    function center(cell, h, v, wrap) { cell.alignment = { horizontal: h || 'center', vertical: v || 'middle', wrapText: !!wrap }; }
    function box(r1, c1, r2, c2, fn) {
      for (var r = r1; r <= r2; r++) for (var c = c1; c <= c2; c++) { var cell = ws.getCell(r, c); border(cell); if (fn) fn(cell); }
    }
    ws.mergeCells(1, 1, 1, 8);
    var title = ws.getCell(1, 1);
    title.value = isAnswer ? '100以内加减法口算练习 · 答案' : '100以内加减法口算练习';
    font(title, 20, true, 'FF1F3864'); center(title); ws.getRow(1).height = 38;
    ws.mergeCells(2, 1, 2, 8);
    var meta = ws.getCell(2, 1);
    meta.value = isAnswer ? '批改日期：____________　　正确：______ / 20' : '姓名：____________　　日期：____________　　用时：______分　　正确：______ 题';
    font(meta, 11, false, 'FF404040'); meta.alignment = { horizontal: 'left', vertical: 'middle', indent: 1 }; ws.getRow(2).height = 22;
    ws.mergeCells(3, 1, 3, 8);
    var hint = ws.getCell(3, 1);
    hint.value = isAnswer ? '答案页：与题目页题号一一对应，可直接对照批改。' : '需要新题时，回到 Elsa 页面点「换一批」再下载；本文件为本次练习。';
    font(hint, 11, true, 'FF9C5700'); center(hint); fill(hint, 'FFFFF3CC'); ws.getRow(3).height = 22;
    ws.getRow(4).height = 8;
    var heads = [['一、不进退位加减（5题）', 1, 2], ['二、进位退位加减（5题）', 4, 5], ['三、连加连减（5题）', 7, 8]];
    heads.forEach(function (h) {
      ws.mergeCells(5, h[1], 5, h[2]);
      var c = ws.getCell(5, h[1]);
      c.value = h[0]; font(c, 12, true, 'FF1F3864'); center(c); fill(c, 'FFDCE9F7');
      box(5, h[1], 5, h[2], function (x) { fill(x, 'FFDCE9F7'); });
    });
    ws.getRow(5).height = 26;
    var anchors = [[1, 2], [4, 5], [7, 8]];
    for (var s = 0; s < 3; s++) {
      for (var k = 0; k < 5; k++) {
        var row = 6 + k, noC = anchors[s][0], prC = anchors[s][1];
        ws.getRow(row).height = 32;
        var no = ws.getCell(row, noC); no.value = k + 1; font(no, 12, true, 'FF808080'); center(no); border(no);
        var pr = ws.getCell(row, prC);
        pr.value = isAnswer ? PAPER[s].items[k].ansText : PAPER[s].items[k].q;
        font(pr, 16, false, isAnswer ? 'FFC00000' : 'FF000000');
        pr.alignment = { horizontal: 'left', vertical: 'middle', indent: 1 }; border(pr);
      }
    }
    ws.getRow(11).height = 8;
    ws.mergeCells(12, 1, 12, 8);
    var h4 = ws.getCell(12, 1);
    h4.value = '四、连加连减填缺数（已给出得数，把缺的数填进括号）（5题）';
    font(h4, 12, true, 'FF1F3864'); center(h4);
    box(12, 1, 12, 8, function (x) { fill(x, 'FFDCE9F7'); });
    ws.getRow(12).height = 26;
    for (var j = 0; j < 5; j++) {
      var r4 = 13 + j;
      ws.getRow(r4).height = 32;
      var n4 = ws.getCell(r4, 1); n4.value = j + 1; font(n4, 12, true, 'FF808080'); center(n4); border(n4);
      ws.mergeCells(r4, 2, r4, 8);
      var p4 = ws.getCell(r4, 2);
      p4.value = isAnswer ? PAPER[3].items[j].ansText : PAPER[3].items[j].q;
      font(p4, 16, false, isAnswer ? 'FFC00000' : 'FF000000');
      p4.alignment = { horizontal: 'left', vertical: 'middle', indent: 1 };
      box(r4, 2, r4, 8);
    }
    ws.getRow(18).height = 8;
    ws.mergeCells(19, 1, 19, 8);
    var note = ws.getCell(19, 1);
    note.value = isAnswer ? '答案页：括号里就是所填的数，对照批改即可。' : '答案见「答案」工作表。';
    font(note, 9, false, 'FF808080'); center(note);
    ws.pageSetup = { paperSize: 9, orientation: 'portrait', fitToPage: true, fitToWidth: 1, fitToHeight: 1, horizontalCentered: true };
    ws.pageSetup.printArea = 'A1:H19';
    ws.pageSetup.margins = { left: 0.5, right: 0.5, top: 0.6, bottom: 0.6, header: 0.3, footer: 0.3 };
    return ws;
  }
  function paperExcelBuffer() {
    var wb = new ExcelJS.Workbook();
    wb.creator = 'Elsa 每日数学小练';
    wb.created = new Date();
    paperExcelSheet(wb, '口算题', false);
    paperExcelSheet(wb, '答案', true);
    return wb.xlsx.writeBuffer();
  }
  function paperStamp() {
    var d = new Date(), p = function (n) { return String(n).padStart(2, '0'); };
    return d.getFullYear() + p(d.getMonth() + 1) + p(d.getDate()) + '_' + p(d.getHours()) + p(d.getMinutes());
  }
  function paperDownloadExcel() {
    if (!PAPER) paperInit();
    toast('正在生成 Excel…');
    ensureExcelJS(function () {
      paperExcelBuffer().then(function (buf) {
        var blob = new Blob([buf], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        var a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = '100以内加减法练习_' + paperStamp() + '.xlsx';
        document.body.appendChild(a); a.click();
        setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1500);
        toast('Excel 已生成');
      }).catch(function (e) { toast('生成 Excel 失败：' + e.message); });
    }, function (e) { toast('Excel 组件加载失败：' + e.message); });
  }

  /* ===== 磨耳朵 · 每日英语听读（100 篇，内置童声朗读音频 listen/audio/NN.mp3） ===== */
  var LISTEN_DONE_KEY = 'listen_done_v1';
  var listenCur = null, listenPlaying = false, listenIdx = -1, listenVoice = null;
  var listenRate = 0.85;
  var listenPitch = 1.35, listenVoiceName = '';
  try { listenRate = parseFloat(localStorage.getItem(pk('listen_rate_v1')) || '') || 0.85; } catch (e) {}
  try { listenPitch = parseFloat(localStorage.getItem(pk('listen_pitch_v1')) || '') || 1.35; } catch (e) {}
  try { listenVoiceName = localStorage.getItem(pk('listen_voice_v1')) || ''; } catch (e) {}
  function listenDoneMap() { try { return JSON.parse(lsGet(LISTEN_DONE_KEY) || '{}') || {}; } catch (e) { return {}; } }
  function listenMarkDone(n) {
    const m = listenDoneMap(); m['a' + n] = Date.now();
    try { localStorage.setItem(pk(LISTEN_DONE_KEY), JSON.stringify(m)); } catch (e) {}
  }
  function listenTodayIndex() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const day = Math.floor((now - start) / 86400000);
    return ((day - 1) % LISTEN_ARTICLES.length + LISTEN_ARTICLES.length) % LISTEN_ARTICLES.length;
  }
  /* ===== 磨耳朵：优先播放页面自带的音频文件 listen/audio/NN.mp3 ===== */
  var LISTEN_USE_FILE = true;
  function listenFileUrl(n) { return 'listen/audio/' + String(n).padStart(2, '0') + '.mp3'; }
  function listenFmtTime(s) {
    if (!isFinite(s) || s < 0) s = 0;
    s = Math.floor(s);
    return Math.floor(s / 60) + ':' + ('0' + (s % 60)).slice(-2);
  }
  function listenProgressPaint(cur, total) {
    const fill = document.getElementById('lp-fill');
    if (fill && total) fill.style.width = Math.min(100, cur / total * 100) + '%';
    const t = document.getElementById('lp-time');
    if (t) t.textContent = listenFmtTime(cur) + ' / ' + listenFmtTime(total);
  }
  function listenProgressShow(show) {
    const p = document.getElementById('lp-progress');
    if (p) p.style.display = show ? 'flex' : 'none';
    if (!show) listenProgressPaint(0, 0);
  }
  function listenSeek(ev) {
    if (!listenAudio || !isFinite(listenAudio.duration) || !listenAudio.duration) return;
    const track = (ev.currentTarget && ev.currentTarget.querySelector('.lp-progress-track')) || ev.currentTarget;
    const r = track.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (ev.clientX - r.left) / r.width));
    listenAudio.currentTime = ratio * listenAudio.duration;
  }
  function listenPlayFile(a, onFail) {
    const url = listenFileUrl(a.n);
    const audio = new Audio(url);
    let ok = false;
    audio.onloadedmetadata = function () {
      ok = true;
      listenAudio = audio;
      audio.playbackRate = listenRate;
      const total = isFinite(audio.duration) && audio.duration > 0 ? audio.duration : 0;
      const sents = listenSents(a.en);
      const tm = (typeof LISTEN_TIMING !== 'undefined' && LISTEN_TIMING[a.n]) || null;
      let starts = [], ends = [];
      if (tm && tm.length === sents.length) {
        starts = tm.map(function (x) { return x[0]; });
        ends = tm.map(function (x) { return x[1]; });
      } else {
        const lens = sents.map(function (s) { return Math.max(6, s.length); });
        const sum = lens.reduce(function (x, y) { return x + y; }, 0) || 1;
        let acc = 0;
        lens.forEach(function (L) { starts.push(acc / sum * total); acc += L; ends.push(acc / sum * total); });
      }
      const box = document.querySelector('#listen-body .ls-text');
      if (box) box.setAttribute('data-file', '1');
      listenProgressShow(true);
      listenProgressPaint(0, total);
      audio.ontimeupdate = function () {
        listenProgressPaint(audio.currentTime, total);
        let hit = -1;
        for (let i = 0; i < ends.length; i++) {
          if (audio.currentTime >= starts[i] && audio.currentTime < ends[i]) { hit = i; break; }
        }
        if (listenIdx !== hit) { listenIdx = hit; listenPaint(true); }
      };
      audio.onended = function () { listenPlaying = false; listenIdx = -1; listenProgressPaint(total, total); listenFinishAll(); };
      audio.onerror = function () { listenPlaying = false; listenProgressShow(false); if (onFail) onFail(); };
      audio.play().catch(function () { listenPlaying = false; if (onFail) onFail(); });
      listenPlaying = true;
      listenPaint(false);
      toast('播放内置音频（' + a.title + '）');
    };
    audio.onerror = function () { if (!ok && onFail) onFail(); };
    audio.load();
  }
  function listenSents(en) {
    return (String(en).match(/[^.!?]+[.!?]*/g) || []).map(function (s) { return s.trim(); }).filter(function (s) { return s.length > 1; });
  }
  // 更清亮的音色优先：小朋友听的女声/童声在前
  var LISTEN_CHILD = ['joelle', 'ana', 'maisie', 'libby', 'sonia', 'kate', 'serena', 'zoe', 'michelle', 'jenny', 'aria', 'emma', 'ava', 'samantha', 'allison', 'susan', 'zira', 'karen', 'moira', 'google uk english female', 'google us english'];
  function listenVoiceScore(v) {
    const n = (v.name || '').toLowerCase();
    const lang = (v.lang || '').replace('_', '-').toLowerCase();
    let s = 0;
    const idx = LISTEN_CHILD.findIndex(function (k) { return n.indexOf(k) >= 0; });
    if (idx >= 0) s += 100 - idx * 2;
    if (/joelle/.test(n)) s += 80;                 // Joelle：用户点名要的音色，有就优先
    if (lang.indexOf('en-gb') === 0) s += 45;
    else if (lang.indexOf('en') === 0) s += 12;
    else s -= 50;
    if (/natural|enhanced|premium|neural/.test(n)) s += 18;
    if (/child|kid|junior|girl/.test(n)) s += 40;
    return s;
  }
  function listenAllVoices() {
    if (!('speechSynthesis' in window)) return [];
    try { return window.speechSynthesis.getVoices() || []; } catch (e) { return []; }
  }
  function listenEnVoices() {
    const vs = listenAllVoices().filter(function (v) { return (v.lang || '').toLowerCase().indexOf('en') === 0; });
    return vs.slice().sort(function (a, b) { return listenVoiceScore(b) - listenVoiceScore(a); });
  }
  // 有的系统会把音色标成别的语言，所以下拉里连「其它语言」一起列
  function listenVoiceGroups() {
    const all = listenAllVoices();
    const en = all.filter(function (v) { return (v.lang || '').toLowerCase().indexOf('en') === 0; })
      .sort(function (a, b) { return listenVoiceScore(b) - listenVoiceScore(a); });
    const other = all.filter(function (v) { return (v.lang || '').toLowerCase().indexOf('en') !== 0; })
      .sort(function (a, b) { return String(a.lang + a.name).localeCompare(String(b.lang + b.name)); });
    return { en: en, other: other, all: all };
  }
  function listenWarmupVoices() {
    try { window.speechSynthesis.getVoices(); } catch (e) {}
    setTimeout(listenRefreshVoiceUI, 60);
    setTimeout(listenRefreshVoiceUI, 700);
    setTimeout(listenRefreshVoiceUI, 2000);
  }
  function listenVoiceDump() {
    const g = listenVoiceGroups();
    const names = g.all.map(function (v) { return v.name + ' [' + v.lang + ']'; });
    try { alert('检测到 ' + g.all.length + ' 个语音（英语 ' + g.en.length + ' 个）\n\n' + names.join('\n')); }
    catch (e) { toast('共 ' + g.all.length + ' 个语音'); }
    return names.length;
  }
  function listenPickVoice() {
    const all = listenAllVoices();
    if (!all.length) return null;
    if (listenVoiceName) {
      const hit = all.filter(function (v) { return v.name === listenVoiceName; })[0];
      if (hit) return hit;
    }
    const joelle = all.filter(function (v) { return (v.name || '').toLowerCase().indexOf('joelle') >= 0; })[0];
    if (joelle) return joelle;
    const vs = listenEnVoices();
    return vs.length ? vs[0] : all[0];
  }
  function listenVoiceNote() {
    if (!('speechSynthesis' in window)) return '这台设备不支持朗读（请用 Safari / Chrome 打开）';
    listenVoice = listenPickVoice();
    if (!listenVoice) return '没找到英语语音：可在 iPad「设置 → 辅助功能 → 朗读内容 → 声音 → 英语」里多下载几个';
    return '当前音色：' + listenVoice.name;
  }
  function listenSetPitch(p) {
    listenPitch = p;
    try { localStorage.setItem(pk('listen_pitch_v1'), String(p)); } catch (e) {}
    const box = document.getElementById('listen-body');
    if (box) box.querySelectorAll('.lp-pitch').forEach(function (b) { b.classList.toggle('on', +b.getAttribute('data-p') === p); });
    if (listenPlaying) { listenStop(true); listenSpeakAt(listenIdx); }
  }
  function listenSetVoiceName(name) {
    listenVoiceName = name;
    try { localStorage.setItem(pk('listen_voice_v1'), name); } catch (e) {}
    listenVoice = listenPickVoice();
    const note = document.getElementById('lp-note');
    if (note) note.textContent = '当前音色：' + (listenVoice ? listenVoice.name : name);
    listenPreview();
  }
  function listenPreview() {
    if (listenEngine === 'online') { listenTtsSpeak('Hello! I am your English reading friend. Let us read together!', null, function (e) { toast('在线音色试听失败：' + (e && e.message ? e.message : e)); }); return; }
    if (!('speechSynthesis' in window)) return;
    listenWarmupVoices();
    try { window.speechSynthesis.cancel(); } catch (e) {}
    const u = new SpeechSynthesisUtterance('Hello! I am your English reading friend. Let us read together!');
    if (!listenVoice) listenVoice = listenPickVoice();
    if (listenVoice) u.voice = listenVoice;
    u.lang = (listenVoice && listenVoice.lang) || 'en-GB';
    u.rate = listenRate;
    u.pitch = listenPitch;
    window.speechSynthesis.speak(u);
  }
  function listenStop(keepSentence) {
    try { if ('speechSynthesis' in window) window.speechSynthesis.cancel(); } catch (e) {}
    try { if (listenAudio) { listenAudio.pause(); listenAudio = null; } } catch (e) {}
    listenPlaying = false;
    if (!keepSentence) listenIdx = -1;
    listenProgressShow(false);
    listenPaint(true);
  }
  function listenPause() {
    try { window.speechSynthesis.pause(); } catch (e) {}
    try { if (listenAudio) listenAudio.pause(); } catch (e) {}
    listenPlaying = false;
    listenPaint(true);
  }
  function listenResume() {
    if (listenAudio && !listenAudio.ended) {
      const pr = listenAudio.play();
      if (pr && pr.catch) pr.catch(function () {});
      listenPlaying = true; listenPaint(true); return;
    }
    if (listenEngine === 'online') { listenPlaySentence(listenIdx < 0 ? 0 : listenIdx); return; }
    if (window.speechSynthesis.paused) { window.speechSynthesis.resume(); listenPlaying = true; listenPaint(true); return; }
    listenSpeakAt(listenIdx < 0 ? 0 : listenIdx);
  }
  function listenToggle() {
    if (!listenCur) return;
    if (listenPlaying) { listenPause(); return; }
    if (LISTEN_USE_FILE && listenEngine === 'sys' && !listenPlaying && listenIdx < 0) {
      listenPlayFile(listenCur, function () { LISTEN_USE_FILE = false; listenResume(); });
      return;
    }
    listenResume();
  }
  function listenSpeakFrom(i) { listenSpeakAt(i); }
  function listenSpeakAt(i) {
    if (!listenCur) return;
    if (listenEngine === 'online') { listenPlaySentence(i); return; }
    const list = listenSents(listenCur.en);
    if (i >= list.length) {
      listenPlaying = false; listenIdx = -1;
      listenMarkDone(listenCur.n);
      if (typeof completeModule === 'function') completeModule('listen', '磨耳朵', 3, '听完《' + listenCur.title + '》');
      toast('👏 听完一篇！已记录打卡');
      listenPaint(true);
      return;
    }
    listenIdx = i;
    listenPlaying = true;
    listenPaint(false);
    const u = new SpeechSynthesisUtterance(list[i]);
    if (!listenVoice) listenVoice = listenPickVoice();
    if (listenVoice) u.voice = listenVoice;
    u.lang = (listenVoice && listenVoice.lang) || 'en-GB';
    u.rate = listenRate;
    u.pitch = listenPitch;
    u.onend = function () { if (listenPlaying) listenSpeakAt(i + 1); };
    u.onerror = function () { listenPlaying = false; listenPaint(true); };
    try { window.speechSynthesis.speak(u); } catch (e) { listenPlaying = false; toast('朗读失败：' + e.message); }
  }
  function listenPaint(updateBtn) {
    const box = document.getElementById('listen-body');
    if (!box) return;
    box.querySelectorAll('.ls-sent').forEach(function (el) {
      el.classList.toggle('on', +el.getAttribute('data-i') === listenIdx);
    });
    const b = document.getElementById('lp-play');
    if (b) b.textContent = listenPlaying ? '⏸ 暂停' : (listenIdx >= 0 ? '▶ 继续' : '▶ 播放');
  }
  function listenSetRate(r) {
    listenRate = r;
    try { localStorage.setItem(pk('listen_rate_v1'), String(r)); } catch (e) {}
    const box = document.getElementById('listen-body');
    if (box) box.querySelectorAll('.lp-rate').forEach(function (b) { b.classList.toggle('on', +b.getAttribute('data-r') === r); });
    if (listenAudio) { try { listenAudio.playbackRate = r; } catch (e) {} return; }
    if (listenPlaying) { listenStop(true); listenSpeakAt(listenIdx); }
  }
  function renderListen() {
    const box = document.getElementById('listen-body');
    if (!box || box.getAttribute('data-mode') === 'list') return;
    const done = listenDoneMap();
    const ti = listenTodayIndex();
    const t = LISTEN_ARTICLES[ti];
    let h = '<div class="listen-card"><div class="listen-today-h">☀️ 今日一篇（第 ' + t.n + ' 篇）</div>' +
      '<div class="listen-grid"><div class="listen-item" onclick="openListenArticle(' + t.n + ')">' +
      '<img src="' + t.img + '" loading="lazy" alt=""><div class="li-t"><span class="li-n">#' + t.n + '</span> ' + escapeHtml(t.title) + '</div></div></div></div>';
    h += '<div class="listen-card"><div class="listen-today-h">📚 全部 100 篇（已听 ' + Object.keys(done).length + ' 篇）</div><div class="listen-grid">';
    LISTEN_ARTICLES.forEach(function (a) {
      h += '<div class="listen-item' + (done['a' + a.n] ? ' done' : '') + '" onclick="openListenArticle(' + a.n + ')">' +
        '<img src="' + a.img + '" loading="lazy" alt=""><div class="li-t"><span class="li-n">#' + a.n + '</span> ' + escapeHtml(a.title) + '</div></div>';
    });
    h += '</div></div>';
    h += ximalayaHTML();
    h += peppaHTML();
    box.setAttribute('data-mode', 'list');
    box.innerHTML = h;
    window.scrollTo(0, 0);
  }
  var LISTEN_PEPPA = [
    { t: '小猪佩奇 1-4 季 · 英文版（免费）', d: '儿童每日听力，一集几分钟', u: 'https://www.ximalaya.com/album/81454758' },
    { t: '小猪佩奇（英文版）全集', d: '英文原声，适合磨耳朵', u: 'https://www.ximalaya.com/album/56538347' },
    { t: '小猪佩奇 第一季（英文版）', d: '从第一季开始听', u: 'https://www.ximalaya.com/ertong/35258643/' },
    { t: '小猪佩奇 中英双语动画音频', d: '英文 + 中文对照', u: 'https://www.ximalaya.com/ertong/33829026/' }
  ];
  function peppaHTML() {
    let h = '<div class="listen-card ximalaya-card"><div class="xm-title">🐷 小猪佩奇 · 英文音频（喜马拉雅）</div>' +
      '<div class="xm-note">佩奇是版权内容，页面里不能直接放它的音频，但喜马拉雅上有很多免费专辑，点开就能听原声。</div>';
    LISTEN_PEPPA.forEach(function (a) {
      h += '<a class="xm-link" href="' + a.u + '" target="_blank" rel="noopener">▶ <b>' + escapeHtml(a.t) + '</b><span>' + escapeHtml(a.d) + '</span></a>';
    });
    h += '</div>';
    return h;
  }
  var LISTEN_XIMALAYA = [
    { t: '每日英语听读小短文100篇', d: '和这本书同名的专辑（喜马拉雅）', u: 'https://www.ximalaya.com/album/86858599' },
    { t: '英语小短文100篇（儿童频道）', d: '少儿主播朗读，语速偏慢', u: 'https://www.ximalaya.com/ertong/16217760/' },
    { t: '英语小短文朗读（儿童）', d: '另一版儿童朗读', u: 'https://www.ximalaya.com/ertong/16532061/' },
    { t: '100篇最美英语晨读美文', d: '晨读美文，适合磨耳朵', u: 'https://www.ximalaya.com/waiyu/9544843/' }
  ];
  function ximalayaHTML() {
    let h = '<div class="listen-card ximalaya-card"><div class="xm-title">🎧 喜马拉雅 · 现成音频专辑（点开直接听）</div>' +
      '<div class="xm-note">这些是别人已经录好的音频，点开会跳到喜马拉雅（App 或浏览器）播放。版权音频不能直接搬进本页，所以这里做成一键入口；本页自带的朗读照常可用。</div>';
    LISTEN_XIMALAYA.forEach(function (a) {
      h += '<a class="xm-link" href="' + a.u + '" target="_blank" rel="noopener">▶ <b>' + escapeHtml(a.t) + '</b><span>' + escapeHtml(a.d) + '</span></a>';
    });
    h += '</div>';
    return h;
  }
  function openListenArticle(n) {
    const a = LISTEN_ARTICLES.filter(function (x) { return x.n === n; })[0];
    if (!a) return;
    listenStop();
    listenCur = a;
    const sents = listenSents(a.en);
    let h = '<div class="listen-back"><button onclick="renderListen()">← 返回目录</button></div>';
    h += '<div class="listen-card">';
    h += '<img class="listen-hero" src="' + a.img + '" alt="">';
    h += '<div class="listen-title">' + escapeHtml(a.title) + '</div>';
    h += '<div class="listen-player">' +
      '<button class="pri" id="lp-play" onclick="listenToggle()">▶ 播放</button>' +
      '<button onclick="listenStop()">⏹ 停止</button>' +
      '<span class="lp-lab">语速</span>' +
      '<button class="lp-rate' + (Math.abs(listenRate - 0.7) < 0.01 ? ' on' : '') + '" data-r="0.7" onclick="listenSetRate(0.7)">慢</button>' +
      '<button class="lp-rate' + (Math.abs(listenRate - 0.85) < 0.01 ? ' on' : '') + '" data-r="0.85" onclick="listenSetRate(0.85)">中</button>' +
      '<button class="lp-rate' + (Math.abs(listenRate - 1) < 0.01 ? ' on' : '') + '" data-r="1" onclick="listenSetRate(1)">快</button>' +
      '<div class="lp-progress" id="lp-progress" style="display:none" onclick="listenSeek(event)">' +
      '<div class="lp-progress-track"><div class="lp-progress-fill" id="lp-fill"></div></div>' +
      '<span class="lp-time" id="lp-time"></span></div>' +
      '</div>';
    h += '<div class="ls-text">' + sents.map(function (s, i) {
      return '<span class="ls-sent" data-i="' + i + '" onclick="listenSpeakFrom(' + i + ')">' + escapeHtml(s) + '</span> ';
    }).join('') + '</div>';
    h += '<div class="listen-done-btn"><button class="primary-btn" onclick="listenMarkDone(' + a.n + ');toast(\'✅ 已记录：第 ' + a.n + ' 篇听完啦\')">✅ 我听完了</button></div>';
    h += '<div class="listen-sec"><h3>🔤 生词</h3><div class="ls-row">' + (a.words.length ? a.words.map(function (w) {
      return '<b>' + escapeHtml(w[0]) + '</b>' + (w[1] ? ' ' + escapeHtml(w[1]) : '');
    }).join('　·　') : '（本篇未识别到生词）') + '</div></div>';
    if (a.q.length) {
      h += '<div class="listen-sec"><h3>❓ 问题</h3><div class="ls-row">' + a.q.map(function (q, i) {
        return (i + 1) + '. ' + escapeHtml(String(q).replace(/^\s*[0-9Il]+\s*[.、．]\s*/, '')) + (a.qZh[i] ? '　<span style="color:#8aa0b5">' + escapeHtml(a.qZh[i]) + '</span>' : '');
      }).join('<br>') + '</div></div>';
    }
    h += '<div class="listen-sec"><h3>📖 参考译文</h3><div class="listen-zh">' + escapeHtml(a.zh) + '</div></div>';
    h += '</div>';
    h += ximalayaHTML();
    h += peppaHTML();
    const box = document.getElementById('listen-body');
    box.setAttribute('data-mode', 'one');
    box.innerHTML = h;
    window.scrollTo(0, 0);
  }
  /* ===== 磨耳朵：在线语音（可选，音色更自然） ===== */
  var LISTEN_TTS_VOICES = ['nova', 'shimmer', 'coral', 'sage', 'alloy', 'echo', 'fable', 'onyx'];
  var listenEngine = 'sys', listenTtsVoice = 'nova', listenTtsModel = 'gpt-4o-mini-tts';
  try { listenEngine = localStorage.getItem(pk('listen_engine_v1')) || 'sys'; } catch (e) {}
  try { listenTtsVoice = localStorage.getItem(pk('listen_tts_voice_v1')) || 'nova'; } catch (e) {}
  var listenAudio = null, listenCache = {};
  function listenTtsUrl(u) {
    let url = (u || '').trim().replace(/\/+$/, '').replace(/\/chat\/completions$/, '').replace(/\/audio\/speech$/, '');
    if (/\/v\d+$/.test(url)) return url + '/audio/speech';
    if (/^https?:\/\/[^\/]+$/.test(url)) return url + '/v1/audio/speech';
    return url + '/audio/speech';
  }
  function listenSetEngine(e) {
    if (e === 'online') {
      const c = aiCfg();
      if (!c.key || !c.url) { openAiSettings(); toast('在线音色需要先在 AI 设置里填好接口地址和 Key'); return; }
    }
    listenStop(true);
    listenEngine = e;
    try { localStorage.setItem(pk('listen_engine_v1'), e); } catch (er) {}
    if (listenCur) openListenArticle(listenCur.n);
  }
  function listenSetTtsVoice(v) {
    listenTtsVoice = v;
    try { localStorage.setItem(pk('listen_tts_voice_v1'), v); } catch (e) {}
    listenPreview();
  }
  function listenPlayUrl(url, onEnd, onErr) {
    try {
      if (listenAudio) { listenAudio.pause(); listenAudio = null; }
      const a = new Audio(url);
      a.playbackRate = listenRate;
      a.onended = function () { if (listenPlaying && onEnd) onEnd(); };
      a.onerror = function () { if (onErr) onErr(new Error('音频播放失败')); };
      listenAudio = a;
      const pr = a.play();
      if (pr && pr.catch) pr.catch(function (e) { if (onErr) onErr(e); });
    } catch (e) { if (onErr) onErr(e); }
  }
  function listenTtsSpeak(text, onEnd, onErr) {
    const c = aiCfg();
    if (!c.key || !c.url) { if (onErr) onErr(new Error('还没配置 AI 接口（点右上角齿轮）')); return; }
    const key = listenTtsVoice + '|' + text;
    if (listenCache[key]) { listenPlayUrl(listenCache[key], onEnd, onErr); return; }
    const body = { model: listenTtsModel, input: text, voice: listenTtsVoice, response_format: 'mp3' };
    fetch(listenTtsUrl(c.url), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + c.key },
      body: JSON.stringify(body)
    }).then(function (res) {
      if (!res.ok) return res.text().then(function (raw) { throw new Error('HTTP ' + res.status + '：' + String(raw).slice(0, 100)); });
      return res.blob();
    }).then(function (blob) {
      const url = URL.createObjectURL(blob);
      listenCache[key] = url;
      listenPlayUrl(url, onEnd, onErr);
    }).catch(function (e) { if (onErr) onErr(e); });
  }
  function listenFinishAll() {
    listenPlaying = false; listenIdx = -1;
    if (listenCur) listenMarkDone(listenCur.n);
    if (typeof completeModule === 'function' && listenCur) completeModule('listen', '磨耳朵', 3, '听完《' + listenCur.title + '》');
    toast('听完一篇！已记录打卡');
    listenPaint(true);
  }
  function listenPlaySentence(i) {
    const list = listenSents(listenCur.en);
    if (i >= list.length) { listenFinishAll(); return; }
    listenIdx = i; listenPlaying = true; listenPaint(false);
    listenTtsSpeak(list[i], function () { if (listenPlaying) listenPlaySentence(i + 1); }, function (e) {
      listenPlaying = false;
      listenEngine = 'sys';
      try { localStorage.setItem(pk('listen_engine_v1'), 'sys'); } catch (er) {}
      toast('在线音色不可用，已切回设备语音：' + (e && e.message ? e.message : e));
      if (listenCur) openListenArticle(listenCur.n);
    });
  }
  function listenRefreshVoiceUI() {
    listenVoice = listenPickVoice();
    const sel = document.getElementById('lp-voice-sel');
    const g = listenVoiceGroups();
    if (sel) {
      const cur = (listenVoice && listenVoice.name) || '';
      const opt = function (v) {
        return '<option value="' + escapeHtml(v.name) + '"' + (v.name === cur ? ' selected' : '') + '>' + escapeHtml(v.name) + ' [' + escapeHtml(v.lang || '') + ']</option>';
      };
      let h = g.en.map(opt).join('');
      if (g.other.length) h += '<option disabled>──── 其它语言 ────</option>' + g.other.map(opt).join('');
      sel.innerHTML = h;
    }
    const note = document.getElementById('lp-note');
    if (note) note.innerHTML = escapeHtml(listenVoiceNote()) + '　·　' + escapeHtml(listenJoelleHint()) +
      '　·　语音检测：共 ' + g.all.length + ' 个（英语 ' + g.en.length + '）';
  }
  function listenJoelleHint() {
    const all = listenAllVoices();
    const hit = all.filter(function (v) { return (v.name || '').toLowerCase().indexOf('joelle') >= 0; })[0];
    if (hit) return 'Joelle 已就绪 ✓（' + hit.lang + '）';
    if (!all.length) return '这台设备还没给出语音列表：先点「🔊 试听音色」，再点「🔄 刷新音色」';
    return '系统没把 Joelle 交给网页（已检测 ' + all.length + ' 个语音）：点「🔍 全部音色」把列表截图发我';
  }
  function listenReloadVoices() {
    listenWarmupVoices();
    listenRefreshVoiceUI();
    const vs = listenEnVoices();
    toast('已刷新：共 ' + vs.length + ' 个英语音色' + (vs.length ? '（当前 ' + (listenVoice ? listenVoice.name : '-') + '）' : ''));
  }
  if ('speechSynthesis' in window) {
    try { window.speechSynthesis.onvoiceschanged = function () { listenRefreshVoiceUI(); }; } catch (e) {}
    setTimeout(listenRefreshVoiceUI, 400);
    setTimeout(listenRefreshVoiceUI, 1500);
  }

  function initCalc() {
    const wrap = document.getElementById('calc-modules');
    CALC.forEach((m, i) => { const s = document.createElement('section'); s.className = 'mod'; s.id = m.id; s.innerHTML = buildCalcModule(m, i + 1); wrap.appendChild(s); });
    initScratchCanvases();
  }
  function initThink() {
    const toc = document.getElementById('toc-links');
    const secs = document.getElementById('sections');
    TYPES.forEach((t, i) => {
      const a = document.createElement('a'); a.href = '#' + t.id; a.textContent = (i + 1) + ' ' + t.title; toc.appendChild(a);
      const sec = document.createElement('section'); sec.className = 'type'; sec.id = t.id; sec.innerHTML = buildSection(t, i + 1); secs.appendChild(sec);
    });
    updateAddedMarks(); updateWrongBadge();
  }

  document.addEventListener('click', function (e) {
    if (!e.target.closest) return;
    const btn = e.target.closest('.add-wrong');
    if (btn) { addWrong(btn.getAttribute('data-type'), +btn.getAttribute('data-i')); return; }
    const opt = e.target.closest('.mc-opt');
    if (opt) {
      const parent = opt.parentNode;
      parent.querySelectorAll('.mc-opt').forEach(o => o.classList.remove('sel'));
      opt.classList.add('sel');
    }
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeWrongBook(); });
  // 点弹窗外面的暗色区域也能关掉，iPad 上更好退出
  document.querySelectorAll('.modal-backdrop').forEach(function (bd) {
    bd.addEventListener('click', function (e) {
      if (e.target === bd) bd.classList.remove('show');
    });
  });

  /* ============ 多孩子工作区 ============ */

  /* ===== 版本与设置：统一收进右上角齿轮菜单 ===== */
  function forceReload() {
    try { if ('caches' in window) { caches.keys().then(function (ks) { ks.forEach(function (k) { caches.delete(k); }); }); } } catch (e) {}
    try { if (navigator.serviceWorker) { navigator.serviceWorker.getRegistrations().then(function (rs) { rs.forEach(function (r) { r.update(); }); }); } } catch (e) {}
    const base = location.pathname + location.search.replace(/[?&]v=\d+/, '');
    location.href = base + (base.indexOf('?') >= 0 ? '&' : '?') + 'v=' + Date.now();
  }
  function renderBuildBadge() {
    const el = document.getElementById('sp-build');
    if (el) el.textContent = BUILD_TAG;
  }
  function toggleSettingsMenu(force) {
    const p = document.getElementById('settings-panel');
    const btn = document.getElementById('ai-quick-btn');
    if (!p) return;
    const open = (typeof force === 'boolean') ? force : !p.classList.contains('open');
    p.classList.toggle('open', open);
    if (btn) btn.classList.toggle('on', open);
    renderBuildBadge();
  }
  function closeSettingsMenu() { toggleSettingsMenu(false); }
  document.addEventListener('click', function (e) {
    const p = document.getElementById('settings-panel');
    const btn = document.getElementById('ai-quick-btn');
    if (!p || !p.classList.contains('open')) return;
    if (!p.contains(e.target) && btn && !btn.contains(e.target)) closeSettingsMenu();
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeSettingsMenu(); });

  function curProfile() { return PROFILES[PROFILE_ID] || PROFILES.elsa; }
  function switchProfile(id) {
    if (!PROFILES[id] || id === PROFILE_ID) return;
    try { localStorage.setItem(PROFILE_KEY, id); } catch (e) {}
    PROFILE_ID = id;
    location.reload();
  }
  function renderModuleGrid() {
    const grid = document.getElementById('module-grid');
    if (!grid) return;
    grid.innerHTML = curProfile().modules.map(function (m) {
      return '<button type="button" class="module-card"' + (m.tint ? ' style="background:' + m.tint + '"' : '') + ' onclick="' + m.act + '">' +
        '<span class="mi">' + m.icon + '</span>' +
        '<div class="mt">' + escapeHtml(m.title) + '</div>' +
        '<div class="ms">' + escapeHtml(m.sub) + '</div></button>';
    }).join('');
  }
  /* ===== 英语词组「中英互测」模块 ===== */
  // ===== 词组计分：每题 5 分、满分 100；记录每次成绩，进步给奖励 =====
  var PH_HIST_KEY = 'ph_hist_v1';
  function phHist() { try { return JSON.parse(lsGet(PH_HIST_KEY) || '[]') || []; } catch (e) { return []; } }
  function phKeyOf() { return 'U' + phUnit + 'G' + phGroup + '-' + phMode; }
  function phStatOf() {
    const list = phHist().filter(function (x) { return x.k === phKeyOf(); });
    if (!list.length) return { last: null, best: null, n: 0 };
    return {
      last: list[list.length - 1].s,
      best: Math.max.apply(null, list.map(function (x) { return x.s; })),
      n: list.length
    };
  }
  function phStatLine() {
    let el = document.getElementById('ph-stat');
    if (el) return el;
    el = document.createElement('p');
    el.className = 'recite-count';
    el.id = 'ph-stat';
    const bar = document.querySelector('#page-module .recite-bar.units');
    if (bar && bar.parentNode) bar.parentNode.insertBefore(el, bar.nextSibling);
    return el;
  }
  function phRefreshStat() {
    const st = phStatOf();
    const el = document.getElementById('ph-stat');
    if (!el) return;
    if (st.last === null) { el.textContent = '本题组还没有成绩记录，批改后就会记录在这里'; return; }
    el.textContent = '上次 ' + st.last + ' 分　·　最好 ' + st.best + ' 分　·　共练 ' + st.n + ' 次';
  }
  function phAfterGrading(correct, total) {
    const score = total ? Math.round(correct / total * 100) : 0;
    const before = phStatOf();
    let list = phHist();
    list.push({ k: phKeyOf(), s: score, t: Date.now() });
    if (list.length > 300) list = list.slice(-300);
    try { localStorage.setItem(pk(PH_HIST_KEY), JSON.stringify(list)); } catch (e) {}
    const sc = document.getElementById('generic-score');
    if (sc) sc.textContent = '本次 ' + score + ' / 100（答对 ' + correct + '/' + total + '，按比例折算）';
    phStatLine();
    phRenderPodium();
    phRefreshStat();
    if (before.last !== null && score > before.last) {
      const gain = score - before.last;
      completeModule(curGeneric.cfg.id, curGeneric.cfg.name, 5, '比上次提高 ' + gain + ' 分');
      toast('👏 比上次提高 ' + gain + ' 分，奖励 +5⭐');
    } else if (before.best !== null && score > before.best) {
      toast('🎉 刷新最好成绩：' + score + ' 分！');
    } else if (before.last !== null && score < before.last) {
      toast('这次 ' + score + ' 分，比上次低 ' + (before.last - score) + ' 分，再来一次会更好');
    } else {
      toast('本次 ' + score + ' 分，已记录');
    }
  }
  // ===== 冠亚季军奖台：列出本题组（单元+方向）成绩最好的三次及时间 =====
  (function () {
    if (document.getElementById('ph-podium-css')) return;
    var st = document.createElement('style');
    st.id = 'ph-podium-css';
    st.textContent = [
      '#ph-top-wrap { display:flex; gap:18px; align-items:flex-start; flex-wrap:wrap; margin:6px 0 10px; }',
      '#ph-top-left { flex:1 1 320px; min-width:260px; }',
      '#ph-top-right { flex:0 0 auto; min-width:276px; background:#fff; border:1px solid #e3edf7; border-radius:16px; padding:10px 12px 18px; box-shadow:0 2px 10px rgba(58,110,165,.06); }',
      '.ph-pod-title { font-size:13px; color:#3a6ea5; font-weight:700; margin-bottom:8px; }',
      '.ph-podium { display:flex; flex-wrap:nowrap; align-items:flex-end; gap:8px; justify-content:center; padding-bottom:2px; }',
      '.ph-pod-col { width:64px; flex:0 0 auto; text-align:center; border-radius:12px 12px 0 0; padding:6px 4px 8px; color:#fff; box-shadow:0 2px 8px rgba(95,75,82,.14); }',
      '.ph-pod-col.gold { background:linear-gradient(180deg,#f7cf6b,#dfa423); min-height:120px; }',
      '.ph-pod-col.silver { background:linear-gradient(180deg,#e2e6ea,#b6bec7); min-height:102px; }',
      '.ph-pod-col.bronze { background:linear-gradient(180deg,#e8bd92,#c8874d); min-height:88px; }',
      '.ph-pod-medal { font-size:20px; line-height:1.1; }',
      '.ph-pod-score { font-size:19px; font-weight:800; line-height:1.25; }',
      '.ph-pod-time { font-size:10px; opacity:.96; line-height:1.35; }',
      '.ph-pod-base { font-size:10px; opacity:.9; margin-top:6px; padding-bottom:2px; }',
      '.ph-pod-empty { color:#8aa0b5; font-size:13px; text-align:center; padding:16px 8px; border:1px dashed #dbe7f3; border-radius:12px; line-height:1.7; }',
      '@media (max-width:700px) { #ph-top-right { min-width:0; width:100%; } .ph-pod-col { width:64px; } }'
    ].join('\n');
    document.head.appendChild(st);
  })();
  function phPodiumHTML() {
    const list = phHist().filter(function (x) { return x.k === phKeyOf(); });
    if (!list.length) return '<div class="ph-pod-title">🏆 前三名成绩</div><div class="ph-pod-empty">还没有成绩记录<br>批改一次就会出现在这里</div>';
    const sorted = list.slice().sort(function (a, b) { return b.s - a.s || a.t - b.t; });
    const top = sorted.slice(0, 3);
    const cls = ['gold', 'silver', 'bronze'];
    const medal = ['🥇', '🥈', '🥉'];
    const rank = ['第1名', '第2名', '第3名'];
    let cols = '';
    top.forEach(function (x, i) {
      const d = new Date(x.t);
      const time = (d.getMonth() + 1) + '月' + d.getDate() + '日<br>' + String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
      cols += '<div class="ph-pod-col ' + cls[i] + '"><div class="ph-pod-medal">' + medal[i] + '</div><div class="ph-pod-score">' + x.s + '</div><div class="ph-pod-time">' + time + '</div><div class="ph-pod-base">' + rank[i] + '</div></div>';
    });
    return '<div class="ph-pod-title">🏆 前三名成绩（本单元 · 本方向）</div><div class="ph-podium">' + cols + '</div>';
  }
  function phRenderPodium() {
    const un = document.querySelector('#page-module .recite-bar.units');
    if (!un) return;
    let host = document.getElementById('ph-top-wrap');
    if (!host || !host.contains(un)) {
      const old = document.getElementById('ph-top-wrap');
      if (old) old.parentNode.removeChild(old);
      host = document.createElement('div');
      host.id = 'ph-top-wrap';
      un.parentNode.insertBefore(host, un);
      const left = document.createElement('div');
      left.id = 'ph-top-left';
      host.appendChild(left);
      left.appendChild(un);
      const stat = phStatLine();
      if (stat) left.appendChild(stat);
      const cnt = document.querySelector('#page-module .recite-count:not(#ph-stat)');
      if (cnt) left.appendChild(cnt);
      const right = document.createElement('div');
      right.id = 'ph-top-right';
      host.appendChild(right);
    }
    document.getElementById('ph-top-right').innerHTML = phPodiumHTML();
    phRefreshStat();
  }
  let phUnit = '1', phMode = 'zh-en';
  let phGroup = 1;
  function phUnits() { return Object.keys(ORAL_UNITS); }
  function phSetUnit(u) { phUnit = u; refreshGeneric(); }
  function phSetMode(m) { phMode = m; refreshGeneric(); }
  function phSetGroup(g) { phGroup = g; refreshGeneric(); }
  // 把整个单元平均切成 3 组，保证所有词组都能练到
  function phSplit(list) {
    const n = list.length, out = [];
    for (let g = 0; g < 3; g++) {
      out.push(list.slice(Math.round(n * g / 3), Math.round(n * (g + 1) / 3)));
    }
    return out;
  }
  function phGroupList(u, g) { return phSplit(ORAL_UNITS[u] || [])[(g || phGroup) - 1] || []; }
  function phItems() {
    return phGroupList(phUnit).map(function (x) {
      return { zh: x[0], en: x[1], q: phMode === 'zh-en' ? x[0] : x[1], ans: phMode === 'zh-en' ? x[1] : x[0] };
    });
  }
  // 整单元一览：按 3 组把全部词组列出来，方便对照背诵与打印
  function phUnitListHTML() {
    const list = ORAL_UNITS[phUnit] || [];
    let h = '<details class="ph-all"><summary>📋 本单元全部词组（共 ' + list.length + ' 个 · 分 3 组，点开对照）</summary><div class="ph-all-body">';
    phSplit(list).forEach(function (part, i) {
      h += '<div class="ph-all-group">第 ' + (i + 1) + ' 组　' + part.length + ' 个</div><ol class="ph-all-ol">';
      part.forEach(function (x) {
        h += '<li><span class="ph-zh">' + escapeHtml(x[0]) + '</span><span class="ph-en">' + escapeHtml(x[1]) + '</span></li>';
      });
      h += '</ol>';
    });
    h += '</div></details>';
    return h;
  }
  function phraseBodyHTML(cfg) {
    const items = curGeneric.items || [];
    const tid = cfg.id + '|' + phUnit + '|' + phMode;
    regGeneric(tid, '英语词组 Unit ' + phUnit + (phMode === 'zh-en' ? '（中→英）' : '（英→中）'),
      items.map(function (it) { return { q: it.q, a: it.ans }; }));
    let html = '<div class="grade-bar recite-bar">' + phUnits().map(function (u) {
      return '<button class="' + (u === phUnit ? 'active' : '') + '" onclick="phSetUnit(\'' + u + '\')">Unit ' + u + '</button>';
    }).join('') + '</div>';
    html += '<div class="grade-bar recite-bar units">'
      + '<button class="' + (phMode === 'zh-en' ? 'active' : '') + '" onclick="phSetMode(\'zh-en\')">中 → 英（写英文）</button>'
      + '<button class="' + (phMode === 'en-zh' ? 'active' : '') + '" onclick="phSetMode(\'en-zh\')">英 → 中（写中文）</button></div>';
    html += '<div class="grade-bar recite-bar groups">' + [1, 2, 3].map(function (g) {
      return '<button class="' + (g === phGroup ? 'active' : '') + '" onclick="phSetGroup(' + g + ')">第 ' + g + ' 组</button>';
    }).join('') + '</div>';
    html += '<div class="grade-bar recite-bar"><button class="ph-grade-btn" onclick="gradeGeneric()">✔ 批改本组（第 ' + phGroup + ' 组）</button><span class="score" id="generic-score">— / 100</span></div>';
    html += '<p class="recite-count">本单元共 ' + ((ORAL_UNITS[phUnit] || []).length) + ' 个词组，已按顺序分成 3 组；本组 ' + items.length + ' 个（第 ' + phGroup + ' 组），做完点「批改本组」。<br>每组 100 分制，分数按答对比例折算。</p>';
    html += phUnitListHTML();
    html += '<div class="mod-body text onecol">';
    items.forEach(function (it, i) {
      html += '<div class="calc-item" data-gi="' + i + '"><div class="calc-main">'
        + '<div class="q">' + (i + 1) + '、' + escapeHtml(it.q) + '</div>'
        + '<div class="a-row"><input class="ans-input g-input ph-input" data-i="' + i + '" type="text" placeholder="✏️ ' + (phMode === 'zh-en' ? '写英文短语' : '写中文意思') + '" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"><span class="mark"></span></div>'
        + '<button class="add-wrong" data-type="' + tid + '" data-i="' + i + '">＋错题本</button>'
        + '<div class="reveal">参考答案：' + escapeHtml(it.ans) + '</div></div></div>';
    });
    html += '</div>';
    return html;
  }
  // 按时间动态问候（夜里提醒睡觉）
  function greetWord(h) {
    const t = (h === undefined || h === null) ? new Date().getHours() : h;
    if (t >= 5 && t < 9) return '早上好';
    if (t >= 9 && t < 12) return '上午好';
    if (t >= 12 && t < 14) return '中午好';
    if (t >= 14 && t < 18) return '下午好';
    if (t >= 18 && t < 22) return '晚上好';
    return '夜深了，该睡觉啦';
  }
  function refreshGreeting() { setText('greet-hi', greetWord()); }
  setInterval(refreshGreeting, 60000);
  document.addEventListener('visibilitychange', function () { if (!document.hidden) refreshGreeting(); });
  function applyProfile() {
    const p = curProfile();
    document.body.classList.toggle('theme-shawn', PROFILE_ID === 'shawn');
    refreshGreeting();
    setText('brand-text', p.brand);
    setText('greet-sub', p.sub);
    setText('child-name', childName());
    setText('foot-text', p.foot + '  |  build ' + BUILD_TAG);
    document.querySelectorAll('.p-switch button').forEach(function (b) {
      b.classList.toggle('active', b.getAttribute('data-p') === PROFILE_ID);
    });
    renderModuleGrid();
    renderBottomNav();
  }
  function renderBottomNav() {
    const nav = document.getElementById('bottom-nav');
    if (!nav) return;
    let html = '<button data-page="dashboard" onclick="showPage(\'dashboard\')">🏠<span>首页</span></button>';
    curProfile().modules.forEach(function (m) {
      html += '<button data-page="' + m.id + '" onclick="' + m.act + '">' + m.icon + '<span>' + escapeHtml(m.title) + '</span></button>';
    });
    nav.innerHTML = html;
  }

  /* ============ Shawn：初中内容 ============ */
  function genShawnMath() {
    const t = [];
    t.push(function () { const x = ri(2, 9), a = ri(2, 6), b = ri(1, 12), c = a * x + b; return { q: '解方程：' + a + 'x ＋ ' + b + ' ＝ ' + c + '，x ＝ ？', ans: String(x), key: [x] }; });
    t.push(function () { const x = ri(2, 5), a = ri(1, 2), b = ri(1, 4), c = ri(1, 6), v = a * x * x + b * x + c; return { q: '当 x ＝ ' + x + ' 时，求 ' + a + 'x² ＋ ' + b + 'x ＋ ' + c + ' 的值。', ans: String(v), key: [v] }; });
    t.push(function () { const a = ri(2, 6), d = ri(3, 7), s = [a, a + d, a + 2 * d, a + 3 * d, a + 4 * d, a + 5 * d]; return { q: '找规律填数：' + s[0] + '，' + s[1] + '，' + s[2] + '，' + s[3] + '，____，' + s[5], ans: String(s[4]), key: [s[4]] }; });
    t.push(function () { const a = ri(2, 4), s = [a, a * 2, a * 4, a * 8]; return { q: '找规律填数：' + s[0] + '，' + s[1] + '，' + s[2] + '，____', ans: String(a * 16), key: [a * 16] }; });
    t.push(function () { const v1 = ri(40, 70), v2 = ri(30, 60), t0 = ri(2, 5), S = (v1 + v2) * t0; return { q: '甲乙两地相距 ' + S + ' 千米。两车同时从两地相向开出，速度分别是 ' + v1 + ' 千米/时和 ' + v2 + ' 千米/时，几小时后相遇？', ans: t0 + ' 小时', key: [t0] }; });
    t.push(function () { const v1 = ri(50, 80), v2 = ri(30, 45), t0 = ri(2, 5), d = (v1 - v2) * t0; return { q: '甲的速度 ' + v1 + ' 千米/时，乙的速度 ' + v2 + ' 千米/时，乙在甲前方 ' + d + ' 千米。甲追上乙需要几小时？', ans: t0 + ' 小时', key: [t0] }; });
    t.push(function () { const set = [[6, 3, 2], [12, 4, 3], [10, 15, 6], [12, 6, 4], [20, 5, 4], [4, 4, 2], [8, 8, 4], [15, 10, 6]]; const c = pick(set); return { q: '一项工程，甲单独做要 ' + c[0] + ' 天，乙单独做要 ' + c[1] + ' 天。两人合作要几天完成？', ans: c[2] + ' 天', key: [c[2]] }; });
    t.push(function () { const k = ri(2, 4), b = ri(5, 20), S = b * (k + 1); return { q: '甲乙两数的和是 ' + S + '，甲是乙的 ' + k + ' 倍。甲是多少？', ans: String(S - b), key: [S - b] }; });
    t.push(function () { const m = ri(70, 95), s = ri(200, 5 * m - 10); return { q: '5 个数的平均数是 ' + m + '，其中前 4 个数的和是 ' + s + '，第 5 个数是多少？', ans: String(5 * m - s), key: [5 * m - s] }; });
    t.push(function () { const k = ri(1, 5), p = ri(5, 20), a = 100 * k; return { q: '有 ' + a + ' 克盐水，浓度是 ' + p + '%，其中盐有多少克？', ans: String(k * p), key: [k * p] }; });
    t.push(function () { const a = ri(3, 15), b = ri(2, 12); return { q: '计算：|−' + a + '| ＋ |' + b + '| ＝ ？', ans: String(a + b), key: [a + b] }; });
    t.push(function () { const b = ri(2, 9); return { q: '计算：(−' + b + ')² ＝ ？', ans: String(b * b), key: [b * b] }; });
    t.push(function () { const b = ri(4, 15); return { q: '计算：√' + (b * b) + ' ＝ ？', ans: String(b), key: [b] }; });
    shuffle(t);
    return t.slice(0, 10).map(function (f) { return f(); });
  }

  function genShawnEnglish() {
    return shuffle(ENG_BANK.slice()).slice(0, 10);
  }

 function genShawnRecite(bank) {
    return shuffle(bank.slice()).slice(0, 20);
  }
 function genChin() {
    return shuffle(CHIN_BANK.slice()).slice(0, 20);
  }
  let engGrade = '初一';
  function engSetGrade(g) { engGrade = g; refreshGeneric(); }
  function genEnglish() { const b = engGrade === '初二' ? ENG_8 : engGrade === '初三' ? ENG_9 : ENG_7; return shuffle(b.slice()).slice(0, 15); }
  let chinGrade = '初一';
  function chinSetGrade(g) { chinGrade = g; refreshGeneric(); }
  function genChinGraded() { const b = chinGrade === '初二' ? CHIN_8 : chinGrade === '初三' ? CHIN_9 : CHIN_7; return shuffle(b.slice()).slice(0, 12); }
  let engSem = '初一上';
  function engSetSem(s) { engSem = s; refreshGeneric(); }
  const engSecItems = {};
  function buildEngSections() {
    let html = '<div class="grade-bar">' + ['初一上', '初一下', '初二上'].map(function (g) {
      return '<button class="' + (g === engSem ? 'active' : '') + '" onclick="engSetSem(\'' + g + '\')">' + g + '</button>';
    }).join('') + '</div>';
    html += '<div class="eng-board" id="eng-board"></div>';
    ENG_TYPES.forEach(function (t, ti) {
      const seenQ = {};
      const pool = ENG_ITEMS.filter(function (it) {
        if (it.sem !== engSem || it.type !== t.key) return false;
        const k = it.q.replace(/\s+/g, '');
        if (seenQ[k]) return false;
        seenQ[k] = 1;
        return true;
      });
      // 每组随机抽 10 题，并且优先抽「上一次没出现过的题」，保证「换一批」一定换新题
      const seenKey = pk('eng_seen_v1') + '_' + engSem + '_' + t.key;
      let prevQ = [];
      try { prevQ = JSON.parse(lsGet('eng_seen_v1' + '_' + engSem + '_' + t.key) || '[]') || []; } catch (e) { prevQ = []; }
      const prevSet = {};
      prevQ.forEach(function (q) { prevSet[q] = 1; });
      const freshPool = pool.filter(function (it) { return !prevSet[it.q]; });
      const items = shuffle((freshPool.length >= 10 ? freshPool : pool).slice()).slice(0, 10);
      try { localStorage.setItem(seenKey, JSON.stringify(items.map(function (it) { return it.q; }))); } catch (e) {}
      const gid = 'se' + ti;
      engSecItems[gid] = items;
      regGeneric(gid, t.title, items.map(function (it) { return { q: it.q, a: it.ans }; }));
      html += '<section class="type" id="' + gid + '">';
      html += '<h2><span class="num">' + (ti + 1) + '</span>' + escapeHtml(t.title) + ' <span class="badge">' + escapeHtml(engSem) + '</span></h2>';
      html += '<div class="mod-toolbar"><button class="primary-btn" onclick="gradeEng(\'' + gid + '\')">✔ 批改本组</button> <span class="sec-score" id="' + gid + '-score"></span></div>';
      html += '<div class="mod-body text">';
      items.forEach(function (it, i) {
        var inner = '<div class="q">' + (i + 1) + '、' + escapeHtml(it.q) + '</div>';
        if (it.options) { inner += '<div class="mc">' + it.options.map(function (o) { return '<button class="mc-opt" data-i="' + i + '">' + escapeHtml(o) + '</button>'; }).join('') + '</div><span class="mark"></span>'; }
        else { inner += '<div class="a-row"><input class="ans-input g-input" data-i="' + i + '" type="text" placeholder="✏️ 写单词" autocomplete="off" spellcheck="false"><span class="mark"></span></div>'; }
        html += '<div class="calc-item" data-gi="' + gid + '-' + i + '"><div class="calc-main">' + inner +
          '<button class="add-wrong" data-type="' + gid + '" data-i="' + i + '">＋错题本</button>' + revealHTML(it.ans, it.exp) + '</div></div>';
      });
      html += '</div></section>';
    });
    // ===== 近三年各地中考英语真题（按省市·年份标注） =====
    html += '<section class="type" id="er-head"><h2><span class="num">🎯</span>真题 · 近三年（按省市 · 年份）<span class="badge">真实试卷</span></h2></section>';
    ENG_REAL.forEach(function (p, pi) {
      const gid = 'er' + pi;
      engSecItems[gid] = p.items;
      regGeneric(gid, p.label + '（' + p.type + '）', p.items.map(function (it) { return { q: it.q, a: it.ans }; }));
      html += '<section class="type" id="' + gid + '">';
      html += '<h2><span class="num">' + (pi + 1) + '</span>' + escapeHtml(p.label) + ' <span class="badge">' + escapeHtml(p.badge) + '</span></h2>';
      html += '<div class="mod-toolbar"><button class="primary-btn" onclick="gradeEng(\'' + gid + '\')">✔ 批改本组</button> <span class="sec-score" id="' + gid + '-score"></span></div>';
      html += '<p class="real-src">📄 卷源：' + escapeHtml(p.label) + ' · ' + escapeHtml(p.type) + '（' + p.items.length + ' 题）｜题目取自公开的真题试卷，已按「省市 · 年份」标注；写完后点「批改本组」，错题会给出讲解。</p>';
      if (p.passage) {
        html += '<details class="passage" open><summary>📖 阅读材料（可收起）</summary><div class="p-text">' +
          p.passage.map(function (para) { return '<p>' + escapeHtml(para) + '</p>'; }).join('') + '</div></details>';
      }
      html += '<div class="mod-body text">';
      p.items.forEach(function (it, i) {
        var inner = '<div class="q">' + (i + 1) + '、' + escapeHtml(it.q).replace(/\n/g, '<br>') + '</div>';
        inner += '<div class="mc">' + it.options.map(function (o) { return '<button class="mc-opt" data-i="' + i + '">' + escapeHtml(o) + '</button>'; }).join('') + '</div><span class="mark"></span>';
        html += '<div class="calc-item" data-gi="' + gid + '-' + i + '"><div class="calc-main">' + inner +
          '<button class="add-wrong" data-type="' + gid + '" data-i="' + i + '">＋错题本</button>' + revealHTML(it.ans, it.exp) + '</div></div>';
      });
      html += '</div></section>';
    });
    return html;
  }
  function engBoardRender() {
    const box = document.getElementById('eng-board');
    if (!box) return;
    const keys = {};
    Object.keys(engSecItems).forEach(function (k) { if (document.getElementById(k)) keys[k] = 1; });
    const best = {};
    calHist().forEach(function (x) {
      if (!keys[x.k]) return;
      const cur = best[x.k];
      if (!cur || x.s > cur.s || (x.s === cur.s && x.t < cur.t)) best[x.k] = x;
    });
    const top = Object.keys(best).map(function (k) { return best[k]; })
      .sort(function (a, b) { return b.s - a.s || a.t - b.t; }).slice(0, 3);
    let h = '<div class="eng-board-head"><b>🏆 英语语法积分榜</b><span>按最高分 · 前三名</span></div>';
    if (!top.length) {
      h += '<div class="eng-board-empty">还没有成绩，完成任意一组批改后就会出现在这里。</div>';
      box.innerHTML = h;
      return;
    }
    const cls = ['gold', 'silver', 'bronze'], medal = ['🥇', '🥈', '🥉'];
    h += '<div class="ph-podium eng-podium">';
    top.forEach(function (x, i) {
      const sec = document.getElementById(x.k);
      let name = x.k;
      if (sec) {
        const title = sec.querySelector('h2');
        if (title) {
          const c = title.cloneNode(true);
          c.querySelectorAll('.num,.badge').forEach(function (n) { n.remove(); });
          name = c.textContent.replace(/\s+/g, ' ').trim() || name;
        }
      }
      const d = new Date(x.t);
      const time = (d.getMonth() + 1) + '月' + d.getDate() + '日<br>' + String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
      h += '<div class="ph-pod-col ' + cls[i] + '"><div class="ph-pod-medal">' + medal[i] + '</div>' +
        '<div class="ph-pod-score">' + x.s + '</div><div class="ph-pod-name">' + escapeHtml(name) + '</div>' +
        '<div class="ph-pod-time">' + time + '</div></div>';
    });
    h += '</div>';
    box.innerHTML = h;
  }
  function gradeEng(gid) {
    const items = engSecItems[gid] || [];
    let total = 0, correct = 0;
    items.forEach(function (it, i) {
      total++;
      let ok = false;
      if (it.options) {
        const sel = document.querySelector('#' + gid + ' .mc-opt.sel[data-i="' + i + '"]');
        ok = sel ? gradeText(sel.textContent, it.ans) : false;
      } else {
        const inp = document.querySelector('#' + gid + ' .g-input[data-i="' + i + '"]');
        ok = inp ? gradeText(inp.value, it.ans) : false;
      }
      if (ok) correct++;
      const card = document.querySelector('.calc-item[data-gi="' + gid + '-' + i + '"]');
      if (card) {
        card.classList.remove('right', 'wrong');
        card.classList.add(ok ? 'right' : 'wrong');
        const mk = card.querySelector('.mark'); if (mk) mk.textContent = ok ? '✓' : '✗';
        if (!ok) {
          const r = card.querySelector('.reveal');
          if (r) {
            r.style.display = 'block';
            const sc = card.querySelector('canvas.scratch');
            const ta = card.querySelector('.step-input');
            addAiVerdict(r, card);
          }
        }
      }
    });
    setText(gid + '-score', correct + ' / ' + total);
    const cr = calLog(gid, correct, total);
    engBoardRender();
    if (cr.prevLast !== null && cr.score > cr.prevLast) {
      completeModule(curGeneric.cfg.id, curGeneric.cfg.name, 5, 'æœ¬ç»„æ¯”ä¸Šæ¬¡æé«˜ ' + (cr.score - cr.prevLast) + ' åˆ†');
      toast('ðŸ‘ è¿™ç»„æ¯”ä¸Šæ¬¡æé«˜ ' + (cr.score - cr.prevLast) + ' åˆ†ï¼Œå¥–åŠ± +5â­');
    } else {
      toast('æœ¬ç»„å¾—åˆ† ' + cr.score + ' åˆ†ï¼Œå·²è®°å½•');
    }
    const ab = accBonus(total > 0 ? correct / total : 0);
    completeModule('sx-eng', '英语语法', ab, '正确率+' + ab);
  }

  function genShawnOral() {
    return shuffle(ORAL_LIST.slice()).slice(0, 12);
  }

  /* ============ 通用模块页 ============ */
  const SHAWN_POOLS = {
    rational: RATIONAL500.map(function (it) { return function () { return it; }; }),
    expr: [
      function () { const k = ri(2, 8), a = ri(1, 5); return { q: '当 x ＝ ' + k + ' 时，求 (x ＋ ' + a + ')² − (x − ' + a + ')² 的值。', ans: String(4 * a * k), key: [4 * a * k] }; },
      function () { const S = ri(6, 12), P = ri(5, Math.floor(S * S / 2)); return { q: '已知 x ＋ y ＝ ' + S + '，xy ＝ ' + P + '，求 x² ＋ y² 的值。', ans: String(S * S - 2 * P), key: [S * S - 2 * P] }; },
      function () { const a = ri(2, 5), b = ri(3, 9), m = ri(2, 4), c = ri(1, 9); return { q: '已知 x² − ' + a + 'x ＝ ' + b + '，求 ' + m + 'x² − ' + (m * a) + 'x ＋ ' + c + ' 的值。', ans: String(m * b + c), key: [m * b + c] }; },
      function () { const S = ri(5, 15), D = ri(1, 5); return { q: '已知 a ＋ b ＝ ' + S + '，a − b ＝ ' + D + '，求 a² − b² 的值。', ans: String(S * D), key: [S * D] }; },
      function () { const S = ri(6, 14), P = ri(4, Math.max(4, Math.floor(S * S / 4))); return { q: '已知 a ＋ b ＝ ' + S + '，ab ＝ ' + P + '，求 (a − b)² 的值。', ans: String(S * S - 4 * P), key: [S * S - 4 * P] }; },
      function () { const k = ri(3, 8); return { q: '已知 x ＋ 1/x ＝ ' + k + '，求 x² ＋ 1/x² 的值。', ans: String(k * k - 2), key: [k * k - 2] }; },
      function () { const k = ri(2, 8); return { q: '化简求值：当 a ＝ ' + k + ' 时，求 2(a² − 3a) − 3(a² − 2a) 的值。', ans: String(-k * k), key: [-k * k] }; },
      function () { const k = ri(2, 6), a = ri(1, 6), b = ri(1, 9); return { q: '当 x ＝ −' + k + ' 时，求 x² − ' + a + 'x ＋ ' + b + ' 的值。', ans: String(k * k + a * k + b), key: [k * k + a * k + b] }; },
      function () { const a = ri(2, 6), k = ri(3, 9); return { q: '已知 x² ＋ ' + a + 'x ＝ ' + k + '，求 2x² ＋ ' + (2 * a) + 'x − 3 的值。', ans: String(2 * k - 3), key: [2 * k - 3] }; },
      function () { const a = ri(2, 9), b = ri(3, 20); return { q: '当 x ＝ −' + a + ' 时，求 (x ＋ ' + a + ')(x − ' + a + ') ＋ ' + b + ' 的值。', ans: String(b), key: [b] }; },
      function () { const k = ri(3, 9); return { q: '化简求值：当 x ＝ ' + k + ' 时，求 3(x² − 2x) − 2(x² − 3x) ＋ 5 的值。', ans: String(k * k + 5), key: [k * k + 5] }; },
      function () { const k = ri(4, 12); return { q: '已知 a ＋ b ＝ ' + k + '，求 3a ＋ 3b − 4(a ＋ b) ＋ 6 的值。', ans: String(6 - k), key: [6 - k] }; },
      function () { const k = ri(3, 9); return { q: '当 x ＝ ' + k + ' 时，求 (x ＋ 1)² − (x ＋ 2)(x − 2) 的值。', ans: String(2 * k + 5), key: [2 * k + 5] }; },
      function () { const d = ri(3, 9), c = ri(2, 12); return { q: '已知 x − y ＝ ' + d + '，求 x² − 2xy ＋ y² − ' + c + ' 的值。', ans: String(d * d - c), key: [d * d - c] }; },
      function () { const k = ri(2, 9); return { q: '已知 2x² − x ＝ ' + k + '，求 4x² − 2x ＋ 3 的值。', ans: String(2 * k + 3), key: [2 * k + 3] }; },
      function () { const k = ri(2, 9); return { q: '当 x ＝ ' + k + ' 时，求 (2x ＋ 1)² − (2x − 1)² 的值。', ans: String(8 * k), key: [8 * k] }; },
      function () { const m = ri(20, 60), n = ri(3, 15); return { q: '已知 a² ＋ b² ＝ ' + m + '，ab ＝ ' + n + '，求 (a ＋ b)² 的值。', ans: String(m + 2 * n), key: [m + 2 * n] }; },
      function () { const k = ri(3, 9); return { q: '化简求值：当 x ＝ ' + k + ' 时，求 5(x² − x) − 4(x² − 2x) − x 的值。', ans: String(k * k + 2 * k), key: [k * k + 2 * k] }; },
    ],
    clever: [
      function () { const n = ri(4, 12); return { q: '简便计算：1/(1×2) ＋ 1/(2×3) ＋ … ＋ 1/(' + n + '×' + (n + 1) + ')', ans: fracStr(n, n + 1), key: [fracStr(n, n + 1)] }; },
      function () { const m = ri(30, 99); return { q: '简便计算：' + m + '² − ' + (m - 1) + ' × ' + (m + 1), ans: '1', key: ['1'] }; },
      function () { const a = ri(12, 60), b = ri(11, 49), c = ri(2, 10); return { q: '简便计算：' + a + ' × ' + b + ' − ' + a + ' × ' + (b - c), ans: String(a * c), key: [a * c] }; },
      function () { const n = ri(10, 50); return { q: '简便计算：1 − 2 ＋ 3 − 4 ＋ … ＋ ' + (2 * n - 1) + ' − ' + (2 * n), ans: String(-n), key: [-n] }; },
      function () { const k = ri(6, 10); return { q: '简便计算：1 ＋ 2 ＋ 4 ＋ 8 ＋ … ＋ ' + Math.pow(2, k), ans: String(Math.pow(2, k + 1) - 1), key: [Math.pow(2, k + 1) - 1] }; },
      function () { const n = ri(3, 6); return { q: '简便计算：1/(1×3) ＋ 1/(3×5) ＋ … ＋ 1/(' + (2 * n - 1) + '×' + (2 * n + 1) + ')', ans: fracStr(n, 2 * n + 1), key: [fracStr(n, 2 * n + 1)] }; },
      function () { const a = ri(2, 9), b = ri(1, 6); return { q: '简便计算：' + a + '/7 × ' + b + ' ＋ ' + a + '/7 × ' + (7 - b), ans: String(a), key: [a] }; },
      function () { const m = ri(20, 90); return { q: '简便计算：' + m + '² − ' + (m + 2) + ' × ' + (m - 2), ans: '4', key: ['4'] }; },
      function () { const n = ri(3, 6); return { q: '简便计算：2/(1×3) ＋ 2/(3×5) ＋ … ＋ 2/(' + (2 * n - 1) + '×' + (2 * n + 1) + ')', ans: fracStr(2 * n, 2 * n + 1), key: [fracStr(2 * n, 2 * n + 1)] }; },
      function () { const a = ri(12, 60); return { q: '简便计算：' + a + ' × 9.9 ＋ ' + a + ' × 0.1', ans: String(a * 10), key: [a * 10] }; },
      function () { const n = ri(4, 9); const s = n * (n + 1) / 2; return { q: '简便计算：1³ ＋ 2³ ＋ … ＋ ' + n + '³', ans: String(s * s), key: [s * s] }; },
      function () { const a = ri(6, 40), m = pick([998, 1002, 997, 1003]); return { q: '简便计算：' + a + ' × ' + m, ans: String(a * m), key: [a * m] }; },
      function () { const a = ri(2, 40); return { q: '简便计算：' + (1000 + a) + ' × ' + (1000 - a), ans: String(1000000 - a * a), key: [1000000 - a * a] }; },
      function () { const m = ri(20, 99); return { q: '简便计算：' + m + '² − ' + (m - 1) + '²', ans: String(2 * m - 1), key: [2 * m - 1] }; },
      function () { const n = ri(3, 5); return { q: '简便计算：1/(1×4) ＋ 1/(4×7) ＋ … ＋ 1/(' + (3 * n - 2) + '×' + (3 * n + 1) + ')', ans: fracStr(n, 3 * n + 1), key: [fracStr(n, 3 * n + 1)] }; },
      function () { const m = ri(20, 90), p = ri(2, 7), q = ri(2, 7); return { q: '简便计算：' + (m + p) + ' × ' + (m - p) + ' − ' + (m + q) + ' × ' + (m - q), ans: String(q * q - p * p), key: [q * q - p * p] }; },
      function () { const n = ri(8, 40); return { q: '简便计算：1 ＋ 3 ＋ 5 ＋ … ＋ ' + (2 * n - 1) + ' ＋ 2 ＋ 4 ＋ … ＋ ' + (2 * n), ans: String(2 * n * n + n), key: [2 * n * n + n] }; },
      function () { const m = ri(11, 60), k = ri(2, 9); return { q: '简便计算：' + (m + k) + ' × ' + (m - k) + ' − ' + m + '²', ans: String(-k * k), key: [-k * k] }; },
    ],
    numtheory: [
      function () { const r1 = ri(1, 6), r2 = ri(1, 4); let n = 1; while (!(n % 7 === r1 && n % 5 === r2)) n++; return { q: '一个正整数除以 7 余 ' + r1 + '，除以 5 余 ' + r2 + '，这个数最小是多少？', ans: String(n), key: [n] }; },
      function () { const b = ri(3, 6), c = ri(5, 9); const cnt = Math.floor(100 / b) - Math.floor(100 / (b * c)); return { q: '1 到 100 中，能被 ' + b + ' 整除但不能被 ' + (b * c) + ' 整除的数有多少个？', ans: String(cnt), key: [cnt] }; },
      function () { const g = pick([2, 3, 4]); const m = g * ri(2, 5); return { q: '两个数的最大公因数是 ' + g + '，最小公倍数是 ' + m + '，其中较大的一个数是多少？', ans: String(m), key: [m] }; },
      function () { return { q: '一个三位数，百位是 9，各位数字都不为 0 且互不相同，三个数字之和是 15。这个三位数最大是多少？', ans: '951', key: [951] }; },
      function () { const k = ri(4, 12); return { q: '2 的 ' + k + ' 次方的个位数字是多少？', ans: String(Math.pow(2, k) % 10), key: [Math.pow(2, k) % 10] }; },
      function () { const a = ri(2, 5), b = ri(2, 6); let n = 0; while (!((n + a) % 5 === 0 && (n - b) % 6 === 0)) n++; return { q: '一个正整数加上 ' + a + ' 能被 5 整除，减去 ' + b + ' 能被 6 整除，这个数最小是多少？', ans: String(n), key: [n] }; },
      function () { return { q: '用 0、1、2、3 组成没有重复数字的三位数（百位不能为 0），共有多少个？', ans: '18', key: [18] }; },
      function () { const p = pick([[4, 12], [6, 18], [4, 16], [6, 12]]); return { q: '两个数的最大公因数是 4，最小公倍数是 12，这两个数中较小的是多少？', ans: '4', key: [4] }; }
    ],
    cleverthink: [
      function () { const n = 2 * ri(25, 50); return { q: '计算：1 − 2 ＋ 3 − 4 ＋ … ＋ ' + (n - 1) + ' − ' + n, ans: String(-n / 2), key: [-n / 2] }; },
      function () { const n = ri(6, 12); return { q: '计算：1/(1×2) ＋ 1/(2×3) ＋ … ＋ 1/(' + n + '×' + (n + 1) + ')，结果的分子是多少（分母为 ' + (n + 1) + '）？', ans: String(n), key: [n] }; },
      function () { const a = ri(20, 99); return { q: '简便计算：' + a + ' × ' + a + ' ＋ ' + a, ans: String(a * (a + 1)), key: [a * (a + 1)] }; },
      function () { const n = pick([20, 50, 100]); return { q: '计算：1 ＋ 2 ＋ 3 ＋ … ＋ ' + n, ans: String(n * (n + 1) / 2), key: [n * (n + 1) / 2] }; },
      function () { const n = pick([25, 50]); return { q: '计算：2 ＋ 4 ＋ 6 ＋ … ＋ ' + (2 * n), ans: String(n * (n + 1)), key: [n * (n + 1)] }; },
      function () { const k = pick([2026, 2027, 2028]); return { q: '计算：' + k + ' × ' + (k + 1) + ' − ' + (k - 1) + ' × ' + (k + 2), ans: '2', key: [2] }; },
      function () { const n = pick([4, 5, 6]); return { q: '计算：1/2 ＋ 1/4 ＋ 1/8 ＋ … （共 ' + n + ' 项），结果的分子是多少（分母为 2^' + n + '）？', ans: String(Math.pow(2, n) - 1), key: [Math.pow(2, n) - 1] }; },
      function () { const n = ri(8, 15); return { q: '计算：(1 ＋ 2 ＋ … ＋ ' + n + ') − (1 ＋ 2 ＋ … ＋ ' + (n - 1) + ')', ans: String(n), key: [n] }; }
    ],
    backward: [
      function () { const x = ri(3, 20), a = ri(3, 9), b = ri(2, 5), c = ri(10, 40); return { q: '一个数加上 ' + a + '，再乘 ' + b + '，减去 ' + (a * b + 5) + '，结果是 ' + (x * b + 5) + '。这个数是多少？', ans: String(x), key: [x] }; },
      function () { return { q: '甲乙丙三人中有一人做了好事。甲说“不是我”，乙说“不是我”，丙说“是乙”，三人中只有一人说真话。做好事的是甲填 1、乙填 2、丙填 3，请填数字。', ans: '1', key: [1] }; },
      function () { const m = ri(15, 30); return { q: '三个连续偶数的和是 ' + (3 * m) + '，其中最小的是多少？', ans: String(m - 2), key: [m - 2] }; },
      function () { return { q: '一个两位数，个位数字是十位数字的 2 倍，两个数字之和是 9，这个两位数是多少？', ans: '36', key: [36] }; },
      function () { const n = ri(3, 6); return { q: n + ' 个同学两两握手一次，一共握手多少次？', ans: String(n * (n - 1) / 2), key: [n * (n - 1) / 2] }; },
      function () { const k = ri(4, 9); return { q: '一个数的 3 倍比它的 2 倍多 ' + k + '，这个数是多少？', ans: String(k), key: [k] }; },
      function () { const x = ri(10, 40), a = ri(3, 9), b = ri(2, 6); return { q: '一个数减去 ' + a + '，再除以 ' + b + '，结果是 ' + ((x - a) / b >= 1 ? Math.round((x - a) / b) : 1) + '。这个数是多少？', ans: String(b * Math.round((x - a) / b) + a), key: [b * Math.round((x - a) / b) + a] }; },
      function () { const n = ri(5, 8); return { q: '一根绳子剪 ' + n + ' 刀（每刀只剪一处），最多能剪成几段？', ans: String(n + 1), key: [n + 1] }; }
    ],
    extreme: [
      function () { return { q: '用 1、2、3、4 各一次组成两个两位数，它们的乘积最大是多少？', ans: '1312', key: [1312] }; },
      function () { return { q: '用 1、2、3、4 各一次组成两个两位数，它们的乘积最小是多少？', ans: '312', key: [312] }; },
      function () { const s = ri(10, 20); return { q: '两个正整数的和是 ' + (2 * s) + '，它们的乘积最大是多少？', ans: String(s * s), key: [s * s] }; },
      function () { const p = ri(10, 24); return { q: '用一根 ' + (2 * p) + ' 厘米长的铁丝围成一个长方形（长、宽为整数厘米），面积最大是多少平方厘米？', ans: String(p * p / 4), key: [p * p / 4] }; },
      function () { return { q: '一个三位数，百位是 5，十位与个位数字之和是 8，这个三位数最大是多少？', ans: '580', key: [580] }; },
      function () { const a = ri(10, 40); return { q: '把 ' + (2 * a) + ' 拆成两个正整数之和，它们的乘积最大是多少？', ans: String(a * a), key: [a * a] }; }
    ],
    equation: [
      function () { const x = ri(2, 9), a = ri(2, 6), b = ri(1, 15); return { q: '解方程：' + a + 'x ＋ ' + b + ' ＝ ' + (a * x + b) + '，x ＝ ？', ans: 'x ＝ ' + x, key: [x] }; },
      function () { const x = ri(2, 9), a = ri(2, 6), b = ri(1, 15); return { q: '解方程：' + a + 'x − ' + b + ' ＝ ' + (a * x - b) + '，x ＝ ？', ans: 'x ＝ ' + x, key: [x] }; },
      function () { const x = ri(2, 9), a = ri(2, 5), b = ri(1, 9); return { q: '解方程：' + a + '(x ＋ ' + b + ') ＝ ' + (a * (x + b)) + '，x ＝ ？', ans: 'x ＝ ' + x, key: [x] }; },
      function () { const x = ri(2, 9), a = ri(3, 7), c = ri(1, 2), b = ri(1, 9); return { q: '解方程：' + a + 'x ＋ ' + b + ' ＝ ' + c + 'x ＋ ' + ((a - c) * x + b) + '，x ＝ ？', ans: 'x ＝ ' + x, key: [x] }; },
      function () { const a = ri(2, 5), k = ri(2, 6), x = a * k, b = ri(1, 9); return { q: '解方程：x ÷ ' + a + ' ＋ ' + b + ' ＝ ' + (k + b) + '，x ＝ ？', ans: 'x ＝ ' + x, key: [x] }; },
      function () { const x = ri(2, 9), a = ri(2, 5), b = ri(1, 6); return { q: '解方程：' + a + '(x − ' + b + ') ＝ ' + (a * (x - b)) + '，x ＝ ？', ans: 'x ＝ ' + x, key: [x] }; },
      function () { const x = ri(3, 10), a = ri(1, 5), b = ri(1, 9); return { q: '解方程：2x ＋ ' + a + ' ＝ 3x − ' + b + '，x ＝ ？', ans: 'x ＝ ' + (a + b), key: [a + b] }; },
      function () { const x = ri(2, 9), a = ri(2, 6), b = ri(1, 12); return { q: '一个数的 ' + a + ' 倍加上 ' + b + ' 等于 ' + (a * x + b) + '，这个数是多少？', ans: String(x), key: [x] }; },
      function () { const x = ri(2, 9), a = ri(2, 6), b = ri(1, 12); return { q: '一个数的 ' + a + ' 倍减去 ' + b + ' 等于 ' + (a * x - b) + '，这个数是多少？', ans: String(x), key: [x] }; },
      function () { const x = ri(2, 8), a = ri(2, 5); return { q: '解方程：' + a + 'x ＝ ' + (a * x) + '，x ＝ ？', ans: 'x ＝ ' + x, key: [x] }; }
    ],
    ineq: [
      function () { const a = ri(2, 6), b = ri(1, 12), k = ri(2, 9); return { q: '解不等式：' + a + 'x ＋ ' + b + ' ＞ ' + (a * k + b) + '，得 x ＞ ____', ans: String(k), key: [k] }; },
      function () { const a = ri(2, 6), b = ri(1, 12), k = ri(2, 9); return { q: '解不等式：' + a + 'x − ' + b + ' ≤ ' + (a * k - b) + '，得 x ≤ ____', ans: String(k), key: [k] }; },
      function () { const a = ri(2, 6), b = ri(5, 15), k = ri(2, 8); return { q: '解不等式：−' + a + 'x ＋ ' + b + ' ＜ ' + (b - a * k) + '，得 x ＞ ____', ans: String(k), key: [k] }; },
      function () { const a = ri(2, 6), b = ri(1, 9), k = ri(3, 9); return { q: '不等式 ' + a + 'x ＋ ' + b + ' ＜ ' + (a * k + b) + ' 的最大整数解是多少？', ans: String(k - 1), key: [k - 1] }; },
      function () { const a = ri(2, 6), b = ri(1, 9), k = ri(3, 9); return { q: '不等式 ' + a + 'x ＋ ' + b + ' ≥ ' + (a * k + b) + ' 的最小整数解是多少？', ans: String(k), key: [k] }; },
      function () { const a = ri(2, 6), b = ri(1, 9), k = ri(3, 9); return { q: '不等式 ' + a + 'x − ' + b + ' ＞ ' + (a * k - b) + ' 的最小整数解是多少？', ans: String(k + 1), key: [k + 1] }; },
      function () { const a = ri(10, 30), b = ri(2, 9); return { q: '解不等式：' + a + ' − x ＜ ' + b + '，得 x ＞ ____', ans: String(a - b), key: [a - b] }; },
      function () { const a = ri(2, 5), b = ri(1, 9), k = ri(2, 8); return { q: '解不等式：x ÷ ' + a + ' ＋ ' + b + ' ＞ ' + (k + b) + '，得 x ＞ ____', ans: String(a * k), key: [a * k] }; },
      function () { const a = ri(2, 6), b = ri(1, 9), k = ri(3, 9); return { q: '不等式 ' + a + 'x ＋ ' + b + ' ≤ ' + (a * k + b) + ' 的最大整数解是多少？', ans: String(k), key: [k] }; },
      function () { const a = ri(2, 6), b = ri(1, 9), k = ri(3, 9); return { q: '不等式 ' + a + 'x − ' + b + ' ≥ ' + (a * k - b) + ' 的最小整数解是多少？', ans: String(k), key: [k] }; }
    ],
    system: [
      function () { const y = ri(2, 12), x = ri(3, 15), S = x + y, D = x - y; return { q: '解方程组：x ＋ y ＝ ' + S + '，x − y ＝ ' + D + '，求 x。', ans: 'x ＝ ' + x, key: [x] }; },
      function () { const y = ri(2, 12), x = ri(3, 15), S = x + y, P = 2 * x + y; return { q: '解方程组：x ＋ y ＝ ' + S + '，2x ＋ y ＝ ' + P + '，求 x。', ans: 'x ＝ ' + x, key: [x] }; },
      function () { const y = ri(2, 12), x = ri(3, 15), S = x + y, T = x + 2 * y; return { q: '解方程组：x ＋ y ＝ ' + S + '，x ＋ 2y ＝ ' + T + '，求 x。', ans: 'x ＝ ' + x, key: [x] }; },
      function () { const y = ri(2, 12), x = ri(3, 15), S = x + y, T = 3 * x + 2 * y; return { q: '解方程组：x ＋ y ＝ ' + S + '，3x ＋ 2y ＝ ' + T + '，求 x。', ans: 'x ＝ ' + x, key: [x] }; },
      function () { const y = ri(2, 12), x = ri(3, 15), P = 3 * x + 2 * y, Q = 2 * x + 2 * y; return { q: '解方程组：3x ＋ 2y ＝ ' + P + '，2x ＋ 2y ＝ ' + Q + '，求 x。', ans: 'x ＝ ' + x, key: [x] }; },
      function () { const y = ri(2, 12), x = ri(3, 15), S = x + y, D = x - y; return { q: '解方程组：x ＋ y ＝ ' + S + '，x − y ＝ ' + D + '，求 y。', ans: 'y ＝ ' + y, key: [y] }; },
      function () { const a = ri(2, 6), y = ri(2, 10), x = ri(3, 12), S = x + y; return { q: '解方程组：x ＋ y ＝ ' + S + '，' + a + 'x ＋ y ＝ ' + (a * x + y) + '，求 x。', ans: 'x ＝ ' + x, key: [x] }; },
      function () { const y = ri(2, 12), x = ri(3, 15), S = x + y, D = x - y; return { q: '解方程组：x ＋ y ＝ ' + S + '，x − y ＝ ' + D + '，求 x ＋ y。', ans: String(S), key: [S] }; }
    ],
    travel: [
      function () { const v1 = ri(40, 70), v2 = ri(30, 60), t0 = ri(2, 5); return { q: '甲乙两地相距 ' + (v1 + v2) * t0 + ' 千米，两车同时相向开出，速度分别是 ' + v1 + ' 和 ' + v2 + ' 千米/时，几小时后相遇？', ans: t0 + ' 小时', key: [t0] }; },
      function () { const v1 = ri(50, 80), v2 = ri(30, 45), t0 = ri(2, 5); return { q: '甲的速度 ' + v1 + ' 千米/时，乙的速度 ' + v2 + ' 千米/时，乙在甲前方 ' + (v1 - v2) * t0 + ' 千米，甲追上乙要几小时？', ans: t0 + ' 小时', key: [t0] }; },
      function () { const v = ri(20, 40), w = ri(2, 8); return { q: '船在静水中的速度是 ' + v + ' 千米/时，水流速度是 ' + w + ' 千米/时，顺水速度是多少？', ans: String(v + w), key: [v + w] }; },
      function () { const v = ri(20, 40), w = ri(2, 8); return { q: '船在静水中的速度是 ' + v + ' 千米/时，水流速度是 ' + w + ' 千米/时，逆水速度是多少？', ans: String(v - w), key: [v - w] }; },
      function () { const v1 = ri(40, 70), v2 = ri(30, 60), t0 = ri(2, 5); return { q: '甲乙相距 ' + (v1 + v2) * t0 + ' 千米，两车同时相向开出，甲的速度 ' + v1 + ' 千米/时，乙的速度 ' + v2 + ' 千米/时。相遇时甲走了多少千米？', ans: String(v1 * t0), key: [v1 * t0] }; },
      function () { const v = ri(30, 60), t0 = ri(2, 6); return { q: '一辆汽车以 ' + v + ' 千米/时的速度行驶 ' + t0 + ' 小时，行驶了多少千米？', ans: String(v * t0), key: [v * t0] }; },
      function () { const v1 = ri(50, 80), v2 = ri(30, 45), t0 = ri(2, 5); return { q: '甲在乙后方 ' + (v1 - v2) * t0 + ' 千米，甲的速度 ' + v1 + '，乙的速度 ' + v2 + '，甲追上乙时甲走了多少千米？', ans: String(v1 * t0), key: [v1 * t0] }; },
      function () { const v = ri(30, 60), t0 = ri(2, 6); return { q: '一段路长 ' + v * t0 + ' 千米，汽车用 ' + t0 + ' 小时走完，平均速度是多少千米/时？', ans: String(v), key: [v] }; }
    ],
    work: [
      function () { const set = [[6, 3, 2], [12, 4, 3], [10, 15, 6], [12, 6, 4], [20, 5, 4], [4, 4, 2], [8, 8, 4], [15, 10, 6]]; const c = pick(set); return { q: '一项工程，甲单独做 ' + c[0] + ' 天完成，乙单独做 ' + c[1] + ' 天完成，两人合作要几天完成？', ans: c[2] + ' 天', key: [c[2]] }; },
      function () { const k = ri(1, 6), p = ri(5, 25), a = 100 * k; return { q: '有 ' + a + ' 克盐水，浓度 ' + p + '%，含盐多少克？', ans: String(k * p), key: [k * p] }; },
      function () { const k = ri(1, 6), p = ri(5, 25), a = 100 * k; return { q: '有 ' + a + ' 克盐水，浓度 ' + p + '%，含水多少克？', ans: String(a - k * p), key: [a - k * p] }; },
      function () { const a = ri(2, 6), b = ri(2, 6); return { q: '甲每小时完成工程的 1/' + a + '，乙每小时完成 1/' + b + '，两人合作一小时完成工程的几分之几？（填分母 a×b 的分子）' }; },
      function () { const set = [[6, 3, 2], [10, 15, 6], [12, 6, 4], [20, 5, 4]]; const c = pick(set); return { q: '甲 ' + c[0] + ' 天完成一项工程，乙 ' + c[1] + ' 天完成。两人合作 ' + c[2] + ' 天能完成吗？（能填 1，不能填 0）' }; },
      function () { const k = ri(2, 8), p = ri(10, 50), m = ri(2, 5); return { q: '把 ' + (100 * k) + ' 克 ' + p + '% 的糖水分给 ' + m + ' 个人，平均每人分到多少克糖水？', ans: String(100 * k / m), key: [100 * k / m] }; }
    ],
    sumdiff: [
      function () { const b = ri(5, 30), d = ri(2, 15), a = b + d; return { q: '两数的和是 ' + (a + b) + '，差是 ' + d + '，较大的数是多少？', ans: String(a), key: [a] }; },
      function () { const k = ri(2, 4), b = ri(5, 20); return { q: '两数的和是 ' + b * (k + 1) + '，其中较大数是较小数的 ' + k + ' 倍，较大的数是多少？', ans: String(b * k), key: [b * k] }; },
      function () { const k = ri(2, 4), b = ri(4, 15); return { q: '两数的差是 ' + (b * (k - 1)) + '，较大数是较小数的 ' + k + ' 倍，较小的数是多少？', ans: String(b), key: [b] }; },
      function () { const x = ri(20, 40), d = ri(3, 10), y = ri(3, 12); return { q: '爸爸今年 ' + x + ' 岁，儿子今年 ' + y + ' 岁，年龄差是多少？', ans: String(x - y), key: [x - y] }; },
      function () { const d = ri(24, 30), z = ri(2, 6); return { q: '妈妈比女儿大 ' + d + ' 岁，' + z + ' 年后妈妈比女儿大多少岁？', ans: String(d), key: [d] }; },
      function () { const son = ri(3, 8), k = ri(3, 5); return { q: '今年爸爸的年龄是儿子的 ' + k + ' 倍，儿子 ' + son + ' 岁，爸爸今年多少岁？', ans: String(son * k), key: [son * k] }; },
      function () { const a = ri(4, 9), b = ri(3, 8); return { q: '甲数比乙数多 ' + (a * b - b) + '，甲数是乙数的 ' + a + ' 倍，乙数是多少？', ans: String(b), key: [b] }; },
      function () { const x = ri(5, 20), d = ri(2, 9); return { q: '两个连续奇数的和是 ' + (2 * x + 2) + '，其中较小的一个是多少？', ans: String(x), key: [x] }; }
    ],
    geometry: [
      function () { const a = ri(30, 80), b = ri(30, 70); if (a + b >= 180) return { q: '三角形两个内角分别是 ' + a + '° 和 ' + (180 - a - 5) + '°，第三个角是多少度？', ans: '5', key: [5] }; return { q: '三角形两个内角分别是 ' + a + '° 和 ' + b + '°，第三个内角是多少度？', ans: String(180 - a - b), key: [180 - a - b] }; },
      function () { const a = ri(20, 160); return { q: '一个角是 ' + a + '°，它的补角是多少度？', ans: String(180 - a), key: [180 - a] }; },
      function () { const a = ri(10, 80); return { q: '一个角是 ' + a + '°，它的余角是多少度？', ans: String(90 - a), key: [90 - a] }; },
      function () { const n = ri(4, 9); return { q: '一个 ' + n + ' 边形的内角和是多少度？', ans: String((n - 2) * 180), key: [(n - 2) * 180] }; },
      function () { const top = 2 * ri(10, 40); return { q: '等腰三角形的顶角是 ' + top + '°，它的一个底角是多少度？', ans: String((180 - top) / 2), key: [(180 - top) / 2] }; },
      function () { const a = ri(50, 130); return { q: '两条平行线被第三条直线所截，一个同旁内角是 ' + a + '°，另一个同旁内角是多少度？', ans: String(180 - a), key: [180 - a] }; },
      function () { const a = ri(25, 155); return { q: '两条直线相交，其中一个角是 ' + a + '°，与它相对的角是多少度？', ans: String(a), key: [a] }; },
      function () { const a = ri(30, 90), b = ri(20, 60); if (a + b >= 180) return { q: '三角形两个内角分别是 60° 和 70°，第三个角是多少度？', ans: '50', key: [50] }; return { q: '三角形的两个内角和是 ' + (a + b) + '°，第三个内角是多少度？', ans: String(180 - a - b), key: [180 - a - b] }; },
      function () { const n = ri(5, 10); return { q: '一个 ' + n + ' 边形的外角和是多少度？', ans: '360', key: [360] }; },
      function () { const a = ri(40, 100); return { q: '三角形的一个外角是 ' + a + '°，与它不相邻的一个内角是 ' + ri(10, Math.max(11, a - 15)) + '°，另一个不相邻的内角是多少度？（请填这个外角减去已给内角的结果）', ans: '', key: [0] }; }
    ],
    pattern: [
      function () { const a = ri(2, 6), d = ri(3, 9), s = [a, a + d, a + 2 * d, a + 3 * d, a + 4 * d]; return { q: '找规律填数：' + s[0] + '，' + s[1] + '，' + s[2] + '，' + s[3] + '，____', ans: String(s[4]), key: [s[4]] }; },
      function () { const a = ri(2, 4), s = [a, a * 2, a * 4, a * 8]; return { q: '找规律填数：' + s[0] + '，' + s[1] + '，' + s[2] + '，____', ans: String(a * 16), key: [a * 16] }; },
      function () { const n = ri(4, 10); return { q: '找规律填数：1，4，9，16，____（第 ' + (n + 1) + ' 项是多少？填 ' + (n + 1) + ' 的平方）', ans: String((n + 1) * (n + 1)), key: [(n + 1) * (n + 1)] }; },
      function () { const n = ri(5, 10); return { q: '找规律填数：1，3，6，10，____（第 ' + (n + 1) + ' 个三角数）', ans: String((n + 1) * (n + 2) / 2), key: [(n + 1) * (n + 2) / 2] }; },
      function () { const a = ri(1, 4), b = ri(2, 5); const t = [a, b, a + b, a + 2 * b, 2 * a + 3 * b, 3 * a + 5 * b]; return { q: '找规律填数：' + t[0] + '，' + t[1] + '，' + t[2] + '，' + t[3] + '，____', ans: String(t[4]), key: [t[4]] }; },
      function () { const a = ri(1, 3); const t = [a, a + 1, a + 3, a + 6, a + 10, a + 15]; return { q: '找规律填数：' + t[0] + '，' + t[1] + '，' + t[2] + '，' + t[3] + '，____', ans: String(t[4]), key: [t[4]] }; },
      function () { const k = ri(3, 8); return { q: '找规律填数：' + k + '，' + k * 2 + '，' + k * 3 + '，' + k * 4 + '，____', ans: String(k * 5), key: [k * 5] }; },
      function () { const n = ri(3, 8); return { q: '第 n 个数是 2n，当 n ＝ ' + n + ' 时，这个数是多少？', ans: String(2 * n), key: [2 * n] }; }
    ],
    factor: [
      function () { const p = ri(1, 9), q = ri(1, 9), a = p + q, b = p * q; return { q: '把 x² ＋ ' + a + 'x ＋ ' + b + ' 分解成 (x ＋ p)(x ＋ q)（p、q 为正整数），求 p ＋ q。', ans: String(a), key: [a] }; },
      function () { const p = ri(1, 9), q = ri(1, 9), a = p + q, b = p * q; return { q: '把 x² ＋ ' + a + 'x ＋ ' + b + ' 分解成 (x ＋ p)(x ＋ q)（p、q 为正整数），求 p × q。', ans: String(b), key: [b] }; },
      function () { const k = ri(1, 9), p = ri(1, 9), q = ri(1, 9); return { q: '已知 x² ＋ ' + (p + q) + 'x ＋ ' + (p * q) + ' ＝ (x ＋ p)(x ＋ q)。当 x ＝ ' + k + ' 时，求该式的值。', ans: String((k + p) * (k + q)), key: [(k + p) * (k + q)] }; },
      function () { const a = ri(5, 15), b = ri(2, 9); return { q: '当 a ＝ ' + a + '，b ＝ ' + b + ' 时，求 a² − b² 的值。', ans: String(a * a - b * b), key: [a * a - b * b] }; },
      function () { const a = ri(5, 15), b = ri(2, 9); return { q: '当 a ＝ ' + a + '，b ＝ ' + b + ' 时，求 a² ＋ 2ab ＋ b² 的值。', ans: String((a + b) * (a + b)), key: [(a + b) * (a + b)] }; },
      function () { const a = ri(5, 15), b = ri(2, 9); return { q: '当 a ＝ ' + a + '，b ＝ ' + b + ' 时，求 a² − 2ab ＋ b² 的值。', ans: String((a - b) * (a - b)), key: [(a - b) * (a - b)] }; }
    ],
    congruence: [
      function () { return { q: '等腰三角形（非等边）有几条对称轴？', ans: '1', key: [1] }; },
      function () { return { q: '等边三角形有几条对称轴？', ans: '3', key: [3] }; },
      function () { return { q: '正方形有几条对称轴？', ans: '4', key: [4] }; },
      function () { return { q: '长方形（非正方形）有几条对称轴？', ans: '2', key: [2] }; },
      function () { const a = ri(30, 80), b = ri(30, 70); return { q: '两个三角形全等，其中一个三角形的两个内角分别是 ' + a + '° 和 ' + b + '°，另一个三角形对应位置的第三个内角是多少度？', ans: String(180 - a - b), key: [180 - a - b] }; },
      function () { const x = ri(3, 12); return { q: '点 P 在线段 AB 的垂直平分线上，PA ＝ ' + x + ' cm，PB 是多少 cm？', ans: String(x), key: [x] }; }
    ],
    linearfunc: [
      function () { const k = ri(2, 6), b = ri(1, 12), x = ri(2, 8); return { q: '一次函数 y ＝ ' + k + 'x ＋ ' + b + '，当 x ＝ ' + x + ' 时，y 是多少？', ans: String(k * x + b), key: [k * x + b] }; },
      function () { const k = ri(2, 6), b = ri(1, 12); return { q: '一次函数 y ＝ ' + k + 'x ＋ ' + b + ' 的图象与 y 轴交点的纵坐标是多少？', ans: String(b), key: [b] }; },
      function () { const k = ri(2, 6), b = ri(2, 12); const x = b / k; if (x % 1 !== 0) return { q: '一次函数 y ＝ 2x − 6 的图象与 x 轴交点的横坐标是多少？', ans: '3', key: [3] }; return { q: '一次函数 y ＝ ' + k + 'x − ' + b + ' 的图象与 x 轴交点的横坐标是多少？', ans: String(x), key: [x] }; },
      function () { const k = ri(2, 6), b = ri(1, 9); return { q: '一次函数 y ＝ kx ＋ ' + b + ' 的图象经过点 (1, ' + (k + b) + ')，k 是多少？', ans: String(k), key: [k] }; },
      function () { const m = ri(2, 5), b = ri(1, 9), x = ri(2, 6); return { q: '一次函数 y ＝ kx ＋ ' + b + ' 经过点 (' + x + ', ' + (m * x + b) + ')，k 是多少？', ans: String(m), key: [m] }; },
      function () { return { q: '一次函数 y ＝ 3x − 5 中，y 随 x 增大而增大还是减小？（增大填 1，减小填 0）', ans: '1', key: [1] }; }
    ],
    pythagoras: [
      function () { const t = pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15], [8, 15, 17], [7, 24, 25]]); return { q: '直角三角形的两条直角边分别是 ' + t[0] + ' 和 ' + t[1] + '，斜边长是多少？', ans: String(t[2]), key: [t[2]] }; },
      function () { const t = pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15], [8, 15, 17]]); return { q: '直角三角形的斜边是 ' + t[2] + '，一条直角边是 ' + t[0] + '，另一条直角边是多少？', ans: String(t[1]), key: [t[1]] }; },
      function () { const t = pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15]]); return { q: '直角三角形的两条直角边是 ' + t[0] + ' 和 ' + t[1] + '，它的面积是多少？', ans: String(t[0] * t[1] / 2), key: [t[0] * t[1] / 2] }; },
      function () { const t = pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15]]); return { q: '直角三角形两直角边为 ' + t[0] + '、' + t[1] + '，斜边为 ' + t[2] + '，斜边上的高是多少？', ans: String(+(t[0] * t[1] / t[2]).toFixed(2)), key: [t[0] * t[1] / t[2]] }; },
      function () { const s = ri(3, 9); return { q: '等腰直角三角形的两条直角边都是 ' + s + '，斜边是多少？（保留整数，√2 ≈ 1.414）', ans: String(Math.round(s * 1.414)), key: [Math.round(s * 1.414)] }; }
    ],
    quadratic: [
      function () { const r = ri(2, 12); return { q: '解方程：x² ＝ ' + (r * r) + '（x ＞ 0），x ＝ ？', ans: String(r), key: [r] }; },
      function () { const r = ri(3, 12), a = ri(1, 6); return { q: '解方程：(x ＋ ' + a + ')² ＝ ' + (r * r) + '（x ＞ 0），x ＝ ？', ans: String(r - a), key: [r - a] }; },
      function () { const r = ri(1, 9), s = ri(2, 9), lo = Math.min(r, s), hi = Math.max(r, s); return { q: '方程 x² − ' + (r + s) + 'x ＋ ' + (r * s) + ' ＝ 0 的一个根是 ' + lo + '，另一个根是多少？', ans: String(hi), key: [hi] }; },
      function () { const r = ri(2, 9), s = ri(2, 9); return { q: '方程 x² − ' + (r + s) + 'x ＋ ' + (r * s) + ' ＝ 0 的两根之和是多少？', ans: String(r + s), key: [r + s] }; },
      function () { const a = ri(1, 3), b = ri(2, 9), c = ri(1, 5); return { q: '方程 ' + a + 'x² ＋ ' + b + 'x ＋ ' + c + ' ＝ 0 的判别式 Δ ＝ b² − 4ac 是多少？', ans: String(b * b - 4 * a * c), key: [b * b - 4 * a * c] }; },
      function () { const r = ri(2, 9), s = ri(2, 9); return { q: '方程 x² − ' + (r + s) + 'x ＋ ' + (r * s) + ' ＝ 0 的两根之积是多少？', ans: String(r * s), key: [r * s] }; }
    ],
    quadfunc: [
      function () { const a = ri(1, 3), b = ri(1, 5), c = ri(1, 9), x = ri(1, 5); const y = a * x * x - b * x + c; return { q: '二次函数 y ＝ ' + a + 'x² − ' + b + 'x ＋ ' + c + '，当 x ＝ ' + x + ' 时，y 是多少？', ans: String(y), key: [y] }; },
      function () { const a = ri(1, 3), m = ri(1, 6); return { q: '二次函数 y ＝ ' + a + 'x² − ' + (2 * a * m) + 'x ＋ 1 的对称轴是 x 等于多少？', ans: String(m), key: [m] }; },
      function () { const c = ri(1, 9); return { q: '二次函数 y ＝ 2x² ＋ 3x ＋ ' + c + ' 的图象与 y 轴交点的纵坐标是多少？', ans: String(c), key: [c] }; },
      function () { const a = ri(1, 3), m = ri(1, 6); return { q: '二次函数 y ＝ ' + a + 'x² − ' + (2 * a * m) + 'x ＋ 1 的顶点横坐标是多少？', ans: String(m), key: [m] }; },
      function () { return { q: '二次函数 y ＝ 2x² ＋ 3x ＋ 1（a ＞ 0），它有最小值还是最大值？（最小填 1，最大填 0）', ans: '1', key: [1] }; }
    ],
    circle: [
      function () { const r = ri(1, 10); return { q: '圆的半径是 ' + r + ' cm，周长是多少 cm？（π 取 3.14）', ans: String(+(2 * 3.14 * r).toFixed(2)), key: [+(2 * 3.14 * r).toFixed(2)] }; },
      function () { const r = ri(1, 10); return { q: '圆的半径是 ' + r + ' cm，面积是多少 cm²？（π 取 3.14）', ans: String(+(3.14 * r * r).toFixed(2)), key: [+(3.14 * r * r).toFixed(2)] }; },
      function () { const c = 2 * ri(30, 80); return { q: '同弧所对的圆周角等于圆心角的一半。若圆心角是 ' + c + '°，对应的圆周角是多少度？', ans: String(c / 2), key: [c / 2] }; },
      function () { return { q: '半圆（直径）所对的圆周角是多少度？', ans: '90', key: [90] }; },
      function () { const d = ri(2, 12); return { q: '圆的直径是 ' + d + ' cm，半径是多少 cm？', ans: String(d / 2), key: [d / 2] }; }
    ],
    trig: [
      function () { return { q: 'sin 30° 的值是多少？（填小数，如 0.5）', ans: '0.5', key: [0.5] }; },
      function () { return { q: 'cos 60° 的值是多少？（填小数）', ans: '0.5', key: [0.5] }; },
      function () { return { q: 'tan 45° 的值是多少？', ans: '1', key: [1] }; },
      function () { return { q: 'sin 60° 的值是多少？（保留两位小数，√3 ≈ 1.732）', ans: '0.87', key: [0.87] }; },
      function () { const t = pick([[3, 4, 5], [6, 8, 10], [5, 12, 13]]); return { q: '直角三角形中，∠A 的对边是 ' + t[0] + '，斜边是 ' + t[2] + '，sin A 是多少？（填小数）', ans: String(+(t[0] / t[2]).toFixed(2)), key: [+(t[0] / t[2]).toFixed(2)] }; },
      function () { const t = pick([[3, 4, 5], [6, 8, 10], [5, 12, 13]]); return { q: '直角三角形中，∠A 的邻边是 ' + t[1] + '，斜边是 ' + t[2] + '，cos A 是多少？（填小数）', ans: String(+(t[1] / t[2]).toFixed(2)), key: [+(t[1] / t[2]).toFixed(2)] }; }
    ],
    geofig: [
      function () { const x = ri(20, 70);
        const svg = '<svg viewBox="0 0 180 100" width="150" height="84"><line x1="15" y1="85" x2="165" y2="85" stroke="#555" stroke-width="2"/><line x1="15" y1="85" x2="95" y2="15" stroke="#555" stroke-width="2"/><path d="M15 67 h18 v18" fill="none" stroke="#c2688f" stroke-width="1.5"/><text x="44" y="80" font-size="13" fill="#333">∠1</text><text x="80" y="58" font-size="13" fill="#333">∠2</text></svg>';
        return { q: '如图，∠1 与 ∠2 互余（和为 90°），∠1 ＝ ' + x + '°，∠2 是多少度？', ans: String(90 - x), key: [90 - x], svg: svg }; },
      function () { const a = ri(30, 80), b = ri(30, 70);
        const svg = '<svg viewBox="0 0 180 110" width="150" height="92"><polygon points="20,90 160,90 70,18" fill="none" stroke="#555" stroke-width="2"/><text x="26" y="104" font-size="12" fill="#c2688f">' + a + '°</text><text x="132" y="104" font-size="12" fill="#c2688f">' + b + '°</text><text x="64" y="36" font-size="13" fill="#333">?</text></svg>';
        return { q: '如图，三角形的两个内角分别是 ' + a + '° 和 ' + b + '°，第三个内角是多少度？', ans: String(180 - a - b), key: [180 - a - b], svg: svg }; },
      function () {
        const svg = '<svg viewBox="0 0 180 100" width="150" height="84"><polygon points="90,10 20,90 160,90" fill="none" stroke="#555" stroke-width="2"/><line x1="90" y1="10" x2="57" y2="90" stroke="#555" stroke-width="1.5"/><line x1="90" y1="10" x2="123" y2="90" stroke="#555" stroke-width="1.5"/></svg>';
        return { q: '数一数：下图中共有多少个三角形？', ans: '6', key: [6], svg: svg }; },
      function () { const x = ri(50, 130);
        const svg = '<svg viewBox="0 0 180 110" width="150" height="92"><line x1="15" y1="35" x2="165" y2="35" stroke="#555" stroke-width="2"/><line x1="15" y1="80" x2="165" y2="80" stroke="#555" stroke-width="2"/><line x1="45" y1="100" x2="140" y2="15" stroke="#555" stroke-width="2"/><text x="112" y="30" font-size="12" fill="#c2688f">' + x + '°</text><text x="112" y="75" font-size="13" fill="#333">?</text></svg>';
        return { q: '如图，两直线平行，一个同旁内角是 ' + x + '°，另一个同旁内角是多少度？', ans: String(180 - x), key: [180 - x], svg: svg }; },
      function () { const top = 2 * ri(15, 45);
        const svg = '<svg viewBox="0 0 180 110" width="150" height="92"><polygon points="90,15 30,95 150,95" fill="none" stroke="#555" stroke-width="2"/><text x="76" y="40" font-size="12" fill="#c2688f">' + top + '°</text><text x="36" y="88" font-size="13" fill="#333">?</text><text x="128" y="88" font-size="13" fill="#333">?</text></svg>';
        return { q: '如图，等腰三角形的顶角是 ' + top + '°，它的一个底角是多少度？', ans: String((180 - top) / 2), key: [(180 - top) / 2], svg: svg }; },
      function () { const a = ri(5, 20), b = ri(2, 12);
        const svg = '<svg viewBox="0 0 180 110" width="150" height="92"><rect x="30" y="25" width="120" height="65" fill="none" stroke="#555" stroke-width="2"/><text x="72" y="20" font-size="12" fill="#c2688f">' + a + ' cm</text><text x="154" y="62" font-size="12" fill="#c2688f">' + b + '</text></svg>';
        return { q: '如图，长方形的长是 ' + a + ' 厘米，宽是 ' + b + ' 厘米，它的周长是多少厘米？', ans: String(2 * (a + b)), key: [2 * (a + b)], svg: svg }; },
      function () { const n = ri(4, 7);
        let dots = '';
        for (let k = 0; k < n; k++) { dots += '<circle cx="' + (20 + k * (140 / (n - 1))) + '" cy="25" r="4" fill="#c2688f"/>'; }
        const svg = '<svg viewBox="0 0 180 45" width="150" height="38"><line x1="20" y1="25" x2="160" y2="25" stroke="#555" stroke-width="2"/>' + dots + '</svg>';
        return { q: '数一数：下图一条线段上有 ' + n + ' 个点，共能数出多少条线段？', ans: String(n * (n - 1) / 2), key: [n * (n - 1) / 2], svg: svg }; },
      function () { const r = ri(2, 5);
        let rays = '';
        for (let k = 0; k < r; k++) { const ang = Math.PI / 2 - (k + 1) * (Math.PI / 2) / (r + 1); rays += '<line x1="15" y1="90" x2="' + Math.round(15 + 120 * Math.cos(ang)) + '" y2="' + Math.round(90 - 120 * Math.sin(ang)) + '" stroke="#555" stroke-width="2"/>'; }
        const svg = '<svg viewBox="0 0 150 100" width="130" height="87"><line x1="15" y1="90" x2="145" y2="90" stroke="#555" stroke-width="2"/>' + rays + '<text x="18" y="82" font-size="12" fill="#333">O</text></svg>';
        return { q: '如图，从一个角的顶点 O 出发，在角内画了 ' + r + ' 条射线，图中共有多少个角？', ans: String((r + 1) * (r + 2) / 2), key: [(r + 1) * (r + 2) / 2], svg: svg }; },
      function () {
        const svg = '<svg viewBox="0 0 180 110" width="150" height="92"><rect x="55" y="25" width="70" height="70" fill="none" stroke="#555" stroke-width="2"/><line x1="90" y1="15" x2="90" y2="105" stroke="#c2688f" stroke-dasharray="5 4"/><line x1="45" y1="60" x2="135" y2="60" stroke="#c2688f" stroke-dasharray="5 4"/></svg>';
        return { q: '如图是正方形，它一共有几条对称轴？', ans: '4', key: [4], svg: svg }; },
      function () {
        const svg = '<svg viewBox="0 0 180 100" width="150" height="84"><line x1="20" y1="70" x2="160" y2="70" stroke="#555" stroke-width="2"/><circle cx="90" cy="30" r="5" fill="#c2688f"/><text x="82" y="24" font-size="12" fill="#333">A</text><line x1="90" y1="30" x2="90" y2="70" stroke="#c2688f" stroke-dasharray="5 4"/><path d="M90 58 h12 v12" fill="none" stroke="#c2688f" stroke-width="1.5"/></svg>';
        return { q: '如图，过直线外一点 A 画这条直线的垂线，能画出几条？', ans: '1', key: [1], svg: svg }; }
    ],
    stat: [
      function () { const m = ri(70, 95), n = ri(4, 8); return { q: n + ' 个数的平均数是 ' + m + '，它们的总和是多少？', ans: String(m * n), key: [m * n] }; },
      function () { const m = ri(70, 95), s = ri(200, 999); return { q: '5 个数的平均数是 ' + m + '，前 4 个数的和是 ' + s + '，第 5 个数是多少？', ans: String(5 * m - s), key: [5 * m - s] }; },
      function () { const a = ri(60, 80); return { q: '一组数据：' + a + '，' + (a + 2) + '，' + (a + 4) + '，' + (a + 6) + '，' + (a + 8) + '。这组数据的中位数是多少？', ans: String(a + 4), key: [a + 4] }; },
      function () { const a = ri(60, 90); return { q: '一组数据：' + a + '，' + (a + 3) + '，' + (a + 3) + '，' + (a + 5) + '。这组数据的众数是多少？', ans: String(a + 3), key: [a + 3] }; },
      function () { const a = ri(70, 90); return { q: '小明 3 次测验成绩分别是 ' + a + '、' + (a + 6) + '、' + (a + 9) + '，平均分是多少？', ans: String(a + 5), key: [a + 5] }; },
      function () { const a = ri(60, 90); return { q: '一组数据：' + a + '，' + (a + 4) + '，' + (a + 8) + '，' + (a + 12) + '。它们的平均数是多少？', ans: String(a + 6), key: [a + 6] }; }
    ]
  };
  SHAWN_POOLS.all = [];
  Object.keys(SHAWN_POOLS).forEach(function (k) { if (k !== 'all') SHAWN_POOLS.all = SHAWN_POOLS.all.concat(SHAWN_POOLS[k]); });
 function revealHTML(ans, exp) {
    return '<div class="reveal">答案：' + fmtMath(ans) + (exp ? '<span class="exp">解析：' + fmtMath(exp) + '</span>' : '') + '</div>';
  }
  /* ===== 分数标准排版：把 a/b（含复合分子分母）渲染成上下结构 ===== */
  function fracHTML(num, den) {
    return '<span class="frac"><span class="fnum">' + num + '</span><span class="fden">' + den + '</span></span>';
  }
  function isSup(c) { return '\u2070\u00b9\u00b2\u00b3\u2074\u2075\u2076\u2077\u2078\u2079'.indexOf(c) >= 0; }
  function matchBracket(s, i) {
    const open = s[i];
    const pairs = { '(': ')', '[': ']', '{': '}' };
    const stack = [];
    for (let j = i; j < s.length; j++) {
      const c = s[j];
      if (open === '|') {
        if (j > i && c === '|') return j;
        if (pairs[c]) stack.push(pairs[c]);
        else if (stack.length && c === stack[stack.length - 1]) stack.pop();
      } else {
        if (pairs[c]) stack.push(pairs[c]);
        else if (stack.length && c === stack[stack.length - 1]) {
          stack.pop();
          if (!stack.length) return j;
        }
      }
    }
    return -1;
  }
  function mathTokens(s) {
    const toks = [], pairs = { '(': ')', '[': ']', '{': '}' }, OPS = '\u2212-+\u00d7\u00f7=/';
    let i = 0;
    while (i < s.length) {
      const c = s[i];
      if (/\s/.test(c)) { i++; continue; }
      if (OPS.indexOf(c) >= 0) { toks.push(['op', c]); i++; continue; }
      if (c === '|' || pairs[c]) {
        const j = matchBracket(s, i);
        if (j > i) {
          if (c === '|') toks.push(['abs', mathRender(s.slice(i + 1, j))]);
          else toks.push(['grp', c, mathRender(s.slice(i + 1, j)), pairs[c]]);
          i = j + 1;
          continue;
        }
      }
      if (c >= '0' && c <= '9') {
        const m = /^[0-9]+/.exec(s.slice(i))[0];
        let k = i + m.length, sup = '';
        while (k < s.length && isSup(s[k])) { sup += s[k]; k++; }
        const mm = /^\s+([0-9]+)\s*\/\s*([0-9]+)/.exec(s.slice(k));
        if (mm) { toks.push(['prim', m + ' ' + fracHTML(mm[1], mm[2])]); i = k + mm[0].length; continue; }
        if (s[k] === '%') { sup += '%'; k++; }
        if (s[k] === '!') { sup += '!'; k++; }
        toks.push(['prim', m + sup]);
        i = k;
        continue;
      }
      if (c === '\u2026') {
        const m2 = /^\u2026+/.exec(s.slice(i))[0];
        toks.push(['prim', m2]);
        i += m2.length;
        continue;
      }
      toks.push(['prim', c]);
      i++;
    }
    return toks;
  }
  function tokHTML(t, dropBrackets) {
    if (t[0] === 'prim' || t[0] === 'op') return t[1];
    if (t[0] === 'abs') return '|' + t[1] + '|';
    if (t[0] === 'grp') return dropBrackets ? t[2] : (t[1] + t[2] + t[3]);
    return '';
  }
  function mathRender(src) {
    const toks = mathTokens(src);
    const out = [];
    let i = 0;
    while (i < toks.length) {
      const t = toks[i];
      if (t[0] === 'op' && t[1] === '/' && out.length && i + 1 < toks.length) {
        const num = out.pop(), den = toks[i + 1];
        out.push(['frac', tokHTML(num, true), tokHTML(den, true)]);
        i += 2;
        continue;
      }
      out.push(t);
      i++;
    }
    return out.map(function (x) {
      return x[0] === 'frac' ? fracHTML(x[1], x[2]) : tokHTML(x, false);
    }).join('');
  }
  function fmtMath(s) {
    return mathRender(escapeHtml(s === null || s === undefined ? '' : String(s)));
  }
  function genFromPool(pool, n) {
    const out = [], seen = {};
    let guard = 0;
    while (out.length < n && guard < n * 40) {
      guard++;
      const it = pick(pool)();
      if (!it || !it.q || seen[it.q]) continue;
      seen[it.q] = 1;
      out.push(it);
    }
    while (out.length < n) { const it = pick(pool)(); out.push(it); }
    return out;
  }

  /* 通用模块的题目登记表（用于错题本） */
  const GENERIC_REG = {};
  function regGeneric(typeId, title, items) { GENERIC_REG[typeId] = { title: title, items: items }; }
  function findProblem(typeId, i) {
    const t = TYPES.find(function (x) { return x.id === typeId; });
    if (t) {
      const p = currentProblems[typeId] && currentProblems[typeId][i];
      return p ? { q: p.q, a: p.a, title: t.title } : null;
    }
    const g = GENERIC_REG[typeId];
    if (g && g.items[i]) return { q: g.items[i].q, a: g.items[i].a, title: g.title };
    return null;
  }

var reciteTerms = { df: '七上', ls: '七上', dl: '七上', sw: '七上' };
var reciteUnits = { df: 0, ls: 0, dl: 0, sw: 0 };
var reciteOrder = {};
var reciteDraw = {};
function reciteBank(key) { return RECITE_BANKS[key]; }
function reciteTermList(key) { return Object.keys(reciteBank(key).terms); }
function reciteCurTerm(key) {
  const ks = reciteTermList(key);
  if (ks.indexOf(reciteTerms[key]) < 0) reciteTerms[key] = ks[0];
  return reciteTerms[key];
}
function reciteCurUnits(key) { return reciteBank(key).terms[reciteCurTerm(key)].units; }
function reciteIsRandom(key) { return reciteUnits[key] === -1; }
function reciteCurIndex(key) {
  if (reciteIsRandom(key)) return -1;
  const us = reciteCurUnits(key);
  let i = reciteUnits[key];
  if (typeof i !== 'number' || i < 0 || i >= us.length) i = 0;
  reciteUnits[key] = i;
  return i;
}
function reciteUnitItems(key) {
  const u = reciteCurUnits(key)[reciteCurIndex(key)];
  return (u && u.i ? u.i : []).map(function (x) { return { q: x[0], a: x[1] }; });
}
// 把本册所有单元（含学期综合）合成一个题库，用来随机抽题
function reciteTermPool(key) {
  const out = [], seen = {};
  reciteCurUnits(key).forEach(function (u) {
    (u.i || []).forEach(function (x) {
      if (seen[x[0]]) return;
      seen[x[0]] = 1;
      out.push({ q: x[0], a: x[1] });
    });
  });
  return out;
}
function reciteDrawRandom(key) {
  const pool = reciteTermPool(key);
  const idx = pool.map(function (_, i) { return i; });
  for (let i = idx.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const t = idx[i]; idx[i] = idx[j]; idx[j] = t;
  }
  const items = idx.slice(0, Math.min(15, pool.length)).map(function (i) { return pool[i]; });
  reciteDraw[key] = { term: reciteCurTerm(key), items: items };
  return items;
}
function reciteItems(key) {
  if (reciteIsRandom(key)) {
    const d = reciteDraw[key];
    if (!d || d.term !== reciteCurTerm(key)) return reciteDrawRandom(key);
    return d.items;
  }
  const base = reciteUnitItems(key);
  const ord = reciteOrder[key];
  if (ord && ord.term === reciteCurTerm(key) && ord.unit === reciteCurIndex(key) && ord.len === base.length) {
    return ord.idx.map(function (i) { return base[i]; });
  }
  return base;
}
function reciteSetTerm(key, t) {
  reciteTerms[key] = t;
  reciteUnits[key] = 0;
  reciteOrder[key] = null;
  reciteDraw[key] = null;
  renderGenericBody();
  buildGenericToolbar();
}
function reciteSetUnit(key, i) {
  reciteUnits[key] = i;
  reciteOrder[key] = null;
  if (i === -1) reciteDraw[key] = null;
  renderGenericBody();
  buildGenericToolbar();
}
// 换一批：随机练习模式重新抽题，普通单元则打乱顺序
function reciteRefresh(key) {
  if (reciteIsRandom(key)) {
    reciteDrawRandom(key);
    renderGenericBody();
    toast('已换一批新题');
    return;
  }
  const base = reciteUnitItems(key);
  const idx = base.map(function (_, i) { return i; });
  for (let i = idx.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const t = idx[i]; idx[i] = idx[j]; idx[j] = t;
  }
  reciteOrder[key] = { term: reciteCurTerm(key), unit: reciteCurIndex(key), len: base.length, idx: idx };
  renderGenericBody();
  toast('已打乱顺序');
}
function reciteOpenAll(open) {
  document.querySelectorAll('#module-content .flash-item').forEach(function (d) { d.open = open; });
}
function reciteBodyHTML(cfg) {
  const key = cfg.bank, bk = reciteBank(key);
  const terms = reciteTermList(key), term = reciteCurTerm(key);
  const us = reciteCurUnits(key), ui = reciteCurIndex(key);
  const unit = us[ui] || { n: '', i: [] };
  const isRand = reciteIsRandom(key);
  const items = reciteItems(key);
  const tid = cfg.id + '|' + term + '|' + (isRand ? 'rand' : ui);
  const unitTitle = bk.name + ' · ' + term + ' · ' + (isRand ? '随机练习' : unit.n);
  regGeneric(tid, unitTitle, items);
  let html = '';
  html += '<div class="grade-bar recite-bar">' + terms.map(function (t) {
    return '<button class="' + (t === term ? 'active' : '') + '" onclick="reciteSetTerm(\'' + key + '\',\'' + t + '\')">' + t + '</button>';
  }).join('') + '</div>';
  html += '<div class="grade-bar recite-bar units">' + us.map(function (u, i) {
    return '<button class="' + (i === ui ? 'active' : '') + '" onclick="reciteSetUnit(\'' + key + '\',' + i + ')">' + escapeHtml(u.n) + '</button>';
  }).join('') + '<button class="rand' + (isRand ? ' active' : '') + '" onclick="reciteSetUnit(\'' + key + '\',-1)">🎲 随机抽题</button></div>';
  html += '<p class="recite-count">' + escapeHtml(unitTitle) + '　共 ' + items.length + ' 题'
    + (isRand ? '（本册全部单元随机抽取，点「换一批」可再抽）' : '') + '</p>';
  html += '<div class="flash-list">' + items.map(function (it, i) {
    return '<details class="flash-item"><summary>' + escapeHtml(it.q) + '</summary>' +
      '<div class="flash-a">' + escapeHtml(it.a) +
      ' <button class="add-wrong" data-type="' + tid + '" data-i="' + i + '">＋错题本</button></div></details>';
  }).join('') + '</div>';
  return html;
}

  const GENERIC_MODULES = {
    'sx-math': { id: 'sx-math', name: '数学思维', title: '🧮 数学思维（初中 · 按知识大类）', kind: 'shawnmath', tip: '按 12 个知识大类练习，每类 10 题，点「批改本组」。分数写成 1/6 这样（手写或键盘都行），等值小数也算对。' },
    'sx-calc': { id: 'sx-calc', name: '数学计算', title: '✏️ 数学计算（初中 · 三组）', kind: 'shawncalc', tip: '有理数 / 整式 / 巧算 三组，每组 10 题，点「批改本组」。分数写 1/6、小数写 0.75、负数写 -3，等值的写法都算对。' },
    'sx-eng': { id: 'sx-eng', name: '英语语法', title: '🔤 英语（译林版 · 学期 / 题型）', kind: 'engsec', gen: function () { return []; }, tip: '按学期切换到「初一上 / 初一下 / 初二上」，再按题型分组练习；答错会显示解析。' },
    'sx-df': { id: 'sx-df', name: '道法背诵', title: '📕 道德与法治（按学期 · 单元）', kind: 'recite', bank: 'df', tip: '按学期和单元整理，每个单元一组；先自己回想，再点开对照。' },
    'sx-ls': { id: 'sx-ls', name: '历史背诵', title: '📗 历史（按学期 · 单元）', kind: 'recite', bank: 'ls', tip: '按学期和单元整理，每个单元一组；先自己回想，再点开对照。' },
    'sx-dl': { id: 'sx-dl', name: '地理背诵', title: '📘 地理（按学期 · 章节）', kind: 'recite', bank: 'dl', tip: '按学期和章节整理，每章一组；先自己回想，再点开对照。' },
    'sx-sw': { id: 'sx-sw', name: '生物背诵', title: '🧬 生物（按学期 · 单元）', kind: 'recite', bank: 'sw', tip: '按学期和单元整理，每个单元一组；先自己回想，再点开对照。' },
    'sx-oral': { id: 'sx-oral', name: '英语词组', title: '🗣️ 英语词组（Unit 1-8 · 中英互测）', kind: 'phrase', gen: phItems, tip: '先选单元与方向：中→英 写英文短语，英→中 写中文意思，写完点「批改本组」。' },
    'sx-chin': { id: 'sx-chin', name: '语文', title: '📜 语文 · 知识点与古文词义', kind: 'flash', gen: genChinGraded, tip: '先自己回想答案，再点开对照（题干均取自课本原文）；背完点「完成背诵」。' }
  };
 let curGeneric = null;
  // 一个答案可以用 / 或 or 列出多种可接受说法：整句一致算对，任一种说法一致也算对
  function gradeText(input, ans) {
    const norm = function (x) {
      return String(x === null || x === undefined ? '' : x).toLowerCase()
        .replace(/[\s'’‘\-–—.,!?;:，。！？；：·()（）\[\]【】"]/g, '');
    };
    const a = norm(ans), b = norm(input);
    if (!b) return false;
    if (a === b) return true;
    return String(ans).split(/\s*\/\s*|\s+or\s+/i)
      .map(norm)
      .filter(function (v) { return v !== ''; })
      .some(function (v) { return v === b; });
  }
  function gradeBarHTML(cur, fnName) {
    return '<div class="grade-bar">' + ['初一', '初二', '初三'].map(function (g) {
      return '<button class="' + (g === cur ? 'active' : '') + '" onclick="' + fnName + '(\'' + g + '\')">' + g + '</button>';
    }).join('') + '</div>';
  }
  // ===== 连点保护：快速连按底部按钮时只渲染最后一次，避免连续重绘把页面拖死 =====
  var _pendingModule = null, _moduleTimer = null, _rendering = false, _lastRenderAt = 0;
  var MODULE_MIN_GAP = 260;   // 两次整页渲染之间至少间隔 260ms，连点只会渲染最后一次
  function openModule(id) {
    const cfg = GENERIC_MODULES[id];
    if (!cfg) return;
    // 已经在这个页面了：只把页面切回来，不重新生成（避免误触清空已写内容）
    var modal = document.getElementById('page-module');
    if (curGeneric && curGeneric.cfg.id === id && modal && modal.classList.contains('active')) {
      showPage('module');
      return;
    }
    _pendingModule = id;
    if (_moduleTimer) clearTimeout(_moduleTimer);
    const wait = Math.max(40, MODULE_MIN_GAP - (Date.now() - _lastRenderAt));
    _moduleTimer = setTimeout(function () {
      _moduleTimer = null;
      const mid = _pendingModule;
      _pendingModule = null;
      if (!mid) return;
      openModuleNow(mid);
    }, wait);
  }
  function openModuleNow(id) {
    const cfg = GENERIC_MODULES[id];
    if (!cfg) return;
    if (_rendering) { _pendingModule = id; return; }
    _rendering = true;
    try {
      releaseScratch(document.getElementById('module-content'));
      curGeneric = { cfg: cfg, items: (cfg.gen ? cfg.gen() : []) };
      setText('module-title', cfg.title);
      buildGenericToolbar();
      renderGenericBody();
      showPage('module');
      document.querySelectorAll('.bottom-nav button').forEach(function (b) {
        b.classList.toggle('active', b.getAttribute('data-page') === id);
      });
    } finally {
      _lastRenderAt = Date.now();
      setTimeout(function () {
        _rendering = false;
        if (_pendingModule) {
          const n = _pendingModule;
          _pendingModule = null;
          _lastRenderAt = Date.now();
          openModuleNow(n);
        }
      }, 0);
    }
  }
  // 离开页面时把草稿画布缩到 1×1，立刻释放显存与内存（否则连点几下就会卡死）
  function releaseScratch(root) {
    if (!root) return;
    root.querySelectorAll('canvas.scratch').forEach(function (cv) {
      try { cv.width = 1; cv.height = 1; } catch (e) {}
      cv._ink = null;
      cv._inked = false;
      cv._parked = true;
    });
  }
  function buildGenericToolbar() {
    const tb = document.getElementById('module-toolbar');
    const cfg = curGeneric.cfg;
    let html = '';
    if (cfg.kind === 'practice' || cfg.kind === 'mcq' || cfg.kind === 'phrase') {
      const full = (cfg.kind === 'phrase') ? 100 : 10;
      html += '<button class="primary" onclick="gradeGeneric()">✔ 批改本组</button> <span class="score" id="generic-score">— / ' + full + '</span> ';
    }
    if (cfg.kind === 'flash') {
      html += '<button class="primary" onclick="finishGeneric()">✔ 完成背诵</button> ';
    }
    if (cfg.kind === 'oral') {
      html += '<button class="primary" onclick="finishGeneric()">✔ 完成朗读</button> ';
    }
    if (cfg.kind === 'shawnmath' || cfg.kind === 'shawncalc') {
      html += '<button onclick="shawnShowAll(true)">展开全部答案</button> ';
      html += '<button onclick="shawnShowAll(false)">收起全部答案</button> ';
    }
    if (cfg.kind === 'recite') {
      html += '<button class="primary" onclick="finishGeneric()">✔ 完成背诵</button> ';
      html += '<button onclick="reciteRefresh(\'' + cfg.bank + '\')">' + (reciteIsRandom(cfg.bank) ? '🎲 换一批新题' : '🎲 打乱顺序') + '</button> ';
      html += '<button onclick="reciteOpenAll(true)">展开全部答案</button> ';
      html += '<button onclick="reciteOpenAll(false)">收起全部答案</button> ';
    } else {
      html += '<button onclick="refreshGeneric()">🎲 换一批</button>';
    }
    // 每个模块顶部都能直接打开错题本
    html += '<button onclick="openWrongBook()">📓 错题本 <span class="wb-badge"></span></button>';
    tb.innerHTML = html;
  }
  function renderGenericBody() {
    const wrap = document.getElementById('module-content');
    const cfg = curGeneric.cfg, items = curGeneric.items;
    const mid = cfg.id;
    let html = '<p class="intro">' + escapeHtml(cfg.tip) + '</p>';
    if (cfg.kind === 'phrase') {
      html += phraseBodyHTML(cfg);
      setTimeout(phRenderPodium, 0);
    } else if (cfg.kind === 'shawnmath') {
      html += buildShawnSections(SHAWN_TYPES, 'sm');
      setTimeout(calRenderAllPodiums, 0);
    } else if (cfg.kind === 'shawncalc') {
      html += buildShawnSections(SHAWN_CALC, 'sc');
      setTimeout(calRenderAllPodiums, 0);
    } else if (cfg.kind === 'engsec') {
      html += buildEngSections();
      setTimeout(engBoardRender, 0);
    } else if (cfg.kind === 'practice') {
      regGeneric(mid, cfg.name, items.map(function (it) { return { q: it.q, a: it.ans }; }));
      html += '<div class="mod-body text">';
      items.forEach(function (it, i) {
        html += '<div class="calc-item" data-gi="' + i + '"><div class="calc-main">' +
          '<div class="q">' + (i + 1) + '、' + escapeHtml(it.q) + '</div>' +
          '<div class="a-row"><input class="ans-input g-input" data-i="' + i + '" type="text" inputmode="numeric" placeholder="✏️ 写答案" autocomplete="off"><span class="mark"></span></div>' +
          '<div class="reveal">答案：' + escapeHtml(it.ans) + '</div></div>' +
          '<button class="add-wrong" data-type="' + mid + '" data-i="' + i + '">＋错题本</button></div>';
      });
      html += '</div>';
    } else if (cfg.kind === 'mcq') {
      regGeneric(mid, cfg.name, items.map(function (it) { return { q: it.q, a: it.ans }; }));
      html += '<div class="mod-body text">';
      items.forEach(function (it, i) {
        html += '<div class="calc-item" data-gi="' + i + '"><div class="calc-main">' +
          '<div class="q">' + (i + 1) + '、' + escapeHtml(it.q) + '</div>' +
          '<div class="mc">' + it.options.map(function (o) { return '<button class="mc-opt" data-i="' + i + '">' + escapeHtml(o) + '</button>'; }).join('') + '</div>' +
          '<span class="mark"></span><div class="reveal">答案：' + escapeHtml(it.ans) + '</div></div>' +
          '<button class="add-wrong" data-type="' + mid + '" data-i="' + i + '">＋错题本</button></div>';
      });
      html += '</div>';
    } else if (cfg.kind === 'eng') {
      html += gradeBarHTML(engGrade, 'engSetGrade');
      regGeneric(mid, cfg.name, items.map(function (it) { return { q: it.q, a: it.ans }; }));
      html += '<div class="mod-body text">';
      items.forEach(function (it, i) {
        var inner = '<div class="q">' + (i + 1) + '、' + escapeHtml(it.q) + '</div>';
        if (it.options) {
          inner += '<div class="mc">' + it.options.map(function (o) { return '<button class="mc-opt" data-i="' + i + '">' + escapeHtml(o) + '</button>'; }).join('') + '</div><span class="mark"></span>';
        } else {
          inner += '<div class="a-row"><input class="ans-input g-input" data-i="' + i + '" type="text" placeholder="✏️ 写单词" autocomplete="off" spellcheck="false"><span class="mark"></span></div>';
        }
        html += '<div class="calc-item" data-gi="' + i + '"><div class="calc-main">' + inner +
          '<div class="reveal">答案：' + escapeHtml(it.ans) + '</div></div>' +
          '<button class="add-wrong" data-type="' + mid + '" data-i="' + i + '">＋错题本</button></div>';
      });
      html += '</div>';
    } else if (cfg.kind === 'flash') {
      if (mid === 'sx-chin') html += gradeBarHTML(chinGrade, 'chinSetGrade');
      regGeneric(mid, cfg.name, items.map(function (it) { return { q: it.q, a: it.a }; }));
      html += '<div class="flash-list">';
      items.forEach(function (it, i) {
        html += '<details class="flash-item"><summary>' + (it.subject ? '<span class="tag">' + escapeHtml(it.subject) + '</span>' : '') + escapeHtml(it.q) + '</summary>' +
          '<div class="flash-a">' + escapeHtml(it.a) + ' <button class="add-wrong" data-type="' + mid + '" data-i="' + i + '">＋错题本</button></div></details>';
      });
      html += '</div>';
    } else if (cfg.kind === 'recite') {
      html += reciteBodyHTML(cfg);
    } else if (cfg.kind === 'oral') {
      html += '<ol class="oral-list">';
      items.forEach(function (it) { html += '<li>' + escapeHtml(it) + '</li>'; });
      html += '</ol>';
    }
    wrap.innerHTML = html;
    initScratchCanvases();
    updateAddedMarks();
    updateWrongBadge();
  syncBoot();
  }
  const shawnKeys = {};
  function shawnSectionInner(t, ti, prefix) {
    const gid = prefix + '-' + t.id;
    const items = genFromPool(SHAWN_POOLS[t.pool], 10);
    shawnKeys[gid] = items.map(function (it) { return it.key; });
    regGeneric(gid, t.title, items.map(function (it) { return { q: it.q, a: it.ans }; }));
    let html = '<h2><span class="num">' + ti + '</span>' + escapeHtml(t.title) + ' <span class="badge">' + escapeHtml(t.grade || t.badge || '') + '</span></h2>';
    const _poolTip = SHAWN_POOL_TIPS[t.pool] || '';
    if (_poolTip) html += '<p class="sec-tip">📘 ' + escapeHtml(_poolTip) + '</p>';
    html += '<div class="mod-toolbar"><button class="primary-btn" onclick="gradeShawn(\'' + prefix + '\',\'' + t.id + '\')">✔ 批改本组</button> <button onclick="analyzeSectionDrafts(\'' + prefix + '\',\'' + t.id + '\')">🔍 AI 批改草稿</button> <button onclick="refreshShawnSection(\'' + prefix + '\',\'' + t.id + '\')">🎲 换一批</button> ' + scratchToolsHTML() + ' <span class="sec-score" id="' + gid + '-score"></span></div>';
    html += '<div class="calc-pod" data-pod="' + gid + '"></div>';
    html += '<div class="mod-body text onecol" id="' + gid + '-body">';
    const ansList = [];
    items.forEach(function (it, i) {
      ansList.push('<li>' + escapeHtml(it.ans) + '</li>');
      html += '<div class="calc-item" data-gi="' + gid + '-' + i + '"><div class="calc-main">' +
        '<div class="q" data-q="' + escapeHtml(it.q) + '">' + (i + 1) + '、' + (it.qhtml || fmtMath(it.q)) + '</div>' +
        (it.svg ? '<div class="geofig">' + it.svg + '</div>' : '') +
        '<div class="a-row"><input class="ans-input sm-input" data-g="' + gid + '" data-i="' + i + '" type="text" inputmode="text" placeholder="✏️ 如 1/6" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"><span class="mark"></span></div>' +
        '<button class="add-wrong" data-type="' + gid + '" data-i="' + i + '">＋错题本</button>' +
        '<button type="button" class="ai-draft">🔍 AI 读草稿指错步</button>' +
        revealHTML(it.ans, it.exp) + '</div>' +
        '<canvas class="scratch" width="2" height="2" aria-label="草稿区"></canvas></div>';
    });
    html += '</div>';
    html += '<details class="answers"><summary>查看本组答案</summary><ol class="answer-list">' + ansList.join('') + '</ol></details>';
    return html;
  }
  let shawnGrade = '初一';
  function shawnFilter(g) {
    shawnGrade = g;
    renderGenericBody();
    setTimeout(function () { if (typeof ggSync === 'function') ggSync(); }, 0);
    toast('已切换到「' + g + '」');
  }
  function buildShawnSections(types, prefix) {
    const grades = ['初一', '初二', '初三', '综合', '全部'];
    const list = (prefix === 'sm' && shawnGrade !== '全部')
      ? types.filter(function (t) { return t.grade === shawnGrade; })
      : types;
    let bar = '';
    if (prefix === 'sm') {
      bar = '<div class="grade-bar">' + grades.map(function (g) {
        return '<button class="' + (g === shawnGrade ? 'active' : '') + '" onclick="shawnFilter(\'' + g + '\')">' + g + '</button>';
      }).join('') + '</div>';
    }
    const toc = [];
    let html = '';
    list.forEach(function (t, ti) {
      toc.push('<a href="#' + prefix + '-' + t.id + '">' + (ti + 1) + ' ' + escapeHtml(t.title) + '</a>');
      html += '<section class="type" data-grade="' + t.grade + '" id="' + prefix + '-' + t.id + '">' + shawnSectionInner(t, ti + 1, prefix) + '</section>';
    });
    return bar + '<nav class="toc"><h2>目录</h2><div class="links">' + toc.join('') + '</div></nav>' + html;
  }
  function refreshShawnSection(prefix, tid) {
    const arr = prefix === 'sm' ? SHAWN_TYPES : SHAWN_CALC;
    const t = arr.find(function (x) { return x.id === tid; });
    const sec = document.getElementById(prefix + '-' + tid);
    if (!t || !sec) return;
    sec.innerHTML = shawnSectionInner(t, arr.indexOf(t) + 1, prefix);
    initScratchCanvases(sec);
    updateAddedMarks();
    toast('已换一批');
  }
  function shawnShowAll(open) {
    const c = document.getElementById('module-content');
    if (!c) return;
    c.querySelectorAll('.mod-body').forEach(function (b) { b.classList.toggle('show-ans', open); });
  }
  /* ===== 悬浮「按组批改」菜单 ===== */
  function ggCtx() {
    if (!curGeneric) return null;
    const kind = curGeneric.cfg.kind;
    if (kind === 'shawncalc') return { prefix: 'sc', arr: SHAWN_CALC };
    if (kind === 'shawnmath') return { prefix: 'sm', arr: SHAWN_TYPES };
    if (kind === 'engsec') return { prefix: 'eng', eng: true };
    return null;
  }
  function ggGroups() {
    const ctx = ggCtx();
    if (!ctx) return [];
    const out = [];
    if (ctx.eng) {
      Object.keys(engSecItems).forEach(function (gid) {
        const sec = document.getElementById(gid);
        if (!sec) return;
        const body = sec.querySelector('.mod-body');
        if (!body) return;
        const h = sec.querySelector('h2');
        let name = gid;
        if (h) {
          const c = h.cloneNode(true);
          const num = c.querySelector('.num'), bd = c.querySelector('.badge');
          if (num) num.remove();
          if (bd) bd.remove();
          name = c.textContent.replace(/\s+/g, ' ').trim() || gid;
        }
        out.push({ gid: gid, prefix: 'eng', tid: gid, name: name, sec: sec });
      });
      return out;
    }
    ctx.arr.forEach(function (t) {
      const gid = ctx.prefix + '-' + t.id;
      const sec = document.getElementById(gid);
      const body = document.getElementById(gid + '-body') || (sec && sec.querySelector('.mod-body'));
      if (!sec || !body) return;
      const h = sec.querySelector('h2');
      let name = t.title;
      if (h) {
        const c = h.cloneNode(true);
        const num = c.querySelector('.num'), bd = c.querySelector('.badge');
        if (num) num.remove();
        if (bd) bd.remove();
        name = c.textContent.replace(/\s+/g, ' ').trim() || t.title;
      }
      out.push({ gid: gid, prefix: ctx.prefix, tid: t.id, name: name, sec: sec });
    });
    return out;
  }
  function ggCurrent(list) {
    const mid = (window.innerHeight || 800) / 2;
    let best = list.length ? list[0] : null;
    list.forEach(function (g) {
      if (g.sec.getBoundingClientRect().top <= mid) best = g;
    });
    return best;
  }
  function ggSync() {
    const btn = document.getElementById('gg-btn');
    if (!btn) return;
    const on = !!ggCtx();
    btn.style.display = on ? '' : 'none';
    if (!on) toggleGradeMenu(false);
  }
  function toggleGradeMenu(force) {
    const p = document.getElementById('gg-panel'), btn = document.getElementById('gg-btn');
    if (!p || !btn) return;
    const open = (typeof force === 'boolean') ? force : !p.classList.contains('open');
    if (!open) {
      p.classList.remove('open');
      btn.classList.remove('on');
      return;
    }
    const list = ggGroups();
    if (!list.length) { toast('这个页面没有可批改的分组'); return; }
    const cur = ggCurrent(list);
    let html = '<div class="gg-head"><span>&#10004; 按组批改</span><button type="button" onclick="toggleGradeMenu(false)">关闭</button></div>';
    list.forEach(function (g) {
      const sc = (document.getElementById(g.gid + '-score') || {}).textContent || '';
      const isCur = cur && cur.gid === g.gid;
      html += '<div class="gg-row' + (isCur ? ' cur' : '') + '">' +
        '<span class="gg-name">' + (isCur ? '<em>当前</em> ' : '') + escapeHtml(g.name) +
        (sc ? ' <span class="gg-score">' + escapeHtml(sc) + '</span>' : '') + '</span>' +
        '<button type="button" class="' + (isCur ? 'pri' : '') + '" onclick="ggGrade(\'' + g.prefix + '\',\'' + g.tid + '\')">&#10004; 批改</button>';
      if (g.prefix !== 'eng') html += '<button type="button" onclick="ggDraft(\'' + g.prefix + '\',\'' + g.tid + '\')">&#128269; 草稿</button>';
      html += '</div>';
    });
    p.innerHTML = html;
    p.classList.add('open');
    btn.classList.add('on');
  }
  function ggGrade(prefix, tid) {
    const gid = prefix === 'eng' ? tid : prefix + '-' + tid;
    if (prefix === 'eng') gradeEng(tid); else gradeShawn(prefix, tid);
    const sc = (document.getElementById(gid + '-score') || {}).textContent || '';
    toggleGradeMenu(false);
    const sec = document.getElementById(gid);
    if (sec) sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
    toast('已批改这一组：' + sc);
  }
  function ggDraft(prefix, tid) {
    toggleGradeMenu(false);
    analyzeSectionDrafts(prefix, tid);
  }
  document.addEventListener('click', function (e) {
    const p = document.getElementById('gg-panel');
    if (!p || !p.classList.contains('open')) return;
    if (p.contains(e.target)) return;
    const btn = document.getElementById('gg-btn');
    if (btn && btn.contains(e.target)) return;
    toggleGradeMenu(false);
  }, true);

  function gradeShawn(prefix, tid) {
    const gid = prefix + '-' + tid;
    const keys = shawnKeys[gid] || [];
    let total = 0, correct = 0;
    keys.forEach(function (key, i) {
      total++;
      const inp = document.querySelector('.sm-input[data-g="' + gid + '"][data-i="' + i + '"]');
      const ok = inp ? gradeOne(inp.value, key) : false;
      if (ok) correct++;
      const card = document.querySelector('.calc-item[data-gi="' + gid + '-' + i + '"]');
      if (card) {
        card.classList.remove('right', 'wrong');
        card.classList.add(ok ? 'right' : 'wrong');
        const mk = card.querySelector('.mark'); if (mk) mk.textContent = ok ? '✓' : '✗';
        if (!ok) {
          const r = card.querySelector('.reveal');
          if (r) {
            r.style.display = 'block';
            const sc = card.querySelector('canvas.scratch');
            const ta = card.querySelector('.step-input');
            addAiVerdict(r, card);
          }
        }
      }
    });
    setText(gid + '-score', correct + ' / ' + total);
    const cr = calLog(gid, correct, total);
    calRenderPodium(gid);
    if (cr.prevLast !== null && cr.score > cr.prevLast) {
      completeModule(curGeneric.cfg.id, curGeneric.cfg.name, 5, 'æœ¬ç»„æ¯”ä¸Šæ¬¡æé«˜ ' + (cr.score - cr.prevLast) + ' åˆ†');
      toast('ðŸ‘ è¿™ç»„æ¯”ä¸Šæ¬¡æé«˜ ' + (cr.score - cr.prevLast) + ' åˆ†ï¼Œå¥–åŠ± +5â­');
    } else {
      toast('æœ¬ç»„å¾—åˆ† ' + cr.score + ' åˆ†ï¼Œå·²è®°å½•');
    }
    const ab = accBonus(total > 0 ? correct / total : 0);
    completeModule(curGeneric.cfg.id, curGeneric.cfg.name, ab, '正确率+' + ab);
  }
  function gradeGeneric() {
    const cfg = curGeneric.cfg, items = curGeneric.items;
    let total = 0, correct = 0;
    items.forEach(function (it, i) {
      total++;
      let ok = false;
      if (cfg.kind === 'mcq') {
        const sel = document.querySelector('.mc .mc-opt.sel[data-i="' + i + '"]');
        ok = sel ? (sel.textContent === it.ans) : false;
      } else if (cfg.kind === 'phrase') {
        const pin = document.querySelector('.ph-input[data-i="' + i + '"]');
        ok = pin ? gradeText(pin.value, it.ans) : false;      } else if (cfg.kind === 'eng') {
        if (it.options) {
          const sel = document.querySelector('.mc .mc-opt.sel[data-i="' + i + '"]');
          ok = sel ? gradeText(sel.textContent, it.ans) : false;
        } else {
          const inp = document.querySelector('.g-input[data-i="' + i + '"]');
          ok = inp ? gradeText(inp.value, it.ans) : false;
        }
      } else {
        const inp = document.querySelector('.g-input[data-i="' + i + '"]');
        ok = inp ? gradeOne(inp.value, it.key) : false;
      }
      if (ok) correct++;
      const card = document.querySelector('.calc-item[data-gi="' + i + '"]');
      if (card) {
        card.classList.remove('right', 'wrong');
        card.classList.add(ok ? 'right' : 'wrong');
        const mk = card.querySelector('.mark'); if (mk) mk.textContent = ok ? '✓' : '✗';
        if (!ok) {
          const r = card.querySelector('.reveal');
          if (r) {
            r.style.display = 'block';
            const sc = card.querySelector('canvas.scratch');
            const ta = card.querySelector('.step-input');
            addAiVerdict(r, card);
          }
        }
      }
    });
    if (typeof cfg !== 'undefined' && cfg && cfg.kind === 'phrase') { phAfterGrading(correct, total); return; }
    const sc = document.getElementById('generic-score');
    if (sc) sc.textContent = correct + ' / ' + total;
    const ab = accBonus(total > 0 ? correct / total : 0);
    completeModule(cfg.id, cfg.name, ab, '正确率+' + ab);
  }
  function refreshGeneric() {
    curGeneric.items = curGeneric.cfg.gen ? curGeneric.cfg.gen() : [];
    buildGenericToolbar();
    renderGenericBody();
  }
  function finishGeneric() {
    completeModule(curGeneric.cfg.id, curGeneric.cfg.name, 0, '');
  }

  // è‹±æ–‡/ä¸­æ–‡ç­”æ¡ˆâ€œä¸€å¯¹å¤šâ€ï¼šç”¨ / ; ã€æˆ– or åˆ†éš”çš„ä»»æ„ä¸€ç§å†™æ³•éƒ½ç®—å¯¹ï¼ˆæ”¾åœ¨æœ«å°¾ä»¥ç¡®ä¿è¦†ç›–å‰é¢çš„å®šä¹‰ï¼‰
  gradeText = function (input, ans) {
    const norm = function (x) {
      return String(x).toLowerCase()
        .replace(/[\u3000-\u303f\uff00-\uffef]/g, '')
        .replace(/[\s'â€™\-.,!?;:]/g, '');
    };
    const b = norm(input);
    if (!b) return false;
    if (norm(ans) === b) return true;   // 整句完全一致也算对（含用 / 或 or 列出的完整说法）
    const variants = String(ans).split(/[\/;ã€]|\bor\b/i).map(norm).filter(function (x) { return x !== ''; });
    if (!variants.length) return false;
    if (variants.length === 1) return variants[0] === b;
    return variants.some(function (v) { return v === b; });
  };  // ===== 通用奖台 + 数学计算奖台机制（放在最后，覆盖同名函数） =====
  (function () {
    if (document.getElementById('pod-css2')) return;
    var st = document.createElement('style');
    st.id = 'pod-css2';
    st.textContent = [
      '#ph-top-wrap { align-items:flex-start; }',
      '#ph-top-left > .intro { margin:0 0 6px; }',
      '.calc-pod { float:right; margin:10px 0 20px 18px; position:relative; z-index:1; }',
      '.calc-pod .ph-podium { justify-content:center; }',
      '@media (max-width:700px) { .calc-pod { float:none; margin:0 0 10px; } }'
    ].join('\n');
    document.head.appendChild(st);
  })();
  function podiumHTML(list, titleText, emptyText) {
    const sorted = (list || []).slice().sort(function (a, b) { return b.s - a.s || a.t - b.t; });
    const top = sorted.slice(0, 3);
    const cls = ['gold', 'silver', 'bronze'], medal = ['🥇', '🥈', '🥉'], rank = ['第1名', '第2名', '第3名'];
    if (!top.length) return '<div class="ph-pod-title">' + titleText + '</div><div class="ph-pod-empty">' + emptyText + '</div>';
    let cols = '';
    top.forEach(function (x, i) {
      const d = new Date(x.t);
      const time = (d.getMonth() + 1) + '月' + d.getDate() + '日<br>' + String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
      cols += '<div class="ph-pod-col ' + cls[i] + '"><div class="ph-pod-medal">' + medal[i] + '</div><div class="ph-pod-score">' + x.s + '</div><div class="ph-pod-time">' + time + '</div><div class="ph-pod-base">' + rank[i] + '</div></div>';
    });
    return '<div class="ph-pod-title">' + titleText + '</div><div class="ph-podium">' + cols + '</div>';
  }
  function phRenderPodium() {
    const un = document.querySelector('#page-module .recite-bar.units');
    if (!un) return;
    const intro = document.querySelector('#page-module .intro');
    let host = document.getElementById('ph-top-wrap');
    if (!host || !host.contains(un) || (intro && !host.contains(intro))) {
      const old = document.getElementById('ph-top-wrap');
      if (old) {
        while (old.firstChild) old.parentNode.insertBefore(old.firstChild, old);
        old.parentNode.removeChild(old);
      }
      const anchorEl = intro || un;
      host = document.createElement('div');
      host.id = 'ph-top-wrap';
      anchorEl.parentNode.insertBefore(host, anchorEl);
      const left = document.createElement('div');
      left.id = 'ph-top-left';
      host.appendChild(left);
      if (intro) left.appendChild(intro);
      left.appendChild(un);
      const stat = phStatLine();
      if (stat) left.appendChild(stat);
      const cnt = document.querySelector('#page-module .recite-count:not(#ph-stat)');
      if (cnt) left.appendChild(cnt);
      const right = document.createElement('div');
      right.id = 'ph-top-right';
      host.appendChild(right);
    }
    document.getElementById('ph-top-right').innerHTML =
      podiumHTML(phHist().filter(function (x) { return x.k === phKeyOf(); }),
        '🏆 前三名成绩（本单元 · 本方向）', '还没有成绩记录<br>批改一次就会出现在这里');
    phRefreshStat();
  }
  // ---- 数学计算 / 思维：每组记录成绩并展示奖台 ----
  var CALC_HIST_KEY = 'calc_hist_v1';
  function calHist() { try { return JSON.parse(lsGet(CALC_HIST_KEY) || '[]') || []; } catch (e) { return []; } }
  function calLog(gid, correct, total) {
    const score = total ? Math.round(correct * 100 / total) : 0;
    const list = calHist();
    const mine = list.filter(function (x) { return x.k === gid; });
    const prevLast = mine.length ? mine[mine.length - 1].s : null;
    const best = mine.length ? Math.max.apply(null, mine.map(function (x) { return x.s; })) : null;
    list.push({ k: gid, s: score, t: Date.now() });
    try { localStorage.setItem(pk(CALC_HIST_KEY), JSON.stringify(list.slice(-400))); } catch (e) {}
    return { score: score, prevLast: prevLast, best: best };
  }
  function calRenderPodium(gid) {
    const box = document.querySelector('.calc-pod[data-pod="' + gid + '"]');
    if (!box) return;
    box.innerHTML = podiumHTML(calHist().filter(function (x) { return x.k === gid; }), '🏆 前三名成绩（本组）', '还没有成绩<br>批改一次就会出现');
  }
  function calRenderAllPodiums() {
    document.querySelectorAll('.calc-pod').forEach(function (b) { calRenderPodium(b.getAttribute('data-pod')); });
  }
  // ===== Supabase 云同步：本地永远先写，联网时自动补传；换浏览器/重发版本都不丢 =====
  var SB_CFG_KEY = 'sb_cfg_v1';
  var SB_TS_KEY = 'sb_ts_v1';
  var SB_SKIP = { 'math_ai_cfg_v1': 1, 'sb_cfg_v1': 1, 'sb_ts_v1': 1 };
  var sbDirty = false;
  function sbCfg() { try { return JSON.parse(localStorage.getItem(SB_CFG_KEY) || '{}') || {}; } catch (e) { return {}; } }
  function saveSbCfg(c) { try { localStorage.setItem(SB_CFG_KEY, JSON.stringify(c)); } catch (e) {} }
  function sbReady() { const c = sbCfg(); return !!(c.url && c.key); }
  function sbBase(u) { return String(u || '').trim().replace(/\/+$/, '').replace(/\/rest\/v1$/, ''); }
  function sbTable() { return sbCfg().table || 'elsa_kv'; }
  // 收集属于当前孩子的所有数据（不包含密钥）
  function syncCollect() {
    const out = {};
    for (let i = 0; i < localStorage.length; i++) {
      const full = localStorage.key(i);
      const suffix = '::' + PROFILE_ID;
      if (full && full.slice(-suffix.length) === suffix) {
        const base = full.slice(0, full.length - suffix.length);
        if (SB_SKIP[base]) continue;
        out[base] = localStorage.getItem(full);
      }
    }
    return out;
  }
  function syncPush(force) {
    if (!sbReady()) return Promise.resolve(false);
    const c = sbCfg();
    const ts = Date.now();
    const last = +(localStorage.getItem(SB_TS_KEY) || 0);
    if (!force && !sbDirty && ts - last < 30000) return Promise.resolve(false);
    const body = JSON.stringify({ profile: PROFILE_ID, data: syncCollect(), ts: ts });
    return fetch(sbBase(c.url) + '/rest/v1/' + sbTable() + '?on_conflict=profile', {
      method: 'POST',
      headers: {
        'apikey': c.key,
        'Authorization': 'Bearer ' + c.key,
        'Content-Type': 'application/json',
        'Prefer': 'resolution=merge-duplicates'
      },
      body: body
    }).then(function (r) {
      if (r.ok) { try { localStorage.setItem(SB_TS_KEY, String(ts)); } catch (e) {} sbDirty = false; return true; }
      return r.text().then(function (t) { throw new Error('HTTP ' + r.status + '：' + String(t).slice(0, 120)); });
    });
  }
  function syncPull() {
    if (!sbReady()) return Promise.resolve(false);
    const c = sbCfg();
    const url = sbBase(c.url) + '/rest/v1/' + sbTable() + '?profile=eq.' + encodeURIComponent(PROFILE_ID) + '&select=*';
    return fetch(url, { headers: { 'apikey': c.key, 'Authorization': 'Bearer ' + c.key } })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (rows) {
        if (!rows || !rows.length) return false;
        const row = rows[0];
        const remote = row.data || {};
        const remoteTs = +(row.ts || 0);
        const localTs = +(localStorage.getItem(SB_TS_KEY) || 0);
        if (remoteTs && remoteTs <= localTs) return false;
        let changed = false;
        Object.keys(remote).forEach(function (base) {
          if (SB_SKIP[base]) return;
          const full = base + '::' + PROFILE_ID;
          if (localStorage.getItem(full) !== remote[base]) { localStorage.setItem(full, remote[base]); changed = true; }
        });
        try { localStorage.setItem(SB_TS_KEY, String(remoteTs)); } catch (e) {}
        return changed;
      });
  }
  function syncNow() { return syncPush(true).catch(function (e) { toast('云同步失败：' + e.message); return false; }); }
  function syncBoot() {
    if (!sbReady()) return;
    if (sessionStorage.getItem('sb_pulled') !== '1') {
      sessionStorage.setItem('sb_pulled', '1');
      syncPull().then(function (changed) {
        if (changed) location.reload();
        else syncPush(true).catch(function () {});
      }).catch(function () {});
    } else {
      syncPush(false).catch(function () {});
    }
    setInterval(function () { syncPush(false).catch(function () {}); }, 30000);
    window.addEventListener('pagehide', function () { try { syncPush(true); } catch (e) {} });
    document.addEventListener('visibilitychange', function () { if (document.hidden) { try { syncPush(true); } catch (e) {} } });
  }

  // 构建版本号：显示在页脚，方便确认是否刷新到最新版
  var BUILD_TAG = '2026-10-19 口算草稿+括号答案'
  window.__BUILD_TAG = BUILD_TAG;

  // ===== AI 输出整理：只去掉客套/思考残留与 LaTeX 碎片，不动数学步骤 =====
  // ===== AI 批改：结论块只保留一份，重复批改不会叠加 =====
  function studentAnswer(card) {
    const inp = card.querySelector('.sm-input') || card.querySelector('.ans-input') || card.querySelector('.g-input');
    return inp && inp.value ? String(inp.value).trim() : '';
  }
  function aiResultBox(card, msg) {
    let out = card.querySelector('.ai-result');
    if (!out) {
      out = document.createElement('div');
      out.className = 'ai-result';
      (card.querySelector('.calc-main') || card).appendChild(out);
    }
    out.textContent = msg;
    return out;
  }
  function aiErr(e) {
    const m = e && e.message ? e.message : String(e);
    return m + (/image|vision|content|400|model|multimodal/i.test(m)
      ? '　👉 多半是模型不支持图片：请在 ⚙️ 里换成支持视觉的模型（如 qwen-vl-max、glm-4v、doubao-vision、gpt-4o-mini）。'
      : '');
  }
  function addAiVerdict(r, card) {
    const boxes = r.querySelectorAll('.ai-verdict');
    for (let i = 1; i < boxes.length; i++) boxes[i].remove();
    let box = boxes[0];
    if (!box) {
      box = document.createElement('div');
      box.className = 'ai-verdict';
      r.appendChild(box);
    }
    r.querySelectorAll('.ai-draft, .ai-explain').forEach(function (b) { if (!box.contains(b)) b.remove(); });
    const cv = card.querySelector('canvas.scratch');
    box.innerHTML = stepVerdictHTML(card)
      + ' <button type="button" class="ai-explain">🤖 AI 讲这题</button>'
      + ((cv && cv._inked && !card.querySelector('.ai-draft'))
         ? ' <button type="button" class="ai-draft">🔍 AI 读草稿指错步</button>' : '');
  }
  function draftPrompt(q, ans, stu) {
    return '你是初中数学老师。图里是学生的手写草稿，题目与正确答案已给出。\n'
      + '题目：' + q + '\n正确答案：' + ans + '\n学生填的答案：' + (stu || '（空）') + '\n'
      + '草稿里每出现一个等号就算一步。只输出下面三行，不要任何思考过程、不要复述这段话、不要用 LaTeX：\n'
      + '1) 草稿共 X 步\n'
      + '2) 第 Y 步错：他把「…」写成了「…」，正确应为「…」（若整份都对就写：全部正确）\n'
      + '3) 正确过程：一步=一步=一步（2~4 步）\n'
      + '分数写成 1/3、−5/6，乘方写成 2^3，用 × ÷ − + = 这些普通符号。\n'
      + '如果照片看不清或草稿是空的，第2行就写：草稿看不清，请重写清楚一点。不要猜。';
  }
  function explainPrompt(q, ans, stu) {
    return '你是初中数学老师，请给一个初中生讲这道题。\n'
      + '题目：' + q + '\n正确答案：' + ans + '\n学生填的答案：' + (stu || '（空）') + '\n'
      + '只输出下面三行，不要思考过程、不要复述这段话、不要用 LaTeX：\n'
      + '1) 思路：一句话说清先算什么、再算什么\n'
      + '2) 错在哪：' + (stu ? '学生答案不对，指出他这一步为什么不行' : '学生没填答案，指出最容易踩的坑') + '\n'
      + '3) 正确过程：一步=一步=一步（2~4 步）';
  }
  function aiTidy(t) {
    let x = String(t === null || t === undefined ? '' : t);
    if (!x.replace(/\s+/g, '')) return '（模型没有返回内容：请在 ⚙️ 里关闭思考模式，或换用支持视觉的模型）';
    x = x.replace(/\\frac\s*\{([^{}]*)\}\s*\{([^{}]*)\}/g, '$1/$2')
      .replace(/\\times/g, '×').replace(/\\div/g, '÷').replace(/\\cdot/g, '·')
      .replace(/\\(left|right|,|;|!)/g, ' ')
      .replace(/\\[a-zA-Z]+/g, ' ')
      .replace(/[{}$]/g, ' ')
      .replace(/[\u0000-\u0008\u000b-\u001f]/g, ' ');
    const lines = x.split(/\n+/).map(function (s) { return s.replace(/[ \t]+/g, ' ').trim(); })
      .filter(function (s) { return s !== ''; });
    const meta = /^(好的|嗯|明白|收到|首先|让我|我们|这道题|分析|思考|注意[:：]|要求[:：]|说明[:：]|输出[:：])/;
    let kept = lines.filter(function (s) { return !meta.test(s); });
    if (!kept.length) kept = lines;
    let res = kept.join('\n').trim();
    if (res.length > 420) res = res.slice(0, 420) + '…';
    return res;
  }
  initCalc();
  initThink();
  applyProfile();
  updatePointsUI();
  updateWrongBadge();
  syncBoot();
  showPage('dashboard');

// Presentational icons only; question and answer content retains its original symbols.
(() => {
  const icons = { '🏠':['task',0], '📖':['task',1], '🏃':['task',2], '🧹':['task',3], '✏️':['task',4], '📄':['task',4], '🧠':['task',5], '🌱':['task',6], '🌸':['task',6], '🎯':['task',7], '📅':['task',8], '🎧':['listen',0], '♟️':['shawnmod',0], '➗':['shawnmod',1], '🔠':['shawnmod',2], '🛡️':['shawnmod',3], '🕰️':['shawnmod',4], '📍':['shawnmod',5], '🧪':['shawnmod',6], '💬':['shawnmod',7], '🖌️':['shawnmod',8], '🧮':['task',7], '🔤':['task',1], '📕':['utility',5], '📗':['task',1], '📘':['utility',5], '🧬':['task',6], '🗣️':['task',5], '📜':['utility',5], '⭐':['utility',0], '💎':['utility',1], '🔥':['utility',2], '✔':['utility',3], '✅':['utility',3], '🔄':['utility',4], '🎲':['utility',4], '📓':['utility',5], '🏅':['utility',6], '📏':['utility',7], '✨':['utility',8], '👋':['utility',8], '💡':['task',5], '➕':['task',4] };
  const pattern = new RegExp(Object.keys(icons).join('|'), 'gu');
  function decorate(root) {
    if (root.nodeType !== 1 && root.nodeType !== 3) return;
    if (root.nodeType === 1 && root.matches('script,style,.art-icon')) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = root.nodeType === 3 ? [root] : [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
      if (!node.parentElement || node.parentElement.closest('script,style,.art-icon,ol.problems,.calc-item,.vcol,.answer-list,.reveal,.wb-q,.wb-a,.log-body,.scratch-tools,.st-mini,.st-mode')) return;
      const value = node.nodeValue;
      pattern.lastIndex = 0;
      if (!pattern.test(value)) return;
      pattern.lastIndex = 0;
      const frag = document.createDocumentFragment();
      let end = 0;
      for (const match of value.matchAll(pattern)) {
        frag.append(document.createTextNode(value.slice(end,match.index)));
        const [sheet,index] = icons[match[0]];
        const icon = document.createElement('span');
        icon.className = `art-icon ${sheet} i${index}`;
        icon.setAttribute('aria-hidden','true');
        frag.append(icon);
        end = match.index + match[0].length;
      }
      frag.append(document.createTextNode(value.slice(end)));
      node.replaceWith(frag);
    });
  }
  decorate(document.body);
  new MutationObserver(records => records.forEach(record => {
    if (record.type === 'characterData') decorate(record.target);
    else record.addedNodes.forEach(decorate);
  })).observe(document.body,{childList:true,subtree:true,characterData:true});
})();
