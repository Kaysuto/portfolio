import type { Bilingue } from "@/lib/langue"

export type Tech = {
  name: string
  slug: string
  url: string
  iconUrl?: string
  /** À quoi sert l'outil, en deux ou trois mots : affiché sous son nom dans l'atelier. */
  usage?: Bilingue
}

export type Strate = {
  id: string
  /** Repère de profondeur affiché dans la marge (« L1 »). */
  niveau: string
  title: Bilingue
  /**
   * Formule courte de ce que la couche fait. Les strates s'en passent — leur
   * titre et leur résumé suffisent — ; seul l'atelier s'en sert, comme
   * intertitre.
   */
  role?: Bilingue
  /** Une ligne de contexte, dépliée au survol de la strate. */
  resume: Bilingue
  techs: Tech[]
}

/**
 * La stack rangée par profondeur plutôt que par ordre alphabétique : L1 est ce
 * que l'utilisateur touche, L3 ce qui tourne à 3 h du matin sans témoin. C'est
 * la même idée que « de l'infrastructure matérielle au produit logiciel » dans
 * la section « À propos », mais rendue lisible d'un coup d'œil.
 */
export const STRATES: Strate[] = [
  {
    id: "interface",
    niveau: "L1",
    title: { fr: "Frontend & Design", en: "Frontend & Design" },
    resume: {
      fr: "Ce que vous voyez : des composants typés, des animations sobres et un design system qui vieillit bien.",
      en: "What you see: typed components, restrained animations and a design system that ages well.",
    },
    techs: [
      { name: "React", slug: "react", url: "https://react.dev" },
      { name: "TypeScript", slug: "typescript", url: "https://www.typescriptlang.org" },
      { name: "Next.js", slug: "nextdotjs", url: "https://nextjs.org" },
      { name: "Vue.js", slug: "vuedotjs", url: "https://vuejs.org" },
      { name: "TanStack", slug: "tanstack", url: "https://tanstack.com" },
      { name: "Tailwind CSS", slug: "tailwindcss", url: "https://tailwindcss.com" },
      { name: "shadcn/ui", slug: "shadcnui", url: "https://ui.shadcn.com" },
    ],
  },
  {
    id: "services",
    niveau: "L2",
    title: { fr: "Backend & Cloud", en: "Backend & Cloud" },
    resume: {
      fr: "Ce qui se passe en coulisses : données, comptes, cache, recherche et temps réel, hébergés au plus près des utilisateurs.",
      en: "What happens behind the scenes: data, accounts, caching, search and real time, hosted close to the users.",
    },
    techs: [
      { name: "Node.js", slug: "nodedotjs", url: "https://nodejs.org" },
      { name: "Python", slug: "python", url: "https://www.python.org" },
      { name: "Sockets", slug: "sockets", url: "https://docs.python.org/fr/3/library/socket.html", iconUrl: "/icons/sockets.svg" },
      { name: "Better Auth", slug: "betterauth", url: "https://www.better-auth.com", iconUrl: "https://avatars.githubusercontent.com/u/170741193?s=48&v=4" },
      { name: "Supabase", slug: "supabase", url: "https://supabase.com/", iconUrl: "https://i.imgur.com/xEZuSit.png" },
      { name: "Vercel", slug: "vercel", url: "https://vercel.com" },
      { name: "Cloudflare", slug: "cloudflare", url: "https://www.cloudflare.com" },
      { name: "Infomaniak", slug: "infomaniak", url: "https://www.infomaniak.com" },
      { name: "Brevo", slug: "brevo", url: "https://www.brevo.com" },
      { name: "MySQL", slug: "mysql", url: "https://www.mysql.com" },
      { name: "Redis", slug: "redis", url: "https://redis.io" },
      { name: "Drizzle ORM", slug: "drizzle", url: "https://orm.drizzle.team" },
      { name: "Caching", slug: "caching", url: "https://developer.mozilla.org/fr/docs/Web/HTTP/Guides/Caching", iconUrl: "/icons/caching.svg" },
      { name: "Search Indexing", slug: "searchindexing", url: "https://www.meilisearch.com", iconUrl: "/icons/search-indexing.svg" },
    ],
  },
  {
    id: "socle",
    niveau: "L3",
    title: { fr: "Infrastructure & DevOps", en: "Infrastructure & DevOps" },
    resume: {
      fr: "Ce que j'ai appris en datacenter : hyperviseurs, conteneurs, reverse proxies et sécurisation des serveurs.",
      en: "What I learned in the data center: hypervisors, containers, reverse proxies and server hardening.",
    },
    techs: [
      { name: "Linux", slug: "linux", url: "https://www.linux.org" },
      { name: "Docker", slug: "docker", url: "https://www.docker.com" },
      { name: "Nginx", slug: "nginx", url: "https://nginx.org" },
      { name: "Apache", slug: "apache", url: "https://httpd.apache.org" },
      { name: "Fail2Ban", slug: "fail2ban", url: "https://www.fail2ban.org", iconUrl: "https://avatars.githubusercontent.com/u/1087378?s=48&v=4" },
      { name: "Proxmox", slug: "proxmox", url: "https://www.proxmox.com/", iconUrl: "https://i.imgur.com/TvQIvQ1.png" },
      { name: "VMware", slug: "vmware", url: "https://www.vmware.com" },
      { name: "Nomachine", slug: "nomachine", url: "https://www.nomachine.com", iconUrl: "https://i.imgur.com/zLq6xEm.png" },
      { name: "Nexterm", slug: "nexterm", url: "https://nexterm.dev", iconUrl: "https://raw.githubusercontent.com/gnmyt/Nexterm/main/client/public/assets/img/favicon.svg" },
      { name: "XPipe", slug: "xpipe", url: "https://xpipe.io", iconUrl: "https://avatars.githubusercontent.com/u/93734037?s=48&v=4" },
      { name: "WinSCP", slug: "winscp", url: "https://winscp.net", iconUrl: "https://avatars.githubusercontent.com/u/39923081?s=48&v=4" },
      { name: "YAML", slug: "yaml", url: "https://yaml.org/" },
    ],
  },
]

/**
 * L'atelier n'est pas une quatrième strate : ces outils ne tournent pas dans le
 * produit, ils sont sous ma main pendant que je le construis. Les empiler avec
 * les autres laissait croire qu'un éditeur ou un OS était une dépendance du backend.
 */
export const ATELIER: Omit<Strate, "niveau"> = {
  id: "atelier",
  title: { fr: "Outils & Productivité", en: "Tools & Productivity" },
  role: { fr: "Ce que j'ai sous la main", en: "What I keep at hand" },
  resume: {
    fr: "Ce que j'ouvre chaque jour, pour coder comme pour tout le reste.",
    en: "What I open every day, for coding and everything else.",
  },
  techs: [
    { name: "VS Code", slug: "visualstudiocode", url: "https://code.visualstudio.com", iconUrl: "https://i.imgur.com/bMFlLET.png", usage: { fr: "Éditeur de code", en: "Code editor" } },
    { name: "JetBrains", slug: "jetbrains", url: "https://www.jetbrains.com", usage: { fr: "IDE", en: "IDEs" } },
    { name: "Git", slug: "git", url: "https://git-scm.com", usage: { fr: "Versions du code", en: "Version control" } },
    { name: "GitHub", slug: "github", url: "https://github.com", usage: { fr: "Dépôts et CI", en: "Repos and CI" } },
    { name: "T3 Code", slug: "t3code", url: "https://t3.codes", iconUrl: "https://t3.codes/apple-touch-icon.png", usage: { fr: "Agents IA de code", en: "AI coding agents" } },
    { name: "Linear", slug: "linear", url: "https://linear.app", usage: { fr: "Suivi des tâches", en: "Issue tracking" } },
    { name: "Obsidian", slug: "obsidian", url: "https://obsidian.md", usage: { fr: "Notes et docs", en: "Notes and docs" } },
    { name: "WisprFlow", slug: "wisprflow", url: "https://wisprflow.ai", iconUrl: "https://cdn.prod.website-files.com/682f84b3838c89f8ff7667db/684b3be32acf9b372f54d041_ws-favi.png", usage: { fr: "Dictée vocale", en: "Voice dictation" } },
    { name: "Bitwarden", slug: "bitwarden", url: "https://bitwarden.com", usage: { fr: "Mots de passe", en: "Passwords" } },
    { name: "PowerToys", slug: "microsoftpowertoys", url: "https://apps.microsoft.com/store/detail/microsoft-powertoys/XP89DCGQ3K6VLD", iconUrl: "https://i.imgur.com/T2hvadU.png", usage: { fr: "Raccourcis Windows", en: "Windows shortcuts" } },
    { name: "Discord", slug: "discord", url: "https://discord.com", usage: { fr: "Communautés", en: "Communities" } },
    { name: "Blockbench", slug: "blockbench", url: "https://www.blockbench.net", usage: { fr: "Modèles Minecraft", en: "Minecraft models" } },
    { name: "Blender", slug: "blender", url: "https://www.blender.org", usage: { fr: "Modélisation 3D", en: "3D modeling" } },
    { name: "OBS Studio", slug: "obsstudio", url: "https://obsproject.com", usage: { fr: "Enregistrement et live", en: "Recording and streaming" } },
    { name: "Windows", slug: "windows", url: "https://www.microsoft.com/windows", iconUrl: "https://i.imgur.com/TptJIji.png", usage: { fr: "Poste de travail", en: "Daily driver" } },
  ],
}
