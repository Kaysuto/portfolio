import { useState, useEffect, useCallback } from "react"
import { motion, useScroll, useSpring } from "framer-motion"
import { User, Layers, FolderOpen, Mail, FileText, BookOpen } from "lucide-react"
import { ThemeController } from "./ThemeController"
import { cn } from "@/lib/utils"
import { useNavigate, useLocation } from "react-router-dom"
import { preloadRoute } from "@/routes/lazyRoutes"

const LUMA_EASE = [0.22, 1, 0.36, 1] as const

type NavLink = { href: string; id: string; label: string; icon: React.ElementType }

const LIENS_DEFILEMENT: NavLink[] = [
  { href: "#apropos", id: "apropos", label: "À propos", icon: User },
  { href: "#stack", id: "stack", label: "Stack", icon: Layers },
  { href: "#projets", id: "projets", label: "Projets", icon: FolderOpen },
  { href: "#contact", id: "contact", label: "Contact", icon: Mail },
]

const LIENS_ROUTES: NavLink[] = [
  { href: "/cv", id: "cv", label: "CV", icon: FileText },
  { href: "/bio", id: "bio", label: "Bio", icon: BookOpen },
]

/**
 * La barre d'onglets mobile reste à six colonnes : « Stack » y aurait fait une
 * septième cellule de 45 px où plus aucun libellé ne tient. La section garde sa
 * place dans l'espion de défilement et dans la barre desktop, et le pied de
 * page en donne le raccourci.
 */
const LIENS_MOBILE = [...LIENS_DEFILEMENT.filter(lien => lien.id !== "stack"), ...LIENS_ROUTES]

/** Entrée de la barre desktop, partagée par le groupe d'ancres et celui des pages. */
function LienNav({
  lien,
  estActif,
  onClic,
  onSurvol,
}: {
  lien: NavLink
  estActif: boolean
  onClic: (lien: NavLink) => void
  onSurvol: (lien: NavLink) => void
}) {
  return (
    <button
      onClick={() => onClic(lien)}
      onMouseEnter={() => onSurvol(lien)}
      onFocus={() => onSurvol(lien)}
      aria-current={estActif ? "page" : undefined}
      className={cn(
        "relative px-4 py-3 text-sm rounded-lg transition-colors duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
        estActif
          ? "text-foreground font-medium"
          : "text-muted-foreground hover:text-foreground font-normal"
      )}
    >
      {estActif && (
        <motion.span
          layoutId="nav-pastille"
          className="absolute inset-0 rounded-lg bg-foreground/8"
          transition={{ type: "spring", stiffness: 400, damping: 34 }}
        />
      )}
      <span className="relative z-10">{lien.label}</span>
    </button>
  )
}

export function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()

  const [estCondensee, setEstCondensee] = useState(false)
  const [idActif, setIdActif] = useState<string | null>(null)

  // Barre de progression de lecture, partagée par les deux affichages.
  const { scrollYProgress } = useScroll()
  const progression = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  useEffect(() => {
    const surDefilement = () => setEstCondensee(window.scrollY > 24)
    window.addEventListener("scroll", surDefilement, { passive: true })
    surDefilement()
    return () => window.removeEventListener("scroll", surDefilement)
  }, [])

  // Espion de défilement via IntersectionObserver
  useEffect(() => {
    const routeCorrespondante = LIENS_ROUTES.find(lien => lien.href === location.pathname)
    if (routeCorrespondante) { setIdActif(routeCorrespondante.id); return }

    const enIntersection = new Set<string>()
    const observateur = new IntersectionObserver(
      (entrees) => {
        entrees.forEach(entree => {
          if (entree.isIntersecting) enIntersection.add(entree.target.id)
          else enIntersection.delete(entree.target.id)
        })
        const premier = LIENS_DEFILEMENT.find(lien => enIntersection.has(lien.id))
        setIdActif(premier?.id ?? null)
      },
      { rootMargin: "-40% 0px -55% 0px" }
    )
    const observerTout = () => {
      LIENS_DEFILEMENT.forEach(lien => {
        const element = document.getElementById(lien.id)
        if (element) observateur.observe(element)
      })
    }
    observerTout()
    const minuteurs = [200, 800, 2000].map(delai => setTimeout(observerTout, delai))
    return () => { minuteurs.forEach(clearTimeout); observateur.disconnect() }
  }, [location.pathname])

  // Défilement en attente après une navigation
  useEffect(() => {
    const cible = sessionStorage.getItem("scrollToSection")
    if (!cible || location.pathname !== "/") return
    setTimeout(() => {
      document.getElementById(cible)?.scrollIntoView({ behavior: "smooth" })
      sessionStorage.removeItem("scrollToSection")
    }, 150)
  }, [location.pathname])

  const gererClicLien = useCallback((lien: NavLink) => {
    if (lien.href.startsWith("/")) { navigate(lien.href); return }
    if (location.pathname !== "/") {
      sessionStorage.setItem("scrollToSection", lien.id)
      navigate("/")
      return
    }
    document.getElementById(lien.id)?.scrollIntoView({ behavior: "smooth" })
  }, [navigate, location.pathname])

  const gererSurvolLien = useCallback((lien: NavLink) => {
    if (lien.href.startsWith("/")) preloadRoute(lien.href)
  }, [])

  const gererClicLogo = useCallback(() => {
    if (location.pathname !== "/") { navigate("/"); return }
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [navigate, location.pathname])

  return (
    <>
      {/*
        ══ Desktop : îlot flottant ══
        L'enveloppe `fixed` est transparente et ne capte pas les clics ; seul
        l'îlot en `w-fit` est visible et interactif, ce qui laisse la page
        défiler librement de part et d'autre.
      */}
      <div className="fixed top-4 inset-x-0 z-40 hidden md:flex justify-center px-4 pointer-events-none">
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.45, ease: LUMA_EASE }}
          className="pointer-events-auto"
        >
          {/*
            Le flou est porté par `.surface-flottante` et reste constant : animer
            `backdrop-filter` obligerait le navigateur à refiltrer toute la zone
            sous la barre à chaque frame. Seules les couleurs sont animées.
          */}
          <nav
            className={cn(
              "relative flex items-center gap-1 h-16 pl-5 pr-3 rounded-2xl overflow-hidden",
              "transition-[background-color,border-color,box-shadow] duration-300 ease-out",
              /* Rien à désactiver hors état condensé : l'îlot n'a pas de fond
                 par défaut. Émettre `bg-transparent`/`shadow-none` en face de
                 `.surface-flottante` mettrait deux règles de même spécificité
                 en concurrence pour rien. */
              estCondensee && "surface-flottante"
            )}
          >
            <button
              onClick={gererClicLogo}
              className="font-display text-lg font-semibold text-foreground hover:text-accent-texte transition-colors shrink-0 tracking-tight px-1.5"
            >
              Kimiya
            </button>

            <span
              className="w-px h-6 mx-2.5 bg-border shrink-0"
              aria-hidden="true"
            />

            {/*
              Deux groupes distincts, séparés par un filet : à gauche les
              ancres qui font défiler l'accueil, à droite les pages qui ont
              leur propre URL. Les mêler dans une liste unique laissait croire
              que « CV » et « Bio » étaient des sections de la page d'accueil.
            */}
            <ul className="flex items-center gap-0.5" aria-label="Sections de l'accueil">
              {LIENS_DEFILEMENT.map(lien => (
                <li key={lien.id}>
                  <LienNav
                    lien={lien}
                    estActif={idActif === lien.id}
                    onClic={gererClicLien}
                    onSurvol={gererSurvolLien}
                  />
                </li>
              ))}
            </ul>

            <span
              className="w-px h-6 mx-2.5 bg-border shrink-0"
              aria-hidden="true"
            />

            <ul className="flex items-center gap-0.5" aria-label="Pages">
              {LIENS_ROUTES.map(lien => (
                <li key={lien.id}>
                  <LienNav
                    lien={lien}
                    estActif={idActif === lien.id}
                    onClic={gererClicLien}
                    onSurvol={gererSurvolLien}
                  />
                </li>
              ))}
            </ul>

            <span
              className="w-px h-6 mx-2.5 bg-border shrink-0"
              aria-hidden="true"
            />

            <div className="shrink-0">
              <ThemeController />
            </div>

            {/* Progression de lecture, filante sur l'arête basse de l'îlot */}
            <motion.div
              className="absolute bottom-0 inset-x-0 h-px origin-left bg-accent"
              style={{ scaleX: progression }}
              aria-hidden="true"
            />
          </nav>
        </motion.header>
      </div>

      {/*
        ══ Mobile : barre d'onglets flottante ══
        Six colonnes de largeur égale et libellés toujours visibles : n'afficher
        le libellé que sur l'onglet actif faisait sauter la largeur des voisins à
        chaque défilement.

        Il n'y a volontairement pas d'îlot en haut sur mobile : deux barres
        simultanées à l'écran, c'était une de trop. Le contrôleur de thème a
        rejoint cette barre, et la progression de lecture s'est déplacée sur son
        arête haute, là où elle borde le contenu qui défile.
      */}
      <motion.nav
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: LUMA_EASE, delay: 0.1 }}
        className="fixed inset-x-3 z-40 md:hidden rounded-xl surface-flottante overflow-hidden"
        style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 0.75rem)" }}
        aria-label="Navigation principale"
      >
        {/* Progression de lecture, filante sur l'arête haute de la barre */}
        <motion.div
          className="absolute top-0 inset-x-0 h-px origin-left bg-accent z-10"
          style={{ scaleX: progression }}
          aria-hidden="true"
        />

        <ul className="grid grid-cols-6">
          {LIENS_MOBILE.map((lien) => {
            const Icone = lien.icon
            const estActif = idActif === lien.id
            return (
              <li key={lien.id}>
                <button
                  onClick={() => gererClicLien(lien)}
                  onTouchStart={() => gererSurvolLien(lien)}
                  aria-current={estActif ? "page" : undefined}
                  className="relative w-full h-16 flex flex-col items-center justify-center gap-1.5 px-1"
                >
                  {estActif && (
                    <motion.span
                      layoutId="nav-onglet-actif"
                      className="absolute inset-1 rounded-md bg-foreground/8"
                      transition={{ type: "spring", stiffness: 400, damping: 34 }}
                    />
                  )}
                  <Icone
                    className={cn(
                      "relative z-10 w-[20px] h-[20px] shrink-0 transition-colors duration-150",
                      estActif ? "text-accent-texte" : "text-muted-foreground"
                    )}
                    aria-hidden="true"
                  />
                  <span
                    className={cn(
                      "relative z-10 text-[11px] leading-none tracking-tight truncate max-w-full transition-colors duration-150",
                      estActif ? "text-accent-texte font-medium" : "text-muted-foreground font-normal"
                    )}
                  >
                    {lien.label}
                  </span>
                </button>
              </li>
            )
          })}

          {/* Sixième colonne : bascule de thème, au gabarit des onglets */}
          <li>
            <ThemeController variante="onglet" />
          </li>
        </ul>
      </motion.nav>
    </>
  )
}
