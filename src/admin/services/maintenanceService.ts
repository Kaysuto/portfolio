import { supabase } from '@/lib/supabase';

// Fonction pour récupérer l'état de la maintenance
export const getMaintenanceStatus = async (): Promise<{ is_enabled: boolean } | null> => {
  try {
    const { data, error } = await supabase
      .from('maintenance')
      .select('is_enabled')
      .single(); // On s'attend à une seule ligne

    if (error) {
      console.error('Erreur lors de la récupération du statut de maintenance:', error.message);
      throw error;
    }

    // Si aucune donnée n'est retournée (par exemple, si la table est vide ou n'a pas de ligne), retourner null ou un état par défaut
    if (!data) {
      console.warn('Aucune donnée de maintenance trouvée, retour de la valeur par défaut (false).');
      return { is_enabled: false };
    }

    return data;
  } catch (error) {
    console.error('Erreur critique lors de la récupération du statut de maintenance:', error);
    // Retourner un état par défaut en cas d'erreur critique
    return { is_enabled: false };
  }
};

// Fonction pour définir l'état de la maintenance
export const setMaintenanceStatus = async (isEnabled: boolean): Promise<void> => {
  try {
    const { error } = await supabase
      .from('maintenance')
      .update({ is_enabled: isEnabled })
      .eq('id', 1); // On suppose qu'il y a une seule ligne avec id = 1

    if (error) {
      console.error('Erreur lors de la mise à jour du statut de maintenance:', error.message);
      throw error;
    }

    console.log(`Statut de maintenance mis à jour à: ${isEnabled}`);
  } catch (error) {
    console.error('Erreur critique lors de la mise à jour du statut de maintenance:', error);
    throw error;
  }
};
