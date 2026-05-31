import { useState } from "react"
import { motion } from "framer-motion"
import { Brain, Code, Heart, Server, Cpu, Globe } from "lucide-react"
import { useCounterAnimation } from "@/hooks/useCounterAnimation"
import { Card, CardContent } from "@/components/ui/card"
import { TechModal } from "@/components/ui/TechModal"
import { fadeInUp, staggerContainer, VIEWPORT } from "@/lib/animations"

export function AboutSection() {
  const compteurAge = useCounterAnimation({ end: 23, duration: 1800 })
  const compteurExperience = useCounterAnimation({ end: 11, duration: 1800 })

  const [techSelectionnee, setTechSelectionnee] = useState<{name: string, slug: string, url: string} | null>(null)
  const [estModaleOuverte, setEstModaleOuverte] = useState(false)

  const competences = [
    {
      icon: <Server className="w-6 h-6 text-accent" />,
      title: "Expertise Infra",
      description: "Rigueur, sécurité et haute disponibilité héritées de mon parcours en datacenter.",
      span: "sm:col-span-2"
    },
    {
      icon: <Brain className="w-6 h-6 text-accent" />,
      title: "Modèles LLM",
      description: "Exploration et intégration de l'IA pour créer des applications intelligentes.",
      span: ""
    },
    {
      icon: <Code className="w-6 h-6 text-accent" />,
      title: "Qualité Code",
      description: "Architecture propre et standards d'excellence pour des projets pérennes.",
      span: ""
    },
    {
      icon: <Heart className="w-6 h-6 text-accent" />,
      title: "User First",
      description: "Conception d'interfaces intuitives centrées sur l'expérience utilisateur.",
      span: "sm:col-span-2"
    }
  ]

  const categoriesTech = [
    {
      title: "Frontend & Design",
      techs: [
        { name: "React", slug: "react", url: "https://react.dev" },
        { name: "TypeScript", slug: "typescript", url: "https://www.typescriptlang.org" },
        { name: "Next.js", slug: "nextdotjs", url: "https://nextjs.org" },
        { name: "Vue.js", slug: "vuedotjs", url: "https://vuejs.org" },
        { name: "Tailwind CSS", slug: "tailwindcss", url: "https://tailwindcss.com" },
      ]
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
      ]
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
      ]
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
        { name: "macOS", slug: "apple", url: "https://www.apple.com/macos" }
      ]
    }
  ]

  const gererClicTech = (tech: any) => {
    setTechSelectionnee(tech)
    setEstModaleOuverte(true)
  }

  return (
    <section id="apropos" className="py-24 px-6 relative">
      {/* Éléments d'arrière-plan animés */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 right-10 w-32 h-32 bg-accent/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 left-8 w-24 h-24 bg-primary/10 rounded-full blur-2xl"
        />
      </div>

      <motion.div
        className="max-w-5xl mx-auto relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        variants={staggerContainer}
      >
        {/* En-tête de section */}
        <motion.div className="text-center mb-16" variants={fadeInUp}>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">
            À propos de <span className="text-accent">moi</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium">
            Technicien Informatique le jour, Product Builder la nuit — 11 ans de passion autodidacte pour la tech.
          </p>
        </motion.div>

        {/* Contenu principal */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Gauche - Infos personnelles */}
          <motion.div className="space-y-6" variants={fadeInUp}>
            <div className="prose prose-invert max-w-none">
              <h3 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                <Cpu className="text-accent w-7 h-7" />
                Mon parcours
              </h3>
              <p className="text-muted-foreground text-base leading-relaxed mb-4 font-medium">
                Après 3 ans en datacenter, je suis désormais Technicien Informatique Polyvalent Junior chez Magna Engineered Glass Europe — gestion du parc, support utilisateurs, administration réseau et maintenance de l'infrastructure interne.
              </p>
              <p className="text-muted-foreground text-base leading-relaxed font-medium">
                La nuit, je construis des applications web, explore l'IA et crée des expériences digitales. Cette double vie m'a forgé une vision à 360° : de l'infrastructure matérielle au produit logiciel.
              </p>
            </div>

            {/* Statistiques Âge & Expérience */}
            <div className="flex items-center gap-10 pt-4">
              <div className="flex flex-col">
                <div className="flex items-baseline gap-1">
                  <span
                    ref={compteurAge.elementRef}
                    className="text-4xl font-bold text-accent tabular-nums"
                  >
                    {compteurAge.count}
                  </span>
                  <span className="text-lg font-bold text-muted-foreground">ans</span>
                </div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground/60 mt-1 font-bold">Âge</p>
              </div>
              <div className="flex flex-col">
                <div className="flex items-baseline gap-1">
                  <span
                    ref={compteurExperience.elementRef}
                    className="text-4xl font-bold text-accent tabular-nums"
                  >
                    {compteurExperience.count}+
                  </span>
                  <span className="text-lg font-bold text-muted-foreground">ans</span>
                </div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground/60 mt-1 font-bold">Exp. autodidacte</p>
              </div>
            </div>
          </motion.div>

          {/* Droite - Bento de compétences */}
          <div className="grid sm:grid-cols-2 auto-rows-[1fr] gap-4">
            {competences.map((competence, index) => (
              <motion.div key={index} variants={fadeInUp} className={competence.span}>
                <Card className="group relative h-full overflow-hidden bg-accent/5 backdrop-blur-md border-accent/15 hover:border-accent/40 hover:bg-accent/10 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 rounded-2xl">
                  {/* Halo décoratif */}
                  <div className="pointer-events-none absolute -top-12 -right-12 w-32 h-32 bg-accent/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <CardContent className="relative p-6">
                    <div className="mb-4 p-3 bg-accent/15 rounded-xl w-fit group-hover:bg-accent/25 group-hover:scale-110 transition-all duration-300">
                      {competence.icon}
                    </div>
                    <h4 className="font-bold text-foreground mb-2 group-hover:text-accent transition-colors duration-300">
                      {competence.title}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                      {competence.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Section Stack Technique */}
        <motion.div className="mt-20" variants={fadeInUp}>
          <div className="flex items-center gap-4 mb-12">
            <div className="h-px flex-1 bg-border/50" />
            <h3 className="text-xl font-bold text-foreground flex items-center gap-2 uppercase tracking-widest">
              <Globe className="w-5 h-5 text-accent" />
              Technologies favorites
            </h3>
            <div className="h-px flex-1 bg-border/50" />
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {categoriesTech.map((categorie) => (
              <div key={categorie.title} className="space-y-4">
                <h4 className="text-sm font-bold text-accent/70 uppercase tracking-widest px-2">
                  {categorie.title}
                </h4>
                <div className="flex flex-wrap gap-3">
                  {categorie.techs.map((tech) => (
                    <motion.button
                      key={tech.name}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => gererClicTech(tech)}
                      className="group relative"
                    >
                      <div className="flex items-center gap-3 px-4 py-2.5 bg-accent/8 backdrop-blur-sm border border-accent/15 rounded-xl hover:bg-accent/15 hover:border-accent/40 transition-all duration-300 cursor-pointer">
                        <img
                          src={(tech as any).iconUrl || `https://cdn.simpleicons.org/${tech.slug}`}
                          alt={tech.name}
                          className="w-5 h-5 grayscale group-hover:grayscale-0 transition-all duration-300 object-contain"
                        />
                        <span className="text-xs font-bold text-muted-foreground group-hover:text-foreground transition-colors">
                          {tech.name}
                        </span>
                      </div>
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
        techName={techSelectionnee?.name || ''}
        techUrl={techSelectionnee?.url || ''}
        techIcon={techSelectionnee?.slug || ''}
        iconUrl={(techSelectionnee as any)?.iconUrl}
      />
    </section>
  )
}
