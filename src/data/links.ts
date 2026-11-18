import type { Bilingue } from '@/lib/langue';

export interface BioLink {
  id: string;
  title: string;
  url: string;
  type: 'github' | 'live' | 'social' | 'bio_link' | 'other';
  category?: 'social' | 'community' | 'websites';
  description?: Bilingue;
  icon?: string;
  is_active: boolean;
  click_count: number;
  created_at: string;
  updated_at: string;
}

export const links: BioLink[] = [
  // Discord et communauté
  {
    id: 'discord-jelly',
    title: 'Jelly',
    url: 'https://discord.gg/AYrvJCA2DW',
    type: 'bio_link',
    category: 'community',
    description: { fr: 'Rejoindre Jelly', en: 'Join Jelly' },
    is_active: true,
    click_count: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'clover-games',
    title: 'Clover Games',
    url: 'https://discord.gg/BVVe2WqUvh',
    type: 'bio_link',
    category: 'community',
    description: { fr: 'Rejoindre Clover Games', en: 'Join Clover Games' },
    is_active: true,
    click_count: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },

  // Liens sociaux et plateformes
  {
    id: 'email',
    title: 'Email',
    url: 'mailto:contact@kaysuto.fr',
    type: 'bio_link',
    category: 'social',
    description: { fr: 'Me contacter directement', en: 'Contact me directly' },
    is_active: true,
    click_count: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'github',
    title: 'GitHub',
    url: 'https://git.new/kaysuto',
    type: 'bio_link',
    category: 'social',
    description: { fr: 'Mes projets open-source', en: 'My open-source projects' },
    is_active: true,
    click_count: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'linkedin',
    title: 'LinkedIn',
    url: 'https://www.linkedin.com/in/enzo-lauret/',
    type: 'bio_link',
    category: 'social',
    description: { fr: 'Mon profil professionnel', en: 'My professional profile' },
    is_active: true,
    click_count: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'twitch',
    title: 'Twitch',
    url: 'https://twitch.tv/kaysuto',
    type: 'bio_link',
    category: 'social',
    description: { fr: 'Mes streams en direct', en: 'My live streams' },
    is_active: true,
    click_count: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'spotify',
    title: 'Spotify',
    url: 'https://spti.fi/kaysuto',
    type: 'bio_link',
    category: 'social',
    description: { fr: 'Ce que j\'écoute', en: 'What I listen to' },
    is_active: true,
    click_count: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'steam',
    title: 'Steam',
    url: 'https://steamcommunity.com/id/kaysuto',
    type: 'bio_link',
    category: 'social',
    description: { fr: 'Mon profil gaming', en: 'My gaming profile' },
    is_active: true,
    click_count: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'roblox',
    title: 'Roblox',
    url: 'https://roblox.com/users/2923044215',
    type: 'bio_link',
    category: 'social',
    description: { fr: 'Profil Roblox', en: 'Roblox profile' },
    is_active: true,
    click_count: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'namemc',
    title: 'NameMC',
    url: 'https://namemc.com/profile/Kaysuto',
    type: 'bio_link',
    category: 'social',
    description: { fr: 'Profil Minecraft', en: 'Minecraft profile' },
    is_active: true,
    click_count: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'pinterest',
    title: 'Pinterest',
    url: 'https://pinterest.com/kaysuto',
    type: 'bio_link',
    category: 'social',
    description: { fr: 'Mes inspirations visuelles', en: 'My visual inspiration' },
    is_active: true,
    click_count: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'anilist',
    title: 'AniList',
    url: 'https://anilist.co/user/Kaysuto',
    type: 'bio_link',
    category: 'social',
    description: { fr: 'Ma liste d\'animes', en: 'My anime list' },
    is_active: true,
    click_count: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'letterboxd',
    title: 'Letterboxd',
    url: 'https://letterboxd.com/kaysuto',
    type: 'bio_link',
    category: 'social',
    description: { fr: 'Mes films préférés', en: 'My favourite films' },
    is_active: true,
    click_count: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'statsfm',
    title: 'Stats.fm',
    url: 'https://stats.fm/kimiya',
    type: 'bio_link',
    category: 'social',
    description: { fr: 'Mes statistiques musicales', en: 'My music stats' },
    is_active: true,
    click_count: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];
