"use strict";

/* =========================================================
   Inglés diario · v3
   Métodos: recuerdo activo, repetición espaciada, práctica
   mezclada, input comprensible, percepción de sonidos y
   producción oral con retroalimentación inmediata.
   ========================================================= */

/* ---------- Utilidades ---------- */
const $ = (s, el = document) => el.querySelector(s);
const view = $("#view");
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const md = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>").replace(/\*(.+?)\*/g, "<i>$1</i>");
const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const pick = (a, n) => shuffle(a).slice(0, n);
const rand = (a) => a[Math.floor(Math.random() * a.length)];

const dateStr = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const today = () => dateStr(new Date());
const addDays = (s, n) => { const [y, m, d] = s.split("-").map(Number); const dt = new Date(y, m - 1, d); dt.setDate(dt.getDate() + n); return dateStr(dt); };

const store = {
  get(k, def) { try { const v = localStorage.getItem("ing:" + k); return v ? JSON.parse(v) : def; } catch { return def; } },
  set(k, v) { try { localStorage.setItem("ing:" + k, JSON.stringify(v)); } catch {} },
};

function toast(msg) {
  const t = $("#toast"); t.textContent = msg; t.classList.add("show");
  clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove("show"), 2000);
}

/* ---------- Comparar respuestas ---------- */
const NUMS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty"];
const norm = (s) => String(s).toLowerCase().replace(/[’`]/g, "'")
  .replace(/\bwon't\b/g, "will not").replace(/\bcan't\b/g, "cannot").replace(/\bcan not\b/g, "cannot")
  .replace(/n't\b/g, " not").replace(/'m\b/g, " am").replace(/'re\b/g, " are")
  .replace(/'ve\b/g, " have").replace(/'ll\b/g, " will").replace(/'d\b/g, " would")
  .replace(/[^a-z0-9'+ ]/g, " ").split(/\s+/).filter(Boolean)
  .map((w) => (/^\d+$/.test(w) && Number(w) <= 20 ? NUMS[Number(w)] : w));
function lcs(a, b) {
  const dp = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));
  for (let i = a.length - 1; i >= 0; i--) for (let j = b.length - 1; j >= 0; j--)
    dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
  const hit = new Set(); let i = 0, j = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) { hit.add(i); i++; j++; } else if (dp[i + 1][j] >= dp[i][j + 1]) i++; else j++;
  }
  return hit;
}
function compare(expected, typed) {
  const a = norm(expected), b = norm(typed), hit = lcs(a, b);
  return { words: a.map((w, k) => ({ w, ok: hit.has(k) })), pct: a.length ? Math.round((hit.size / Math.max(a.length, b.length)) * 100) : 0 };
}
const bestMatch = (typed, answers) => answers.map((a) => ({ a, ...compare(a, typed) })).sort((x, y) => y.pct - x.pct)[0];
const diffHtml = (r) => `<p class="diff">${r.words.map((x) => `<span class="${x.ok ? "hit" : "miss"}">${esc(x.w)}</span>`).join(" ")}</p>`;

/* ---------- Voz y micrófono ---------- */
let voice = null;
function loadVoice() {
  const vs = window.speechSynthesis ? speechSynthesis.getVoices() : [];
  const en = vs.filter((v) => /^en[-_]/i.test(v.lang));
  voice = en.find((v) => /en[-_]US/i.test(v.lang) && /samantha|ava|allison|alex|siri/i.test(v.name))
    || en.find((v) => /en[-_]US/i.test(v.lang)) || en[0] || null;
}
if (window.speechSynthesis) { loadVoice(); speechSynthesis.onvoiceschanged = loadVoice; }
function utter(text, slow) {
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "en-US"; if (voice) u.voice = voice;
  const rate = store.get("rate", 0.9);
  u.rate = slow ? Math.max(0.5, rate - 0.3) : rate;
  return u;
}
function speak(text, slow = false) {
  if (!window.speechSynthesis) { toast("Tu navegador no tiene voz"); return; }
  speechSynthesis.cancel(); speechSynthesis.speak(utter(text, slow));
}
function speakAll(lines) { if (!window.speechSynthesis) return; speechSynthesis.cancel(); lines.forEach((l) => speechSynthesis.speak(utter(l))); }

const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
function listenOnce(onText, onErr) {
  try {
    const r = new SR(); r.lang = "en-US"; r.interimResults = false; r.maxAlternatives = 3;
    r.onresult = (e) => onText(Array.from(e.results[0]).map((a) => a.transcript));
    r.onerror = (e) => onErr(e.error || "error");
    r.start(); return r;
  } catch (e) { onErr("no-disponible"); return null; }
}

/* ---------- Registro del día, racha y nivel ---------- */
const GOALS = { session: 1, story: 1 };
const emptyLog = () => ({ session: 0, story: 0, items: 0, ok: 0, cards: 0, quiz: 0, dict: 0, speak: 0, done: false });
function dayLog(d = today()) { return Object.assign(emptyLog(), store.get("days", {})[d] || {}); }
function bump(kind, n = 1) {
  const days = store.get("days", {}); const d = today();
  const log = Object.assign(emptyLog(), days[d] || {});
  log[kind] = (log[kind] || 0) + n;
  const was = log.done;
  log.done = Object.keys(GOALS).every((k) => log[k] >= GOALS[k]);
  days[d] = log; store.set("days", days);
  if (log.done && !was) setTimeout(() => toast("¡Reto del día completo! 🔥"), 500);
  renderStreak();
}
function streak() {
  const days = store.get("days", {}); let d = today(), n = 0;
  if (!days[d] || !days[d].done) d = addDays(d, -1);
  while (days[d] && days[d].done) { n++; d = addDays(d, -1); }
  return n;
}
function renderStreak() { $("#streak").textContent = "🔥 " + streak(); }

const LEVEL_START = { A1: 1, A2: 7, B1: 12 };
function profile() { return Object.assign({ level: "A1", diag: "15/40 (A1 en proceso)", unit: 1 }, store.get("profile", {})); }
function setProfile(p) { store.set("profile", Object.assign(profile(), p)); }
const curUnit = () => Math.min(UNITS.length, profile().unit);

/* ---------- Repetición espaciada de oraciones ---------- */
const STEPS = [0, 1, 2, 4, 7, 14, 30];
const sstate = () => store.get("sent", {});
function stateOf(id) { return sstate()[id] || null; }
function gradeSentence(id, ok) {
  const all = sstate(); const s = all[id] || { lvl: 0, due: today(), ok: 0, wrong: 0 };
  if (ok) { s.lvl = Math.min(STEPS.length - 1, s.lvl + 1); s.ok++; s.due = addDays(today(), STEPS[s.lvl]); }
  else { s.lvl = Math.max(0, s.lvl - 1); s.wrong++; s.due = today(); s.lastWrong = today(); }
  all[id] = s; store.set("sent", all);
}
function unitMastery(uid) {
  const list = SENTENCES.filter((s) => s.unit === uid); const st = sstate();
  return Math.round((list.filter((s) => (st[s.id] || {}).lvl >= 2).length / list.length) * 100);
}
function maybeAdvance() {
  const u = curUnit();
  if (u < UNITS.length && unitMastery(u) >= 80) {
    setProfile({ unit: u + 1 });
    setTimeout(() => toast(`¡Desbloqueaste la unidad ${u + 1}! 🎉`), 900);
  }
}

/* ---------- Tarjetas (sistema de cajas) ---------- */
const INTERVALS = [0, 1, 3, 7, 14, 30, 60];
const NEW_PER_DAY = 10;
const srsAll = () => store.get("srs", {});
function dueCards(k) { const s = srsAll(), t = today(); return DECKS[k].cards.filter((c) => s[c.id] && s[c.id].due <= t); }
function newCards(k) {
  const s = srsAll(); const used = store.get("newCount", {})[today() + ":" + k] || 0;
  return DECKS[k].cards.filter((c) => !s[c.id]).slice(0, Math.max(0, NEW_PER_DAY - used));
}
function gradeCard(card, g) {
  const srs = srsAll(); const isNew = !srs[card.id];
  const s = srs[card.id] || { box: 0, due: today() };
  s.box = g === 0 ? 0 : Math.min(INTERVALS.length - 1, s.box + g);
  s.due = addDays(today(), g === 0 ? 0 : INTERVALS[s.box]);
  srs[card.id] = s; store.set("srs", srs);
  if (isNew) { const nc = store.get("newCount", {}); const k = today() + ":" + card.deck; nc[k] = (nc[k] || 0) + 1; store.set("newCount", nc); }
}

/* ---------- Router ---------- */
const routes = {};
let cleanup = null;
const go = (h) => { location.hash = h; };
function setTitle(t, back) { $("#title").textContent = t; $("#back").hidden = !back; }
const TAB = { home: "home", ruta: "ruta", unidad: "ruta", practicar: "practicar", sesion: "practicar", historias: "practicar", historia: "practicar", sonidos: "practicar", errores: "practicar", tarjetas: "practicar", estudiar: "practicar", quiz: "practicar", dictado: "practicar", repite: "practicar", contrarreloj: "practicar", hablar: "practicar", consulta: "consulta", progreso: "progreso", metodo: "home", reporte: "progreso" };
function render() {
  if (cleanup) { cleanup(); cleanup = null; }
  if (window.speechSynthesis) speechSynthesis.cancel();
  const parts = (location.hash.replace(/^#\/?/, "") || "").split("/");
  const name = parts[0] || "home";
  document.querySelectorAll(".tabs a").forEach((a) => a.classList.toggle("active", a.dataset.tab === TAB[name]));
  window.scrollTo(0, 0);
  (routes[name] || routes.home)(...parts.slice(1));
  renderStreak();
}
window.addEventListener("hashchange", render);
$("#back").addEventListener("click", () => (history.length > 1 ? history.back() : go("#/")));

/* ---------- Inicio ---------- */
routes.home = () => {
  setTitle("Inglés diario", false);
  const log = dayLog(), p = profile(), u = UNITS[curUnit() - 1];
  const tasks = [
    ["session", "Sesión del día", "20 ejercicios mezclados · 12 min", "#/sesion"],
    ["story", "Una historia corta", "Escucha, lee y responde · 5 min", "#/historias"],
  ];
  const doneN = tasks.filter(([k]) => log[k] >= GOALS[k]).length;
  const errors = Object.values(sstate()).filter((s) => s.wrong > 0 && s.lvl < 3).length;
  view.innerHTML = `
    <div class="card hero">
      <div class="muted small">Reto de hoy</div>
      <h2 style="margin:4px 0 10px">${log.done ? "¡Completado! Mañana sigue 💪" : `${doneN} de ${tasks.length} listos`}</h2>
      <div class="progress"><span style="width:${(doneN / tasks.length) * 100}%"></span></div>
      <div style="margin-top:10px">${tasks.map(([k, t, d, h]) => `
        <a class="task ${log[k] >= GOALS[k] ? "ok" : ""}" href="${h}"><span class="check">${log[k] >= GOALS[k] ? "✓" : ""}</span>
        <span class="grow"><b>${t}</b><br><span class="muted small">${d}</span></span><span>›</span></a>`).join("")}</div>
    </div>
    <a class="card row-card" href="#/unidad/${u.id}">
      <div class="muted small">Estás en la unidad ${u.id} de ${UNITS.length} · ${u.level}</div>
      <div class="t big-t">${esc(u.title)}</div>
      <div class="progress" style="margin-top:10px"><span style="width:${unitMastery(u.id)}%"></span></div>
      <div class="muted small" style="margin-top:6px">${unitMastery(u.id)}% dominado · al llegar a 80% se abre la siguiente</div>
    </a>
    <div class="stats">
      <div class="stat"><b>${streak()}</b><span>días seguidos</span></div>
      <div class="stat"><b>${p.level}</b><span>nivel de inicio · diagnóstico ${esc(p.diag.split(" ")[0])}</span></div>
    </div>
    <h3>Extra si te sobra tiempo</h3>
    <div class="list">
      ${errors ? `<a class="row" href="#/errores"><span class="emoji">🎯</span><span class="grow"><span class="t">Repasar mis errores</span><div class="d">${errors} oraciones que fallaste</div></span></a>` : ""}
      <a class="row" href="#/sonidos"><span class="emoji">👂</span><span class="grow"><span class="t">Sonidos difíciles</span><div class="d">Entrena el oído: ship o sheep</div></span></a>
      <a class="row" href="#/contrarreloj"><span class="emoji">⏱️</span><span class="grow"><span class="t">Contrarreloj de verbos</span><div class="d">60 segundos de irregulares</div></span></a>
      <a class="row" href="#/metodo"><span class="emoji">🧠</span><span class="grow"><span class="t">¿Por qué funciona este método?</span><div class="d">Lo que hace distinta a esta app</div></span></a>
    </div>`;
};

/* ---------- Método ---------- */
routes.metodo = () => {
  setTitle("El método", true);
  const items = [
    ["✍️", "Recuerdo activo", "Escribes y dices las respuestas en vez de solo leerlas. Sacar algo de tu memoria lo fija mucho más que releerlo."],
    ["📅", "Repetición espaciada", "Cada oración vuelve justo cuando estás por olvidarla: mañana, en 2 días, en 4, en una semana..."],
    ["🔀", "Práctica mezclada", "La sesión combina temas y tipos de ejercicio. Te obliga a elegir qué usar, como en una conversación real."],
    ["📖", "Input comprensible", "Historias cortas de tu nivel, sobre programación, juegos y la universidad. Entender mucho inglés es lo que más te hace avanzar."],
    ["👂", "Entrenar el oído", "Los pares mínimos (ship/sheep) te enseñan a distinguir sonidos que en español no existen."],
    ["🗣️", "Hablar desde el día uno", "Repites frases completas y el micrófono te dice si se entendió."],
    ["🎯", "Tus errores regresan", "Lo que fallas aparece más seguido hasta que lo dominas. No repasas lo que ya sabes."],
    ["📈", "Ruta por tu nivel", "Empiezas en A1 por tu diagnóstico y la siguiente unidad se abre cuando dominas el 80% de la actual."],
  ];
  view.innerHTML = `<p class="sub">No es leer reglas y repetir: es practicar como vas a usar el idioma.</p>
    <div class="list">${items.map(([e, t, d]) => `<div class="row"><span class="emoji">${e}</span><span class="grow"><span class="t">${t}</span><div class="d">${d}</div></span></div>`).join("")}</div>`;
};

/* ---------- Ruta ---------- */
routes.ruta = () => {
  setTitle("Mi ruta", false);
  const cu = curUnit();
  view.innerHTML = `<p class="sub">12 unidades de A1 a B1. Puedes entrar a cualquiera, pero tu sesión diaria se enfoca en la marcada.</p>
    <div class="list">${UNITS.map((u) => {
      const m = unitMastery(u.id);
      return `<a class="row ${u.id === cu ? "current" : ""}" href="#/unidad/${u.id}">
        <span class="unum ${m >= 80 ? "done" : ""}">${m >= 80 ? "✓" : u.id}</span>
        <span class="grow"><span class="t">${esc(u.title)}</span><div class="d">${u.level}${u.id === cu ? " · estás aquí" : ""}</div>
        <div class="progress thin"><span style="width:${m}%"></span></div></span></a>`;
    }).join("")}</div>`;
};
routes.unidad = (id) => {
  const u = UNITS.find((x) => x.id === Number(id)) || UNITS[0];
  setTitle(`Unidad ${u.id}`, true);
  const sents = SENTENCES.filter((s) => s.unit === u.id);
  view.innerHTML = `
    <div class="card"><div class="muted small">${u.level} · ${unitMastery(u.id)}% dominado</div><h2>${esc(u.title)}</h2>
      <ul class="idea">${u.idea.map((l) => `<li>${md(l)}</li>`).join("")}</ul></div>
    <button class="btn" id="practice">Practicar esta unidad (12 ejercicios)</button>
    ${u.id !== curUnit() ? `<button class="btn ghost" id="setcur">Hacer esta mi unidad actual</button>` : ""}
    <h3>Oraciones de la unidad <span class="muted small">(toca para escuchar)</span></h3>
    <div class="list">${sents.map((s) => `<button class="row say" data-t="${esc(s.en)}"><span class="emoji">🔊</span><span class="grow"><span class="t">${esc(s.en)}</span><div class="d">${esc(s.es)}</div></span></button>`).join("")}</div>`;
  view.querySelectorAll(".say").forEach((b) => (b.onclick = () => speak(b.dataset.t)));
  $("#practice").onclick = () => runSession(buildUnitSession(u.id), `Unidad ${u.id}`, false);
  const sc = $("#setcur"); if (sc) sc.onclick = () => { setProfile({ unit: u.id }); toast("Listo, es tu unidad actual"); render(); };
};

/* ---------- Constructores de sesión ---------- */
function typeFor(lvl, easy) {
  if (easy) return rand(["listen", "tiles"]);
  return rand([["listen", "tiles"], ["tiles", "cloze"], ["cloze", "dictation"], ["translate", "dictation"], ["translate", "speak", "cloze"]][Math.min(lvl, 4)]);
}
const itemFor = (s) => ({ kind: "sentence", s, type: typeFor((stateOf(s.id) || { lvl: 0 }).lvl) });
const pairItem = () => ({ kind: "pair", pair: rand(PAIRS) });
function buildDaily() {
  const cu = curUnit(), st = sstate(), t = today();
  const pool = SENTENCES.filter((s) => s.unit <= cu);
  const due = pool.filter((s) => st[s.id] && st[s.id].due <= t).sort((a, b) => st[a.id].due.localeCompare(st[b.id].due)).slice(0, 8);
  const fresh = SENTENCES.filter((s) => s.unit === cu && !st[s.id]).slice(0, 6);
  const chosen = new Set([...due, ...fresh].map((s) => s.id));
  const fill = shuffle(pool.filter((s) => !chosen.has(s.id))).sort((a, b) => ((st[a.id] || {}).lvl || 0) - ((st[b.id] || {}).lvl || 0));
  const list = [...due, ...fresh, ...fill].slice(0, 17);
  const items = shuffle(list.map(itemFor));
  items.splice(3, 0, pairItem()); items.splice(9, 0, pairItem());
  const sp = list.find((s) => (st[s.id] || {}).lvl >= 1) || list[0];
  if (sp) items.push({ kind: "sentence", s: sp, type: "speak" });
  return items.slice(0, 20);
}
function buildUnitSession(uid) {
  const items = shuffle(SENTENCES.filter((s) => s.unit === uid)).map(itemFor);
  items.splice(4, 0, pairItem());
  return items.slice(0, 12);
}
function buildErrors() {
  const st = sstate();
  const list = SENTENCES.filter((s) => st[s.id] && st[s.id].wrong > 0 && st[s.id].lvl < 3)
    .sort((a, b) => st[b.id].wrong - st[a.id].wrong).slice(0, 12);
  return list.map((s) => ({ kind: "sentence", s, type: rand(["tiles", "cloze", "translate", "dictation"]) }));
}

/* ---------- Motor de ejercicios ---------- */
const TYPE_NAME = { listen: "Escucha y elige", tiles: "Ordena la oración", cloze: "Completa escribiendo", translate: "Dilo en inglés (escribe)", dictation: "Dictado", speak: "Dilo en voz alta", pair: "¿Qué palabra oíste?" };
function runSession(items, title, daily) {
  setTitle(title, true);
  if (!items.length) {
    view.innerHTML = `<div class="card center"><div class="big">✓</div><h2>Nada pendiente</h2><p class="sub">No hay ejercicios aquí por ahora.</p><a class="btn" href="#/">Inicio</a></div>`;
    return;
  }
  const queue = items.slice(); const total = items.length; let done = 0, ok = 0; const retried = new Set();
  const next = () => {
    if (!queue.length) return finish();
    const it = queue.shift();
    renderItem(it, done, total, (correct) => {
      done++; if (correct) ok++;
      if (it.kind === "sentence") gradeSentence(it.s.id, correct);
      if (!correct && it.kind === "sentence" && !retried.has(it.s.id)) {
        retried.add(it.s.id);
        queue.splice(Math.min(3, queue.length), 0, { kind: "sentence", s: it.s, type: typeFor(0, true), retry: true });
      }
      next();
    });
  };
  const finish = () => {
    const pct = Math.round((ok / Math.max(1, done)) * 100);
    if (daily) bump("session");
    const days = store.get("days", {}); const d = today(); const log = Object.assign(emptyLog(), days[d] || {});
    log.items += done; log.ok += ok; days[d] = log; store.set("days", days);
    maybeAdvance();
    view.innerHTML = `<div class="card center"><div class="big">${pct}%</div>
      <h2>${pct >= 85 ? "¡Excelente sesión!" : pct >= 65 ? "¡Bien hecho!" : "Buen esfuerzo: lo que fallaste regresará pronto"}</h2>
      <p class="sub">${ok} de ${done} correctas. Los errores ya se guardaron para repasarlos.</p>
      <div class="btns">${daily && dayLog().story < 1 ? `<a class="btn" href="#/historias">Sigue: una historia</a>` : `<a class="btn" href="#/">Inicio</a>`}
      <a class="btn secondary" href="#/errores">Mis errores</a></div></div>`;
  };
  next();
}

function renderItem(it, done, total, cb) {
  const head = (extra = "") => `
    <div class="counter"><span>${done + 1} de ${total}${it.retry ? " · otra vez" : ""}</span><span>${TYPE_NAME[it.kind === "pair" ? "pair" : it.type]}</span></div>
    <div class="progress" style="margin-bottom:16px"><span style="width:${(done / total) * 100}%"></span></div>${extra}`;
  let answered = false;
  const feedback = (correct, html) => {
    if (answered) return; answered = true;
    if (window.speechSynthesis && it.kind === "sentence") speak(it.s.en);
    const fb = document.createElement("div");
    fb.innerHTML = `<div class="feedback ${correct ? "ok" : "no"}"><b>${correct ? rand(["¡Correcto!", "¡Eso!", "¡Muy bien!", "¡Perfecto!"]) : "Casi."}</b> ${html || ""}</div>
      <button class="btn" id="nx">Continuar</button>`;
    view.appendChild(fb); $("#nx").onclick = () => cb(correct); $("#nx").scrollIntoView({ behavior: "smooth", block: "end" });
  };
  const sol = (s) => `<div class="sol"><b>${esc(s.en)}</b><br><span class="muted">${esc(s.es)}</span></div>`;

  if (it.kind === "pair") {
    const [w1, w2, e1, e2] = it.pair; const target = Math.random() < 0.5 ? w1 : w2;
    view.innerHTML = head() + `<div class="card center"><p class="sub">Escucha con atención. Son casi iguales.</p>
      <div class="btns"><button class="btn" id="pl">🔊 Escuchar</button><button class="btn secondary" id="sl">🐢 Lento</button></div></div>
      <div id="op">${shuffle([[w1, e1], [w2, e2]]).map(([w, e]) => `<button class="opt" data-w="${w}"><b>${w}</b> <span class="muted">· ${e}</span></button>`).join("")}</div>`;
    $("#pl").onclick = () => speak(target); $("#sl").onclick = () => speak(target, true);
    setTimeout(() => speak(target), 350);
    $("#op").onclick = (e) => {
      const b = e.target.closest(".opt"); if (!b || answered) return;
      const correct = b.dataset.w === target;
      view.querySelectorAll(".opt").forEach((o) => o.dataset.w === target && o.classList.add("right"));
      if (!correct) b.classList.add("wrong");
      feedback(correct, `Era <b>${target}</b>. Escucha las dos: <button class="speak inline" id="b1">${w1}</button> <button class="speak inline" id="b2">${w2}</button>`);
      $("#b1").onclick = () => speak(w1); $("#b2").onclick = () => speak(w2);
    };
    return;
  }

  const s = it.s;
  if (it.type === "listen") {
    const others = shuffle(SENTENCES.filter((x) => x.id !== s.id && Math.abs(x.unit - s.unit) <= 1)).slice(0, 2);
    const opts = shuffle([s, ...others]);
    view.innerHTML = head() + `<div class="card center"><p class="sub">¿Qué significa lo que oyes?</p>
      <div class="btns"><button class="btn" id="pl">🔊 Escuchar</button><button class="btn secondary" id="sl">🐢 Lento</button></div></div>
      <div id="op">${opts.map((o) => `<button class="opt" data-id="${o.id}">${esc(o.es)}</button>`).join("")}</div>`;
    $("#pl").onclick = () => speak(s.en); $("#sl").onclick = () => speak(s.en, true);
    setTimeout(() => speak(s.en), 350);
    $("#op").onclick = (e) => {
      const b = e.target.closest(".opt"); if (!b || answered) return;
      const correct = b.dataset.id === s.id;
      view.querySelectorAll(".opt").forEach((o) => o.dataset.id === s.id && o.classList.add("right"));
      if (!correct) b.classList.add("wrong");
      feedback(correct, sol(s));
    };
  } else if (it.type === "tiles") {
    const words = s.en.replace(/[.,!?¿¡]/g, "").split(/\s+/);
    const distract = rand(SENTENCES.filter((x) => x.unit === s.unit && x.id !== s.id)).en.replace(/[.,!?]/g, "").split(/\s+/).find((w) => !words.map((x) => x.toLowerCase()).includes(w.toLowerCase()));
    const tiles = shuffle([...words, ...(distract ? [distract] : [])]).map((w, i) => ({ w, i }));
    let built = [];
    view.innerHTML = head() + `<div class="q">${esc(s.es)}</div>
      <div class="built" id="bt"><span class="muted small">Toca las palabras en orden</span></div>
      <div class="tiles" id="tl"></div><div class="btns"><button class="btn good" id="ck">Revisar</button></div>`;
    const draw = () => {
      $("#bt").innerHTML = built.length ? built.map((t) => `<button class="tile on" data-i="${t.i}">${esc(t.w)}</button>`).join("") : `<span class="muted small">Toca las palabras en orden</span>`;
      $("#tl").innerHTML = tiles.map((t) => `<button class="tile" data-i="${t.i}" ${built.includes(t) ? "disabled" : ""}>${esc(t.w)}</button>`).join("");
    };
    draw();
    $("#tl").onclick = (e) => { const b = e.target.closest(".tile"); if (!b || answered) return; built.push(tiles.find((t) => t.i === Number(b.dataset.i))); draw(); };
    $("#bt").onclick = (e) => { const b = e.target.closest(".tile"); if (!b || answered) return; built = built.filter((t) => t.i !== Number(b.dataset.i)); draw(); };
    $("#ck").onclick = () => {
      if (answered) return;
      const typed = built.map((t) => t.w).join(" ");
      const correct = norm(typed).join(" ") === norm(s.en).join(" ");
      $("#ck").disabled = true;
      feedback(correct, correct ? sol(s) : `La oración es:${sol(s)}`);
    };
  } else if (it.type === "cloze" || it.type === "translate" || it.type === "dictation") {
    const prompt = it.type === "cloze" ? `<div class="q">${esc(s.cloze)}</div><p class="muted">${esc(s.es)}</p>`
      : it.type === "translate" ? `<div class="q">${esc(s.es)}</div><button class="speak" id="hint">💡 Pista</button><p class="muted small" id="hn"></p>`
      : `<div class="card center"><p class="sub">Escribe exactamente lo que oyes.</p><div class="btns"><button class="btn" id="pl">🔊 Escuchar</button><button class="btn secondary" id="sl">🐢 Lento</button></div></div>`;
    view.innerHTML = head() + prompt + `<input type="text" id="an" placeholder="${it.type === "cloze" ? "Escribe la palabra que falta" : "Escribe en inglés..."}" autocomplete="off" autocapitalize="off" spellcheck="false">
      <div class="btns"><button class="btn good" id="ck">Revisar</button><button class="btn secondary" id="idk">No sé</button></div>`;
    if (it.type === "dictation") { $("#pl").onclick = () => speak(s.en); $("#sl").onclick = () => speak(s.en, true); setTimeout(() => speak(s.en), 350); }
    if (it.type === "translate") $("#hint").onclick = () => { const w = s.en.split(" "); $("#hn").textContent = `Empieza con «${w[0]}» y tiene ${w.length} palabras.`; };
    const check = (giveUp) => {
      if (answered) return;
      const val = giveUp ? "" : $("#an").value;
      let correct, html;
      if (it.type === "cloze") {
        correct = norm(val).join(" ") === norm(s.target).join(" ") && norm(val).length > 0;
        html = `Falta: <b>${esc(s.target)}</b>${sol(s)}`;
      } else if (it.type === "translate") {
        const r = bestMatch(val, [s.en, ...s.alts]); correct = r.pct >= 85;
        html = (correct && r.pct < 100 ? `Casi perfecto. ` : "") + (val ? diffHtml(compare(s.en, val)) : "") + sol(s);
      } else {
        const r = compare(s.en, val); correct = r.pct >= 85;
        html = (val ? diffHtml(r) : "") + sol(s);
        if (correct) bump("dict");
      }
      $("#ck").disabled = true; $("#idk").disabled = true; feedback(correct, html);
    };
    $("#ck").onclick = () => check(false); $("#idk").onclick = () => check(true);
    $("#an").addEventListener("keydown", (e) => { if (e.key === "Enter") check(false); });
    if (it.type !== "dictation") setTimeout(() => $("#an") && $("#an").focus(), 200);
  } else if (it.type === "speak") {
    view.innerHTML = head() + `<div class="card center"><div class="q" style="margin-top:0">${esc(s.en)}</div><p class="muted">${esc(s.es)}</p>
      <div class="btns"><button class="btn secondary" id="pl">🔊 Escuchar</button><button class="btn secondary" id="sl">🐢 Lento</button></div></div>
      <p class="sub center">Escúchala y dila en voz alta, imitando el ritmo.</p>
      <div class="btns">${SR ? `<button class="btn" id="mic">🎤 Decirla (te califico)</button>` : ""}<button class="btn ${SR ? "secondary" : ""}" id="self">Ya la dije 3 veces</button></div>
      <p class="muted small center" id="heard">${SR ? "El micrófono necesita internet." : ""}</p>`;
    $("#pl").onclick = () => speak(s.en); $("#sl").onclick = () => speak(s.en, true);
    setTimeout(() => speak(s.en), 350);
    $("#self").onclick = () => { bump("speak"); feedback(true, "Sigue imitando el ritmo y la entonación."); };
    if (SR) $("#mic").onclick = () => {
      $("#heard").textContent = "Escuchando...";
      listenOnce((alts) => {
        const r = bestMatch(s.en, alts.map(String)); const said = alts[0] || "";
        const pct = compare(s.en, said).pct;
        $("#heard").innerHTML = `Entendí: «${esc(said)}» · ${pct}%`;
        if (pct >= 75) { bump("speak"); feedback(true, diffHtml(compare(s.en, said))); }
        else toast("Inténtalo otra vez, más despacio");
        void r;
      }, (err) => { $("#heard").textContent = err === "not-allowed" ? "Permite el micrófono o usa «Ya la dije»." : "No se pudo usar el micrófono (¿sin internet?). Usa «Ya la dije»."; });
    };
  }
}

/* ---------- Rutas de práctica ---------- */
routes.sesion = () => runSession(buildDaily(), "Sesión del día", true);
routes.errores = () => runSession(buildErrors(), "Mis errores", false);
routes.sonidos = () => runSession(Array.from({ length: 12 }, pairItem), "Sonidos difíciles", false);

routes.practicar = () => {
  setTitle("Practicar", false);
  const errors = Object.values(sstate()).filter((s) => s.wrong > 0 && s.lvl < 3).length;
  const best = store.get("best", {});
  const row = (h, e, t, d) => `<a class="row" href="${h}"><span class="emoji">${e}</span><span class="grow"><span class="t">${t}</span><div class="d">${d}</div></span></a>`;
  view.innerHTML = `
    <h3 style="margin-top:4px">Lo principal</h3>
    <div class="list">
      ${row("#/sesion", "⚡", "Sesión del día", "20 ejercicios mezclados según tu nivel y tus errores")}
      ${row("#/historias", "📖", "Historias", "Input comprensible: escucha, lee y responde")}
      ${row("#/errores", "🎯", "Mis errores", errors ? `${errors} oraciones por dominar` : "Aún no tienes errores guardados")}
    </div>
    <h3>Entrenamientos</h3>
    <div class="list">
      ${row("#/sonidos", "👂", "Sonidos difíciles", "Pares mínimos para entrenar el oído")}
      ${row("#/repite", "🗣️", "Escucha y repite", "Shadowing con micrófono")}
      ${row("#/hablar", "🎤", "Habla 1 minuto", "Situaciones reales con frases de apoyo")}
      ${row("#/tarjetas", "🃏", "Tarjetas", "Verbos, frases, TI, phrasal verbs, falsos amigos")}
      ${row("#/contrarreloj", "⏱️", "Contrarreloj de verbos", `Récord: ${best.rush || 0} en 60 s`)}
      ${row("#/dictado", "🎧", "Dictado libre", "Oraciones de A1 a B2")}
      ${row("#/quiz", "✅", "Quiz de gramática", "Opción múltiple con explicación")}
    </div>`;
};

/* Historias */
routes.historias = () => {
  setTitle("Historias", true);
  const read = store.get("stories", {});
  view.innerHTML = `<p class="sub">Escucha primero sin leer, luego lee tocando cada línea. Toca ES solo si no entiendes.</p>
    <div class="list">${STORIES.map((s) => `<a class="row" href="#/historia/${s.id}"><span class="emoji">${read[s.id] ? "✅" : "📖"}</span>
      <span class="grow"><span class="t">${esc(s.title)}</span><div class="d">${s.level} · ${s.lines.length} líneas${read[s.id] ? ` · ${read[s.id]}/3 correctas` : ""}</div></span></a>`).join("")}</div>`;
};
routes.historia = (id) => {
  const st = STORIES.find((x) => x.id === id) || STORIES[0];
  setTitle(st.title, true);
  view.innerHTML = `<div class="btns" style="margin-top:0"><button class="btn" id="all">🔊 Escuchar toda</button><button class="btn secondary" id="stop">■ Parar</button></div>
    <div class="card story">${st.lines.map(([en, es], i) => `<div class="line"><span class="en" data-i="${i}">${esc(en)}</span>
      <button class="es-t" data-i="${i}">ES</button><div class="es" id="es${i}" hidden>${esc(es)}</div></div>`).join("")}</div>
    <h3>Preguntas</h3><div id="qs"></div>`;
  $("#all").onclick = () => speakAll(st.lines.map((l) => l[0]));
  $("#stop").onclick = () => speechSynthesis.cancel();
  view.querySelectorAll(".en").forEach((el) => (el.onclick = () => speak(st.lines[Number(el.dataset.i)][0])));
  view.querySelectorAll(".es-t").forEach((b) => (b.onclick = () => { const e = $("#es" + b.dataset.i); e.hidden = !e.hidden; }));
  let answered = 0, right = 0;
  $("#qs").innerHTML = st.q.map(([q, opts], k) => `<div class="card"><div class="t" style="margin-bottom:8px">${esc(q)}</div>
    <div data-k="${k}">${opts.map((o, j) => `<button class="opt" data-j="${j}">${esc(o)}</button>`).join("")}</div></div>`).join("");
  $("#qs").onclick = (e) => {
    const b = e.target.closest(".opt"); if (!b) return; const box = b.parentElement; if (box.dataset.done) return;
    box.dataset.done = 1; const k = Number(box.dataset.k), ans = st.q[k][2];
    box.querySelectorAll(".opt").forEach((o) => Number(o.dataset.j) === ans && o.classList.add("right"));
    if (Number(b.dataset.j) !== ans) b.classList.add("wrong"); else right++;
    answered++;
    if (answered === st.q.length) {
      const r = store.get("stories", {}); r[st.id] = Math.max(r[st.id] || 0, right); store.set("stories", r);
      bump("story");
      const d = document.createElement("div");
      d.innerHTML = `<div class="feedback ${right === 3 ? "ok" : "no"}"><b>${right}/3.</b> ${right === 3 ? "¡Entendiste todo!" : "Vuelve a escucharla mañana: la segunda vez se entiende mucho más."}</div><a class="btn" href="#/">Volver al inicio</a>`;
      $("#qs").appendChild(d);
    }
  };
};

/* Escucha y repite (con micrófono) */
routes.repite = () => {
  setTitle("Escucha y repite", true);
  const items = shuffle([...DECKS.frases.cards.map((c) => ({ en: c.front, es: c.back })), ...SENTENCES.filter((s) => s.unit <= curUnit()).map((s) => ({ en: s.en, es: s.es }))]);
  let i = 0, reps = 0;
  const show = () => {
    const c = items[i % items.length];
    view.innerHTML = `<p class="sub">Escucha, repite en voz alta imitando el ritmo y pasa a la siguiente.</p>
      <div class="flash" style="cursor:default"><div class="front" style="font-size:24px">${esc(c.en)}</div><div class="note">${esc(c.es)}</div>
      <div class="btns" style="width:100%"><button class="btn" id="pl">🔊 Escuchar</button><button class="btn secondary" id="sl">🐢 Lento</button></div></div>
      <div class="btns">${SR ? `<button class="btn" id="mic">🎤 Decirla</button>` : ""}<button class="btn easy" id="ok">Siguiente ›</button></div>
      <p class="muted small center" id="heard">Frases practicadas: ${reps}</p>`;
    $("#pl").onclick = () => speak(c.en); $("#sl").onclick = () => speak(c.en, true);
    $("#ok").onclick = () => { reps++; if (reps === 5) { bump("speak"); toast("¡5 frases practicadas!"); } i++; show(); };
    if (SR) $("#mic").onclick = () => {
      $("#heard").textContent = "Escuchando...";
      listenOnce((alts) => { const said = alts[0] || ""; const r = compare(c.en, said); $("#heard").innerHTML = `${r.pct}% · ${diffHtml(r)}`; },
        () => { $("#heard").textContent = "No se pudo usar el micrófono (necesita internet)."; });
    };
    setTimeout(() => speak(c.en), 300);
  };
  show();
};

/* Habla 1 minuto */
routes.hablar = (idx) => {
  setTitle("Habla 1 minuto", true);
  if (idx === undefined) {
    view.innerHTML = `<p class="sub">Elige una situación, escucha las frases de apoyo y habla 1 minuto en voz alta. Grábate con Notas de voz y escúchate.</p>
      <div class="list">${SITUATIONS.map(([t, s], k) => `<a class="row" href="#/hablar/${k}"><span class="grow"><span class="t">${esc(t)}</span><div class="d">${esc(s)}</div></span><span>›</span></a>`).join("")}</div>`;
    return;
  }
  const [t, s, ph] = SITUATIONS[Number(idx)] || SITUATIONS[0];
  view.innerHTML = `<div class="card"><h2>${esc(t)}</h2><p class="sub" style="margin:0">${esc(s)}</p></div>
    <h3>Frases de apoyo (toca para escuchar)</h3>
    <div class="phrases">${ph.map((p) => `<button data-p="${esc(p)}">🔊 ${esc(p)}</button>`).join("")}</div>
    <div class="timer" id="t" style="margin-top:20px">1:00</div><button class="btn" id="go">Empezar a hablar</button>`;
  view.querySelectorAll(".phrases button").forEach((b) => (b.onclick = () => speak(b.dataset.p)));
  $("#go").onclick = () => {
    $("#go").disabled = true; const end = Date.now() + 60000;
    const timer = setInterval(() => {
      const left = Math.max(0, Math.ceil((end - Date.now()) / 1000));
      $("#t").textContent = left === 60 ? "1:00" : `0:${String(left).padStart(2, "0")}`;
      if (left <= 0) {
        clearInterval(timer); cleanup = null; bump("speak");
        $("#go").outerHTML = `<div class="feedback ok"><b>¡Tiempo!</b> ¿Usaste las frases de apoyo? ¿Qué palabra te faltó? Búscala y repite mañana.</div><a class="btn secondary" href="#/hablar">Otra situación</a>`;
      }
    }, 250);
    cleanup = () => clearInterval(timer);
  };
};

/* Tarjetas */
routes.tarjetas = () => {
  setTitle("Tarjetas", true);
  const icons = { verbos: "🔁", frases: "💬", ti: "💻", phrasal: "🧩", falsos: "⚠️" };
  view.innerHTML = `<p class="sub">Piensa la respuesta antes de voltear. Las que fallas vuelven pronto.</p>
    <div class="list">${Object.entries(DECKS).map(([k, d]) => {
      const n = dueCards(k).length + newCards(k).length;
      const learned = d.cards.filter((c) => (srsAll()[c.id] || {}).box >= 3).length;
      return `<a class="row" href="#/estudiar/${k}"><span class="emoji">${icons[k]}</span><span class="grow"><span class="t">${d.name}</span><div class="d">${d.desc} · ${learned}/${d.cards.length} dominadas</div></span>
        <span class="badge ${n ? "" : "done"}">${n ? `${n} hoy` : "✓ al día"}</span></a>`;
    }).join("")}</div>`;
};
routes.estudiar = (k) => {
  const deck = DECKS[k]; if (!deck) return go("#/tarjetas");
  setTitle(deck.name, true);
  const tag = (c) => Object.assign({}, c, { deck: k });
  const queue = shuffle(dueCards(k)).slice(0, 25).map(tag).concat(newCards(k).map(tag));
  const total = queue.length; let done = 0;
  if (!total) { view.innerHTML = `<div class="card center"><div class="big">✓</div><h2>Todo al día</h2><a class="btn" href="#/tarjetas">Otros mazos</a></div>`; return; }
  const show = () => {
    if (!queue.length) { view.innerHTML = `<div class="card center"><div class="big">🎉</div><h2>¡Listo!</h2><p class="sub">Repasaste ${total} tarjetas.</p><a class="btn" href="#/">Inicio</a></div>`; return; }
    const c = queue[0];
    view.innerHTML = `<div class="counter"><span>${done} de ${total}</span><span>${queue.length} en la fila</span></div>
      <div class="progress" style="margin-bottom:14px"><span style="width:${(done / total) * 100}%"></span></div>
      <div class="flash" id="fl"><div class="front">${esc(c.front)}</div><button class="speak" id="say">🔊 Escuchar</button>
        <div id="bk" hidden><div class="back">${esc(c.back)}</div>${c.note ? `<div class="note">${esc(c.note)}</div>` : ""}</div>
        <div class="hint" id="hi">Piensa la respuesta y toca para voltear</div></div>
      <div class="btns" id="gr" hidden><button class="btn again" data-g="0">Otra vez</button><button class="btn good" data-g="1">Bien</button><button class="btn easy" data-g="2">Fácil</button></div>`;
    $("#say").onclick = (e) => { e.stopPropagation(); speak(c.speak); };
    $("#fl").onclick = () => { $("#bk").hidden = false; $("#gr").hidden = false; $("#hi").hidden = true; };
    $("#gr").onclick = (e) => {
      const b = e.target.closest("button"); if (!b) return; const g = Number(b.dataset.g);
      gradeCard(c, g); queue.shift(); if (g === 0) queue.push(c); else { done++; bump("cards"); } show();
    };
  };
  show();
};

/* Quiz */
routes.quiz = (level = "Todos") => {
  setTitle("Quiz", true);
  const levels = ["Todos", "A1", "A2", "B1", "B2"];
  const qs = pick(level === "Todos" ? QUIZ : QUIZ.filter((q) => q[4] === level), 10);
  let i = 0, score = 0;
  const show = () => {
    if (i >= qs.length) {
      view.innerHTML = `<div class="card center"><div class="big">${score}/${qs.length}</div><h2>${score >= 8 ? "¡Excelente!" : score >= 5 ? "¡Bien!" : "Repasa y vuelve a intentar"}</h2>
        <div class="btns"><button class="btn" id="ag">Otra ronda</button><a class="btn secondary" href="#/">Inicio</a></div></div>`;
      $("#ag").onclick = () => render(); return;
    }
    const [q, opts, ans, why, lv] = qs[i];
    view.innerHTML = `<div class="chips">${levels.map((l) => `<button class="chip ${l === level ? "on" : ""}" data-l="${l}">${l}</button>`).join("")}</div>
      <div class="counter"><span>${i + 1} de ${qs.length} · ${lv}</span><span>${score} aciertos</span></div>
      <div class="q">${esc(q)}</div><div id="op">${shuffle(opts.map((o, k) => [o, k])).map(([o, k]) => `<button class="opt" data-k="${k}">${esc(o)}</button>`).join("")}</div><div id="fb"></div>`;
    view.querySelectorAll(".chip").forEach((c) => (c.onclick = () => go("#/quiz/" + c.dataset.l)));
    $("#op").onclick = (e) => {
      const b = e.target.closest(".opt"); if (!b || $("#op").dataset.l) return; $("#op").dataset.l = 1;
      view.querySelectorAll(".opt").forEach((o) => Number(o.dataset.k) === ans && o.classList.add("right"));
      const ok = Number(b.dataset.k) === ans; if (ok) { score++; bump("quiz"); } else b.classList.add("wrong");
      $("#fb").innerHTML = `<div class="feedback ${ok ? "ok" : "no"}"><b>${ok ? "¡Correcto!" : "Casi."}</b> ${esc(why)}</div><button class="btn" id="nx">Siguiente</button>`;
      $("#nx").onclick = () => { i++; show(); };
    };
  };
  show();
};

/* Contrarreloj */
routes.contrarreloj = () => {
  setTitle("Contrarreloj", true);
  const best = store.get("best", {});
  view.innerHTML = `<div class="card center"><div class="big">⏱️ 60 s</div><h2>¿Cuántos verbos aciertas?</h2>
    <p class="sub">Pasado o participio de un verbo irregular. Toca la opción correcta lo más rápido que puedas.</p>
    <p class="muted">Récord: <b>${best.rush || 0}</b></p><button class="btn" id="st">Empezar</button></div>`;
  $("#st").onclick = () => {
    let left = 60, score = 0; const miss = []; const end = Date.now() + 60000;
    const pool = VERBS.slice(0, curUnit() <= 7 ? 45 : VERBS.length);
    const timer = setInterval(() => { left = Math.max(0, Math.ceil((end - Date.now()) / 1000)); const t = $("#t"); if (t) t.textContent = left; if (left <= 0) fin(); }, 250);
    cleanup = () => clearInterval(timer);
    const next = () => {
      const v = rand(pool); const askPast = Math.random() < 0.5; const right = askPast ? v.past : v.pp;
      const wrong = shuffle([...new Set(VERBS.filter((x) => x !== v).flatMap((x) => [x.past, x.pp]).concat(v.base + "ed"))].filter((w) => w !== right)).slice(0, 2);
      view.innerHTML = `<div class="timer" id="t">${left}</div><div class="counter"><span>Aciertos: <b>${score}</b></span><span>Récord: ${best.rush || 0}</span></div>
        <div class="q center">${askPast ? "Pasado" : "Participio"} de <span class="acc">${esc(v.base)}</span></div>
        <div id="op">${shuffle([right, ...wrong]).map((o) => `<button class="opt" data-o="${esc(o)}">${esc(o)}</button>`).join("")}</div>`;
      $("#op").onclick = (e) => { const b = e.target.closest(".opt"); if (!b) return;
        if (b.dataset.o === right) { score++; bump("quiz"); next(); } else { b.classList.add("wrong"); miss.push(`${v.base} – ${v.past} – ${v.pp}`); setTimeout(next, 450); } };
    };
    const fin = () => {
      clearInterval(timer); cleanup = null;
      const b = store.get("best", {}); const rec = score > (b.rush || 0); if (rec) { b.rush = score; store.set("best", b); }
      view.innerHTML = `<div class="card center"><div class="big">${score}</div><h2>${rec ? "¡Nuevo récord! 🏆" : "aciertos"}</h2>
        ${miss.length ? `<h3>Repasa estos</h3><p>${[...new Set(miss)].map(esc).join("<br>")}</p>` : ""}
        <div class="btns"><button class="btn" id="ag">Otra vez</button><a class="btn secondary" href="#/">Inicio</a></div></div>`;
      $("#ag").onclick = () => render();
    };
    next();
  };
};

/* Dictado libre */
routes.dictado = (level = "Todos") => {
  setTitle("Dictado", true);
  const levels = ["Todos", "A1", "A2", "B1", "B2"];
  const pool = level === "Todos" ? DICTATION : DICTATION.filter((d) => d[2] === level);
  let items = shuffle(pool), i = 0;
  const show = () => {
    if (i >= items.length) { items = shuffle(pool); i = 0; }
    const [en, es, lv] = items[i];
    view.innerHTML = `<div class="chips">${levels.map((l) => `<button class="chip ${l === level ? "on" : ""}" data-l="${l}">${l}</button>`).join("")}</div>
      <div class="card center"><p class="sub">Escucha y escribe lo que oyes · ${lv}</p>
      <div class="btns"><button class="btn" id="pl">🔊 Escuchar</button><button class="btn secondary" id="sl">🐢 Lento</button></div></div>
      <input type="text" id="an" placeholder="Escribe aquí..." autocomplete="off" spellcheck="false"><div class="btns"><button class="btn good" id="ck">Revisar</button></div><div id="rs"></div>`;
    view.querySelectorAll(".chip").forEach((c) => (c.onclick = () => go("#/dictado/" + c.dataset.l)));
    $("#pl").onclick = () => speak(en); $("#sl").onclick = () => speak(en, true);
    const check = () => {
      const r = compare(en, $("#an").value); if (r.pct >= 85) bump("dict");
      $("#rs").innerHTML = `<div class="card"><div class="counter"><span><b>${r.pct}%</b> correcto</span></div>${diffHtml(r)}<p class="muted" style="margin:0">${esc(en)}<br>${esc(es)}</p></div><button class="btn" id="nx">Siguiente</button>`;
      $("#nx").onclick = () => { i++; show(); };
    };
    $("#ck").onclick = check; $("#an").addEventListener("keydown", (e) => { if (e.key === "Enter") check(); });
  };
  show();
};

/* ---------- Consulta ---------- */
routes.consulta = () => {
  setTitle("Consulta", false);
  view.innerHTML = `<input type="search" id="q" placeholder="Buscar verbo en inglés o español..." autocomplete="off">
    <h3>Verbos irregulares <span class="muted small">(toca para escuchar)</span></h3>
    <div class="card" style="padding:4px 12px"><table><thead><tr><th>Base</th><th>Pasado</th><th>Participio</th></tr></thead><tbody id="vt"></tbody></table></div>
    <h3>Las ideas clave de cada unidad</h3>
    <div class="list">${UNITS.map((u) => `<a class="row" href="#/unidad/${u.id}"><span class="unum">${u.id}</span><span class="grow"><span class="t">${esc(u.title)}</span><div class="d">${u.level}</div></span></a>`).join("")}</div>
    <h3>Los tiempos verbales</h3>
    <div class="card" style="padding:4px 12px"><table><tbody>${TENSES.map(([n, ex, u]) => `<tr><td><b>${n}</b><br><span class="muted small">${u}</span></td><td>${esc(ex)}</td></tr>`).join("")}</tbody></table></div>
    <h3>Guía completa (necesita internet)</h3>
    <div class="list">${GUIDE_DOCS.map(([t, u]) => `<a class="row" href="${u}" target="_blank" rel="noopener"><span class="grow"><span class="t">${esc(t)}</span></span><span>↗</span></a>`).join("")}</div>`;
  const sorted = VERBS.slice().sort((a, b) => a.base.localeCompare(b.base));
  const fill = (term = "") => {
    const t = term.trim().toLowerCase();
    const rows = sorted.filter((v) => !t || [v.base, v.past, v.pp, v.es].some((x) => x.toLowerCase().includes(t)));
    $("#vt").innerHTML = rows.map((v) => `<tr data-s="${esc(`${v.base}, ${v.past.replace("/", ", ")}, ${v.pp}`)}"><td><b>${esc(v.base)}</b><br><span class="muted small">${esc(v.es)}</span></td><td>${esc(v.past)}</td><td>${esc(v.pp)}</td></tr>`).join("")
      || `<tr><td colspan="3" class="muted">Sin resultados</td></tr>`;
  };
  fill(); $("#q").oninput = (e) => fill(e.target.value);
  $("#vt").onclick = (e) => { const tr = e.target.closest("tr[data-s]"); if (tr) speak(tr.dataset.s); };
};

/* ---------- Progreso y reporte para Claude ---------- */
function buildReport() {
  const days = store.get("days", {}), st = sstate(), p = profile();
  const last = Array.from({ length: 7 }, (_, k) => addDays(today(), -k));
  const week = last.map((d) => days[d]).filter(Boolean);
  const items = week.reduce((n, d) => n + (d.items || 0), 0), ok = week.reduce((n, d) => n + (d.ok || 0), 0);
  const byUnit = UNITS.map((u) => `U${u.id} ${unitMastery(u.id)}%`).join(", ");
  const worst = SENTENCES.filter((s) => st[s.id] && st[s.id].wrong > 0).sort((a, b) => st[b.id].wrong - st[a.id].wrong).slice(0, 8)
    .map((s) => `- (U${s.unit}, ${st[s.id].wrong} fallos) ${s.en}`).join("\n");
  const stories = store.get("stories", {});
  return `REPORTE INGLÉS DIARIO · ${today()}
Nivel de inicio: ${p.level} · diagnóstico ${p.diag} · unidad actual ${curUnit()} (${UNITS[curUnit() - 1].title})
Racha: ${streak()} días · días activos esta semana: ${week.length}/7
Ejercicios esta semana: ${items} · aciertos ${items ? Math.round((ok / items) * 100) : 0}%
Dominio por unidad: ${byUnit}
Historias: ${Object.keys(stories).length}/${STORIES.length} leídas · récord contrarreloj ${(store.get("best", {}).rush) || 0}
Oraciones que más fallo:
${worst || "- (ninguna todavía)"}`;
}
routes.reporte = () => {
  setTitle("Reporte para Claude", true);
  const txt = buildReport();
  view.innerHTML = `<p class="sub">Copia esto y pégalo en tu chat con Claude cada semana: con eso ajusta tu plan y agrega contenido para lo que más fallas.</p>
    <pre class="report" id="rp">${esc(txt)}</pre><button class="btn" id="cp">Copiar reporte</button><p class="muted small center" id="msg"></p>`;
  $("#cp").onclick = async () => {
    try { await navigator.clipboard.writeText(txt); $("#msg").textContent = "¡Copiado! Pégalo en el chat."; }
    catch { const r = document.createRange(); r.selectNodeContents($("#rp")); const s = getSelection(); s.removeAllRanges(); s.addRange(r); $("#msg").textContent = "Selecciona y copia el texto."; }
  };
};
routes.progreso = () => {
  setTitle("Progreso", false);
  const days = store.get("days", {}); const p = profile();
  const totalItems = Object.values(days).reduce((n, d) => n + (d.items || 0), 0);
  const totalOk = Object.values(days).reduce((n, d) => n + (d.ok || 0), 0);
  const active = Object.values(days).filter((d) => d.items || d.cards || d.story || d.quiz).length;
  const cells = []; const t = today();
  for (let k = 27; k >= 0; k--) {
    const d = addDays(t, -k), log = days[d];
    const cls = log && log.done ? "full" : log && (log.items || log.cards || log.story || log.quiz) ? "part" : "";
    cells.push(`<span class="${cls}">${Number(d.slice(8))}</span>`);
  }
  const rate = store.get("rate", 0.9);
  view.innerHTML = `
    <a class="btn" href="#/reporte" style="margin-bottom:14px">📋 Reporte semanal para Claude</a>
    <div class="stats">
      <div class="stat"><b>🔥 ${streak()}</b><span>días seguidos</span></div>
      <div class="stat"><b>${active}</b><span>días practicados</span></div>
      <div class="stat"><b>${totalItems}</b><span>ejercicios hechos</span></div>
      <div class="stat"><b>${totalItems ? Math.round((totalOk / totalItems) * 100) : 0}%</b><span>aciertos</span></div>
    </div>
    <h3>Últimas 4 semanas</h3>
    <div class="card"><div class="cal">${cells.join("")}</div><p class="muted small" style="margin:10px 0 0">Verde: reto completo · Naranja: practicaste algo</p></div>
    <h3>Mi nivel de inicio</h3>
    <p class="sub">Diagnóstico: ${esc(p.diag)}. Cambiarlo te mueve al inicio de ese nivel.</p>
    <div class="chips">${Object.keys(LEVEL_START).map((l) => `<button class="chip ${p.level === l ? "on" : ""}" data-lv="${l}">${l}</button>`).join("")}</div>
    <h3>Velocidad de la voz</h3>
    <div class="chips">${[[0.7, "Lenta"], [0.9, "Normal"], [1.05, "Rápida"]].map(([r, l]) => `<button class="chip ${Math.abs(rate - r) < 0.01 ? "on" : ""}" data-r="${r}">${l}</button>`).join("")}</div>
    <h3>Respaldo</h3><p class="sub">Tu progreso vive solo en este celular. Si borras el ícono de la pantalla de inicio, se borra.</p>
    <button class="btn secondary" id="rs">Borrar mi progreso</button><div id="cf"></div>`;
  view.querySelectorAll("[data-lv]").forEach((b) => (b.onclick = () => { setProfile({ level: b.dataset.lv, unit: LEVEL_START[b.dataset.lv] }); toast(`Empiezas en ${b.dataset.lv}`); render(); }));
  view.querySelectorAll("[data-r]").forEach((b) => (b.onclick = () => { store.set("rate", Number(b.dataset.r)); speak("This is how I sound."); render(); }));
  $("#rs").onclick = () => {
    $("#cf").innerHTML = `<div class="feedback no">¿Seguro? Se borra tu racha, tu ruta y tus récords.</div><button class="btn again" id="yes">Sí, borrar todo</button>`;
    $("#yes").onclick = () => { ["days", "srs", "best", "newCount", "sent", "stories", "profile"].forEach((k) => localStorage.removeItem("ing:" + k)); toast("Progreso borrado"); render(); };
  };
};

/* ---------- Arranque ---------- */
if ("serviceWorker" in navigator) window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));
render();
