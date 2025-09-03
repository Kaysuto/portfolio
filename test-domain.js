// Test rapide de db.kaysuto.fr
console.log('🔍 Test du domaine db.kaysuto.fr...');

fetch('https://db.kaysuto.fr/rest/v1/', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  }
})
.then(response => {
  console.log('✅ Domaine accessible - Status:', response.status);
  if (response.status === 401) {
    console.log('ℹ️ Erreur 401 normale (authentification requise)');
  }
  return response.text();
})
.then(data => {
  console.log('📄 Réponse:', data.substring(0, 100) + '...');
})
.catch(error => {
  console.error('❌ Erreur de connexion:', error.message);
});
