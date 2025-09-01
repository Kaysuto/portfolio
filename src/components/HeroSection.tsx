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
    <section id="accueil" className="min-h-screen flex items-center justify-center px-6 pt-32">
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
            Maker Full-Stack passionné par la création d'expériences numériques{" "}
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


      </div>
    </section>
  )
}