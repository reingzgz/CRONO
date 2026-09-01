/* Service worker del Cronómetro de operativas.
   Guarda en el dispositivo los archivos de la propia app para que abra sin cobertura.
   NUNCA intercepta las llamadas a la API de GitHub ni nada de otro dominio. */

const VERSION = "crono-v1";
const ARCHIVOS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-512-maskable.png",
  "./apple-touch-icon.png"
];

// Al instalar: descargar los archivos de la app
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(VERSION)
      .then(c => Promise.allSettled(ARCHIVOS.map(a => c.add(a))))
      .then(() => self.skipWaiting())
  );
});

// Al activar: borrar versiones antiguas
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;

  // Solo se ocupa de lo propio: nada de GitHub, fuentes u otros dominios
  if (req.method !== "GET") return;
  if (new URL(req.url).origin !== self.location.origin) return;

  // Primero la red (para tener siempre la última versión), y si no hay, la copia guardada
  e.respondWith(
    fetch(req)
      .then(r => {
        if (r && r.ok) {
          const copia = r.clone();
          caches.open(VERSION).then(c => c.put(req, copia));
        }
        return r;
      })
      .catch(() => caches.match(req).then(r => r || caches.match("./index.html")))
  );
});
