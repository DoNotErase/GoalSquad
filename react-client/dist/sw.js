// Set this to true for production
const doCache = true;
// Name our cache
const CACHE_NAME = 'goalsquad-cache';
const filesToCache = ['/', '/index.html', '/styles,css'];

// Delete old caches that are not our current one!
this.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(caches.keys()
    .then(keyList =>
      /* eslint-disable */
      Promise.all(keyList.map((key) => {
      /* eslint-ensable */
        if (!cacheWhitelist.includes(key)) {
          console.log(`Deleting cache: ${key}`);
          return caches.delete(key);
        }
      }))));
});

// The first time the user starts up the PWA, 'install' is triggered.
this.addEventListener('install', (event) => {
  console.log('[ServiceWorker] Install');
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => {
    console.log('[ServiceWorker] Caching app shell');
    return cache.addAll(filesToCache);
  }));
});

// When the webpage goes to fetch files, we intercept that request and serve up the matching files
// if we have them
this.addEventListener('fetch', (event) => {
  if (doCache) {
    /* eslint-disable */
    event.respondWith(caches.match(event.request).then((response) => { 
      return response || fetch(event.request);
    }));
  }
});
/* eslint-ensable */