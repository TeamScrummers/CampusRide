const CACHE_NAME = "version-1";
const urlsToCache = [ 'index.html', 'offline.html' ];

// The service worker (SW) is this so we make self = this.
// 'this' in service worker files actually represents the Service worker.
const self = this;

// Install SW
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');

                return cache.addAll(urlsToCache);
            })
    )
});

// Listen for requests
self.addEventListener('fetch', (event) => {
    event.respondWith(
        // match all requests the page is saving, e.g. image, api calls
        caches.match(event.request)
            .then(() => {
                return fetch(event.request) 
                // if we can not get data assume we are offline
                    .catch(() => caches.match('offline.html'))
            })
    )
});

// Activate the SW. 
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [];
    cacheWhitelist.push(CACHE_NAME);
    
    // if cacheWhitelist does not includes a specific CACHE_NAME then we delete that CACHE_NAME
    // if CACHE_NAME is in cacheWhitelist we keep it. 
    // This is so we don't store a infinite number of caches and only the most recent 
    event.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map((cacheName) => {
                if(!cacheWhitelist.includes(cacheName)) {
                    return caches.delete(cacheName);
                }
            })
        ))
            
    )
})