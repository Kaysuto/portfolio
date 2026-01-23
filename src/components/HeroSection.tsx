import { ArrowRight, Download, Github, Linkedin, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CVModal } from "@/components/ui/CVModal"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function HeroSection() {
  const scrollToProjects = () => {
    document.getElementById("projets")?.scrollIntoView({ behavior: "smooth" })
  }

  const [showModal, setShowModal] = useState(false)
  const cvUrl = "https://www.youtube.com/watch?v=CY5Ii_YAPcw&list=RDCY5Ii_YAPcw&start_radio=1&pp=oAcB"

  const animatedTexts = [
    "Full-Stack Maker",
    "UI/UX Designer", 
    "Cybersecurity Enthusiast"
  ]
  const [textIndex, setTextIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % animatedTexts.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="accueil" className="min-h-screen flex items-center justify-center px-6 pt-20 relative overflow-hidden noise-bg">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(166,139,124,0.05),transparent_70%)]" />
      
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
            <motion.span 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 px-4 py-2 bg-secondary mb-8 rounded-2xl border-2 border-foreground/10"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground">
                Système Opérationnel / Disponible
              </span>
            </motion.span>
          
          {/* Main Title - Studio Style */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tighter leading-[0.9] uppercase italic">
            Digital <br />
            <span className="text-primary">Architect</span>
          </h1>

          {/* Animated Role */}
          <div className="h-8 mb-6 overflow-hidden border-l-4 border-primary pl-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={textIndex}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 20, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-xl md:text-2xl text-foreground font-black uppercase tracking-tighter italic"
              >
                {animatedTexts[textIndex]}
              </motion.div>
            </AnimatePresence>
          </div>

          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-lg leading-relaxed font-medium italic">
            "Je suis <span className="text-foreground font-black not-italic">Kimiya</span>. 
            Je transforme des concepts abstraits en réalités numériques tangibles."
          </p>

          {/* CTA Buttons - Studio Style */}
          <div className="flex flex-wrap gap-4 mb-12">
            <Button 
              onClick={scrollToProjects}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 h-14 text-base font-black rounded-xl shadow-lg shadow-primary/20 transition-all uppercase italic tracking-tighter"
            >
              Voir les travaux
              <ArrowRight size={20} className="ml-2" />
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="bg-card hover:bg-secondary text-foreground px-8 h-14 text-base font-black rounded-xl border-2 border-foreground/10 transition-all uppercase italic tracking-tighter"
              onClick={() => setShowModal(true)}
            >
              <Download size={20} className="mr-2" />
              Curriculum
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">
              Connect
            </span>
            <div className="h-1 w-12 bg-primary rounded-full" />
            <div className="flex gap-4">
              <a 
                href="https://github.com/Kaysuto" 
                target="_blank"
                rel="noreferrer"
                className="p-3 bg-card rounded-xl border-2 border-foreground/10 hover:border-primary hover:text-primary transition-all"
              >
                <Github size={24} />
              </a>
              <a 
                href="#" 
                className="p-3 bg-card rounded-xl border-2 border-foreground/10 hover:border-primary hover:text-primary transition-all"
              >
                <Linkedin size={24} />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Visual Element - Studio Style */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative hidden lg:block"
        >
          <div className="relative z-10 w-full aspect-square p-8">
            {/* Main Frame */}
            <div className="bg-card rounded-[2.5rem] border-2 border-foreground/10 w-full h-full p-4 relative overflow-hidden group shadow-2xl">
              <div className="absolute inset-0 bg-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              {/* Initials - Pixel Style */}
              <div className="h-full w-full border-2 border-foreground/5 rounded-[2rem] flex items-center justify-center relative">
                <img 
                  src="https://i.imgur.com/tDPPBl1.png" 
                  alt="Kaysuto Kimiya Logo" 
                  className="w-48 h-48 object-contain drop-shadow-2xl"
                />
              </div>
            </div>
            
            {/* Floating Stats - Studio Style */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 bg-primary text-primary-foreground p-6 rounded-3xl shadow-xl z-20"
            >
              <div className="text-center">
                <p className="text-4xl font-black leading-none mb-1">24+</p>
                <p className="text-[8px] uppercase tracking-widest font-bold">Completed</p>
              </div>
            </motion.div>

            {/* Floating Tech - Studio Style */}
            <motion.div 
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-4 -left-4 bg-card p-6 rounded-3xl border-2 border-foreground/10 shadow-xl z-20"
            >
              <div className="flex gap-4">
                {["⚛️", "🛠️", "🎨"].map((emoji, i) => (
                  <span key={i} className="text-2xl grayscale hover:grayscale-0 transition-all cursor-default">
                    {emoji}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <CVModal isOpen={showModal} onClose={() => setShowModal(false)} cvUrl={cvUrl} />
    </section>
  )
}
