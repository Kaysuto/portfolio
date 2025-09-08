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
  const [showModalPanel, setShowModalPanel] = useState(false)

  // Gère le fade-out : garde le panel monté pendant la fermeture
  useEffect(() => {
    if (isModalOpen) {
      setShowModalPanel(true)
    } else if (isClosing) {
      const timeout = setTimeout(() => setShowModalPanel(false), 300)
      return () => clearTimeout(timeout)
    } else {
      setShowModalPanel(false)
    }
  }, [isModalOpen, isClosing])
  
  // Ref for modal focus management
  const modalRef = useRef<HTMLDivElement>(null)

  // Close modal with Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal()
    }
    if (isModalOpen) {
      document.addEventListener("keydown", handleEscape)
      return () => document.removeEventListener("keydown", handleEscape)
    }
  }, [isModalOpen, closeModal])

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
        setCurrentTextIndex((prev) => (prev + 1) % animatedTexts.length)
      } else {
        // Continue typing or deleting
        setDisplayText((prev) => {
          if (isDeleting) {
            return prev.slice(0, -1)
          } else {
            return currentText.slice(0, prev.length + 1)
          }
        })
      }
    }, typingSpeed)

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, currentTextIndex, animatedTexts])

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
          <h1 id="hero-title" className="text-5xl md:text-7xl font-bold text-foreground mb-6">
            Kimiya <span className="text-accent">Suhrabi</span>
          </h1>
          <p className="text-2xl md:text-3xl text-muted-foreground mb-8 font-light">
            Développeur <span className="text-primary font-medium">Full-Stack</span> & Étudiant en Cybersécurité
          </p>
        </div>

        {/* Animated Description */}
        <div className="animate-fadeInUp animate-delay-200">
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            Passionné par le{" "}
            <span className="text-accent font-medium hover:text-primary transition-all duration-500 ease-in-out">
              {displayText}
              <span className="animate-pulse text-accent">|</span>
            </span>
          </p>
        </div>

        {/* Modal for CV download */}
        {modalMounted && showModalPanel && (
          <ModalPortal isOpen={modalMounted && showModalPanel}>
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
              <div className={`fixed inset-0 bg-black/40 modal-overlay ${isModalOpen && !isClosing ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={closeModal} />
              <div
                ref={modalRef}
                className={`bg-background border border-border rounded-lg p-6 w-full max-w-md relative z-10 transition-opacity duration-300 ${isModalOpen && !isClosing ? 'opacity-100' : 'opacity-0'}`}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
                tabIndex={-1}
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                      <Download className="w-4 h-4 text-accent" />
                    </div>
                    <h2 id="modal-title" className="text-lg font-semibold text-foreground">
                      Télécharger mon CV
                    </h2>
                  </div>
                  <button
                    onClick={closeModal}
                    className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-sm hover:bg-muted"
                    aria-label="Fermer la modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="mb-6">
                  <p className="text-muted-foreground mb-4">
                    Téléchargez mon CV complet pour découvrir mon parcours, mes compétences et mes expériences.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Document PDF • Dernière mise à jour: Décembre 2024</span>
                  </div>
                </div>

                {/* Modal Actions */}
                <div className="flex gap-3 justify-end">
                  <Button
                    variant="outline"
                    onClick={closeModal}
                    className="border-border text-muted-foreground hover:text-foreground hover:bg-muted px-4 py-2"
                  >
                    Annuler
                  </Button>
                  <a href="/CV_Kimiya_Suhrabi.pdf" download className="inline-block">
                    <Button className="bg-accent text-[#070201] dark:text-[#221512] hover:bg-accent/90 hover:text-[#070201] dark:hover:text-[#221512] px-4 py-2">
                      Ouvrir le lien
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </ModalPortal>
        )}

        {/* Action Buttons */}
        <div className="animate-fadeInUp animate-delay-400 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={openModal}
            className="bg-accent text-[#070201] dark:text-[#221512] hover:bg-accent/90 hover:text-[#070201] dark:hover:text-[#221512] text-lg px-8 py-3 h-auto font-medium transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-xl group"
          >
            <Download className="mr-2 h-5 w-5 group-hover:animate-bounce" />
            Télécharger mon CV
          </Button>
          <Button
            variant="outline"
            onClick={scrollToProjects}
            className="border-accent text-accent hover:bg-accent hover:text-[#070201] dark:hover:text-[#221512] text-lg px-8 py-3 h-auto font-medium transition-all duration-300 ease-in-out transform hover:scale-105 group"
          >
            Voir mes projets
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>

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
          <svg className="w-8 h-12 text-accent" viewBox="0 0 32 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="2" width="28" height="44" rx="14" stroke="currentColor" strokeWidth="2.5" fill="none"/>
            {/* Doigt avec animation */}
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
  );
}
