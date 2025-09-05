import { migrateBioLinks } from './src/scripts/migrateBioLinks';

// Exécution du script de migration
migrateBioLinks().then(result => {
  console.log('Résultat de la migration:', result);
  if (result.success) {
    console.log('✅ Migration réussie!');
  } else {
    console.error('❌ Échec de la migration:', result.message);
  }
}).catch(error => {
  console.error('💥 Erreur critique:', error);
});
