// Guarda la app en el celular para que funcione sin internet.
// Cambia VERSION cada vez que se actualice el contenido.
const VERSION = "ingles-v8";
const FILES = [
  "./", "index.html", "styles.css", "app.js", "data.js", "extra.js", "content.js", "manifest.webmanifest",
  "icon-192.png", "icon-512.png", "apple-touch-icon.png", "maskable-512.png",
  "guias/g0.html", "guias/g1.html", "guias/g2.html", "guias/g3.html", "guias/g4.html", "guias/g5.html", "guias/g6.html",
  "guias/g0-0.png", "guias/g1-0.png", "guias/g2-0.png", "guias/g4-0.png",
];
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then((hit) => hit || fetch(e.request).then((res) => {
      if (res.ok && new URL(e.request.url).origin === location.origin) {
        const copy = res.clone(); caches.open(VERSION).then((c) => c.put(e.request, copy));
      }
      return res;
    }).catch(() => caches.match("index.html")))
  );
});
