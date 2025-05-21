const CACHE_NAME = 'cursed-treasures-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/service-worker.js',
  '/images/icon-192.png',
  '/images/icon-512.png',
  // ...all your CSS, JS, images, fonts, etc.
];

// 1) Install: cache all the assets
self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

// 2) Activate: clean up old caches
self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// 3) Fetch: serve from cache, fall back to network
self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request)
      .then(cached => cached || fetch(evt.request))
  );
});
