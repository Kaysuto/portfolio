import { supabase } from '../lib/supabase';

/**
 * Script pour créer la table links dans Supabase
 * Exécute le SQL de création avec toutes les colonnes nécessaires
 */

const createLinksTableSQL = `
-- Créer la table links
CREATE TABLE IF NOT EXISTS public.links (
  -- Clé primaire UUID avec génération automatique
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Informations principales du lien
  title VARCHAR(255) NOT NULL,
  url TEXT NOT NULL,
  description TEXT,
  
  -- Type de lien avec contrainte
  type VARCHAR(50) NOT NULL CHECK (type IN ('github', 'live', 'social', 'bio_link', 'other')),
  
  -- État et statistiques
  is_active BOOLEAN DEFAULT true NOT NULL,
  click_count INTEGER DEFAULT 0 NOT NULL,
  
  -- Métadonnées temporelles
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Créer des index pour optimiser les performances
CREATE INDEX IF NOT EXISTS idx_links_type ON public.links(type);
CREATE INDEX IF NOT EXISTS idx_links_is_active ON public.links(is_active);
CREATE INDEX IF NOT EXISTS idx_links_created_at ON public.links(created_at);
`;

const createUpdateTriggerSQL = `
-- Créer un trigger pour mettre à jour automatiquement updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_links_updated_at 
    BEFORE UPDATE ON public.links 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
`;

export const createLinksTable = async () => {
  console.log('🚀 Création de la table links...');
  
  try {
    // Créer la table principale
    console.log('📋 Création de la table et des index...');
    const { error: tableError } = await supabase.rpc('exec_sql', {
      sql: createLinksTableSQL
    });

    if (tableError) {
      // Essayer avec une approche directe si rpc ne fonctionne pas
      console.log('⚠️  RPC non disponible, tentative directe...');
      const { error: directError } = await supabase
        .from('_sql')
        .insert({ query: createLinksTableSQL });
      
      if (directError) {
        throw new Error(`Erreur création table: ${tableError.message}`);
      }
    }

    // Créer le trigger de mise à jour
    console.log('⚡ Création du trigger updated_at...');
    const { error: triggerError } = await supabase.rpc('exec_sql', {
      sql: createUpdateTriggerSQL
    });

    if (triggerError) {
      console.warn('⚠️  Trigger non créé:', triggerError.message);
    }

    // Vérifier que la table existe
    console.log('🔍 Vérification de la table...');
    const { data, error: checkError } = await supabase
      .from('links')
      .select('*')
      .limit(1);

    if (checkError) {
      throw new Error(`Table non accessible: ${checkError.message}`);
    }

    console.log('✅ Table links créée avec succès!');
    console.log('📊 Structure:');
    console.log('   - id (UUID, PK, auto-généré)');
    console.log('   - title (VARCHAR, requis)');
    console.log('   - url (TEXT, requis)');
    console.log('   - description (TEXT, optionnel)');
    console.log('   - type (ENUM: github|live|social|bio_link|other)');
    console.log('   - is_active (BOOLEAN, défaut: true)');
    console.log('   - click_count (INTEGER, défaut: 0)');
    console.log('   - created_at (TIMESTAMPTZ, auto)');
    console.log('   - updated_at (TIMESTAMPTZ, auto + trigger)');

    return { 
      success: true, 
      message: 'Table links créée avec succès',
      tableExists: true
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

// Fonction pour vérifier si la table existe déjà
export const checkTableExists = async () => {
  try {
    const { data, error } = await supabase
      .from('links')
      .select('count', { count: 'exact', head: true });

    if (error) {
      return { exists: false, error: error.message };
    }

    return { exists: true, count: data || 0 };
  } catch (error) {
    return { exists: false, error: error.message };
  }
};

// Fonction pour obtenir les infos de la table
export const getTableInfo = async () => {
  try {
    const { data, error } = await supabase
      .from('links')
      .select('*')
      .limit(5);

    if (error) {
      return { success: false, error: error.message };
    }

    return { 
      success: true, 
      rowCount: data?.length || 0,
      sampleData: data
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
