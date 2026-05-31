import { motion } from "framer-motion"
import { ArrowRight, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useTheme } from "@/hooks/use-theme"
import { fadeInUp, staggerContainer, EASE_OUT } from "@/lib/animations"

const TEXTES_ANIMES = [
  "code & créativité",
  "réseaux & sécurité",
  "pixels & innovation",
]

export function HeroSection() {
  const { theme } = useTheme()
  const navigate = useNavigate()

  const [indexTexteCourant, setIndexTexteCourant] = useState(0)
  const [texteAffiche, setTexteAffiche] = useState("")
  const [estEnSuppression, setEstEnSuppression] = useState(false)

  const couleurAccent = theme === "dark" ? "#D3C0B1" : "#C49D84"

  useEffect(() => {
    const texteCourant = TEXTES_ANIMES[indexTexteCourant]
    const vitesseFrappe = estEnSuppression ? 30 : 60

    const minuteur = setTimeout(() => {
      if (!estEnSuppression && texteAffiche === texteCourant) {
        setTimeout(() => setEstEnSuppression(true), 2000)
      } else if (estEnSuppression && texteAffiche === "") {
        setEstEnSuppression(false)
        setIndexTexteCourant((precedent) => (precedent + 1) % TEXTES_ANIMES.length)
      } else {
        setTexteAffiche((precedent) =>
          estEnSuppression ? precedent.slice(0, -1) : texteCourant.slice(0, precedent.length + 1)
        )
      }
    }, vitesseFrappe)

    return () => clearTimeout(minuteur)
  }, [texteAffiche, indexTexteCourant, estEnSuppression])

  const defilerVersProjets = () => {
    document.getElementById("projets")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      id="accueil"
      className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden"
    >
      {/* Halo lumineux de fond ambiant */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <motion.div
          className="absolute left-1/2 top-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{ backgroundColor: `${couleurAccent}14` }}
          animate={{ scale: [1, 1.08, 1], opacity: [0.6, 0.85, 0.6] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(${couleurAccent} 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
            maskImage: "radial-gradient(ellipse 60% 50% at 50% 50%, black, transparent)",
            WebkitMaskImage: "radial-gradient(ellipse 60% 50% at 50% 50%, black, transparent)",
          }}
        />
      </div>

      <motion.div
        className="max-w-5xl mx-auto text-center relative z-10"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        {/* Titre principal */}
        <motion.div variants={fadeInUp}>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
            <span className="text-foreground">Salut, je suis</span>
            <br />
            <span className="relative inline-block" style={{ color: couleurAccent }}>
              Kimiya
              <motion.div
                className="absolute -bottom-2 left-0 h-2 rounded-full"
                style={{ backgroundColor: `${couleurAccent}33` }}
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.8, duration: 0.8, ease: EASE_OUT }}
              />
            </span>
          </h1>
        </motion.div>

        {/* Sous-titre animé */}
        <motion.div variants={fadeInUp}>
          <div className="text-lg md:text-xl text-muted-foreground mb-10 font-medium tracking-tight flex flex-col items-center justify-center">
            <p>
              Passionné par le{" "}
              <span className="font-bold inline-block" style={{ color: couleurAccent }}>
                {texteAffiche}
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="inline-block w-[3px] h-5 ml-0.5 align-middle rounded-full"
                  style={{ backgroundColor: couleurAccent }}
                />
              </span>
            </p>
          </div>
        </motion.div>

        {/* Boutons d'action */}
        <div className="flex flex-row gap-4 justify-center items-center flex-wrap">
          <motion.div variants={fadeInUp}>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                onClick={defilerVersProjets}
                size="lg"
                className="h-11 px-5 text-sm sm:h-14 sm:px-8 sm:text-lg rounded-2xl font-bold shadow-xl transition-opacity hover:opacity-90 group flex items-center justify-center"
                style={{
                  backgroundColor: "var(--accent)",
                  color: "var(--background)",
                }}
              >
                Voir mes projets
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/cv")}
              className="h-11 px-5 text-sm sm:h-14 sm:px-8 sm:text-lg rounded-2xl border-2 font-bold flex items-center justify-center gap-2 sm:gap-3 shadow-lg group transition-colors"
              style={{
                borderColor: couleurAccent,
                color: couleurAccent,
                backgroundColor: "var(--background)",
              }}
              onMouseEnter={evenement => (evenement.currentTarget.style.backgroundColor = "color-mix(in oklch, var(--accent) 12%, var(--background))")}
              onMouseLeave={evenement => (evenement.currentTarget.style.backgroundColor = "var(--background)")}
            >
              <FileText className="w-4 h-4 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
              Voir CV
            </motion.button>
          </motion.div>
        </div>

      </motion.div>

      {/* Indicateur de défilement */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-3 cursor-pointer group"
        onClick={defilerVersProjets}
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
