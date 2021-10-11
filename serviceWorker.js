self.addEventListener('install', (e) => {
	console.log('[Service Worker] Install');
  });
  
const cacheName = 'myportfolio-pwa';
const filesToCache = [
	'/',
	'/index.html',
	'/style.css',
	'/script.js'
];

/*start our service worker and cache all of our content
self.addEventListener('install', function (e) {
	e.waituntil(
		caches.open(cacheName).then(fuction(cache){
			return cache.addAll(filesToCache);
		})
	);
	self.skipWaiting();
});*/

self.addEventListener('install', (e) => {
	console.log('[Service Worker] Install');
	e.waitUntil((async () => {
	  const cache = await caches.open(cacheName);
	  console.log('[Service Worker] Caching all: app shell and content');
	  await cache.addAll(filesToCache);
	})());
  });

  self.addEventListener('fetch', (e) => {
	e.respondWith((async () => {
	  const r = await caches.match(e.request);
	  console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
	  if (r) { return r; }
	  const response = await fetch(e.request);
	  const cache = await caches.open(cacheName);
	  console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
	  cache.put(e.request, response.clone());
	  return response;
	})());
  });
/*
self.addEventListener('fetch', function (e) {
	e.respondWith(
		caches.match(e.request).then(function (response) {
			return response || fetch(e.request);
		})
	);
});*/