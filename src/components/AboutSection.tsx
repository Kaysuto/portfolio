import { useState } from "react"
import { motion } from "framer-motion"
import { Brain, Code, Heart, Moon, Server, Sun } from "lucide-react"
import { TechModal } from "@/components/ui/TechModal"
import { SectionHeading, RailLabel } from "@/components/ui/SectionHeading"
import { fadeInUp, staggerContainer, VIEWPORT } from "@/lib/animations"

type Tech = { name: string; slug: string; url: string; iconUrl?: string }

/**
 * Les deux versants du parcours, présentés face à face. « Technicien le jour,
 * Product Builder la nuit » est la colonne vertébrale de tout le site : elle
 * mérite une structure, pas un paragraphe où elle se noie.
 */
const VERSANTS = [
  {
    id: "jour",
    icon: Sun,
    label: "Le jour",
    role: "Technicien Informatique Polyvalent",
    lieu: "Magna Engineered Glass Europe",
    texte:
      "Après 3 ans en datacenter : gestion du parc, support utilisateurs, administration réseau et maintenance de l'infrastructure interne.",
  },
  {
    id: "nuit",
    icon: Moon,
    label: "La nuit",
    role: "Product Builder",
    lieu: "Projets personnels",
    texte:
      "Je construis des applications web, j'explore l'IA et je crée des expériences digitales de bout en bout.",
  },
]

const COMPETENCES = [
  {
    icon: Server,
    title: "Expertise Infra",
    description: "Rigueur, sécurité et haute disponibilité héritées de mon parcours en datacenter.",
  },
  {
    icon: Brain,
    title: "Modèles LLM",
    description: "Exploration et intégration de l'IA pour créer des applications intelligentes.",
  },
  {
    icon: Code,
    title: "Qualité Code",
    description: "Architecture propre et standards d'excellence pour des projets pérennes.",
  },
  {
    icon: Heart,
    title: "User First",
    description: "Conception d'interfaces intuitives centrées sur l'expérience utilisateur.",
  },
]

const CATEGORIES_TECH: { title: string; techs: Tech[] }[] = [
  {
    title: "Frontend & Design",
    techs: [
      { name: "React", slug: "react", url: "https://react.dev" },
      { name: "TypeScript", slug: "typescript", url: "https://www.typescriptlang.org" },
      { name: "Next.js", slug: "nextdotjs", url: "https://nextjs.org" },
      { name: "Vue.js", slug: "vuedotjs", url: "https://vuejs.org" },
      { name: "Tailwind CSS", slug: "tailwindcss", url: "https://tailwindcss.com" },
    ],
  },
  {
    title: "Backend & Cloud",
    techs: [
      { name: "Node.js", slug: "nodedotjs", url: "https://nodejs.org" },
      { name: "Python", slug: "python", url: "https://www.python.org" },
      { name: "Better Auth", slug: "betterauth", url: "https://www.better-auth.com", iconUrl: "https://avatars.githubusercontent.com/u/170741193?s=48&v=4" },
      { name: "Supabase", slug: "supabase", url: "https://supabase.com/", iconUrl: "https://i.imgur.com/xEZuSit.png" },
      { name: "Vercel", slug: "vercel", url: "https://vercel.com" },
      { name: "Cloudflare", slug: "cloudflare", url: "https://www.cloudflare.com" },
      { name: "Infomaniak", slug: "infomaniak", url: "https://www.infomaniak.com", iconUrl: "https://i.imgur.com/v6v6v6v.png" },
      { name: "Brevo", slug: "brevo", url: "https://www.brevo.com" },
    ],
  },
  {
    title: "Infrastructure & DevOps",
    techs: [
      { name: "Linux", slug: "linux", url: "https://www.linux.org" },
      { name: "Docker", slug: "docker", url: "https://www.docker.com" },
      { name: "Nginx", slug: "nginx", url: "https://nginx.org" },
      { name: "Apache", slug: "apache", url: "https://httpd.apache.org" },
      { name: "Fail2Ban", slug: "fail2ban", url: "https://www.fail2ban.org", iconUrl: "https://avatars.githubusercontent.com/u/1087378?s=48&v=4" },
      { name: "Proxmox", slug: "proxmox", url: "https://www.proxmox.com/", iconUrl: "https://i.imgur.com/TvQIvQ1.png" },
      { name: "VMware", slug: "vmware", url: "https://www.vmware.com" },
      { name: "Nomachine", slug: "nomachine", url: "https://www.nomachine.com", iconUrl: "https://i.imgur.com/zLq6xEm.png" },
      { name: "YAML", slug: "yaml", url: "https://yaml.org/" },
    ],
  },
  {
    title: "Outils & Productivité",
    techs: [
      { name: "VS Code", slug: "visualstudiocode", url: "https://code.visualstudio.com", iconUrl: "https://i.imgur.com/bMFlLET.png" },
      { name: "Git", slug: "git", url: "https://git-scm.com" },
      { name: "Bitwarden", slug: "bitwarden", url: "https://bitwarden.com" },
      { name: "Raycast", slug: "raycast", url: "https://www.raycast.com" },
      { name: "PowerToys", slug: "microsoftpowertoys", url: "https://apps.microsoft.com/store/detail/microsoft-powertoys/XP89DCGQ3K6VLD", iconUrl: "https://i.imgur.com/T2hvadU.png" },
      { name: "Byterover", slug: "byterover", url: "https://www.byterover.dev/", iconUrl: "https://i.imgur.com/jxUBre4.png" },
      { name: "WisprFlow", slug: "wisprflow", url: "https://wisprflow.ai", iconUrl: "https://cdn.prod.website-files.com/682f84b3838c89f8ff7667db/684b3be32acf9b372f54d041_ws-favi.png" },
      { name: "Windows", slug: "windows", url: "https://www.microsoft.com/windows", iconUrl: "https://i.imgur.com/TptJIji.png" },
      { name: "Ubuntu", slug: "ubuntu", url: "https://ubuntu.com" },
      { name: "Debian", slug: "debian", url: "https://www.debian.org" },
      { name: "Arch Linux", slug: "archlinux", url: "https://archlinux.org" },
      { name: "macOS", slug: "apple", url: "https://www.apple.com/macos" },
    ],
  },
]

export function AboutSection() {
  const [techSelectionnee, setTechSelectionnee] = useState<Tech | null>(null)
  const [estModaleOuverte, setEstModaleOuverte] = useState(false)

  const gererClicTech = (tech: Tech) => {
    setTechSelectionnee(tech)
    setEstModaleOuverte(true)
  }

  return (
    <section id="apropos" className="py-24 lg:py-32 px-6 lg:px-12 relative">
      <motion.div
        className="max-w-6xl mx-auto relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        variants={staggerContainer}
      >
        <SectionHeading
          index="01"
          title={<>À propos de <span className="text-accent-texte">moi</span></>}
          lead="Technicien Informatique le jour, Product Builder la nuit, avec plus de 12 ans de passion autodidacte pour la tech."
        />

        {/* Parcours : les deux versants, puis ce qu'ils produisent ensemble */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-col items-center py-12 border-t border-border/60"
        >
          <RailLabel>Mon parcours</RailLabel>

          {/*
            Le corps de texte passe à gauche à l'intérieur de chaque panneau :
            centré, il redevenait illisible dès la deuxième ligne. La symétrie
            des deux colonnes garde le bloc centré à l'échelle de la section.
          */}
          <div className="mt-8 grid md:grid-cols-2 gap-4 w-full max-w-4xl">
            {VERSANTS.map(({ id, icon: Icone, label, role, lieu, texte }) => (
              <motion.article
                key={id}
                variants={fadeInUp}
                className="rounded-lg border border-border bg-input/20 dark:bg-input/30 p-6 text-left"
              >
                <div className="flex items-center gap-2">
                  <Icone className="size-4 text-accent-texte" aria-hidden="true" />
                  <h3 className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent-texte">
                    {label}
                  </h3>
                </div>

                <p className="mt-5 text-base font-medium text-foreground tracking-tight">{role}</p>
                <p className="mt-1 text-sm text-muted-foreground">{lieu}</p>
                <p className="mt-4 text-sm/relaxed text-muted-foreground">{texte}</p>
              </motion.article>
            ))}
          </div>

          <p className="mt-10 max-w-2xl text-center text-balance text-base md:text-lg text-muted-foreground leading-relaxed">
            Cette double vie m'a forgé une vision à 360° : de l'infrastructure matérielle au
            produit logiciel.
          </p>
        </motion.div>

        {/* Compétences : un index éditorial, une entrée par filet */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-col items-center py-12 border-t border-border/60"
        >
          <RailLabel>Ce que j'apporte</RailLabel>

          <ul className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8 w-full">
            {COMPETENCES.map(({ icon: Icone, title, description }, index) => (
              <motion.li
                key={title}
                variants={fadeInUp}
                className="group border-t border-border/60 pt-5 text-left transition-colors hover:border-accent/50"
              >
                <div className="flex items-center justify-between">
                  <Icone className="size-5 text-accent-texte" aria-hidden="true" />
                  <span className="font-mono text-xs font-medium text-muted-foreground tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="mt-5 text-base font-medium text-foreground group-hover:text-accent-texte transition-colors">
                  {title}
                </h3>
                <p className="mt-2 text-sm/relaxed text-muted-foreground">{description}</p>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Technologies : liste de définitions, libellé à gauche et puces à droite */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-col items-center pt-12 border-t border-border/60"
        >
          <RailLabel>Technologies favorites</RailLabel>

          {/*
            Quatre listes de puces empilées et centrées formaient un pavé où
            aucune catégorie ne se distinguait. En colonne de libellés alignée à
            droite, l'œil retrouve chaque famille d'un coup. `pt-2` cale le
            libellé sur la ligne de base du premier rang de puces, dont le texte
            est centré dans 36 px de haut.
          */}
          <dl className="mt-10 w-full max-w-4xl divide-y divide-border/40">
            {CATEGORIES_TECH.map((categorie) => (
              <div
                key={categorie.title}
                className="py-6 first:pt-0 last:pb-0 md:grid md:grid-cols-[12rem_1fr] md:gap-x-8"
              >
                <dt className="flex items-baseline gap-2 md:justify-end md:pt-2">
                  <span className="text-sm font-medium text-accent-texte tracking-tight">
                    {categorie.title}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground tabular-nums">
                    {categorie.techs.length}
                  </span>
                </dt>

                <dd className="mt-3 md:mt-0 flex flex-wrap gap-2">
                  {categorie.techs.map((tech) => (
                    <motion.button
                      key={tech.name}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => gererClicTech(tech)}
                      className="flex items-center gap-2 h-9 px-3 bg-input/20 dark:bg-input/30 border border-border rounded-md hover:bg-muted hover:border-accent/40 transition-colors cursor-pointer group"
                    >
                      <img
                        src={tech.iconUrl || `https://cdn.simpleicons.org/${tech.slug}`}
                        alt=""
                        aria-hidden="true"
                        className="size-4 grayscale group-hover:grayscale-0 transition-all object-contain"
                      />
                      <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                        {tech.name}
                      </span>
                    </motion.button>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </motion.div>

      <TechModal
        isOpen={estModaleOuverte && !!techSelectionnee}
        onClose={() => {
          setEstModaleOuverte(false)
          setTimeout(() => setTechSelectionnee(null), 500)
        }}
        techName={techSelectionnee?.name ?? ""}
        techUrl={techSelectionnee?.url ?? ""}
        techIcon={techSelectionnee?.slug ?? ""}
        iconUrl={techSelectionnee?.iconUrl}
      />
    </section>
  )
}
