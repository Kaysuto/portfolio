import { supabase } from '../../lib/supabase';

export interface PortfolioLink {
  id: string;
  title: string;
  url: string;
  type: 'github' | 'live' | 'social' | 'bio_link' | 'other';
  description?: string;
  icon?: string;
  is_active: boolean;
  click_count: number;
  created_at: string;
  updated_at: string;
}

export interface CreateLinkData {
  title: string;
  url: string;
  type: PortfolioLink['type'];
  description?: string;
  icon?: string;
  is_active?: boolean;
}

export interface UpdateLinkData extends Partial<CreateLinkData> {
  id: string;
}

export class LinksService {
  static async getAllLinks(): Promise<PortfolioLink[]> {
    try {
      const { data, error } = await supabase
        .from('links')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erreur récupération liens:', error);
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Erreur lors de la récupération des liens:', error);
      throw error;
    }
  }

  static async createLink(linkData: CreateLinkData): Promise<PortfolioLink> {
    try {
      // Préparer les données en excluant l'icon si elle est vide ou si la colonne n'existe pas
      const { icon, ...otherData } = linkData;
      let dataToInsert: any = {
        ...otherData,
        is_active: linkData.is_active ?? true,
        click_count: 0
      };

      // Inclure l'icon seulement si elle est définie et non vide
      if (icon && icon.trim()) {
        dataToInsert.icon = icon;
      }

      const { data, error } = await supabase
        .from('links')
        .insert([dataToInsert])
        .select()
        .single();

      if (error) {
        // Si l'erreur est liée à la colonne icon, réessayer sans
        if (error.message.includes('icon') && icon) {
          console.warn('Colonne icon non disponible, création sans icône...');
          const dataWithoutIcon = {
            ...otherData,
            is_active: linkData.is_active ?? true,
            click_count: 0
          };
          const { data: retryData, error: retryError } = await supabase
            .from('links')
            .insert([dataWithoutIcon])
            .select()
            .single();
          
          if (retryError) {
            console.error('Erreur création lien (retry):', retryError);
            throw retryError;
          }
          return retryData;
        }
        console.error('Erreur création lien:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Erreur lors de la création du lien:', error);
      throw error;
    }
  }

  static async updateLink(updateData: UpdateLinkData): Promise<PortfolioLink> {
    try {
      const { id, icon, ...data } = updateData;
      
      // Préparer les données de mise à jour
      let updatePayload: any = {
        ...data,
        updated_at: new Date().toISOString()
      };

      // Inclure l'icon seulement si elle est définie
      if (icon !== undefined) {
        updatePayload.icon = icon;
      }

      const { data: updatedLink, error } = await supabase
        .from('links')
        .update(updatePayload)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        // Si l'erreur est liée à la colonne icon, réessayer sans
        if (error.message.includes('icon')) {
          console.warn('Colonne icon non disponible, mise à jour sans icône...');
          const updateWithoutIcon = {
            ...data,
            updated_at: new Date().toISOString()
          };
          const { data: retryData, error: retryError } = await supabase
            .from('links')
            .update(updateWithoutIcon)
            .eq('id', id)
            .select()
            .single();
          
          if (retryError) {
            console.error('Erreur mise à jour lien (retry):', retryError);
            throw retryError;
          }
          return retryData;
        }
        console.error('Erreur mise à jour lien:', error);
        throw error;
      }

      return updatedLink;
    } catch (error) {
      console.error('Erreur lors de la mise à jour du lien:', error);
      throw error;
    }
  }

  static async deleteLink(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('links')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Erreur suppression lien:', error);
        throw error;
      }
    } catch (error) {
      console.error('Erreur lors de la suppression du lien:', error);
      throw error;
    }
  }

  static async toggleLinkStatus(id: string): Promise<PortfolioLink> {
    try {
      // Récupérer le statut actuel
      const { data: currentLink, error: fetchError } = await supabase
        .from('links')
        .select('is_active')
        .eq('id', id)
        .single();

      if (fetchError) {
        console.error('Erreur récupération statut:', fetchError);
        throw fetchError;
      }

      // Inverser le statut
      const { data: updatedLink, error: updateError } = await supabase
        .from('links')
        .update({
          is_active: !currentLink.is_active,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (updateError) {
        console.error('Erreur toggle statut:', updateError);
        throw updateError;
      }

      return updatedLink;
    } catch (error) {
      console.error('Erreur lors du changement de statut:', error);
      throw error;
    }
  }

  static async checkIconColumnExists(): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from('links')
        .select('icon')
        .limit(1);

      // Si pas d'erreur, la colonne existe
      return !error;
    } catch (error) {
      return false;
    }
  }
}
