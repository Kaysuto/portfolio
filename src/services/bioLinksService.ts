import { links as localLinks, type BioLink } from '../data/links';
export type { BioLink };

export interface BioLinkIcon {
  name: string;
  phosphorIcon: string;
}

const bioLinkIcons: Record<string, string> = {
  'Email': 'EnvelopeSimple',
  'Discord': 'DiscordLogo',
  'Jelly': 'DiscordLogo',
  'Clover Games': 'GameController',
  'Site principal': 'Globe',
  'Mirum Orbis': 'Palette',
  'NoHello': 'Globe',
  'GitHub': 'GithubLogo',
  'Twitch': 'TwitchLogo',
  'Spotify': 'SpotifyLogo',
  'Steam': 'GameController',
  'Roblox': 'GameController',
  'NameMC': 'GameController',
  'Pinterest': 'PaintBrush',
  'AniList': 'Tv',
  'Letterboxd': 'Film',
  'Stats.fm': 'Music'
};

export class BioLinksService {
  /**
   * Récupère tous les liens bio actifs (Sychrone pour l'approche statique)
   */
  static getBioLinksSync(): BioLink[] {
    const bioLinks = localLinks.filter(link => link.type === 'bio_link' && link.is_active) as BioLink[];
    return bioLinks.map(link => ({
      ...link,
      icon: bioLinkIcons[link.title] || 'LinkSimple'
    }));
  }

  /**
   * Récupère les liens groupés par catégorie
   */
  static getGroupedBioLinks(): Record<string, BioLink[]> {
    const links = this.getBioLinksSync();
    return links.reduce((acc, link) => {
      const category = link.category || 'other';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(link);
      return acc;
    }, {} as Record<string, BioLink[]>);
  }

  static async getBioLinks(): Promise<BioLink[]> {
    try {
      const bioLinks = localLinks.filter(link => link.type === 'bio_link' && link.is_active) as BioLink[];
      return bioLinks.map(link => ({
        ...link,
        icon: bioLinkIcons[link.title] || 'LinkSimple'
      }));
    } catch (error) {
      throw error;
    }
  }

  static async getAllBioLinks(): Promise<BioLink[]> {
    try {
      const bioLinks = localLinks.filter(link => link.type === 'bio_link') as BioLink[];
      return bioLinks.map(link => ({
        ...link,
        icon: bioLinkIcons[link.title] || 'LinkSimple'
      }));
    } catch (error) {
      throw error;
    }
  }

  static updateIconMapping(title: string, icon: string) {
    bioLinkIcons[title] = icon;
  }

  static getAvailableIcons(): string[] {
    return [
      'EnvelopeSimple', 'DiscordLogo', 'Globe', 'GameController', 
      'Palette', 'SmileyXEyes', 'PaintBrush', 'GithubLogo',
      'TwitterLogo', 'InstagramLogo', 'LinkedinLogo', 'YoutubeLogo',
      'TwitchLogo', 'SpotifyLogo', 'LinkSimple', 'Phone',
      'MapPin', 'Calendar', 'Download', 'Share', 'Tv', 'Film', 'Music'
    ];
  }
}
