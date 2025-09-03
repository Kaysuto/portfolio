// Script de diagnostic Supabase pour la console du navigateur
// À coller dans la console du navigateur pour tester la configuration

console.log('🔍 Diagnostic Supabase - Console Test');
console.log('📍 Vérification des variables d\'environnement...');

// Vérifier les variables d'environnement
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('VITE_SUPABASE_URL:', supabaseUrl);
console.log('VITE_SUPABASE_ANON_KEY présente:', !!supabaseKey);

// Test de connectivité basique
async function testConnectivity() {
  try {
    console.log('🌐 Test de connectivité vers:', supabaseUrl);

    const response = await fetch(`${supabaseUrl}/rest/v1/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    console.log('📊 Statut HTTP:', response.status);
    console.log('📊 Headers:', Object.fromEntries(response.headers.entries()));

    if (response.status === 401) {
      console.log('✅ Serveur accessible (401 = Non autorisé, c\'est normal sans clé)');
    } else if (response.status === 200) {
      console.log('✅ Serveur accessible');
    } else {
      console.log('⚠️ Statut inattendu:', response.status);
    }

  } catch (error) {
    console.error('❌ Erreur de connectivité:', error);
  }
}

// Test avec authentification
async function testWithAuth() {
  try {
    console.log('🔐 Test avec authentification...');

    const response = await fetch(`${supabaseUrl}/rest/v1/projects?select=count`, {
      method: 'HEAD',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseKey}`,
        'apikey': supabaseKey
      }
    });

    console.log('📊 Statut avec auth:', response.status);

    if (response.status === 200) {
      console.log('✅ Authentification réussie');
    } else {
      console.log('❌ Problème d\'authentification');
    }

  } catch (error) {
    console.error('❌ Erreur avec authentification:', error);
  }
}

// Exécuter les tests
testConnectivity().then(() => {
  setTimeout(() => testWithAuth(), 1000);
});

console.log('🔧 Pour exécuter les tests, copiez-collez ce script dans la console du navigateur à l\'adresse http://localhost:5173');
