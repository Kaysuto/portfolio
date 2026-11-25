import type { Bilingue } from "@/lib/langue";

export interface Project {
  id: string;
  title: string;
  /** Ce qu'est le projet, en deux phrases : le chapeau de sa fiche. */
  description: Bilingue;
  /** Ce qu'il fait concrètement, listé dans la fiche. Uniquement ce que le code prouve. */
  points: Bilingue[];
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
      fr: "Serveur Minecraft Java français.",
      en: "A French Minecraft Java server.",
    },
    points: [
      { fr: "Six modes de jeu, dont BedWars, SkyPvP, PvPSoup et Practice, portés par un plugin Paper écrit en Java", en: "Six game modes, including BedWars, SkyPvP, PvPSoup and Practice, powered by a Paper plugin written in Java" },
      { fr: "Site avec boutique Stripe, classements, votes récompensés et blog", en: "Website with a Stripe shop, leaderboards, rewarded votes and a blog" },
      { fr: "Connexion par Discord, Microsoft ou Google, double authentification et administration", en: "Sign-in with Discord, Microsoft or Google, two-factor login and an admin area" },
      { fr: "Bot Discord du serveur, avec son propre tableau de bord", en: "The server's Discord bot, with its own dashboard" },
    ],
    tech_stack: ['Java', 'Paper', 'Next.js', 'Drizzle', 'MySQL', 'Stripe'],
    status: 'En développement',
    type: { fr: 'Game Dev', en: 'Game Dev' },
    demo_url: 'https://clovergames.fr',
    created_at: '2019-09-01T00:00:00Z',
    image_url: '/projects/clover-games.webp',
    image_alt: { fr: 'Clover Games', en: 'Clover Games' }
  },
  {
    id: '5',
    title: 'Clover Launcher',
    description: {
      fr: "Le launcher Minecraft tout-en-un de Clover Games. Comptes, instances, mods, modpacks et skins réunis dans une seule application, rapide et légère.",
      en: "Clover Games' all-in-one Minecraft launcher. Accounts, instances, mods, modpacks and skins together in one fast, lightweight app.",
    },
    points: [
      { fr: "Plusieurs comptes Microsoft, instances Vanilla, Fabric, Quilt, Forge et NeoForge", en: "Several Microsoft accounts, Vanilla, Fabric, Quilt, Forge and NeoForge instances" },
      { fr: "Mods et modpacks Modrinth et CurseForge, import et export .mrpack", en: "Mods and modpacks from Modrinth and CurseForge, .mrpack import and export" },
      { fr: "Reprend les instances du launcher officiel, de Prism, MultiMC ou CurseForge", en: "Imports instances from the official launcher, Prism, MultiMC or CurseForge" },
      { fr: "Mises à jour du serveur par manifeste signé ; un lien du site lance directement un mode", en: "Server updates through a signed manifest; a link on the website launches a mode directly" },
      { fr: "Disponible sur Windows, macOS, Linux et le Microsoft Store", en: "Available on Windows, macOS, Linux and the Microsoft Store" },
    ],
    tech_stack: ['Tauri', 'Rust', 'React', 'Cloudflare Workers'],
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
    points: [
      { fr: "La pire condition l'emporte : PR bloquée, orage ; CI en échec, pluie ; issues ouvertes, nuages ; sinon, soleil", en: "The worst condition wins: a stuck PR means a storm, failing CI rain, open issues clouds, otherwise sun" },
      { fr: "Thème clair, sombre ou automatique, animations qui respectent « réduire les animations »", en: "Light, dark or auto theme, animations that respect reduced motion" },
      { fr: "Style carte ou pastille, en français ou en anglais", en: "Card or pill style, in French or English" },
      { fr: "Aucune dépendance, et le badge n'est commité que s'il change", en: "No dependencies, and the badge is only committed when it changes" },
    ],
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
      fr: "Plateforme de streaming française branchée sur un serveur Jellyfin auto-hébergé : catalogue enrichi par TMDB, profils, demandes de titres votées par la communauté et offre Jelly+.",
      en: "A French streaming platform on top of a self-hosted Jellyfin server: a TMDB-enriched catalog, profiles, community-voted title requests and a Jelly+ tier.",
    },
    points: [
      { fr: "Lecteur HLS avec reprise, Chromecast et image dans l'image ; le navigateur ne voit jamais de jeton Jellyfin", en: "HLS player with resume, Chromecast and picture-in-picture; the browser never sees a Jellyfin token" },
      { fr: "Watch Party : des salons pour regarder ensemble, avec chat et réactions", en: "Watch Party: rooms to watch together, with chat and reactions" },
      { fr: "Wishboard : les demandes sont votées, puis validées avant d'être lancées", en: "Wishboard: requests are voted on, then approved before they go ahead" },
      { fr: "Profils enfants protégés par code parental et page de statut publique", en: "Kid profiles behind a parental code and a public status page" },
    ],
    tech_stack: ['React', 'TypeScript', 'Supabase', 'Better Auth', 'Stripe', 'Jellyfin'],
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
      fr: "Site inspiré de nohello.net : il apprend à poser sa question dès le premier message, au lieu d'envoyer un simple « Bonjour » et d'attendre.",
      en: "A site inspired by nohello.net: it teaches people to ask their question in the very first message instead of sending a bare \"Hello\" and waiting.",
    },
    points: [
      { fr: "Animation de frappe en dix langues", en: "Typing animation in ten languages" },
      { fr: "Une mauvaise et une bonne conversation côte à côte, puis une frise en quatre étapes", en: "A bad and a good conversation side by side, then a four-step timeline" },
      { fr: "Quiz de onze questions sur trois niveaux", en: "An eleven-question quiz across three levels" },
      { fr: "Entièrement statique : aucune API ni service tiers", en: "Fully static: no API and no third-party services" },
    ],
    tech_stack: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion'],
    status: 'En production',
    type: { fr: 'Site web', en: 'Website' },
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
      fr: "Site officiel de Mirum Orbis, MMORPG 2D fantasy d'Askilian Studio : présentation du jeu, actualités, vidéos des créateurs, comptes joueurs et administration.",
      en: "The official site of Mirum Orbis, a 2D fantasy MMORPG by Askilian Studio: game overview, news, creator videos, player accounts and an admin area.",
    },
    points: [
      { fr: "Connexion par e-mail ou Google, double authentification et sessions révocables", en: "Sign-in by email or Google, two-factor login and revocable sessions" },
      { fr: "Actualités en Markdown avec temps de lecture et compteur de vues", en: "Markdown news with reading time and view counts" },
      { fr: "Administration avec rôles, éditeur Tiptap, médiathèque, journal d'activité et mode maintenance", en: "Admin with roles, a Tiptap editor, media library, activity log and maintenance mode" },
      { fr: "Pages classes, monde, guide, téléchargement et créateurs", en: "Classes, world, guide, download and creators pages" },
    ],
    tech_stack: ['Next.js', 'Supabase', 'Better Auth', 'Tiptap', 'Brevo'],
    status: 'En production',
    type: { fr: 'Site web', en: 'Website' },
    demo_url: 'https://mirum-orbis.com',
    created_at: '2024-01-15T00:00:00Z',
    image_url: '/projects/mirum-orbis.webp',
    image_alt: { fr: 'Mirum Orbis', en: 'Mirum Orbis' }
  },
];
