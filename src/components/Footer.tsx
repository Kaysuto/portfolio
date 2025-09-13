import { Code, GithubLogo, LinkedinLogo, X } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { ModalPortal } from "@/components/ui/ModalPortal"
import { useModal } from "@/hooks/useModal"

export function Footer() {
  const currentYear = new Date().getFullYear()
  
  // Modal states
  const { isModalOpen: isGithubModalOpen, modalMounted: githubModalMounted, isClosing: isGithubClosing, openModal: openGithubModal, closeModal: closeGithubModal } = useModal()
  const { isModalOpen: isLinkedinModalOpen, modalMounted: linkedinModalMounted, isClosing: isLinkedinClosing, openModal: openLinkedinModal, closeModal: closeLinkedinModal } = useModal()

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
                className="p-2 hover:bg-accent/10 group"
                onClick={openGithubModal}
              >
                <GithubLogo size={18} className="text-muted-foreground hover:text-accent transition-all duration-200 transform-gpu group-hover:rotate-[18deg] group-hover:scale-110" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="p-2 hover:bg-accent/10 group"
                onClick={openLinkedinModal}
              >
                <LinkedinLogo size={18} className="text-muted-foreground hover:text-accent transition-colors duration-200" />
              </Button>
            </div>
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
      <ModalPortal isOpen={githubModalMounted}>
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
              isGithubModalOpen && !isGithubClosing ? 'animate-fadeIn' : 'animate-fadeOut'
            }`} 
            onClick={closeGithubModal} 
          />
          <div
            className={`relative bg-card rounded-2xl w-full max-w-md p-6 shadow-xl border border-border transition-all duration-300 ${
              isGithubModalOpen && !isGithubClosing 
                ? 'animate-modalSlideIn' 
                : 'animate-modalSlideOut'
            }`}
            role="dialog"
            aria-modal="true"
          >
            <button
              aria-label="Fermer"
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-accent/10 transition-colors"
              onClick={closeGithubModal}
            >
              <X size={20} className="text-muted-foreground" />
            </button>
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-accent/10 p-3 rounded-xl">
                <GithubLogo size={24} className="text-accent" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground">GitHub</h3>
                <p className="text-muted-foreground">Mes projets et contributions</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Vous êtes sur le point d'ouvrir ce lien dans un nouvel onglet :
            </p>
            <div className="bg-muted/20 p-4 rounded-lg mb-6 border border-border/50">
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
                Ouvrir le lien
              </Button>
            </div>
          </div>
        </div>
      </ModalPortal>

      {/* LinkedIn Modal */}
      <ModalPortal isOpen={linkedinModalMounted}>
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
              isLinkedinModalOpen && !isLinkedinClosing ? 'animate-fadeIn' : 'animate-fadeOut'
            }`} 
            onClick={closeLinkedinModal} 
          />
          <div
            className={`relative bg-card rounded-2xl w-full max-w-md p-6 shadow-xl border border-border transition-all duration-300 ${
              isLinkedinModalOpen && !isLinkedinClosing 
                ? 'animate-modalSlideIn' 
                : 'animate-modalSlideOut'
            }`}
            role="dialog"
            aria-modal="true"
          >
            <button
              aria-label="Fermer"
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-accent/10 transition-colors"
              onClick={closeLinkedinModal}
            >
              <X size={20} className="text-muted-foreground" />
            </button>
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-accent/10 p-3 rounded-xl">
                <LinkedinLogo size={24} className="text-accent" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground">LinkedIn</h3>
                <p className="text-muted-foreground">Profil professionnel</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Vous êtes sur le point d'ouvrir ce lien dans un nouvel onglet :
            </p>
            <div className="bg-muted/20 p-4 rounded-lg mb-6 border border-border/50">
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
                Ouvrir le lien
              </Button>
            </div>
          </div>
        </div>
      </ModalPortal>
    </footer>
  );
}