import { Brain, Code, Heart } from "@phosphor-icons/react"
import { useCounterAnimation } from "@/hooks/useCounterAnimation"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"

export function AboutSection() {
  const ageCounter = useCounterAnimation({ end: 23, duration: 1800 })
  const experienceCounter = useCounterAnimation({ end: 15, duration: 2200 })

  const skills = [
    {
      icon: <Code size={24} />,
      title: "Expertise Infrastructure",
      desc: "3 ans d'expérience en datacenter m'ont appris l'importance de la fiabilité, de la sécurité et de la performance au niveau matériel."
    },
    {
      icon: <Brain size={24} />,
      title: "Passionné par les LLM",
      desc: "Je m'intéresse particulièrement aux modèles de langage et à leur intégration dans des applications pratiques."
    },
    {
      icon: <Code size={24} />,
      title: "Code élégant",
      desc: "J'accorde une grande importance à la qualité du code, à l'architecture propre et aux standards d'excellence."
    },
    {
      icon: <Heart size={24} />,
      title: "Centré utilisateur",
      desc: "Chaque projet commence par comprendre les besoins utilisateurs pour créer des interfaces intuitives."
    }
  ]

  const techStack = [
    "React", "TypeScript", "Vue.js", "Node.js", "PHP", "MySQL", 
    "Tailwind CSS", "Git", "Docker", "Linux", "VMware", "Windows Server"
  ]

  return (
    <section id="apropos" className="py-24 px-6 bg-secondary/30 relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            À propos de <span className="text-accent">moi</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Full-Stack Maker polyvalent et Technicien Datacenter de 23 ans, j'ai acquis une expertise dans de nombreux domaines : réseau, développement, design et innovation.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold">Mon parcours</h3>
            <p className="text-muted-foreground leading-relaxed">
              En tant que Full-Stack Maker polyvalent et Technicien Datacenter, ma force réside dans ma diversité d'expertise : de l'infrastructure réseau au développement web, du design pixel art à la création de mini-jeux.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Mon expérience en datacenter m'apporte une compréhension approfondie des systèmes, de la sécurité et de la fiabilité.
            </p>

            <div className="flex items-center space-x-12 pt-4">
              <div>
                <motion.span 
                  ref={ageCounter.elementRef}
                  className="text-4xl font-bold text-accent block"
                >
                  {ageCounter.count}
                </motion.span>
                <p className="text-sm text-muted-foreground uppercase tracking-wider">ans</p>
              </div>
              <div>
                <motion.span 
                  ref={experienceCounter.elementRef}
                  className="text-4xl font-bold text-accent block"
                >
                  {experienceCounter.count}+
                </motion.span>
                <p className="text-sm text-muted-foreground uppercase tracking-wider">ans d'expérience</p>
              </div>
            </div>
          </motion.div>

          <div className="grid gap-4">
            {skills.map((skill, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="p-4 bg-card/50 border-border/50 hover:border-accent/50 transition-colors group">
                  <div className="flex gap-4">
                    <div className="p-2 bg-accent/10 rounded-lg text-accent group-hover:scale-110 transition-transform">
                      {skill.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{skill.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{skill.desc}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <h3 className="text-2xl font-semibold mb-8 text-center">Technologies favorites</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.1, backgroundColor: "var(--accent)", color: "var(--accent-foreground)" }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-sm font-medium text-accent cursor-default transition-colors"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
