import { LinksService, PortfolioLink } from '../admin/services/linksService';

export interface BioLinkIcon {
  name: string;
  phosphorIcon: string; // nom de l'icône Phosphor
}

export interface BioLink extends PortfolioLink {
  type: 'bio_link';
  icon?: string; // nom de l'icône Phosphor pour l'affichage
}

// Mapping des liens bio avec leurs icônes par défaut
const bioLinkIcons: Record<string, string> = {
  'Email': 'EnvelopeSimple',
  'Discord': 'DiscordLogo', 
  'Site personnel': 'Globe',
  'Clover Games': 'GameController',
  'DeviantArt': 'Palette',
  'Emoji.gg': 'SmileyXEyes',
  'Pinterest': 'PaintBrush',
  'GitHub': 'GithubLogo'
};

export class BioLinksService {
  /**
   * Récupère tous les liens bio actifs
   */
  static async getBioLinks(): Promise<BioLink[]> {
    try {
      const allLinks = await LinksService.getAllLinks();
      const bioLinks = allLinks.filter(link => link.type === 'bio_link' && link.is_active) as BioLink[];
      
      // Ajouter les icônes par défaut basées sur le titre
      return bioLinks.map(link => ({
        ...link,
        icon: bioLinkIcons[link.title] || 'LinkSimple'
      }));
      
    } catch (error) {
      console.error('Erreur lors de la récupération des liens bio:', error);
      throw error;
    }
  }

  /**
   * Récupère tous les liens bio (actifs et inactifs) pour l'admin
   */
  static async getAllBioLinks(): Promise<BioLink[]> {
    try {
      const allLinks = await LinksService.getAllLinks();
      const bioLinks = allLinks.filter(link => link.type === 'bio_link') as BioLink[];
      
      return bioLinks.map(link => ({
        ...link,
        icon: bioLinkIcons[link.title] || 'LinkSimple'
      }));
      
    } catch (error) {
      console.error('Erreur lors de la récupération de tous les liens bio:', error);
      throw error;
    }
  }

  /**
   * Met à jour l'icône d'un lien bio
   */
  static updateIconMapping(title: string, icon: string) {
    bioLinkIcons[title] = icon;
  }

  /**
   * Retourne la liste des icônes disponibles pour les liens bio
   */
  static getAvailableIcons(): string[] {
    return [
      'EnvelopeSimple', 'DiscordLogo', 'Globe', 'GameController', 
      'Palette', 'SmileyXEyes', 'PaintBrush', 'GithubLogo',
      'TwitterLogo', 'InstagramLogo', 'LinkedinLogo', 'YoutubeLogo',
      'TwitchLogo', 'SpotifyLogo', 'LinkSimple', 'Phone',
      'MapPin', 'Calendar', 'Download', 'Share'
    ];
  }
}
