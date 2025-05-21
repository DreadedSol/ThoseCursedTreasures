// service-worker.js
const CACHE_NAME = 'cursed-treasures-v1';
const ASSETS = [
  './',                   // the root of your app
  'index.html',
  'manifest.json',
  'service-worker.js',
  'images/icon-192.png',
  'images/icon-512.png',
  'images/parchment-map.png',
  'images/parchment-player2.png',
  'images/parchment-tile.png',
  // …and any other files (CSS, JS, fonts, more images) exactly as they appear in your repo
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return Promise.all(
          ASSETS.map(url =>
            fetch(url).then(response => {
              if (!response.ok) {
                console.error(`❌ Failed to fetch ${url}: ${response.status}`);
                throw new Error(`Bad response for ${url}`);
              }
              console.log(`✅ Caching ${url}`);
              return cache.put(url, response.clone());
            })
          )
        );
      })
      .catch(err => {
        console.error('❌ Cache install failed:', err);
      })
      .then(() => self.skipWaiting())
  );
});


self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(oldKey => caches.delete(oldKey))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request)
      .then(cached => cached || fetch(evt.request))
  );
});
