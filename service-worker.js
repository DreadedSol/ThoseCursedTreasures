// service-worker.js
const CACHE_NAME = 'cursed-treasures-v6';
const ASSETS = [
  './',                   // the root of your app
  'index.html',
  'manifest.json',
  'service-worker.js',
  'images/icon-192.png',
  'images/icon-512.png',
  'images/parchment-map.png',
  'images/parchment-player2.png',
  'images/curses/heavy-idol.png',
  'images/curses/greedy-gem.png',
  'images/curses/banjaxed-compass.png',
  'images/curses/pewter-shoes.png',
  'images/curses/fly-agaric.png',
  'images/curses/manuka-honey.png',
  'images/curses/broken-machete.png',
  'images/curses/mummified-leech.png',
  'images/curses/jeering-monkey.png',
  'images/curses/map-fragment.png',
  'images/curses/stone-toad.png',
  'images/curses/golden-flea.png',
  'images/curses/possessed-coin.png',
  // …and any other files (CSS, JS, fonts, more images) exactly as they appear in your repo
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async cache => {
      for (const url of ASSETS) {
        try {
          const response = await fetch(url);
          if (!response.ok) throw new Error(`Status ${response.status}`);
          await cache.put(url, response.clone());
          console.log(`✅ Cached: ${url}`);
        } catch (err) {
          console.error(`❌ Failed to cache: ${url} — ${err.message}`);
        }
      }
      self.skipWaiting();
    })
  );
});



self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key.startsWith('cursed-treasures-') && key !== CACHE_NAME)
          .map(oldKey => caches.delete(oldKey))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', evt => {
  const request = evt.request;
  const requestUrl = new URL(request.url);
  const isCurseImage = request.method === 'GET' &&
    requestUrl.origin === self.location.origin &&
    requestUrl.pathname.includes('/images/curses/');

  evt.respondWith((async () => {
    const cached = await caches.match(request);
    if (cached) return cached;

    const response = await fetch(request);
    if (isCurseImage && response.ok) {
      const cache = await caches.open(CACHE_NAME);
      await cache.put(request, response.clone());
    }
    return response;
  })());
});
