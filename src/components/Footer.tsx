import { Code, GithubLogo, LinkedinLogo, X } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { useModal } from "@/hooks/useModal"
import { Modal } from "@/components/ui/Modal"
import { useState, useEffect } from "react"

export function Footer() {
  const currentYear = new Date().getFullYear()
  
  // Modal states
  const { isModalOpen: isGithubModalOpen, modalMounted: githubModalMounted, openModal: openGithubModal, closeModal: closeGithubModal } = useModal()
  const { isModalOpen: isLinkedinModalOpen, modalMounted: linkedinModalMounted, openModal: openLinkedinModal, closeModal: closeLinkedinModal } = useModal()

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
                onClick={openGithubModal}
              >
                <GithubLogo size={20} className="text-muted-foreground group-hover:text-accent transition-all duration-300 group-hover:rotate-12 group-hover:scale-110" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="p-3 hover:bg-accent/10 group transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-accent/20"
                onClick={openLinkedinModal}
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

      {/* GitHub Modal */}
      <Modal
        isOpen={githubModalMounted}
        onClose={closeGithubModal}
        title="GitHub"
        size="md"
      >
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className="bg-accent/10 p-3 rounded-xl">
              <GithubLogo size={24} className="text-accent" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Mes projets et contributions</h3>
              <p className="text-muted-foreground text-sm">Découvrez mon profil GitHub</p>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground">
            Vous êtes sur le point d'ouvrir ce lien dans un nouvel onglet :
          </p>
          
          <div className="bg-muted/20 p-4 rounded-lg border border-border/50">
            <code className="text-sm text-foreground break-all font-mono">
              https://github.com/Kaysuto
            </code>
          </div>
          
          <div className="flex justify-end space-x-3">
            <Button 
              variant="outline" 
              onClick={closeGithubModal}
              className="hover:bg-accent/10"
            >
              Annuler
            </Button>
            <Button 
              onClick={() => {
                window.open("https://github.com/Kaysuto", "_blank", "noopener,noreferrer")
                closeGithubModal()
              }}
              className="bg-accent text-[#070201] dark:text-[#221512] hover:bg-accent/90 hover:text-[#070201] dark:hover:text-[#221512]"
            >
              <GithubLogo className="w-4 h-4 mr-2" />
              Ouvrir GitHub
            </Button>
          </div>
        </div>
      </Modal>

      {/* LinkedIn Modal */}
      <Modal
        isOpen={linkedinModalMounted}
        onClose={closeLinkedinModal}
        title="LinkedIn"
        size="md"
      >
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className="bg-accent/10 p-3 rounded-xl">
              <LinkedinLogo size={24} className="text-accent" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Profil professionnel</h3>
              <p className="text-muted-foreground text-sm">Connectons-nous sur LinkedIn</p>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground">
            Vous êtes sur le point d'ouvrir ce lien dans un nouvel onglet :
          </p>
          
          <div className="bg-muted/20 p-4 rounded-lg border border-border/50">
            <code className="text-sm text-foreground break-all font-mono">
              https://www.linkedin.com/in/enzo-lauret/
            </code>
          </div>
          
          <div className="flex justify-end space-x-3">
            <Button 
              variant="outline" 
              onClick={closeLinkedinModal}
              className="hover:bg-accent/10"
            >
              Annuler
            </Button>
            <Button 
              onClick={() => {
                window.open("https://www.linkedin.com/in/enzo-lauret/", "_blank", "noopener,noreferrer")
                closeLinkedinModal()
              }}
              className="bg-accent text-[#070201] dark:text-[#221512] hover:bg-accent/90 hover:text-[#070201] dark:hover:text-[#221512]"
            >
              <LinkedinLogo className="w-4 h-4 mr-2" />
              Ouvrir LinkedIn
            </Button>
          </div>
        </div>
      </Modal>
    </footer>
  );
}