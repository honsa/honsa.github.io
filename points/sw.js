const staticCacheName = 'points-pwa-0.0.4';
const filesToCache = [
    '/',
    '/index.html',
    '/main.css',
    '/main.js'
];

/**
 * Add the files to the cache
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
        caches.match(event.request) // Try to find the requested resource in the cache
            .then(response => {
                // If found in cache, return it (offline response)
                if (response) {
                    return response;
                }

                // If not in cache, fetch from the network (fallback)
                return fetch(event.request);
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