import { useState, useEffect, useCallback } from "react"
import { motion, useScroll, useSpring } from "framer-motion"
import { User, FolderOpen, Mail, FileText, BookOpen } from "lucide-react"
import { ThemeController } from "./ThemeController"
import { cn } from "@/lib/utils"
import { useNavigate, useLocation } from "react-router-dom"
import { preloadRoute } from "@/routes/lazyRoutes"

const LUMA_EASE = [0.22, 1, 0.36, 1] as const

type NavLink = { href: string; id: string; label: string; icon: React.ElementType }

const LIENS_DEFILEMENT: NavLink[] = [
  { href: "#apropos", id: "apropos", label: "À propos", icon: User },
  { href: "#projets", id: "projets", label: "Projets", icon: FolderOpen },
  { href: "#contact", id: "contact", label: "Contact", icon: Mail },
]

const LIENS_ROUTES: NavLink[] = [
  { href: "/cv", id: "cv", label: "CV", icon: FileText },
  { href: "/bio", id: "bio", label: "Bio", icon: BookOpen },
]

const TOUS_LIENS = [...LIENS_DEFILEMENT, ...LIENS_ROUTES]

export function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()

  const [estCondensee, setEstCondensee] = useState(false)
  const [idActif, setIdActif] = useState<string | null>(null)

  // Barre de progression de lecture, partagée par les deux affichages.
  const { scrollYProgress } = useScroll()
  const progression = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  useEffect(() => {
    const surDefilement = () => setEstCondensee(window.scrollY > 80)
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
      {/* ══ Desktop : bandeau pleine largeur, indicateur en soulignement ══ */}
      <motion.header
        className="fixed top-0 inset-x-0 z-40 hidden md:block"
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: LUMA_EASE }}
      >
        {/*
          Le flou reste constant et n'est activé que par la classe : animer
          `backdrop-filter` obligeait le navigateur à refiltrer toute la zone
          sous la barre à chaque frame de la transition. Seules les couleurs
          sont animées, via une transition CSS.
        */}
        <div
          className={cn(
            "border-b transition-[background-color,border-color] duration-300 ease-out",
            estCondensee
              ? "bg-background/80 border-border/50 backdrop-blur-lg"
              : "bg-transparent border-transparent"
          )}
        >
          <nav className="max-w-6xl mx-auto h-16 px-6 lg:px-12 flex items-center justify-between gap-8">
            <button
              onClick={gererClicLogo}
              className="font-display text-lg font-bold text-foreground hover:text-accent transition-colors shrink-0 tracking-tight"
            >
              Kimiya
            </button>

            <ul className="flex items-center gap-1">
              {TOUS_LIENS.map(lien => {
                const estActif = idActif === lien.id
                return (
                  <li key={lien.id}>
                    <button
                      onClick={() => gererClicLien(lien)}
                      onMouseEnter={() => gererSurvolLien(lien)}
                      onFocus={() => gererSurvolLien(lien)}
                      aria-current={estActif ? "page" : undefined}
                      className={cn(
                        "relative px-3.5 py-2 text-sm rounded-lg transition-colors duration-150",
                        estActif
                          ? "text-foreground font-semibold"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <span className="relative z-10">{lien.label}</span>
                      {estActif && (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute left-3.5 right-3.5 -bottom-0.5 h-[2px] rounded-full bg-accent"
                          transition={{ type: "spring", stiffness: 400, damping: 34 }}
                        />
                      )}
                    </button>
                  </li>
                )
              })}
            </ul>

            <div className="shrink-0">
              <ThemeController />
            </div>
          </nav>

          {/* Progression de lecture */}
          <motion.div
            className="h-[2px] origin-left bg-accent/70"
            style={{ scaleX: progression }}
            aria-hidden="true"
          />
        </div>
      </motion.header>

      {/* ══ Mobile : en-tête minimal + barre d'onglets en bas ══ */}
      <motion.header
        className="fixed top-0 inset-x-0 z-40 md:hidden"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: LUMA_EASE }}
      >
        <div
          className={cn(
            "border-b transition-[background-color,border-color] duration-300 ease-out",
            estCondensee
              ? "bg-background/85 border-border/50 backdrop-blur-lg"
              : "bg-transparent border-transparent"
          )}
        >
          <div className="h-14 px-5 flex items-center justify-between">
            <button
              onClick={gererClicLogo}
              className="font-display text-base font-bold text-foreground tracking-tight"
            >
              Kimiya
            </button>
            <ThemeController />
          </div>
          <motion.div
            className="h-[2px] origin-left bg-accent/70"
            style={{ scaleX: progression }}
            aria-hidden="true"
          />
        </div>
      </motion.header>

      {/*
        Barre d'onglets : cinq colonnes de largeur égale et libellés toujours
        visibles. L'ancienne version n'affichait le libellé que sur l'onglet
        actif, ce qui faisait sauter la largeur des voisins à chaque défilement.
      */}
      <nav
        className="fixed bottom-0 inset-x-0 z-40 md:hidden border-t border-border/60 bg-background/85 backdrop-blur-xl"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
        aria-label="Navigation principale"
      >
        <ul className="grid grid-cols-5">
          {TOUS_LIENS.map((lien) => {
            const Icone = lien.icon
            const estActif = idActif === lien.id
            return (
              <li key={lien.id}>
                <button
                  onClick={() => gererClicLien(lien)}
                  onTouchStart={() => gererSurvolLien(lien)}
                  aria-current={estActif ? "page" : undefined}
                  className="relative w-full h-16 flex flex-col items-center justify-center gap-1 px-1"
                >
                  {estActif && (
                    <motion.span
                      layoutId="nav-tab-actif"
                      className="absolute top-0 inset-x-4 h-[2px] rounded-full bg-accent"
                      transition={{ type: "spring", stiffness: 400, damping: 34 }}
                    />
                  )}
                  <Icone
                    className={cn(
                      "w-[18px] h-[18px] shrink-0 transition-colors duration-150",
                      estActif ? "text-accent" : "text-muted-foreground"
                    )}
                    aria-hidden="true"
                  />
                  <span
                    className={cn(
                      "text-[10px] leading-none tracking-tight truncate max-w-full transition-colors duration-150",
                      estActif ? "text-accent font-bold" : "text-muted-foreground font-medium"
                    )}
                  >
                    {lien.label}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </nav>
    </>
  )
}
