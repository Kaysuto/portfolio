import { supabase } from '../../lib/supabase';
import type { 
  AdminUser, 
  IPWhitelist, 
  PageLink, 
  SpotifyConfig, 
  MaintenanceConfig,
  VisitorStats,
  LinkClick,
  DashboardMetrics 
} from '../types/admin';

// Service d'authentification admin
export class AdminAuthService {
  static async login(email: string, password: string): Promise<AdminUser | null> {
    try {
      // TODO: Implémenter l'authentification réelle
      // Pour le moment, simulation
      if (email === 'admin@kaysuto.fr' && password === 'admin123') {
        return {
          id: '1',
          email: 'admin@kaysuto.fr',
          mfa_enabled: false,
          created_at: new Date().toISOString()
        };
      }
      return null;
    } catch (error) {
      console.error('Erreur login admin:', error);
      return null;
    }
  }

  static async validateSession(): Promise<boolean> {
    // TODO: Validation session réelle
    return localStorage.getItem('admin_session') !== null;
  }

  static async logout(): Promise<void> {
    localStorage.removeItem('admin_session');
  }
}

// Service de gestion de la liste blanche IP
export class WhitelistService {
  static async getWhitelistedIPs(): Promise<IPWhitelist[]> {
    try {
      const { data, error } = await supabase
        .from('ip_whitelist')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Erreur récupération whitelist:', error);
      return [];
    }
  }

  static async addIP(ip: string, description?: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('ip_whitelist')
        .insert({
          ip_address: ip,
          description,
          is_active: true
        });

      return !error;
    } catch (error) {
      console.error('Erreur ajout IP:', error);
      return false;
    }
  }

  static async removeIP(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('ip_whitelist')
        .delete()
        .eq('id', id);

      return !error;
    } catch (error) {
      console.error('Erreur suppression IP:', error);
      return false;
    }
  }

  static async validateIP(clientIP: string): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from('ip_whitelist')
        .select('ip_address')
        .eq('is_active', true);

      if (error) return false;
      return data?.some(row => row.ip_address === clientIP) || false;
    } catch (error) {
      console.error('Erreur validation IP:', error);
      return false;
    }
  }
}

// Service de gestion des liens
export class LinksService {
  static async getLinks(): Promise<PageLink[]> {
    try {
      const { data, error } = await supabase
        .from('page_links')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Erreur récupération liens:', error);
      return [];
    }
  }

  static async getActiveLinks(): Promise<PageLink[]> {
    try {
      const { data, error } = await supabase
        .from('page_links')
        .select('*')
        .eq('is_active', true)
        .order('order_index', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Erreur récupération liens actifs:', error);
      return [];
    }
  }

  static async createLink(link: Omit<PageLink, 'id' | 'created_at' | 'click_count'>): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('page_links')
        .insert({
          ...link,
          click_count: 0
        });

      return !error;
    } catch (error) {
      console.error('Erreur création lien:', error);
      return false;
    }
  }

  static async updateLink(id: string, updates: Partial<PageLink>): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('page_links')
        .update(updates)
        .eq('id', id);

      return !error;
    } catch (error) {
      console.error('Erreur mise à jour lien:', error);
      return false;
    }
  }

  static async deleteLink(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('page_links')
        .delete()
        .eq('id', id);

      return !error;
    } catch (error) {
      console.error('Erreur suppression lien:', error);
      return false;
    }
  }

  static async reorderLinks(links: PageLink[]): Promise<boolean> {
    try {
      const updates = links.map((link, index) => ({
        id: link.id,
        order_index: index
      }));

      for (const update of updates) {
        await supabase
          .from('page_links')
          .update({ order_index: update.order_index })
          .eq('id', update.id);
      }

      return true;
    } catch (error) {
      console.error('Erreur réorganisation liens:', error);
      return false;
    }
  }

  static async trackClick(linkId: string, referrer?: string): Promise<void> {
    try {
      // Récupérer le compteur actuel et l'incrémenter
      const { data: currentLink } = await supabase
        .from('page_links')
        .select('click_count')
        .eq('id', linkId)
        .single();

      if (currentLink) {
        await supabase
          .from('page_links')
          .update({ 
            click_count: currentLink.click_count + 1
          })
          .eq('id', linkId);
      }

      // Enregistrer le clic pour analytics
      await supabase
        .from('link_clicks')
        .insert({
          link_id: linkId,
          referrer,
          clicked_at: new Date().toISOString()
        });
    } catch (error) {
      console.error('Erreur tracking clic:', error);
    }
  }
}

// Service de maintenance
export class MaintenanceService {
  static async getConfig(): Promise<MaintenanceConfig | null> {
    try {
      const { data, error } = await supabase
        .from('maintenance_config')
        .select('*')
        .single();

      if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows
      return data;
    } catch (error) {
      console.error('Erreur récupération config maintenance:', error);
      return null;
    }
  }

  static async updateConfig(config: Partial<MaintenanceConfig>): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('maintenance_config')
        .upsert({
          id: '1', // ID fixe pour singleton
          ...config,
          updated_at: new Date().toISOString()
        });

      return !error;
    } catch (error) {
      console.error('Erreur mise à jour config maintenance:', error);
      return false;
    }
  }
}

// Service analytics
export class AnalyticsService {
  static async getDashboardMetrics(): Promise<DashboardMetrics> {
    try {
      // Visiteurs aujourd'hui (simulation pour le moment)
      const visitorsToday = Math.floor(Math.random() * 100) + 50;
      
      // Pages vues aujourd'hui
      const pageViewsToday = Math.floor(Math.random() * 200) + 100;

      // Statistiques des liens
      const links = await LinksService.getLinks();
      const activeLinks = links.filter(link => link.is_active);
      const totalClicks = links.reduce((sum, link) => sum + link.click_count, 0);

      // Top liens
      const topLinks = links
        .sort((a, b) => b.click_count - a.click_count)
        .slice(0, 5)
        .map(link => ({
          title: link.title,
          clicks: link.click_count,
          url: link.url
        }));

      return {
        visitorsToday,
        pageViewsToday,
        totalLinks: links.length,
        activeLinks: activeLinks.length,
        totalClicks,
        topLinks
      };
    } catch (error) {
      console.error('Erreur récupération métriques:', error);
      return {
        visitorsToday: 0,
        pageViewsToday: 0,
        totalLinks: 0,
        activeLinks: 0,
        totalClicks: 0,
        topLinks: []
      };
    }
  }
}

// Service Spotify
export class SpotifyService {
  static async getConfig(): Promise<SpotifyConfig | null> {
    try {
      const { data, error } = await supabase
        .from('spotify_config')
        .select('*')
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return data;
    } catch (error) {
      console.error('Erreur récupération config Spotify:', error);
      return null;
    }
  }

  static async updateConfig(config: Partial<SpotifyConfig>): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('spotify_config')
        .upsert({
          id: '1', // ID fixe pour singleton
          ...config,
          updated_at: new Date().toISOString()
        });

      return !error;
    } catch (error) {
      console.error('Erreur mise à jour config Spotify:', error);
      return false;
    }
  }
}
