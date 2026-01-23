import { ArrowRight, Download } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { CVModal } from "@/components/ui/CVModal"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function HeroSection() {
  const scrollToProjects = () => {
    const element = document.getElementById("projets")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const [showModal, setShowModal] = useState(false)
  const openModal = () => setShowModal(true)
  const closeModal = () => setShowModal(false)

  const cvUrl = "https://www.youtube.com/watch?v=CY5Ii_YAPcw&list=RDCY5Ii_YAPcw&start_radio=1&pp=oAcB"

  const animatedTexts = [
    "code & créativité",
    "réseaux & sécurité",
    "pixels & innovation"
  ]

  const [index, setIndex] = useState(0)

  return (
    <section id="accueil" className="min-h-screen flex items-center justify-center px-6 pt-32 relative overflow-hidden" role="banner" aria-labelledby="hero-title">
      {/* Background Elements with Framer Motion */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {[
          { color: "bg-accent/10", size: "w-24 h-24", top: "20%", left: "10%", delay: 0 },
          { color: "bg-primary/15", size: "w-16 h-16", top: "33%", right: "16%", delay: 0.5 },
          { color: "bg-secondary/20", size: "w-12 h-12", bottom: "32%", left: "25%", delay: 1 },
        ].map((blob, i) => (
          <motion.div
            key={i}
            className={`absolute ${blob.color} ${blob.size} rounded-full blur-xl`}
            style={{ top: blob.top, left: blob.left, right: blob.right, bottom: blob.bottom }}
            animate={{
              y: [0, -20, 0],
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              delay: blob.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 id="hero-title" className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            <span className="text-foreground">Salut, je suis</span>
            <br />
            <motion.span 
              className="text-accent inline-block"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Kimiya
            </motion.span>
          </h1>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed h-[1.5em]"
        >
          Passionné par le{" "}
          <span className="text-accent font-medium relative inline-block min-w-[200px]">
            <AnimatePresence mode="wait">
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                onAnimationComplete={() => {
                  setTimeout(() => {
                    setIndex((prev) => (prev + 1) % animatedTexts.length)
                  }, 2000)
                }}
              >
                {animatedTexts[index]}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <Button 
            onClick={scrollToProjects}
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-lg font-medium group transition-all duration-300"
          >
            Voir mes projets
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight size={20} className="ml-2" />
            </motion.span>
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            className="border-accent text-accent hover:bg-accent/10 px-8 py-6 text-lg font-medium group transition-all duration-300"
            onClick={openModal}
          >
            <Download size={20} className="mr-2 group-hover:animate-bounce" />
            Télécharger CV
          </Button>
        </motion.div>
      </div>

      <CVModal isOpen={showModal} onClose={closeModal} cvUrl={cvUrl} />

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        onClick={scrollToProjects}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-accent rounded-full flex justify-center p-1"
        >
          <motion.div className="w-1 h-2 bg-accent rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}
