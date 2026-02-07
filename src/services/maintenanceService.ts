export interface MaintenanceStatus {
  is_enabled: boolean;
}

/**
 * Récupère le statut de maintenance de l'application.
 * Pour l'instant, retourne un statut désactivé par défaut.
 */
export const getMaintenanceStatus = async (): Promise<MaintenanceStatus> => {
  // Simulation d'un appel API ou vérification d'une variable d'environnement
  return { is_enabled: false };
};
