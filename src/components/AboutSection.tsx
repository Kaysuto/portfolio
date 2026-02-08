import { useState } from "react"
import { motion, Variants } from "framer-motion"
import { Brain, Code, Heart, Server, Cpu, Globe } from "lucide-react"
import { useCounterAnimation } from "@/hooks/useCounterAnimation"
import { Card, CardContent } from "@/components/ui/card"
import { TechModal } from "@/components/ui/TechModal"

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
}

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
}

const floatingVariants: Variants = {
  animate: {
    y: [0, -15, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

export function AboutSection() {
  const ageCounter = useCounterAnimation({ end: 23, duration: 1800 })
  const experienceCounter = useCounterAnimation({ end: 15, duration: 2200 })

  const [selectedTech, setSelectedTech] = useState<{name: string, slug: string, url: string} | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const skills = [
    {
      icon: <Server className="w-6 h-6 text-accent" />,
      title: "Expertise Infra",
      description: "Rigueur, sécurité et haute disponibilité héritées de mon parcours en datacenter."
    },
    {
      icon: <Brain className="w-6 h-6 text-accent" />,
      title: "Modèles LLM",
      description: "Exploration et intégration de l'IA pour créer des applications intelligentes."
    },
    {
      icon: <Code className="w-6 h-6 text-accent" />,
      title: "Qualité Code",
      description: "Architecture propre et standards d'excellence pour des projets pérennes."
    },
    {
      icon: <Heart className="w-6 h-6 text-accent" />,
      title: "User First",
      description: "Conception d'interfaces intuitives centrées sur l'expérience utilisateur."
    }
  ]

  const techCategories = [
    {
      title: "Frontend & Design",
      techs: [
        { name: "React", slug: "react", url: "https://react.dev" },
        { name: "TypeScript", slug: "typescript", url: "https://www.typescriptlang.org" },
        { name: "Vue.js", slug: "vuedotjs", url: "https://vuejs.org" },
        { name: "Tailwind CSS", slug: "tailwindcss", url: "https://tailwindcss.com" },
      ]
    },
    {
      title: "Backend & Cloud",
      techs: [
        { name: "Node.js", slug: "nodedotjs", url: "https://nodejs.org" },
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
        { name: "Windows", slug: "windows", url: "https://www.microsoft.com/windows", iconUrl: "https://i.imgur.com/TptJIji.png" }
      ]
    }
  ]

  const handleTechClick = (tech: any) => {
    setSelectedTech(tech)
    setIsModalOpen(true)
  }

  return (
    <section id="apropos" className="py-16 px-6 bg-background relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          variants={floatingVariants}
          animate="animate"
          className="absolute top-10 right-10 w-32 h-32 bg-accent/5 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{
            y: [0, 20, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-20 left-8 w-24 h-24 bg-primary/10 rounded-full blur-2xl"
        />
      </div>

      <motion.div 
        className="max-w-5xl mx-auto relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        {/* Section Header */}
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">
            À propos de <span className="text-accent">moi</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium">
            Créateur passionné de 23 ans, j'allie expertise technique en infrastructure et créativité en tant que Product Builder.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left - Personal Info */}
          <motion.div className="space-y-6" variants={itemVariants}>
            <div className="prose prose-invert max-w-none">
              <h3 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                <Cpu className="text-accent w-7 h-7" />
                Mon parcours
              </h3>
              <p className="text-muted-foreground text-base leading-relaxed mb-4 font-medium">
                Mon expérience de 3 ans en datacenter m'a forgé une culture de la fiabilité et de la performance. Aujourd'hui, j'applique cette rigueur à la création d'applications web innovantes, de design pixel art et d'architectures réseau complexes.
              </p>
              <p className="text-muted-foreground text-base leading-relaxed font-medium">
                Cette vision globale me permet de gérer aussi bien l'infrastructure matérielle que le développement logiciel et l'expérience utilisateur.
              </p>
            </div>

            {/* Age & Experience Stats */}
            <div className="flex items-center gap-10 pt-4">
              <div className="flex flex-col">
                <div className="flex items-baseline gap-1">
                  <span 
                    ref={ageCounter.elementRef}
                    className="text-4xl font-bold text-accent tabular-nums"
                  >
                    {ageCounter.count}
                  </span>
                  <span className="text-lg font-bold text-muted-foreground">ans</span>
                </div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground/60 mt-1 font-bold">Âge</p>
              </div>
              <div className="flex flex-col">
                <div className="flex items-baseline gap-1">
                  <span 
                    ref={experienceCounter.elementRef}
                    className="text-4xl font-bold text-accent tabular-nums"
                  >
                    {experienceCounter.count}+
                  </span>
                  <span className="text-lg font-bold text-muted-foreground">ans</span>
                </div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground/60 mt-1 font-bold">Expérience</p>
              </div>
            </div>
          </motion.div>

          {/* Right - Skills Cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {skills.map((skill, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full bg-card/40 backdrop-blur-md border-border/50 hover:border-accent/40 transition-all duration-300 group rounded-[2rem]">
                  <CardContent className="p-6">
                    <div className="mb-4 p-3 bg-accent/10 rounded-xl w-fit group-hover:bg-accent/20 transition-colors duration-300">
                      {skill.icon}
                    </div>
                    <h4 className="font-bold text-foreground mb-2 group-hover:text-accent transition-colors duration-300">
                      {skill.title}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                      {skill.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tech Stack Section */}
        <motion.div className="mt-20" variants={itemVariants}>
          <div className="flex items-center gap-4 mb-12">
            <div className="h-px flex-1 bg-border/50" />
            <h3 className="text-xl font-bold text-foreground flex items-center gap-2 uppercase tracking-widest">
              <Globe className="w-5 h-5 text-accent" />
              Technologies favorites
            </h3>
            <div className="h-px flex-1 bg-border/50" />
          </div>
          
          <div className="grid md:grid-cols-2 gap-10">
            {techCategories.map((category) => (
              <div key={category.title} className="space-y-4">
                <h4 className="text-sm font-bold text-accent/70 uppercase tracking-widest px-2">
                  {category.title}
                </h4>
                <div className="flex flex-wrap gap-3">
                  {category.techs.map((tech) => (
                    <motion.button
                      key={tech.name}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleTechClick(tech)}
                      className="group relative"
                    >
                      <div className="flex items-center gap-3 px-4 py-2.5 bg-card/40 backdrop-blur-sm border border-border/50 rounded-xl hover:bg-accent/5 hover:border-accent/30 transition-all duration-300 cursor-pointer">
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
        isOpen={isModalOpen && !!selectedTech}
        onClose={() => {
          setIsModalOpen(false)
          setTimeout(() => setSelectedTech(null), 500)
        }}
        techName={selectedTech?.name || ''}
        techUrl={selectedTech?.url || ''}
        techIcon={selectedTech?.slug || ''}
        iconUrl={(selectedTech as any)?.iconUrl}
      />
    </section>
  )
}
