'use strict';
/* =========================================================
   喫茶レシピキッチン
   データ(メニュー・材料・器)は data.js の window.GAME_DATA。
   アプリ内で編集した内容はブラウザ(localStorage)に保存され、
   「データ」タブから data.js として書き出せます。
   ========================================================= */

/* ---------- 定数 ---------- */
const STORE_DATA = 'kissa-kitchen-data-v1';
const STORE_STATS = 'kissa-recipe-kitchen-v1';
const BASE = window.GAME_DATA;

const CATS = [['drink', 'ドリンク'], ['food', 'フード']];
const TABS = [['hot', 'HOT'], ['cold', 'ICE・その他'], ['food', 'フード']];
const LOOKS = [['hot', 'HOT(マグで表示)'], ['ice', 'ICE(グラスで表示)'], ['dish', 'デザート(皿で表示)']];
const KINDS = {
  drink: [['liq', '液体(層になって入る)'], ['pow', '粉・茶葉'], ['top', 'トッピング・氷・果物']],
  food: [['layer', 'パンにのせる・はさむ'], ['side', '皿に添える']]
};
const VISES = {
  liq: [['liquid', '液体']],
  pow: [['powder', '粉(表面に散る)']],
  top: [['whip', 'ホイップ'], ['scoop', 'アイス(丸いすくい)'], ['fruit', '果物のつぶ'], ['slice', '輪切り(ふちに飾る)'], ['ice', '氷'], ['pudding', 'プリン'], ['blob', 'その他(表面にのる)']],
  layer: [['band', '平らな層'], ['bread', 'パン'], ['dots', '輪切りが並ぶ'], ['wave', '葉もの']],
  side: [['soup', 'スープカップ'], ['egg', 'たまご'], ['bowl', '深皿'], ['cup', '小さなカップ'], ['scoop', 'アイス'], ['dish', '小皿']]
};
const SHAPES = [['pot', 'ポット'], ['bottle', 'ボトル'], ['carton', 'パック'], ['jar', 'びん'], ['shaker', 'ふりかけ'], ['tub', '容器'], ['round', '輪切り'], ['sheet', 'スライス'], ['cube', '氷'], ['ball', 'まるいもの'], ['can', '缶'], ['pudding', 'プリン'], ['bread', 'パン'], ['leaf', '葉'], ['egg', 'たまご'], ['pack', '袋']];
const VSHAPES = [['rock', 'ロックグラス'], ['tumbler', 'タンブラー'], ['glass', '背の高いグラス'], ['mug', 'マグ'], ['jug', 'ジャグ']];

/* ---------- データの読み込みと保存 ---------- */
let DATA, ING, R, VESSELS;
let DATA_EDITED = false, BASE_CHANGED = false, SAVED_AT = 0;

const clone = o => JSON.parse(JSON.stringify(o));
function readSaved() { try { return JSON.parse(localStorage.getItem(STORE_DATA)); } catch (e) { return null; } }
function writeSaved(obj) { try { localStorage.setItem(STORE_DATA, JSON.stringify(obj)); return true; } catch (e) { return false; } }
function clearSaved() { try { localStorage.removeItem(STORE_DATA); } catch (e) { } }

function loadData() {
  const saved = readSaved();
  if (saved && saved.data && Array.isArray(saved.data.recipes)) {
    if (saved.data.version === BASE.version) {
      // 書き出した内容が data.js として公開済み → ブラウザ側の控えは不要
      clearSaved();
      useBase();
    } else {
      DATA = saved.data; DATA_EDITED = true; SAVED_AT = saved.savedAt || 0;
      BASE_CHANGED = saved.baseVersion !== BASE.version;
    }
  } else useBase();
  applyData();
}
function useBase() { DATA = clone(BASE); DATA_EDITED = false; BASE_CHANGED = false; SAVED_AT = 0; }
function saveData() {
  DATA.version = 'edited-' + Date.now();
  SAVED_AT = Date.now();
  const ok = writeSaved({ baseVersion: BASE.version, savedAt: SAVED_AT, data: DATA });
  DATA_EDITED = true;
  applyData();
  if (!ok) toast('ブラウザに保存できませんでした。書き出して控えを取ってください。');
  return ok;
}
function applyData() {
  ING = {};
  for (const [k, v] of Object.entries(DATA.ingredients)) {
    ING[k] = Object.assign({ key: k, unit: '', step: 1, icon: 'jar', thickness: 4, vis: '', group: 'その他' }, v);
  }
  R = DATA.recipes;
  VESSELS = DATA.vessels || [];
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
const uid = p => p + Date.now().toString(36) + Math.random().toString(36).slice(2, 5);
function amtTxt(k, v) { const g = ING[k]; if (!g || v === null || v === undefined) return ''; if (Array.isArray(v)) return v[0] + '〜' + v[1] + g.unit; return fx(v) + g.unit; }
function ingName(k) { return ING[k] ? ING[k].name : '(削除された材料)'; }
function recipeLine(r) { return Object.entries(r.items).map(([k, v]) => ingName(k) + (amtTxt(k, v) ? ' ' + amtTxt(k, v) : '')).join(' ＋ '); }
const tabOf = r => r.cat === 'food' ? 'food' : (r.look === 'hot' ? 'hot' : 'cold');
function badgeTxt(r) { return r.cat === 'food' ? 'フード' : r.look === 'hot' ? 'HOT' : r.look === 'dish' ? 'デザート' : 'ICE'; }
const badge = r => `<span class="badge ${tabOf(r)}">${badgeTxt(r)}</span>`;
function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function show(id) { document.querySelectorAll('.screen').forEach(s => s.hidden = s.id !== id); window.scrollTo(0, 0); }
function opts(list, cur) { return list.map(([v, l]) => `<option value="${esc(v)}"${v === cur ? ' selected' : ''}>${esc(l)}</option>`).join(''); }
let toastT;
function toast(msg) { document.querySelectorAll('.toast').forEach(t => t.remove()); const el = document.createElement('div'); el.className = 'toast'; el.textContent = msg; document.body.appendChild(el); clearTimeout(toastT); toastT = setTimeout(() => el.remove(), 2600); }
function shelfGroups(cat) { const m = new Map(); for (const k in ING) { const g = ING[k]; if (g.cat !== cat) continue; if (!m.has(g.group)) m.set(g.group, []); m.get(g.group).push(k); } return [...m]; }
function armConfirm(btn, label) { if (btn.dataset.armed) return true; const orig = btn.textContent; btn.dataset.armed = '1'; btn.textContent = label; setTimeout(() => { btn.dataset.armed = ''; btn.textContent = orig; }, 2600); return false; }

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

/* ---------- 状態 ---------- */
const S = { mode: 'practice', queue: [], idx: 0, total: 0, score: 0, log: [], recipe: null, added: {}, seq: [], vessel: null, tEnd: 0, limit: 0, raf: 0, pickTab: 'hot', rushCat: 'all', hint: false };

/* ---------- 器・皿の描画 ---------- */
const GEO = {
  mug: { out: 'M52 70h104v104q0 24-24 24H76q-24 0-24-24Z', inn: 'M58 76h92v97q0 19-19 19H77q-19 0-19-19Z', top: 76, bot: 192, cap: 330, hl: 66, extra: '<path d="M156 92h12q18 0 18 22t-18 22h-12" fill="none" stroke="#3a2c25" stroke-width="5"/>' },
  glass: { out: 'M58 34h104l-12 166q-.4 6-6 6H76q-5.6 0-6-6Z', inn: 'M64 40h92l-11 158H75Z', top: 40, bot: 198, cap: 280, hl: 72 },
  rock: { out: 'M44 108h132l-7 92q-.4 6-6 6H57q-5.6 0-6-6Z', inn: 'M50 114h120l-6 84H56Z', top: 114, bot: 198, cap: 200, hl: 58 },
  tumbler: { out: 'M68 22h84l-6 178q-.2 6-6 6H80q-5.8 0-6-6Z', inn: 'M74 28h72l-5 170H79Z', top: 28, bot: 198, cap: 260, hl: 82 },
  jug: { out: 'M62 52h84l14-10 4 6-10 12v118q0 22-22 22H84q-22 0-22-22Z', inn: 'M68 60h80v118q0 16-16 16H84q-16 0-16-16Z', top: 60, bot: 194, cap: 320, hl: 76, extra: '<path d="M62 80h-10q-14 0-14 20v30q0 18 14 18h10" fill="none" stroke="#3a2c25" stroke-width="5"/>' }
};
function orderKeys(am) { const ks = S.seq.filter(k => am[k] > 0 && ING[k]); for (const k in am) if (am[k] > 0 && ING[k] && !ks.includes(k)) ks.push(k); return ks; }
function whipSVG(y) { return `<g fill="#fff" stroke="#3a2c25" stroke-width="3"><circle cx="94" cy="${y - 6}" r="14"/><circle cx="126" cy="${y - 6}" r="14"/><circle cx="110" cy="${y - 20}" r="15"/><path d="M110 ${y - 34}q4-8 0-12" fill="none"/></g>`; }
function scoopSVG(x, y, c) { return `<circle cx="${x}" cy="${y}" r="17" fill="${c || '#fff3d4'}" stroke="#3a2c25" stroke-width="3"/><path d="M${x - 9} ${y + 6}q9 6 18 0" fill="none" stroke="#000" stroke-opacity=".12" stroke-width="3"/>`; }
function toppings(ks, am, surf, rimX, rimY) {
  let t = '';
  const by = v => ks.filter(k => ING[k].kind === 'top' && ING[k].vis === v);
  if (by('whip').length) t += whipSVG(surf);
  by('scoop').forEach((k, i) => { t += scoopSVG((by('whip').length ? 136 : 110) + i * 22, surf - (by('whip').length ? 24 : 12) - i * 6, ING[k].color); });
  by('blob').forEach((k, i) => { t += `<ellipse cx="${92 + i * 18}" cy="${surf - 5}" rx="10" ry="6" fill="${ING[k].color}" stroke="#3a2c25" stroke-width="2"/>`; });
  by('slice').forEach((k, i) => { const c = ING[k].color; t += `<g transform="translate(${rimX - i * 24} ${rimY})"><circle r="15" fill="${c}" stroke="#3a2c25" stroke-width="3"/><circle r="10" fill="#fff" opacity=".55"/><path d="M0-10V10M-10 0H10M-7-7l14 14M7-7l-14 14" stroke="${c}" stroke-width="1.6"/></g>`; });
  return t;
}
function drinkSVG(r, am) {
  if (r.look === 'dish') return dishSVG(am);
  let key;
  if (r.vessel) { const v = S.vessel && VESSELS.find(x => x.name === S.vessel); key = v ? v.shape : null; }
  else key = r.look === 'hot' ? 'mug' : 'glass';
  if (!key || !GEO[key]) return `<svg viewBox="0 0 220 220"><path d="${GEO.glass.out}" fill="#fff" fill-opacity=".3" stroke="#3a2c25" stroke-opacity=".45" stroke-width="4" stroke-dasharray="9 8"/><text x="110" y="132" text-anchor="middle" font-size="46" font-weight="800" fill="#3a2c25" fill-opacity=".55">?</text></svg>`;
  const G = GEO[key], H = G.bot - G.top, ks = orderKeys(am);
  let y = G.bot, liq = '';
  const liqs = ks.filter(k => ING[k].kind === 'liq');
  liqs.forEach(k => { const v = ING[k].once ? 150 : am[k]; let h = v / G.cap * H; if (y - h < G.top) h = y - G.top; if (h <= 0) return; y -= h; liq += `<rect x="0" y="${y}" width="220" height="${h + .6}" fill="${ING[k].color}"/>`; });
  const has = liqs.length > 0, surf = has ? y : G.bot;
  if (has) liq += `<rect x="0" y="${surf}" width="220" height="4" fill="#fff" opacity=".45"/>`;
  ks.filter(k => ING[k].vis === 'fruit').forEach(k => { const cols = [ING[k].color, '#f05a5a', '#ffd84a', '#9ad15a']; for (let i = 0; i < 9; i++) liq += `<circle cx="${84 + (i * 23) % 54}" cy="${G.bot - 9 - (i % 3) * 12}" r="6" fill="${cols[i % 4]}" stroke="#3a2c25" stroke-width="1.4"/>`; });
  const nIce = Math.min(ks.filter(k => ING[k].vis === 'ice').reduce((a, k) => a + am[k], 0), 9);
  for (let i = 0; i < nIce; i++) { const c = i % 3, rw = Math.floor(i / 3); const yy = has ? Math.max(surf - 8, G.top) + rw * 21 : G.bot - 22 - rw * 21; liq += `<rect x="${81 + c * 20}" y="${yy}" width="19" height="19" rx="4" fill="#fff" fill-opacity=".6" stroke="#8fc6df" stroke-width="2.4"/>`; }
  let top = '';
  ks.filter(k => ING[k].kind === 'pow').forEach((k, j) => { for (let i = 0; i < 8; i++) top += `<circle cx="${84 + i * 7 + j * 3}" cy="${surf - 3 - (i % 2) * 3}" r="2.6" fill="${ING[k].color}" stroke="#3a2c25" stroke-width=".8"/>`; });
  top += toppings(ks, am, surf, key === 'mug' ? 146 : 150, G.top + 2);
  return `<svg viewBox="0 0 220 220"><defs><clipPath id="vclip"><path d="${G.inn}"/></clipPath></defs><path d="${G.out}" fill="#fff" fill-opacity=".62"/><g clip-path="url(#vclip)">${liq}</g>${G.extra || ''}<path d="${G.out}" fill="none" stroke="#3a2c25" stroke-width="4.5" stroke-linejoin="round"/><path d="M${G.hl} ${G.top + 14}v40" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".8"/>${top}</svg>`;
}
function dishSVG(am) {
  const ks = orderKeys(am);
  let s = `<ellipse cx="110" cy="182" rx="90" ry="22" fill="#fff" stroke="#3a2c25" stroke-width="4"/><ellipse cx="110" cy="179" rx="60" ry="12" fill="#f2ede4"/>`;
  let ty = 176;
  const pud = ks.find(k => ING[k].vis === 'pudding');
  if (pud) { s += `<path d="M76 176L88 118H132L144 176Z" fill="${ING[pud].color}" stroke="#3a2c25" stroke-width="4" stroke-linejoin="round"/><path d="M88 118H132L129.6 130Q110 137 90.4 130Z" fill="#8a4a1c"/>`; ty = 118; }
  s += toppings(ks, am, ty, 160, 150);
  return `<svg viewBox="0 0 220 220">${s}</svg>`;
}
function plateSVG(am) {
  const ks = orderKeys(am);
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
function renderVessel(am, pop) {
  const r = S.recipe, el = $('#vessel');
  el.innerHTML = r.cat === 'food' ? plateSVG(am) : drinkSVG(r, am);
  if (pop) { el.classList.remove('pop'); void el.offsetWidth; el.classList.add('pop'); }
}

/* ---------- キッチン ---------- */
function binHTML(k) { const g = ING[k]; return `<button type="button" class="bin${S.added[k] > 0 ? ' on' : ''}" data-ing="${k}" style="--c:${esc(g.color)}">${icoOf(g)}<span>${esc(g.name)}</span></button>`; }
function renderShelf() {
  $('#shelf').innerHTML = shelfGroups(S.recipe.cat).map(([h, ks]) => `<h4>${esc(h)}</h4><div class="grid">${ks.map(binHTML).join('')}</div>`).join('');
}
function renderChips() {
  const ks = orderKeys(S.added);
  $('#chips').innerHTML = ks.length ? ks.map(k => `<button class="chip" data-ing="${k}">${esc(ING[k].name)}${ING[k].once ? '' : `<i>${fx(S.added[k])}${esc(ING[k].unit)}</i>`}</button>`).join('') : `<span class="empty">下の棚から材料をタップして入れてください</span>`;
  document.querySelectorAll('#shelf .bin').forEach(b => b.classList.toggle('on', S.added[b.dataset.ing] > 0));
}
function renderVChoose() {
  const r = S.recipe, el = $('#vChoose');
  if (!r.vessel) { el.hidden = true; return; }
  el.hidden = false;
  el.innerHTML = `<span>器:</span>` + VESSELS.map(v => `<button data-vessel="${esc(v.name)}" aria-pressed="${S.vessel === v.name}">${esc(v.name)}</button>`).join('');
}
function renderHint() {
  const r = S.recipe, box = $('#hintBox');
  box.hidden = !S.hint;
  if (S.hint) box.innerHTML = `<b>レシピ</b>:${r.vessel ? `器は${esc(r.vessel)}。` : ''}${esc(recipeLine(r))}${r.note ? `<br>${esc(r.note)}` : ''}`;
}
function startOrder(r) {
  S.recipe = r; S.added = {}; S.seq = []; S.vessel = null; S.hint = false;
  const b = $('#tBadge'); b.className = 'badge ' + tabOf(r); b.textContent = badgeTxt(r);
  $('#tName').textContent = r.name;
  const rush = S.mode === 'rush';
  $('#tSub').textContent = rush ? `ご注文 ${S.idx + 1}/${S.total}` : '練習';
  $('#kProg').textContent = rush ? `${S.idx + 1}/${S.total}` : LV[level(r.id)];
  $('#kScore').hidden = !rush; $('#kScore').textContent = `${S.score}点`;
  $('#timer').hidden = !rush; $('#hintBtn').hidden = rush;
  $('#quitBtn').textContent = '‹ 戻る'; $('#quitBtn').dataset.armed = '';
  renderHint(); renderVChoose(); renderShelf(); renderChips(); renderVessel(S.added);
  show('kitchen'); $('#shelf').scrollTop = 0;
  if (rush) startTimer(r.cat === 'food' ? 90 : 60);
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
  val = rnd(val);
  const prev = S.added[k] || 0;
  if (val <= 0) { delete S.added[k]; S.seq = S.seq.filter(x => x !== k); }
  else { S.added[k] = val; if (!S.seq.includes(k)) S.seq.push(k); }
  renderChips(); renderVessel(S.added, val > prev);
  if (val > prev) floaty(ING[k].once ? ING[k].name : `+${fx(val - prev)}${ING[k].unit}`);
  const b = document.querySelector(`#shelf .bin[data-ing="${k}"]`); if (b) { b.classList.remove('bounce'); void b.offsetWidth; b.classList.add('bounce'); }
}

/* ---------- 計量シート ---------- */
const M = { k: null, val: 0 }; let holdT = null, ticks = 0;
function openMeasure(k) {
  const g = ING[k];
  if (g.once) { commit(k, S.added[k] ? 0 : 1); return; }
  M.k = k; M.val = S.added[k] || 0;
  $('#shIcon').innerHTML = icoOf(g); $('#shName').textContent = g.name; $('#shUnit').textContent = g.unit;
  $('#shPour').textContent = '長押しで' + (g.kind === 'liq' ? '注ぐ' : g.kind === 'pow' ? '量る' : 'のせる');
  $('#shTip').textContent = `1タップで${fx(g.step)}${g.unit}ずつ。数字を直接入力することもできます。`;
  $('#sheet').hidden = false; updM();
}
function pendingAm() { const am = Object.assign({}, S.added); if (M.val > 0) am[M.k] = M.val; else delete am[M.k]; return am; }
function updM() { M.val = Math.max(0, rnd(M.val)); $('#shVal').value = fx(M.val); renderVessel(pendingAm()); }
function closeSheet() { stopHold(); $('#sheet').hidden = true; if (S.recipe) renderVessel(S.added); }
function tick() { ticks++; const mult = ticks > 34 ? 5 : ticks > 14 ? 2 : 1; M.val += ING[M.k].step * mult; updM(); }
function stopHold() { clearInterval(holdT); holdT = null; $('#shPour').classList.remove('holding'); }
const pour = $('#shPour');
pour.addEventListener('pointerdown', e => { e.preventDefault(); try { pour.setPointerCapture(e.pointerId); } catch (_) { } ticks = 0; pour.classList.add('holding'); tick(); clearInterval(holdT); holdT = setInterval(tick, 95); });
['pointerup', 'pointercancel', 'lostpointercapture'].forEach(ev => pour.addEventListener(ev, stopHold));
pour.addEventListener('contextmenu', e => e.preventDefault());
$('#shMinus').onclick = () => { M.val -= ING[M.k].step; updM(); };
$('#shPlus').onclick = () => { M.val += ING[M.k].step; updM(); };
$('#shZero').onclick = () => { M.val = 0; updM(); };
$('#shVal').addEventListener('input', e => { const v = parseFloat(e.target.value.replace(/[^\d.]/g, '')); M.val = isNaN(v) ? 0 : v; renderVessel(pendingAm()); });
$('#shVal').addEventListener('focus', e => e.target.select());
$('#shOk').onclick = () => { const k = M.k, v = M.val; closeSheet(); commit(k, v); };
$('#shClose').onclick = closeSheet; $('#sheetBg').onclick = closeSheet;

/* ---------- 判定 ---------- */
function judge(r, added, vessel) {
  const rows = []; let ok = true;
  for (const [k, exp] of Object.entries(r.items)) {
    const got = added[k] || 0; let good;
    if (exp === null) good = got > 0; else if (Array.isArray(exp)) good = got >= exp[0] && got <= exp[1]; else good = Math.abs(got - exp) < 1e-6;
    rows.push({ k, exp, got, good }); if (!good) ok = false;
  }
  for (const k in added) if (!(k in r.items) && added[k] > 0 && !ING[k].neutral) { rows.push({ k, exp: 0, got: added[k], good: false }); ok = false; }
  let vOk = true; if (r.vessel) { vOk = vessel === r.vessel; if (!vOk) ok = false; }
  return { ok, rows, vOk };
}
function serve(auto) {
  if (!$('#modal').hidden) return;
  stopTimer(); closeSheet();
  const r = S.recipe, res = judge(r, S.added, S.vessel);
  record(r.id, res.ok);
  let pts = 0;
  if (S.mode === 'rush') {
    const left = Math.max(0, (S.tEnd - performance.now()) / 1000);
    if (res.ok) pts = 100 + Math.ceil(left) * 2;
    else { const n = Object.keys(r.items).length || 1; pts = Math.round(res.rows.filter(x => x.good).length / n * 40); }
    S.score += pts; S.log.push({ r, ok: res.ok, pts });
  }
  showResult(r, res, pts, auto);
}
function expTxt(k, exp) { if (exp === 0) return 'なし'; if (exp === null) return '入れる'; return amtTxt(k, exp); }
function gotTxt(k, got) { if (!got) return '—'; if (ING[k] && ING[k].once) return '入れた'; return amtTxt(k, got); }
function showResult(r, res, pts, auto) {
  const rush = S.mode === 'rush';
  const title = res.ok ? '完璧です！' : auto ? '時間切れです' : '惜しいです';
  const sub = res.ok ? `${r.name}を正しく作れました。` : '赤字のところを確認してください。';
  let rows = res.rows.map(x => `<tr class="${x.good ? 'good' : 'bad'}"><td class="m">${x.good ? '○' : '×'}</td><td>${esc(ingName(x.k))}</td><td class="ans">${esc(expTxt(x.k, x.exp))}</td><td class="you">${esc(gotTxt(x.k, x.got))}</td></tr>`).join('');
  if (r.vessel) rows = `<tr class="${res.vOk ? 'good' : 'bad'}"><td class="m">${res.vOk ? '○' : '×'}</td><td>器</td><td class="ans">${esc(r.vessel)}</td><td class="you">${esc(S.vessel || '—')}</td></tr>` + rows;
  const last = rush && S.idx >= S.total - 1;
  const btns = rush ? `<button class="btn primary" data-act="next">${last ? '結果を見る' : '次の注文へ'}</button>`
    : `<button class="btn ghost" data-act="retry">もう一度</button><button class="btn ghost" data-act="pick">一覧へ</button><button class="btn primary" data-act="next">次のメニュー</button>`;
  $('#modalCard').innerHTML = `<div class="verdict"><div class="stamp ${res.ok ? 'ok' : 'ng'}">${res.ok ? '◎' : '△'}</div><div><h3>${title}</h3><p>${esc(sub)}${rush ? ` <span class="pts">+${pts}点</span>` : ''}</p></div></div>
    <table class="rtable"><thead><tr><th></th><th>材料</th><th>正解</th><th>あなた</th></tr></thead><tbody>${rows}</tbody></table>
    ${r.note ? `<div class="note">${esc(r.note)}</div>` : ''}
    <div class="modal-btns">${btns}</div>`;
  $('#modal').hidden = false;
}
function weighted(pool, n) { return pool.map(r => { const lv = level(r.id); const w = lv === 2 ? 1 : lv === 1 ? 3 : 2; return { r, key: Math.pow(Math.random(), 1 / w) }; }).sort((a, b) => b.key - a.key).slice(0, n).map(x => x.r); }
function nextOrder() {
  $('#modal').hidden = true;
  if (S.mode === 'rush') { S.idx++; if (S.idx >= S.total) { showSummary(); return; } startOrder(S.queue[S.idx]); return; }
  let r = S.queue.shift();
  if (!r) { const pool = R.filter(x => tabOf(x) === S.pickTab && x.id !== S.recipe.id); r = weighted(pool.length ? pool : [S.recipe], 1)[0]; }
  startOrder(r);
}

/* ---------- 営業モード ---------- */
function startRush() {
  const pool = R.filter(r => S.rushCat === 'all' || r.cat === S.rushCat);
  if (!pool.length) { toast('このカテゴリにはメニューがありません'); return; }
  S.mode = 'rush'; S.queue = weighted(pool, 10); S.total = S.queue.length; S.idx = 0; S.score = 0; S.log = [];
  startOrder(S.queue[0]);
}
function showSummary() {
  const ok = S.log.filter(x => x.ok).length;
  $('#summary').innerHTML = `<div class="card" style="display:grid;gap:14px">
    <div style="text-align:center"><div class="st-sub">本日の営業結果</div><div class="big">${S.score}</div><div class="st-sub">点 ・ 完璧 ${ok}/${S.total}品</div></div>
    <div class="sum-list">${S.log.map(x => `<div><b style="color:var(--${x.ok ? 'ok' : 'ng'})">${x.ok ? '○' : '×'}</b><span>${esc(x.r.name)}</span><i>+${x.pts}</i></div>`).join('')}</div>
    <div class="modal-btns">
      ${ok < S.total ? `<button class="btn ghost" data-act="practiceMiss">まちがえた品を練習</button>` : ''}
      <button class="btn primary" data-act="rush">もう一度営業</button>
    </div>
    <button class="btn ghost" data-act="home">ホームへ</button></div>`;
  show('summary');
}

/* ---------- メニュー選択 ---------- */
let pickSteps = false;
function renderTabs(el, cur, attr) { el.innerHTML = TABS.map(([k, l]) => `<button data-${attr}="${k}" aria-pressed="${k === cur}">${l}</button>`).join(''); }
function openPick(steps) {
  pickSteps = steps; $('#modal').hidden = true;
  $('#pickTitle').textContent = steps ? '手順ならべ' : '練習するメニュー';
  $('#pickTabs').hidden = steps;
  renderTabs($('#pickTabs'), S.pickTab, 'ptab');
  const list = steps ? R.filter(r => r.steps && r.steps.length > 1) : R.filter(r => tabOf(r) === S.pickTab);
  $('#pickList').innerHTML = list.length ? list.map(r => `<button class="row" data-pick="${esc(r.id)}"><span class="nm">${esc(r.name)}${steps ? `<small>${esc(r.stepsTitle || '手順')}・${r.steps.length}ステップ</small>` : ''}</span>${steps ? '' : lvTag(r.id)}</button>`).join('')
    : `<p class="foot">${steps ? '手順が登録されたメニューはまだありません。「レシピ編集」で手順を追加できます。' : 'このタブにはメニューがありません。'}</p>`;
  show('pick');
}

/* ---------- 手順ならべ ---------- */
const T = { r: null, pool: [], picked: [], checked: false };
function startSteps(r) { T.r = r; T.pool = shuffle(r.steps.map((_, i) => i)); T.picked = []; T.checked = false; renderSteps(); show('steps'); }
function renderSteps() {
  const r = T.r;
  const slots = r.steps.map((_, i) => {
    const p = T.picked[i];
    if (p === undefined) return `<div class="slot"></div>`;
    const cls = T.checked ? (r.steps[p] === r.steps[i] ? 'good' : 'bad') : '';
    return `<button class="slot filled ${cls}" data-unpick="${i}" ${T.checked ? 'disabled' : ''}><span>${esc(r.steps[p])}${T.checked && r.steps[p] !== r.steps[i] ? `<span class="fix">正しくは:${esc(r.steps[i])}</span>` : ''}</span></button>`;
  }).join('');
  const pool = T.pool.filter(i => !T.picked.includes(i)).map(i => `<button class="pcard" data-put="${i}">${esc(r.steps[i])}</button>`).join('');
  const all = T.picked.length === r.steps.length;
  const okN = T.picked.filter((p, i) => r.steps[p] === r.steps[i]).length;
  $('#stWrap').innerHTML = `<div><h3 class="st-title">${esc(r.name)}</h3><p class="st-sub">${esc(r.stepsTitle || '手順')}。下のカードを正しい順番にタップしてください。</p></div>
    <div class="slots">${slots}</div>
    ${T.checked ? `<div class="note"><b>${okN}/${r.steps.length}</b> 正解です。${r.note ? esc(r.note) : ''}</div><div class="modal-btns"><button class="btn ghost" data-act="pickSteps">一覧へ</button><button class="btn primary" data-act="stepsRetry">もう一度</button></div>`
      : all ? `<button class="btn primary" data-act="stepsCheck">答え合わせ</button>` : `<div class="pool">${pool}</div>`}`;
}

/* ---------- レシピ帳 ---------- */
let bookTab = 'hot';
function renderBook() {
  renderTabs($('#bookTabs'), bookTab, 'btab');
  const q = $('#bookSearch').value.trim();
  const list = R.filter(r => q ? (r.name.includes(q) || Object.keys(r.items).some(k => ingName(k).includes(q))) : tabOf(r) === bookTab);
  $('#bookTabs').style.opacity = q ? '.4' : '1';
  $('#bookList').innerHTML = list.length ? list.map(r => `<div class="bcard"><div class="bhead">${badge(r)}<b>${esc(r.name)}</b>${lvTag(r.id)}</div>
    <ul class="ings">${r.vessel ? `<li><span>器</span><i>${esc(r.vessel)}</i></li>` : ''}${Object.entries(r.items).map(([k, v]) => `<li><span>${esc(ingName(k))}</span><i>${esc(amtTxt(k, v)) || '○'}</i></li>`).join('')}</ul>
    ${r.steps && r.steps.length ? `<div class="st-sub" style="font-weight:800">${esc(r.stepsTitle || '手順')}</div><ol>${r.steps.map(s => `<li>${esc(s)}</li>`).join('')}</ol>` : ''}
    ${r.note ? `<p class="bnote">${esc(r.note)}</p>` : ''}</div>`).join('') : `<p class="foot">${q ? `「${esc(q)}」に当てはまるメニューはありません。` : 'このタブにはメニューがありません。'}</p>`;
}

/* ---------- ホーム ---------- */
function renderHome() {
  const nd = R.filter(r => r.cat === 'drink').length, nf = R.filter(r => r.cat === 'food').length;
  $('#heroCount').textContent = `注文票どおりに材料を入れて、分量を手で覚えるゲームです。ドリンク${nd}品・フード${nf}品を収録しています。`;
  const rows = TABS.map(([k, l]) => { const list = R.filter(r => tabOf(r) === k); const n = list.filter(r => level(r.id) === 2).length; return `<div class="prog-row"><span>${l}</span><div class="bar"><i style="width:${list.length ? n / list.length * 100 : 0}%"></i></div><b>${n}/${list.length}</b></div>`; }).join('');
  const all = R.filter(r => level(r.id) === 2).length;
  $('#progCard').innerHTML = `<div style="display:flex;justify-content:space-between;align-items:baseline"><b style="font-size:16px">覚えたメニュー</b><span style="font-family:var(--f-dig);font-size:20px">${all}/${R.length}</span></div>${rows}`;
  document.querySelectorAll('#rushCat button').forEach(b => b.setAttribute('aria-pressed', b.dataset.cat === S.rushCat));
  $('#baseBanner').innerHTML = BASE_CHANGED ? `<div class="banner"><div><b>新しいレシピデータがあります。</b><br>このブラウザには、以前に「レシピ編集」で変えた内容が残っているため、そちらを表示しています。</div>
    <div class="modal-btns"><button class="btn primary" data-act="useBase">新しいデータに切り替える</button><button class="btn ghost" data-act="keepLocal">今の内容を使い続ける</button></div></div>` : '';
  show('home');
}

/* =========================================================
   レシピ編集
   ========================================================= */
let admTab = 'recipes', admRecipeTab = 'hot', admIngCat = 'drink';
function openAdmin(tab) {
  if (tab) admTab = tab;
  document.querySelectorAll('#admTabs button').forEach(b => b.setAttribute('aria-pressed', b.dataset.atab === admTab));
  ({ recipes: admRecipes, ings: admIngs, vessels: admVessels, data: admData })[admTab]();
  show('admin');
}
function usedBy(k) { return R.filter(r => k in r.items); }

/* --- レシピ一覧 --- */
function admRecipes() {
  const list = R.filter(r => tabOf(r) === admRecipeTab);
  $('#admBody').innerHTML = `<div class="adm-tools"><button class="btn primary" data-act="newRecipe">＋ 新しいレシピ</button></div>
    <div class="tabs" id="admRTabs">${TABS.map(([k, l]) => `<button data-artab="${k}" aria-pressed="${k === admRecipeTab}">${l}</button>`).join('')}</div>
    ${list.length ? list.map(r => `<button class="row" data-edit-recipe="${esc(r.id)}"><span class="nm">${esc(r.name)}<small>${esc(recipeLine(r))}</small></span><span class="lv lv0">編集</span></button>`).join('') : `<p class="foot">このタブにはまだメニューがありません。</p>`}`;
}
/* --- 材料一覧 --- */
function admIngs() {
  const groups = shelfGroups(admIngCat);
  $('#admBody').innerHTML = `<div class="adm-tools"><button class="btn primary" data-act="newIng">＋ 新しい材料</button></div>
    <div class="tabs">${CATS.map(([k, l]) => `<button data-aicat="${k}" aria-pressed="${k === admIngCat}">${l}の棚</button>`).join('')}</div>
    ${groups.map(([h, ks]) => `<div class="group-h">${esc(h)}</div>${ks.map(k => { const g = ING[k], n = usedBy(k).length; return `<button class="row" data-edit-ing="${esc(k)}"><span class="ico">${icoOf(g)}</span><span class="nm">${esc(g.name)}<small>1タップ ${fx(g.step)}${esc(g.unit)}${g.once ? '・量らず入れる' : ''}・${n}品で使用</small></span><span class="lv lv0">編集</span></button>`; }).join('')}`).join('')}`;
}
/* --- 器 --- */
let VW = [];
function admVessels() {
  VW = VESSELS.map(v => ({ name: v.name, shape: v.shape, orig: v.name }));
  renderVesselForm();
}
function renderVesselForm(err) {
  $('#admBody').innerHTML = `<p class="bnote">器は、レシピで「器」を指定したメニューのときだけ選択肢として出ます。器を指定しないドリンクは、HOTならマグ、ICEなら背の高いグラスで表示されます。</p>
    ${VW.map((v, i) => `<div class="vrow"><input class="in" data-vname="${i}" value="${esc(v.name)}" placeholder="器の名前" aria-label="器の名前"><select class="in" data-vshape="${i}" aria-label="形">${opts(VSHAPES, v.shape)}</select><button type="button" class="del" data-vdel="${i}" aria-label="削除">×</button></div>`).join('')}
    <div class="adm-tools"><button class="btn ghost" data-act="addVessel">＋ 器を追加</button></div>
    <div class="err">${esc(err || '')}</div>
    <button class="btn primary" data-act="saveVessels">器を保存</button>`;
}
function saveVessels() {
  const names = VW.map(v => v.name.trim());
  if (names.some(n => !n)) return renderVesselForm('名前が空の器があります。');
  if (new Set(names).size !== names.length) return renderVesselForm('同じ名前の器が2つあります。');
  for (const v of VESSELS) {
    const still = VW.find(w => w.orig === v.name);
    if (!still) { const u = R.filter(r => r.vessel === v.name); if (u.length) return renderVesselForm(`「${v.name}」は ${u.map(r => r.name).join('、')} で使われているため削除できません。先にレシピの器を変えてください。`); }
  }
  VW.forEach(w => { if (w.orig && w.orig !== w.name.trim()) R.forEach(r => { if (r.vessel === w.orig) r.vessel = w.name.trim(); }); });
  DATA.vessels = VW.map(w => ({ name: w.name.trim(), shape: w.shape }));
  saveData(); toast('器を保存しました'); admVessels();
}
/* --- データ --- */
function admData() {
  const st = DATA_EDITED ? `<span class="dot edited"></span>このブラウザで編集した内容を使っています(最終保存 ${new Date(SAVED_AT).toLocaleString('ja-JP')})` : `<span class="dot"></span>data.js の内容をそのまま使っています`;
  $('#admBody').innerHTML = `<div class="card" style="display:grid;gap:10px">
      <div class="status">${st}</div>
      <p class="bnote">編集した内容は、このブラウザにだけ保存されます。お店のみんなに反映するには、data.js を書き出してサイトのファイルと置き換え、もう一度アップロードしてください。</p>
      <div class="form-btns"><button class="btn primary" data-act="exportDl">data.js をダウンロード</button><button class="btn ghost" data-act="exportCopy">内容をコピー</button></div>
    </div>
    <div class="card" style="display:grid;gap:10px">
      <b>data.js を読み込む</b>
      <p class="bnote">他の人が書き出した data.js(または JSON)を読み込むと、このブラウザの内容が置き換わります。</p>
      <input class="in" type="file" id="importFile" accept=".js,.json,text/javascript,application/json">
      <textarea class="in ta-code" id="importText" placeholder="ここに data.js の中身を貼り付けることもできます"></textarea>
      <div class="err" id="importErr"></div>
      <button class="btn ghost" data-act="importText">貼り付けた内容を読み込む</button>
    </div>
    <div class="card" style="display:grid;gap:10px">
      <b>最初の状態に戻す</b>
      <p class="bnote">このブラウザでの編集をすべて消して、サイトに置いてある data.js の内容に戻します。ゲームの記録は消えません。</p>
      <button class="btn danger" data-act="resetData" ${DATA_EDITED ? '' : 'disabled'}>data.js の内容に戻す</button>
    </div>`;
  $('#importFile').addEventListener('change', e => { const f = e.target.files[0]; if (!f) return; const rd = new FileReader(); rd.onload = () => importData(String(rd.result)); rd.readAsText(f); });
}
function exportText() {
  const d = new Date(), p = n => String(n).padStart(2, '0');
  DATA.version = `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}-${p(d.getHours())}${p(d.getMinutes())}${p(d.getSeconds())}`;
  writeSaved({ baseVersion: BASE.version, savedAt: SAVED_AT || Date.now(), data: DATA });
  return `/*
  喫茶レシピキッチン ゲームデータ
  ・アプリの「レシピ編集」→「データ」→「data.js をダウンロード」で作ったファイルで、このファイルを丸ごと置き換えられます。
  ・手で直す場合は、下の JSON の形を崩さないようにしてください(各項目の説明は README.md にあります)。
  ・内容を変えたら version も変えてください。各ブラウザに「新しいレシピデータがあります」と表示されます。
*/
window.GAME_DATA = ${JSON.stringify(DATA, null, 2)};
`;
}
function exportDl() {
  const blob = new Blob([exportText()], { type: 'text/javascript' });
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'data.js';
  document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
  toast('data.js をダウンロードしました。ダウンロードされない場合は「内容をコピー」を使ってください。');
}
function exportCopy() {
  const txt = exportText();
  navigator.clipboard.writeText(txt).then(() => toast('コピーしました。data.js に貼り付けて保存してください。'), () => {
    const ta = $('#importText'); ta.value = txt; ta.focus(); ta.select(); toast('自動でコピーできませんでした。下の欄の文字を選択してコピーしてください。');
  });
}
function importData(txt) {
  const err = $('#importErr'); err.textContent = '';
  try {
    let src = txt.trim();
    const at = src.indexOf('GAME_DATA');
    const start = src.indexOf('{', at >= 0 ? at : 0), end = src.lastIndexOf('}');
    if (start < 0 || end < start) throw new Error('データの形が読み取れませんでした。');
    const d = JSON.parse(src.slice(start, end + 1));
    if (!d.ingredients || typeof d.ingredients !== 'object' || !Array.isArray(d.recipes)) throw new Error('ingredients(材料)と recipes(レシピ)が見つかりません。');
    for (const r of d.recipes) {
      if (!r.id || !r.name || !r.items) throw new Error('id・name・items がないレシピがあります。');
      for (const k in r.items) if (!d.ingredients[k]) throw new Error(`「${r.name}」の材料「${k}」が材料一覧にありません。`);
    }
    d.vessels = d.vessels || [];
    DATA = d; saveData(); toast(`読み込みました(${d.recipes.length}品)`); admData();
  } catch (e) {
    err.textContent = '読み込めませんでした:' + (e.message || e);
  }
}

/* --- レシピの編集フォーム --- */
let ER = null;
function itemsToRows(items) { return Object.entries(items).map(([k, v]) => v === null ? { k, mode: 'once', a: '', b: '' } : Array.isArray(v) ? { k, mode: 'range', a: v[0], b: v[1] } : { k, mode: 'amt', a: v, b: '' }); }
function openRecipeEditor(r, isCopy) {
  const base = r ? clone(r) : { id: '', name: '', cat: admRecipeTab === 'food' ? 'food' : 'drink', look: admRecipeTab === 'hot' ? 'hot' : admRecipeTab === 'food' ? 'food' : 'ice', items: {} };
  ER = { origId: r && !isCopy ? r.id : null, r: base, rows: itemsToRows(base.items) };
  if (isCopy) { ER.r.name += '(コピー)'; }
  if (!ER.rows.length) ER.rows.push({ k: '', mode: 'amt', a: '', b: '' });
  $('#erTitle').textContent = ER.origId ? 'レシピを編集' : '新しいレシピ';
  renderRecipeForm(); show('editRecipe');
}
function ingSelect(cat, cur, i) {
  return `<select class="in" data-rk="${i}" aria-label="材料"><option value="">材料を選ぶ</option>${shelfGroups(cat).map(([h, ks]) => `<optgroup label="${esc(h)}">${ks.map(k => `<option value="${esc(k)}"${k === cur ? ' selected' : ''}>${esc(ING[k].name)}</option>`).join('')}</optgroup>`).join('')}</select>`;
}
function rowHTML(row, i) {
  const u = row.k && ING[row.k] ? esc(ING[row.k].unit) : '';
  const amts = row.mode === 'amt' ? `<span>分量</span><input class="in" type="number" step="any" min="0" inputmode="decimal" data-ra="${i}" value="${esc(row.a)}"><span>${u}</span>`
    : row.mode === 'range' ? `<input class="in" type="number" step="any" min="0" inputmode="decimal" data-ra="${i}" value="${esc(row.a)}"><span>〜</span><input class="in" type="number" step="any" min="0" inputmode="decimal" data-rb="${i}" value="${esc(row.b)}"><span>${u}</span>`
      : `<span>入っていれば正解(量は問わない)</span>`;
  return `<div class="irow">${ingSelect(ER.r.cat, row.k, i)}<select class="in" data-rm="${i}" aria-label="判定のしかた">${opts([['amt', '分量'], ['range', '範囲'], ['once', '入れるだけ']], row.mode)}</select><button type="button" class="del" data-rdel="${i}" aria-label="この材料を外す">×</button><div class="amts">${amts}</div></div>`;
}
function renderRows() { $('#erRows').innerHTML = ER.rows.map(rowHTML).join(''); }
function renderRecipeForm() {
  const r = ER.r;
  $('#erForm').innerHTML = `
    <div class="fld"><label for="erName">メニュー名</label><input class="in" id="erName" value="${esc(r.name)}" placeholder="例:キャラメルラテ"></div>
    <div class="two">
      <div class="fld"><label for="erCat">種類</label><select class="in" id="erCat">${opts(CATS, r.cat)}</select></div>
      ${r.cat === 'drink' ? `<div class="fld"><label for="erLook">表示</label><select class="in" id="erLook">${opts(LOOKS, r.look)}</select></div>` : '<div></div>'}
    </div>
    ${r.cat === 'drink' ? `<div class="fld"><label for="erVessel">器</label><select class="in" id="erVessel">${opts([['', '指定しない(自動で表示)']].concat(VESSELS.map(v => [v.name, v.name])), r.vessel || '')}</select><small>器を指定すると、ゲームで器を選ぶ問題が出ます。</small></div>` : ''}
    <div class="fld"><span class="lbl">材料と分量</span><div class="irows" id="erRows"></div>
      <div class="adm-tools"><button type="button" class="btn ghost" data-act="addRow">＋ 材料を追加</button></div>
      <small>棚にない材料は、先に「材料」タブで追加してください。</small></div>
    <div class="fld"><label for="erNote">メモ(結果画面とヒントに表示)</label><textarea class="in" id="erNote" placeholder="例:最後に抹茶粉をふりかける">${esc(r.note || '')}</textarea></div>
    <div class="fld"><label for="erStepsTitle">手順の見出し</label><input class="in" id="erStepsTitle" value="${esc(r.stepsTitle || '')}" placeholder="例:作り方の順番"></div>
    <div class="fld"><label for="erSteps">手順(1行に1つ。2行以上あると「手順ならべ」に出ます)</label><textarea class="in" id="erSteps" style="min-height:120px">${esc((r.steps || []).join('\n'))}</textarea></div>
    <div class="err" id="erErr"></div>
    <div class="form-btns">
      <button type="button" class="btn primary" data-act="saveRecipe">保存</button>
      ${ER.origId ? `<button type="button" class="btn ghost" data-act="copyRecipe">複製</button><button type="button" class="btn danger" data-act="deleteRecipe">削除</button>` : ''}
    </div>`;
  renderRows();
}
function readRecipeForm() {
  const r = ER.r;
  r.name = $('#erName').value; r.note = $('#erNote').value; r.stepsTitle = $('#erStepsTitle').value;
  r.steps = $('#erSteps').value.split('\n').map(s => s.trim()).filter(Boolean);
  if ($('#erLook')) r.look = $('#erLook').value;
  if ($('#erVessel')) r.vessel = $('#erVessel').value;
}
function saveRecipe() {
  readRecipeForm();
  const r = ER.r, err = m => { $('#erErr').textContent = m; $('#erErr').scrollIntoView({ block: 'center', behavior: 'smooth' }); };
  if (!r.name.trim()) return err('メニュー名を入れてください。');
  const rows = ER.rows.filter(x => x.k);
  if (!rows.length) return err('材料を1つ以上選んでください。');
  const keys = rows.map(x => x.k);
  const dup = keys.find((k, i) => keys.indexOf(k) !== i);
  if (dup) return err(`「${ING[dup].name}」が2回選ばれています。1つにまとめてください。`);
  const items = {};
  for (const x of rows) {
    const n = ING[x.k].name, a = parseFloat(x.a), b = parseFloat(x.b);
    if (x.mode === 'once') items[x.k] = null;
    else if (x.mode === 'range') { if (isNaN(a) || isNaN(b) || a < 0 || b <= a) return err(`「${n}」の範囲は、左に小さい数・右に大きい数を入れてください。`); items[x.k] = [a, b]; }
    else { if (isNaN(a) || a <= 0) return err(`「${n}」の分量を入れてください。`); items[x.k] = a; }
  }
  const out = { id: ER.origId || uid('r_'), name: r.name.trim(), cat: r.cat, look: r.cat === 'food' ? 'food' : r.look, items };
  if (r.cat === 'drink' && r.vessel) out.vessel = r.vessel;
  if (r.note && r.note.trim()) out.note = r.note.trim();
  if (r.steps.length) { out.stepsTitle = (r.stepsTitle || '').trim() || '手順'; out.steps = r.steps; }
  // まだ形を決めていない拡張項目は、そのまま引き継ぐ
  const prev = ER.origId ? R.find(x => x.id === ER.origId) : null;
  if (prev) for (const k in prev) if (!['id', 'name', 'cat', 'look', 'items', 'vessel', 'note', 'stepsTitle', 'steps'].includes(k)) out[k] = prev[k];
  if (prev) R.splice(R.indexOf(prev), 1, out); else R.push(out);
  saveData(); admRecipeTab = tabOf(out); toast(`「${out.name}」を保存しました`); openAdmin('recipes');
}
function deleteRecipe(btn) {
  if (!armConfirm(btn, 'もう一度押すと削除')) return;
  const i = R.findIndex(x => x.id === ER.origId); if (i >= 0) { const n = R[i].name; R.splice(i, 1); saveData(); toast(`「${n}」を削除しました`); }
  openAdmin('recipes');
}

/* --- 材料の編集フォーム --- */
let EI = null;
function openIngEditor(k) {
  const g = k ? clone(DATA.ingredients[k]) : { name: '', cat: admIngCat, group: '', kind: KINDS[admIngCat][0][0], vis: VISES[KINDS[admIngCat][0][0]][0][0], icon: 'jar', color: '#f2b84b', unit: '', step: 1 };
  EI = { key: k || null, g };
  $('#eiTitle').textContent = k ? '材料を編集' : '新しい材料';
  renderIngForm(); show('editIng');
}
function renderIngForm() {
  const g = EI.g, groups = [...new Set(Object.values(ING).filter(x => x.cat === g.cat).map(x => x.group))];
  const used = EI.key ? usedBy(EI.key) : [];
  $('#eiForm').innerHTML = `
    <div class="preview-bin"><div id="eiPrev"></div><small class="bnote">棚にはこのように並びます。</small></div>
    <div class="fld"><label for="eiName">材料名</label><input class="in" id="eiName" value="${esc(g.name)}" placeholder="例:キャラメルソース"></div>
    <div class="two">
      <div class="fld"><label for="eiCat">どちらの棚</label><select class="in" id="eiCat" ${used.length ? 'disabled' : ''}>${opts(CATS, g.cat)}</select></div>
      <div class="fld"><label for="eiGroup">棚の分類</label><input class="in" id="eiGroup" list="eiGroups" value="${esc(g.group)}" placeholder="例:シロップ・ソース"><datalist id="eiGroups">${groups.map(x => `<option value="${esc(x)}">`).join('')}</datalist></div>
    </div>
    ${used.length ? '<small class="bnote">レシピで使われているため、棚の種類(ドリンク/フード)は変えられません。</small>' : ''}
    <div class="two">
      <div class="fld"><label for="eiKind">入り方</label><select class="in" id="eiKind">${opts(KINDS[g.cat], g.kind)}</select></div>
      <div class="fld"><label for="eiVis">見た目</label><select class="in" id="eiVis">${opts(VISES[g.kind] || [], g.vis)}</select></div>
    </div>
    <div class="two">
      <div class="fld"><label for="eiUnit">単位</label><input class="in" id="eiUnit" value="${esc(g.unit)}" placeholder="g・ml・枚 など(なしでも可)"></div>
      <div class="fld"><label for="eiStep">1タップで増える量</label><input class="in" id="eiStep" type="number" step="any" min="0" inputmode="decimal" value="${esc(g.step)}"></div>
    </div>
    ${g.kind === 'layer' ? `<div class="fld"><label for="eiThick">重ねたときの厚み(見た目だけ・2〜24)</label><input class="in" id="eiThick" type="number" min="1" max="30" value="${esc(g.thickness ?? 4)}"></div>` : ''}
    <div class="fld"><label for="eiColor">色</label><input class="in color" id="eiColor" type="color" value="${esc(g.color)}"></div>
    <div class="fld"><span class="lbl">アイコン</span><div class="shapes" id="eiShapes">${SHAPES.map(([s, l]) => `<button type="button" data-shape="${s}" aria-pressed="${s === g.icon}" title="${l}" aria-label="${l}">${ico(s, g.color)}</button>`).join('')}</div></div>
    <label class="check"><input type="checkbox" id="eiOnce" ${g.once ? 'checked' : ''}><span>量らずに入れるだけ<small>タップすると1回で入ります(ブレンド・バニラなど)。</small></span></label>
    <label class="check"><input type="checkbox" id="eiNeutral" ${g.neutral ? 'checked' : ''}><span>レシピにないときは判定しない<small>入れても入れなくても間違いになりません(氷など)。</small></span></label>
    ${used.length ? `<small class="bnote">使っているメニュー:${esc(used.map(r => r.name).join('、'))}</small>` : ''}
    <div class="err" id="eiErr"></div>
    <div class="form-btns"><button type="button" class="btn primary" data-act="saveIng">保存</button>${EI.key ? '<button type="button" class="btn danger" data-act="deleteIng">削除</button>' : ''}</div>`;
  renderIngPrev();
}
function readIngForm() {
  const g = EI.g;
  g.name = $('#eiName').value; g.group = $('#eiGroup').value; g.unit = $('#eiUnit').value;
  g.step = parseFloat($('#eiStep').value); g.color = $('#eiColor').value;
  g.once = $('#eiOnce').checked; g.neutral = $('#eiNeutral').checked;
  if ($('#eiThick')) g.thickness = parseFloat($('#eiThick').value);
}
function renderIngPrev() { const g = EI.g; $('#eiPrev').innerHTML = `<div class="bin" style="--c:${esc(g.color)}">${ico(g.icon, g.color)}<span>${esc(g.name || '材料名')}</span></div>`; }
function saveIng() {
  readIngForm();
  const g = EI.g, err = m => { $('#eiErr').textContent = m; $('#eiErr').scrollIntoView({ block: 'center', behavior: 'smooth' }); };
  if (!g.name.trim()) return err('材料名を入れてください。');
  if (isNaN(g.step) || g.step <= 0) return err('「1タップで増える量」に0より大きい数を入れてください。');
  const dupe = Object.entries(DATA.ingredients).find(([k, x]) => k !== EI.key && x.cat === g.cat && x.name === g.name.trim());
  if (dupe) return err(`同じ棚に「${g.name.trim()}」がすでにあります。`);
  const out = { name: g.name.trim(), cat: g.cat, group: g.group.trim() || 'その他', kind: g.kind, vis: g.vis, icon: g.icon, color: g.color, unit: g.unit.trim(), step: rnd(g.step) };
  if (g.kind === 'layer') out.thickness = Math.min(30, Math.max(1, g.thickness || 4));
  if (g.once) out.once = true;
  if (g.neutral) out.neutral = true;
  const key = EI.key || uid('i_');
  DATA.ingredients[key] = out;
  saveData(); admIngCat = out.cat; toast(`「${out.name}」を保存しました`); openAdmin('ings');
}
function deleteIng(btn) {
  const used = usedBy(EI.key);
  if (used.length) { $('#eiErr').textContent = `${used.map(r => r.name).join('、')} で使われているため削除できません。先にレシピから外してください。`; return; }
  if (!armConfirm(btn, 'もう一度押すと削除')) return;
  const n = DATA.ingredients[EI.key].name; delete DATA.ingredients[EI.key]; saveData(); toast(`「${n}」を削除しました`); openAdmin('ings');
}

/* =========================================================
   イベント
   ========================================================= */
document.addEventListener('click', e => {
  const t = e.target.closest('button'); if (!t || t.disabled) return;
  const d = t.dataset, a = d.act;
  // ゲーム
  if (d.ing) { openMeasure(d.ing); return; }
  if (d.vessel) { S.vessel = d.vessel; renderVChoose(); renderVessel(S.added, true); return; }
  if (d.cat) { S.rushCat = d.cat; renderHome(); return; }
  if (d.ptab) { S.pickTab = d.ptab; openPick(false); return; }
  if (d.btab) { bookTab = d.btab; renderBook(); return; }
  if (d.pick) { const r = R.find(x => x.id === d.pick); if (!r) return; if (pickSteps) startSteps(r); else { S.mode = 'practice'; S.queue = []; startOrder(r); } return; }
  if (d.put !== undefined) { T.picked.push(+d.put); renderSteps(); return; }
  if (d.unpick !== undefined) { T.picked.splice(+d.unpick, 1); renderSteps(); return; }
  // 編集
  if (d.atab) { openAdmin(d.atab); return; }
  if (d.artab) { admRecipeTab = d.artab; admRecipes(); return; }
  if (d.aicat) { admIngCat = d.aicat; admIngs(); return; }
  if (d.editRecipe) { openRecipeEditor(R.find(x => x.id === d.editRecipe)); return; }
  if (d.editIng) { openIngEditor(d.editIng); return; }
  if (d.rdel !== undefined) { ER.rows.splice(+d.rdel, 1); if (!ER.rows.length) ER.rows.push({ k: '', mode: 'amt', a: '', b: '' }); renderRows(); return; }
  if (d.vdel !== undefined) { VW.splice(+d.vdel, 1); renderVesselForm(); return; }
  if (d.shape) { EI.g.icon = d.shape; document.querySelectorAll('#eiShapes button').forEach(b => b.setAttribute('aria-pressed', b.dataset.shape === d.shape)); renderIngPrev(); return; }
  switch (a) {
    case 'home': $('#modal').hidden = true; renderHome(); break;
    case 'rush': $('#modal').hidden = true; startRush(); break;
    case 'pick': openPick(false); break;
    case 'pickSteps': openPick(true); break;
    case 'book': renderBook(); show('book'); break;
    case 'next': nextOrder(); break;
    case 'retry': $('#modal').hidden = true; startOrder(S.recipe); break;
    case 'practiceMiss': S.mode = 'practice'; S.queue = S.log.filter(x => !x.ok).map(x => x.r); startOrder(S.queue.shift()); break;
    case 'stepsCheck': T.checked = true; record(T.r.id + '_steps', T.picked.every((p, i) => T.r.steps[p] === T.r.steps[i])); renderSteps(); break;
    case 'stepsRetry': startSteps(T.r); break;
    case 'useBase': clearSaved(); useBase(); applyData(); toast('新しいデータに切り替えました'); renderHome(); break;
    case 'keepLocal': { const sv = readSaved(); if (sv) { sv.baseVersion = BASE.version; writeSaved(sv); } BASE_CHANGED = false; renderHome(); break; }
    case 'admin': openAdmin(); break;
    case 'newRecipe': openRecipeEditor(null); break;
    case 'addRow': ER.rows.push({ k: '', mode: 'amt', a: '', b: '' }); renderRows(); break;
    case 'saveRecipe': saveRecipe(); break;
    case 'copyRecipe': readRecipeForm(); { const c = clone(ER.r); c.items = {}; const rows = clone(ER.rows); openRecipeEditor(c, true); ER.rows = rows; renderRows(); toast('複製しました。保存すると新しいメニューになります'); } break;
    case 'deleteRecipe': deleteRecipe(t); break;
    case 'newIng': openIngEditor(null); break;
    case 'saveIng': saveIng(); break;
    case 'deleteIng': deleteIng(t); break;
    case 'addVessel': VW.push({ name: '', shape: 'rock', orig: null }); renderVesselForm(); break;
    case 'saveVessels': saveVessels(); break;
    case 'exportDl': exportDl(); break;
    case 'exportCopy': exportCopy(); break;
    case 'importText': importData($('#importText').value); break;
    case 'resetData': if (!armConfirm(t, 'もう一度押すと元に戻します')) return; clearSaved(); useBase(); applyData(); toast('data.js の内容に戻しました'); admData(); break;
  }
});

// レシピフォームの入力
$('#erForm').addEventListener('input', e => {
  const t = e.target, d = t.dataset;
  if (d.ra !== undefined) ER.rows[+d.ra].a = t.value;
  if (d.rb !== undefined) ER.rows[+d.rb].b = t.value;
});
$('#erForm').addEventListener('change', e => {
  const t = e.target, d = t.dataset;
  if (d.rk !== undefined) { ER.rows[+d.rk].k = t.value; renderRows(); }
  if (d.rm !== undefined) { ER.rows[+d.rm].mode = t.value; renderRows(); }
  if (t.id === 'erCat') {
    readRecipeForm(); ER.r.cat = t.value; ER.r.look = t.value === 'food' ? 'food' : 'hot';
    ER.rows = ER.rows.filter(x => !x.k || ING[x.k].cat === t.value); if (!ER.rows.length) ER.rows.push({ k: '', mode: 'amt', a: '', b: '' });
    renderRecipeForm();
  }
});
$('#erForm').addEventListener('submit', e => e.preventDefault());
// 材料フォームの入力
$('#eiForm').addEventListener('input', e => {
  if (e.target.id === 'eiName' || e.target.id === 'eiColor') {
    readIngForm(); renderIngPrev();
    if (e.target.id === 'eiColor') document.querySelectorAll('#eiShapes button').forEach(b => b.innerHTML = ico(b.dataset.shape, EI.g.color));
  }
});
$('#eiForm').addEventListener('change', e => {
  const id = e.target.id;
  if (id === 'eiCat') { readIngForm(); EI.g.cat = e.target.value; EI.g.kind = KINDS[EI.g.cat][0][0]; EI.g.vis = VISES[EI.g.kind][0][0]; renderIngForm(); }
  if (id === 'eiKind') { readIngForm(); EI.g.kind = e.target.value; EI.g.vis = VISES[EI.g.kind][0][0]; renderIngForm(); }
  if (id === 'eiVis') EI.g.vis = e.target.value;
});
$('#eiForm').addEventListener('submit', e => e.preventDefault());
// 器フォームの入力
$('#admBody').addEventListener('input', e => { const d = e.target.dataset; if (d.vname !== undefined) VW[+d.vname].name = e.target.value; });
$('#admBody').addEventListener('change', e => { const d = e.target.dataset; if (d.vshape !== undefined) VW[+d.vshape].shape = e.target.value; });

// キッチン操作
$('#serveBtn').onclick = () => serve(false);
$('#resetBtn').onclick = () => { S.added = {}; S.seq = []; renderChips(); renderVessel(S.added); };
$('#hintBtn').onclick = () => { S.hint = !S.hint; renderHint(); };
$('#quitBtn').onclick = () => {
  const b = $('#quitBtn');
  if (S.mode === 'rush' && !armConfirm(b, 'もう一度で終了')) return;
  stopTimer(); closeSheet();
  if (S.mode === 'rush') renderHome(); else openPick(false);
};
$('#bookSearch').addEventListener('input', renderBook);

/* ---------- 起動 ---------- */
if (!BASE || !BASE.recipes) {
  document.body.innerHTML = '<p style="padding:24px;font-family:sans-serif">data.js を読み込めませんでした。index.html と同じ場所に data.js があるか確認してください。</p>';
} else {
  loadData();
  renderHome();
}
