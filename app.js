'use strict';
/* =========================================================
   ルノアール暗記用
   データ(メニュー・材料・器・切り方)は data.js の window.GAME_DATA。
   レシピを変えるときは data.js を書き換えてアップロードし直します。
   ========================================================= */

/* ---------- 定数 ---------- */
const STORE_DATA = 'kissa-kitchen-data-v2';
const STORE_STATS = 'kissa-recipe-kitchen-v1';
const BASE = window.GAME_DATA;
const CUT_TOL = 0.12;          // 切り方の判定のゆるさ(パンの一辺を1としたときのずれ)
const MIX_TICKETS = 5;         // 実践編の伝票の枚数
const MAX_TRAY = 6;            // 実践編で一度に作れる品の数

const TABS = [['hot', 'HOT'], ['cold', 'ICE・その他'], ['food', 'フード']];
/* ---------- データ ---------- */
let DATA, ING, R, VESSELS;
const clone = o => JSON.parse(JSON.stringify(o));
function loadData() {
  // 以前のバージョンの「レシピ編集」で保存された内容は使わない
  try { localStorage.removeItem(STORE_DATA); localStorage.removeItem('kissa-kitchen-data-v1'); } catch (e) { }
  DATA = clone(BASE); applyData();
}
function applyData() {
  ING = {};
  for (const [k, v] of Object.entries(DATA.ingredients)) ING[k] = Object.assign({ key: k, unit: '', step: 1, icon: 'jar', thickness: 4, vis: '', group: 'その他' }, v);
  R = DATA.recipes; VESSELS = DATA.vessels || [];
}

/* ---------- 記録 ---------- */
let STATS = {};
try { STATS = JSON.parse(localStorage.getItem(STORE_STATS)) || {}; } catch (e) { STATS = {}; }
function saveStats() { try { localStorage.setItem(STORE_STATS, JSON.stringify(STATS)); } catch (e) { } }
function record(id, ok) { const s = STATS[id] || { ok: 0, ng: 0, st: 0 }; if (ok) { s.ok++; s.st++; } else { s.ng++; s.st = 0; } STATS[id] = s; saveStats(); }
function level(id) { const s = STATS[id]; if (!s) return 0; return s.st >= 3 ? 2 : 1; }
const LV = ['未挑戦', '練習中', '覚えた'];
const lvTag = id => `<span class="lv lv${level(id)}">${LV[level(id)]}</span>`;

/* ---------- 便利関数 ---------- */
const $ = s => document.querySelector(s);
const rnd = v => Math.round(v * 100) / 100;
const fx = v => String(rnd(v));
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const isOnce = k => !!(ING[k] && ING[k].once);
function amtTxt(k, v) { const g = ING[k]; if (!g || isOnce(k) || v === null || v === undefined) return ''; if (Array.isArray(v)) return v[0] + '〜' + v[1] + g.unit; return fx(v) + g.unit; }
function ingName(k) { return ING[k] ? ING[k].name : '(削除された材料)'; }
function recipeLine(r) { return Object.entries(r.items).map(([k, v]) => ingName(k) + (amtTxt(k, v) ? ' ' + amtTxt(k, v) : '')).join(' ＋ '); }
const tabOf = r => r.cat === 'food' ? 'food' : (r.look === 'hot' ? 'hot' : 'cold');
function badgeTxt(r) { return r.cat === 'food' ? 'フード' : r.look === 'hot' ? 'HOT' : r.look === 'dish' ? 'デザート' : 'ICE'; }
const badge = r => `<span class="badge ${tabOf(r)}">${badgeTxt(r)}</span>`;
const hasCut = r => !!(r && r.cat === 'food' && r.cut && r.cut.lines && r.cut.lines.length);
function show(id) { document.querySelectorAll('.screen').forEach(s => s.hidden = s.id !== id); window.scrollTo(0, 0); }
let toastT;
function toast(msg) { document.querySelectorAll('.toast').forEach(t => t.remove()); const el = document.createElement('div'); el.className = 'toast'; el.textContent = msg; document.body.appendChild(el); clearTimeout(toastT); toastT = setTimeout(() => el.remove(), 2600); }
function shelfGroups(cat) { const m = new Map(); for (const k in ING) { const g = ING[k]; if (g.cat !== cat) continue; if (!m.has(g.group)) m.set(g.group, []); m.get(g.group).push(k); } return [...m]; }
function armConfirm(btn, label) { if (btn.dataset.armed) return true; const orig = btn.textContent; btn.dataset.armed = '1'; btn.textContent = label; setTimeout(() => { btn.dataset.armed = ''; btn.textContent = orig; }, 2600); return false; }
function weighted(pool, n) { return pool.map(r => { const lv = level(r.id); const w = lv === 2 ? 1 : lv === 1 ? 3 : 2; return { r, key: Math.pow(Math.random(), 1 / w) }; }).sort((a, b) => b.key - a.key).slice(0, n).map(x => x.r); }

/* ---------- アイコン ---------- */
function ico(shape, c) {
  const s = 'stroke="#3a2c25" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"'; let p = '';
  switch (shape) {
    case 'pot': p = `<path d="M11 17h24l-2 23q0 4-4 4H17q-4 0-4-4Z" fill="${c}" ${s}/><path d="M13 17q10-10 20 0Z" fill="#fff" ${s}/><path d="M35 21h3q5 0 5 6t-5 6h-4" fill="none" ${s}/><path d="M11 19l-5-3" fill="none" ${s}/>`; break;
    case 'bottle': p = `<rect x="19" y="4" width="10" height="7" rx="2" fill="#3a2c25"/><path d="M18 11h12l3 7v22q0 4-4 4H19q-4 0-4-4V18Z" fill="${c}" ${s}/><rect x="16" y="24" width="16" height="9" rx="2" fill="#fff" opacity=".85"/>`; break;
    case 'carton': p = `<path d="M13 16l5-9h12l5 9v26H13Z" fill="${c}" ${s}/><path d="M13 16h22" fill="none" ${s}/><rect x="17" y="24" width="14" height="10" rx="2" fill="#5aa0d6" opacity=".7"/>`; break;
    case 'shaker': p = `<path d="M16 16q0-10 8-10t8 10Z" fill="#d0d6d8" ${s}/><circle cx="21" cy="11" r="1" fill="#3a2c25"/><circle cx="27" cy="11" r="1" fill="#3a2c25"/><path d="M15 16h18v24q0 4-4 4H19q-4 0-4-4Z" fill="${c}" ${s}/>`; break;
    case 'tub': p = `<path d="M8 22h32l-4 18q-1 4-5 4H17q-4 0-5-4Z" fill="#fff" ${s}/><path d="M11 22q3-9 13-9t13 9Z" fill="${c}" ${s}/>`; break;
    case 'round': p = `<circle cx="24" cy="25" r="16" fill="${c}" ${s}/><circle cx="24" cy="25" r="10" fill="#fff" opacity=".45"/><path d="M24 15v20M14 25h20" stroke="#fff" stroke-width="1.6" opacity=".7"/>`; break;
    case 'sheet': p = `<path d="M9 18q2-6 8-6h16q7 0 7 7v12q0 6-6 6H14q-6 0-6-6Z" fill="${c}" ${s}/><path d="M14 22q6 3 20 0" fill="none" stroke="#fff" stroke-width="2" opacity=".7"/>`; break;
    case 'cube': p = `<rect x="7" y="18" width="17" height="17" rx="4" fill="#fff" fill-opacity=".8" stroke="#6fb4d6" stroke-width="2.4"/><rect x="22" y="11" width="17" height="17" rx="4" fill="#fff" fill-opacity=".8" stroke="#6fb4d6" stroke-width="2.4"/><rect x="18" y="27" width="16" height="16" rx="4" fill="#fff" fill-opacity=".8" stroke="#6fb4d6" stroke-width="2.4"/>`; break;
    case 'ball': p = `<path d="M10 32h28l-4 10H14Z" fill="#fff" ${s}/><circle cx="24" cy="23" r="12" fill="${c}" ${s}/>`; break;
    case 'can': p = `<ellipse cx="24" cy="12" rx="13" ry="4" fill="#d0d6d8" ${s}/><path d="M11 12v26q0 5 13 5t13-5V12" fill="#d0d6d8" ${s}/><rect x="11" y="19" width="26" height="14" fill="${c}"/><circle cx="19" cy="26" r="3" fill="#f05a5a"/><circle cx="28" cy="25" r="3" fill="#ffe14a"/>`; break;
    case 'pudding': p = `<path d="M8 40h32" ${s}/><path d="M14 39l4-24h12l4 24Z" fill="${c}" ${s}/><path d="M18 15h12l-1 6q-5 2-10 0Z" fill="#8a4a1c"/>`; break;
    case 'bread': p = `<path d="M9 22q0-12 15-12t15 12q0 4-3 5v13H12V27q-3-1-3-5Z" fill="${c}" ${s}/><path d="M15 26h18v10H15Z" fill="#fff" opacity=".4"/>`; break;
    case 'leaf': p = `<path d="M10 38q-2-22 18-28q12-3 12-3q-2 14-8 22q-8 10-22 9Z" fill="${c}" ${s}/><path d="M12 36q10-10 22-24" fill="none" stroke="#fff" stroke-width="2" opacity=".7"/>`; break;
    case 'egg': p = `<ellipse cx="24" cy="26" rx="12" ry="15" fill="${c}" ${s}/>`; break;
    case 'pack': p = `<path d="M11 10h26l-2 32H13Z" fill="${c}" ${s}/><path d="M11 10q13 5 26 0" fill="none" ${s}/><rect x="16" y="22" width="16" height="9" rx="2" fill="#fff" opacity=".8"/>`; break;
    default: p = `<rect x="13" y="8" width="22" height="7" rx="3" fill="#ee6a46" ${s}/><path d="M12 15h24v23q0 5-5 5H17q-5 0-5-5Z" fill="${c}" ${s}/><rect x="16" y="22" width="16" height="9" rx="2" fill="#fff" opacity=".8"/>`;
  }
  return `<svg viewBox="0 0 48 48" aria-hidden="true">${p}</svg>`;
}
const icoOf = g => ico(g.icon, g.color);

/* =========================================================
   器・皿
   作っている品は「ビルド」{ cont, added, seq, cuts, view } で表す。
   cont は 'mug'(ホットカップ)'glass'(アイスグラス)'dish'(デザート皿)
   'plate'(フード皿)、または 'v:器の名前'(器タブで登録した器)。
   ========================================================= */
function containers() {
  return [{ id: 'mug', name: 'ホットカップ' }, { id: 'glass', name: 'アイスグラス' }, { id: 'dish', name: 'デザート皿' }, { id: 'plate', name: 'フード皿' }]
    .concat(VESSELS.map(v => ({ id: 'v:' + v.name, name: v.name })));
}
function contName(id) { const c = containers().find(x => x.id === id); return c ? c.name : '—'; }
const contCat = id => id === 'plate' ? 'food' : 'drink';
function expectedCont(r) { if (r.cat === 'food') return 'plate'; if (r.look === 'dish') return 'dish'; if (r.vessel) return 'v:' + r.vessel; return r.look === 'hot' ? 'mug' : 'glass'; }
function contShape(id) { if (id === 'mug' || id === 'glass') return id; if (id && id.startsWith('v:')) { const v = VESSELS.find(x => 'v:' + x.name === id); return v ? v.shape : 'rock'; } return null; }
const newBuild = cont => ({ cont, added: {}, seq: [], cuts: [], view: 'plate' });

const GEO = {
  mug: { out: 'M52 70h104v104q0 24-24 24H76q-24 0-24-24Z', inn: 'M58 76h92v97q0 19-19 19H77q-19 0-19-19Z', top: 76, bot: 192, cap: 330, hl: 66, extra: '<path d="M156 92h12q18 0 18 22t-18 22h-12" fill="none" stroke="#3a2c25" stroke-width="5"/>' },
  glass: { out: 'M58 34h104l-12 166q-.4 6-6 6H76q-5.6 0-6-6Z', inn: 'M64 40h92l-11 158H75Z', top: 40, bot: 198, cap: 280, hl: 72 },
  rock: { out: 'M44 108h132l-7 92q-.4 6-6 6H57q-5.6 0-6-6Z', inn: 'M50 114h120l-6 84H56Z', top: 114, bot: 198, cap: 200, hl: 58 },
  tumbler: { out: 'M68 22h84l-6 178q-.2 6-6 6H80q-5.8 0-6-6Z', inn: 'M74 28h72l-5 170H79Z', top: 28, bot: 198, cap: 260, hl: 82 },
  jug: { out: 'M62 52h84l14-10 4 6-10 12v118q0 22-22 22H84q-22 0-22-22Z', inn: 'M68 60h80v118q0 16-16 16H84q-16 0-16-16Z', top: 60, bot: 194, cap: 320, hl: 76, extra: '<path d="M62 80h-10q-14 0-14 20v30q0 18 14 18h10" fill="none" stroke="#3a2c25" stroke-width="5"/>' }
};
function orderKeys(b) { const am = b.added; const ks = b.seq.filter(k => am[k] > 0 && ING[k]); for (const k in am) if (am[k] > 0 && ING[k] && !ks.includes(k)) ks.push(k); return ks; }
function whipSVG(y) { return `<g fill="#fff" stroke="#3a2c25" stroke-width="3"><circle cx="94" cy="${y - 6}" r="14"/><circle cx="126" cy="${y - 6}" r="14"/><circle cx="110" cy="${y - 20}" r="15"/><path d="M110 ${y - 34}q4-8 0-12" fill="none"/></g>`; }
function scoopSVG(x, y, c) { return `<circle cx="${x}" cy="${y}" r="17" fill="${c || '#fff3d4'}" stroke="#3a2c25" stroke-width="3"/><path d="M${x - 9} ${y + 6}q9 6 18 0" fill="none" stroke="#000" stroke-opacity=".12" stroke-width="3"/>`; }
function toppings(ks, surf, rimX, rimY) {
  let t = '';
  const by = v => ks.filter(k => ING[k].kind === 'top' && ING[k].vis === v);
  const w = by('whip').length > 0;
  if (w) t += whipSVG(surf);
  by('scoop').forEach((k, i) => { t += scoopSVG((w ? 136 : 110) + i * 22, surf - (w ? 24 : 12) - i * 6, ING[k].color); });
  by('blob').forEach((k, i) => { t += `<ellipse cx="${92 + i * 18}" cy="${surf - 5}" rx="10" ry="6" fill="${ING[k].color}" stroke="#3a2c25" stroke-width="2"/>`; });
  by('slice').forEach((k, i) => { const c = ING[k].color; t += `<g transform="translate(${rimX - i * 24} ${rimY})"><circle r="15" fill="${c}" stroke="#3a2c25" stroke-width="3"/><circle r="10" fill="#fff" opacity=".55"/><path d="M0-10V10M-10 0H10M-7-7l14 14M7-7l-14 14" stroke="${c}" stroke-width="1.6"/></g>`; });
  return t;
}
function placeholderSVG() { return `<svg viewBox="0 0 220 220"><path d="${GEO.glass.out}" fill="#fff" fill-opacity=".3" stroke="#3a2c25" stroke-opacity=".45" stroke-width="4" stroke-dasharray="9 8"/><text x="110" y="132" text-anchor="middle" font-size="46" font-weight="800" fill="#3a2c25" fill-opacity=".55">?</text></svg>`; }
function drinkSVG(b, key, idp) {
  const G = GEO[key], H = G.bot - G.top, ks = orderKeys(b), am = b.added;
  let y = G.bot, liq = '';
  const liqs = ks.filter(k => ING[k].kind === 'liq');
  liqs.forEach(k => { const v = ING[k].once ? 150 : am[k]; let h = v / G.cap * H; if (y - h < G.top) h = y - G.top; if (h <= 0) return; y -= h; liq += `<rect x="0" y="${y}" width="220" height="${h + .6}" fill="${ING[k].color}"/>`; });
  const has = liqs.length > 0, surf = has ? y : G.bot;
  if (has) liq += `<rect x="0" y="${surf}" width="220" height="4" fill="#fff" opacity=".45"/>`;
  ks.filter(k => ING[k].vis === 'fruit').forEach(k => { const cols = [ING[k].color, '#f05a5a', '#ffd84a', '#9ad15a']; for (let i = 0; i < 9; i++) liq += `<circle cx="${84 + (i * 23) % 54}" cy="${G.bot - 9 - (i % 3) * 12}" r="6" fill="${cols[i % 4]}" stroke="#3a2c25" stroke-width="1.4"/>`; });
  const iceK = ks.filter(k => ING[k].vis === 'ice');
  const nIce = Math.min(iceK.reduce((a, k) => a + (ING[k].once ? 6 : am[k]), 0), 9);
  for (let i = 0; i < nIce; i++) { const c = i % 3, rw = Math.floor(i / 3); const yy = has ? Math.max(surf - 8, G.top) + rw * 21 : G.bot - 22 - rw * 21; liq += `<rect x="${81 + c * 20}" y="${yy}" width="19" height="19" rx="4" fill="#fff" fill-opacity=".6" stroke="#8fc6df" stroke-width="2.4"/>`; }
  let top = '';
  ks.filter(k => ING[k].kind === 'pow').forEach((k, j) => { for (let i = 0; i < 8; i++) top += `<circle cx="${84 + i * 7 + j * 3}" cy="${surf - 3 - (i % 2) * 3}" r="2.6" fill="${ING[k].color}" stroke="#3a2c25" stroke-width=".8"/>`; });
  top += toppings(ks, surf, key === 'mug' ? 146 : 150, G.top + 2);
  const cid = 'vc' + (idp || '');
  return `<svg viewBox="0 0 220 220"><defs><clipPath id="${cid}"><path d="${G.inn}"/></clipPath></defs><path d="${G.out}" fill="#fff" fill-opacity=".62"/><g clip-path="url(#${cid})">${liq}</g>${G.extra || ''}<path d="${G.out}" fill="none" stroke="#3a2c25" stroke-width="4.5" stroke-linejoin="round"/><path d="M${G.hl} ${G.top + 14}v40" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".8"/>${top}</svg>`;
}
function dishSVG(b) {
  const ks = orderKeys(b);
  let s = `<ellipse cx="110" cy="182" rx="90" ry="22" fill="#fff" stroke="#3a2c25" stroke-width="4"/><ellipse cx="110" cy="179" rx="60" ry="12" fill="#f2ede4"/>`;
  let ty = 176;
  const pud = ks.find(k => ING[k].vis === 'pudding');
  if (pud) { s += `<path d="M76 176L88 118H132L144 176Z" fill="${ING[pud].color}" stroke="#3a2c25" stroke-width="4" stroke-linejoin="round"/><path d="M88 118H132L129.6 130Q110 137 90.4 130Z" fill="#8a4a1c"/>`; ty = 118; }
  s += toppings(ks, ty, 160, 150);
  return `<svg viewBox="0 0 220 220">${s}</svg>`;
}
function plateSVG(b) {
  const ks = orderKeys(b), am = b.added;
  let s = `<ellipse cx="124" cy="182" rx="94" ry="26" fill="#fff" stroke="#3a2c25" stroke-width="4"/><ellipse cx="124" cy="179" rx="66" ry="15" fill="#f2ede4"/>`;
  const lay = ks.filter(k => ING[k].kind === 'layer');
  const reps = k => ING[k].vis === 'bread' ? Math.min(2, Math.max(1, Math.ceil(am[k]))) : 1;
  const tot = lay.reduce((a, k) => a + ING[k].thickness * reps(k), 0);
  const sc = Math.min(1, 140 / Math.max(tot, 1));
  const breads = lay.filter(k => ING[k].vis === 'bread');
  const baseW = breads.length ? (breads.some(k => am[k] >= 1) ? 130 : 84) : 120;
  let y = 178;
  lay.forEach(k => {
    const g = ING[k];
    for (let rp = 0; rp < reps(k); rp++) {
      const h = Math.max(2, g.thickness * sc), w = g.vis === 'bread' ? (am[k] < 1 ? 84 : 130) : baseW - 6, x = 124 - w / 2; y -= h;
      if (g.vis === 'bread') s += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="${g.color}" stroke="#a8692b" stroke-width="3"/>`;
      else if (g.vis === 'dots') { const n = Math.max(2, Math.floor(w / 22)); for (let i = 0; i < n; i++) s += `<ellipse cx="${x + 11 + i * (w - 22) / (n - 1)}" cy="${y + h / 2}" rx="11" ry="${Math.max(2, h / 2 + 1)}" fill="${g.color}" stroke="#3a2c25" stroke-width="1.6"/>`; }
      else if (g.vis === 'wave') { let d = `M${x - 6} ${y + h}`; for (let i = 0; i <= 8; i++) d += ` Q${x - 6 + i * (w + 12) / 8 - ((w + 12) / 16)} ${y - 3} ${x - 6 + i * (w + 12) / 8} ${y + h / 2}`; s += `<path d="${d} L${x + w + 6} ${y + h}Z" fill="${g.color}" stroke="#3a2c25" stroke-width="1.6"/>`; }
      else s += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${Math.min(h / 2, 5)}" fill="${g.color}" stroke="#3a2c25" stroke-width="1.6"/>`;
    }
  });
  if (b.cuts && b.cuts.length && lay.length) s += `<text x="124" y="${Math.max(16, y - 8)}" text-anchor="middle" font-size="13" font-weight="800" fill="#3a2c25">カット済み ${b.cuts.length}本</text>`;
  const pos = [[30, 150], [30, 96], [214, 108], [214, 152], [124, 40], [70, 40], [178, 40]];
  ks.filter(k => ING[k].kind === 'side').forEach((k, i) => {
    const [x, yy] = pos[i % pos.length], g = ING[k];
    if (g.vis === 'soup') s += `<path d="M${x - 18} ${yy - 10}h36l-4 22q-1 5-6 5h-16q-5 0-6-5Z" fill="#fff" stroke="#3a2c25" stroke-width="3"/><ellipse cx="${x}" cy="${yy - 8}" rx="15" ry="3.5" fill="${g.color}"/>`;
    else if (g.vis === 'egg') s += `<ellipse cx="${x}" cy="${yy}" rx="12" ry="15" fill="${g.color}" stroke="#3a2c25" stroke-width="3"/>`;
    else if (g.vis === 'bowl') s += `<path d="M${x - 22} ${yy - 8}h44q0 22-22 22t-22-22Z" fill="#fff" stroke="#3a2c25" stroke-width="3"/><ellipse cx="${x}" cy="${yy - 7}" rx="19" ry="4.5" fill="${g.color}"/>`;
    else if (g.vis === 'cup') s += `<path d="M${x - 9} ${yy - 7}h18l-2 14h-14Z" fill="${g.color}" stroke="#3a2c25" stroke-width="2.6"/>`;
    else if (g.vis === 'scoop') s += scoopSVG(x, yy, g.color);
    else s += `<ellipse cx="${x}" cy="${yy + 6}" rx="20" ry="7" fill="#fff" stroke="#3a2c25" stroke-width="2.6"/><ellipse cx="${x}" cy="${yy + 2}" rx="11" ry="6" fill="${g.color}" stroke="#3a2c25" stroke-width="2"/>`;
  });
  return `<svg viewBox="0 0 240 220">${s}</svg>`;
}
function buildSVG(b, idp) {
  if (!b || !b.cont) return placeholderSVG();
  if (b.cont === 'plate') return plateSVG(b);
  if (b.cont === 'dish') return dishSVG(b);
  const key = contShape(b.cont);
  return GEO[key] ? drinkSVG(b, key, idp) : placeholderSVG();
}
function contIcon(id) {
  if (id === 'plate') return `<svg viewBox="0 0 220 220"><ellipse cx="110" cy="150" rx="96" ry="34" fill="#fff" stroke="#3a2c25" stroke-width="9"/><rect x="62" y="96" width="96" height="44" rx="10" fill="#f0c98a" stroke="#a8692b" stroke-width="8"/></svg>`;
  if (id === 'dish') return `<svg viewBox="0 0 220 220"><ellipse cx="110" cy="170" rx="96" ry="30" fill="#fff" stroke="#3a2c25" stroke-width="9"/><path d="M74 166L88 104H132L146 166Z" fill="#f5c74e" stroke="#3a2c25" stroke-width="8"/></svg>`;
  const G = GEO[contShape(id)] || GEO.glass;
  return `<svg viewBox="0 0 220 220"><path d="${G.out}" fill="#fff" stroke="#3a2c25" stroke-width="9" stroke-linejoin="round"/>${(G.extra || '').replace('stroke-width="5"', 'stroke-width="9"')}</svg>`;
}

/* =========================================================
   カット(パンを上から見た図。座標はパンの左上を0、右下を1とする)
   線は { t:'score'(切込み・点線) | 'cut'(カット・実線), a:[x,y], b:[x,y] }
   ========================================================= */
const BP = { o: 30, s: 180 };  // 盤面の中でのパンの位置と大きさ
function clipLine(p, q) {
  const dx = q[0] - p[0], dy = q[1] - p[1]; let t0 = -1e9, t1 = 1e9;
  const P = [-dx, dx, -dy, dy], Q = [p[0], 1 - p[0], p[1], 1 - p[1]];
  for (let i = 0; i < 4; i++) {
    if (Math.abs(P[i]) < 1e-9) { if (Q[i] < 0) return null; }
    else { const t = Q[i] / P[i]; if (P[i] < 0) t0 = Math.max(t0, t); else t1 = Math.min(t1, t); }
  }
  if (t0 >= t1) return null;
  return [[p[0] + t0 * dx, p[1] + t0 * dy], [p[0] + t1 * dx, p[1] + t1 * dy]];
}
const dist = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]);
function lineDist(L, M) { return Math.min(Math.max(dist(L.a, M.a), dist(L.b, M.b)), Math.max(dist(L.a, M.b), dist(L.b, M.a))); }
// パンを90度回した線(向きを問わない切り方の判定に使う)
const turnLine = l => ({ t: l.t, a: [1 - l.a[1], l.a[0]], b: [1 - l.b[1], l.b[0]] });
function matchCuts(exp, got) {
  const used = new Set(); let missing = 0, typeErr = 0;
  exp.forEach(e => {
    let best = -1, bd = CUT_TOL;
    got.forEach((g, j) => { if (used.has(j)) return; const d = lineDist(e, g); if (d < bd) { bd = d; best = j; } });
    if (best < 0) missing++; else { used.add(best); if (got[best].t !== e.t) typeErr++; }
  });
  return { missing, typeErr, extra: got.length - used.size };
}
// 回転・裏返しで同じ切り上がりになる線の入れ方は、すべて正解にする
// (縦3等分と横3等分、右下がりと左下がりの対角線など)
const CUT_SYMS = [p => p, ([x, y]) => [1 - x, y], ([x, y]) => [x, 1 - y], ([x, y]) => [1 - x, 1 - y],
  ([x, y]) => [y, x], ([x, y]) => [1 - y, x], ([x, y]) => [y, 1 - x], ([x, y]) => [1 - y, 1 - x]];
function judgeCutsOnce(exp, scoreFirst, got) {
  const used = new Set(); let missing = 0, typeErr = 0;
  exp.forEach(e => {
    let best = -1, bd = CUT_TOL;
    got.forEach((g, j) => { if (used.has(j)) return; const d = lineDist(e, g); if (d < bd) { bd = d; best = j; } });
    if (best < 0) missing++; else { used.add(best); if (got[best].t !== e.t) typeErr++; }
  });
  const extra = got.length - used.size;
  let orderOk = true;
  if (scoreFirst) { const lastScore = got.map(g => g.t).lastIndexOf('score'); orderOk = !got.slice(0, Math.max(0, lastScore)).some(g => g.t === 'cut'); }
  return { missing, typeErr, extra, orderOk, errs: missing * 2 + typeErr + extra * 2 + (orderOk ? 0 : 1) };
}
function judgeCuts(cut, got) {
  let best = null;
  for (const T of CUT_SYMS) {
    const exp = cut.lines.map(l => ({ t: l.t, a: T(l.a), b: T(l.b) }));
    const r = judgeCutsOnce(exp, cut.scoreFirst, got); r.lines = exp;
    if (!best || r.errs < best.errs) best = r;
    if (r.errs === 0) break;
  }
  const msgs = [];
  if (!got.length) msgs.push('まだ切っていません。');
  else {
    if (best.missing) msgs.push(`位置が違う・足りない線:${best.missing}本`);
    if (best.typeErr) msgs.push(`切込み(点線)とカット(実線)が逆:${best.typeErr}本`);
    if (best.extra) msgs.push(`余分な線:${best.extra}本`);
    if (!best.orderOk) msgs.push('切込みを入れ終わる前にカットしています。');
  }
  // 正解の図は、あなたの切り方にいちばん近い向きで表示する
  return { ok: got.length > 0 && best.errs === 0, msgs, lines: got.length ? best.lines : cut.lines };
}
function breadOf(r, b) { const items = r ? r.items : (b ? b.added : {}); return 'breadS' in items && !('breadT' in items) ? 'sand' : 'toast'; }
function boardSVG(lines, o) {
  o = o || {};
  const P = v => BP.o + v * BP.s;
  const fill = o.bread === 'sand' ? '#f8e6c0' : '#f0c98a';
  let s = `<rect x="${BP.o}" y="${BP.o}" width="${BP.s}" height="${BP.s}" rx="20" fill="${fill}" stroke="#d9963f" stroke-width="10"/>`;
  s += `<rect x="${BP.o + 14}" y="${BP.o + 14}" width="${BP.s - 28}" height="${BP.s - 28}" rx="12" fill="#fff" opacity=".22"/>`;
  (lines || []).forEach((l, i) => {
    const col = o.color || '#2f6ea8';
    s += `<line x1="${P(l.a[0])}" y1="${P(l.a[1])}" x2="${P(l.b[0])}" y2="${P(l.b[1])}" stroke="${col}" stroke-width="5" stroke-linecap="round"${l.t === 'score' ? ' stroke-dasharray="1 9"' : ''}/>`;
    if (o.numbers) s += `<circle cx="${P((l.a[0] + l.b[0]) / 2)}" cy="${P((l.a[1] + l.b[1]) / 2)}" r="9" fill="#fff" stroke="${col}" stroke-width="2"/><text x="${P((l.a[0] + l.b[0]) / 2)}" y="${P((l.a[1] + l.b[1]) / 2) + 4}" font-size="11" font-weight="800" text-anchor="middle" fill="${col}">${i + 1}</text>`;
  });
  if (o.preview) { const l = o.preview; s += `<line x1="${P(l.a[0])}" y1="${P(l.a[1])}" x2="${P(l.b[0])}" y2="${P(l.b[1])}" stroke="#ee6a46" stroke-width="4" stroke-linecap="round" opacity=".8"${l.t === 'score' ? ' stroke-dasharray="1 9"' : ''}/>`; }
  return `<svg viewBox="0 0 240 240" class="board${o.cls ? ' ' + o.cls : ''}"${o.id ? ` id="${o.id}"` : ''} role="img" aria-label="パンの切り方">${s}</svg>`;
}
// 盤面をなぞって線を引く
function attachSwipe(svg, getTool, onLine, redraw, snap) {
  let start = null;
  const norm = e => { const r = svg.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width * 240, y = (e.clientY - r.top) / r.height * 240; return [(x - BP.o) / BP.s, (y - BP.o) / BP.s]; };
  const toLine = (p, q) => { if (dist(p, q) < .15) return null; const c = clipLine(p, q); if (!c) return null; let [a, b] = c; if (snap) { a = a.map(v => Math.round(v / snap) * snap); b = b.map(v => Math.round(v / snap) * snap); } return { t: getTool(), a, b }; };
  svg.addEventListener('pointerdown', e => { e.preventDefault(); start = norm(e); try { svg.setPointerCapture(e.pointerId); } catch (_) { } });
  svg.addEventListener('pointermove', e => { if (!start) return; redraw(toLine(start, norm(e))); });
  const end = e => { if (!start) return; const l = toLine(start, norm(e)); start = null; if (l) onLine(l); else redraw(null); };
  svg.addEventListener('pointerup', end);
  svg.addEventListener('pointercancel', () => { start = null; redraw(null); });
}

/* =========================================================
   状態
   ========================================================= */
const S = { mode: 'rush', queue: [], idx: 0, total: 0, score: 0, log: [], recipe: null, build: null, tEnd: 0, limit: 0, raf: 0, rushCat: 'all', group: {}, tool: 'cut', picking: false };
const X = { tickets: [], ti: 0, made: [], table: 1 };   // 実践編

/* ---------- キッチンの描画 ---------- */
function binHTML(k) { const g = ING[k], b = S.build; return `<button type="button" class="bin${b && b.added[k] > 0 ? ' on' : ''}" data-ing="${k}" style="--c:${esc(g.color)}">${icoOf(g)}<span>${esc(g.name)}</span></button>`; }
function renderShelf() {
  const b = S.build, el = $('#shelf');
  el.hidden = S.mode === 'mix' && (!b || S.picking);
  if (!b || !b.cont || S.picking) { el.innerHTML = `<p class="shelf-empty">${S.mode === 'mix' ? '作る品の器かお皿を選ぶと、ここに材料が並びます。' : '先に器を選んでください。'}</p>`; return; }
  const cat = contCat(b.cont), groups = shelfGroups(cat);
  if (!groups.length) { el.innerHTML = '<p class="shelf-empty">この棚には材料がありません。</p>'; return; }
  let g = S.group[cat]; if (!groups.some(x => x[0] === g)) g = S.group[cat] = groups[0][0];
  el.innerHTML = `<div class="gtabs">${groups.map(([h, ks]) => { const n = ks.filter(k => b.added[k] > 0).length; return `<button data-group="${esc(h)}" aria-pressed="${h === g}">${esc(h)}${n ? `<i>${n}</i>` : ''}</button>`; }).join('')}</div>
    <div class="grid">${groups.find(x => x[0] === g)[1].map(binHTML).join('')}</div>`;
}
function renderChips() {
  const b = S.build;
  if (!b || !b.cont || S.picking) { $('#chips').innerHTML = ''; return; }
  const ks = orderKeys(b);
  let html = ks.map(k => `<button class="chip" data-ing="${k}">${esc(ING[k].name)}${ING[k].once ? '' : `<i>${fx(b.added[k])}${esc(ING[k].unit)}</i>`}</button>`).join('');
  if (b.cuts.length) html += `<button class="chip" data-view="cut">切り方<i>${b.cuts.length}本</i></button>`;
  $('#chips').innerHTML = html || `<span class="empty">${b.view === 'cut' ? 'パンの上を指でなぞると線が入ります' : '下の棚から材料をタップして入れてください'}</span>`;
}
function canCut(b) { return b && b.cont === 'plate' && (S.mode === 'mix' || hasCut(S.recipe)); }
function renderCounter(pop) {
  const b = S.build, box = $('#vessel'), r = S.recipe;
  // 器の選択(実践編:新しい品/器を変える)
  const picking = S.mode === 'mix' && (!b || S.picking);
  $('#contPick').hidden = !picking;
  if (picking) {
    $('#contPick').innerHTML = `<p>${b ? '器を選び直してください' : '作る品の器・お皿を選んでください'}</p>` + containers().map(c => `<button data-cont="${esc(c.id)}" aria-pressed="${b && b.cont === c.id}">${contIcon(c.id)}${esc(c.name)}</button>`).join('');
  }
  // 上部のボタン類
  const cut = !picking && canCut(b);
  if (b && !cut) b.view = 'plate';
  $('#viewTog').hidden = !cut;
  if (cut) document.querySelectorAll('#viewTog button').forEach(x => x.setAttribute('aria-pressed', x.dataset.view === b.view));
  $('#vChoose').hidden = !(S.mode !== 'mix' && r && r.vessel);
  if (!$('#vChoose').hidden) $('#vChoose').innerHTML = `<span>器:</span>` + VESSELS.map(v => `<button data-vessel="${esc(v.name)}" aria-pressed="${b.cont === 'v:' + v.name}">${esc(v.name)}</button>`).join('');
  $('#contChange').hidden = !(S.mode === 'mix' && b && !S.picking);
  if (!$('#contChange').hidden) $('#contChange').textContent = `${contName(b.cont)} ▸ 器を変える`;
  const ctop = $('#counter .ctop'); ctop.hidden = [...ctop.children].every(c => c.hidden);
  // 器 or まな板
  box.hidden = picking;
  $('#cutTools').hidden = picking || !(cut && b.view === 'cut');
  if (!picking) {
    if (cut && b.view === 'cut') {
      box.innerHTML = boardSVG(b.cuts, { bread: breadOf(r, b), id: 'cutBoard' });
      document.querySelectorAll('#cutTools [data-tool]').forEach(x => x.setAttribute('aria-pressed', x.dataset.tool === S.tool));
      const svg = $('#cutBoard');
      attachSwipe(svg, () => S.tool, l => { b.cuts.push(l); renderCounter(); renderChips(); renderTray(); }, prev => { const p = boardSVG(b.cuts, { bread: breadOf(r, b), preview: prev }); svg.innerHTML = p.slice(p.indexOf('>') + 1, p.lastIndexOf('</svg>')); });
    } else {
      box.innerHTML = buildSVG(b);
      if (pop) { box.classList.remove('pop'); void box.offsetWidth; box.classList.add('pop'); }
    }
  }
  renderChips();
}
function renderVesselPreview(am) { const b = S.build; if (!b || b.view === 'cut') return; $('#vessel').innerHTML = buildSVG(Object.assign({}, b, { added: am })); }
function renderTray() {
  const el = $('#tray');
  el.hidden = S.mode !== 'mix';
  if (el.hidden) return;
  el.innerHTML = X.made.map((b, i) => `<button data-tray="${i}" aria-pressed="${S.build === b && !S.picking}">${buildSVG(b, 't' + i)}<span>${esc(contName(b.cont))}</span></button>`).join('')
    + (X.made.length < MAX_TRAY ? `<button class="add" data-act="newItem" aria-pressed="${S.picking && !S.build}"><b>＋</b>新しく作る</button>` : '');
}
function renderTicket() {
  const mix = S.mode === 'mix', r = S.recipe, b = $('#tBadge');
  $('#tList').hidden = !mix;
  $('#kitchen').classList.toggle('mix', mix);
  if (mix) {
    const t = X.tickets[X.ti];
    b.className = 'badge'; b.textContent = `テーブル ${X.table}`;
    $('#tSub').textContent = `伝票 ${X.ti + 1}/${X.tickets.length}`;
    $('#tName').hidden = true;
    $('#tList').innerHTML = t.map(x => `<li><span>${esc(x.name)}</span></li>`).join('');
    $('#kProg').textContent = `${X.ti + 1}/${X.tickets.length}`;
  } else {
    $('#tName').hidden = false;
    b.className = 'badge ' + tabOf(r); b.textContent = badgeTxt(r);
    $('#tName').textContent = r.name;
    $('#tSub').textContent = `ご注文 ${S.idx + 1}/${S.total}`;
    $('#kProg').textContent = `${S.idx + 1}/${S.total}`;
  }
  $('#kScore').textContent = `${S.score}点`;
  $('#resetBtn').textContent = mix ? 'この品を捨てる' : 'やり直す';
  $('#serveBtn').textContent = mix ? '伝票ごと提供する' : '提供する';
  $('#quitBtn').textContent = '‹ 戻る'; $('#quitBtn').dataset.armed = '';
}
function renderKitchen() { renderTicket(); renderTray(); renderCounter(); renderShelf(); }

/* ---------- 練習(1品ずつ) ---------- */
function startOrder(r) {
  S.tool = 'cut';
  S.recipe = r; S.picking = false;
  S.build = newBuild(r.vessel && r.cat !== 'food' && r.look !== 'dish' ? null : expectedCont(r));
  renderKitchen(); show('kitchen'); $('#kitchen').scrollTop = 0;
  startTimer(r.cat === 'food' ? 90 : 60);
}
function startTimer(sec) {
  cancelAnimationFrame(S.raf); S.limit = sec; S.tEnd = performance.now() + sec * 1000;
  const bar = $('#timerBar'), wrap = $('#timer');
  const loop = t => {
    const left = (S.tEnd - t) / 1000; bar.style.transform = `scaleX(${Math.max(0, left / S.limit)})`; wrap.classList.toggle('warn', left < 12);
    if (left <= 0) { serve(true); return; } S.raf = requestAnimationFrame(loop);
  };
  S.raf = requestAnimationFrame(loop);
}
function stopTimer() { cancelAnimationFrame(S.raf); }
function floaty(txt) { const el = document.createElement('div'); el.className = 'floaty'; el.textContent = txt; $('#counter').appendChild(el); setTimeout(() => el.remove(), 950); }
function commit(k, val) {
  const b = S.build; val = rnd(val);
  const prev = b.added[k] || 0;
  if (val <= 0) { delete b.added[k]; b.seq = b.seq.filter(x => x !== k); }
  else { b.added[k] = val; if (!b.seq.includes(k)) b.seq.push(k); }
  b.view = 'plate';
  renderCounter(val > prev); renderShelf(); renderTray();
  if (val > prev) floaty(ING[k].once ? ING[k].name : `+${fx(val - prev)}${ING[k].unit}`);
  const el = document.querySelector(`#shelf .bin[data-ing="${k}"]`); if (el) { el.classList.add('bounce'); }
}

/* ---------- 計量シート ---------- */
const M = { k: null, val: 0 }; let holdT = null, ticks = 0;
function openMeasure(k) {
  const g = ING[k]; if (!S.build || !S.build.cont) return;
  if (g.once) { commit(k, S.build.added[k] ? 0 : 1); return; }
  M.k = k; M.val = S.build.added[k] || 0;
  $('#shIcon').innerHTML = icoOf(g); $('#shName').textContent = g.name; $('#shUnit').textContent = g.unit;
  $('#shPour').textContent = '長押しで' + (g.kind === 'liq' ? '注ぐ' : 'のせる');
  $('#shTip').textContent = `1タップで${fx(g.step)}${g.unit}ずつ。数字を直接入力することもできます。`;
  S.build.view = 'plate'; renderCounter();
  $('#sheet').hidden = false; updM();
}
function pendingAm() { const am = Object.assign({}, S.build.added); if (M.val > 0) am[M.k] = M.val; else delete am[M.k]; return am; }
function updM() { M.val = Math.max(0, rnd(M.val)); $('#shVal').value = fx(M.val); renderVesselPreview(pendingAm()); }
function closeSheet() { stopHold(); if ($('#sheet').hidden) return; $('#sheet').hidden = true; if (S.build) renderCounter(); }
function tick() { ticks++; const mult = ticks > 34 ? 5 : ticks > 14 ? 2 : 1; M.val += ING[M.k].step * mult; updM(); }
function stopHold() { clearInterval(holdT); holdT = null; $('#shPour').classList.remove('holding'); }
const pour = $('#shPour');
pour.addEventListener('pointerdown', e => { e.preventDefault(); try { pour.setPointerCapture(e.pointerId); } catch (_) { } ticks = 0; pour.classList.add('holding'); tick(); clearInterval(holdT); holdT = setInterval(tick, 95); });
['pointerup', 'pointercancel', 'lostpointercapture'].forEach(ev => pour.addEventListener(ev, stopHold));
pour.addEventListener('contextmenu', e => e.preventDefault());
$('#shMinus').onclick = () => { M.val -= ING[M.k].step; updM(); };
$('#shPlus').onclick = () => { M.val += ING[M.k].step; updM(); };
$('#shZero').onclick = () => { M.val = 0; updM(); };
$('#shVal').addEventListener('input', e => { const v = parseFloat(e.target.value.replace(/[^\d.]/g, '')); M.val = isNaN(v) ? 0 : v; renderVesselPreview(pendingAm()); });
$('#shVal').addEventListener('focus', e => e.target.select());
$('#shOk').onclick = () => { const k = M.k, v = M.val; closeSheet(); commit(k, v); };
$('#shClose').onclick = closeSheet; $('#sheetBg').onclick = closeSheet;

/* ---------- 判定 ---------- */
function judgeBuild(r, b, checkCont) {
  const rows = []; let ok = true;
  for (const [k, exp] of Object.entries(r.items)) {
    const got = b.added[k] || 0; let good;
    if (exp === null || isOnce(k)) good = got > 0; else if (Array.isArray(exp)) good = got >= exp[0] && got <= exp[1]; else good = Math.abs(got - exp) < 1e-6;
    rows.push({ k, exp: isOnce(k) ? null : exp, got, good }); if (!good) ok = false;
  }
  for (const k in b.added) if (!(k in r.items) && b.added[k] > 0 && ING[k] && !ING[k].neutral) { rows.push({ k, exp: 0, got: b.added[k], good: false }); ok = false; }
  let contOk = true; const needCont = checkCont || !!r.vessel;
  if (needCont) { contOk = b.cont === expectedCont(r); if (!contOk) ok = false; }
  const cut = hasCut(r) ? judgeCuts(r.cut, b.cuts || []) : null;
  if (cut && !cut.ok) ok = false;
  const good = rows.filter(x => x.good).length + (needCont && contOk ? 1 : 0) + (cut && cut.ok ? 1 : 0);
  const total = Object.keys(r.items).length + (needCont ? 1 : 0) + (cut ? 1 : 0);
  return { ok, rows, contOk, needCont, cut, good, total };
}
function expTxt(k, exp) { if (exp === 0) return 'なし'; if (exp === null) return '入れる'; return amtTxt(k, exp); }
function gotTxt(k, got) { if (!got) return '—'; if (isOnce(k)) return '入れた'; return amtTxt(k, got); }
function resultDetail(r, b, res) {
  let rows = res.rows.map(x => `<tr class="${x.good ? 'good' : 'bad'}"><td class="m">${x.good ? '○' : '×'}</td><td>${esc(ingName(x.k))}</td><td class="ans">${esc(expTxt(x.k, x.exp))}</td><td class="you">${esc(gotTxt(x.k, x.got))}</td></tr>`).join('');
  if (res.needCont) rows = `<tr class="${res.contOk ? 'good' : 'bad'}"><td class="m">${res.contOk ? '○' : '×'}</td><td>器</td><td class="ans">${esc(contName(expectedCont(r)))}</td><td class="you">${esc(b.cont ? contName(b.cont) : '—')}</td></tr>` + rows;
  if (res.cut) rows += `<tr class="${res.cut.ok ? 'good' : 'bad'}"><td class="m">${res.cut.ok ? '○' : '×'}</td><td>切り方</td><td class="ans" colspan="2">${res.cut.ok ? '正しく切れています' : '下の図を確認'}</td></tr>`;
  let html = `<table class="rtable"><thead><tr><th></th><th>材料</th><th>正解</th><th>あなた</th></tr></thead><tbody>${rows}</tbody></table>`;
  if (res.cut) html += `${res.cut.msgs.length ? `<p class="cutmsg">${res.cut.msgs.map(esc).join('<br>')}</p>` : ''}<div class="cutpair"><figure>${boardSVG(res.cut.lines, { bread: breadOf(r), numbers: r.cut.scoreFirst })}<figcaption>正解</figcaption></figure><figure>${boardSVG(b.cuts, { bread: breadOf(r), numbers: r.cut.scoreFirst, color: res.cut.ok ? '#36985a' : '#d94b37' })}<figcaption>あなた</figcaption></figure></div>`;
  return html;
}
function serve(auto) {
  if (!$('#modal').hidden) return;
  if (S.mode === 'mix') return serveMix(auto);
  stopTimer(); closeSheet();
  const r = S.recipe, b = S.build, res = judgeBuild(r, b, false);
  record(r.id, res.ok);
  const left = Math.max(0, (S.tEnd - performance.now()) / 1000);
  const pts = res.ok ? 100 + Math.ceil(left) * 2 : Math.round(res.good / Math.max(1, res.total) * 40);
  S.score += pts; S.log.push({ r, ok: res.ok, pts });
  const last = S.idx >= S.total - 1;
  openResult(res.ok, res.ok ? '完璧です！' : auto ? '時間切れです' : '惜しいです', res.ok ? `${r.name}を正しく作れました。` : '赤字のところを確認してください。', pts,
    resultDetail(r, b, res) + (r.note ? `<div class="note">${esc(r.note)}</div>` : ''), `<button class="btn primary" data-act="next">${last ? '結果を見る' : '次の注文へ'}</button>`);
}
function openResult(ok, title, sub, pts, body, btns) {
  $('#modalCard').innerHTML = `<div class="verdict"><div class="stamp ${ok ? 'ok' : 'ng'}">${ok ? '◎' : '△'}</div><div><h3>${title}</h3><p>${esc(sub)}${pts !== null ? ` <span class="pts">+${pts}点</span>` : ''}</p></div></div>${body}<div class="modal-btns">${btns}</div>`;
  $('#modal').hidden = false; $('#modalCard').scrollTop = 0;
}
function nextOrder() {
  $('#modal').hidden = true;
  if (S.mode === 'mix') { X.ti++; if (X.ti >= X.tickets.length) { showSummary(); return; } startTicket(); return; }
  S.idx++; if (S.idx >= S.total) { showSummary(); return; } startOrder(S.queue[S.idx]);
}
function startRush() {
  const pool = R.filter(r => S.rushCat === 'all' || r.cat === S.rushCat);
  if (!pool.length) { toast('このカテゴリにはメニューがありません'); return; }
  S.mode = 'rush'; S.queue = weighted(pool, 10); S.total = S.queue.length; S.idx = 0; S.score = 0; S.log = [];
  startOrder(S.queue[0]);
}

/* ---------- 実践編 ---------- */
function startMix() {
  if (!R.length) { toast('メニューがありません'); return; }
  S.mode = 'mix'; S.score = 0; S.log = []; S.recipe = null;
  X.tickets = [];
  for (let i = 0; i < MIX_TICKETS; i++) {
    const n = Math.min(R.length, 2 + Math.floor(Math.random() * 3));
    let t = weighted(R, n);
    const foods = t.filter(r => r.cat === 'food');
    if (foods.length > 2) t = t.filter(r => r.cat !== 'food').concat(foods.slice(0, 2));
    X.tickets.push(t);
  }
  X.ti = 0; startTicket();
}
function startTicket() {
  X.made = []; X.table = 1 + Math.floor(Math.random() * 12);
  S.build = null; S.picking = true;
  renderKitchen(); show('kitchen'); $('#kitchen').scrollTop = 0;
  startTimer(X.tickets[X.ti].reduce((a, r) => a + (r.cat === 'food' ? 80 : 45), 0));
}
function selectTray(i) { S.build = X.made[i]; S.picking = false; renderTray(); renderCounter(); renderShelf(); }
function pickCont(id) {
  const b = S.build;
  if (b && S.picking && X.made.includes(b)) {   // 器を変える
    if (contCat(b.cont) !== contCat(id)) { b.added = {}; b.seq = []; b.cuts = []; }
    b.cont = id;
  } else {
    if (X.made.length >= MAX_TRAY) return;
    S.build = newBuild(id); X.made.push(S.build); S.tool = 'cut';
  }
  S.picking = false; renderTray(); renderCounter(true); renderShelf();
}
function serveMix(auto) {
  stopTimer(); closeSheet();
  const T = X.tickets[X.ti], n = T.length, m = X.made.length;
  const J = T.map(r => X.made.map(b => judgeBuild(r, b, true)));
  const sc = (i, j) => J[i][j].ok ? 1000 : J[i][j].good;
  let best = { s: -1, a: [] };
  (function rec(i, used, a, s) {
    if (i === n) { if (s > best.s) best = { s, a: a.slice() }; return; }
    a.push(-1); rec(i + 1, used, a, s); a.pop();
    for (let j = 0; j < m; j++) if (!used.has(j)) { used.add(j); a.push(j); rec(i + 1, used, a, s + sc(i, j)); a.pop(); used.delete(j); }
  })(0, new Set(), [], 0);
  let body = '', allOk = true, pts = 0;
  T.forEach((r, i) => {
    const j = best.a[i], res = j >= 0 ? J[i][j] : null, ok = !!(res && res.ok);
    record(r.id, ok);
    const p = ok ? 100 : res ? Math.round(res.good / Math.max(1, res.total) * 40) : 0;
    pts += p; S.log.push({ r, ok, pts: p }); if (!ok) allOk = false;
    body += `<div class="mixitem ${ok ? 'good' : 'bad'}"><h4><span class="m">${ok ? '○' : '×'}</span>${esc(r.name)}</h4>${ok ? '' : res ? resultDetail(r, X.made[j], res) : '<p>作られていません。</p>'}</div>`;
  });
  const extras = X.made.filter((b, j) => !best.a.includes(j));
  if (extras.length) { allOk = false; body += `<div class="mixitem bad"><h4><span class="m">×</span>伝票にない品</h4>${extras.map(b => `<p>${esc(contName(b.cont))}:${esc(orderKeys(b).map(k => ingName(k) + (amtTxt(k, b.added[k]) ? ' ' + amtTxt(k, b.added[k]) : '')).join('、') || '空')}</p>`).join('')}</div>`; }
  if (allOk) pts += 50 + Math.ceil(Math.max(0, (S.tEnd - performance.now()) / 1000));
  S.score += pts;
  const last = X.ti >= X.tickets.length - 1;
  openResult(allOk, allOk ? '伝票どおりです！' : auto ? '時間切れです' : '惜しいです', allOk ? `テーブル${X.table}の注文をすべて正しく作れました。` : '×の品を確認してください。', pts, body,
    `<button class="btn primary" data-act="next">${last ? '結果を見る' : '次の伝票へ'}</button>`);
}

function showSummary() {
  const ok = S.log.filter(x => x.ok).length;
  $('#summary').innerHTML = `<div class="card" style="display:grid;gap:14px">
    <div style="text-align:center"><div class="st-sub">${S.mode === 'mix' ? '実践編' : '練習'}の結果</div><div class="big">${S.score}</div><div class="st-sub">点 ・ 正解 ${ok}/${S.log.length}品</div></div>
    <div class="sum-list">${S.log.map(x => `<div><b style="color:var(--${x.ok ? 'ok' : 'ng'})">${x.ok ? '○' : '×'}</b><span>${esc(x.r.name)}</span><i>+${x.pts}</i></div>`).join('')}</div>
    <div class="modal-btns">
      <button class="btn primary" data-act="${S.mode === 'mix' ? 'mix' : 'rush'}">もう一度</button>
    </div>
    <button class="btn ghost" data-act="home">ホームへ</button></div>`;
  show('summary');
}

/* ---------- レシピ帳 ---------- */
let bookTab = 'hot';
function renderTabs(el, cur, attr) { el.innerHTML = TABS.map(([k, l]) => `<button data-${attr}="${k}" aria-pressed="${k === cur}">${l}</button>`).join(''); }
function renderBook() {
  renderTabs($('#bookTabs'), bookTab, 'btab');
  const q = $('#bookSearch').value.trim();
  const list = R.filter(r => q ? (r.name.includes(q) || Object.keys(r.items).some(k => ingName(k).includes(q))) : tabOf(r) === bookTab);
  $('#bookTabs').style.opacity = q ? '.4' : '1';
  $('#bookList').innerHTML = list.length ? list.map(r => `<div class="bcard"><div class="bhead">${badge(r)}<b>${esc(r.name)}</b>${lvTag(r.id)}</div>
    <ul class="ings">${r.vessel ? `<li><span>器</span><i>${esc(r.vessel)}</i></li>` : ''}${Object.entries(r.items).map(([k, v]) => `<li><span>${esc(ingName(k))}</span><i>${esc(amtTxt(k, v)) || '○'}</i></li>`).join('')}</ul>
    ${hasCut(r) ? `<div class="hint-cut">${boardSVG(r.cut.lines, { bread: breadOf(r), numbers: r.cut.scoreFirst, cls: 'bcut' })}<span class="bnote">点線:切込み<br>実線:カット${r.cut.scoreFirst ? '<br>切込みを全部入れてからカット' : ''}${r.cut.anyTurn ? '<br>向きは問わない' : ''}</span></div>` : ''}
    ${r.steps && r.steps.length ? `<div class="st-sub" style="font-weight:800">${esc(r.stepsTitle || '手順')}</div><ol>${r.steps.map(s => `<li>${esc(s)}</li>`).join('')}</ol>` : ''}
    ${r.note ? `<p class="bnote">${esc(r.note)}</p>` : ''}</div>`).join('') : `<p class="foot">${q ? `「${esc(q)}」に当てはまるメニューはありません。` : 'このタブにはメニューがありません。'}</p>`;
}

/* ---------- ホーム ---------- */
function renderHome() {
  document.querySelectorAll('#rushCat button').forEach(b => b.setAttribute('aria-pressed', b.dataset.cat === S.rushCat));
  show('home');
}

/* =========================================================
   イベント
   ========================================================= */
document.addEventListener('click', e => {
  const t = e.target.closest('button'); if (!t || t.disabled) return;
  const d = t.dataset, a = d.act;
  // キッチン
  if (d.ing) { openMeasure(d.ing); return; }
  if (d.group) { const b = S.build; if (b) { S.group[contCat(b.cont)] = d.group; renderShelf(); } return; }
  if (d.vessel) { S.build.cont = 'v:' + d.vessel; renderCounter(true); renderShelf(); return; }
  if (d.cont) { pickCont(d.cont); return; }
  if (d.tray !== undefined) { selectTray(+d.tray); return; }
  if (d.view) { if (S.build) { S.build.view = d.view; renderCounter(); } return; }
  if (d.tool) { S.tool = d.tool; renderCounter(); return; }
  // ゲーム全般
  if (d.cat) { S.rushCat = d.cat; renderHome(); return; }
  if (d.btab) { bookTab = d.btab; renderBook(); return; }
  switch (a) {
    case 'home': $('#modal').hidden = true; renderHome(); break;
    case 'rush': $('#modal').hidden = true; startRush(); break;
    case 'mix': $('#modal').hidden = true; startMix(); break;
    case 'book': renderBook(); show('book'); break;
    case 'next': nextOrder(); break;
    case 'newItem': S.build = null; S.picking = true; renderTray(); renderCounter(); renderShelf(); break;
    case 'cutUndo': if (S.build && S.build.cuts.length) { S.build.cuts.pop(); renderCounter(); renderTray(); } break;
  }
});
$('#contChange').onclick = () => { S.picking = true; renderCounter(); renderShelf(); renderTray(); };

// キッチン操作
$('#serveBtn').onclick = () => serve(false);
$('#resetBtn').onclick = () => {
  if (S.mode === 'mix') {
    if (!S.build || !X.made.includes(S.build)) return;
    X.made.splice(X.made.indexOf(S.build), 1); S.build = null; S.picking = true;
    renderTray(); renderCounter(); renderShelf(); return;
  }
  const b = S.build; b.added = {}; b.seq = []; b.cuts = []; b.view = 'plate'; renderCounter(); renderShelf();
};
$('#quitBtn').onclick = () => {
  const b = $('#quitBtn');
  if (!armConfirm(b, 'もう一度で終了')) return;
  stopTimer(); closeSheet(); renderHome();
};
$('#bookSearch').addEventListener('input', renderBook);

/* ---------- 起動 ---------- */
if (!BASE || !BASE.recipes) {
  document.body.innerHTML = '<p style="padding:24px;font-family:sans-serif">data.js を読み込めませんでした。index.html と同じ場所に data.js があるか確認してください。</p>';
} else {
  loadData();
  renderHome();
}
