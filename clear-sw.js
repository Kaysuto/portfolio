// Script rapide pour désenregistrer le service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(registrations => {
    registrations.forEach(registration => {
      registration.unregister().then(() => {
        console.log('Service Worker désenregistré');
      });
    });
  });
}
