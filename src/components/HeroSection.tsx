import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useTheme } from "@/hooks/use-theme"
import { fadeInUp, staggerContainer, EASE_OUT } from "@/lib/animations"

const ANIMATED_TEXTS = [
  "code & créativité",
  "réseaux & sécurité",
  "pixels & innovation",
]

export function HeroSection() {
  const { theme } = useTheme()
  const navigate = useNavigate()

  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  const accentColor = theme === "dark" ? "#D3C0B1" : "#C49D84"

  useEffect(() => {
    const currentText = ANIMATED_TEXTS[currentTextIndex]
    const typingSpeed = isDeleting ? 30 : 60

    const timeout = setTimeout(() => {
      if (!isDeleting && displayText === currentText) {
        setTimeout(() => setIsDeleting(true), 2000)
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false)
        setCurrentTextIndex((prev) => (prev + 1) % ANIMATED_TEXTS.length)
      } else {
        setDisplayText((prev) =>
          isDeleting ? prev.slice(0, -1) : currentText.slice(0, prev.length + 1)
        )
      }
    }, typingSpeed)

    return () => clearTimeout(timeout)
  }, [displayText, currentTextIndex, isDeleting])

  const scrollToProjects = () => {
    document.getElementById("projets")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      id="accueil"
      className="min-h-screen flex items-center justify-center px-6 pt-20 relative overflow-hidden"
    >
      {/* Dot grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle, var(--border) 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      {/* Glow orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -top-24 -left-24 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 -right-24 w-80 h-80 bg-primary/20 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        className="max-w-5xl mx-auto text-center relative z-10"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        {/* Main Title */}
        <motion.div variants={fadeInUp}>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
            <span className="text-foreground">Salut, je suis</span>
            <br />
            <span className="relative inline-block" style={{ color: accentColor }}>
              Kimiya
              <motion.div
                className="absolute -bottom-2 left-0 h-2 rounded-full"
                style={{ backgroundColor: `${accentColor}33` }}
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.8, duration: 0.8, ease: EASE_OUT }}
              />
            </span>
          </h1>
        </motion.div>

        {/* Animated subtitle */}
        <motion.div variants={fadeInUp}>
          <div className="text-lg md:text-xl text-muted-foreground mb-16 font-medium tracking-tight flex flex-col items-center justify-center">
            <p>
              Passionné par le{" "}
              <span className="font-bold inline-block" style={{ color: accentColor }}>
                {displayText}
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="inline-block w-[3px] h-5 ml-0.5 align-middle rounded-full"
                  style={{ backgroundColor: accentColor }}
                />
              </span>
            </p>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <div className="flex flex-row gap-4 justify-center items-center flex-wrap">
          <motion.div variants={fadeInUp}>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                onClick={scrollToProjects}
                size="lg"
                className="h-11 px-5 text-sm sm:h-14 sm:px-8 sm:text-lg rounded-2xl font-bold shadow-xl transition-opacity hover:opacity-90 group flex items-center justify-center"
                style={{
                  backgroundColor: accentColor,
                  color: theme === "dark" ? "#5D4A42" : "black",
                }}
              >
                Voir mes projets
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate("/cv")}
                className="h-11 px-5 text-sm sm:h-14 sm:px-8 sm:text-lg rounded-2xl border-2 font-bold flex items-center justify-center gap-2 sm:gap-3 shadow-lg group"
                style={{ borderColor: accentColor, color: accentColor }}
              >
                <FileText className="w-4 h-4 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
                Voir CV
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer group"
        onClick={scrollToProjects}
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground group-hover:text-accent transition-colors">
          Scroll
        </span>
        <div className="w-6 h-10 border-2 border-accent/30 rounded-full flex justify-center p-1.5">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-2 bg-accent rounded-full"
          />
        </div>
      </motion.div>
    </section>
  )
}
