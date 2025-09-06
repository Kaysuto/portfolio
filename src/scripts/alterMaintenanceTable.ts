import { supabase } from '../../../lib/supabase';
import * as fs from 'fs/promises';
import * as path from 'path';

export const alterMaintenanceTable = async () => {
  console.log('🚀 Alteration de la table maintenance pour ajouter message et estimated_time...');
  
  try {
    const sql = await fs.readFile(path.join(process.cwd(), 'database', 'alter_maintenance_table.sql'), 'utf-8');
    
    console.log('📋 Exécution du SQL via supabase.from("_sql").insert...');
    const { error: directError } = await supabase
      .from('_sql')
      .insert({ query: sql });
      
    if (directError) {
      throw new Error(`Erreur lors de l'exécution du SQL : ${directError.message}`);
    }

    console.log('✅ Table maintenance altérée avec succès! Ajout des colonnes message et estimated_time.');

    return {
      success: true,
      message: 'Table maintenance altérée avec succès',
    };

  } catch (error) {
    console.error('💥 Erreur lors de l\'alteration:', error);
    return {
      success: false,
      message: `Erreur: ${error.message}`,
      error
    };
  }
};