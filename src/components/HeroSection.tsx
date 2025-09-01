import { ArrowRight, Download } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  const scrollToProjects = () => {
    const element = document.getElementById("projets")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="accueil" className="min-h-screen flex items-center justify-center px-6 pt-16">
      <div className="max-w-4xl mx-auto text-center">
        {/* Main Title */}
        <div className="animate-fadeInUp">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-foreground">Salut, je suis</span>
            <br />
            <span className="text-accent">Kimiya</span>
          </h1>
        </div>

        {/* Subtitle */}
        <div className="animate-fadeInUp animate-delay-200">
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            Maker Full-Stack passionné par la création d'expériences numériques
            <br className="hidden sm:block" />
            <span className="text-accent font-medium">élégantes et performantes</span>
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="animate-fadeInUp animate-delay-300">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button 
              onClick={scrollToProjects}
              className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 text-lg font-medium group transition-all duration-200"
            >
              Voir mes projets
              <ArrowRight 
                size={20} 
                className="ml-2 group-hover:translate-x-1 transition-transform duration-200" 
              />
            </Button>
            
            <Button 
              variant="outline"
              className="border-accent text-accent hover:bg-accent/10 px-8 py-3 text-lg font-medium group transition-all duration-200"
            >
              <Download 
                size={20} 
                className="mr-2 group-hover:animate-bounce" 
              />
              Télécharger CV
            </Button>
          </div>
        </div>

        {/* Skills Icons */}
        <div className="animate-fadeInUp animate-delay-400">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {/* Frontend */}
            <div className="group cursor-default">
              <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:bg-accent/20 transition-colors duration-300">
                  <div className="w-6 h-6 bg-accent/20 rounded-md"></div>
                </div>
                <h3 className="font-semibold text-lg mb-2 text-foreground">Frontend</h3>
                <p className="text-muted-foreground text-sm">
                  React, Vue.js, TypeScript
                </p>
              </div>
            </div>

            {/* Backend */}
            <div className="group cursor-default">
              <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:bg-accent/20 transition-colors duration-300">
                  <div className="w-6 h-6 bg-accent/30 rounded-full"></div>
                </div>
                <h3 className="font-semibold text-lg mb-2 text-foreground">Backend</h3>
                <p className="text-muted-foreground text-sm">
                  PHP, Node.js, MySQL
                </p>
              </div>
            </div>

            {/* Design */}
            <div className="group cursor-default">
              <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:bg-accent/20 transition-colors duration-300">
                  <div className="w-6 h-6 bg-accent/40 rounded-lg rotate-12"></div>
                </div>
                <h3 className="font-semibold text-lg mb-2 text-foreground">Design</h3>
                <p className="text-muted-foreground text-sm">
                  UI/UX, Design System, Responsive
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}