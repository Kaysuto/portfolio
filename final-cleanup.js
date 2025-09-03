// Script de nettoyage complet pour corriger les erreurs restantes
console.log('🧹 Nettoyage complet en cours...');

// 1. Désenregistrer tous les service workers
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(registrations => {
    registrations.forEach(registration => {
      registration.unregister().then(() => {
        console.log('✅ Service Worker désenregistré');
      });
    });
  });
}

// 2. Vider tous les caches
if ('caches' in window) {
  caches.keys().then(names => {
    names.forEach(name => {
      caches.delete(name).then(() => {
        console.log(`✅ Cache "${name}" supprimé`);
      });
    });
  });
}

// 3. Recharger la page après nettoyage
setTimeout(() => {
  console.log('🔄 Rechargement de la page...');
  window.location.reload(true);
}, 2000);
