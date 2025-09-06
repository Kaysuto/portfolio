import dotenv from 'dotenv';
dotenv.config(); // Charger les variables d'environnement

/**
 * Script pour exécuter la migration de la table maintenance
 * Usage: node run-maintenance-migration.js
 */

import { createMaintenanceTable } from './src/scripts/createMaintenanceTable.ts';

async function runMigration() {
  console.log('🚀 Lancement de la migration de la table maintenance...\n');

  try {
    const result = await createMaintenanceTable();
    
    if (result.success) {
      console.log('\n🎉 Migration terminée avec succès!');
    } else {
      console.error('\n❌ Échec de la migration:');
      console.error(result.message);
      process.exit(1);
    }

  } catch (error) {
    console.error('\n💥 Erreur critique lors de la migration:', error.message);
    process.exit(1);
  }
}

runMigration();