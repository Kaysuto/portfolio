import { Code, ShieldCheck, Database, Palette } from "lucide-react"
import { useCounterAnimation } from "@/hooks/useCounterAnimation"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export function AboutSection() {
  const ageCounter = useCounterAnimation({ end: 23, duration: 1800 })
  const experienceCounter = useCounterAnimation({ end: 15, duration: 2200 })

  const skills = [
    {
      icon: <Database size={24} />,
      title: "Infrastructure & Cloud",
      desc: "Expertise en datacenter, virtualisation et gestion de serveurs haute disponibilité.",
      color: "primary"
    },
    {
      icon: <Code size={24} />,
      title: "Développement Full-Stack",
      desc: "Création d'applications web modernes avec React, Node.js et architectures scalables.",
      color: "accent"
    },
    {
      icon: <ShieldCheck size={24} />,
      title: "Sécurité & Réseaux",
      desc: "Conception de réseaux sécurisés et mise en place de protocoles de protection des données.",
      color: "primary"
    },
    {
      icon: <Palette size={24} />,
      title: "Design & Expérience",
      desc: "Focus sur l'UI/UX pour offrir des interfaces intuitives et esthétiquement plaisantes.",
      color: "accent"
    }
  ]

  const techStack = [
    { name: "React", category: "frontend" },
    { name: "TypeScript", category: "frontend" },
    { name: "Node.js", category: "backend" },
    { name: "Tailwind CSS", category: "frontend" },
    { name: "Docker", category: "devops" },
    { name: "Linux", category: "devops" },
    { name: "VMware", category: "devops" },
    { name: "Supabase", category: "backend" },
    { name: "PostgreSQL", category: "backend" },
    { name: "Git", category: "devops" }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <section id="a-propos" className="py-32 px-6 relative overflow-hidden noise-bg">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(166,139,124,0.03),transparent_70%)]" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* Left Column - Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:sticky lg:top-32"
          >
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-secondary text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-6 border-2 border-foreground/10"
            >
              À propos de moi
            </motion.span>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight uppercase italic tracking-tighter">
              Une vision <br />
              <span className="text-primary">globale</span> du numérique.
            </h2>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed font-medium italic border-l-4 border-primary pl-6">
              Mon parcours atypique, mêlant expertise en infrastructure datacenter et passion 
              pour le développement créatif.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-card rounded-3xl p-6 border-2 border-foreground/10 shadow-xl">
                <span 
                  ref={ageCounter.elementRef} 
                  className="text-4xl font-black text-primary block mb-1 italic tracking-tighter"
                >
                  {ageCounter.count}
                </span>
                <p className="text-[9px] text-muted-foreground uppercase tracking-widest font-black">
                  Ans d'existence
                </p>
              </div>
              <div className="bg-card rounded-3xl p-6 border-2 border-foreground/10 shadow-xl">
                <span 
                  ref={experienceCounter.elementRef} 
                  className="text-4xl font-black text-primary block mb-1 italic tracking-tighter"
                >
                  {experienceCounter.count}+
                </span>
                <p className="text-[9px] text-muted-foreground uppercase tracking-widest font-black">
                  Projets réalisés
                </p>
              </div>
            </div>

            {/* Tech Stack */}
            <div>
              <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] mb-6">
                Technologies Maîtrisées
              </h4>
              <div className="flex flex-wrap gap-3">
                {techStack.map((tech) => (
                  <span 
                    key={tech.name} 
                    className="px-5 py-2 rounded-xl bg-secondary text-xs font-black uppercase tracking-tighter border-2 border-foreground/5 hover:border-primary transition-all cursor-default"
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Skills Grid */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 gap-6"
          >
            {skills.map((skill, i) => {
              return (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="bg-card rounded-[2.5rem] p-8 border-2 border-foreground/10 shadow-xl transition-all duration-300 group hover:border-primary hover:-translate-y-2"
                >
                  <div className={cn(
                    "w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 border-2 border-foreground/5",
                    skill.color === "primary" ? "bg-primary text-primary-foreground" : "bg-secondary text-primary"
                  )}>
                    {skill.icon}
                  </div>
                  <h4 className="text-xl font-black mb-3 uppercase italic tracking-tighter">{skill.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed font-medium italic">
                    "{skill.desc}"
                  </p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
