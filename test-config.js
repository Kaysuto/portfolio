// Script de test pour vérifier la configuration Supabase
console.log('🔍 Test de configuration Supabase...');

// Vérifier les variables d'environnement
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('URL Supabase:', supabaseUrl);
console.log('Clé API présente:', !!supabaseKey);

// Test de connectivité basique
fetch(`${supabaseUrl}/rest/v1/`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  }
})
.then(response => {
  console.log('✅ Connectivité OK - Status:', response.status);
  if (response.status === 401) {
    console.log('ℹ️ Erreur 401 normale (non authentifié)');
  }
})
.catch(error => {
  console.error('❌ Erreur de connectivité:', error.message);
  console.log('💡 Vérifiez que l\'URL est accessible et que le serveur Supabase fonctionne');
});
