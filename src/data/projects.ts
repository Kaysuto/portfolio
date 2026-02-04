export interface Project {
  id: string;
  title: string;
  description: string;
  tech_stack: string[];
  status: 'En production' | 'En développement' | 'Alpha' | 'Beta';
  type: string;
  github_url?: string;
  demo_url?: string;
  stars?: number;
  forks?: number;
  likes?: number;
  views?: number;
  created_at: string;
  image_url?: string;
  image_alt?: string;
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'Jelly',
    description: 'Plateforme de streaming avancée avec interface React moderne, intégration Jellyfin, système de demandes de médias et notifications temps réel.',
    tech_stack: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Supabase'],
    status: 'Beta',
    type: 'Streaming',
    demo_url: 'https://beta.playjelly.fr',
    created_at: '2023-09-05T00:00:00Z',
    image_url: 'https://i.imgur.com/wCFAl6S.png',
    image_alt: 'Jelly'
  },
  {
    id: '2',
    title: 'Clover Games',
    description: "Infrastructure complète pour serveur Minecraft et plateforme de gaming avec panels d'administration et monitoring.",
    tech_stack: ['YAML', 'Pterodactyl', 'Node.js', 'MySQL'],
    status: 'En développement',
    type: 'Game Dev',
    demo_url: 'https://clovergames.fr',
    created_at: '2023-11-20T00:00:00Z',
    image_url: 'https://i.imgur.com/zz1u2cH.png',
    image_alt: 'Clover Games'
  },
  {
    id: '3',
    title: 'Mirum Orbis',
    description: "MMORPG 2D fantasy dans l'univers d'Ereda. Monde persistant avec 6 classes, donjons coopératifs, PvP, et système de progression avancé. Plus de 120 quêtes dans un continent explorable.",
    tech_stack: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Supabase'],
    status: 'En production',
    type: 'Web Design',
    demo_url: 'https://mirum-orbis.com',
    created_at: '2024-01-15T00:00:00Z',
    image_url: 'https://i.imgur.com/232r9Jh.png',
    image_alt: 'Mirum Orbis'
  },
  {
    id: '4',
    title: 'NoHello',
    description: 'No Hello encourage la communication directe : posez votre question dès le premier message pour gagner en productivité.',
    tech_stack: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Supabase'],
    status: 'En production',
    type: 'Web Design',
    demo_url: 'https://nohello.fr',
    github_url: 'https://github.com/kaysuto/nohello',
    created_at: '2024-01-15T00:00:00Z',
    image_url: 'https://i.imgur.com/PATKb3m.png',
    image_alt: 'NoHello'
  },
  {
    id: '5',
    title: 'Profil Emoji.gg',
    description: 'Profil Emoji.gg est un site web qui permet de créer un profil avec des emojis.',
    tech_stack: ['Pixel Art', 'Emojis'],
    status: 'En production',
    type: 'Game Design',
    demo_url: 'https://emoji.gg/user/kaysuto',
    created_at: '2023-09-05T00:00:00Z',
    image_url: 'https://i.imgur.com/pfsAUov.png',
    image_alt: 'Profil Emoji.gg'
  }
];
