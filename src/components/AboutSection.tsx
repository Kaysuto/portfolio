import { Brain, Code, Heart } from "@phosphor-icons/react"
import { useCounterAnimation } from "@/hooks/useCounterAnimation"

export function AboutSection() {
  const ageCounter = useCounterAnimation({ end: 23, duration: 1800 })
  const experienceCounter = useCounterAnimation({ end: 15, duration: 2200 })

  return (
    <section id="apropos" className="py-20 px-6 bg-secondary/30 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-10 w-32 h-32 bg-accent/5 rounded-full animate-float-slow animate-delay-700"></div>
        <div className="absolute bottom-20 left-8 w-24 h-24 bg-primary/10 rounded-full animate-float-medium animate-delay-800"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-secondary/20 rounded-full animate-bounce-slow animate-delay-900"></div>
        <div className="absolute top-20 left-1/3 w-12 h-12 bg-accent/15 rounded-full animate-pulse-slow animate-delay-1000"></div>
      </div>
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fadeInUp animate-delay-200">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 hover:text-accent transition-colors duration-300">
            À propos de moi
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">Full-Stack Maker polyvalent et Technicien Datacenter de 23 ans, j'ai acquis une expertise dans de nombreux domaines : réseau, développement, design pixel art, création de mini-jeux Minecraft et bien plus encore.</p>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left - Personal Info */}
          <div className="space-y-6 animate-slideInFromLeft animate-delay-300">
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-4 hover:text-accent transition-colors duration-300">
                Mon parcours
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6 hover:text-foreground/80 transition-colors duration-300">En tant que Full-Stack Maker polyvalent et Technicien Datacenter, ma force réside dans ma diversité d'expertise : de l'infrastructure réseau au développement web, du design pixel art à la création de mini-jeux Minecraft. Cette polyvalence unique me permet d'aborder chaque projet avec une vision globale et créative.</p>
              <p className="text-muted-foreground leading-relaxed hover:text-foreground/80 transition-colors duration-300">
                Mon expérience en datacenter m'apporte une compréhension approfondie 
                des systèmes, de la sécurité et de la fiabilité, que j'applique 
                dans mes créations pour garantir innovation et qualité.
              </p>
            </div>

            {/* Age & Experience */}
            <div className="flex items-center space-x-8 pt-4">
              <div className="group cursor-default">
                <span 
                  ref={ageCounter.elementRef}
                  className="text-3xl font-bold text-accent group-hover:scale-110 transition-transform duration-300 inline-block"
                >
                  {ageCounter.count}
                </span>
                <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">ans</p>
              </div>
              <div className="group cursor-default">
                <span 
                  ref={experienceCounter.elementRef}
                  className="text-3xl font-bold text-accent group-hover:scale-110 transition-transform duration-300 inline-block"
                >
                  {experienceCounter.count}+
                </span>
                <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">ans expérience</p>
              </div>
            </div>
          </div>

          {/* Right - Skills & Interests */}
          <div className="space-y-6 animate-slideInFromRight animate-delay-400">
            {/* Infrastructure Expertise */}
            <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-xl hover:shadow-accent/10 transition-all duration-500 hover:-translate-y-1 group">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-accent/10 rounded-lg flex-shrink-0 group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300">
                  {/* Remplacer Server par Code ou une autre icône existante */}
                  <Code size={24} className="text-accent group-hover:animate-pulse" />
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
                    propre et aux standards d'excellence dans chaque domaine.
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
        <div className="mt-16 animate-fadeInUp animate-delay-600">
          <h3 className="text-2xl font-semibold text-foreground mb-8 text-center hover:text-accent transition-colors duration-300">
            Technologies favorites
          </h3>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { name: "React", slug: "react" },
              { name: "TypeScript", slug: "typescript" },
              { name: "Vue.js", slug: "vuedotjs" },
              { name: "Node.js", slug: "nodedotjs" },
              { name: "PHP", slug: "php" },
              { name: "MySQL", slug: "mysql" },
              { name: "Tailwind CSS", slug: "tailwindcss" },
              { name: "Git", slug: "git" },
              { name: "Docker", slug: "docker" },
              { name: "Linux", slug: "linux" },
              { name: "VMware", slug: "vmware" },
              { name: "Windows Server", slug: "windows" }
            ].map((tech, index) => (
              <div
                key={tech.name}
                className="group relative flex flex-col items-center justify-center p-4 bg-accent/5 border border-accent/10 rounded-2xl hover:bg-accent/10 hover:scale-110 hover:shadow-xl hover:shadow-accent/10 transition-all duration-300 cursor-default animate-stagger"
                style={{ animationDelay: `${(index + 10) * 0.1}s` }}
                title={tech.name}
              >
                <img 
                  src={`https://cdn.simpleicons.org/${tech.slug}`} 
                  alt={tech.name}
                  className="w-10 h-10 transition-all duration-300 group-hover:scale-110"
                />
                <span className="absolute -bottom-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs font-medium text-accent whitespace-nowrap">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}