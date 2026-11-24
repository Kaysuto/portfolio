import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react"
import { motion, useInView, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue, type Variants } from "framer-motion"
import { ArrowRight, ArrowUpRight, FileText, MapPin } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ScrollIndicator } from "@/components/ui/ScrollIndicator"
import { LettresMontantes } from "@/components/immersion/Texte"
import { projects } from "@/data/projects"
import { EASE_OUT } from "@/lib/animations"
import { useLangue, type Bilingue, type Langue } from "@/lib/langue"
import { cn } from "@/lib/utils"

/** Ce que je fais, en actions concrètes. Toutes se lisent après « Je » (« I » en anglais) ; 30 caractères au plus pour tenir sur une ligne. */
const TEXTES_ANIMES: Bilingue[] = [
  { fr: "construis des sites de A à Z", en: "build websites end to end" },
  { fr: "monte des serveurs Minecraft", en: "run Minecraft servers" },
  { fr: "code un launcher en Rust", en: "code a launcher in Rust" },
  { fr: "sécurise des serveurs Linux", en: "secure Linux servers" },
  { fr: "dépanne postes et réseaux", en: "fix computers and networks" },
  { fr: "branche des objets connectés", en: "wire up IoT devices" },
  { fr: "dessine en pixel art", en: "draw pixel art" },
  { fr: "fais d'une idée un produit", en: "turn ideas into products" },
]

/** Repères affichés dans leur tuile. */
const REPERES: { valeur: number; libelle: Bilingue }[] = [
  { valeur: 24, libelle: { fr: "ans", en: "years old" } },
  { valeur: 13, libelle: { fr: "ans de code en autodidacte", en: "years of self-taught coding" } },
  { valeur: projects.length, libelle: { fr: "projets réalisés", en: "projects built" } },
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
function NombreRouleaux({
  valeur,
  delai,
  className,
  deuxChiffres = true,
}: {
  valeur: number
  delai: number
  className?: string
  /** « 3 » s'écrit « 03 », zéro en fantôme : utile pour aligner les unités d'une colonne. */
  deuxChiffres?: boolean
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const visible = useInView(ref, { once: true, amount: 0.6 })
  // Toujours deux colonnes : « 3 » s'écrit « 03 » en fantôme, et les unités restent alignées d'une ligne à l'autre.
  const chiffres = String(valeur).padStart(deuxChiffres ? 2 : 1, "0").split("").map(Number)

  return (
    <span ref={ref} className={cn("flex text-5xl font-semibold leading-none tracking-tight tabular-nums", className)}>
      <span className="sr-only">{valeur}</span>
      {chiffres.map((chiffre, rang) => (
        <span
          key={rang}
          aria-hidden="true"
          className={cn("relative h-[1em] overflow-hidden", deuxChiffres && rang === 0 && valeur < 10 ? "text-foreground/15" : "text-foreground")}
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

/** À monter avec `key={langue}` : changer de langue relance la frappe depuis le début. */
function TexteTape() {
  const { l } = useLangue()
  const [indexTexteCourant, setIndexTexteCourant] = useState(0)
  const [texteAffiche, setTexteAffiche] = useState("")
  const [estEnSuppression, setEstEnSuppression] = useState(false)
  const texteCourant = l(TEXTES_ANIMES[indexTexteCourant])

  useEffect(() => {
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
  }, [texteAffiche, texteCourant, estEnSuppression])

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
const OPTIONS_DATE: Intl.DateTimeFormatOptions = { timeZone: "Europe/Paris", weekday: "long", day: "numeric", month: "long" }
const FORMAT_DATE: Record<Langue, Intl.DateTimeFormat> = {
  fr: new Intl.DateTimeFormat("fr-FR", OPTIONS_DATE),
  en: new Intl.DateTimeFormat("en-GB", OPTIONS_DATE),
}

/**
 * Heure de Paris dans la barre du bas. Composant à part : elle se redessine
 * chaque seconde, le reste du hero ne bouge pas.
 */
function Horloge() {
  const { langue } = useLangue()
  const [maintenant, setMaintenant] = useState(() => new Date())
  useEffect(() => {
    const minuteur = setInterval(() => setMaintenant(new Date()), 1000)
    return () => clearInterval(minuteur)
  }, [])

  const [heures, minutes] = FORMAT_HEURE.format(maintenant).split(":")

  return (
    <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
      <span aria-hidden="true" className="relative flex size-2">
        <span className="absolute inline-flex size-full animate-[ping_2.4s_cubic-bezier(0,0,0.2,1)_infinite] rounded-full bg-accent opacity-60 motion-reduce:animate-none" />
        <span className="relative inline-flex size-2 rounded-full bg-accent" />
      </span>
      <span className="font-medium tabular-nums text-foreground">
        {heures}
        {/* Les deux-points battent la seconde, comme sur un réveil. */}
        <span className="animate-pulse motion-reduce:animate-none">:</span>
        {minutes}
      </span>
      <span aria-hidden="true">·</span>
      <span className="first-letter:uppercase">{FORMAT_DATE[langue].format(maintenant)}</span>
      <span aria-hidden="true">·</span>
      <span className="flex items-center gap-1">
        <MapPin className="size-3.5 text-accent-texte" aria-hidden="true" />
        France
      </span>
    </p>
  )
}

/** Bonjour ou bonsoir selon l'heure du visiteur, pas celle de Paris : c'est lui qu'on accueille. */
function salutation(): Bilingue {
  const heure = new Date().getHours()
  return heure >= 5 && heure < 18 ? { fr: "Bonjour", en: "Hello" } : { fr: "Bonsoir", en: "Good evening" }
}

/**
 * Le mot d'accueil, dit par le personnage : une bulle qui apparaît une fois la
 * tuile posée, avec un léger rebond.
 */
function Bienvenue({ className }: { className?: string }) {
  const { t, l } = useLangue()
  const [bonjour] = useState(salutation)
  return (
    <motion.p
      initial={{ opacity: 0, y: 10, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", duration: 0.6, bounce: 0.3, delay: 1.1 }}
      className={cn(
        "absolute z-10 origin-bottom-left rounded-2xl rounded-bl-sm border border-border bg-background/85 px-4 py-3 text-sm leading-snug text-foreground shadow-lg backdrop-blur-md",
        className
      )}
    >
      {t(
        <><span className="font-semibold text-accent-texte">{l(bonjour)} !</span> Bienvenue sur mon portfolio, bonne visite.</>,
        <><span className="font-semibold text-accent-texte">{l(bonjour)}!</span> Welcome to my portfolio, enjoy your visit.</>
      )}
    </motion.p>
  )
}

type Etoile = { x: number; y: number; taille: number; duree: string; delai: string }

/**
 * Les deux cadrages de la scène. Repères en % de l'image : lueur de la
 * lanterne (centre et largeur), étoile filante (point de départ), étoiles.
 * - « carte » : image verticale 1080×1920, dans une tuile (mobile).
 * - « fond » : image large 2400×1350, en fond du hero (grand écran), le
 *   personnage dans le coin haut droit laissé libre par le bento.
 */
const CADRAGES: Record<"carte" | "fond", { prefixe: string; format: string; lanterne: { x: number; y: number; largeur: number }; filante: { x: number; y: number }; etoiles: Etoile[] }> = {
  carte: {
    prefixe: "",
    format: "aspect-[9/16] left-1/2 -translate-x-1/2",
    lanterne: { x: 58.1, y: 66.3, largeur: 14 },
    filante: { x: 68, y: 17 },
    etoiles: [
      { x: 14, y: 9, taille: 2, duree: "3.2s", delai: "0s" },
      { x: 31, y: 21, taille: 1.5, duree: "4.1s", delai: "1.2s" },
      { x: 47, y: 6, taille: 2, duree: "3.6s", delai: "2.1s" },
      { x: 63, y: 14, taille: 1.5, duree: "4.8s", delai: "0.6s" },
      { x: 78, y: 8, taille: 2.5, duree: "3.9s", delai: "1.8s" },
      { x: 86, y: 27, taille: 1.5, duree: "4.4s", delai: "2.7s" },
      { x: 22, y: 36, taille: 1.5, duree: "5s", delai: "0.9s" },
      { x: 55, y: 33, taille: 2, duree: "3.4s", delai: "3.1s" },
      { x: 71, y: 42, taille: 1.5, duree: "4.6s", delai: "1.5s" },
      { x: 9, y: 48, taille: 1.5, duree: "3.8s", delai: "2.4s" },
    ],
  },
  fond: {
    prefixe: "fond-",
    // Le cadre est calé à 62 % plutôt qu'au centre : sur les écrans moins larges
    // que le 16:9, c'est surtout la gauche qui est rognée, et le personnage
    // reste dans la colonne libre au lieu de sortir par la droite.
    format: "aspect-video left-[62%] -translate-x-[62%]",
    lanterne: { x: 70.5, y: 52.4, largeur: 5.5 },
    filante: { x: 90, y: 14 },
    etoiles: [
      { x: 6, y: 16, taille: 2, duree: "3.2s", delai: "0s" },
      { x: 18, y: 22, taille: 1.5, duree: "4.1s", delai: "1.2s" },
      { x: 33, y: 14, taille: 2, duree: "3.6s", delai: "2.1s" },
      { x: 47, y: 15, taille: 1.5, duree: "4.8s", delai: "0.6s" },
      { x: 61, y: 17, taille: 2.5, duree: "3.9s", delai: "1.8s" },
      { x: 69, y: 27, taille: 1.5, duree: "4.4s", delai: "2.7s" },
      { x: 78, y: 14, taille: 2, duree: "5s", delai: "0.9s" },
      { x: 86, y: 31, taille: 1.5, duree: "3.4s", delai: "3.1s" },
      { x: 93, y: 19, taille: 2, duree: "4.6s", delai: "1.5s" },
      { x: 56, y: 38, taille: 1.5, duree: "3.8s", delai: "2.4s" },
      { x: 25, y: 41, taille: 1.5, duree: "4.2s", delai: "3.4s" },
    ],
  },
}

/** Un plan de la scène, dans ses deux thèmes : on passe de l'un à l'autre en fondu au changement de thème. En `lazy`, le cadrage masqué (mobile ou grand écran) n'est pas téléchargé. */
function Plan({ src }: { src: string }) {
  return (
    <>
      <img src={`${src}-clair.webp`} alt="" loading="lazy" className="absolute inset-0 size-full transition-opacity duration-500 dark:opacity-0" />
      <img src={`${src}-sombre.webp`} alt="" loading="lazy" className="absolute inset-0 size-full opacity-0 transition-opacity duration-500 dark:opacity-100" />
    </>
  )
}

/**
 * Le personnage assis au bord d'une falaise, une lanterne à côté de lui, façon
 * fond d'écran minimaliste. Deux plans (ciel, falaise et personnage) glissent à
 * des vitesses différentes vers le curseur et, en fond du hero, au défilement ;
 * la lanterne vacille et, la nuit, les étoiles scintillent et une étoile
 * filante passe de temps en temps. Sous « réduire les animations », la scène
 * est fixe.
 */
function SceneLanterne({
  cadrage,
  defilement,
  children,
}: {
  cadrage: keyof typeof CADRAGES
  defilement?: MotionValue<number>
  children?: ReactNode
}) {
  const { prefixe, format, lanterne, filante, etoiles } = CADRAGES[cadrage]
  const dossier = `/personnage/lanterne/${prefixe}`
  const mouvementReduit = useReducedMotion()
  const { t } = useLangue()
  const curseurX = useSpring(0, { stiffness: 50, damping: 20 })
  const curseurY = useSpring(0, { stiffness: 50, damping: 20 })
  const cielX = useTransform(curseurX, (v) => v * -4)
  const cielY = useTransform(curseurY, (v) => v * -3)
  const avantX = useTransform(curseurX, (v) => v * 10)
  const avantY = useTransform(curseurY, (v) => v * 6)

  // Au défilement, le ciel descend plus vite que la falaise : il paraît plus loin.
  const repli = useMotionValue(0)
  const progression = defilement ?? repli
  const cielDefile = useTransform(progression, [0, 1], ["0%", mouvementReduit ? "0%" : "22%"])
  const avantDefile = useTransform(progression, [0, 1], ["0%", mouvementReduit ? "0%" : "8%"])

  // Position du curseur dans la fenêtre, ramenée entre -1 et 1.
  useEffect(() => {
    if (mouvementReduit || !window.matchMedia("(pointer: fine)").matches) return
    const suivre = (evenement: globalThis.PointerEvent) => {
      curseurX.set((evenement.clientX / window.innerWidth) * 2 - 1)
      curseurY.set((evenement.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener("pointermove", suivre, { passive: true })
    return () => window.removeEventListener("pointermove", suivre)
  }, [mouvementReduit, curseurX, curseurY])

  return (
    <div role="img" aria-label={t(
        "Kimiya, mon personnage, assis au bord d'une falaise à côté d'une lanterne",
        "Kimiya, my character, sitting on the edge of a cliff next to a lantern"
      )} className="absolute inset-0 overflow-hidden">
      {/* Cadre au format de l'image, agrandi pour couvrir tout le conteneur : les repères en % restent justes. */}
      <div className={cn("absolute top-1/2 min-h-full min-w-full -translate-y-1/2", format)}>
        <motion.div className="absolute inset-0" style={{ y: cielDefile }}>
          <motion.div className="absolute inset-0 scale-[1.04]" style={{ x: cielX, y: cielY }}>
            <Plan src={`${dossier}ciel`} />
            <div aria-hidden="true" className="absolute inset-0 hidden dark:block">
              {etoiles.map((etoile, index) => (
                <span
                  key={index}
                  className="etoile absolute rounded-full bg-[#F1EEEA]"
                  style={{
                    left: `${etoile.x}%`,
                    top: `${etoile.y}%`,
                    width: etoile.taille,
                    height: etoile.taille,
                    animationDuration: etoile.duree,
                    animationDelay: etoile.delai,
                  }}
                />
              ))}
              <span
                className="etoile-filante absolute h-px w-16 rounded-full bg-linear-to-r from-transparent to-[#F1EEEA]"
                style={{ left: `${filante.x}%`, top: `${filante.y}%` }}
              />
            </div>
          </motion.div>
        </motion.div>
        <motion.div className="absolute inset-0" style={{ y: avantDefile }}>
          <motion.div className="absolute inset-0 scale-[1.04]" style={{ x: avantX, y: avantY }}>
            <Plan src={`${dossier}premier-plan`} />
            {/* Lueur de la lanterne, centrée sur sa flamme, plus discrète de jour. */}
            <span
              aria-hidden="true"
              className="absolute aspect-square -translate-x-1/2 -translate-y-1/2 opacity-50 mix-blend-screen dark:opacity-100"
              style={{ left: `${lanterne.x}%`, top: `${lanterne.y}%`, width: `${lanterne.largeur}%` }}
            >
              <span className="lanterne-lueur absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(255,196,120,0.55),rgba(255,170,90,0.18)_40%,transparent_70%)]" />
            </span>
            {children}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export function HeroSection() {
  const navigate = useNavigate()
  const { langue, t, l } = useLangue()
  const ref = useRef<HTMLElement>(null)
  const mouvementReduit = useReducedMotion()

  // En quittant le hero, le bento remonte un peu plus vite que la page et s'efface.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", mouvementReduit ? "0%" : "-12%"])
  const opacite = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const defilerVers = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })

  return (
    <section ref={ref} id="accueil" className="relative flex min-h-[100svh] flex-col overflow-hidden">
      {/* Mobile : trame de grille discrète. Grand écran : la scène du personnage en fond, en parallaxe. */}
      <div aria-hidden="true" className="fond-grille pointer-events-none absolute inset-0 md:hidden" />
      <div className="absolute inset-0 hidden md:block">
        <SceneLanterne cadrage="fond" defilement={scrollYProgress}>
          {/* La bulle flotte juste au-dessus de la tête du personnage (74 % ; 44 %). */}
          <Bienvenue className="bottom-[58%] left-[74%] w-60 origin-bottom -translate-x-1/2 rounded-b-2xl" />
        </SceneLanterne>
      </div>

      {/* Voile à gauche sur grand écran : le texte reste lisible sur le ciel, la scène garde sa droite. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden bg-linear-to-r from-background/75 via-background/30 to-transparent md:block"
      />

      <motion.div
        style={{ y, opacity: opacite }}
        variants={grille}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center gap-10 px-6 pt-28 pb-10 lg:px-12 md:pt-32 md:pb-24"
      >
        {/* Présentation, posée directement sur la scène, sans carte, à gauche ; la barre suit juste en dessous. */}
        <motion.div variants={tuile} className="max-w-xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">{t("Informaticien polyvalent", "IT generalist")}</p>
          <h1 className="mt-3 text-6xl font-semibold leading-[0.9] tracking-[-0.05em] md:text-7xl lg:text-8xl">
            <LettresMontantes texte="Kimiya" delai={0.2} className="text-accent-texte" />
          </h1>
          <p className="mt-6 text-lg tracking-tight text-muted-foreground md:text-2xl">
            {t("Je", "I")} <TexteTape key={langue} />
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {/* `px-4` : la flèche, enveloppée, n'est plus l'enfant direct que `has-[>svg]` attend. */}
            <Button onClick={() => defilerVers("projets")} size="lg" className="px-4">
              {t("Voir mes projets", "See my projects")}
              <span aria-hidden="true" className="fleche-relais">
                <ArrowRight />
                <ArrowRight />
              </span>
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate("/cv")}>
              <FileText />
              {t("Voir CV", "View resume")}
            </Button>
          </div>
        </motion.div>

        {/* Mobile : la scène dans sa tuile, entre la présentation et la barre. */}
        <Tuile className="aspect-[4/5] md:hidden">
          <SceneLanterne cadrage="carte" />
          <Bienvenue className="left-4 top-4 max-w-[80%]" />
        </Tuile>

        {/* Sous la présentation, sans carte : trois repères, puis l'heure et le
            projet phare sur une ligne. Limité à la colonne de gauche pour laisser
            le personnage dégagé. */}
        <motion.div variants={tuile} className="max-w-xl border-t border-border/60 pt-6">
          <dl className="flex flex-wrap gap-x-10 gap-y-5">
            {REPERES.map(({ valeur, libelle }, index) => (
              <div key={libelle.fr} className="flex flex-col">
                <dt className="order-2 mt-1.5 text-xs text-muted-foreground">{l(libelle)}</dt>
                <dd className="order-1">
                  <NombreRouleaux valeur={valeur} delai={0.6 + index * 0.15} deuxChiffres={false} className="text-4xl" />
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-muted-foreground">
            <Horloge />
            {/* Projet phare : la porte d'entrée vers la section Projets */}
            {PROJET_PHARE && (
              <button
                type="button"
                onClick={() => defilerVers("projets")}
                className="group flex items-center gap-2 rounded-full border border-border/60 bg-card/50 py-1 pl-1 pr-3 backdrop-blur-md transition-colors hover:border-accent/50 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {PROJET_PHARE.image_url && (
                  <img src={PROJET_PHARE.image_url} alt="" className="size-6 rounded-full object-cover" />
                )}
                <span>
                  {t("Projet phare : ", "Featured project: ")}<span className="font-medium text-foreground">{PROJET_PHARE.title}</span>
                </span>
                <ArrowUpRight
                  className="size-3.5 transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </button>
            )}
          </div>
        </motion.div>
      </motion.div>

      <ScrollIndicator />
    </section>
  )
}
