import { supabase } from '../../lib/supabase';

export interface IPWhitelistEntry {
  id: string;
  ip_address: string;
  description?: string;
  created_at: string;
  is_active: boolean;
}

export interface SecurityMetrics {
  totalLoginAttempts: number;
  blockedAttempts: number;
  activeIPs: number;
  securityEvents: SecurityEvent[];
}

export interface SecurityEvent {
  id: string;
  type: 'login_attempt' | 'blocked_ip' | 'security_alert';
  message: string;
  ip_address?: string;
  timestamp: Date;
  severity: 'low' | 'medium' | 'high';
}

export interface CreateIPData {
  ip_address: string;
  description?: string;
  is_active?: boolean;
}

export class SecurityService {
  static async getIPWhitelist(): Promise<IPWhitelistEntry[]> {
    try {
      const { data, error } = await supabase
        .from('ip_whitelist')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erreur récupération whitelist IP:', error);
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Erreur lors de la récupération de la whitelist IP:', error);
      throw error;
    }
  }

  static async addIPToWhitelist(ipData: CreateIPData): Promise<IPWhitelistEntry> {
    try {
      const { data, error } = await supabase
        .from('ip_whitelist')
        .insert([{
          ...ipData,
          is_active: ipData.is_active ?? true
        }])
        .select()
        .single();

      if (error) {
        console.error('Erreur ajout IP whitelist:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'IP à la whitelist:', error);
      throw error;
    }
  }

  static async removeIPFromWhitelist(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('ip_whitelist')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Erreur suppression IP whitelist:', error);
        throw error;
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'IP:', error);
      throw error;
    }
  }

  static async toggleIPStatus(id: string): Promise<IPWhitelistEntry> {
    try {
      // Récupérer le statut actuel
      const { data: currentIP, error: fetchError } = await supabase
        .from('ip_whitelist')
        .select('is_active')
        .eq('id', id)
        .single();

      if (fetchError) {
        console.error('Erreur récupération statut IP:', fetchError);
        throw fetchError;
      }

      // Inverser le statut
      const { data: updatedIP, error: updateError } = await supabase
        .from('ip_whitelist')
        .update({ is_active: !currentIP.is_active })
        .eq('id', id)
        .select()
        .single();

      if (updateError) {
        console.error('Erreur toggle statut IP:', updateError);
        throw updateError;
      }

      return updatedIP;
    } catch (error) {
      console.error('Erreur lors du changement de statut IP:', error);
      throw error;
    }
  }

  static async getSecurityMetrics(): Promise<SecurityMetrics> {
    try {
      // Récupérer la whitelist IP
      const whitelist = await this.getIPWhitelist();

      // Métriques simulées pour l'instant (à remplacer par vraies données)
      const metrics: SecurityMetrics = {
        totalLoginAttempts: 156,
        blockedAttempts: 23,
        activeIPs: whitelist.filter(ip => ip.is_active).length,
        securityEvents: [
          {
            id: '1',
            type: 'login_attempt',
            message: 'Tentative de connexion réussie',
            ip_address: '192.168.1.100',
            timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
            severity: 'low'
          },
          {
            id: '2',
            type: 'blocked_ip',
            message: 'IP bloquée - trop de tentatives',
            ip_address: '45.123.45.67',
            timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
            severity: 'high'
          },
          {
            id: '3',
            type: 'security_alert',
            message: 'Scan de sécurité terminé',
            timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
            severity: 'low'
          }
        ]
      };

      return metrics;
    } catch (error) {
      console.error('Erreur lors de la récupération des métriques sécurité:', error);
      return {
        totalLoginAttempts: 0,
        blockedAttempts: 0,
        activeIPs: 0,
        securityEvents: []
      };
    }
  }

  static async validateIP(ip: string): Promise<boolean> {
    try {
      const whitelist = await this.getIPWhitelist();
      const activeIPs = whitelist.filter(entry => entry.is_active);

      // Vérifier si l'IP est dans la whitelist
      return activeIPs.some(entry => entry.ip_address === ip);
    } catch (error) {
      console.error('Erreur validation IP:', error);
      return false;
    }
  }
}
