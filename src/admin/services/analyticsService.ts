import { supabase } from '../../lib/supabase';

export interface VisitorStats {
  id: string;
  date: string;
  page_views: number;
  unique_visitors: number;
  created_at: string;
}

export interface AnalyticsData {
  totalVisitors: number;
  totalPageViews: number;
  averageSessionDuration: number;
  topPages: Array<{ page: string; views: number }>;
  dailyStats: VisitorStats[];
  weeklyGrowth: number;
  monthlyGrowth: number;
}

export class AnalyticsService {
  static async getAnalyticsData(): Promise<AnalyticsData> {
    try {
      // Récupérer toutes les statistiques
      const { data: stats, error } = await supabase
        .from('visitor_stats')
        .select('*')
        .order('date', { ascending: false })
        .limit(30); // Derniers 30 jours

      if (error) {
        console.error('Erreur récupération analytics:', error);
        throw error;
      }

      const statsData = stats || [];

      // Calculer les totaux
      const totalVisitors = statsData.reduce((sum, stat) => sum + stat.unique_visitors, 0);
      const totalPageViews = statsData.reduce((sum, stat) => sum + stat.page_views, 0);

      // Calculer la croissance hebdomadaire
      const weeklyStats = statsData.slice(0, 7);
      const previousWeekStats = statsData.slice(7, 14);
      const weeklyGrowth = this.calculateGrowth(weeklyStats, previousWeekStats);

      // Calculer la croissance mensuelle
      const monthlyStats = statsData.slice(0, 30);
      const previousMonthStats = statsData.slice(30, 60);
      const monthlyGrowth = this.calculateGrowth(monthlyStats, previousMonthStats);

      // Pages les plus visitées (simulé pour l'instant)
      const topPages = [
        { page: '/', views: Math.floor(totalPageViews * 0.4) },
        { page: '/projects', views: Math.floor(totalPageViews * 0.25) },
        { page: '/about', views: Math.floor(totalPageViews * 0.2) },
        { page: '/contact', views: Math.floor(totalPageViews * 0.15) }
      ];

      return {
        totalVisitors,
        totalPageViews,
        averageSessionDuration: 180, // 3 minutes en secondes (simulé)
        topPages,
        dailyStats: statsData,
        weeklyGrowth,
        monthlyGrowth
      };
    } catch (error) {
      console.error('Erreur lors de la récupération des analytics:', error);
      return {
        totalVisitors: 0,
        totalPageViews: 0,
        averageSessionDuration: 0,
        topPages: [],
        dailyStats: [],
        weeklyGrowth: 0,
        monthlyGrowth: 0
      };
    }
  }

  static async recordVisitorStats(pageViews: number, uniqueVisitors: number): Promise<void> {
    try {
      const today = new Date().toISOString().split('T')[0];

      // Vérifier si une entrée existe déjà pour aujourd'hui
      const { data: existingStats, error: fetchError } = await supabase
        .from('visitor_stats')
        .select('*')
        .eq('date', today)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        console.error('Erreur vérification stats existantes:', fetchError);
        throw fetchError;
      }

      if (existingStats) {
        // Mettre à jour les stats existantes
        const { error: updateError } = await supabase
          .from('visitor_stats')
          .update({
            page_views: existingStats.page_views + pageViews,
            unique_visitors: existingStats.unique_visitors + uniqueVisitors
          })
          .eq('date', today);

        if (updateError) {
          console.error('Erreur mise à jour stats:', updateError);
          throw updateError;
        }
      } else {
        // Créer une nouvelle entrée
        const { error: insertError } = await supabase
          .from('visitor_stats')
          .insert([{
            date: today,
            page_views: pageViews,
            unique_visitors: uniqueVisitors
          }]);

        if (insertError) {
          console.error('Erreur création stats:', insertError);
          throw insertError;
        }
      }
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement des stats:', error);
      throw error;
    }
  }

  private static calculateGrowth(current: VisitorStats[], previous: VisitorStats[]): number {
    const currentTotal = current.reduce((sum, stat) => sum + stat.unique_visitors, 0);
    const previousTotal = previous.reduce((sum, stat) => sum + stat.unique_visitors, 0);

    if (previousTotal === 0) return 0;

    return ((currentTotal - previousTotal) / previousTotal) * 100;
  }
}
