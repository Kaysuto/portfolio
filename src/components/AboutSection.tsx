import { Brain, Code, Heart } from "@phosphor-icons/react"

export function AboutSection() {
  return (
    <section id="apropos" className="py-20 px-6 bg-secondary/30">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            À propos de moi
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Développeur passionné de 23 ans, je crée des solutions numériques 
            qui allient performance technique et expérience utilisateur exceptionnelle.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left - Personal Info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-4">
                Mon parcours
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                En tant que Full-Stack Maker, je m'épanouis dans la création d'expériences 
                numériques complètes, de la conception à la mise en production. Mon approche 
                combine créativité technique et attention minutieuse aux détails.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Âgé de 23 ans, je suis constamment en quête d'innovation, explorant 
                les dernières technologies pour créer des solutions qui font la différence.
              </p>
            </div>

            {/* Age & Location */}
            <div className="flex items-center space-x-8 pt-4">
              <div>
                <span className="text-3xl font-bold text-accent">23</span>
                <p className="text-sm text-muted-foreground">ans</p>
              </div>
              <div>
                <span className="text-3xl font-bold text-accent">3+</span>
                <p className="text-sm text-muted-foreground">années d'expérience</p>
              </div>
            </div>
          </div>

          {/* Right - Skills & Interests */}
          <div className="space-y-6">
            {/* LLM Interest */}
            <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-accent/10 rounded-lg flex-shrink-0">
                  <Brain size={24} className="text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">
                    Passionné par les LLM
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Je m'intéresse particulièrement aux modèles de langage et à leur 
                    intégration dans des applications pratiques pour améliorer l'expérience utilisateur.
                  </p>
                </div>
              </div>
            </div>

            {/* Clean Code */}
            <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-accent/10 rounded-lg flex-shrink-0">
                  <Code size={24} className="text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">
                    Code élégant et performant
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    J'accorde une grande importance à la qualité du code, à l'architecture 
                    propre et aux bonnes pratiques de développement.
                  </p>
                </div>
              </div>
            </div>

            {/* User Experience */}
            <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-accent/10 rounded-lg flex-shrink-0">
                  <Heart size={24} className="text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">
                    Centré sur l'utilisateur
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Chaque projet commence par comprendre les besoins utilisateurs 
                    pour créer des interfaces intuitives et engageantes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-foreground mb-8 text-center">
            Technologies favorites
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "React", "TypeScript", "Vue.js", "Node.js", "PHP", "MySQL", 
              "Tailwind CSS", "Git", "Docker", "Linux"
            ].map((tech, index) => (
              <span
                key={tech}
                className="px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-sm font-medium text-accent hover:bg-accent/20 transition-colors duration-200 cursor-default"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}