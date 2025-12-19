const CACHE_NAME = 'vdog-v1';
const ASSETS = [
  './',
  './index.html',
  './vdog.jpg',
  'https://cdn.jsdelivr.net/npm/@picocss/pico@1/css/pico.min.css'
];

// Install Event
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// Fetch Event
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});
