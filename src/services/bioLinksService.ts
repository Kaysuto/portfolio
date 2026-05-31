import { links as liensLocaux, type BioLink } from '../data/links';
export type { BioLink };

export interface BioLinkIcon {
  name: string;
  phosphorIcon: string;
}

const iconesLiensBio: Record<string, string> = {
  'Email': 'EnvelopeSimple',
  'Discord': 'DiscordLogo',
  'Jelly': 'DiscordLogo',
  'Clover Games': 'GameController',
  'Site principal': 'Globe',
  'Mirum Orbis': 'Palette',
  'NoHello': 'Globe',
  'GitHub': 'GithubLogo',
  'LinkedIn': 'LinkedinLogo',
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
   * Récupère tous les liens bio actifs (synchrone pour l'approche statique)
   */
  static getBioLinksSync(): BioLink[] {
    const liensBio = liensLocaux.filter(lien => lien.type === 'bio_link' && lien.is_active) as BioLink[];
    return liensBio.map(lien => ({
      ...lien,
      icon: iconesLiensBio[lien.title] || 'LinkSimple'
    }));
  }

  /**
   * Récupère les liens groupés par catégorie
   */
  static getGroupedBioLinks(): Record<string, BioLink[]> {
    const liens = this.getBioLinksSync();
    return liens.reduce((accumulateur, lien) => {
      const categorie = lien.category || 'other';
      if (!accumulateur[categorie]) {
        accumulateur[categorie] = [];
      }
      accumulateur[categorie].push(lien);
      return accumulateur;
    }, {} as Record<string, BioLink[]>);
  }

  static async getBioLinks(): Promise<BioLink[]> {
    const liensBio = liensLocaux.filter(lien => lien.type === 'bio_link' && lien.is_active) as BioLink[];
    return liensBio.map(lien => ({
      ...lien,
      icon: iconesLiensBio[lien.title] || 'LinkSimple'
    }));
  }

  static async getAllBioLinks(): Promise<BioLink[]> {
    const liensBio = liensLocaux.filter(lien => lien.type === 'bio_link') as BioLink[];
    return liensBio.map(lien => ({
      ...lien,
      icon: iconesLiensBio[lien.title] || 'LinkSimple'
    }));
  }

  static updateIconMapping(title: string, icon: string) {
    iconesLiensBio[title] = icon;
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
