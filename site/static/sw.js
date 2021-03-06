addEventListener('install', async (event) => {
  const cache = caches.open('v1');
  event.waitUntil(
    cache.addAll([
      '/scripts/main.js',
      '/css/styles.css'
    ]).then(() => self.skipWaiting())
  );
});

addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});


addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Skip the service worker for the feed. The page handles the caching.
  if (url.origin === location.origin && url.pathname === '/feed') return;

  event.respondWith(async function () {

    // Offline first: This should find the cached MP3 files.
    const cachedResponse = await caches.match(event.request);
    return cachedResponse || fetch(event.request);
  }());
});

addEventListener('backgroundfetchsuccess', event => {
  const bgFetch = event.registration;

  event.waitUntil(async function () {
    const cache = await caches.open(bgFetch.id);
    const records = await bgFetch.matchAll();

    const promises = records.map(async record => {
      await cache.put(record.request, await record.responseReady);
    });

    await Promise.all(promises);

    new BroadcastChannel(bgFetch.id).postMessage({ stored: true });
  }());
});

addEventListener('backgroundfetchfail', event => {
  console.log('Background fetch failed', event);
});

addEventListener('backgroundfetchclick', event => {
  const bgFetch = event.registration;
  clients.openWindow(bgFetch.id);
});