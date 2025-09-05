import { supabase } from '../../lib/supabase';

export interface MaintenanceConfig {
  id: string;
  is_enabled: boolean;
  message: string;
  estimated_time?: string;
  updated_at: string;
}

export interface UpdateMaintenanceData {
  is_enabled?: boolean;
  message?: string;
  estimated_time?: string;
}

export class MaintenanceService {
  static async getMaintenanceConfig(): Promise<MaintenanceConfig | null> {
    try {
      const { data, error } = await supabase
        .from('maintenance_config')
        .select('*')
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Erreur récupération config maintenance:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Erreur lors de la récupération de la config maintenance:', error);
      return null;
    }
  }

  static async updateMaintenanceConfig(updateData: UpdateMaintenanceData): Promise<MaintenanceConfig> {
    try {
      // Récupérer la config existante ou en créer une nouvelle
      let existingConfig = await this.getMaintenanceConfig();

      if (existingConfig) {
        // Mettre à jour la config existante
        const { data, error } = await supabase
          .from('maintenance_config')
          .update({
            ...updateData,
            updated_at: new Date().toISOString()
          })
          .eq('id', existingConfig.id)
          .select()
          .single();

        if (error) {
          console.error('Erreur mise à jour config maintenance:', error);
          throw error;
        }

        return data;
      } else {
        // Créer une nouvelle config
        const { data, error } = await supabase
          .from('maintenance_config')
          .insert([{
            is_enabled: updateData.is_enabled ?? false,
            message: updateData.message ?? 'Site en maintenance',
            estimated_time: updateData.estimated_time
          }])
          .select()
          .single();

        if (error) {
          console.error('Erreur création config maintenance:', error);
          throw error;
        }

        return data;
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la config maintenance:', error);
      throw error;
    }
  }

  static async toggleMaintenance(): Promise<MaintenanceConfig> {
    try {
      const currentConfig = await this.getMaintenanceConfig();

      if (currentConfig) {
        return await this.updateMaintenanceConfig({
          is_enabled: !currentConfig.is_enabled
        });
      } else {
        return await this.updateMaintenanceConfig({
          is_enabled: true
        });
      }
    } catch (error) {
      console.error('Erreur lors du toggle maintenance:', error);
      throw error;
    }
  }

  static async setMaintenanceMessage(message: string): Promise<MaintenanceConfig> {
    try {
      return await this.updateMaintenanceConfig({ message });
    } catch (error) {
      console.error('Erreur lors de la mise à jour du message:', error);
      throw error;
    }
  }

  static async setEstimatedTime(estimatedTime: string): Promise<MaintenanceConfig> {
    try {
      return await this.updateMaintenanceConfig({ estimated_time: estimatedTime });
    } catch (error) {
      console.error('Erreur lors de la mise à jour du temps estimé:', error);
      throw error;
    }
  }
}
