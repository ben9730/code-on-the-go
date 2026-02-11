const CACHE_NAME = 'memory-plus-v1';
const ASSETS = [
    './',
    'index.html',
    'css/style.css',
    'css/games.css',
    'js/scoring.js',
    'js/app.js',
    'js/games/card-match.js',
    'js/games/simon.js',
    'js/games/word-quiz.js',
    'js/games/spot-diff.js',
    'js/games/number-memory.js',
    'js/games/image-word.js',
    'js/games/color-memory.js',
    'js/games/reaction-speed.js',
    'manifest.json'
];

// Install: cache all assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(ASSETS))
            .then(() => self.skipWaiting())
    );
});

// Activate: clean old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys
                .filter(key => key !== CACHE_NAME)
                .map(key => caches.delete(key))
            )
        ).then(() => self.clients.claim())
    );
});

// Fetch: cache-first strategy
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then(cached => {
            return cached || fetch(event.request).then(response => {
                if (response.ok) {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
                }
                return response;
            });
        }).catch(() => {
            if (event.request.mode === 'navigate') {
                return caches.match('index.html');
            }
        })
    );
});
