const staticCacheName = 'points-pwa-0.0.2';
const filesToCache = [
    '/',
    '/index.html',
    '/main.css',
    '/main.js'
];

/**
 * Add the files from the cache
 */
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(staticCacheName)
            .then(cache => cache.addAll(filesToCache))
    );
});

/**
 * Serve the files from the cache
 */
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
    );
});

/**
 * Delete outdated cache versions
 */
self.addEventListener('activate', event => {
    const currentCacheNames = Object.keys(caches);
    event.waitUntil(
        Promise.all(
            currentCacheNames.map(cacheName => {
                if (cacheName !== staticCacheName) {
                    return caches.delete(cacheName);
                }
            })
        )
    );
});