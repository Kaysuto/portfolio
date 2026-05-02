export interface BioLink {
  id: string;
  title: string;
  url: string;
  type: 'github' | 'live' | 'social' | 'bio_link' | 'other';
  category?: 'social' | 'community' | 'websites';
  description?: string;
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
    description: 'Rejoindre Jelly',
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
    description: 'Rejoindre Clover Games',
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
    description: 'Me contacter directement',
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
    description: 'Mes projets open-source',
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
    description: 'Mon profil professionnel',
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
    description: 'Mes streams en direct',
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
    description: 'Ce que j\'écoute',
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
    description: 'Mon profil gaming',
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
    description: 'Profil Roblox',
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
    description: 'Profil Minecraft',
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
    description: 'Mes inspirations visuelles',
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
    description: 'Ma liste d\'animes',
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
    description: 'Mes films préférés',
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
    description: 'Mes statistiques musicales',
    is_active: true,
    click_count: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];
