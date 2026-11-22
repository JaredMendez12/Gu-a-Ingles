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

/* ---------- Sonidos de acierto/error ---------- */
let actx = null;
const silent = () => !!profile().silent;
function beep(ok) {
  if (!profile().sound || silent()) return;
  try {
    actx = actx || new (window.AudioContext || window.webkitAudioContext)();
    if (actx.state === "suspended") actx.resume();
    (ok ? [660, 990] : [330, 247]).forEach((f, i) => {
      const o = actx.createOscillator(), g = actx.createGain(), t = actx.currentTime + i * 0.1;
      o.type = ok ? "sine" : "triangle"; o.frequency.value = f;
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.16, t + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.17);
      o.connect(g).connect(actx.destination); o.start(t); o.stop(t + 0.2);
    });
  } catch {}
  if (navigator.vibrate) navigator.vibrate(ok ? 15 : [30, 40, 30]);
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
const emptyLog = () => ({ session: 0, story: 0, items: 0, ok: 0, cards: 0, quiz: 0, dict: 0, speak: 0, xp: 0, done: false });
const XP = { ok: 10, wrong: 2, story: 20, card: 2, quiz: 5, speak: 5, perfect: 20 };
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
function renderStreak() { $("#streak").textContent = "🔥 " + streak(); $("#xp").textContent = "⚡ " + dayLog().xp; }
const totalXP = () => Object.values(store.get("days", {})).reduce((n, d) => n + (d.xp || 0), 0);

const LEVEL_START = { A1: 1, A2: 7, B1: 12 };
const PROFILE_DEFAULT = { level: "A1", diag: "15/40 (A1 en proceso)", unit: 1, name: "Jared", goals: [], interests: ["Programación", "Videojuegos", "Vida universitaria"], minutes: 10, sound: true, big: false, silent: false, onboarded: false };
function profile() { return Object.assign({}, PROFILE_DEFAULT, store.get("profile", {})); }
const SESSION_SIZE = { 5: 10, 10: 15, 15: 20, 20: 25 };
const sessionSize = () => SESSION_SIZE[profile().minutes] || 15;
function applyPrefs() { document.documentElement.classList.toggle("big", !!profile().big); }
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
function deckOf(k) {
  if (k === "mias") return { name: "Mis frases", desc: "Las que guardaste con ⭐", cards: savedList().map((x) => ({ id: "m:" + x.en, front: x.en, back: x.es, note: x.src ? "De: " + x.src : "", speak: x.en })) };
  return DECKS[k];
}
const deckKeys = () => [...(savedList().length ? ["mias"] : []), ...Object.keys(DECKS)];
function dueCards(k) { const s = srsAll(), t = today(); return deckOf(k).cards.filter((c) => s[c.id] && s[c.id].due <= t); }
function newCards(k) {
  const s = srsAll(); const used = store.get("newCount", {})[today() + ":" + k] || 0;
  return deckOf(k).cards.filter((c) => !s[c.id]).slice(0, Math.max(0, NEW_PER_DAY - used));
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
const TAB = { home: "home", metodo: "home", aprender: "aprender", ruta: "aprender", unidad: "aprender", tema: "aprender", guias: "aprender", guia: "aprender", consulta: "aprender", practicar: "practicar", sesion: "practicar", rapida: "practicar", silenciosa: "practicar", historias: "practicar", historia: "practicar", sonidos: "practicar", quiz: "practicar", dictado: "practicar", repite: "practicar", contrarreloj: "practicar", hablar: "practicar", parejas: "practicar", corrige: "practicar", palabras: "practicar", repaso: "repaso", repasar: "repaso", errores: "repaso", guardadas: "repaso", tarjetas: "repaso", estudiar: "repaso", progreso: "progreso", reporte: "progreso", bienvenida: "progreso" };
function render() {
  if (cleanup) { cleanup(); cleanup = null; }
  if (window.speechSynthesis) speechSynthesis.cancel();
  document.body.classList.remove("focus"); view.style.paddingBottom = "";
  document.querySelectorAll(".sheet-bg, .actionbar, .zoom").forEach((e) => e.remove());
  const parts = (location.hash.replace(/^#\/?/, "") || "").split("/");
  const name = parts[0] || "home";
  document.querySelectorAll(".tabs a").forEach((a) => a.classList.toggle("active", a.dataset.tab === TAB[name]));
  window.scrollTo(0, 0);
  (routes[name] || routes.home)(...parts.slice(1));
  renderStreak();
}
window.addEventListener("hashchange", render);
$("#back").addEventListener("click", () => (history.length > 1 ? history.back() : go("#/")));

/* ---------- Bienvenida (personalización) ---------- */
const GOAL_OPTS = ["Trabajar en TI", "Entender documentación", "Entrevistas de trabajo", "Videojuegos y series", "Viajar", "Certificación o examen", "Clases de la uni"];
const INTEREST_OPTS = ["Programación", "Videojuegos", "Anime y series", "Música", "Deportes", "Tecnología", "Vida universitaria", "Comida"];
routes.bienvenida = () => {
  setTitle("Tu perfil", true);
  const p = profile(); let goals = new Set(p.goals), ints = new Set(p.interests.length ? p.interests : ["Programación", "Videojuegos", "Vida universitaria"]), mins = p.minutes;
  view.innerHTML = `<div class="welcome">
    <h2>Tu perfil</h2>
    <p class="sub center">Claude usa esto para escribir oraciones e historias para ti.</p>
    <label for="nm">¿Cómo te llamas?</label><input type="text" id="nm" value="${esc(p.name || "Jared")}" autocomplete="given-name">
    <label>¿Para qué quieres el inglés? <span class="muted small">(elige varios)</span></label><div class="chips" id="gl"></div>
    <label>¿Qué te interesa? <span class="muted small">(los temas de tus oraciones e historias)</span></label><div class="chips" id="it"></div>
    <label>¿Cuánto tiempo al día?</label><div class="chips" id="mn"></div>
    <p class="muted small" id="mnd"></p>
    <button class="btn" id="go" style="margin-top:16px">Guardar</button></div>`;
  const draw = () => {
    $("#gl").innerHTML = GOAL_OPTS.map((g) => `<button class="chip ${goals.has(g) ? "on" : ""}" data-v="${esc(g)}">${esc(g)}</button>`).join("");
    $("#it").innerHTML = INTEREST_OPTS.map((g) => `<button class="chip ${ints.has(g) ? "on" : ""}" data-v="${esc(g)}">${esc(g)}</button>`).join("");
    $("#mn").innerHTML = [5, 10, 15, 20].map((m) => `<button class="chip ${mins === m ? "on" : ""}" data-m="${m}">${m} min</button>`).join("");
    $("#mnd").textContent = `Sesión de ${SESSION_SIZE[mins]} ejercicios${mins <= 5 ? ". Ideal para días pesados." : mins >= 20 ? ". Modo intensivo." : "."}`;
  };
  draw();
  const toggle = (set) => (e) => { const b = e.target.closest(".chip"); if (!b) return; set.has(b.dataset.v) ? set.delete(b.dataset.v) : set.add(b.dataset.v); draw(); };
  $("#gl").onclick = toggle(goals); $("#it").onclick = toggle(ints);
  $("#mn").onclick = (e) => { const b = e.target.closest(".chip"); if (b) { mins = Number(b.dataset.m); draw(); } };
  $("#go").onclick = () => {
    setProfile({ name: $("#nm").value.trim(), goals: [...goals], interests: [...ints], minutes: mins, onboarded: true });
    toast("Perfil guardado"); go("#/progreso");
  };
};

/* ---------- Inicio ---------- */
routes.home = () => {
  setTitle("Inglés diario", false);
  const log = dayLog(), p = profile(), u = UNITS[curUnit() - 1];
  const tasks = [
    ["session", "Sesión del día", `${sessionSize()} ejercicios · ${p.minutes} min`, "#/sesion"],
    ["story", "Una historia corta", p.silent ? "Lee y responde · 5 min" : "Escucha, lee y responde · 5 min", "#/historias"],
  ];
  const doneN = tasks.filter(([k]) => log[k] >= GOALS[k]).length;
  const nextTask = tasks.find(([k]) => log[k] < GOALS[k]);
  const errors = Object.values(sstate()).filter((s) => s.wrong > 0 && s.lvl < 3).length;
  const h = new Date().getHours();
  const hi = h < 12 ? "Buenos días" : h < 19 ? "Buenas tardes" : "Buenas noches";
  const m = unitMastery(u.id);
  view.innerHTML = `
    <div class="hello">${hi}${p.name ? ", " + esc(p.name) : ""} 👋</div>
    <p class="sub">${log.done ? "Ya cumpliste hoy. Lo extra suma, pero descansar también." : streak() ? `Llevas ${streak()} ${streak() === 1 ? "día" : "días"} seguidos. No rompas la racha.` : "Hoy empieza tu racha."}</p>
    <button class="silent-t ${p.silent ? "on" : ""}" id="silent">${p.silent ? "🤫 Modo silencioso activado · sin audio ni hablar" : "🔊 ¿En la calle? Activa el modo silencioso"}</button>
    <div class="card hero">
      <div class="hero-grid"><div class="ring" style="--p:${(doneN / tasks.length) * 100}"><span>${doneN}/${tasks.length}</span></div>
        <div><div class="muted small">Reto de hoy</div><div class="big-t">${log.done ? "¡Completado! 🔥" : nextTask ? "Sigue: " + nextTask[1].toLowerCase() : ""}</div>
        <div class="muted small">⚡ ${log.xp} XP hoy</div></div></div>
      ${tasks.map(([k, t, d, hr]) => `<a class="task ${log[k] >= GOALS[k] ? "ok" : ""}" href="${hr}"><span class="check">${log[k] >= GOALS[k] ? "✓" : ""}</span>
        <span class="grow"><b>${t}</b><br><span class="muted small">${d}</span></span><span>›</span></a>`).join("")}
      ${nextTask ? `<a class="btn" href="${nextTask[3]}">${nextTask[0] === "session" ? "Empezar sesión" : "Leer una historia"}</a>` : `<a class="btn secondary" href="#/sesion">Otra sesión (opcional)</a>`}
      ${!log.done && nextTask && nextTask[0] === "session" ? `<a class="btn ghost" href="#/rapida" style="color:#fff">¿Poco tiempo? Sesión rápida de 3 min</a>` : ""}
    </div>
    ${exportDue() ? `<a class="card notice" href="#/reporte"><div class="t">📤 Toca mandarle tu progreso a Claude</div>
      <div class="muted small" style="margin-top:4px">Exporta el archivo y adjúntalo en el chat para que ajuste tu plan.</div></a>` : ""}
    <a class="card topic-card ${LEVEL_COLOR[u.level]}" href="#/tema/${u.id}">
      <div class="muted small"><span class="lvl ${LEVEL_COLOR[u.level]}">${u.level}</span> Tema ${u.id} de ${UNITS.length}</div>
      <div class="big-t">${esc(u.title)}</div>
      <div class="progress ${m >= 80 ? "good" : ""}" style="margin-top:10px"><span style="width:${m}%"></span></div>
      <div class="muted small" style="margin-top:6px">${m}% dominado · ${m >= 80 ? "¡listo! El siguiente ya está abierto" : `te falta ${80 - m}% para abrir el siguiente`}</div>
      ${!readMap()[u.key] && u.ficha ? `<div class="next-step">📖 Siguiente paso: lee la ficha del tema (3 min)</div>` : ""}
    </a>
    <div class="stats three">
      <div class="stat"><b>🔥 ${streak()}</b><span>racha</span></div>
      <div class="stat"><b>⚡ ${totalXP()}</b><span>XP total</span></div>
      <div class="stat"><b>${p.level}</b><span>nivel de inicio</span></div>
    </div>
    <h3>Extra si te sobra tiempo</h3>
    <div class="list">
      ${p.silent ? `<a class="row" href="#/parejas"><span class="emoji">🧩</span><span class="grow"><span class="t">Parejas de vocabulario</span><div class="d">Sin audio, perfecto para la calle</div></span><span class="chev">›</span></a>
      <a class="row" href="#/corrige"><span class="emoji">🕵️</span><span class="grow"><span class="t">Corrige el error</span><div class="d">Errores típicos de hispanohablantes</div></span><span class="chev">›</span></a>` : ""}
      ${errors ? `<a class="row" href="#/errores"><span class="emoji">🎯</span><span class="grow"><span class="t">Repasar mis errores</span><div class="d">${errors} oraciones que fallaste</div></span><span class="chev">›</span></a>` : ""}
      ${p.silent ? "" : `<a class="row" href="#/sonidos"><span class="emoji">👂</span><span class="grow"><span class="t">Sonidos difíciles</span><div class="d">Entrena el oído: ship o sheep</div></span><span class="chev">›</span></a>`}
      <a class="row" href="#/contrarreloj"><span class="emoji">⏱️</span><span class="grow"><span class="t">Contrarreloj de verbos</span><div class="d">60 segundos de irregulares</div></span><span class="chev">›</span></a>
      <a class="row" href="#/metodo"><span class="emoji">🧠</span><span class="grow"><span class="t">¿Por qué funciona este método?</span><div class="d">Lo que hace distinta a esta app</div></span><span class="chev">›</span></a>
    </div>`;
  $("#silent").onclick = () => { setProfile({ silent: !p.silent }); toast(!p.silent ? "🤫 Modo silencioso: solo lectura y escritura" : "🔊 Modo normal con audio"); render(); };
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

/* ---------- Frases guardadas, reportes y correcciones ---------- */
const savedList = () => store.get("saved", []);
const isSaved = (en) => savedList().some((x) => x.en === en);
function toggleSaved(en, es, src) {
  let l = savedList();
  if (l.some((x) => x.en === en)) { l = l.filter((x) => x.en !== en); toast("Quitada de tus frases"); }
  else { l.push({ en, es, src: src || "", date: today() }); toast("⭐ Guardada en tus frases"); }
  store.set("saved", l); return isSaved(en);
}
function logTo(key, obj) { const l = store.get(key, []); l.push(Object.assign({ date: today() }, obj)); store.set(key, l.slice(-200)); }

/* ---------- Constructores de sesión ---------- */
function typeFor(lvl, easy) {
  if (silent()) {
    if (easy) return rand(["read", "tiles"]);
    return rand([["read", "tiles"], ["tiles", "cloze", "read"], ["cloze", "tiles", "read"], ["translate", "cloze"], ["translate", "cloze", "tiles"]][Math.min(lvl, 4)]);
  }
  if (easy) return rand(["listen", "tiles"]);
  return rand([["listen", "tiles"], ["tiles", "cloze"], ["cloze", "dictation", "tiles"], ["translate", "dictation"], ["translate", "speak", "cloze"]][Math.min(lvl, 4)]);
}
const itemFor = (s) => ({ kind: "sentence", s, type: typeFor((stateOf(s.id) || { lvl: 0 }).lvl) });
const pairItem = () => ({ kind: "pair", pair: rand(PAIRS) });
const fixItem = (f) => ({ kind: "fix", fix: f && f.w ? f : rand(FIX2) });
const matchItem = (cat) => ({ kind: "match", words: pick(cat ? VOCAB_LIST.filter((w) => w.cat === cat) : VOCAB_LIST, 5) });
const wordItem = (w) => ({ kind: "word", w, rev: Math.random() < 0.4 });
const extraItem = () => (silent() ? fixItem() : pairItem());
function buildDaily(size = sessionSize()) {
  const cu = curUnit(), st = sstate(), t = today();
  const pool = SENTENCES.filter((s) => s.unit <= cu);
  const nDue = Math.round(size * 0.45), nNew = Math.round(size * 0.3);
  const due = pool.filter((s) => st[s.id] && st[s.id].due <= t).sort((a, b) => st[a.id].due.localeCompare(st[b.id].due)).slice(0, nDue);
  const fu = (UNITS.find((u) => u.id <= cu && SENTENCES.some((s) => s.unit === u.id && !st[s.id])) || { id: cu }).id;
  const fresh = SENTENCES.filter((s) => (s.unit === fu || s.unit === cu) && !st[s.id]).slice(0, nNew);
  const chosen = new Set([...due, ...fresh].map((s) => s.id));
  const fill = shuffle(pool.filter((s) => !chosen.has(s.id))).sort((a, b) => ((st[a.id] || {}).lvl || 0) - ((st[b.id] || {}).lvl || 0));
  const nPairs = size >= 15 ? 2 : 1;
  const list = [...due, ...fresh, ...fill].slice(0, size - nPairs - 1);
  const items = shuffle(list.map(itemFor));
  items.splice(2, 0, extraItem()); if (nPairs > 1) items.splice(Math.floor(items.length / 2) + 1, 0, extraItem());
  if (silent()) items.push(matchItem());
  else { const sp = list.find((s) => (st[s.id] || {}).lvl >= 1) || list[0]; if (sp) items.push({ kind: "sentence", s: sp, type: "speak" }); }
  return items.slice(0, size);
}
function buildUnitSession(uid) {
  const items = shuffle(SENTENCES.filter((s) => s.unit === uid)).map(itemFor);
  items.splice(4, 0, extraItem());
  return items.slice(0, 12);
}
function buildErrors() {
  const st = sstate();
  const list = SENTENCES.filter((s) => st[s.id] && st[s.id].wrong > 0 && st[s.id].lvl < 3)
    .sort((a, b) => st[b.id].wrong - st[a.id].wrong).slice(0, 12);
  return list.map((s) => ({ kind: "sentence", s, type: rand(silent() ? ["tiles", "cloze", "translate", "read"] : ["tiles", "cloze", "translate", "dictation"]) }));
}

/* ---------- Motor de ejercicios ---------- */
const TYPE_NAME = { read: "Lee y elige", fix: "Encuentra el error", match: "Une las parejas", word: "Vocabulario", listen: "Escucha y elige", tiles: "Ordena la oración", cloze: "Completa la palabra", translate: "Escríbelo en inglés", dictation: "Escribe lo que oyes", speak: "Dilo en voz alta", pair: "¿Qué palabra oíste?" };
const PRAISE = ["¡Correcto!", "¡Eso!", "¡Muy bien!", "¡Perfecto!", "¡Excelente!", "¡Así se hace!"];
const audioBtns = () => `<div class="audio"><button class="play" id="pl" aria-label="Escuchar">🔊</button><button class="play slow" id="sl" aria-label="Escuchar lento">🐢</button></div>`;
const ruleFor = (s) => { const u = UNITS.find((x) => x.id === s.unit); return u ? `<div class="rule">📌 ${md(u.idea[0])}</div>` : ""; };

function confirmQuit() {
  const m = document.createElement("div"); m.className = "sheet-bg";
  m.innerHTML = `<div class="sheet"><h2>¿Salir de la sesión?</h2><p class="sub" style="margin:0">Lo que ya respondiste se guarda, pero la sesión no cuenta para tu reto de hoy.</p>
    <button class="btn" id="stay">Seguir practicando</button><button class="btn ghost" id="leave">Salir</button></div>`;
  document.body.appendChild(m);
  m.onclick = (e) => { if (e.target === m) m.remove(); };
  m.querySelector("#stay").onclick = () => m.remove();
  m.querySelector("#leave").onclick = () => { m.remove(); go("#/"); };
}

function runSession(items, title, daily) {
  setTitle(title, true);
  if (!items.length) {
    view.innerHTML = `<div class="card center"><div class="big">✓</div><h2>Nada pendiente</h2><p class="sub">No hay ejercicios aquí por ahora.</p><a class="btn" href="#/">Inicio</a></div>`;
    return;
  }
  document.body.classList.add("focus");
  const queue = items.slice(); let total = items.length; let done = 0, ok = 0, xp = 0, combo = 0; const retried = new Set(); const missed = [];
  let onEnter = null;
  const keyH = (e) => { if (e.key === "Enter" && onEnter && !(e.target && e.target.tagName === "INPUT")) { e.preventDefault(); onEnter(); } };
  document.addEventListener("keydown", keyH);
  cleanup = () => document.removeEventListener("keydown", keyH);
  const next = () => {
    if (!queue.length) return finish();
    const it = queue.shift();
    renderItem(it, { done, total, xp, combo, inject: (arr) => { queue.unshift(...arr); total += arr.length; } }, (correct) => {
      done++;
      if (correct) { ok++; combo++; xp += XP.ok + (combo >= 5 ? 5 : 0); } else { combo = 0; xp += XP.wrong; }
      if (it.kind === "sentence") gradeSentence(it.s.id, correct);
      if (!correct && it.kind === "sentence") {
        if (!missed.includes(it.s)) missed.push(it.s);
        if (!retried.has(it.s.id)) { retried.add(it.s.id); queue.splice(Math.min(3, queue.length), 0, { kind: "sentence", s: it.s, type: typeFor(0, true), retry: true }); }
      }
      next();
    }, (fn) => (onEnter = fn));
  };
  const finish = () => {
    onEnter = null;
    document.body.classList.remove("focus"); document.querySelectorAll(".actionbar").forEach((e) => e.remove()); view.style.paddingBottom = "";
    const pct = Math.round((ok / Math.max(1, done)) * 100);
    const perfect = pct === 100 && done >= 8;
    if (perfect) xp += XP.perfect;
    if (daily) bump("session");
    bump("xp", xp);
    const days = store.get("days", {}); const d = today(); const log = Object.assign(emptyLog(), days[d] || {});
    log.items += done; log.ok += ok; days[d] = log; store.set("days", days);
    maybeAdvance(); beep(true);
    view.innerHTML = `<div class="card center pop" style="margin-top:10px"><div style="font-size:52px">${perfect ? "🏆" : pct >= 80 ? "🎉" : pct >= 60 ? "💪" : "🌱"}</div>
      <h2>${perfect ? "¡Sesión perfecta!" : pct >= 80 ? "¡Excelente sesión!" : pct >= 60 ? "¡Bien hecho!" : "Buen esfuerzo"}</h2>
      <div class="stats three" style="margin:14px 0 4px"><div class="stat"><b>${pct}%</b><span>aciertos</span></div><div class="stat"><b>⚡ ${xp}</b><span>XP ganados</span></div><div class="stat"><b>🔥 ${streak()}</b><span>racha</span></div></div></div>
      ${missed.length ? `<h3>Para repasar (ya están en tu cola)</h3><div class="list mistakes">${missed.map((s) => `<div class="row"><button class="mini say" data-t="${esc(s.en)}" aria-label="Escuchar">🔊</button><span class="grow"><span class="t">${esc(s.en)}</span><div class="d">${esc(s.es)}</div></span>
        <button class="mini star ${isSaved(s.en) ? "on" : ""}" data-en="${esc(s.en)}" data-es="${esc(s.es)}" aria-label="Guardar">⭐</button></div>`).join("")}</div>` : ""}
      <div class="btns">${daily && dayLog().story < 1 ? `<a class="btn" href="#/historias">Sigue: una historia</a>` : `<a class="btn" href="#/">Listo</a>`}
      ${missed.length ? `<a class="btn secondary" href="#/errores">Repasar errores</a>` : ""}</div>`;
    view.querySelectorAll(".say").forEach((b) => (b.onclick = () => speak(b.dataset.t)));
    view.querySelectorAll(".star").forEach((b) => (b.onclick = () => b.classList.toggle("on", toggleSaved(b.dataset.en, b.dataset.es, "sesión"))));
  };
  next();
}

function renderItem(it, ctx, cb, setEnter) {
  const { done, total, xp, combo } = ctx;
  const kind = it.kind === "sentence" ? it.type : it.kind;
  view.style.paddingBottom = "";
  view.innerHTML = `<div class="ex-top"><button class="x" id="quit" aria-label="Salir">✕</button>
      <div class="progress"><span style="width:${(done / total) * 100}%"></span></div><span class="xp-pill">${combo >= 3 ? "🔥" + combo + " " : ""}⚡ ${xp}</span></div>
    <div class="ex-kind">${TYPE_NAME[kind]}${it.retry ? ' <span class="again-tag">· otra vez</span>' : ""}</div><div id="body"></div>`;
  $("#quit").onclick = confirmQuit;
  document.querySelectorAll(".actionbar").forEach((e) => e.remove());
  const ab = document.createElement("div"); ab.className = "actionbar empty";
  ab.innerHTML = `<div class="ab-in"><div id="fbx" aria-live="polite"></div><div class="ab-btns" id="abb"></div></div>`;
  document.body.appendChild(ab);
  const body = $("#body");
  const setButtons = (html) => { $("#abb").innerHTML = html; ab.classList.toggle("empty", !html); };
  setEnter(null);
  let answered = false;
  const fit = () => { view.style.paddingBottom = ab.offsetHeight + 24 + "px"; };

  const feedback = (correct, html, opts = {}) => {
    if (answered) return; answered = true;
    beep(correct);
    body.querySelectorAll("button.opt, input").forEach((el) => (el.disabled = true)); body.querySelectorAll(".tile").forEach((el) => (el.style.pointerEvents = "none"));
    if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
    const s = it.kind === "sentence" ? it.s : null;
    const tKey = s ? s.topic : it.kind === "fix" ? it.fix.t : null;
    const tU = tKey ? topicOf(tKey) : null;
    if (s && window.speechSynthesis && !silent()) setTimeout(() => speak(s.en), 250);
    if (!correct) logError(it, opts.typed);
    let why = "";
    if (!correct) {
      const d = opts.exp && opts.typed ? diagnose(opts.exp, opts.typed) : [];
      if (d.length) why = `<div class="why"><div class="why-t">¿Por qué?</div><ul>${d.map((x) => `<li>${md(x)}</li>`).join("")}</ul></div>`;
    }
    ab.className = "actionbar " + (correct ? "ok" : "no");
    $("#fbx").innerHTML = `<div class="fb-title">${correct ? "✓ " + rand(PRAISE) : "✗ " + (opts.title || "No exactamente")}</div>
      <div class="fb-body">${!correct && opts.typed && opts.showTyped !== false ? `<div class="cmp"><span class="lab">Tu respuesta</span><s>${esc(opts.typed)}</s></div>` : ""}${html || ""}${why}</div>
      <div class="fb-tools">${!correct && tU ? `<button class="tool learn" id="t-learn">📖 Explicación completa</button>` : ""}${!correct && tU ? `<button class="tool learn" id="t-more">🔁 Practicar esto ahora</button>` : ""}
      ${s ? `<button class="tool ic" id="t-say" aria-label="Escuchar">🔊</button><button class="tool ic ${isSaved(s.en) ? "on" : ""}" id="t-save" aria-label="Guardar">⭐</button><button class="tool ic" id="t-flag" aria-label="Reportar">🚩</button>` : ""}</div>`;
    setButtons(`${opts.dispute ? `<button class="btn secondary sm" id="disp">Mi respuesta era correcta</button>` : ""}<button class="btn ${correct ? "easy" : "again"}" id="nx">Continuar</button>`);
    let final = correct;
    const go_ = () => { setEnter(null); cb(final); };
    $("#nx").onclick = go_; setEnter(go_);
    if ($("#t-learn")) $("#t-learn").onclick = () => openFicha(tKey);
    if ($("#t-more")) $("#t-more").onclick = (e) => {
      const more = pick(SENTENCES.filter((x) => x.topic === tKey && (!s || x.id !== s.id)), 3).map((x) => ({ kind: "sentence", s: x, type: typeFor(1) }));
      if (ctx.inject) ctx.inject(more);
      e.currentTarget.textContent = `✓ ${more.length} ejercicios agregados`; e.currentTarget.disabled = true;
    };
    if (s) {
      $("#t-say").onclick = () => speak(s.en);
      $("#t-save").onclick = (e) => e.currentTarget.classList.toggle("on", toggleSaved(s.en, s.es, tU ? tU.title : ""));
      $("#t-flag").onclick = (e) => { logTo("flags", { id: s.id, en: s.en, type: kind, typed: opts.typed || "" }); e.currentTarget.textContent = "✓"; e.currentTarget.disabled = true; toast("Gracias. Va en tu próximo reporte para Claude"); };
    }
    if (opts.dispute) $("#disp").onclick = () => {
      logTo("disputes", { id: s.id, en: s.en, typed: opts.typed || "" }); final = true;
      const l = errLog(); l.pop(); store.set("errlog", l);
      ab.className = "actionbar ok"; $("#fbx .fb-title").textContent = "✓ Aceptada"; $("#disp").remove(); $("#nx").className = "btn easy";
      toast("Se la mando a Claude para agregarla como válida");
    };
    requestAnimationFrame(fit);
  };
  const sol = (s) => `<div class="sol"><b>${esc(s.en)}</b><br><span class="muted">${esc(s.es)}</span></div>`;
  const bindAudio = (text) => { $("#pl").onclick = () => speak(text); $("#sl").onclick = () => speak(text, true); if (!silent()) setTimeout(() => speak(text), 350); };

  if (it.kind === "fix") {
    const f = it.fix;
    const strip = (w) => w.replace(/[.,!?]/g, "");
    const words = f.w.split(" "), badW = f.bad.split(" ");
    const start = words.findIndex((w, i) => badW.every((b, k) => strip(words[i + k] || "") === b));
    const badIdx = new Set(badW.map((_, k) => start + k));
    body.innerHTML = `<p class="prompt-es">Esta oración tiene un error típico de hispanohablantes. Toca la palabra que está mal.</p><div class="tiles fixw" id="fw">${words.map((w, i) => `<button class="tile" data-i="${i}">${esc(w)}</button>`).join("")}</div>`;
    $("#fw").onclick = (e) => {
      const b = e.target.closest(".tile"); if (!b || answered) return;
      const ok = badIdx.has(Number(b.dataset.i));
      body.querySelectorAll(".tile").forEach((t) => badIdx.has(Number(t.dataset.i)) && t.classList.add("right"));
      if (!ok) b.classList.add("wrong");
      feedback(ok, `<div class="cmp"><span class="lab">Correcta</span><b>${esc(f.r)}</b></div>
        <div class="why"><div class="why-t">${ok ? "Por qué estaba mal" : `El error era «${esc(f.bad)}»`}</div><p>${md(f.why)}</p></div>
        ${f.ex && f.ex.length ? `<div class="ex-list"><div class="why-t">Más ejemplos correctos</div>${f.ex.map((x) => `<button class="speak inline ex-say" data-t="${esc(x.replace(/\s*\(.*\)$/, ""))}">${esc(x)}</button>`).join("")}</div>` : ""}`, { typed: strip(b.textContent), showTyped: false });
      view.querySelectorAll(".ex-say").forEach((x) => (x.onclick = () => speak(x.dataset.t)));
      document.querySelectorAll(".actionbar .ex-say").forEach((x) => (x.onclick = () => speak(x.dataset.t)));
    };
    return;
  }
  if (it.kind === "match") {
    const items = it.words;
    const col = (side, arr) => arr.map((x) => `<button class="mt" data-side="${side}" data-i="${x.i}">${esc(x.t)}</button>`).join("");
    body.innerHTML = `<p class="prompt-es">Toca una palabra y luego su traducción.</p>
      <div class="match"><div>${col("l", shuffle(items.map((w, i) => ({ t: w.en, i }))))}</div><div>${col("r", shuffle(items.map((w, i) => ({ t: w.es, i }))))}</div></div>`;
    let sel = null, got = 0, miss = 0;
    body.querySelector(".match").onclick = (e) => {
      const b = e.target.closest(".mt"); if (!b || b.disabled || answered) return;
      if (!sel || sel.dataset.side === b.dataset.side) { if (sel) sel.classList.remove("sel"); sel = b; b.classList.add("sel"); return; }
      if (sel.dataset.i === b.dataset.i) {
        [sel, b].forEach((x) => { x.classList.remove("sel"); x.classList.add("ok"); x.disabled = true; }); sel = null; got++;
        if (got === items.length) feedback(miss <= 1, `${miss ? miss + (miss === 1 ? " intento fallido." : " intentos fallidos.") : "¡Sin errores!"}<div class="muted small" style="margin-top:6px">${items.map((w) => `${esc(w.en)} = ${esc(w.es)}`).join(" · ")}</div>`);
      } else {
        miss++; const a = sel; sel = null; [a, b].forEach((x) => x.classList.add("bad"));
        setTimeout(() => [a, b].forEach((x) => x.classList.remove("bad", "sel")), 450);
      }
    };
    return;
  }
  if (it.kind === "word") {
    const w = it.w, rev = it.rev;
    const others = pick(VOCAB_LIST.filter((x) => x.cat === w.cat && x.en !== w.en && x.es !== w.es), 3);
    body.innerHTML = `<div class="prompt">${esc(rev ? w.es : w.en)}</div><p class="prompt-es">${rev ? "¿Cómo se dice en inglés?" : "¿Qué significa?"} · ${esc(w.cat)}</p>
      <div id="op">${shuffle([w, ...others]).map((o) => `<button class="opt" data-en="${esc(o.en)}">${esc(rev ? o.en : o.es)}</button>`).join("")}</div>`;
    $("#op").onclick = (e) => {
      const b = e.target.closest(".opt"); if (!b || answered) return;
      const correct = b.dataset.en === w.en;
      body.querySelectorAll(".opt").forEach((o) => o.dataset.en === w.en && o.classList.add("right"));
      if (!correct) b.classList.add("wrong");
      feedback(correct, `<b>${esc(w.en)}</b> = ${esc(w.es)} <button class="speak inline" id="ws">🔊</button>`);
      $("#ws").onclick = () => speak(w.en.replace(/^to /, ""));
    };
    return;
  }

  if (it.kind === "pair") {
    const [w1, w2, e1, e2] = it.pair; const target = Math.random() < 0.5 ? w1 : w2;
    body.innerHTML = `<p class="prompt-es">Escucha con atención: son casi iguales.</p>${audioBtns()}
      <div id="op">${shuffle([[w1, e1], [w2, e2]]).map(([w, e]) => `<button class="opt" data-w="${w}"><b>${w}</b> <span class="muted">· ${e}</span></button>`).join("")}</div>`;
    bindAudio(target);
    $("#op").onclick = (e) => {
      const b = e.target.closest(".opt"); if (!b || answered) return;
      const correct = b.dataset.w === target;
      body.querySelectorAll(".opt").forEach((o) => o.dataset.w === target && o.classList.add("right"));
      if (!correct) b.classList.add("wrong");
      feedback(correct, `Era <b>${target}</b>. Compara: <button class="speak inline" id="b1">🔊 ${w1}</button> <button class="speak inline" id="b2">🔊 ${w2}</button>`);
      $("#b1").onclick = () => speak(w1); $("#b2").onclick = () => speak(w2);
    };
    return;
  }

  const s = it.s;
  if (it.type === "listen" || it.type === "read") {
    const others = shuffle(SENTENCES.filter((x) => x.id !== s.id && Math.abs(x.unit - s.unit) <= 1)).slice(0, 2);
    body.innerHTML = (it.type === "read" ? `<div class="prompt">${esc(s.en)}</div><p class="prompt-es">¿Qué significa?</p>` : `<p class="prompt-es">¿Qué significa lo que oyes?</p>${audioBtns()}`)
      + `<div id="op">${shuffle([s, ...others]).map((o) => `<button class="opt" data-id="${o.id}">${esc(o.es)}</button>`).join("")}</div>`;
    if (it.type === "listen") bindAudio(s.en);
    $("#op").onclick = (e) => {
      const b = e.target.closest(".opt"); if (!b || answered) return;
      const correct = b.dataset.id === s.id;
      body.querySelectorAll(".opt").forEach((o) => o.dataset.id === s.id && o.classList.add("right"));
      if (!correct) b.classList.add("wrong");
      feedback(correct, sol(s), { typed: b.textContent, showTyped: !correct });
    };
  } else if (it.type === "tiles") {
    const words = s.en.replace(/[.,!?]/g, "").split(/\s+/);
    const other = SENTENCES.filter((x) => x.unit === s.unit && x.id !== s.id);
    const distract = other.length ? rand(other).en.replace(/[.,!?]/g, "").split(/\s+/).find((w) => !words.map((x) => x.toLowerCase()).includes(w.toLowerCase())) : null;
    const tiles = shuffle([...words, ...(distract ? [distract] : [])]).map((w, i) => ({ w, i }));
    let built = [];
    body.innerHTML = `<div class="prompt">${esc(s.es)}</div><p class="prompt-es">Toca las palabras en orden${distract ? " (sobra una)" : ""}.</p>
      <div class="built" id="bt"></div><div class="tiles" id="tl"></div>`;
    setButtons(`<button class="btn" id="ck" disabled>Revisar</button>`);
    const draw = () => {
      $("#bt").innerHTML = built.length ? built.map((t) => `<button class="tile" data-i="${t.i}">${esc(t.w)}</button>`).join("") : `<span class="ph">Tu respuesta aparece aquí</span>`;
      $("#tl").innerHTML = tiles.map((t) => `<button class="tile" data-i="${t.i}" ${built.includes(t) ? "disabled" : ""}>${esc(t.w)}</button>`).join("");
      if ($("#ck")) $("#ck").disabled = !built.length;
    };
    draw();
    $("#tl").onclick = (e) => { const b = e.target.closest(".tile"); if (!b || answered || b.disabled) return; built.push(tiles.find((t) => t.i === Number(b.dataset.i))); draw(); };
    $("#bt").onclick = (e) => { const b = e.target.closest(".tile"); if (!b || answered) return; built = built.filter((t) => t.i !== Number(b.dataset.i)); draw(); };
    const check = () => {
      if (answered || !built.length) return;
      const typed = built.map((t) => t.w).join(" ");
      const correct = norm(typed).join(" ") === norm(s.en).join(" ");
      feedback(correct, correct ? sol(s) : `${diffHtml(compare(s.en, typed))}${sol(s)}${ruleFor(s)}`, { typed, exp: s.en });
    };
    $("#ck").onclick = check; setEnter(check);
  } else if (it.type === "cloze" || it.type === "translate" || it.type === "dictation") {
    let hintLvl = 0;
    body.innerHTML = (it.type === "cloze" ? `<div class="prompt">${esc(s.cloze).replace("____", '<span class="acc">____</span>')}</div><p class="prompt-es">${esc(s.es)}</p>`
      : it.type === "translate" ? `<div class="prompt">${esc(s.es)}</div><p class="prompt-es">Escríbelo en inglés.</p>`
      : `<p class="prompt-es">Escribe exactamente lo que oyes.</p>${audioBtns()}`)
      + `<input type="text" id="an" placeholder="${it.type === "cloze" ? "La palabra que falta" : "Escribe en inglés..."}" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" enterkeyhint="done">
      ${it.type !== "dictation" ? `<button class="speak" id="hint">💡 Pista</button>` : ""}<p class="hint-box" id="hn"></p>`;
    setButtons(`<button class="btn secondary" id="idk" style="flex:.6">No sé</button><button class="btn" id="ck" disabled>Revisar</button>`);
    if (it.type === "dictation") bindAudio(s.en);
    const hintBtn = $("#hint");
    if (hintBtn) hintBtn.onclick = () => {
      hintLvl++;
      const target = it.type === "cloze" ? s.target : s.en;
      const words = target.split(" ");
      if (hintLvl === 1) $("#hn").textContent = it.type === "cloze" ? `Empieza con «${target[0]}» · ${target.length} letras` : `${words.length} palabras · empieza con «${words[0]}»`;
      else { $("#hn").textContent = words.map((w) => w[0] + w.slice(1).replace(/[a-z]/gi, "_")).join(" "); hintBtn.remove(); }
    };
    $("#an").oninput = (e) => { $("#ck").disabled = !e.target.value.trim(); };
    const check = (giveUp) => {
      if (answered) return;
      const val = giveUp ? "" : $("#an").value;
      if (!giveUp && !val.trim()) return;
      let correct, html, opts = { typed: val, exp: it.type === "cloze" ? s.target : s.en };
      if (it.type === "cloze") {
        correct = norm(val).length > 0 && (norm(val).join(" ") === norm(s.target).join(" ") || norm(s.cloze.replace("____", val)).join(" ") === norm(s.en).join(" "));
        html = `${correct ? "" : `Faltaba: <b>${esc(s.target)}</b>`}${sol(s)}${correct ? "" : ruleFor(s)}`;
      } else if (it.type === "translate") {
        const r = bestMatch(val, [s.en, ...s.alts]); correct = r.pct >= 85; opts.exp = r.a;
        html = (correct && r.pct < 100 ? "Casi perfecto, fíjate en lo subrayado." : "") + (val ? diffHtml(compare(r.a, val)) : "") + sol(s) + (correct ? "" : ruleFor(s));
        if (!correct && val.trim()) opts.dispute = true;
        if (!correct && r.pct >= 60) opts.title = "Casi";
      } else {
        const r = compare(s.en, val); correct = r.pct >= 85;
        html = (val ? diffHtml(r) : "") + sol(s);
        if (!correct && r.pct >= 60) opts.title = "Casi";
        if (!correct && val.trim()) opts.dispute = true;
        if (correct) bump("dict");
      }
      if (hintLvl && correct) html = `<span class="muted small">Con pista 💡 · </span>` + html;
      feedback(correct, html, opts);
    };
    $("#ck").onclick = () => check(false); $("#idk").onclick = () => check(true);
    $("#an").addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); check(false); } });
  } else if (it.type === "speak") {
    body.innerHTML = `<div class="prompt">${esc(s.en)}</div><p class="prompt-es">${esc(s.es)}</p>${audioBtns()}
      <p class="sub center">Escúchala y repítela en voz alta 3 veces, imitando el ritmo.</p>
      ${SR ? `<button class="btn good" id="mic">🎤 Decirla y que me califique</button><p class="muted small center" id="heard" style="margin-top:10px">El micrófono necesita internet.</p>` : ""}`;
    bindAudio(s.en);
    setButtons(`<button class="btn" id="self">Ya la dije 3 veces</button>`);
    const self = () => { bump("speak"); feedback(true, "Sigue imitando el ritmo y la entonación."); };
    $("#self").onclick = self; setEnter(self);
    if (SR) $("#mic").onclick = () => {
      $("#heard").textContent = "🎙️ Escuchando...";
      listenOnce((alts) => {
        const said = alts[0] || ""; const r = compare(s.en, said);
        $("#heard").innerHTML = `Entendí: «${esc(said)}» · ${r.pct}%`;
        if (r.pct >= 75) { bump("speak"); feedback(true, diffHtml(r)); }
        else { beep(false); $("#heard").innerHTML += "<br>Inténtalo otra vez, más despacio y marcando cada palabra."; }
      }, (err) => { $("#heard").textContent = err === "not-allowed" ? "Permite el micrófono o usa «Ya la dije»." : "No se pudo usar el micrófono (¿sin internet?). Usa «Ya la dije»."; });
    };
  }
}

/* ---------- Rutas de práctica ---------- */
routes.sesion = () => runSession(buildDaily(), "Sesión del día", true);
routes.rapida = () => runSession(buildDaily(6), "Sesión rápida", true);
routes.silenciosa = () => { setProfile({ silent: true }); runSession(buildDaily(), "Sesión silenciosa", true); };
routes.parejas = (cat) => runSession(Array.from({ length: 5 }, () => matchItem(cat ? decodeURIComponent(cat) : null)), "Parejas", false);
routes.corrige = () => runSession(pick(FIX2, 10).map(fixItem), "Corrige el error", false);
routes.palabras = (cat) => {
  if (cat === undefined) {
    setTitle("¿Qué significa?", true);
    const cats = Object.keys(VOCAB);
    view.innerHTML = `<p class="sub">Vocabulario sin audio: lee la palabra y elige su significado. 12 preguntas por ronda.</p>
      <div class="list"><a class="row" href="#/palabras/todas"><span class="emoji">🎲</span><span class="grow"><span class="t">Todas mezcladas</span><div class="d">${VOCAB_LIST.length} palabras</div></span><span class="chev">›</span></a>
      ${cats.map((c) => `<a class="row" href="#/palabras/${encodeURIComponent(c)}"><span class="emoji">📦</span><span class="grow"><span class="t">${esc(c)}</span><div class="d">${VOCAB_LIST.filter((w) => w.cat === c).length} palabras · <span class="acc" data-p="${esc(c)}">jugar parejas</span></div></span><span class="chev">›</span></a>`).join("")}</div>`;
    view.querySelectorAll("[data-p]").forEach((x) => (x.onclick = (e) => { e.preventDefault(); go("#/parejas/" + encodeURIComponent(x.dataset.p)); }));
    return;
  }
  const c = decodeURIComponent(cat); const pool = c === "todas" ? VOCAB_LIST : VOCAB_LIST.filter((w) => w.cat === c);
  runSession(pick(pool, 12).map(wordItem), c === "todas" ? "Vocabulario" : c, false);
};
routes.errores = () => runSession(buildErrors(), "Mis errores", false);
routes.sonidos = () => runSession(Array.from({ length: 12 }, pairItem), "Sonidos difíciles", false);

routes.practicar = () => {
  setTitle("Practicar", false);
  const best = store.get("best", {});
  const row = (h, e, t, d) => `<a class="row" href="${h}"><span class="emoji">${e}</span><span class="grow"><span class="t">${t}</span><div class="d">${d}</div></span><span class="chev">›</span></a>`;
  view.innerHTML = `
    <h3 style="margin-top:4px">Lo principal</h3>
    <div class="list">
      ${row("#/sesion", "⚡", "Sesión del día", `${sessionSize()} ejercicios de tu tema y tus errores`)}
      ${row("#/rapida", "⏳", "Sesión rápida", "6 ejercicios · cuenta para tu reto en días pesados")}
      ${row("#/historias", "📖", "Lecturas", `${STORIES.length} historias · toca cualquier palabra para ver qué significa`)}
    </div>
    <h3>🤫 En la calle (sin audio ni hablar)</h3>
    <div class="list">
      ${row("#/silenciosa", "🤫", "Sesión silenciosa", "Tu sesión solo con lectura y escritura")}
      ${row("#/corrige", "🕵️", "Corrige el error", `${FIX2.length} errores típicos, cada uno explicado`)}
      ${row("#/parejas", "🧩", "Parejas", "Une palabras con su traducción")}
      ${row("#/palabras", "🔤", "¿Qué significa?", `${VOCAB_LIST.length} palabras por temas`)}
      ${row("#/quiz", "✅", "Quiz de gramática", "Opción múltiple con explicación")}
      ${row("#/contrarreloj", "⏱️", "Contrarreloj de verbos", `Récord: ${best.rush || 0} en 60 s`)}
    </div>
    <h3>🎧 Con audio</h3>
    <div class="list">
      ${row("#/sonidos", "👂", "Sonidos difíciles", "Pares mínimos para entrenar el oído")}
      ${row("#/dictado", "🎧", "Dictado libre", "Oraciones de A1 a B2")}
      ${row("#/repite", "🗣️", "Escucha y repite", "Shadowing con micrófono")}
      ${row("#/hablar", "🎤", "Habla 1 minuto", "Situaciones reales con frases de apoyo")}
    </div>`;
};

routes.guardadas = () => {
  setTitle("Mis frases", true);
  const l = savedList();
  if (!l.length) { view.innerHTML = `<div class="card center"><div class="big">⭐</div><h2>Aún no guardas frases</h2><p class="sub">Toca ⭐ en un ejercicio o en una línea de historia para guardar las frases que quieras usar.</p><a class="btn" href="#/historias">Ir a historias</a></div>`; return; }
  view.innerHTML = `<a class="btn" href="#/estudiar/mias">Repasar como tarjetas</a>
    <h3>${l.length} frases</h3><div class="list mistakes">${l.slice().reverse().map((x) => `<div class="row"><button class="mini say" data-t="${esc(x.en)}" aria-label="Escuchar">🔊</button>
      <span class="grow"><span class="t">${esc(x.en)}</span><div class="d">${esc(x.es)}</div></span><button class="mini del" data-en="${esc(x.en)}" aria-label="Quitar">✕</button></div>`).join("")}</div>`;
  view.querySelectorAll(".say").forEach((b) => (b.onclick = () => speak(b.dataset.t)));
  view.querySelectorAll(".del").forEach((b) => (b.onclick = () => { toggleSaved(b.dataset.en); render(); }));
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
    <p class="sub" style="margin-top:12px">Toca una <b>palabra</b> para ver qué significa · 🔊 para oír la línea · <b>ES</b> para la traducción · ⭐ para guardarla.</p>
    <div class="card story">${st.lines.map(([en, es], i) => `<div class="line"><span class="en" data-i="${i}">${esc(en).split(" ").map((w) => `<span class="w">${w}</span>`).join(" ")}</span>
      <button class="mini say-l" data-i="${i}" aria-label="Escuchar">🔊</button><button class="mini es-t" data-i="${i}">ES</button><button class="mini star ${isSaved(en) ? "on" : ""}" data-i="${i}" aria-label="Guardar">⭐</button><div class="es" id="es${i}" hidden>${esc(es)}</div></div>`).join("")}</div>
    <h3>Preguntas</h3><div id="qs"></div>`;
  $("#all").onclick = () => speakAll(st.lines.map((l) => l[0]));
  $("#stop").onclick = () => speechSynthesis.cancel();
  view.querySelectorAll(".say-l").forEach((el) => (el.onclick = () => { view.querySelectorAll(".en").forEach((x) => x.classList.remove("playing")); el.parentElement.querySelector(".en").classList.add("playing"); speak(st.lines[Number(el.dataset.i)][0]); }));
  view.querySelectorAll(".story .w").forEach((el) => (el.onclick = () => { view.querySelectorAll(".w.on").forEach((x) => x.classList.remove("on")); el.classList.add("on"); showWord(el.textContent); }));
  cleanup = () => document.querySelectorAll(".wpop").forEach((x) => x.remove());
  view.querySelectorAll(".star").forEach((b) => (b.onclick = () => { const [en, es] = st.lines[Number(b.dataset.i)]; b.classList.toggle("on", toggleSaved(en, es, st.title)); }));
  view.querySelectorAll(".es-t").forEach((b) => (b.onclick = () => { const e = $("#es" + b.dataset.i); e.hidden = !e.hidden; }));
  let answered = 0, right = 0;
  $("#qs").innerHTML = st.q.map(([q, opts], k) => `<div class="card"><div class="t" style="margin-bottom:8px">${esc(q)}</div>
    <div data-k="${k}">${opts.map((o, j) => `<button class="opt" data-j="${j}">${esc(o)}</button>`).join("")}</div></div>`).join("");
  $("#qs").onclick = (e) => {
    const b = e.target.closest(".opt"); if (!b) return; const box = b.parentElement; if (box.dataset.done) return;
    box.dataset.done = 1; const k = Number(box.dataset.k), ans = st.q[k][2];
    box.querySelectorAll(".opt").forEach((o) => Number(o.dataset.j) === ans && o.classList.add("right"));
    if (Number(b.dataset.j) !== ans) { b.classList.add("wrong"); beep(false); } else { right++; beep(true); }
    if (st.q[k][3]) { const ex = document.createElement("div"); ex.className = "feedback " + (Number(b.dataset.j) === ans ? "ok" : "no"); ex.innerHTML = md(st.q[k][3]); box.appendChild(ex); }
    answered++;
    if (answered === st.q.length) {
      const r = store.get("stories", {}); r[st.id] = Math.max(r[st.id] || 0, right); store.set("stories", r);
      bump("story"); bump("xp", XP.story + right * 5);
      const d = document.createElement("div");
      d.innerHTML = `<div class="feedback ${right === st.q.length ? "ok" : "no"}"><b>${right}/${st.q.length}.</b> ${right === st.q.length ? "¡Entendiste todo!" : "Vuelve a escucharla mañana: la segunda vez se entiende mucho más."}</div><a class="btn" href="#/">Volver al inicio</a>`;
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
  const icons = { mias: "⭐", verbos: "🔁", frases: "💬", ti: "💻", phrasal: "🧩", falsos: "⚠️" };
  view.innerHTML = `<p class="sub">Piensa la respuesta antes de voltear. Las que fallas vuelven pronto.</p>
    <div class="list">${deckKeys().map((k) => [k, deckOf(k)]).map(([k, d]) => {
      const n = dueCards(k).length + newCards(k).length;
      const learned = d.cards.filter((c) => (srsAll()[c.id] || {}).box >= 3).length;
      return `<a class="row" href="#/estudiar/${k}"><span class="emoji">${icons[k]}</span><span class="grow"><span class="t">${d.name}</span><div class="d">${d.desc} · ${learned}/${d.cards.length} dominadas</div></span>
        <span class="badge ${n ? "" : "done"}">${n ? `${n} hoy` : "✓ al día"}</span></a>`;
    }).join("")}</div>`;
};
routes.estudiar = (k) => {
  const deck = deckOf(k); if (!deck || !deck.cards.length) return go("#/tarjetas");
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
      gradeCard(c, g); queue.shift(); if (g === 0) queue.push(c); else { done++; bump("cards"); bump("xp", XP.card); } show();
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
      const ok = Number(b.dataset.k) === ans; beep(ok); if (ok) { score++; bump("quiz"); bump("xp", XP.quiz); } else b.classList.add("wrong");
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

/* ---------- Guía completa (offline) ---------- */
const GUIDE_ICONS = ["🧭", "🧱", "⏳", "🔁", "🧩", "💬", "📝"];
const guideTitle = (i) => GUIDE_DOCS[i][0].replace(/^\d+ · /, "");
const guideCache = {};
async function loadGuide(i) {
  if (guideCache[i]) return guideCache[i];
  const r = await fetch(`guias/g${i}.html`); if (!r.ok) throw new Error("no");
  return (guideCache[i] = await r.text());
}
routes.guias = () => {
  setTitle("Guía completa", true);
  const pos = store.get("guidePos", {}); const last = store.get("guideLast", null);
  view.innerHTML = `<p class="sub">Las 7 partes de tu guía, dentro de la app. Abren al instante y sin internet.</p>
    ${last !== null && GUIDE_DOCS[last] ? `<a class="card notice" href="#/guia/${last}"><div class="muted small">Continuar leyendo</div><div class="t">${GUIDE_ICONS[last]} ${esc(guideTitle(last))}</div></a>` : ""}
    <div class="list">${GUIDE_DOCS.map((g, i) => `<a class="row" href="#/guia/${i}"><span class="emoji">${GUIDE_ICONS[i]}</span>
      <span class="grow"><span class="t">${String(i).padStart(2, "0")} · ${esc(guideTitle(i))}</span>${pos[i] ? `<div class="progress thin"><span style="width:${pos[i].pct || 0}%"></span></div>` : ""}</span><span class="chev">›</span></a>`).join("")}</div>`;
};
routes.guia = (n) => {
  const i = Math.max(0, Math.min(GUIDE_DOCS.length - 1, Number(n) || 0));
  setTitle(guideTitle(i), true);
  store.set("guideLast", i);
  view.innerHTML = `<div class="center muted" style="padding:40px 0">Cargando...</div>`;
  loadGuide(i).then((html) => {
    view.innerHTML = `<div class="guide-head"><div class="muted small">Parte ${i + 1} de ${GUIDE_DOCS.length}</div><h2>${GUIDE_ICONS[i]} ${esc(guideTitle(i))}</h2>
      <details class="toc"><summary>📑 Índice</summary><div id="toc"></div></details>
      <p class="muted small" style="margin:6px 0 0">Toca cualquier ejemplo en <i>cursiva</i> para escucharlo.</p></div>
      <article class="guide" id="gd">${html}</article>
      <div class="btns">${i > 0 ? `<a class="btn secondary" href="#/guia/${i - 1}">‹ Anterior</a>` : ""}${i < GUIDE_DOCS.length - 1 ? `<a class="btn" href="#/guia/${i + 1}">Siguiente ›</a>` : `<a class="btn" href="#/guias">Volver al índice</a>`}</div>
      <button class="fab" id="top" aria-label="Ir arriba" hidden>↑</button>`;
    const gd = $("#gd");
    $("#toc").innerHTML = [...gd.querySelectorAll("h2")].map((h) => `<button class="toc-i" data-id="${h.id}">${esc(h.textContent)}</button>`).join("");
    $("#toc").onclick = (e) => { const b = e.target.closest(".toc-i"); if (!b) return; document.getElementById(b.dataset.id).scrollIntoView({ behavior: "smooth" }); b.closest("details").open = false; };
    gd.onclick = (e) => {
      const it = e.target.closest("i, em");
      if (it && /[a-z]/i.test(it.textContent) && !/[áéíóúñ¿¡]/i.test(it.textContent)) { it.classList.add("saying"); speak(it.textContent.replace(/\.\.\./g, "")); setTimeout(() => it.classList.remove("saying"), 1200); return; }
      const img = e.target.closest("figure img");
      if (img) {
        const m = document.createElement("div"); m.className = "zoom"; m.innerHTML = `<img src="${img.getAttribute("src")}" alt=""><button class="btn secondary sm" aria-label="Cerrar">Cerrar</button>`;
        document.body.appendChild(m); m.onclick = (ev) => { if (ev.target.tagName !== "IMG") m.remove(); };
      }
    };
    const pos = store.get("guidePos", {});
    if (pos[i] && pos[i].y > 200) {
      const y = pos[i].y; const b = document.createElement("button"); b.className = "resume"; b.textContent = "↓ Seguir donde te quedaste";
      b.onclick = () => { window.scrollTo({ top: y, behavior: "smooth" }); b.remove(); }; view.prepend(b); setTimeout(() => b.remove(), 8000);
    }
    let tick = 0;
    const onScroll = () => {
      if ($("#top")) $("#top").hidden = window.scrollY < 600;
      if (Date.now() - tick < 800) return; tick = Date.now();
      const max = document.documentElement.scrollHeight - innerHeight;
      const p = store.get("guidePos", {}); p[i] = { y: Math.round(scrollY), pct: Math.min(100, Math.round((scrollY / Math.max(1, max)) * 100)) }; store.set("guidePos", p);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    cleanup = () => { window.removeEventListener("scroll", onScroll); document.querySelectorAll(".zoom").forEach((z) => z.remove()); };
    $("#top").onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });
  }).catch(() => { view.innerHTML = `<div class="card center"><h2>No se pudo abrir</h2><p class="sub">Abre la app una vez con internet para que se guarde la guía.</p><a class="btn" href="#/guias">Volver</a></div>`; });
};

/* ---------- Consulta ---------- */
routes.consulta = () => {
  setTitle("Consulta", false);
  view.innerHTML = `<a class="row" href="#/guias" style="margin-bottom:14px"><span class="emoji">📚</span><span class="grow"><span class="t">Guía completa (7 partes)</span><div class="d">Gramática, verbos, vocabulario y exámenes · funciona sin internet</div></span><span class="chev">›</span></a>
    <input type="search" id="q" placeholder="Buscar verbo en inglés o español..." autocomplete="off">
    <h3>Verbos irregulares <span class="muted small">(toca para escuchar)</span></h3>
    <div class="card" style="padding:4px 12px"><table><thead><tr><th>Base</th><th>Pasado</th><th>Participio</th></tr></thead><tbody id="vt"></tbody></table></div>
    <h3>Las ideas clave de cada unidad</h3>
    <div class="list">${UNITS.map((u) => `<a class="row" href="#/unidad/${u.id}"><span class="unum">${u.id}</span><span class="grow"><span class="t">${esc(u.title)}</span><div class="d">${u.level}</div></span></a>`).join("")}</div>
    <h3>Los tiempos verbales</h3>
    <div class="card" style="padding:4px 12px"><table><tbody>${TENSES.map(([n, ex, u]) => `<tr><td><b>${n}</b><br><span class="muted small">${u}</span></td><td>${esc(ex)}</td></tr>`).join("")}</tbody></table></div>
`;
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
/* ---------- Exportar / importar progreso (JSON) ---------- */
const DATA_KEYS = ["days", "sent", "srs", "best", "stories", "profile", "rate", "newCount", "saved", "disputes", "flags", "notes", "lastExport", "errlog", "read"];
const EXPORT_EVERY = 7;
const daysBetween = (a, b) => { const p = (s) => { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); }; return Math.round((p(b) - p(a)) / 86400000); };
function buildExport() {
  const days = store.get("days", {}), st = sstate(), p = profile(), srs = srsAll();
  const week = Array.from({ length: 7 }, (_, k) => days[addDays(today(), -k)]).filter(Boolean);
  const items = week.reduce((n, d) => n + (d.items || 0), 0), ok = week.reduce((n, d) => n + (d.ok || 0), 0);
  const data = {}; DATA_KEYS.forEach((k) => { const v = store.get(k, undefined); if (v !== undefined) data[k] = v; });
  return {
    app: "ingles-diario", version: 4, exported: new Date().toISOString(),
    paraClaude: {
      notas: store.get("notes", ""),
      respuestasQueDiceQueSonCorrectas: store.get("disputes", []).slice(-30),
      reportesDeProblemas: store.get("flags", []).slice(-30),
      frasesGuardadas: savedList().map((x) => x.en),
      temasQueMasFalla: topicErrorCounts(30).map(([k, n]) => `${(topicOf(k) || { title: k }).title}: ${n}`),
      erroresRecientes: errLog().slice(-25).map((e) => `${e.exp} ← ${e.typed || "(no supo)"}`),
      fichasLeidas: Object.keys(store.get("read", {})),
    },
    summary: {
      nombre: p.name, metas: p.goals, intereses: p.interests, minutosAlDia: p.minutes, xpTotal: totalXP(),
      level: p.level, diagnostico: p.diag, unidadActual: curUnit(), unidadTitulo: UNITS[curUnit() - 1].title,
      racha: streak(), diasActivosSemana: week.length, ejerciciosSemana: items, aciertosSemanaPct: items ? Math.round((ok / items) * 100) : 0,
      diasPracticadosTotal: Object.values(days).filter((d) => d.items || d.cards || d.story || d.quiz).length,
      dominioPorUnidad: Object.fromEntries(UNITS.map((u) => ["U" + u.id, unitMastery(u.id)])),
      masFalladas: SENTENCES.filter((s) => st[s.id] && st[s.id].wrong > 0).sort((a, b) => st[b.id].wrong - st[a.id].wrong).slice(0, 15)
        .map((s) => ({ id: s.id, unidad: s.unit, en: s.en, fallos: st[s.id].wrong, nivel: st[s.id].lvl })),
      historias: store.get("stories", {}), recordContrarreloj: (store.get("best", {}).rush) || 0,
      tarjetasDominadas: Object.fromEntries(Object.keys(DECKS).map((k) => [k, DECKS[k].cards.filter((c) => (srs[c.id] || {}).box >= 3).length])),
    },
    data,
  };
}
const exportName = () => `ingles-progreso-${today()}.json`;
const markExported = () => store.set("lastExport", today());
async function shareExport() {
  const json = JSON.stringify(buildExport(), null, 1);
  const file = new File([json], exportName(), { type: "application/json" });
  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    try { await navigator.share({ files: [file], title: "Progreso de inglés" }); markExported(); toast("¡Listo! Mándaselo a Claude"); return; }
    catch (e) { if (e && e.name === "AbortError") return; }
  }
  const url = URL.createObjectURL(file); const a = document.createElement("a");
  a.href = url; a.download = exportName(); document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 5000); markExported(); toast("Archivo guardado");
}
function importProgress(text, done) {
  let obj; try { obj = JSON.parse(text); } catch { return done("Ese archivo no es un JSON válido."); }
  if (!obj || obj.app !== "ingles-diario" || !obj.data) return done("Ese archivo no es un progreso de esta app.");
  DATA_KEYS.forEach((k) => { if (obj.data[k] !== undefined) store.set(k, obj.data[k]); else localStorage.removeItem("ing:" + k); });
  done(null, obj.exported ? obj.exported.slice(0, 10) : "");
}
function exportDue() {
  const last = store.get("lastExport", null);
  if (last) return daysBetween(last, today()) >= EXPORT_EVERY;
  return Object.values(store.get("days", {})).filter((d) => d.items || d.story).length >= 3;
}

routes.reporte = () => {
  setTitle("Enviar progreso a Claude", true);
  const txt = buildReport(); const last = store.get("lastExport", null);
  view.innerHTML = `
    <div class="card"><div class="t">Cada domingo, mándale tu progreso a Claude</div>
      <p class="sub" style="margin:6px 0 0">Con eso ajusta tu unidad, agrega oraciones e historias sobre lo que más fallas y sube la nueva versión a la app. También te sirve de respaldo.</p>
      <p class="muted small" style="margin:8px 0 0">${last ? `Último envío: ${last} (hace ${daysBetween(last, today())} días)` : "Aún no lo has enviado."}</p></div>
    <button class="btn" id="ex">📤 Exportar progreso (archivo JSON)</button>
    <p class="muted small center">Se abre el menú de compartir: elige la app de Claude o «Guardar en Archivos» y luego adjúntalo en el chat.</p>
    <button class="btn secondary" id="cj">Copiar JSON (si no puedes adjuntar)</button>
    <h3>Resumen rápido</h3>
    <pre class="report" id="rp">${esc(txt)}</pre><button class="btn secondary" id="cp">Copiar resumen</button>
    <h3>Notas para Claude</h3>
    <p class="sub">¿Qué quieres que mejore, agregue o cambie? Temas, ejercicios, algo que no funciona... Va dentro del archivo.</p>
    <textarea id="nt" placeholder="Ej.: quiero más frases para entrevistas de trabajo; el dictado va muy rápido...">${esc(store.get("notes", ""))}</textarea>
    <p class="muted small">${store.get("flags", []).length} reportes y ${store.get("disputes", []).length} respuestas marcadas como correctas van incluidos.</p>
    <h3>Restaurar</h3>
    <p class="sub">Si cambias de celular o borras la app, carga tu último archivo y recuperas todo.</p>
    <button class="btn ghost" id="im">📥 Cargar progreso desde archivo</button><input type="file" id="file" accept=".json,application/json" hidden>
    <p class="muted small center" id="msg"></p>`;
  const copy = async (s, el) => {
    try { await navigator.clipboard.writeText(s); $("#msg").textContent = "¡Copiado! Pégalo en el chat."; return true; }
    catch { if (el) { const r = document.createRange(); r.selectNodeContents(el); const sel = getSelection(); sel.removeAllRanges(); sel.addRange(r); } $("#msg").textContent = "No se pudo copiar automáticamente."; return false; }
  };
  $("#nt").oninput = (e) => store.set("notes", e.target.value);
  $("#ex").onclick = () => shareExport().then(() => setTimeout(render, 600));
  $("#cj").onclick = async () => { if (await copy(JSON.stringify(buildExport()))) markExported(); };
  $("#cp").onclick = () => copy(txt, $("#rp"));
  $("#im").onclick = () => $("#file").click();
  $("#file").onchange = (e) => {
    const f = e.target.files[0]; if (!f) return;
    f.text().then((t) => {
      $("#msg").innerHTML = `<div class="feedback no">Esto reemplaza tu progreso actual por el del archivo. ¿Seguro?</div><button class="btn again" id="yes">Sí, restaurar</button>`;
      $("#yes").onclick = () => importProgress(t, (err, when) => { if (err) { $("#msg").textContent = err; return; } toast(`Progreso restaurado${when ? " (" + when + ")" : ""}`); go("#/progreso"); });
    });
  };
};
routes.progreso = () => {
  setTitle("Progreso", false);
  const days = store.get("days", {}); const p = profile();
  const totalItems = Object.values(days).reduce((n, d) => n + (d.items || 0), 0);
  const totalOk = Object.values(days).reduce((n, d) => n + (d.ok || 0), 0);
  const t = today(); const WD = ["D", "L", "M", "M", "J", "V", "S"];
  const week = Array.from({ length: 7 }, (_, k) => addDays(t, k - 6)).map((d) => { const [y, m, dd] = d.split("-").map(Number); return { d, xp: (days[d] || {}).xp || 0, wd: WD[new Date(y, m - 1, dd).getDay()] }; });
  const maxXp = Math.max(30, ...week.map((w) => w.xp));
  const cells = [];
  for (let k = 27; k >= 0; k--) {
    const d = addDays(t, -k), log = days[d];
    const cls = log && log.done ? "full" : log && (log.items || log.cards || log.story || log.quiz) ? "part" : "";
    cells.push(`<span class="${cls}">${Number(d.slice(8))}</span>`);
  }
  const rate = store.get("rate", 0.9);
  const sw = (id, on, label, desc) => `<div class="setting"><span><span class="t">${label}</span><div class="muted small">${desc}</div></span><button class="switch ${on ? "on" : ""}" id="${id}" role="switch" aria-checked="${on}" aria-label="${label}"></button></div>`;
  view.innerHTML = `
    <a class="btn" href="#/reporte" style="margin-bottom:16px">📤 Enviar progreso a Claude / respaldo</a>
    <div class="stats">
      <div class="stat"><b>🔥 ${streak()}</b><span>días seguidos</span></div>
      <div class="stat"><b>⚡ ${totalXP()}</b><span>XP total</span></div>
      <div class="stat"><b>${totalItems}</b><span>ejercicios hechos</span></div>
      <div class="stat"><b>${totalItems ? Math.round((totalOk / totalItems) * 100) : 0}%</b><span>aciertos</span></div>
    </div>
    <h3>XP de los últimos 7 días</h3>
    <div class="card"><div class="bars">${week.map((w) => `<div><b>${w.xp || ""}</b><i class="${w.xp ? "" : "zero"}" style="height:${Math.max(4, (w.xp / maxXp) * 90)}px"></i>${w.d === t ? "Hoy" : w.wd}</div>`).join("")}</div></div>
    <h3>Últimas 4 semanas</h3>
    <div class="card"><div class="cal">${cells.join("")}</div><p class="muted small" style="margin:10px 0 0">Verde: reto completo · Naranja: practicaste algo</p></div>
    <h3>Dominio por unidad</h3>
    <div class="card">${UNITS.map((u) => { const m = unitMastery(u.id); return `<div style="margin-bottom:10px"><div class="counter" style="margin-bottom:4px"><span>${u.id}. ${esc(u.title)}</span><span>${m}%</span></div><div class="progress thin ${m >= 80 ? "good" : ""}" style="margin-top:0"><span style="width:${m}%"></span></div></div>`; }).join("")}</div>
    <h3>Ajustes</h3>
    <div class="card">
      <div class="setting"><span><span class="t">Tiempo al día</span><div class="muted small">${sessionSize()} ejercicios por sesión</div></span></div>
      <div class="chips">${[5, 10, 15, 20].map((m) => `<button class="chip ${p.minutes === m ? "on" : ""}" data-mn="${m}">${m} min</button>`).join("")}</div>
      <div class="setting"><span><span class="t">Velocidad de la voz</span></span></div>
      <div class="chips">${[[0.7, "Lenta"], [0.9, "Normal"], [1.05, "Rápida"]].map(([r, l]) => `<button class="chip ${Math.abs(rate - r) < 0.01 ? "on" : ""}" data-r="${r}">${l}</button>`).join("")}</div>
      ${sw("sil", p.silent, "Modo silencioso", "Para la calle: sin audio automático ni ejercicios de hablar o escuchar")}
      ${sw("snd", p.sound, "Sonidos", "Al acertar y fallar")}
      ${sw("bigt", p.big, "Letra grande", "Agranda toda la app")}
      <div class="setting"><span><span class="t">Nivel de inicio</span><div class="muted small">Diagnóstico ${esc(p.diag)}. Cambiarlo te mueve al inicio de ese nivel.</div></span></div>
      <div class="chips">${Object.keys(LEVEL_START).map((l) => `<button class="chip ${p.level === l ? "on" : ""}" data-lv="${l}">${l}</button>`).join("")}</div>
      <a class="btn secondary" href="#/bienvenida" style="margin-top:6px">Editar mi perfil (nombre, metas e intereses)</a>
    </div>
    <p class="muted small center" style="margin-top:14px">Versión ${APP_VERSION} · se actualiza sola cuando abres la app con internet</p>
    <h3>Zona de cuidado</h3>
    <p class="sub">Tu progreso vive solo en este celular. Exporta tu respaldo antes de borrar el ícono.</p>
    <button class="btn secondary" id="rs">Borrar mi progreso</button>`;
  view.querySelectorAll("[data-mn]").forEach((b) => (b.onclick = () => { setProfile({ minutes: Number(b.dataset.mn) }); render(); }));
  view.querySelectorAll("[data-lv]").forEach((b) => (b.onclick = () => { setProfile({ level: b.dataset.lv, unit: LEVEL_START[b.dataset.lv] }); toast(`Empiezas en ${b.dataset.lv}`); render(); }));
  view.querySelectorAll("[data-r]").forEach((b) => (b.onclick = () => { store.set("rate", Number(b.dataset.r)); speak("This is how I sound."); render(); }));
  $("#sil").onclick = () => { setProfile({ silent: !p.silent }); render(); };
  $("#snd").onclick = () => { setProfile({ sound: !p.sound }); if (!p.sound) beep(true); render(); };
  $("#bigt").onclick = () => { setProfile({ big: !p.big }); applyPrefs(); render(); };
  $("#rs").onclick = () => {
    const m = document.createElement("div"); m.className = "sheet-bg";
    m.innerHTML = `<div class="sheet"><h2>¿Borrar todo tu progreso?</h2><p class="sub" style="margin:0">Se borran tu racha, tu ruta, tus frases y tus récords. No se puede deshacer.</p>
      <button class="btn again" id="yes">Sí, borrar todo</button><button class="btn ghost" id="no">Cancelar</button></div>`;
    document.body.appendChild(m); m.querySelector("#no").onclick = () => m.remove();
    m.querySelector("#yes").onclick = () => { m.remove(); Object.keys(localStorage).filter((k) => k.startsWith("ing:")).forEach((k) => localStorage.removeItem(k)); toast("Progreso borrado"); render(); };
  };
};

/* ---------- v10: diagnóstico de errores ---------- */
const LEVEL_COLOR = { A1: "a1", A2: "a2", B1: "b1", B2: "b2" };
const topicOf = (key) => (typeof TOPIC_BY_KEY !== "undefined" ? TOPIC_BY_KEY[key] : null);
const PREPS = ["in", "on", "at", "of", "to", "for", "from", "with", "about", "by", "near", "under", "into"];
const PREP_TIPS = { depend: "*depend **on***", wait: "*wait **for***", married: "*married **to***", listen: "*listen **to***", look: "*look **at** / look **for***", interested: "*interested **in***", good: "*good **at***", arrive: "*arrive **at/in***", bus: "transporte público con **on**: *on the bus, on the train*; carro y taxi con **in**", train: "*on the train*", home: "*at home* (estar) y *go home* (ir)", table: "superficies con **on**: *on the table*", monday: "días con **on**", night: "*at night*, *in the morning*" };
function lev(a, b) {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[a.length][b.length];
}
const verbOfPast = (w) => VERBS.find((v) => v.past.split("/").includes(w) || v.pp.split("/").includes(w));
function pairRule(e, t, E) {
  const be = ["am", "is", "are"];
  if (be.includes(e) && be.includes(t) && E.includes("there")) return `Con **there** cuenta lo que sigue: singular → **there is**, plural → **there are**. Aquí va **${e}**.`;
  if (be.includes(e) && be.includes(t)) return `Con **I** va *am*, con **he/she/it** va *is* y con **you/we/they** va *are*. Aquí va **${e}**.`;
  if (["was", "were"].includes(e) && ["was", "were"].includes(t)) return `**was** con I/he/she/it y **were** con you/we/they. Aquí va **${e}**.`;
  if (["do", "does"].includes(e) && ["do", "does"].includes(t)) return `**does / doesn't** con he/she/it y **do / don't** con I/you/we/they. Aquí va **${e}**.`;
  if (["a", "an"].includes(e) && ["a", "an"].includes(t)) return `*a* o *an* depende del **sonido** de la palabra que sigue: **an** antes de vocal (*an app, an hour*), **a** antes de consonante (*a game, a user*).`;
  if (["this", "these", "that", "those"].includes(e) && ["this", "these", "that", "those"].includes(t)) return `**this/that** son singulares; **these/those** son plurales. Aquí va **${e}**.`;
  if (["much", "many"].includes(e) && ["much", "many"].includes(t)) return `**many** con cosas que se cuentan (players, friends); **much** con incontables (time, money). Aquí va **${e}**.`;
  if (["his", "her", "their", "its", "my", "your", "our"].includes(e) && ["his", "her", "their", "its", "my", "your", "our"].includes(t)) return `El posesivo depende del **dueño**: *his* (de él), *her* (de ella), *their* (de ellos), *its* (de una cosa). Aquí va **${e}**.`;
  if (PREPS.includes(e) && PREPS.includes(t)) {
    const tip = Object.keys(PREP_TIPS).find((k) => E.some((w) => w.startsWith(k)));
    return `Preposición: aquí va **${e}**, no *${t}*.` + (tip ? ` Recuerda: ${PREP_TIPS[tip]}.` : " Las preposiciones casi nunca se traducen palabra por palabra: apréndelas con su frase completa.");
  }
  if (e === t + "s" || e === t + "es" || (e.endsWith("ies") && t === e.slice(0, -3) + "y")) return `Falta la **-s**: **${e}**. Con **he/she/it** el verbo en presente lleva -s (*she work**s***), y los sustantivos en plural también.`;
  if (t === e + "s" || t === e + "es" || (t.endsWith("ies") && e === t.slice(0, -3) + "y")) return `Sobra la **-s**: va **${e}**. Después de *do/does/did/can/will* o con *I/you/we/they* el verbo va sin -s; los adjetivos nunca llevan -s.`;
  if (e.endsWith("ing") && (e.startsWith(t) || e.slice(0, -3) === t)) return `Falta el **-ing**: **${e}**. En presente continuo van juntos *am/is/are* + verbo**-ing**.`;
  const vE = verbOfPast(e), vT = verbOfPast(t);
  if (vT && vT.base === e) return `Después de **did / didn't / can / will / to** el verbo va en su **forma base**: **${e}**, no *${t}*. El pasado ya lo marca *did*.`;
  if (vE && vE.base === t) return `Aquí se necesita el **pasado**: **${e}** (de *${t}*). Es un verbo irregular, así que no termina en -ed.`;
  if (vE && t === vE.base + "ed") return `*${t}* no existe: **${vE.base}** es irregular → **${e}**. Repásalo en el contrarreloj de verbos.`;
  if (e.length > 3 && lev(e, t) <= 2) return `Revisa la ortografía: se escribe **${e}**.`;
  return null;
}
function diagnose(expected, typed) {
  const out = [];
  if (!typed || !typed.trim()) return out;
  const E = norm(expected), T = norm(typed);
  if (E.join(" ") === T.join(" ")) return out;
  let missing = E.filter((w, i) => E.slice(0, i).filter((x) => x === w).length >= T.filter((x) => x === w).length);
  let extra = T.filter((w, i) => T.slice(0, i).filter((x) => x === w).length >= E.filter((x) => x === w).length);
  if (!missing.length && !extra.length) {
    out.push("Usaste las palabras correctas, pero el **orden** cambió. En inglés el orden es **sujeto + verbo + complemento**; en preguntas el auxiliar (*do, is, can*) va antes del sujeto.");
    return out;
  }
  if (extra.includes("have") && missing.some((w) => ["am", "is", "are"].includes(w))) { out.push("La **edad**, el hambre y el frío van con **to be**, no con *have*: *I'm 20*, *I'm hungry*."); extra = extra.filter((w) => w !== "have"); missing = missing.filter((w) => !["am", "is", "are"].includes(w)); }
  extra.slice().forEach((t) => {
    const e = missing.find((m) => pairRule(m, t, E));
    if (e) { out.push(pairRule(e, t, E)); missing = missing.filter((x) => x !== e); extra = extra.filter((x) => x !== t); }
  });
  if (extra.includes("to") && E.some((w) => ["can", "could", "will", "should", "must", "let's", "let"].includes(w))) { out.push("Después de **can, will, should, must** o **let's** el verbo va directo, **sin to**."); extra = extra.filter((x) => x !== "to"); }
  if (extra.includes("the") && !missing.length) { out.push("Sobra **the**: para hablar en general, o con *home, work, school, Monday*, en inglés no va artículo."); extra = extra.filter((x) => x !== "the"); }
  if (missing[0] === "it" && E[0] === "it") { out.push("Falta el **sujeto**. En inglés siempre se dice: para clima, hora o cosas usa **it** (*It's cold, It's easy*)."); missing = missing.slice(1); }
  if (missing.some((w) => ["am", "is", "are"].includes(w)) && T.some((w) => w.endsWith("ing"))) { out.push("Falta **am/is/are** antes del verbo con -ing: *I **am** studying*."); missing = missing.filter((w) => !["am", "is", "are"].includes(w)); }
  if (missing.some((w) => ["do", "does", "did"].includes(w))) { out.push("Falta el auxiliar **do / does / did**: lo necesitan las preguntas y negativas con verbos normales (*Do you play? She doesn't work*)."); missing = missing.filter((w) => !["do", "does", "did"].includes(w)); }
  if (missing.some((w) => ["a", "an", "the"].includes(w))) { out.push(`Falta el artículo **${missing.find((w) => ["a", "an", "the"].includes(w))}**. Con profesiones y cosas en singular el inglés casi siempre lo pide (*I'm **a** student*).`); missing = missing.filter((w) => !["a", "an", "the"].includes(w)); }
  if (missing.includes("not")) { out.push("Falta **not**: la negación se forma con el auxiliar (*don't, isn't, can't*)."); missing = missing.filter((w) => w !== "not"); }
  if (missing.length) out.push(`Te faltó: **${missing.join(", ")}**.`);
  if (extra.length) out.push(`Te sobró: *${extra.join(", ")}*.`);
  return out.slice(0, 3);
}

/* ---------- Cuaderno de errores ---------- */
function logError(it, typed) {
  const s = it.kind === "sentence" ? it.s : null;
  const entry = s ? { id: s.id, t: s.topic, exp: s.en, typed: typed || "", k: it.type }
    : it.kind === "fix" ? { id: "fix:" + it.fix.w, t: it.fix.t, exp: it.fix.r, typed: typed || "", k: "fix" } : null;
  if (!entry) return;
  logTo("errlog", entry);
}
const errLog = () => store.get("errlog", []);
function topicErrorCounts(days = 30) {
  const since = addDays(today(), -days); const c = {};
  errLog().filter((e) => e.date >= since && e.t).forEach((e) => { c[e.t] = (c[e.t] || 0) + 1; });
  return Object.entries(c).sort((a, b) => b[1] - a[1]);
}

/* ---------- Fichas ---------- */
function renderFicha(u, compact) {
  const f = u.ficha;
  if (!f) return `<div class="ficha"><div class="f-sec"><h4>Lo esencial</h4><ul>${(u.idea || []).map((l) => `<li>${md(l)}</li>`).join("")}</ul>
    <p class="muted small">La ficha completa de este tema llega en la siguiente actualización.</p></div></div>`;
  const tbl = (t) => `<div class="tbl"><table>${t.h ? `<tr>${t.h.map((x) => `<th>${md(x)}</th>`).join("")}</tr>` : ""}${t.r.map((r) => `<tr>${r.map((c) => `<td>${md(c)}</td>`).join("")}</tr>`).join("")}</table></div>`;
  return `<div class="ficha">
    <div class="f-sec f-que"><h4>🧭 Qué es</h4><p>${md(f.que)}</p></div>
    ${f.usos ? `<div class="f-sec"><h4>🎯 Cuándo se usa</h4><ul>${f.usos.map((x) => `<li>${md(x)}</li>`).join("")}</ul></div>` : ""}
    ${f.forma ? `<div class="f-sec"><h4>🧱 Cómo se forma</h4>${f.forma.map((t) => `<div class="f-tt">${md(t.t)}</div>${tbl(t)}`).join("")}</div>` : ""}
    ${f.variantes ? `<div class="f-sec"><h4>🔀 Variantes y casos especiales</h4><ul>${f.variantes.map((x) => `<li>${md(x)}</li>`).join("")}</ul></div>` : ""}
    ${f.espanol ? `<div class="f-sec f-es"><h4>🇲🇽 Comparado con el español</h4><ul>${f.espanol.map((x) => `<li>${md(x)}</li>`).join("")}</ul></div>` : ""}
    ${f.ejemplos ? `<div class="f-sec"><h4>💬 Ejemplos <span class="muted small">(toca para escuchar)</span></h4><div class="f-ex">${f.ejemplos.map(([en, es]) => `<button class="f-say" data-t="${esc(en)}"><b>${esc(en)}</b><span>${esc(es)}</span></button>`).join("")}</div></div>` : ""}
    ${f.errores ? `<div class="f-sec"><h4>⚠️ Errores típicos</h4>${f.errores.map(([w, r, why]) => `<div class="f-err"><div><s>${esc(w)}</s> → <b>${esc(r)}</b></div><div class="muted small">${md(why)}</div></div>`).join("")}</div>` : ""}
    ${f.truco ? `<div class="f-sec f-truco"><h4>💡 Truco para recordarlo</h4><p>${md(f.truco)}</p></div>` : ""}
  </div>`;
}
function bindFicha(root) { root.querySelectorAll(".f-say").forEach((b) => (b.onclick = () => speak(b.dataset.t))); }
function openFicha(key) {
  const u = topicOf(key); if (!u) return;
  const m = document.createElement("div"); m.className = "sheet-bg";
  m.innerHTML = `<div class="sheet tall"><div class="sheet-head"><span class="lvl ${LEVEL_COLOR[u.level]}">${u.level}</span><h2>${esc(u.title)}</h2><button class="x" aria-label="Cerrar">✕</button></div>
    <div class="sheet-body">${renderFicha(u)}<a class="btn secondary" href="#/tema/${u.id}/leer">Abrir el tema completo</a></div></div>`;
  document.body.appendChild(m); bindFicha(m);
  m.onclick = (e) => { if (e.target === m || e.target.closest(".x")) m.remove(); };
}

/* ---------- Diccionario al tocar palabras ---------- */
function lookup(raw) {
  const w = raw.toLowerCase().replace(/[^a-z']/g, "").replace(/'s$/, "").replace(/^'|'$/g, "");
  if (!w) return null;
  const v = verbOfPast(w);
  const cands = [w, v && v.base, w.replace(/ies$/, "y"), w.replace(/es$/, ""), w.replace(/s$/, ""), w.replace(/ed$/, ""), w.replace(/d$/, ""), w.replace(/ing$/, ""), w.replace(/ing$/, "e"), w.replace(/(.)\1ing$/, "$1"), w.replace(/(.)\1ed$/, "$1"), w.replace(/n't$/, "")].filter(Boolean);
  for (const c of cands) {
    if (DICT[c]) return { w: raw, base: c, es: DICT[c] };
    const vl = VOCAB_LIST.find((x) => x.en === c || x.en === "to " + c);
    if (vl) return { w: raw, base: c, es: vl.es };
    const vb = VERBS.find((x) => x.base === c);
    if (vb) return { w: raw, base: c, es: vb.es };
  }
  return null;
}
function showWord(raw) {
  document.querySelectorAll(".wpop").forEach((x) => x.remove());
  const r = lookup(raw);
  const p = document.createElement("div"); p.className = "wpop";
  p.innerHTML = r ? `<b>${esc(r.w.replace(/[.,!?"]/g, ""))}</b>${r.base !== r.w.toLowerCase().replace(/[^a-z']/g, "") ? ` <span class="muted small">(de ${esc(r.base)})</span>` : ""}<div>${esc(r.es)}</div><button class="speak inline" data-t="${esc(r.base)}">🔊</button>`
    : `<b>${esc(raw)}</b><div class="muted">Aún no está en el diccionario.</div>`;
  document.body.appendChild(p);
  const sp = p.querySelector(".speak"); if (sp) sp.onclick = () => speak(sp.dataset.t);
  setTimeout(() => p.remove(), 5000);
}

/* ---------- v10: Aprender (mapa por niveles) ---------- */
const LEVEL_INFO = { A1: "Principiante", A2: "Básico", B1: "Intermedio", B2: "Intermedio alto" };
const readMap = () => store.get("read", {});
routes.ruta = () => go("#/aprender");
routes.unidad = (id) => go("#/tema/" + id);
routes.aprender = () => {
  setTitle("Aprender", false);
  const cu = curUnit(), rd = readMap();
  const levels = ["A1", "A2", "B1", "B2"];
  view.innerHTML = `<p class="sub">Cada tema tiene 3 pasos: <b>leer</b> la ficha, <b>practicar</b> y llegar a <b>dominado</b> (80%).</p>
    ${levels.map((lv) => {
      const us = UNITS.filter((u) => u.level === lv);
      const done = us.filter((u) => unitMastery(u.id) >= 80).length;
      return `<section class="lvl-sec ${LEVEL_COLOR[lv]}">
        <div class="lvl-head"><span class="lvl ${LEVEL_COLOR[lv]}">${lv}</span><div class="grow"><b>${LEVEL_INFO[lv]}</b><div class="muted small">${us.length ? `${done} de ${us.length} temas dominados` : "Próximamente"}</div></div></div>
        ${us.length ? `<div class="list">${us.map((u) => {
          const m = unitMastery(u.id), read = !!rd[u.key];
          return `<a class="row topic ${u.id === cu ? "current" : ""}" href="#/tema/${u.id}">
            <span class="unum ${m >= 80 ? "done" : ""}">${m >= 80 ? "✓" : u.id}</span>
            <span class="grow"><span class="t">${esc(u.title)}</span><div class="d">${esc(u.sub || "")}${u.id === cu ? ` · <b class="acc">estás aquí</b>` : ""}</div>
              <div class="steps"><span class="${read ? "on" : ""}">📖 Leer</span><span class="${m > 0 ? "on" : ""}">✍️ ${m}%</span><span class="${m >= 80 ? "on" : ""}">🏆</span></div></span>
            <span class="chev">›</span></a>`;
        }).join("")}</div>` : `<p class="muted small" style="margin:6px 4px 0">Llegan en la fase 4: pasado perfecto, tercer condicional, reported speech, causativo y más.</p>`}
      </section>`;
    }).join("")}
    <h3>Biblioteca</h3>
    <div class="list">
      <a class="row" href="#/guias"><span class="emoji">📚</span><span class="grow"><span class="t">Guía completa (7 partes)</span><div class="d">Todo el temario en un solo lugar</div></span><span class="chev">›</span></a>
      <a class="row" href="#/consulta"><span class="emoji">🔁</span><span class="grow"><span class="t">Verbos irregulares y tiempos</span><div class="d">Tabla con buscador y audio</div></span><span class="chev">›</span></a>
      <a class="row" href="#/palabras"><span class="emoji">🔤</span><span class="grow"><span class="t">Vocabulario por temas</span><div class="d">${VOCAB_LIST.length} palabras</div></span><span class="chev">›</span></a>
      <a class="row" href="#/historias"><span class="emoji">📖</span><span class="grow"><span class="t">Lecturas</span><div class="d">${STORIES.length} historias con diccionario al tocar</div></span><span class="chev">›</span></a>
    </div>`;
};

/* ---------- v10: página de tema ---------- */
routes.tema = (id, tab = "leer") => {
  const u = UNITS.find((x) => x.id === Number(id)) || UNITS[0];
  setTitle(u.title, true);
  const m = unitMastery(u.id), rd = readMap();
  const errs = errLog().filter((e) => e.t === u.key);
  const tabs = [["leer", "📖 Leer"], ["practicar", "✍️ Practicar"], ["errores", `🎯 Mis errores${errs.length ? ` (${errs.length})` : ""}`]];
  view.innerHTML = `<div class="tema-head ${LEVEL_COLOR[u.level]}"><span class="lvl ${LEVEL_COLOR[u.level]}">${u.level} · Tema ${u.id}</span>
      <h2>${esc(u.title)}</h2><div class="muted small">${esc(u.sub || "")}</div>
      <div class="progress ${m >= 80 ? "good" : ""}" style="margin-top:10px"><span style="width:${m}%"></span></div>
      <div class="muted small" style="margin-top:6px">${m}% dominado${rd[u.key] ? " · ficha leída ✓" : ""}${u.id === curUnit() ? " · tu tema actual" : ""}</div></div>
    <div class="seg">${tabs.map(([k, l]) => `<a href="#/tema/${u.id}/${k}" class="${k === tab ? "on" : ""}">${l}</a>`).join("")}</div>
    <div id="tb"></div>`;
  const tb = $("#tb");
  const sents = SENTENCES.filter((s) => s.unit === u.id);
  if (tab === "leer") {
    tb.innerHTML = renderFicha(u) + `<div class="btns"><button class="btn" id="go">✓ Ya lo leí · practicar</button></div>`;
    bindFicha(tb);
    $("#go").onclick = () => { const r = readMap(); r[u.key] = today(); store.set("read", r); runSession(buildUnitSession(u.id), u.title, false); };
  } else if (tab === "practicar") {
    tb.innerHTML = `<button class="btn" id="practice">Practicar este tema (12 ejercicios)</button>
      ${u.id !== curUnit() ? `<button class="btn ghost" id="setcur">Hacer este mi tema actual</button>` : ""}
      <h3>${sents.length} oraciones <span class="muted small">(toca para escuchar)</span></h3>
      <div class="list">${sents.map((s) => { const st = stateOf(s.id); return `<button class="row say" data-t="${esc(s.en)}"><span class="emoji">${st && st.lvl >= 2 ? "✅" : st ? "🟡" : "⚪"}</span><span class="grow"><span class="t">${esc(s.en)}</span><div class="d">${esc(s.es)}</div></span></button>`; }).join("")}</div>
      <p class="muted small">⚪ nueva · 🟡 aprendiendo · ✅ dominada</p>`;
    tb.querySelectorAll(".say").forEach((b) => (b.onclick = () => speak(b.dataset.t)));
    $("#practice").onclick = () => runSession(buildUnitSession(u.id), u.title, false);
    const sc = $("#setcur"); if (sc) sc.onclick = () => { setProfile({ unit: u.id }); toast("Listo, es tu tema actual"); render(); };
  } else {
    tb.innerHTML = errs.length ? `<button class="btn" id="rv">Repasar mis errores de este tema</button>
      <h3>Tus errores (${errs.length})</h3><div class="list">${errs.slice().reverse().slice(0, 30).map(errRow).join("")}</div>`
      : `<div class="card center"><div class="big">🎯</div><h2>Sin errores en este tema</h2><p class="sub">Cuando falles algo aquí, aparecerá con su explicación.</p></div>`;
    const rv = $("#rv"); if (rv) rv.onclick = () => runSession(buildTopicReview(u.key), "Repaso: " + u.title, false);
  }
};
function errRow(e) {
  if (e.k === "fix") {
    const f = FIX2.find((x) => "fix:" + x.w === e.id);
    if (f) return `<div class="row err-row"><span class="grow"><div><s>${esc(f.w)}</s> → <b>${esc(f.r)}</b></div><div class="d">${md(f.why.split(". ")[0] + ".")}</div><div class="d">${e.date} · Corrige el error</div></span></div>`;
  }
  const d = e.typed ? diagnose(e.exp, e.typed) : [];
  return `<div class="row err-row"><span class="grow"><div><b>${esc(e.exp)}</b></div>${e.typed ? `<div class="small">Escribiste: <s>${esc(e.typed)}</s></div>` : ""}
    ${d.length ? `<div class="d">${md(d[0])}</div>` : ""}<div class="d">${e.date}${topicOf(e.t) ? ` · ${esc(topicOf(e.t).title)}` : ""}</div></span></div>`;
}
function buildTopicReview(key) {
  const st = sstate(); const u = topicOf(key); if (!u) return [];
  const wrongIds = new Set(errLog().filter((e) => e.t === key).map((e) => e.id));
  const pool = SENTENCES.filter((s) => s.unit === u.id);
  const first = pool.filter((s) => wrongIds.has(s.id) || (st[s.id] && st[s.id].wrong > 0));
  const rest = shuffle(pool.filter((s) => !first.includes(s)));
  const fixes = FIX2.filter((f) => f.t === key).slice(0, 2).map(fixItem);
  return [...shuffle(first), ...rest].slice(0, 10).map((s) => ({ kind: "sentence", s, type: typeFor(Math.min(2, (st[s.id] || { lvl: 0 }).lvl)) })).concat(fixes);
}
routes.repasar = (key) => { const u = topicOf(key); runSession(buildTopicReview(key), u ? "Repaso: " + u.title : "Repaso", false); };

/* ---------- v10: Repaso ---------- */
routes.repaso = () => {
  setTitle("Repaso", false);
  const counts = topicErrorCounts(30).slice(0, 5);
  const recent = errLog().slice().reverse().slice(0, 12);
  const errors = Object.values(sstate()).filter((s) => s.wrong > 0 && s.lvl < 3).length;
  const saved = savedList().length;
  view.innerHTML = `
    <h3 style="margin-top:4px">Los temas que más fallas (30 días)</h3>
    ${counts.length ? `<div class="list">${counts.map(([k, n]) => { const u = topicOf(k); return `<div class="row"><span class="emoji">🎯</span><span class="grow"><span class="t">${esc(u ? u.title : k)}</span><div class="d">${n} ${n === 1 ? "error" : "errores"}${u ? ` · ${u.level}` : ""}</div></span>
      ${u ? `<a class="mini-btn" href="#/tema/${u.id}/leer">Leer</a><a class="mini-btn on" href="#/repasar/${k}">Repasar</a>` : ""}</div>`; }).join("")}</div>`
      : `<div class="card"><p class="sub" style="margin:0">Todavía no hay errores guardados. Cada vez que falles algo, aparecerá aquí agrupado por tema, con su explicación.</p></div>`}
    <h3>Herramientas de repaso</h3>
    <div class="list">
      <a class="row" href="#/errores"><span class="emoji">🔁</span><span class="grow"><span class="t">Sesión de mis errores</span><div class="d">${errors ? `${errors} oraciones por dominar` : "Aún no hay"}</div></span><span class="chev">›</span></a>
      <a class="row" href="#/guardadas"><span class="emoji">⭐</span><span class="grow"><span class="t">Mis frases guardadas</span><div class="d">${saved ? `${saved} frases` : "Guarda frases con ⭐"}</div></span><span class="chev">›</span></a>
      <a class="row" href="#/tarjetas"><span class="emoji">🃏</span><span class="grow"><span class="t">Tarjetas</span><div class="d">Verbos, frases, TI, phrasal verbs y falsos amigos</div></span><span class="chev">›</span></a>
      <a class="row" href="#/corrige"><span class="emoji">🕵️</span><span class="grow"><span class="t">Corrige el error</span><div class="d">${FIX2.length} errores típicos, cada uno explicado</div></span><span class="chev">›</span></a>
    </div>
    ${recent.length ? `<h3>Errores recientes</h3><div class="list">${recent.map(errRow).join("")}</div>` : ""}`;
};

/* ---------- Migración de progreso (ruta v10) ---------- */
(() => {
  const raw = store.get("profile", {});
  if (!raw.pathV) { const nu = raw.unit ? (LEGACY_TO_UNIT[raw.unit] || 1) : 1; store.set("profile", Object.assign(raw, { unit: nu, pathV: 2 })); }
})();

/* ---------- Arranque ---------- */
applyPrefs();
const APP_VERSION = "10";
if ("serviceWorker" in navigator) {
  const hadController = !!navigator.serviceWorker.controller;
  let reloaded = false;
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (!hadController || reloaded) return; reloaded = true;
    toast("Actualizando la app..."); setTimeout(() => location.reload(), 600);
  });
  window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").then((reg) => {
    document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible") reg.update().catch(() => {}); });
  }).catch(() => {}));
}
render();
