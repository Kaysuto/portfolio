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
    <section id="accueil" className="min-h-screen flex items-center justify-center px-6 pt-32 relative">
      {/* Animated background shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-24 h-24 bg-accent/10 rounded-full animate-float-slow animate-delay-700"></div>
        <div className="absolute top-1/3 right-16 w-16 h-16 bg-primary/15 rounded-full animate-float-medium animate-delay-800"></div>
        <div className="absolute bottom-32 left-1/4 w-12 h-12 bg-secondary/20 rounded-full animate-float-fast animate-delay-900"></div>
        <div className="absolute top-1/2 left-8 w-8 h-8 bg-accent/20 rounded-full animate-bounce-slow animate-delay-1000"></div>
        <div className="absolute bottom-1/4 right-20 w-20 h-20 bg-muted/30 rounded-full animate-pulse-slow animate-delay-600"></div>
      </div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
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
            Full-Stack Maker passionné par la création d'expériences numériques{" "}
            <br className="hidden sm:block" />
            <span className="text-accent font-medium hover:text-primary transition-colors duration-300">élégantes et performantes</span>
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="animate-fadeInUp animate-delay-400">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button 
              onClick={scrollToProjects}
              className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 text-lg font-medium group transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent/25"
            >
              Voir mes projets
              <ArrowRight 
                size={20} 
                className="ml-2 group-hover:translate-x-1 transition-transform duration-200" 
              />
            </Button>
            
            <Button 
              variant="outline"
              className="border-accent text-accent hover:bg-accent/10 px-8 py-3 text-lg font-medium group transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent/25"
            >
              <Download 
                size={20} 
                className="mr-2 group-hover:animate-bounce" 
              />
              Télécharger CV
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}