import { motion } from "framer-motion"
import { ArrowRight, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { fadeInUp, staggerContainer, EASE_OUT } from "@/lib/animations"

const TEXTES_ANIMES = [
  "code & créativité",
  "réseaux & sécurité",
  "pixels & innovation",
]

/** Repères affichés dans le bandeau bas du hero. */
const REPERES = [
  { valeur: "24", libelle: "ans" },
  { valeur: "12+", libelle: "ans d'autodidaxie" },
  { valeur: "3", libelle: "ans en datacenter" },
]

export function HeroSection() {
  const navigate = useNavigate()

  const [indexTexteCourant, setIndexTexteCourant] = useState(0)
  const [texteAffiche, setTexteAffiche] = useState("")
  const [estEnSuppression, setEstEnSuppression] = useState(false)

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

  /*
    min-h en `svh` plutôt qu'un plein écran : le contenu ne mesure que ~610 px,
    et un `min-h-screen` laissait 330 px de vide de chaque côté sur les grands
    moniteurs. Sous ~880 px de haut, la section se cale sur son contenu.
  */
  return (
    <section
      id="accueil"
      className="min-h-[70svh] flex flex-col justify-center px-6 lg:px-12 relative overflow-hidden"
    >
      <motion.div
        className="w-full max-w-6xl mx-auto relative z-10 pt-24 md:pt-28 pb-12 md:pb-16"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="flex flex-col items-center text-center">
          <motion.div variants={fadeInUp}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold leading-[0.95] mb-8">
              <span className="block text-muted-foreground text-2xl md:text-3xl lg:text-4xl font-normal tracking-tight mb-3">
                Salut, je suis
              </span>
              <span className="relative inline-block text-accent-texte">
                Kimiya
                <motion.span
                  className="absolute -bottom-1 left-0 h-2 rounded-full bg-accent/40"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.8, duration: 0.8, ease: EASE_OUT }}
                />
              </span>
            </h1>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <p className="text-lg md:text-2xl text-muted-foreground tracking-tight mb-10">
              Passionné par le{" "}
              <span className="font-medium inline-block text-foreground">
                {texteAffiche}
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="inline-block w-[3px] h-5 md:h-6 ml-0.5 align-middle rounded-full bg-accent-texte"
                />
              </span>
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="flex flex-row justify-center gap-3 flex-wrap">
            <Button
              onClick={defilerVersProjets}
              size="lg"
              className="group"
            >
              Voir mes projets
              <ArrowRight className="group-hover:translate-x-0.5 transition-transform" />
            </Button>

            <Button variant="outline" size="lg" onClick={() => navigate("/cv")}>
              <FileText />
              Voir CV
            </Button>
          </motion.div>

        </div>

        {/* Bandeau de repères */}
        <motion.dl
          variants={fadeInUp}
          className="mt-12 md:mt-16 pt-8 border-t border-border/60 grid grid-cols-3 gap-3 sm:gap-6 max-w-2xl mx-auto text-center"
        >
          {REPERES.map(({ valeur, libelle }) => (
            <div key={libelle}>
              <dt className="sr-only">{libelle}</dt>
              <dd>
                <span className="block text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground tabular-nums leading-none tracking-tight">
                  {valeur}
                </span>
                <span className="block mt-2 font-mono text-[10px] font-medium uppercase tracking-[0.15em] sm:tracking-[0.2em] text-muted-foreground leading-tight">
                  {libelle}
                </span>
              </dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>
    </section>
  )
}
