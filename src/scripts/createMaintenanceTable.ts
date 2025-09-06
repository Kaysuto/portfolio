import { supabase } from '@/lib/supabase';
import * as fs from 'fs/promises';
import * as path from 'path';

export const createMaintenanceTable = async () => {
  console.log('🚀 Création de la table maintenance...');
  
  try {
    const sql = await fs.readFile(path.join(process.cwd(), 'database', 'create_maintenance_table.sql'), 'utf-8');
    
    // Utiliser l'approche directe pour insérer le SQL, car 'exec' n'est pas disponible
    console.log('📋 Exécution du SQL via supabase.from("_sql").insert...');
    const { error: directError } = await supabase
      .from('_sql')
      .insert({ query: sql });
      
    if (directError) {
      throw new Error(`Erreur lors de l'exécution du SQL : ${directError.message}`);
    }

    console.log('✅ Table maintenance créée avec succès!');

    return {
      success: true,
      message: 'Table maintenance créée avec succès',
    };

  } catch (error) {
    console.error('💥 Erreur lors de la création:', error);
    return {
      success: false,
      message: `Erreur: ${error.message}`,
      error
    };
  }
};