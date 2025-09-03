// Script pour désactiver temporairement le service worker
// À exécuter dans la console du navigateur

async function unregisterServiceWorkers() {
  if ('serviceWorker' in navigator) {
    const registrations = await navigator.serviceWorker.getRegistrations();
    for (const registration of registrations) {
      console.log('Désenregistrement du service worker:', registration.scope);
      await registration.unregister();
    }
    console.log('Tous les service workers ont été désenregistrés');
  } else {
    console.log('Service Worker non supporté dans ce navigateur');
  }
}

// Exécuter automatiquement
unregisterServiceWorkers();
