import { Code, GithubLogo, LinkedinLogo, X } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { GitHubFooterModal, LinkedInFooterModal } from "./ui/SocialModals"
import { useState, useEffect } from "react"

export function Footer() {
  const currentYear = new Date().getFullYear()
  
  // Modal states
  const [isGithubModalOpen, setIsGithubModalOpen] = useState(false)
  const [isLinkedinModalOpen, setIsLinkedinModalOpen] = useState(false)

  return (
    <footer className="bg-card border-t border-border py-12 px-6 animate-fadeInUp">
      <div className="max-w-6xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4 animate-slideInFromLeft animate-delay-100">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-accent/10 rounded-lg">
                <Code size={20} className="text-accent" />
              </div>
              <div>
                <span className="font-medium text-foreground">Kaysuto</span>
                <span className="text-muted-foreground ml-1">Kimiya</span>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Full-Stack Maker polyvalent spécialisé en réseau, développement, 
              design pixel art et création de mini-jeux. Toujours en quête d'innovation et de nouveaux défis.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 animate-fadeInUp animate-delay-200">
            <h4 className="font-semibold text-foreground">Navigation</h4>
            <div className="space-y-2">
              <button
                onClick={() => {
                  const element = document.getElementById("accueil")
                  element?.scrollIntoView({ behavior: "smooth" })
                }}
                className="block text-muted-foreground hover:text-accent transition-all duration-200 text-sm"
              >
                Accueil
              </button>
              <button
                onClick={() => {
                  const element = document.getElementById("apropos")
                  element?.scrollIntoView({ behavior: "smooth" })
                }}
                className="block text-muted-foreground hover:text-accent transition-all duration-200 text-sm"
              >
                À propos
              </button>
              <button
                onClick={() => {
                  const element = document.getElementById("projets")
                  element?.scrollIntoView({ behavior: "smooth" })
                }}
                className="block text-muted-foreground hover:text-accent transition-all duration-200 text-sm"
              >
                Projets
              </button>
              <button
                onClick={() => {
                  const element = document.getElementById("contact")
                  element?.scrollIntoView({ behavior: "smooth" })
                }}
                className="block text-muted-foreground hover:text-accent transition-all duration-200 text-sm"
              >
                Contact
              </button>
            </div>
          </div>

          {/* Social Networks */}
          <div className="space-y-4 animate-slideInFromRight animate-delay-300">
            <h4 className="font-semibold text-foreground">Réseaux</h4>
            <div className="flex space-x-3">
              <Button
                variant="ghost"
                size="sm"
                className="p-3 hover:bg-accent/10 group transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-accent/20"
                onClick={() => setIsGithubModalOpen(true)}
              >
                <GithubLogo size={20} className="text-muted-foreground group-hover:text-accent transition-all duration-300 group-hover:rotate-12 group-hover:scale-110" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="p-3 hover:bg-accent/10 group transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-accent/20"
                onClick={() => setIsLinkedinModalOpen(true)}
              >
                <LinkedinLogo size={20} className="text-muted-foreground group-hover:text-accent transition-all duration-300 group-hover:scale-110" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Retrouvez mes projets sur GitHub et connectons-nous sur LinkedIn pour échanger sur nos expériences professionnelles.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border animate-fadeInUp animate-delay-400">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>© {currentYear} Kimiya</span>
            </div>
            
            <div className="flex items-center space-x-3 text-xs text-muted-foreground">
              <span>Full-Stack</span>
              <span>•</span>
              <span>Passionné LLM</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modaux pour les réseaux sociaux */}
      <GitHubFooterModal 
        isOpen={isGithubModalOpen} 
        onClose={() => setIsGithubModalOpen(false)} 
      />
      <LinkedInFooterModal 
        isOpen={isLinkedinModalOpen} 
        onClose={() => setIsLinkedinModalOpen(false)} 
      />
    </footer>
  );
}