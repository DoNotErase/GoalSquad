// Set this to true for production
const doCache = true;
// Name our cache
const CACHE_NAME = 'goalsquad-cache';
const filesToCache = [
  '/',
  '/styles.css',
  '/assets/backgrounds/background-mobile.png',
  '/assets/backgrounds/background-tablet.png',
  '/assets/backgrounds/yard_mobile_background.png',
  '/assets/misc/logo.png',
  '/assets/icons/battle_icon.png',
  '/assets/icons/deets_icon.png',
  '/assets/icons/goals_icon.png',
  '/assets/icons/history_icon.png',
  '/assets/icons/incubator_icon.png',
  '/assets/icons/logout_icon.png',
  '/assets/icons/squad_icon.png',
  '/assets/icons/yard_icon.png',
];

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