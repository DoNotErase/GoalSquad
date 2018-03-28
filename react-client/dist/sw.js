var cacheName = 'goalsquad-page';

var filesToCache = ['/', '/index.html', '/styles.css'];

self.addEventListener('install', (event) => {
  console.log('[ServiceWorker] Install');
  event.waitUntil(caches.open(cacheName).then((cache) => {
    console.log('[ServiceWorker] Caching app shell');
    return cache.addAll(filesToCache);
  }) );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
	event.respondWith(caches.open(filesToCache)
		.then(function(cache) {
	  	return cache.match(event.request)
	  .then(function(response) {
	    var fetchPromise = fetch(event.request) // used at end of request (if fetched)
	  .then(function(networkResponse) {
	    // if a response was received, update the cache
      if (networkResponse) {
        cache.put(event.request, networkResponse.clone());
      }
        return networkResponse;
      }, function (e) {
      	 // if the event of an error, do nothing since we're offline
      });
        // respond from the cache, or the network
        return response || fetchPromise;
	    });
	}));
});

