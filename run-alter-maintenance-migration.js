import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'http://100.79.95.114:8000';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlzcyI6InN1cGFiYXNlIiwiaWF0IjoxNzU1NjM3OTQ4LCJleHAiOjIwNzA5OTc5NDh9.ooNByjZ-M9a6fvLuVKM2nQwsKxAKfFpMNvD413L5f6E';

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

/**
 * Script pour exécuter l'alteration de la table maintenance
 * Usage: node run-alter-maintenance-migration.js
 */

async function runMigration() {
  console.log('🚀 Lancement de l\'alteration de la table maintenance...\n');

  try {
    const sql = `
ALTER TABLE maintenance ADD COLUMN IF NOT EXISTS message TEXT DEFAULT '';
ALTER TABLE maintenance ADD COLUMN IF NOT EXISTS estimated_time TEXT DEFAULT '';
UPDATE maintenance SET message = '' WHERE message IS NULL OR message = '';
UPDATE maintenance SET estimated_time = '' WHERE estimated_time IS NULL OR estimated_time = '';
`;

    console.log('📋 Exécution du SQL via supabase.from("_sql").insert...');
    const { error: directError } = await supabase
      .from('_sql')
      .insert({ query: sql });
      
    if (directError) {
      throw new Error(`Erreur lors de l'exécution du SQL : ${directError.message}`);
    }

    console.log('✅ Table maintenance altérée avec succès! Ajout des colonnes message et estimated_time.');

  } catch (error) {
    console.error('\n💥 Erreur critique lors de l\'alteration:', error.message);
    process.exit(1);
  }
}

runMigration();