import { supabase } from '@/lib/supabase';
import { MaintenanceConfig } from '../types/admin';

// Fonction pour récupérer l'état de la maintenance
export const getMaintenanceStatus = async (): Promise<MaintenanceConfig | null> => {
  try {
    const { data, error } = await supabase
      .from('maintenance')
      .select('*')
      .single(); // On s'attend à une seule ligne

    if (error) {
      console.error('Erreur lors de la récupération du statut de maintenance:', error.message);
      throw error;
    }

    // Si aucune donnée n'est retournée (par exemple, si la table est vide ou n'a pas de ligne), retourner null ou un état par défaut
    if (!data) {
      console.warn('Aucune donnée de maintenance trouvée, retour de la valeur par défaut.');
      return { id: '1', is_enabled: false, message: '', estimated_time: '', updated_at: new Date().toISOString() };
    }

    return data;
  } catch (error) {
    console.error('Erreur critique lors de la récupération du statut de maintenance:', error);
    // Retourner un état par défaut en cas d'erreur critique
    return { id: '1', is_enabled: false, message: '', estimated_time: '', updated_at: new Date().toISOString() };
  }
};

// Fonction pour définir l'état de la maintenance
export const setMaintenanceStatus = async (config: MaintenanceConfig): Promise<void> => {
  try {
    const { error } = await supabase
      .from('maintenance')
      .update({
        is_enabled: config.is_enabled,
        message: config.message,
        estimated_time: config.estimated_time
      })
      .eq('id', 1); // On suppose qu'il y a une seule ligne avec id = 1

    if (error) {
      console.error('Erreur lors de la mise à jour du statut de maintenance:', error.message);
      throw error;
    }

    console.log(`Statut de maintenance mis à jour à:`, config);
  } catch (error) {
    console.error('Erreur critique lors de la mise à jour du statut de maintenance:', error);
    throw error;
  }
};
