import { Brain, Code, Heart, Server } from "@phosphor-icons/react"
import { useEffect, useState } from "react"

export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    const section = document.getElementById("apropos")
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="apropos" className="py-20 px-6 bg-secondary/30 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-10 w-32 h-32 bg-accent/5 rounded-full animate-float-slow"></div>
        <div className="absolute bottom-20 left-8 w-24 h-24 bg-primary/10 rounded-full animate-float-medium"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-secondary/20 rounded-full animate-bounce-slow"></div>
        <div className="absolute top-20 left-1/3 w-12 h-12 bg-accent/15 rounded-full animate-pulse-slow"></div>
      </div>
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 hover:text-accent transition-colors duration-300">
            À propos de moi
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">Développeur passionné et Technicien Datacenter de 23 ans, je combine expertise technique infrastructure et développement pour créer des solutions robustes.</p>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left - Personal Info */}
          <div className={`space-y-6 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-4 hover:text-accent transition-colors duration-300">
                Mon parcours
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6 hover:text-foreground/80 transition-colors duration-300">En tant que Full-Stack Maker et Technicien Datacenter, je maîtrise l'ensemble de la chaîne technologique, de l'infrastructure physique aux applications web. Cette double expertise me permet de créer des solutions complètes et performantes.</p>
              <p className="text-muted-foreground leading-relaxed hover:text-foreground/80 transition-colors duration-300">
                Mon expérience en datacenter m'apporte une compréhension approfondie 
                des systèmes, de la sécurité et de la fiabilité, que j'applique 
                dans mes développements pour garantir robustesse et scalabilité.
              </p>
            </div>

            {/* Age & Location */}
            <div className="flex items-center space-x-8 pt-4">
              <div className="group cursor-default">
                <span className="text-3xl font-bold text-accent group-hover:scale-110 transition-transform duration-300 inline-block">23</span>
                <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">ans</p>
              </div>
              <div className="group cursor-default">
                <span className="text-3xl font-bold text-accent group-hover:scale-110 transition-transform duration-300 inline-block">3</span>
                <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">ans Datacenter</p>
              </div>
              <div className="group cursor-default">
                <span className="text-3xl font-bold text-accent group-hover:scale-110 transition-transform duration-300 inline-block">10+</span>
                <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">ans développement</p>
              </div>
            </div>
          </div>

          {/* Right - Skills & Interests */}
          <div className={`space-y-6 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            {/* Infrastructure Expertise */}
            <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-xl hover:shadow-accent/10 transition-all duration-500 hover:-translate-y-1 group">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-accent/10 rounded-lg flex-shrink-0 group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300">
                  <Server size={24} className="text-accent group-hover:animate-pulse" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2 group-hover:text-accent transition-colors duration-300">
                    Expertise Infrastructure
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                    3 ans d'expérience en datacenter m'ont appris l'importance de 
                    la fiabilité, de la sécurité et de la performance au niveau matériel.
                  </p>
                </div>
              </div>
            </div>

            {/* LLM Interest */}
            <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-xl hover:shadow-accent/10 transition-all duration-500 hover:-translate-y-1 group">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-accent/10 rounded-lg flex-shrink-0 group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300">
                  <Brain size={24} className="text-accent group-hover:animate-pulse" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2 group-hover:text-accent transition-colors duration-300">
                    Passionné par les LLM
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                    Je m'intéresse particulièrement aux modèles de langage et à leur 
                    intégration dans des applications pratiques pour améliorer l'expérience utilisateur.
                  </p>
                </div>
              </div>
            </div>

            {/* Clean Code */}
            <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-xl hover:shadow-accent/10 transition-all duration-500 hover:-translate-y-1 group">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-accent/10 rounded-lg flex-shrink-0 group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300">
                  <Code size={24} className="text-accent group-hover:animate-pulse" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2 group-hover:text-accent transition-colors duration-300">
                    Code élégant et performant
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                    J'accorde une grande importance à la qualité du code, à l'architecture 
                    propre et aux bonnes pratiques de développement.
                  </p>
                </div>
              </div>
            </div>

            {/* User Experience */}
            <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-xl hover:shadow-accent/10 transition-all duration-500 hover:-translate-y-1 group">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-accent/10 rounded-lg flex-shrink-0 group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300">
                  <Heart size={24} className="text-accent group-hover:animate-pulse" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2 group-hover:text-accent transition-colors duration-300">
                    Centré sur l'utilisateur
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                    Chaque projet commence par comprendre les besoins utilisateurs 
                    pour créer des interfaces intuitives et engageantes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className={`mt-16 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h3 className="text-2xl font-semibold text-foreground mb-8 text-center hover:text-accent transition-colors duration-300">
            Technologies favorites
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "React", "TypeScript", "Vue.js", "Node.js", "PHP", "MySQL", 
              "Tailwind CSS", "Git", "Docker", "Linux", "VMware", "Windows Server"
            ].map((tech, index) => (
              <span
                key={tech}
                className="px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-sm font-medium text-accent hover:bg-accent/20 hover:scale-105 hover:shadow-lg hover:shadow-accent/25 transition-all duration-300 cursor-default animate-stagger"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}