import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react"
import { motion, useInView, useReducedMotion, useScroll, useTransform, type Variants } from "framer-motion"
import { ArrowRight, ArrowUpRight, FileText, MapPin } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ScrollIndicator } from "@/components/ui/ScrollIndicator"
import { LettresMontantes } from "@/components/immersion/Texte"
import { projects } from "@/data/projects"
import { EASE_OUT } from "@/lib/animations"
import { cn } from "@/lib/utils"

/** Ce que je fais, en actions concrètes. Toutes se lisent après « Je » ; 30 caractères au plus pour tenir sur une ligne. */
const TEXTES_ANIMES = [
  "construis des sites de A à Z",
  "monte des serveurs Minecraft",
  "code un launcher en Rust",
  "sécurise des serveurs Linux",
  "dépanne postes et réseaux",
  "branche des objets connectés",
  "dessine en pixel art",
  "fais d'une idée un produit",
]

/** Repères affichés dans leur tuile. */
const REPERES = [
  { valeur: 24, libelle: "ans" },
  { valeur: 13, libelle: "ans de code en autodidacte" },
  { valeur: 3, libelle: "ans en datacenter" },
]

/** Le projet mis en avant : le premier de la liste, celui qui ouvre la section Projets. */
const PROJET_PHARE = projects[0]

/** Les tuiles arrivent l'une après l'autre : le nom d'abord, le personnage ensuite, les détails en dernier. */
const grille: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } } }
const tuile: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: EASE_OUT } },
}

/**
 * Une case du bento. Elle porte une lueur couleur accent qui suit le curseur :
 * la position est écrite dans deux variables CSS, sans repasser par React.
 */
function Tuile({ children, className }: { children: ReactNode; className?: string }) {
  const suivre = (evenement: PointerEvent<HTMLDivElement>) => {
    const cadre = evenement.currentTarget.getBoundingClientRect()
    evenement.currentTarget.style.setProperty("--x", `${evenement.clientX - cadre.left}px`)
    evenement.currentTarget.style.setProperty("--y", `${evenement.clientY - cadre.top}px`)
  }
  return (
    <motion.div
      variants={tuile}
      onPointerMove={suivre}
      className={cn("tuile-lumiere relative overflow-hidden rounded-2xl border border-border bg-card/80 backdrop-blur-sm", className)}
    >
      {children}
    </motion.div>
  )
}

/**
 * Nombre en rouleaux, comme un compteur mécanique : chaque chiffre est une
 * colonne qui fait un tour complet (0 → 9) avant de ralentir sur sa valeur,
 * avec un léger flou de vitesse au plus rapide. Transition CSS déclenchée à
 * l'entrée dans l'écran ; le nombre réel reste lisible par les technologies
 * d'assistance, et « réduire les animations » pose directement les chiffres.
 */
function NombreRouleaux({ valeur, delai }: { valeur: number; delai: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const visible = useInView(ref, { once: true, amount: 0.6 })
  // Toujours deux colonnes : « 3 » s'écrit « 03 » en fantôme, et les unités restent alignées d'une ligne à l'autre.
  const chiffres = String(valeur).padStart(2, "0").split("").map(Number)

  return (
    <span ref={ref} className="flex text-5xl font-semibold leading-none tracking-tight tabular-nums">
      <span className="sr-only">{valeur}</span>
      {chiffres.map((chiffre, rang) => (
        <span
          key={rang}
          aria-hidden="true"
          className={cn("relative h-[1em] overflow-hidden", rang === 0 && valeur < 10 ? "text-foreground/15" : "text-foreground")}
        >
          {/* Deux tours de 0 à 9 : la colonne s'arrête sur le second, après un tour complet. */}
          <span
            className={cn("rouleau flex flex-col", visible && "rouleau-actif")}
            style={{
              transform: visible ? `translateY(-${(10 + chiffre) * 5}%)` : "translateY(0%)",
              transitionDelay: `${delai + rang * 0.15}s`,
              animationDelay: `${delai + rang * 0.15}s`,
            }}
          >
            {Array.from({ length: 20 }, (_, n) => (
              <span key={n} className="h-[1em]">{n % 10}</span>
            ))}
          </span>
        </span>
      ))}
    </span>
  )
}

function TexteTape() {
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

  return (
    <span className="font-medium inline-block text-foreground">
      {texteAffiche}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="inline-block w-[3px] h-5 md:h-7 ml-0.5 align-middle rounded-full bg-accent-texte"
      />
    </span>
  )
}

/** L'heure à Paris, rafraîchie chaque minute : le site dit où j'en suis de ma journée. */
const FORMAT_HEURE = new Intl.DateTimeFormat("fr-FR", {
  timeZone: "Europe/Paris",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
})
const FORMAT_DATE = new Intl.DateTimeFormat("fr-FR", { timeZone: "Europe/Paris", weekday: "long", day: "numeric", month: "long" })

/**
 * Horloge de la tuile « En ce moment », à l'heure de Paris. Composant à part :
 * elle se redessine chaque seconde, le reste du hero ne bouge pas.
 */
function Horloge() {
  const [maintenant, setMaintenant] = useState(() => new Date())
  useEffect(() => {
    const minuteur = setInterval(() => setMaintenant(new Date()), 1000)
    return () => clearInterval(minuteur)
  }, [])

  const [heures, minutes, secondes] = FORMAT_HEURE.format(maintenant).split(":")
  const ecoule = (Number(heures) * 3600 + Number(minutes) * 60 + Number(secondes)) / 86400

  return (
    <>
      <div>
        <p className="flex items-baseline text-5xl font-semibold leading-none tracking-tight tabular-nums text-foreground">
          {heures}
          {/* Les deux-points battent la seconde, comme sur un réveil. */}
          <span className="mx-0.5 animate-pulse motion-reduce:animate-none">:</span>
          {minutes}
          <span className="ml-2 text-xl font-medium text-accent-texte">{secondes}</span>
        </p>
        <p className="mt-3 text-sm text-muted-foreground first-letter:uppercase">{FORMAT_DATE.format(maintenant)}</p>
      </div>

      {/* Part de la journée déjà passée, à l'heure de Paris. */}
      <div>
        <div className="relative h-1 overflow-hidden rounded-full bg-muted" aria-hidden="true">
          <div className="absolute inset-y-0 left-0 rounded-full bg-accent" style={{ width: `${ecoule * 100}%` }} />
        </div>
        <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
          <span>
            <span className="font-medium tabular-nums text-foreground">{Math.floor(ecoule * 100)} %</span> de la journée écoulée
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="size-3.5 text-accent-texte" aria-hidden="true" />
            France
          </span>
        </div>
      </div>
    </>
  )
}

/** Bonjour ou bonsoir selon l'heure du visiteur, pas celle de Paris : c'est lui qu'on accueille. */
function salutation() {
  const heure = new Date().getHours()
  return heure >= 5 && heure < 18 ? "Bonjour" : "Bonsoir"
}

/**
 * Le mot d'accueil, dit par le personnage : une bulle qui apparaît une fois la
 * tuile posée, avec un léger rebond.
 */
function Bienvenue() {
  const [bonjour] = useState(salutation)
  return (
    <motion.p
      initial={{ opacity: 0, y: 10, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", duration: 0.6, bounce: 0.3, delay: 1.1 }}
      className="absolute left-4 top-4 z-10 max-w-[80%] origin-bottom-left rounded-2xl rounded-bl-sm border border-border bg-background/85 px-4 py-3 text-sm leading-snug text-foreground shadow-lg backdrop-blur-md md:left-5 md:top-5"
    >
      <span className="font-semibold text-accent-texte">{bonjour} !</span> Bienvenue sur mon portfolio, bonne visite.
    </motion.p>
  )
}

/** Le personnage. Tant que son image manque, la tuile garde un monogramme plutôt qu'une image cassée. */
function Personnage() {
  const [absent, setAbsent] = useState(false)
  return (
    <>
      {/* Halo couleur accent derrière le personnage, pour le détacher du fond de la tuile. */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-3/4 bg-[radial-gradient(70%_60%_at_50%_100%,color-mix(in_oklch,var(--accent)_35%,transparent),transparent)]" />
      {absent ? (
        <span aria-hidden="true" className="texte-contour absolute inset-0 flex items-center justify-center text-[10rem] font-semibold tracking-[-0.06em]">
          K
        </span>
      ) : (
        <img
          src="/personnage/kimiya-portrait.webp"
          alt="Kimiya, mon personnage : cheveux châtains en bataille et grande cape beige"
          onError={() => setAbsent(true)}
          className="absolute bottom-0 left-1/2 h-[96%] w-auto max-w-none -translate-x-1/2 object-contain object-bottom transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] motion-safe:group-hover:scale-[1.03]"
        />
      )}
    </>
  )
}

export function HeroSection() {
  const navigate = useNavigate()
  const ref = useRef<HTMLElement>(null)
  const mouvementReduit = useReducedMotion()

  // En quittant le hero, le bento remonte un peu plus vite que la page et s'efface.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", mouvementReduit ? "0%" : "-12%"])
  const opacite = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const defilerVers = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })

  return (
    <section ref={ref} id="accueil" className="relative flex min-h-[100svh] flex-col overflow-hidden">
      {/* Trame de grille, fixe et discrète : le motif du bento, prolongé jusqu'au bord de l'écran. */}
      <div aria-hidden="true" className="fond-grille pointer-events-none absolute inset-0" />

      <motion.div
        style={{ y, opacity: opacite }}
        variants={grille}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto my-auto grid w-full max-w-6xl grid-cols-1 gap-3 px-6 pt-28 pb-10 md:grid-cols-12 md:gap-4 lg:px-12 md:pt-32"
      >
        {/* Présentation */}
        <Tuile className="flex flex-col justify-between p-7 md:col-span-8 md:row-span-2 md:p-10">
          {/* Une affirmation, pas une salutation : « Je suis » et le nom au même corps, sur deux lignes. */}
          <h1 className="text-[17vw] font-semibold leading-[0.9] tracking-[-0.05em] sm:text-7xl lg:text-8xl">
            <span className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
              <motion.span
                className="block text-foreground"
                initial={{ y: "105%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.1 }}
              >
                Je suis
              </motion.span>
            </span>
            <LettresMontantes texte="Kimiya." delai={0.3} className="text-accent-texte" />
          </h1>
          <div>
            <p className="mt-8 text-lg tracking-tight text-muted-foreground md:text-2xl">
              Je <TexteTape />
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button onClick={() => defilerVers("projets")} size="lg" className="group">
                Voir mes projets
                <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
              </Button>
              <Button variant="outline" size="lg" onClick={() => navigate("/cv")}>
                <FileText />
                Voir CV
              </Button>
            </div>
          </div>
        </Tuile>

        {/* Personnage */}
        <Tuile className="group aspect-[4/5] md:col-span-4 md:row-span-4 md:aspect-auto md:min-h-[36rem]">
          <Personnage />
          <Bienvenue />
        </Tuile>

        {/* Repères */}
        <Tuile className="flex flex-col justify-center px-6 py-5 md:col-span-4">
          <dl className="divide-y divide-border">
            {REPERES.map(({ valeur, libelle }, index) => (
              <div key={libelle} className="flex items-center gap-4 py-3 first:pt-0 last:pb-0">
                <dt className="order-2 text-sm leading-snug text-muted-foreground">{libelle}</dt>
                <dd className="order-1 shrink-0">
                  <NombreRouleaux valeur={valeur} delai={0.6 + index * 0.15} />
                </dd>
              </div>
            ))}
          </dl>
        </Tuile>

        {/* Où et quand */}
        <Tuile className="flex flex-col justify-between gap-5 p-6 md:col-span-4">
          <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <span aria-hidden="true" className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-[ping_2.4s_cubic-bezier(0,0,0.2,1)_infinite] rounded-full bg-accent opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            En ce moment
          </p>
          <Horloge />
        </Tuile>

        {/* Projet phare : la porte d'entrée vers la section Projets */}
        {PROJET_PHARE && (
          <Tuile className="group md:col-span-8">
            <button
              type="button"
              onClick={() => defilerVers("projets")}
              className="flex w-full items-center gap-5 p-4 text-left outline-none focus-visible:ring-2 focus-visible:ring-ring md:p-5"
            >
              {PROJET_PHARE.image_url && (
                <img
                  src={PROJET_PHARE.image_url}
                  alt=""
                  className="aspect-[16/10] w-20 shrink-0 rounded-lg object-cover object-top ring-1 ring-border sm:w-28 md:w-36"
                />
              )}
              <span className="min-w-0 flex-1">
                <span className="block font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Projet phare</span>
                <span className="mt-1 block truncate text-xl font-semibold tracking-tight text-foreground md:text-2xl">{PROJET_PHARE.title}</span>
              </span>
              <span
                aria-hidden="true"
                className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border transition-[rotate,background-color,color] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:rotate-45 group-hover:bg-foreground group-hover:text-background"
              >
                <ArrowUpRight className="size-4" />
              </span>
            </button>
          </Tuile>
        )}
      </motion.div>

      <ScrollIndicator />
    </section>
  )
}
