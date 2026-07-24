import { useState } from "react"
import { motion } from "framer-motion"
import { Brain, Code, Heart, Server } from "lucide-react"
import { useCounterAnimation } from "@/hooks/useCounterAnimation"
import { TechModal } from "@/components/ui/TechModal"
import { SectionHeading, RailLabel } from "@/components/ui/SectionHeading"
import { Sticker } from "@/components/ui/Sticker"
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
      { name: "Superwhisper", slug: "superwhisper", url: "https://superwhisper.com/", iconUrl: "https://i.imgur.com/b9p7J8B.png" },
      { name: "Windows", slug: "windows", url: "https://www.microsoft.com/windows", iconUrl: "https://i.imgur.com/TptJIji.png" },
      { name: "Ubuntu", slug: "ubuntu", url: "https://ubuntu.com" },
      { name: "Debian", slug: "debian", url: "https://www.debian.org" },
      { name: "Arch Linux", slug: "archlinux", url: "https://archlinux.org" },
      { name: "macOS", slug: "apple", url: "https://www.apple.com/macos" },
    ],
  },
]

export function AboutSection() {
  const compteurAge = useCounterAnimation({ end: 24, duration: 1800 })
  const compteurExperience = useCounterAnimation({ end: 12, duration: 1800 })

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
          title={<>À propos de <span className="text-accent">moi</span></>}
          lead="Technicien Informatique le jour, Product Builder la nuit — plus de 12 ans de passion autodidacte pour la tech."
        />

        {/* ── Parcours : rail d'étiquette + texte, avec chiffres en marge ───── */}
        <motion.div
          variants={fadeInUp}
          className="grid lg:grid-cols-12 gap-x-10 gap-y-8 py-12 border-t border-border/60"
        >
          <div className="lg:col-span-3">
            <RailLabel>Mon parcours</RailLabel>
            <Sticker name="reflechit" size={160} className="hidden lg:block mt-6 -ml-4" />
          </div>

          <div className="lg:col-span-6 space-y-5">
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed font-medium">
              Après 3 ans en datacenter, je suis désormais Technicien Informatique Polyvalent Junior chez Magna Engineered Glass Europe — gestion du parc, support utilisateurs, administration réseau et maintenance de l'infrastructure interne.
            </p>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed font-medium">
              La nuit, je construis des applications web, explore l'IA et crée des expériences digitales. Cette double vie m'a forgé une vision à 360° : de l'infrastructure matérielle au produit logiciel.
            </p>
          </div>

          <dl className="lg:col-span-3 flex lg:flex-col gap-8 lg:gap-6 lg:border-l lg:border-border/60 lg:pl-8">
            <div>
              <dd className="flex items-baseline gap-1">
                <span ref={compteurAge.elementRef} className="text-4xl font-bold text-accent tabular-nums">
                  {compteurAge.count}
                </span>
                <span className="text-base font-bold text-muted-foreground">ans</span>
              </dd>
              <dt className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground mt-1.5 font-bold">Âge</dt>
            </div>
            <div>
              <dd className="flex items-baseline gap-1">
                <span ref={compteurExperience.elementRef} className="text-4xl font-bold text-accent tabular-nums">
                  {compteurExperience.count}+
                </span>
                <span className="text-base font-bold text-muted-foreground">ans</span>
              </dd>
              <dt className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground mt-1.5 font-bold">Exp. autodidacte</dt>
            </div>
          </dl>
        </motion.div>

        {/* ── Compétences : liste numérotée plutôt que grille de cartes ────── */}
        <motion.div
          variants={fadeInUp}
          className="grid lg:grid-cols-12 gap-x-10 gap-y-8 py-12 border-t border-border/60"
        >
          <div className="lg:col-span-3">
            <RailLabel>Ce que j'apporte</RailLabel>
          </div>

          <ul className="lg:col-span-9 divide-y divide-border/50">
            {COMPETENCES.map(({ icon: Icone, title, description }, index) => (
              <motion.li
                key={title}
                variants={fadeInUp}
                whileHover={{ x: 6 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="group flex items-start gap-5 py-5 first:pt-0 last:pb-0"
              >
                <span className="font-mono text-xs font-bold text-accent/70 tabular-nums pt-1 w-6 shrink-0">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <Icone className="w-5 h-5 text-accent shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <div className="min-w-0">
                  <h3 className="font-bold text-foreground mb-1 group-hover:text-accent transition-colors">
                    {title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-medium">
                    {description}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* ── Stack technique : une ligne par catégorie ─────────────────────── */}
        <motion.div variants={fadeInUp} className="pt-12 border-t border-border/60">
          <RailLabel className="lg:static mb-8 block">Technologies favorites</RailLabel>

          <div className="space-y-8">
            {CATEGORIES_TECH.map((categorie) => (
              <div key={categorie.title} className="grid lg:grid-cols-12 gap-x-10 gap-y-4 items-start">
                <h3 className="lg:col-span-3 text-sm font-bold text-accent tracking-tight pt-1.5">
                  {categorie.title}
                </h3>
                <div className="lg:col-span-9 flex flex-wrap gap-2.5">
                  {categorie.techs.map((tech) => (
                    <motion.button
                      key={tech.name}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => gererClicTech(tech)}
                      className="flex items-center gap-2.5 px-3.5 py-2 bg-accent/[0.06] border border-accent/15 rounded-xl hover:bg-accent/12 hover:border-accent/40 transition-colors cursor-pointer group"
                    >
                      <img
                        src={tech.iconUrl || `https://cdn.simpleicons.org/${tech.slug}`}
                        alt=""
                        aria-hidden="true"
                        className="w-4 h-4 grayscale group-hover:grayscale-0 transition-all object-contain"
                      />
                      <span className="text-xs font-bold text-muted-foreground group-hover:text-foreground transition-colors">
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
