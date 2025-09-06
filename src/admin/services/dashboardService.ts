import { supabase } from '../../lib/supabase';

export interface DashboardStats {
  visitorsToday: number;
  pageViews: number;
  activeLinks: number;
  totalLinks: number;
  maintenanceMode: boolean;
  securityStatus: 'safe' | 'warning' | 'danger';
}

export interface RecentActivity {
  id: string;
  type: 'link_created' | 'link_updated' | 'link_deleted' | 'maintenance_enabled' | 'maintenance_disabled';
  message: string;
  timestamp: Date;
}

export class DashboardService {
  static async getStats(): Promise<DashboardStats> {
    try {
      // Récupérer les statistiques des visiteurs
      const today = new Date().toISOString().split('T')[0];
      const { data: visitorStats, error: visitorError } = await supabase
        .from('visitor_stats')
        .select('*')
        .eq('date', today)
        .single();

      // Récupérer les liens
      const { data: links, error: linksError } = await supabase
        .from('links')
        .select('*');

      // Récupérer la configuration maintenance
      const { data: maintenance, error: maintenanceError } = await supabase
        .from('maintenance_config')
        .select('*')
        .single();

      if (visitorError && visitorError.code !== 'PGRST116') {
        console.error('Erreur stats visiteurs:', visitorError);
      }

      if (linksError) {
        console.error('Erreur liens:', linksError);
      }

      if (maintenanceError && maintenanceError.code !== 'PGRST116') {
        console.error('Erreur maintenance:', maintenanceError);
      }

      const activeLinks = links?.filter(link => link.is_active).length || 0;
      const totalLinks = links?.length || 0;

      return {
        visitorsToday: visitorStats?.unique_visitors || 0,
        pageViews: visitorStats?.page_views || 0,
        activeLinks,
        totalLinks,
        maintenanceMode: maintenance?.is_enabled || false,
        securityStatus: 'safe' as const
      };
    } catch (error) {
      console.error('Erreur lors de la récupération des stats:', error);
      return {
        visitorsToday: 0,
        pageViews: 0,
        activeLinks: 0,
        totalLinks: 0,
        maintenanceMode: false,
        securityStatus: 'safe'
      };
    }
  }

  static async getRecentActivity(): Promise<RecentActivity[]> {
    try {
      // Récupérer les liens récents
      const { data: recentLinks, error } = await supabase
        .from('links')
        .select('*')
        .order('updated_at', { ascending: false })
        .limit(5);

      if (error) {
        console.error('Erreur activité récente:', error);
        return [];
      }

      return recentLinks?.map(link => ({
        id: link.id,
        type: 'link_updated' as const,
        message: `Lien "${link.title}" mis à jour`,
        timestamp: new Date(link.updated_at)
      })) || [];
    } catch (error) {
      console.error('Erreur activité récente:', error);
      return [];
    }
  }
}
