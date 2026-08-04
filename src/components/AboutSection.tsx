import { useState } from "react"
import { motion } from "framer-motion"
import { Brain, Code, Heart, Server } from "lucide-react"
import { TechModal } from "@/components/ui/TechModal"
import { SectionHeading, RailLabel } from "@/components/ui/SectionHeading"
import { fadeInUp, staggerContainer, VIEWPORT } from "@/lib/animations"

type Tech = { name: string; slug: string; url: string; iconUrl?: string }

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
          lead="Technicien Informatique le jour, Product Builder la nuit — plus de 12 ans de passion autodidacte pour la tech."
        />

        {/* ── Parcours ─────────────────────────────────────────────────────── */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-col items-center text-center py-12 border-t border-border/60"
        >
          <RailLabel>Mon parcours</RailLabel>

          <div className="mt-6 space-y-4 max-w-3xl">
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
              Après 3 ans en datacenter, je suis désormais Technicien Informatique Polyvalent Junior chez Magna Engineered Glass Europe — gestion du parc, support utilisateurs, administration réseau et maintenance de l'infrastructure interne.
            </p>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
              La nuit, je construis des applications web, explore l'IA et crée des expériences digitales. Cette double vie m'a forgé une vision à 360° : de l'infrastructure matérielle au produit logiciel.
            </p>
          </div>
        </motion.div>

        {/* ── Compétences ──────────────────────────────────────────────────── */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-col items-center py-12 border-t border-border/60"
        >
          <RailLabel>Ce que j'apporte</RailLabel>

          <ul className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 w-full">
            {COMPETENCES.map(({ icon: Icone, title, description }, index) => (
              <motion.li
                key={title}
                variants={fadeInUp}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="group flex flex-col items-center text-center"
              >
                <span className="font-mono text-[10px] font-medium text-accent-texte/70 tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="mt-3 grid place-items-center size-10 rounded-lg bg-accent/15 ring-1 ring-accent/25 group-hover:bg-accent/25 transition-colors">
                  <Icone className="size-4 text-accent-texte" />
                </span>
                <h3 className="mt-4 text-sm font-medium text-foreground group-hover:text-accent-texte transition-colors">
                  {title}
                </h3>
                <p className="mt-1.5 text-xs/relaxed text-muted-foreground max-w-[24ch]">
                  {description}
                </p>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* ── Stack technique : une ligne par catégorie ─────────────────────── */}
        <motion.div variants={fadeInUp} className="flex flex-col items-center pt-12 border-t border-border/60">
          <RailLabel>Technologies favorites</RailLabel>

          <div className="mt-8 space-y-8 w-full">
            {CATEGORIES_TECH.map((categorie) => (
              <div key={categorie.title} className="flex flex-col items-center gap-3">
                <h3 className="text-xs font-medium text-accent-texte tracking-tight">
                  {categorie.title}
                </h3>
                <div className="flex flex-wrap justify-center gap-1.5 max-w-3xl">
                  {categorie.techs.map((tech) => (
                    <motion.button
                      key={tech.name}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => gererClicTech(tech)}
                      className="flex items-center gap-2 h-7 px-2 bg-input/20 dark:bg-input/30 border border-border rounded-md hover:bg-muted hover:border-accent/40 transition-colors cursor-pointer group"
                    >
                      <img
                        src={tech.iconUrl || `https://cdn.simpleicons.org/${tech.slug}`}
                        alt=""
                        aria-hidden="true"
                        className="size-3.5 grayscale group-hover:grayscale-0 transition-all object-contain"
                      />
                      <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                        {tech.name}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>
            ))}
          </div>
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
