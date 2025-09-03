const CACHE_NAME = 'kimiya-portfolio-v1.2';
const STATIC_CACHE = 'static-v1.2';

const STATIC_ASSETS = [
  '/',
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

  // Gestion optimisée du cache pour les ressources statiques
  const url = new URL(event.request.url);

  // Ressources statiques avec cache agressif (1 an)
  if (url.pathname.match(/\.(js|css|woff2?|png|jpg|jpeg|gif|svg|ico)$/)) {
    event.respondWith(
      caches.open(CACHE_NAME).then(cache =>
        cache.match(event.request).then(cachedResponse => {
          if (cachedResponse) {
            // Vérifier si la ressource n'est pas trop vieille (simuler max-age)
            const cacheTime = cachedResponse.headers.get('sw-cache-time');
            const now = Date.now();
            const maxAge = 365 * 24 * 60 * 60 * 1000; // 1 an en ms

            if (cacheTime && (now - parseInt(cacheTime)) < maxAge) {
              return cachedResponse;
            }
          }

          // Fetch et cache avec timestamp
          return fetch(event.request).then(response => {
            if (response.status === 200) {
              const responseClone = response.clone();
              // Ajouter un timestamp personnalisé pour simuler max-age
              const headers = new Headers(responseClone.headers);
              headers.set('sw-cache-time', Date.now().toString());

              const modifiedResponse = new Response(responseClone.body, {
                status: responseClone.status,
                statusText: responseClone.statusText,
                headers: headers
              });

              cache.put(event.request, modifiedResponse);
            }
            return response;
          });
        })
      )
    );
    return;
  }

  // Skip source files and development paths
  if (event.request.url.includes('/src/') ||
      event.request.url.includes('.tsx') ||
      event.request.url.includes('.ts') ||
      event.request.url.includes('.jsx') ||
      event.request.url.includes('.js.map')) {
    return; // Ignore source file requests completely
  }

  // Skip external API requests (Supabase, etc.)
  if (event.request.url.includes('supabase') ||
      event.request.url.includes('100.79.95.114') ||
      event.request.url.includes('db.kaysuto.fr') ||
      event.request.url.includes('kaysuto.fr')) {
    return; // Let the browser handle these requests normally
  }

  event.respondWith(
    caches.open(CACHE_NAME).then((cache) =>
      fetch(event.request)
        .then((response) => {
          // Cache successful responses
          if (response.status === 200) {
            cache.put(event.request, response.clone());
          }
          return response;
        })
        .catch((error) => {
          console.log('SW: Network failed, trying cache for:', event.request.url);
          // Fallback to cache
          return cache.match(event.request) ||
                 caches.match(event.request) ||
                 fetch(event.request); // Try network again as last resort
        })
    )
  );
});
