// Script de test pour le cookie consent
// À exécuter dans la console du navigateur

// 1. Vider le localStorage pour tester le comportement initial
console.log('🧹 Nettoyage du localStorage...');
localStorage.removeItem('cookie-consent');
console.log('✅ cookie-consent supprimé');

// 2. Recharger la page pour voir le banner initial
console.log('🔄 Rechargez la page pour voir le banner initial');
console.log('🎯 Testez ensuite le bouton X pour voir s\'il ferme et n\'apparaît plus');

// 3. Vérifier l'état du localStorage après fermeture
console.log('📝 Après avoir cliqué sur X, vérifiez :');
console.log('   localStorage.getItem("cookie-consent") devrait être "dismissed"');
