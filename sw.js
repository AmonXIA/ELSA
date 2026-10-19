/* Elsa数学小练 · Service Worker（离线缓存） */
const CACHE = 'elsa-math-v17';
const ASSETS = [
  './elsa.html',
  './css/app.css',
  './js/data-listen.js',
  './js/data-listen-timing.js',
  './js/data.js',
  './js/app.js',
  './js/exceljs.min.js',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png',
  './assets/listen-icon.png',
  './assets/shawn-module-icons.png',
  './apple-touch-icon.png',
  './elsa-logo.svg'
];

self.addEventListener('install', function (e) {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(function (cache) {
    return Promise.all(ASSETS.map(function (u) {
      return cache.add(new Request(u, { cache: 'reload' })).catch(function () {});
    }));
  }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.map(function (k) {
      return k === CACHE ? null : caches.delete(k);
    }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener('fetch', function (e) {
  const req = e.request;
  if (req.method !== 'GET') return;

  const accept = req.headers.get('accept') || '';
  const isHTML = req.mode === 'navigate' || accept.indexOf('text/html') !== -1 || /\.html($|\?)/.test(req.url);

  // 页面（HTML）：网络优先 —— 在线时总是拿最新版，离线再回退缓存
  if (isHTML) {
    e.respondWith(
      fetch(req).then(function (res) {
        const copy = res.clone();
        caches.open(CACHE).then(function (c) { c.put(req, copy); }).catch(function () {});
        return res;
      }).catch(function () {
        return caches.match(req, { ignoreSearch: true }).then(function (hit) {
          return hit || caches.match('./elsa.html');
        });
      })
    );
    return;
  }

  // 其他静态资源：缓存优先
  e.respondWith(
    caches.match(req, { ignoreSearch: true }).then(function (hit) {
      if (hit) return hit;
      return fetch(req).then(function (res) {
        const copy = res.clone();
        caches.open(CACHE).then(function (c) { c.put(req, copy); }).catch(function () {});
        return res;
      });
    })
  );
});
