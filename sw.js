const CACHE_NAME = 'bzvp-ngu-v2';
const ASSETS = ['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png'];
self.addEventListener('install', event => { event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))); self.skipWaiting(); });
self.addEventListener('activate', event => { event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))))); self.clients.claim(); });
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (url.pathname.endsWith('/schedule.json')) { event.respondWith(fetch(event.request, {cache:'no-store'})); return; }
  event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
});
