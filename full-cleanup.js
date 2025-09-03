// Script complet pour résoudre les problèmes de cache et service worker
// À exécuter dans la console du navigateur

console.log('🔧 Nettoyage du cache et service worker...');

// 1. Désenregistrer tous les service workers
async function cleanupServiceWorkers() {
  if ('serviceWorker' in navigator) {
    try {
      const registrations = await navigator.serviceWorker.getRegistrations();
      console.log(`📋 ${registrations.length} service worker(s) trouvé(s)`);

      for (const registration of registrations) {
        console.log('🗑️ Désenregistrement:', registration.scope);
        await registration.unregister();
      }

      console.log('✅ Tous les service workers désenregistrés');
    } catch (error) {
      console.error('❌ Erreur lors du désenregistrement:', error);
    }
  } else {
    console.log('ℹ️ Service Worker non supporté');
  }
}

// 2. Vider tous les caches
async function cleanupCaches() {
  if ('caches' in window) {
    try {
      const cacheNames = await caches.keys();
      console.log(`📋 ${cacheNames.length} cache(s) trouvé(s):`, cacheNames);

      await Promise.all(
        cacheNames.map(cacheName => {
          console.log('🗑️ Suppression du cache:', cacheName);
          return caches.delete(cacheName);
        })
      );

      console.log('✅ Tous les caches vidés');
    } catch (error) {
      console.error('❌ Erreur lors du nettoyage des caches:', error);
    }
  } else {
    console.log('ℹ️ Cache API non supporté');
  }
}

// 3. Forcer le rechargement des ressources
function forceReload() {
  console.log('🔄 Rechargement forcé de la page...');
  window.location.reload(true);
}

// Exécuter le nettoyage complet
async function fullCleanup() {
  await cleanupServiceWorkers();
  await cleanupCaches();

  console.log('🎉 Nettoyage terminé ! Rechargement dans 2 secondes...');
  setTimeout(forceReload, 2000);
}

// Démarrer le processus
fullCleanup();
