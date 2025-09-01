import { EnvelopeSimple, LinkedinLogo, GithubLogo, TwitterLogo } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function ContactSection() {
  const handleEmailClick = () => {
    window.location.href = "mailto:contact@kimiya.pro"
  }

  return (
    <section id="contact" className="py-20 px-6 bg-secondary/30">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Restons en contact
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Vous avez un projet en tête ou simplement envie d'échanger ? 
            N'hésitez pas à me contacter, je serais ravi de discuter avec vous.
          </p>
        </div>

        {/* Main Contact Card */}
        <div className="mb-12">
          <Card className="bg-card border border-border hover:shadow-lg hover:shadow-accent/5 transition-all duration-300">
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <EnvelopeSimple size={32} className="text-accent" />
              </div>
              
              <h3 className="text-2xl font-semibold text-foreground mb-4">
                Envoyez-moi un message
              </h3>
              
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Pour toute collaboration, projet ou simple discussion autour de la tech, 
                mon inbox vous est ouvert !
              </p>

              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-3 mb-6">
                  <span className="text-lg font-medium text-foreground">
                    contact@kimiya.pro
                  </span>
                </div>

                <Button
                  onClick={handleEmailClick}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 text-lg font-medium group transition-all duration-200"
                >
                  <EnvelopeSimple 
                    size={20} 
                    className="mr-2 group-hover:scale-110 transition-transform duration-200" 
                  />
                  M'envoyer un email
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Alternative Contact Methods */}
        <div className="text-center">
          <p className="text-muted-foreground mb-6">
            Ou retrouvez-moi sur les réseaux
          </p>
          
          <div className="flex justify-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              className="border-border hover:border-accent hover:bg-accent/10 group"
              onClick={() => window.open("https://github.com/Kaysuto", "_blank")}
            >
              <GithubLogo 
                size={18} 
                className="text-muted-foreground group-hover:text-accent transition-colors duration-200" 
              />
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="border-border hover:border-accent hover:bg-accent/10 group"
              onClick={() => window.open("https://linkedin.com/in/kimiya", "_blank")}
            >
              <LinkedinLogo 
                size={18} 
                className="text-muted-foreground group-hover:text-accent transition-colors duration-200" 
              />
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="border-border hover:border-accent hover:bg-accent/10 group"
              onClick={() => window.open("https://twitter.com/kimiya", "_blank")}
            >
              <TwitterLogo 
                size={18} 
                className="text-muted-foreground group-hover:text-accent transition-colors duration-200" 
              />
            </Button>
          </div>
        </div>

        {/* Availability Status */}
        <div className="mt-12">
          <Card className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
            <div className="p-6 text-center">
              <div className="flex items-center justify-center space-x-3 mb-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-semibold text-green-800 dark:text-green-200">
                  Disponible pour de nouveaux projets
                </span>
              </div>
              <p className="text-green-700 dark:text-green-300 text-sm">
                Je suis actuellement ouvert à de nouvelles opportunités et collaborations passionnantes.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}