import { ArrowRight, Download, X } from "@phosphor-icons/react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  const scrollToProjects = () => {
    const element = document.getElementById("projets")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMounted, setModalMounted] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  const openModal = () => {
    setIsClosing(false)
    setModalMounted(true)
    // allow mount then trigger visible state to run transition
    setTimeout(() => setIsModalOpen(true), 10)
  }

  const closeModal = () => {
    setIsClosing(true)
    setIsModalOpen(false)
    // wait for animation to finish then unmount
    setTimeout(() => {
      setModalMounted(false)
      setIsClosing(false)
    }, 220)
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsModalOpen(false)
    }
    if (isModalOpen) document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [isModalOpen])

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
            Full-Stack Maker polyvalent, expert en{" "}
            <br className="hidden sm:block" />
            <span className="text-accent font-medium hover:text-primary transition-colors duration-300">réseau, développement, pixel art et plus encore</span>
          </p>
        </div>

        {/* CTA Buttons */}
  <div className="animate-fadeInUp animate-delay-400">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button 
              onClick={scrollToProjects}
              className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 text-lg font-medium group transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent/25"
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
      {modalMounted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className={`absolute inset-0 bg-black/40 modal-overlay ${isModalOpen && !isClosing ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={closeModal} />
          <div
            className={`relative bg-card rounded-lg w-[90%] max-w-lg p-6 z-50 shadow-lg border border-border modal-panel ${isModalOpen && !isClosing ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
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
            <p className="text-sm text-muted-foreground mb-4">Vous pouvez télécharger mon CV en cliquant sur le bouton ci-dessous.</p>
            <div className="flex justify-end">
              <a href="/assets/Kimiya_CV.pdf" target="_blank" rel="noopener noreferrer" className="inline-block">
                <Button className="bg-accent text-accent-foreground px-4 py-2">Télécharger</Button>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Curseur animé bas */}
      {/* Curseur souris animé bas */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-8 flex flex-col items-center z-20 animate-fadeInUp animate-delay-700 select-none cursor-pointer group" onClick={scrollToProjects} tabIndex={0} aria-label="Voir la suite">
        <span className="flex flex-col items-center">
          <svg className="w-9 h-14 text-accent" viewBox="0 0 36 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="2" width="32" height="52" rx="16" stroke="currentColor" strokeWidth="3" fill="none" className="animate-mouse-outline"/>
            <rect x="15" y="10" width="6" height="12" rx="3" fill="currentColor">
              <animate attributeName="y" values="10;30;10" keyTimes="0;0.7;1" dur="1.4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="1;1;0;0;1" keyTimes="0;0.6;0.7;0.9;1" dur="1.4s" repeatCount="indefinite" />
            </rect>
          </svg>
        </span>
      </div>
    </section>
  )
}