import { ArrowRight, Download, X } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { ModalPortal } from "@/components/ui/ModalPortal"
import { useModal } from "@/hooks/useModal"
import { useRef, useEffect, useState } from "react"

export function HeroSection() {
  const scrollToProjects = () => {
    const element = document.getElementById("projets")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const { isModalOpen, modalMounted, isClosing, openModal, closeModal } = useModal()
  
  // Ref for modal focus management
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  
  // Auto-focus on modal open
  useEffect(() => {
    if (isModalOpen && closeButtonRef.current) {
      closeButtonRef.current.focus()
    }
  }, [isModalOpen])

  // Animated text state with typing effect
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [isDeleting, setIsDeleting] = useState(false)
  
  const animatedTexts = [
    "code & créativité",
    "réseaux & sécurité",
    "pixels & innovation"
  ]

  // Typing animation effect
  useEffect(() => {
    const currentText = animatedTexts[currentTextIndex]
    const typingSpeed = isDeleting ? 50 : 100 // Faster when deleting
    const pauseTime = 2000 // Pause before starting to delete

    const timeout = setTimeout(() => {
      if (!isDeleting && displayText === currentText) {
        // Finished typing, pause then start deleting
        setTimeout(() => setIsDeleting(true), pauseTime)
      } else if (isDeleting && displayText === "") {
        // Finished deleting, move to next text
        setIsDeleting(false)
        setCurrentTextIndex((prevIndex) => 
          (prevIndex + 1) % animatedTexts.length
        )
      } else {
        // Continue typing or deleting
        setDisplayText(prev => {
          if (isDeleting) {
            return prev.slice(0, -1)
          } else {
            return currentText.slice(0, prev.length + 1)
          }
        })
      }
    }, typingSpeed)

    return () => clearTimeout(timeout)
  }, [displayText, currentTextIndex, isDeleting, animatedTexts])

  return (
    <section id="accueil" className="min-h-screen flex items-center justify-center px-6 pt-32 relative" role="banner" aria-labelledby="hero-title">
      {/* Animated background shapes */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-20 left-10 w-24 h-24 bg-accent/10 rounded-full animate-float-slow animate-delay-700"></div>
        <div className="absolute top-1/3 right-16 w-16 h-16 bg-primary/15 rounded-full animate-float-medium animate-delay-800"></div>
        <div className="absolute bottom-32 left-1/4 w-12 h-12 bg-secondary/20 rounded-full animate-float-fast animate-delay-900"></div>
        <div className="absolute top-1/2 left-8 w-8 h-8 bg-accent/20 rounded-full animate-bounce-slow animate-delay-1000"></div>
        <div className="absolute bottom-1/4 right-20 w-20 h-20 bg-muted/30 rounded-full animate-pulse-slow animate-delay-600"></div>
      </div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Main Title */}
        <div className="animate-fadeInUp">
          <h1 id="hero-title" className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-foreground">Salut, je suis</span>
            <br />
            <span className="text-accent">Kimiya</span>
          </h1>
        </div>

        {/* Subtitle */}
        <div className="animate-fadeInUp animate-delay-200">
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            Passionné par le{" "}
            <span className="text-accent font-medium hover:text-primary transition-all duration-500 ease-in-out">
              {displayText}
              <span className="animate-pulse text-accent">|</span>
            </span>
          </p>
        </div>

        {/* CTA Buttons */}
  <div className="animate-fadeInUp animate-delay-400">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button 
              onClick={scrollToProjects}
              className="bg-accent hover:bg-accent/90 text-[#070201] dark:text-[#221512] hover:text-[#070201] dark:hover:text-[#221512] px-8 py-3 text-lg font-medium group transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent/25"
              aria-describedby="projects-description"
            >
              Voir mes projets
              <ArrowRight 
                size={20} 
                className="ml-2 group-hover:translate-x-1 transition-transform duration-200" 
                aria-hidden="true"
              />
            </Button>
            <span id="projects-description" className="sr-only">Naviguer vers la section des projets</span>
            
            <Button
              variant="outline"
              className="border-accent text-accent hover:bg-accent/10 px-8 py-3 text-lg font-medium group transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent/25"
              onClick={openModal}
              aria-describedby="cv-description"
            >
              <Download size={20} className="mr-2 group-hover:animate-bounce" aria-hidden="true" />
              Télécharger CV
            </Button>
            <span id="cv-description" className="sr-only">Ouvrir la modal pour télécharger le CV</span>
          </div>
        </div>
      </div>
      {/* Modal for CV download */}
      <ModalPortal isOpen={modalMounted}>
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div className={`fixed inset-0 bg-black/40 modal-overlay ${isModalOpen && !isClosing ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={closeModal} />
          <div
            className={`relative bg-card rounded-lg w-[90%] max-w-lg p-6 z-[10000] shadow-lg border border-border modal-panel ${isModalOpen && !isClosing ? 'opacity-100 scale-100 modal-enter' : 'opacity-0 scale-95 modal-exit'}`}
            role="dialog"
            aria-modal="true"
          >
            <button
              ref={closeButtonRef}
              aria-label="Fermer"
              className="absolute top-3 right-3 p-1 rounded-md hover:bg-accent/10"
              onClick={closeModal}
            >
              <X size={18} />
            </button>
            <h3 className="text-lg font-semibold mb-2">Télécharger mon CV</h3>
            <p className="text-sm text-muted-foreground mb-4">Vous pouvez accéder à mon CV en cliquant sur le bouton ci-dessous.</p>
            <div className="flex justify-end">
              <a href="https://www.youtube.com/watch?v=CY5Ii_YAPcw&list=RDCY5Ii_YAPcw&start_radio=1&pp=oAcB" target="_blank" rel="noopener noreferrer" className="inline-block">
                <Button className="bg-accent text-accent-foreground px-4 py-2">Accéder au CV</Button>
              </a>
            </div>
          </div>
        </div>
      </ModalPortal>

      {/* Curseur animé - Version Desktop */}
      <ModalPortal isOpen={modalMounted}>
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div className={`fixed inset-0 bg-black/40 modal-overlay ${isModalOpen && !isClosing ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={closeModal} />
          <div
            className={`relative bg-card rounded-lg w-[90%] max-w-lg p-6 z-[10000] shadow-lg border border-border modal-panel ${isModalOpen && !isClosing ? 'opacity-100 scale-100 modal-enter' : 'opacity-0 scale-95 modal-exit'}`}
            role="dialog"
            aria-modal="true"
          >
            <button
              aria-label="Fermer"
              className="absolute top-3 right-3 p-1 rounded-md hover:bg-accent/10"
              onClick={closeModal}
            >
              <X size={18} />
            </button>
            <h3 className="text-lg font-semibold mb-2">Télécharger mon CV</h3>
            <p className="text-sm text-muted-foreground mb-4">Vous pouvez accéder à mon CV en cliquant sur le bouton ci-dessous.</p>
            <div className="flex justify-end">
              <a href="https://www.youtube.com/watch?v=CY5Ii_YAPcw&list=RDCY5Ii_YAPcw&start_radio=1&pp=oAcB" target="_blank" rel="noopener noreferrer" className="inline-block">
                <Button className="bg-accent text-accent-foreground px-4 py-2">Accéder au CV</Button>
              </a>
            </div>
          </div>
        </div>
      </ModalPortal>

      {/* Curseur animé - Version Desktop */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 bottom-8 flex-col items-center z-20 animate-fadeInUp animate-delay-700 select-none cursor-pointer group" onClick={scrollToProjects} tabIndex={0} aria-label="Voir la suite">
        <span className="flex flex-col items-center">
          <svg className="w-9 h-14 text-accent" viewBox="0 0 36 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="2" width="32" height="52" rx="16" stroke="currentColor" strokeWidth="3" fill="none"/>
            <rect x="15" y="10" width="6" height="12" rx="3" fill="currentColor">
              <animate attributeName="y" values="10;30;10" keyTimes="0;0.7;1" dur="1.4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="1;1;0;0;1" keyTimes="0;0.6;0.7;0.9;1" dur="1.4s" repeatCount="indefinite" />
            </rect>
          </svg>
        </span>
      </div>

      {/* Curseur animé - Version Mobile */}
      <div className="flex md:hidden absolute left-1/2 -translate-x-1/2 bottom-8 flex-col items-center z-20 animate-fadeInUp animate-delay-700 select-none cursor-pointer group" onClick={scrollToProjects} tabIndex={0} aria-label="Voir la suite">
        <span className="flex flex-col items-center">
          {/* Flèche mobile avec doigt stylisé */}
          <svg className="w-8 h-12 text-accent animate-pulse-slow" viewBox="0 0 32 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Corps du doigt */}
            <ellipse cx="16" cy="35" rx="8" ry="10" fill="currentColor" opacity="0.8"/>
            {/* Phalange supérieure */}
            <ellipse cx="16" cy="25" rx="6" ry="8" fill="currentColor"/>
            {/* Phalange moyenne */}
            <ellipse cx="16" cy="15" rx="5" ry="6" fill="currentColor"/>
            {/* Phalange supérieure */}
            <ellipse cx="16" cy="8" rx="4" ry="5" fill="currentColor"/>
            {/* Ongle */}
            <ellipse cx="16" cy="3" rx="3" ry="3" fill="currentColor" opacity="0.9"/>

            {/* Animation de glissement vers le bas - plus subtile */}
            <g className="animate-bounce" style={{animationDuration: '2s'}}>
              <path d="M12 42 L16 46 L20 42" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
            </g>
          </svg>
        </span>
      </div>
    </section>
  )
}