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
    id: '2',
    title: 'Clover Games',
    description: "Infrastructure complète pour serveur Minecraft et plateforme de gaming avec panels d'administration et monitoring.",
    tech_stack: ['YAML', 'Pelican', 'Node.js', 'MySQL'],
    status: 'En développement',
    type: 'Game Dev',
    demo_url: 'https://clovergames.fr',
    created_at: '2023-11-20T00:00:00Z',
    image_url: '/projects/clover-games.webp',
    image_alt: 'Clover Games'
  },
  {
    id: '5',
    title: 'Clover Launcher',
    description: "Launcher Minecraft de Clover Games : un clic sur « Jouer » installe la version du serveur avec Fabric et ses mods, puis lance le jeu. Instances perso, mods et modpacks via Modrinth et CurseForge.",
    tech_stack: ['Tauri', 'Rust', 'React'],
    status: 'Beta',
    type: 'Desktop',
    github_url: 'https://github.com/theclovergames/clover-launcher',
    created_at: '2026-09-29T00:00:00Z',
    image_url: '/projects/clover-launcher.webp',
    image_alt: 'Accueil du Clover Launcher : skin du joueur, bouton Jouer, activité de la semaine et actualités'
  },
  {
    id: '7',
    title: 'Repo Weather',
    description: "GitHub Action qui transforme l'état d'un dépôt en bulletin météo : un badge SVG animé pour le README, selon la CI, les issues ouvertes et les PR bloquées.",
    tech_stack: ['GitHub Actions', 'Node.js', 'SVG'],
    status: 'En production',
    type: 'Open source',
    github_url: 'https://github.com/Kaysuto/repo-weather',
    created_at: '2026-10-29T00:00:00Z',
    image_url: '/projects/repo-weather.webp',
    image_alt: 'Bannière Repo Weather : les quatre badges météo, ensoleillé, nuageux, pluvieux et orageux'
  },
  {
    id: '1',
    title: 'Jelly',
    description: 'Plateforme de streaming avancée avec interface React moderne, intégration Jellyfin, système de demandes de médias et notifications temps réel.',
    tech_stack: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    status: 'Beta',
    type: 'Streaming',
    demo_url: 'https://beta.playjelly.fr',
    created_at: '2023-09-05T00:00:00Z',
    image_url: '/projects/jelly.webp',
    image_alt: 'Jelly'
  },
  {
    id: '4',
    title: 'NoHello',
    description: 'No Hello encourage la communication directe : posez votre question dès le premier message pour gagner en productivité.',
    tech_stack: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    status: 'En production',
    type: 'Web Design',
    demo_url: 'https://nohello.fr',
    github_url: 'https://github.com/kaysuto/nohello',
    created_at: '2024-01-15T00:00:00Z',
    image_url: '/projects/no-hello.webp',
    image_alt: 'NoHello'
  },
  {
    id: '3',
    title: 'Mirum Orbis',
    description: "MMORPG 2D fantasy dans l'univers d'Ereda. Monde persistant avec 6 classes, donjons coopératifs, PvP, et système de progression avancé. Plus de 120 quêtes dans un continent explorable.",
    tech_stack: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    status: 'En production',
    type: 'Web Design',
    demo_url: 'https://mirum-orbis.com',
    created_at: '2024-01-15T00:00:00Z',
    image_url: '/projects/mirum-orbis.webp',
    image_alt: 'Mirum Orbis'
  },
  {
    id: '6',
    title: 'Naturopeps',
    description: 'Assistant Web Marketing : optimisation SEO/SEA, amélioration des pages produits et mise en conformité des pages légales.',
    tech_stack: ['SEO', 'SEA', 'Web Marketing', 'E-commerce'],
    status: 'En production',
    type: 'Marketing Digital',
    demo_url: 'https://www.naturopeps.com/',
    created_at: '2022-06-08T00:00:00Z',
    image_url: '/projects/naturopeps.jpg',
    image_alt: 'Naturopeps'
  }
];
