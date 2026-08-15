const CACHE_NAME = 'kimiya-portfolio-v1.9';
const STATIC_CACHE = 'static-v1.9';

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/robots.txt',
  '/sitemap.xml',
  '/favicon.svg',
  '/icon-192.svg',
  '/icon-512.svg'
  // Fonts supprimées pour optimisation
];

// Headers de cache optimisés
const CACHE_HEADERS = {
  'Cache-Control': 'public, max-age=31536000, immutable', // 1 an pour assets avec hash
  'Expires': new Date(Date.now() + 31536000000).toUTCString()
};

// Install SW avec stratégie sécurisée
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        // Vérifier si l'API moderne de stockage est disponible
        if ('storage' in navigator && 'persist' in navigator.storage) {
          navigator.storage.persist().then(granted => {
            if (granted) {
              console.log('SW: Stockage persistant accordé');
            }
          });
        }

        // Cache seulement les ressources essentielles une par une
        const cachePromises = STATIC_ASSETS.map(url => {
          return fetch(url, { mode: 'no-cors' })
            .then(response => {
              if (response.ok || response.type === 'opaque') {
                return cache.put(url, response);
              }
            })
            .catch(() => {
              console.log(`SW: Impossible de mettre en cache ${url}, ignoré`);
            });
        });
        return Promise.all(cachePromises);
      })
      .then(() => self.skipWaiting())
      .catch(error => {
        console.log('SW: Erreur lors de l\'installation, mais continuation:', error);
        return self.skipWaiting();
      })
  );
});

// Activate SW avec nettoyage optimisé
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME && name !== STATIC_CACHE)
          .map((name) => caches.delete(name))
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch Strategy: Network First with Cache Fallback
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  // Skip chrome-extension and other non-http requests
  if (!event.request.url.startsWith('http')) return;

  const url = new URL(event.request.url);

  // Skip external services that should not be cached
  const skipPatterns = [
    'cloudflareinsights.com',
    'google-analytics.com',
    'googletagmanager.com',
    'supabase',
    'chrome-extension://',
    'moz-extension://'
  ];

  if (skipPatterns.some(pattern => event.request.url.includes(pattern))) {
    return; // Let browser handle these requests normally
  }

  // Les médias sont laissés au navigateur : l'élément <audio> demande le fichier
  // par plages d'octets, et une réponse 206 ne peut de toute façon pas entrer
  // dans le Cache API. Passer par le service worker reviendrait à recopier
  // plusieurs mégaoctets par piste dans le cache pour rien.
  if (url.pathname.startsWith('/audio/') || /\.(mp3|m4a|aac|ogg|wav|flac)$/i.test(url.pathname)) {
    return;
  }

  // Skip source files and development paths
  if (url.pathname.includes('/src/') ||
      url.pathname.includes('.tsx') ||
      url.pathname.includes('.ts') ||
      url.pathname.includes('.jsx') ||
      url.pathname.includes('.js.map')) {
    return; // Ignore source file requests completely
  }

  // Ressources statiques avec cache agressif
  if (url.pathname.match(/\.(js|css|woff2?|png|jpg|jpeg|gif|svg|ico)$/)) {
    event.respondWith(
      caches.open(CACHE_NAME).then(cache =>
        cache.match(event.request).then(cachedResponse => {
          if (cachedResponse) {
            return cachedResponse;
          }

          return fetch(event.request).then(response => {
            if (response.status === 200) {
              cache.put(event.request, response.clone());
            }
            return response;
          }).catch(() => {
            // Silent fail for static assets
            return new Response('', { status: 404 });
          });
        })
      )
    );
    return;
  }

  // Handle other requests with network-first strategy
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Si c'est une navigation (HTML) et qu'on a un 404, on sert l'index
        if (event.request.mode === 'navigate' && response.status === 404) {
          return caches.match('/index.html') || response;
        }

        // Cache successful responses - clone BEFORE using
        if (response.status === 200 && response.ok) {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          }).catch(() => {
            // Silent cache error, don't break the response
          });
        }
        return response;
      })
      .catch(() => {
        // Fallback to cache silently
        return caches.match(event.request).then(cached => {
          if (cached) return cached;
          
          // Si navigation échoue (offline), on sert l'index
          if (event.request.mode === 'navigate') {
            return caches.match('/index.html');
          }
          
          return new Response('', { status: 404 });
        });
      })
  );
});
