export type Tech = { name: string; slug: string; url: string; iconUrl?: string }

export type Strate = {
  id: string
  /** Repère de profondeur affiché dans la marge (« L1 »). */
  niveau: string
  title: string
  /**
   * Formule courte de ce que la couche fait. Les strates s'en passent — leur
   * titre et leur résumé suffisent — ; seul l'atelier s'en sert, comme
   * intertitre.
   */
  role?: string
  /** Une ligne de contexte, dépliée au survol de la strate. */
  resume: string
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
    title: "Frontend & Design",
    resume:
      "La surface : composants typés, mouvement mesuré et un design system qui tient sur la durée.",
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
    title: "Backend & Cloud",
    resume:
      "Données, authentification, cache, indexation et temps réel, déployés au plus près des utilisateurs.",
    techs: [
      { name: "Node.js", slug: "nodedotjs", url: "https://nodejs.org" },
      { name: "Python", slug: "python", url: "https://www.python.org" },
      { name: "Sockets", slug: "sockets", url: "https://docs.python.org/fr/3/library/socket.html", iconUrl: "/icons/sockets.svg" },
      { name: "Better Auth", slug: "betterauth", url: "https://www.better-auth.com", iconUrl: "https://avatars.githubusercontent.com/u/170741193?s=48&v=4" },
      { name: "Supabase", slug: "supabase", url: "https://supabase.com/", iconUrl: "https://i.imgur.com/xEZuSit.png" },
      { name: "Vercel", slug: "vercel", url: "https://vercel.com" },
      { name: "Cloudflare", slug: "cloudflare", url: "https://www.cloudflare.com" },
      { name: "Infomaniak", slug: "infomaniak", url: "https://www.infomaniak.com", iconUrl: "https://i.imgur.com/v6v6v6v.png" },
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
    title: "Infrastructure & DevOps",
    resume:
      "Le socle hérité du datacenter : hyperviseurs, conteneurs, reverse proxies et durcissement.",
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
      { name: "YAML", slug: "yaml", url: "https://yaml.org/" },
    ],
  },
]

/**
 * L'atelier n'est pas une quatrième strate : ces outils ne tournent pas dans le
 * produit, ils sont sous ma main pendant que je le construis. Les empiler avec
 * les autres laissait croire que macOS était une dépendance du backend.
 */
export const ATELIER: Omit<Strate, "niveau"> = {
  id: "atelier",
  title: "Outils & Productivité",
  role: "Ce que j'ai sous la main",
  resume:
    "L'établi : éditeur, gestion de versions, orchestration d'agents, systèmes et raccourcis du quotidien.",
  techs: [
    { name: "VS Code", slug: "visualstudiocode", url: "https://code.visualstudio.com", iconUrl: "https://i.imgur.com/bMFlLET.png" },
    { name: "Git", slug: "git", url: "https://git-scm.com" },
    { name: "Bitwarden", slug: "bitwarden", url: "https://bitwarden.com" },
    { name: "Raycast", slug: "raycast", url: "https://www.raycast.com" },
    { name: "PowerToys", slug: "microsoftpowertoys", url: "https://apps.microsoft.com/store/detail/microsoft-powertoys/XP89DCGQ3K6VLD", iconUrl: "https://i.imgur.com/T2hvadU.png" },
    { name: "Byterover", slug: "byterover", url: "https://www.byterover.dev/", iconUrl: "https://i.imgur.com/jxUBre4.png" },
    { name: "Orca", slug: "orca", url: "https://www.onorca.dev", iconUrl: "https://www.onorca.dev/icon.png" },
    { name: "WisprFlow", slug: "wisprflow", url: "https://wisprflow.ai", iconUrl: "https://cdn.prod.website-files.com/682f84b3838c89f8ff7667db/684b3be32acf9b372f54d041_ws-favi.png" },
    { name: "Windows", slug: "windows", url: "https://www.microsoft.com/windows", iconUrl: "https://i.imgur.com/TptJIji.png" },
    { name: "Ubuntu", slug: "ubuntu", url: "https://ubuntu.com" },
    { name: "Debian", slug: "debian", url: "https://www.debian.org" },
    { name: "Arch Linux", slug: "archlinux", url: "https://archlinux.org" },
    { name: "macOS", slug: "apple", url: "https://www.apple.com/macos" },
  ],
}
