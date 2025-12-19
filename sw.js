const CACHE_NAME = 'vdog-v9.7'; // <--- Bumped to v9.7
const ASSETS = [
  './',
  './index.html',
  './vdog.jpg',
  'https://cdn.jsdelivr.net/npm/@picocss/pico@1/css/pico.min.css'
];

// Install Event: Force immediate activation
self.addEventListener('install', (e) => {
  self.skipWaiting(); // <--- The "Don't Wait" Command
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// Activate Event: Take control of all pages immediately
self.addEventListener('activate', (e) => {
  e.waitUntil(clients.claim()); 
});

// Fetch Event: Serve from cache, fall back to network
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});
