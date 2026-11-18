import type { Bilingue } from "@/lib/langue";

export interface Project {
  id: string;
  title: string;
  description: Bilingue;
  tech_stack: string[];
  status: 'En production' | 'En développement' | 'Alpha' | 'Beta';
  type: Bilingue;
  github_url?: string;
  demo_url?: string;
  stars?: number;
  forks?: number;
  likes?: number;
  views?: number;
  created_at: string;
  image_url?: string;
  image_alt?: Bilingue;
}

export const projects: Project[] = [
  {
    id: '2',
    title: 'Clover Games',
    description: {
      fr: "Infrastructure complète pour serveur Minecraft et plateforme de gaming avec panels d'administration et monitoring.",
      en: "Full infrastructure for a Minecraft server and gaming platform, with admin panels and monitoring.",
    },
    tech_stack: ['YAML', 'Pelican', 'Node.js', 'MySQL'],
    status: 'En développement',
    type: { fr: 'Game Dev', en: 'Game Dev' },
    demo_url: 'https://clovergames.fr',
    created_at: '2023-11-20T00:00:00Z',
    image_url: '/projects/clover-games.webp',
    image_alt: { fr: 'Clover Games', en: 'Clover Games' }
  },
  {
    id: '5',
    title: 'Clover Launcher',
    description: {
      fr: "Launcher Minecraft de Clover Games : un clic sur « Jouer » installe la version du serveur avec Fabric et ses mods, puis lance le jeu. Instances perso, mods et modpacks via Modrinth et CurseForge.",
      en: "Clover Games' Minecraft launcher: one click on \"Play\" installs the server's version with Fabric and its mods, then starts the game. Custom instances, mods and modpacks from Modrinth and CurseForge.",
    },
    tech_stack: ['Tauri', 'Rust', 'React'],
    status: 'Beta',
    type: { fr: 'Desktop', en: 'Desktop' },
    github_url: 'https://github.com/theclovergames/clover-launcher',
    created_at: '2026-09-29T00:00:00Z',
    image_url: '/projects/clover-launcher.webp',
    image_alt: {
      fr: 'Accueil du Clover Launcher : skin du joueur, bouton Jouer, activité de la semaine et actualités',
      en: 'Clover Launcher home screen: player skin, Play button, weekly activity and news',
    }
  },
  {
    id: '7',
    title: 'Repo Weather',
    description: {
      fr: "GitHub Action qui transforme l'état d'un dépôt en bulletin météo : un badge SVG animé pour le README, selon la CI, les issues ouvertes et les PR bloquées.",
      en: "A GitHub Action that turns a repository's health into a weather report: an animated SVG badge for the README, based on CI, open issues and stuck PRs.",
    },
    tech_stack: ['GitHub Actions', 'Node.js', 'SVG'],
    status: 'En production',
    type: { fr: 'Open source', en: 'Open source' },
    github_url: 'https://github.com/Kaysuto/repo-weather',
    created_at: '2026-10-29T00:00:00Z',
    image_url: '/projects/repo-weather.webp',
    image_alt: {
      fr: 'Bannière Repo Weather : les quatre badges météo, ensoleillé, nuageux, pluvieux et orageux',
      en: 'Repo Weather banner: the four weather badges, sunny, cloudy, rainy and stormy',
    }
  },
  {
    id: '1',
    title: 'Jelly',
    description: {
      fr: 'Plateforme de streaming avancée avec interface React moderne, intégration Jellyfin, système de demandes de médias et notifications temps réel.',
      en: 'An advanced streaming platform with a modern React interface, Jellyfin integration, media requests and real-time notifications.',
    },
    tech_stack: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    status: 'Beta',
    type: { fr: 'Streaming', en: 'Streaming' },
    demo_url: 'https://beta.playjelly.fr',
    created_at: '2023-09-05T00:00:00Z',
    image_url: '/projects/jelly.webp',
    image_alt: { fr: 'Jelly', en: 'Jelly' }
  },
  {
    id: '4',
    title: 'NoHello',
    description: {
      fr: 'No Hello encourage la communication directe : posez votre question dès le premier message pour gagner en productivité.',
      en: 'No Hello encourages direct communication: ask your question in the very first message and save everyone time.',
    },
    tech_stack: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    status: 'En production',
    type: { fr: 'Web Design', en: 'Web Design' },
    demo_url: 'https://nohello.fr',
    github_url: 'https://github.com/kaysuto/nohello',
    created_at: '2024-01-15T00:00:00Z',
    image_url: '/projects/no-hello.webp',
    image_alt: { fr: 'NoHello', en: 'NoHello' }
  },
  {
    id: '3',
    title: 'Mirum Orbis',
    description: {
      fr: "MMORPG 2D fantasy dans l'univers d'Ereda. Monde persistant avec 6 classes, donjons coopératifs, PvP, et système de progression avancé. Plus de 120 quêtes dans un continent explorable.",
      en: "A 2D fantasy MMORPG set in the world of Ereda. Persistent world with 6 classes, co-op dungeons, PvP and deep progression. Over 120 quests across an explorable continent.",
    },
    tech_stack: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    status: 'En production',
    type: { fr: 'Web Design', en: 'Web Design' },
    demo_url: 'https://mirum-orbis.com',
    created_at: '2024-01-15T00:00:00Z',
    image_url: '/projects/mirum-orbis.webp',
    image_alt: { fr: 'Mirum Orbis', en: 'Mirum Orbis' }
  },
  {
    id: '6',
    title: 'Naturopeps',
    description: {
      fr: 'Assistant Web Marketing : optimisation SEO/SEA, amélioration des pages produits et mise en conformité des pages légales.',
      en: 'Web marketing assistant: SEO/SEA optimization, better product pages and compliant legal pages.',
    },
    tech_stack: ['SEO', 'SEA', 'Web Marketing', 'E-commerce'],
    status: 'En production',
    type: { fr: 'Marketing Digital', en: 'Digital Marketing' },
    demo_url: 'https://www.naturopeps.com/',
    created_at: '2022-06-08T00:00:00Z',
    image_url: '/projects/naturopeps.jpg',
    image_alt: { fr: 'Naturopeps', en: 'Naturopeps' }
  }
];
