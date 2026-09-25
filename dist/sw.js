const CACHE = "tokat-menu-v2";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./assets/menu-trays.png",
  "./assets/fonts/dm-serif-display.ttf",
  "./assets/fonts/manrope-400.ttf",
  "./assets/fonts/manrope-500.ttf",
  "./assets/fonts/manrope-600.ttf",
  "./assets/fonts/manrope-700.ttf",
  "./assets/fonts/manrope-800.ttf"
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)))));
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  event.respondWith(caches.match(event.request).then(hit => hit || fetch(event.request).then(response => {
    const copy = response.clone();
    caches.open(CACHE).then(cache => cache.put(event.request, copy));
    return response;
  })));
});
