// Guarda la app en el celular para que funcione sin internet.
// Con internet siempre intenta bajar lo más nuevo; sin internet usa lo guardado.
const VERSION = "ingles-v10";
const FILES = [
  "./", "index.html", "styles.css", "app.js", "data.js", "extra.js", "a1.js", "errors.js", "dict.js", "content.js", "manifest.webmanifest",
  "icon-192.png", "icon-512.png", "apple-touch-icon.png", "maskable-512.png",
  "guias/g0.html", "guias/g1.html", "guias/g2.html", "guias/g3.html", "guias/g4.html", "guias/g5.html", "guias/g6.html",
  "guias/g0-0.png", "guias/g1-0.png", "guias/g2-0.png", "guias/g4-0.png",
];
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(FILES.map((f) => new Request(f, { cache: "reload" })))).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
const timeout = (ms) => new Promise((_, rej) => setTimeout(() => rej(new Error("timeout")), ms));
self.addEventListener("fetch", (e) => {
  const req = e.request; const url = new URL(req.url);
  if (req.method !== "GET" || url.origin !== location.origin) return;
  const isImage = /\.(png|jpg|webp)$/.test(url.pathname);
  if (isImage) {
    e.respondWith(caches.match(req, { ignoreSearch: true }).then((hit) => hit || fetch(req)));
    return;
  }
  // Red primero (máx. 3 s) para recibir actualizaciones; si no hay red, lo guardado.
  e.respondWith(
    Promise.race([fetch(req, { cache: "no-cache" }), timeout(3000)]).then((res) => {
      if (res.ok) { const copy = res.clone(); caches.open(VERSION).then((c) => c.put(req, copy)); }
      return res;
    }).catch(() => caches.match(req, { ignoreSearch: true }).then((hit) => hit || caches.match("index.html")))
  );
});
