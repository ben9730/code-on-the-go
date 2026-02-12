const CACHE_NAME = 'memory-plus-v3';
const ASSETS = [
    './',
    'index.html',
    'css/style.css',
    'css/games.css',
    'js/utils.js',
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

// Install: cache all assets, wait for activation
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(ASSETS))
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

// Listen for skip-waiting message from client
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
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
