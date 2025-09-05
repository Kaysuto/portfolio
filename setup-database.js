#!/usr/bin/env node

/**
 * Script d'installation pour créer la table links
 * Usage: node setup-database.js
 */

import { createLinksTable, checkTableExists } from './src/scripts/createLinksTable.js';

async function setupDatabase() {
  console.log('🚀 Installation de la base de données...\n');

  try {
    // Vérifier si la table existe déjà
    console.log('🔍 Vérification de l\'existence de la table...');
    const tableCheck = await checkTableExists();
    
    if (tableCheck.exists) {
      console.log('✅ La table "links" existe déjà!');
      console.log(`📊 Nombre d'entrées: ${tableCheck.count || 0}`);
      return;
    }

    console.log('❌ Table "links" non trouvée, création en cours...\n');

    // Créer la table
    const result = await createLinksTable();
    
    if (result.success) {
      console.log('\n🎉 Installation terminée avec succès!');
      console.log('✅ Vous pouvez maintenant:');
      console.log('   1. Aller sur /admin/debug');
      console.log('   2. Migrer les liens bio');
      console.log('   3. Utiliser l\'interface admin pour gérer les liens');
    } else {
      console.error('\n❌ Échec de l\'installation:');
      console.error(result.message);
      process.exit(1);
    }

  } catch (error) {
    console.error('\n💥 Erreur critique:', error.message);
    process.exit(1);
  }
}

// Exécuter si appelé directement
if (process.argv[1].endsWith('setup-database.js')) {
  setupDatabase();
}

export default setupDatabase;
