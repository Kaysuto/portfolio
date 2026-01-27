import { motion, AnimatePresence, Variants } from "framer-motion"
import { ArrowRight, Download, MousePointer2, Sparkles, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CVModal } from "@/components/ui/CVModal"
import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "@/hooks/use-theme"

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
}

const itemVariants: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
}

export function HeroSection() {
  const { theme } = useTheme()
  const [showModal, setShowModal] = useState(false)
  const cvUrl = "https://www.youtube.com/watch?v=CY5Ii_YAPcw&list=RDCY5Ii_YAPcw&start_radio=1&pp=oAcB"

  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  
  const animatedTexts = [
    "code & créativité",
    "réseaux & sécurité",
    "pixels & innovation"
  ]

  useEffect(() => {
    const currentText = animatedTexts[currentTextIndex]
    const typingSpeed = isDeleting ? 40 : 80
    const pauseTime = 2000

    const timeout = setTimeout(() => {
      if (!isDeleting && displayText === currentText) {
        setTimeout(() => setIsDeleting(true), pauseTime)
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false)
        setCurrentTextIndex((prev) => (prev + 1) % animatedTexts.length)
      } else {
        setDisplayText(prev => isDeleting ? prev.slice(0, -1) : currentText.slice(0, prev.length + 1))
      }
    }, typingSpeed)

    return () => clearTimeout(timeout)
  }, [displayText, currentTextIndex, isDeleting])

  const scrollToProjects = () => {
    const element = document.getElementById("projets")
    element?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="accueil" className="min-h-screen flex items-center justify-center px-6 pt-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -top-24 -left-24 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.05, 0.15, 0.05]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 -right-24 w-80 h-80 bg-primary/20 rounded-full blur-3xl"
        />
      </div>
      
      <motion.div 
        className="max-w-5xl mx-auto text-center relative z-10"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Main Title */}
        <motion.div variants={itemVariants}>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight leading-tight">
            <span className="text-foreground">Salut, je suis</span>
            <br />
            <span className="text-accent relative inline-block">
              Kimiya
              <motion.div 
                className="absolute -bottom-2 left-0 w-full h-2 bg-accent/20 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 1, duration: 0.8 }}
              />
            </span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.div variants={itemVariants}>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 font-medium tracking-tight">
            Passionné par le{" "}
            <span 
              className="font-bold relative inline-block min-w-[280px] text-left cursor-default group/text"
              style={{ color: theme === 'dark' ? '#D3C0B1' : '#C49D84' }}
            >
              {displayText}
              <motion.span 
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-1 h-8 ml-1 align-middle"
                style={{ backgroundColor: theme === 'dark' ? '#D3C0B1' : '#C49D84' }}
              />
            </span>
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button 
            onClick={scrollToProjects}
            size="lg"
            className="h-16 px-10 rounded-2xl hover:opacity-90 text-lg font-bold shadow-xl transition-all hover:scale-105 group"
            style={{ 
              backgroundColor: theme === 'dark' ? '#D3C0B1' : '#C49D84', 
              color: 'black' 
            }}
          >
            Voir mes projets
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="outline"
              size="lg"
              onClick={() => setShowModal(true)}
              className="h-16 px-10 rounded-2xl border-2 text-lg font-bold flex items-center gap-3 transition-all shadow-lg group"
              style={{ 
                borderColor: theme === 'dark' ? '#D3C0B1' : '#C49D84', 
                color: theme === 'dark' ? '#D3C0B1' : '#C49D84' 
              }}
            >
              <Download className="w-6 h-6 group-hover:animate-bounce" />
              Télécharger CV
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer group"
        onClick={scrollToProjects}
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground group-hover:text-accent transition-colors">Scroll</span>
        <div className="w-6 h-10 border-2 border-accent/30 rounded-full flex justify-center p-1.5">
          <motion.div 
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-2 bg-accent rounded-full"
          />
        </div>
      </motion.div>

      <CVModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        cvUrl={cvUrl}
      />
    </section>
  )
}
