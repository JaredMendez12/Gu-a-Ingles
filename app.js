"use strict";

/* ---------- Utilidades ---------- */
const $ = (s, el = document) => el.querySelector(s);
const view = $("#view");
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const pick = (a, n) => shuffle(a).slice(0, n);

const dateStr = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const today = () => dateStr(new Date());
const addDays = (s, n) => { const [y, m, d] = s.split("-").map(Number); const dt = new Date(y, m - 1, d); dt.setDate(dt.getDate() + n); return dateStr(dt); };

const store = {
  get(k, def) { try { const v = localStorage.getItem("ing:" + k); return v ? JSON.parse(v) : def; } catch { return def; } },
  set(k, v) { try { localStorage.setItem("ing:" + k, JSON.stringify(v)); } catch {} },
};

function toast(msg) {
  const t = $("#toast"); t.textContent = msg; t.classList.add("show");
  clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove("show"), 1800);
}

/* ---------- Voz (funciona sin internet con las voces del iPhone) ---------- */
let voice = null;
function loadVoice() {
  const vs = window.speechSynthesis ? speechSynthesis.getVoices() : [];
  const en = vs.filter((v) => /^en[-_]/i.test(v.lang));
  voice = en.find((v) => /en[-_]US/i.test(v.lang) && /samantha|ava|allison|alex|siri/i.test(v.name))
    || en.find((v) => /en[-_]US/i.test(v.lang)) || en[0] || null;
}
if (window.speechSynthesis) { loadVoice(); speechSynthesis.onvoiceschanged = loadVoice; }
function speak(text, slow = false) {
  if (!window.speechSynthesis) { toast("Tu navegador no tiene voz"); return; }
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "en-US"; if (voice) u.voice = voice;
  const rate = store.get("rate", 0.9);
  u.rate = slow ? Math.max(0.5, rate - 0.3) : rate;
  speechSynthesis.speak(u);
}

/* ---------- Progreso del día y racha ---------- */
const GOALS = { cards: 15, quiz: 8, dict: 4, speak: 1 };
function dayLog(d = today()) { return store.get("days", {})[d] || { cards: 0, quiz: 0, dict: 0, speak: 0, done: false }; }
function bump(kind, n = 1) {
  const days = store.get("days", {});
  const d = today();
  const log = days[d] || { cards: 0, quiz: 0, dict: 0, speak: 0, done: false };
  log[kind] = (log[kind] || 0) + n;
  const wasDone = log.done;
  log.done = Object.keys(GOALS).every((k) => (log[k] || 0) >= GOALS[k]);
  days[d] = log; store.set("days", days);
  if (log.done && !wasDone) setTimeout(() => toast("¡Reto del día completo! 🔥"), 400);
  renderStreak();
}
function streak() {
  const days = store.get("days", {});
  let d = today(); let n = 0;
  if (!days[d] || !days[d].done) d = addDays(d, -1);
  while (days[d] && days[d].done) { n++; d = addDays(d, -1); }
  return n;
}
function renderStreak() { $("#streak").textContent = "🔥 " + streak(); }

/* ---------- Repetición espaciada (sistema de cajas) ---------- */
const INTERVALS = [0, 1, 3, 7, 14, 30, 60];
const NEW_PER_DAY = 10;
function srsAll() { return store.get("srs", {}); }
function dueCards(deckKey) {
  const srs = srsAll(); const t = today();
  return DECKS[deckKey].cards.filter((c) => srs[c.id] && srs[c.id].due <= t);
}
function newCards(deckKey) {
  const srs = srsAll();
  const introduced = store.get("newCount", {})[today() + ":" + deckKey] || 0;
  const left = Math.max(0, NEW_PER_DAY - introduced);
  return DECKS[deckKey].cards.filter((c) => !srs[c.id]).slice(0, left);
}
function grade(card, g) { // g: 0 otra vez, 1 bien, 2 fácil
  const srs = srsAll();
  const isNew = !srs[card.id];
  const s = srs[card.id] || { box: 0, due: today() };
  s.box = g === 0 ? 0 : Math.min(INTERVALS.length - 1, s.box + g);
  s.due = addDays(today(), g === 0 ? 0 : INTERVALS[s.box]);
  srs[card.id] = s; store.set("srs", srs);
  if (isNew) { const nc = store.get("newCount", {}); const k = today() + ":" + card.deck; nc[k] = (nc[k] || 0) + 1; store.set("newCount", nc); }
}

/* ---------- Router ---------- */
const routes = {};
let cleanup = null;
function go(hash) { location.hash = hash; }
function setTitle(t, back) {
  $("#title").textContent = t;
  $("#back").hidden = !back;
}
function render() {
  if (cleanup) { cleanup(); cleanup = null; }
  if (window.speechSynthesis) speechSynthesis.cancel();
  const parts = (location.hash.replace(/^#\/?/, "") || "").split("/");
  const name = parts[0] || "home";
  const fn = routes[name] || routes.home;
  document.querySelectorAll(".tabs a").forEach((a) => {
    const tab = a.dataset.tab;
    const group = { home: "home", tarjetas: "tarjetas", estudiar: "tarjetas", practicar: "practicar", quiz: "practicar", dictado: "practicar", repite: "practicar", contrarreloj: "practicar", hablar: "practicar", consulta: "consulta", progreso: "progreso" }[name];
    a.classList.toggle("active", tab === group);
  });
  window.scrollTo(0, 0);
  fn(...parts.slice(1));
  renderStreak();
}
window.addEventListener("hashchange", render);
$("#back").addEventListener("click", () => history.length > 1 ? history.back() : go("#/"));

/* ---------- Inicio ---------- */
routes.home = () => {
  setTitle("Inglés diario", false);
  const log = dayLog();
  const tasks = [
    ["cards", "Tarjetas", `${Math.min(log.cards, GOALS.cards)}/${GOALS.cards}`, "#/tarjetas"],
    ["quiz", "Quiz o contrarreloj", `${Math.min(log.quiz, GOALS.quiz)}/${GOALS.quiz} aciertos`, "#/quiz"],
    ["dict", "Dictado", `${Math.min(log.dict, GOALS.dict)}/${GOALS.dict} oraciones`, "#/dictado"],
    ["speak", "Hablar en voz alta", `${Math.min(log.speak, GOALS.speak)}/${GOALS.speak}`, "#/hablar"],
  ];
  const doneCount = tasks.filter(([k]) => log[k] >= GOALS[k]).length;
  const s = streak();
  const totalDue = Object.keys(DECKS).reduce((n, k) => n + dueCards(k).length, 0);
  view.innerHTML = `
    <div class="card hero">
      <div class="muted small">Reto de hoy · unos 20 minutos</div>
      <h2 style="margin:4px 0 10px">${log.done ? "¡Completado! Vuelve mañana 💪" : `${doneCount} de 4 listos`}</h2>
      <div class="progress"><span style="width:${(doneCount / 4) * 100}%"></span></div>
      <div style="margin-top:10px">
        ${tasks.map(([k, t, p, href]) => `
          <a class="task ${log[k] >= GOALS[k] ? "ok" : ""}" href="${href}">
            <span class="check">${log[k] >= GOALS[k] ? "✓" : ""}</span>
            <span class="grow"><b>${t}</b><br><span class="muted small">${p}</span></span>
            <span>›</span>
          </a>`).join("")}
      </div>
    </div>
    <div class="stats">
      <div class="stat"><b>${s}</b><span>días seguidos</span></div>
      <div class="stat"><b>${totalDue}</b><span>tarjetas para repasar</span></div>
    </div>
    <h3>Atajos</h3>
    <div class="list">
      <a class="row" href="#/contrarreloj"><span class="emoji">⏱️</span><span class="grow"><span class="t">Contrarreloj de verbos</span><div class="d">60 segundos, pasado y participio</div></span></a>
      <a class="row" href="#/repite"><span class="emoji">🗣️</span><span class="grow"><span class="t">Escucha y repite</span><div class="d">Shadowing con frases útiles</div></span></a>
      <a class="row" href="#/consulta"><span class="emoji">📖</span><span class="grow"><span class="t">Consulta rápida</span><div class="d">Verbos irregulares y tiempos</div></span></a>
    </div>`;
};

/* ---------- Tarjetas ---------- */
routes.tarjetas = () => {
  setTitle("Tarjetas", false);
  const icons = { verbos: "🔁", frases: "💬", ti: "💻", phrasal: "🧩", falsos: "⚠️" };
  view.innerHTML = `
    <p class="sub">Toca la tarjeta para voltearla. Las que fallas vuelven pronto; las que sabes, cada vez más tarde.</p>
    <div class="list">${Object.entries(DECKS).map(([k, d]) => {
      const due = dueCards(k).length, nw = newCards(k).length;
      const total = d.cards.length;
      const learned = d.cards.filter((c) => (srsAll()[c.id] || {}).box >= 3).length;
      return `<a class="row" href="#/estudiar/${k}"><span class="emoji">${icons[k]}</span>
        <span class="grow"><span class="t">${d.name}</span><div class="d">${d.desc} · ${learned}/${total} dominadas</div></span>
        <span class="badge ${due + nw === 0 ? "done" : ""}">${due + nw === 0 ? "✓ al día" : `${due + nw} hoy`}</span></a>`;
    }).join("")}</div>`;
};

routes.estudiar = (deckKey) => {
  const deck = DECKS[deckKey]; if (!deck) return go("#/tarjetas");
  setTitle(deck.name, true);
  const tag = (c) => Object.assign({}, c, { deck: deckKey });
  let queue = shuffle(dueCards(deckKey)).slice(0, 25).map(tag).concat(newCards(deckKey).map(tag));
  let done = 0; const total = queue.length;
  if (!total) {
    view.innerHTML = `<div class="card" style="text-align:center"><div class="big">✓</div><h2>Todo al día</h2>
      <p class="sub">Ya repasaste este mazo por hoy. Vuelve mañana o practica otro.</p>
      <a class="btn" href="#/tarjetas">Ver otros mazos</a></div>`;
    return;
  }
  const show = () => {
    if (!queue.length) {
      view.innerHTML = `<div class="card" style="text-align:center"><div class="big">🎉</div><h2>¡Sesión terminada!</h2>
        <p class="sub">Repasaste ${total} tarjetas.</p><a class="btn" href="#/">Volver al inicio</a></div>`;
      return;
    }
    const c = queue[0];
    view.innerHTML = `
      <div class="counter"><span>${done} de ${total}</span><span>${queue.length} en la fila</span></div>
      <div class="progress" style="margin-bottom:14px"><span style="width:${(done / total) * 100}%"></span></div>
      <div class="flash" id="flash">
        <div class="front">${esc(c.front)}</div>
        <button class="speak" id="say">🔊 Escuchar</button>
        <div id="backside" hidden>
          <div class="back">${esc(c.back)}</div>
          ${c.note ? `<div class="note">${esc(c.note)}</div>` : ""}
        </div>
        <div class="hint" id="hint">Piensa la respuesta y toca para voltear</div>
      </div>
      <div class="btns" id="grades" hidden>
        <button class="btn again" data-g="0">Otra vez</button>
        <button class="btn good" data-g="1">Bien</button>
        <button class="btn easy" data-g="2">Fácil</button>
      </div>`;
    $("#say").onclick = (e) => { e.stopPropagation(); speak(c.speak); };
    $("#flash").onclick = () => { $("#backside").hidden = false; $("#grades").hidden = false; $("#hint").hidden = true; };
    $("#grades").onclick = (e) => {
      const b = e.target.closest("button"); if (!b) return;
      const g = Number(b.dataset.g);
      grade(c, g); queue.shift();
      if (g === 0) queue.push(c); else { done++; bump("cards"); }
      show();
    };
  };
  show();
};

/* ---------- Practicar ---------- */
routes.practicar = () => {
  setTitle("Practicar", false);
  const best = store.get("best", {});
  view.innerHTML = `
    <p class="sub">Retos cortos para aprender haciendo. Todos cuentan para tu reto del día.</p>
    <div class="list">
      <a class="row" href="#/quiz"><span class="emoji">✅</span><span class="grow"><span class="t">Quiz rápido</span><div class="d">10 preguntas con explicación al instante</div></span></a>
      <a class="row" href="#/contrarreloj"><span class="emoji">⏱️</span><span class="grow"><span class="t">Contrarreloj de verbos</span><div class="d">Récord: ${best.rush || 0} aciertos en 60 s</div></span></a>
      <a class="row" href="#/dictado"><span class="emoji">🎧</span><span class="grow"><span class="t">Dictado</span><div class="d">Escucha y escribe lo que oyes</div></span></a>
      <a class="row" href="#/repite"><span class="emoji">🗣️</span><span class="grow"><span class="t">Escucha y repite</span><div class="d">Imita ritmo y pronunciación</div></span></a>
      <a class="row" href="#/hablar"><span class="emoji">🎤</span><span class="grow"><span class="t">Habla 1 minuto</span><div class="d">Situaciones reales con frases de apoyo</div></span></a>
    </div>`;
};

/* Quiz */
routes.quiz = (level = "Todos") => {
  setTitle("Quiz rápido", true);
  const levels = ["Todos", "A1", "A2", "B1", "B2"];
  const pool = level === "Todos" ? QUIZ : QUIZ.filter((q) => q[4] === level);
  const qs = pick(pool, 10);
  let i = 0, score = 0;
  const show = () => {
    if (i >= qs.length) {
      view.innerHTML = `<div class="card" style="text-align:center"><div class="big">${score}/${qs.length}</div>
        <h2>${score >= 8 ? "¡Excelente!" : score >= 5 ? "¡Bien! Sigue así" : "Repasa y vuelve a intentar"}</h2>
        <div class="btns"><a class="btn" href="#/quiz/${level}" onclick="setTimeout(render)">Otra ronda</a><a class="btn secondary" href="#/">Inicio</a></div></div>`;
      return;
    }
    const [q, opts, ans, why, lv] = qs[i];
    const order = shuffle(opts.map((o, k) => [o, k]));
    view.innerHTML = `
      <div class="chips">${levels.map((l) => `<button class="chip ${l === level ? "on" : ""}" data-l="${l}">${l}</button>`).join("")}</div>
      <div class="counter"><span>Pregunta ${i + 1} de ${qs.length} · ${lv}</span><span>${score} aciertos</span></div>
      <div class="q">${esc(q)}</div>
      <div id="opts">${order.map(([o, k]) => `<button class="opt" data-k="${k}">${esc(o)}</button>`).join("")}</div>
      <div id="fb"></div>`;
    view.querySelectorAll(".chip").forEach((c) => c.onclick = () => { go("#/quiz/" + c.dataset.l); });
    $("#opts").onclick = (e) => {
      const b = e.target.closest(".opt"); if (!b || $("#opts").dataset.locked) return;
      $("#opts").dataset.locked = 1;
      const k = Number(b.dataset.k);
      view.querySelectorAll(".opt").forEach((o) => { if (Number(o.dataset.k) === ans) o.classList.add("right"); });
      const ok = k === ans;
      if (ok) { score++; bump("quiz"); } else b.classList.add("wrong");
      $("#fb").innerHTML = `<div class="feedback ${ok ? "ok" : "no"}"><b>${ok ? "¡Correcto!" : "Casi."}</b> ${esc(why)}</div>
        <button class="btn" id="next">${i + 1 < qs.length ? "Siguiente" : "Ver resultado"}</button>`;
      $("#next").onclick = () => { i++; show(); };
    };
  };
  show();
};

/* Contrarreloj de verbos */
routes.contrarreloj = () => {
  setTitle("Contrarreloj", true);
  const best = store.get("best", {});
  view.innerHTML = `<div class="card" style="text-align:center">
    <div class="big">⏱️ 60 s</div>
    <h2>¿Cuántos verbos aciertas?</h2>
    <p class="sub">Te pregunto el pasado o el participio de un verbo irregular. Toca la opción correcta lo más rápido que puedas.</p>
    <p class="muted">Tu récord: <b>${best.rush || 0}</b></p>
    <button class="btn" id="start">Empezar</button></div>`;
  $("#start").onclick = () => {
    let left = 60, score = 0, misses = [];
    const end = Date.now() + 60000;
    const timer = setInterval(() => {
      left = Math.max(0, Math.ceil((end - Date.now()) / 1000));
      const t = $("#t"); if (t) t.textContent = left;
      if (left <= 0) finish();
    }, 250);
    cleanup = () => clearInterval(timer);
    const next = () => {
      const v = VERBS[Math.floor(Math.random() * VERBS.length)];
      const askPast = Math.random() < 0.5;
      const right = askPast ? v.past : v.pp;
      const wrongPool = shuffle(VERBS.filter((x) => x !== v)).flatMap((x) => [x.past, x.pp]).filter((w) => w !== right);
      const fakes = [v.base + "ed", v.base + "en"].filter((w) => w !== right && !VERBS.some((x) => x.past === w || x.pp === w));
      const opts = shuffle([right, ...shuffle([...new Set([fakes[0], ...wrongPool])].filter(Boolean)).slice(0, 2)]);
      view.innerHTML = `
        <div class="timer" id="t">${left}</div>
        <div class="counter"><span>Aciertos: <b>${score}</b></span><span>Récord: ${best.rush || 0}</span></div>
        <div class="q" style="text-align:center">${askPast ? "Pasado" : "Participio"} de <span style="color:var(--accent)">${esc(v.base)}</span></div>
        <div id="opts">${opts.map((o) => `<button class="opt" data-o="${esc(o)}">${esc(o)}</button>`).join("")}</div>`;
      $("#opts").onclick = (e) => {
        const b = e.target.closest(".opt"); if (!b) return;
        if (b.dataset.o === right) { score++; bump("quiz"); next(); }
        else { b.classList.add("wrong"); misses.push(`${v.base} – ${v.past} – ${v.pp}`); setTimeout(next, 450); }
      };
    };
    const finish = () => {
      clearInterval(timer); cleanup = null;
      const b = store.get("best", {}); const record = score > (b.rush || 0);
      if (record) { b.rush = score; store.set("best", b); }
      view.innerHTML = `<div class="card" style="text-align:center"><div class="big">${score}</div>
        <h2>${record ? "¡Nuevo récord! 🏆" : "aciertos"}</h2>
        ${misses.length ? `<h3>Repasa estos</h3><p>${[...new Set(misses)].map(esc).join("<br>")}</p>` : ""}
        <div class="btns"><button class="btn" id="again">Otra vez</button><a class="btn secondary" href="#/">Inicio</a></div></div>`;
      $("#again").onclick = () => render();
    };
    next();
  };
};

/* Dictado */
const norm = (s) => s.toLowerCase().replace(/[’`]/g, "'")
  .replace(/\bwon't\b/g, "will not").replace(/\bcan't\b/g, "cannot")
  .replace(/n't\b/g, " not").replace(/'m\b/g, " am").replace(/'re\b/g, " are")
  .replace(/'ve\b/g, " have").replace(/'ll\b/g, " will").replace(/'d\b/g, " would")
  .replace(/[^a-z0-9' ]/g, " ").split(/\s+/).filter(Boolean);
function compare(expected, typed) {
  const a = norm(expected), b = norm(typed);
  const dp = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));
  for (let i = a.length - 1; i >= 0; i--) for (let j = b.length - 1; j >= 0; j--)
    dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
  const hit = new Set(); let i = 0, j = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) { hit.add(i); i++; j++; } else if (dp[i + 1][j] >= dp[i][j + 1]) i++; else j++;
  }
  return { words: a.map((w, k) => ({ w, ok: hit.has(k) })), pct: a.length ? Math.round((hit.size / a.length) * 100) : 0 };
}
routes.dictado = (level = "Todos") => {
  setTitle("Dictado", true);
  const levels = ["Todos", "A1", "A2", "B1", "B2"];
  const pool = level === "Todos" ? DICTATION : DICTATION.filter((d) => d[2] === level);
  let items = shuffle(pool), i = 0;
  const show = () => {
    if (i >= items.length) { items = shuffle(pool); i = 0; }
    const [en, es, lv] = items[i];
    view.innerHTML = `
      <div class="chips">${levels.map((l) => `<button class="chip ${l === level ? "on" : ""}" data-l="${l}">${l}</button>`).join("")}</div>
      <div class="card" style="text-align:center">
        <p class="sub">Escucha y escribe exactamente lo que oyes · ${lv}</p>
        <div class="btns"><button class="btn" id="play">🔊 Escuchar</button><button class="btn secondary" id="slow">🐢 Lento</button></div>
      </div>
      <input type="text" id="ans" placeholder="Escribe aquí..." autocomplete="off" autocapitalize="sentences" spellcheck="false">
      <div class="btns"><button class="btn good" id="check">Revisar</button></div>
      <div id="res"></div>`;
    view.querySelectorAll(".chip").forEach((c) => c.onclick = () => go("#/dictado/" + c.dataset.l));
    $("#play").onclick = () => speak(en);
    $("#slow").onclick = () => speak(en, true);
    const check = () => {
      const r = compare(en, $("#ans").value);
      if (r.pct >= 80) bump("dict");
      $("#res").innerHTML = `<div class="card">
        <div class="counter"><span><b>${r.pct}%</b> de palabras correctas</span><span>${r.pct === 100 ? "¡Perfecto!" : r.pct >= 80 ? "¡Muy bien!" : "Sigue practicando"}</span></div>
        <p class="diff" style="font-size:18px">${r.words.map((x) => `<span class="${x.ok ? "hit" : "miss"}">${esc(x.w)}</span>`).join(" ")}</p>
        <p class="muted" style="margin:0">${esc(en)}<br>${esc(es)}</p></div>
        <button class="btn" id="next">Siguiente</button>`;
      $("#next").onclick = () => { i++; show(); };
    };
    $("#check").onclick = check;
    $("#ans").addEventListener("keydown", (e) => { if (e.key === "Enter") check(); });
  };
  show();
};

/* Escucha y repite */
routes.repite = () => {
  setTitle("Escucha y repite", true);
  const items = shuffle(DECKS.frases.cards); let i = 0, reps = 0;
  const show = () => {
    const c = items[i % items.length];
    view.innerHTML = `
      <p class="sub">1) Escucha. 2) Repite en voz alta 3 veces imitando el ritmo. 3) Marca y sigue.</p>
      <div class="flash" style="cursor:default">
        <div class="front" style="font-size:24px">${esc(c.front)}</div>
        <div class="note">${esc(c.back)}</div>
        <div class="btns" style="width:100%"><button class="btn" id="play">🔊 Escuchar</button><button class="btn secondary" id="slow">🐢 Lento</button></div>
      </div>
      <div class="btns"><button class="btn easy" id="ok">✓ Ya lo repetí 3 veces</button></div>
      <p class="muted small" style="text-align:center">Frases repetidas en esta sesión: ${reps}</p>`;
    $("#play").onclick = () => speak(c.speak);
    $("#slow").onclick = () => speak(c.speak, true);
    $("#ok").onclick = () => { reps++; if (reps === 5) { bump("speak"); toast("¡5 frases! Cuenta como práctica de hablar"); } i++; show(); };
    setTimeout(() => speak(c.speak), 300);
  };
  show();
};

/* Habla 1 minuto */
routes.hablar = (idx) => {
  setTitle("Habla 1 minuto", true);
  if (idx === undefined) {
    view.innerHTML = `<p class="sub">Elige una situación, lee las frases de apoyo y habla en voz alta 1 minuto. Si puedes, grábate con la app Notas de voz y escúchate.</p>
      <div class="list">${SITUATIONS.map(([t, s], k) => `<a class="row" href="#/hablar/${k}"><span class="grow"><span class="t">${esc(t)}</span><div class="d">${esc(s)}</div></span><span>›</span></a>`).join("")}</div>`;
    return;
  }
  const [t, s, ph] = SITUATIONS[Number(idx)] || SITUATIONS[0];
  view.innerHTML = `
    <div class="card"><h2>${esc(t)}</h2><p class="sub" style="margin:0">${esc(s)}</p></div>
    <h3>Frases de apoyo (toca para escuchar)</h3>
    <div class="phrases">${ph.map((p) => `<button data-p="${esc(p)}">🔊 ${esc(p)}</button>`).join("")}</div>
    <div class="timer" id="t" style="margin-top:20px">1:00</div>
    <button class="btn" id="start">Empezar a hablar</button>`;
  view.querySelectorAll(".phrases button").forEach((b) => b.onclick = () => speak(b.dataset.p));
  $("#start").onclick = () => {
    $("#start").disabled = true;
    const end = Date.now() + 60000;
    const timer = setInterval(() => {
      const left = Math.max(0, Math.ceil((end - Date.now()) / 1000));
      $("#t").textContent = `0:${String(left).padStart(2, "0")}`.replace("0:60", "1:00");
      if (left <= 0) {
        clearInterval(timer); cleanup = null; bump("speak");
        $("#start").outerHTML = `<div class="feedback ok"><b>¡Tiempo!</b> Pregúntate: ¿usé el tiempo verbal correcto? ¿Qué palabra me faltó? Búscala y repite mañana.</div>
          <a class="btn secondary" href="#/hablar">Otra situación</a>`;
      }
    }, 250);
    cleanup = () => clearInterval(timer);
  };
};

/* ---------- Consulta ---------- */
routes.consulta = () => {
  setTitle("Consulta", false);
  view.innerHTML = `
    <input type="search" id="q" placeholder="Buscar verbo en inglés o español..." autocomplete="off">
    <h3>Verbos irregulares <span class="muted small">(toca para escuchar)</span></h3>
    <div class="card" style="padding:4px 12px"><table><thead><tr><th>Base</th><th>Pasado</th><th>Participio</th></tr></thead><tbody id="vt"></tbody></table></div>
    <h3>Los tiempos verbales en una tabla</h3>
    <div class="card" style="padding:4px 12px"><table><tbody>${TENSES.map(([n, ex, u]) => `<tr><td><b>${n}</b><br><span class="muted small">${u}</span></td><td>${esc(ex)}</td></tr>`).join("")}</tbody></table></div>
    <h3>Guía completa (necesita internet)</h3>
    <div class="list">${GUIDE_DOCS.map(([t, u]) => `<a class="row" href="${u}" target="_blank" rel="noopener"><span class="grow"><span class="t">${esc(t)}</span></span><span>↗</span></a>`).join("")}</div>`;
  const fill = (term = "") => {
    const t = term.trim().toLowerCase();
    const rows = VERBS.filter((v) => !t || [v.base, v.past, v.pp, v.es].some((x) => x.toLowerCase().includes(t)));
    $("#vt").innerHTML = rows.map((v) => `<tr data-s="${esc(v.base + ", " + v.past.replace("/", ", ") + ", " + v.pp)}"><td><b>${esc(v.base)}</b><br><span class="muted small">${esc(v.es)}</span></td><td>${esc(v.past)}</td><td>${esc(v.pp)}</td></tr>`).join("")
      || `<tr><td colspan="3" class="muted">Sin resultados</td></tr>`;
  };
  fill();
  $("#q").oninput = (e) => fill(e.target.value);
  $("#vt").onclick = (e) => { const tr = e.target.closest("tr[data-s]"); if (tr) speak(tr.dataset.s); };
};

/* ---------- Progreso ---------- */
routes.progreso = () => {
  setTitle("Progreso", false);
  const days = store.get("days", {});
  const srs = srsAll();
  const learned = Object.values(srs).filter((s) => s.box >= 3).length;
  const seen = Object.keys(srs).length;
  const active = Object.values(days).filter((d) => d.cards || d.quiz || d.dict || d.speak).length;
  const best = store.get("best", {});
  const cells = []; const t = today();
  for (let k = 27; k >= 0; k--) {
    const d = addDays(t, -k); const log = days[d];
    const cls = log && log.done ? "full" : log && (log.cards || log.quiz || log.dict || log.speak) ? "part" : "";
    cells.push(`<span class="${cls}">${Number(d.slice(8))}</span>`);
  }
  const rate = store.get("rate", 0.9);
  view.innerHTML = `
    <div class="stats">
      <div class="stat"><b>🔥 ${streak()}</b><span>días seguidos</span></div>
      <div class="stat"><b>${active}</b><span>días practicados</span></div>
      <div class="stat"><b>${learned}</b><span>tarjetas dominadas</span></div>
      <div class="stat"><b>${seen}</b><span>tarjetas vistas</span></div>
      <div class="stat"><b>${best.rush || 0}</b><span>récord contrarreloj</span></div>
      <div class="stat"><b>${Object.values(days).reduce((n, d) => n + (d.dict || 0), 0)}</b><span>dictados correctos</span></div>
    </div>
    <h3>Últimas 4 semanas</h3>
    <div class="card"><div class="cal">${cells.join("")}</div>
      <p class="muted small" style="margin:10px 0 0">Verde: reto completo · Naranja: practicaste algo</p></div>
    <h3>Velocidad de la voz</h3>
    <div class="chips">${[[0.7, "Lenta"], [0.9, "Normal"], [1.05, "Rápida"]].map(([r, l]) => `<button class="chip ${Math.abs(rate - r) < 0.01 ? "on" : ""}" data-r="${r}">${l}</button>`).join("")}</div>
    <h3>Respaldo</h3>
    <p class="sub">Tu progreso vive solo en este celular. Si borras el ícono de la pantalla de inicio, se borra.</p>
    <button class="btn secondary" id="reset">Borrar mi progreso</button>`;
  view.querySelectorAll("[data-r]").forEach((b) => b.onclick = () => { store.set("rate", Number(b.dataset.r)); speak("This is how I sound."); render(); });
  $("#reset").onclick = () => {
    if (confirm("¿Seguro? Se borrará tu racha, tarjetas y récords.")) {
      ["days", "srs", "best", "newCount"].forEach((k) => localStorage.removeItem("ing:" + k));
      toast("Progreso borrado"); render();
    }
  };
};

/* ---------- Arranque ---------- */
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));
}
render();
