import { motion } from "framer-motion"
import { ArrowRight, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sticker } from "@/components/ui/Sticker"
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

  return (
    <section
      id="accueil"
      className="min-h-screen flex flex-col justify-center px-6 lg:px-12 relative overflow-hidden"
    >
      {/*
        Une seule lueur, statique, peinte en dégradé plutôt qu'en `blur-3xl` :
        un filtre de flou sur un bloc de 38rem est recalculé à chaque frame dès
        qu'on l'anime, alors qu'un `radial-gradient` est peint une fois.
      */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(60rem 40rem at 75% 25%, color-mix(in oklch, var(--gold) 14%, transparent), transparent 70%)",
        }}
      />

      <motion.div
        className="w-full max-w-6xl mx-auto relative z-10 pt-24 md:pt-28 pb-12 md:pb-16"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="grid lg:grid-cols-12 gap-x-10 gap-y-12 items-end">
          {/* Colonne principale */}
          <div className="lg:col-span-8">
            <motion.div variants={fadeInUp}>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.95] mb-8">
                <span className="flex items-center gap-3 text-muted-foreground text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight mb-3">
                  Salut, je suis
                  <Sticker name="salut" size={96} className="md:w-32 md:h-32 -my-4" />
                </span>
                <span className="relative inline-block text-accent">
                  Kimiya
                  <motion.span
                    className="absolute -bottom-1 left-0 h-2 rounded-full bg-accent/25"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.8, duration: 0.8, ease: EASE_OUT }}
                  />
                </span>
              </h1>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <p className="text-lg md:text-2xl text-muted-foreground font-medium tracking-tight mb-10">
                Passionné par le{" "}
                <span className="font-bold inline-block text-foreground">
                  {texteAffiche}
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="inline-block w-[3px] h-5 md:h-6 ml-0.5 align-middle rounded-full bg-accent"
                  />
                </span>
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex flex-row gap-4 flex-wrap">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button
                  onClick={defilerVersProjets}
                  size="lg"
                  className="h-12 px-6 text-sm sm:h-14 sm:px-8 sm:text-base rounded-2xl font-bold shadow-xl bg-accent text-accent-foreground hover:bg-accent/90 transition-colors group flex items-center justify-center"
                >
                  Voir mes projets
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate("/cv")}
                className="h-12 px-6 text-sm sm:h-14 sm:px-8 sm:text-base rounded-2xl border-2 border-accent/40 text-accent bg-transparent hover:bg-accent/10 hover:border-accent font-bold flex items-center justify-center gap-2 sm:gap-3 group transition-colors"
              >
                <FileText className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                Voir CV
              </motion.button>
            </motion.div>
          </div>

          {/* Rail latéral : statut courant */}
          <motion.div variants={fadeInUp} className="lg:col-span-4 lg:pb-2">
            <div className="border-l-2 border-accent/30 pl-5 py-1">
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-muted-foreground mb-3">
                En ce moment
              </p>
              <p className="text-base text-foreground font-semibold leading-snug mb-1">
                Technicien Informatique Polyvalent Junior
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Magna Engineered Glass Europe — France
              </p>
              <div className="flex items-center gap-2 mt-4">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-sage opacity-60 animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-sage" />
                </span>
                <span className="text-xs font-bold text-sage uppercase tracking-widest">
                  Réponse sous 48h
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bandeau de repères */}
        <motion.dl
          variants={fadeInUp}
          className="mt-12 md:mt-16 pt-8 border-t border-border/60 grid grid-cols-3 gap-3 sm:gap-6 max-w-2xl"
        >
          {REPERES.map(({ valeur, libelle }) => (
            <div key={libelle}>
              <dt className="sr-only">{libelle}</dt>
              <dd>
                <span className="block text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tabular-nums leading-none font-display">
                  {valeur}
                </span>
                <span className="block mt-2 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-muted-foreground leading-tight">
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
