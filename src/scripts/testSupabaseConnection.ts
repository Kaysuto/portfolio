import { supabase } from '../lib/supabase';

export const testSupabaseConnection = async () => {
  // console.log('🔗 Test de connexion Supabase...');
  
  try {
    // Test 1: Connexion basique
    // console.log('📡 URL Supabase:', import.meta.env.VITE_SUPABASE_URL || 'URL par défaut');
    
    // Test 2: Requête directe sur la table links
    // console.log('🔍 Test requête directe...');
    const { data, error, count } = await supabase
      .from('links')
      .select('*', { count: 'exact' });
    
    if (error) {
      // console.error('❌ Erreur Supabase:', error);
      return {
        success: false,
        error: error.message,
        details: error
      };
    }
    
    // console.log('✅ Requête réussie!');
    // console.log('📊 Nombre total:', count);
    // console.log('📋 Données:', data);
    
    // Test 3: Structure des données
    if (data && data.length > 0) {
      // console.log('🔬 Structure du premier élément:', Object.keys(data[0]));
      // console.log('📝 Premier élément complet:', data[0]);
    }
    
    // Test 4: Filtrer par type bio_link
    const { data: bioLinks, error: bioError } = await supabase
      .from('links')
      .select('*')
      .eq('type', 'bio_link');
    
    if (bioError) {
      // console.warn('⚠️ Erreur filtre bio_link:', bioError);
    } else {
      // console.log('🔗 Liens bio trouvés:', bioLinks?.length || 0);
      // console.log('📄 Liens bio:', bioLinks);
    }
    
    return {
      success: true,
      totalCount: count,
      allLinks: data,
      bioLinks,
      supabaseUrl: import.meta.env.VITE_SUPABASE_URL || 'URL par défaut'
    };
    
  } catch (error) {
    console.error('💥 Erreur critique:', error);
    return {
      success: false,
      error: error.message,
      details: error
    };
  }
};
