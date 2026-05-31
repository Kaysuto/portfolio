import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { User, FolderOpen, Mail, FileText, BookOpen } from "lucide-react"
import { ThemeController } from "./ThemeController"
import { cn } from "@/lib/utils"
import { useNavigate, useLocation } from "react-router-dom"
import { preloadRoute } from "@/routes/lazyRoutes"

// ─── Jetons d'animation ─────────────────────────────────────────────────────
const LUMA_EASE = [0.22, 1, 0.36, 1] as const

// ─── Types & données ─────────────────────────────────────────────────────────
type NavLink = { href: string; id: string; label: string; index: string; icon: React.ElementType }

const LIENS_DEFILEMENT: NavLink[] = [
  { href: "#apropos", id: "apropos", label: "À propos", index: "01", icon: User },
  { href: "#projets", id: "projets", label: "Projets",  index: "02", icon: FolderOpen },
  { href: "#contact", id: "contact", label: "Contact",  index: "03", icon: Mail },
]

const LIENS_ROUTES: NavLink[] = [
  { href: "/cv",  id: "cv",  label: "CV",  index: "04", icon: FileText },
  { href: "/bio", id: "bio", label: "Bio", index: "05", icon: BookOpen },
]

const TOUS_LIENS = [...LIENS_DEFILEMENT, ...LIENS_ROUTES]

// ─── Sous-composants ──────────────────────────────────────────────────────────
const Sep = () => <div className="w-px h-4 bg-border/50 shrink-0" />

// ─── Composant ────────────────────────────────────────────────────────────────
export function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()

  const [estVisible, setEstVisible] = useState(false)
  const [idActif,  setIdActif]  = useState<string | null>(null)

  // Visibilité de la pilule : apparaît après 80 px
  useEffect(() => {
    const surDefilement = () => setEstVisible(window.scrollY > 80)
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
    // Nouvelle tentative pour les sections chargées paresseusement
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

  // ─── Gestionnaires ─────────────────────────────────────────────────────────
  const defilerVers = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }, [])

  const gererClicLien = useCallback((lien: NavLink) => {
    if (lien.href.startsWith("/")) { navigate(lien.href); return }
    if (location.pathname !== "/") {
      sessionStorage.setItem("scrollToSection", lien.id)
      navigate("/")
      return
    }
    defilerVers(lien.id)
  }, [navigate, location.pathname, defilerVers])

  const gererSurvolLien = useCallback((lien: NavLink) => {
    if (lien.href.startsWith("/")) preloadRoute(lien.href)
  }, [])

  const gererClicLogo = useCallback(() => {
    if (location.pathname !== "/") { navigate("/"); return }
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [navigate, location.pathname])


  // ─── Bouton actif partagé ───────────────────────────────────────────────────
  const NavBtn = ({ link }: { link: NavLink }) => {
    const Icone = link.icon
    return (
      <button
        onClick={() => gererClicLien(link)}
        onMouseEnter={() => gererSurvolLien(link)}
        onFocus={() => gererSurvolLien(link)}
        className={cn(
          "relative px-4 py-2 rounded-full text-sm transition-colors duration-150",
          idActif === link.id
            ? "text-foreground font-semibold"
            : "text-muted-foreground hover:bg-foreground/10"
        )}
      >
        {idActif === link.id && (
          <motion.div
            layoutId="nav-active"
            className="absolute inset-0 rounded-full bg-accent/20 ring-1 ring-accent/30"
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
          />
        )}
        <span className="relative z-10 flex items-center gap-1.5 whitespace-nowrap">
          <Icone className="w-3.5 h-3.5 shrink-0" />
          {link.label}
        </span>
      </button>
    )
  }

  // ─── Rendu ──────────────────────────────────────────────────────────────────
  return (
    <>
      {/* ── Pilule desktop ───────────────────────────────────────────────── */}
      <motion.header
        className="fixed top-6 left-1/2 -translate-x-1/2 z-40 hidden md:block"
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: LUMA_EASE }}
      >
        <motion.div
          animate={{
            backgroundColor: estVisible ? "var(--card)" : "transparent",
            borderColor: estVisible ? "color-mix(in oklch, var(--border) 8%, transparent)" : "transparent",
            boxShadow: estVisible ? "0 4px 24px 0 rgba(0,0,0,0.10)" : "none",
            backdropFilter: estVisible ? "blur(20px)" : "blur(0px)",
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="flex items-center gap-4 h-14 px-6 rounded-full border"
        >

              <button
                onClick={gererClicLogo}
                className="font-mono text-base font-semibold text-foreground hover:opacity-60 transition-opacity shrink-0"
              >
                Kaysuto
              </button>

              <Sep />

              <nav className="flex items-center gap-0.5">
                {LIENS_DEFILEMENT.map(lien => <NavBtn key={lien.id} link={lien} />)}
              </nav>

              <Sep />

              <nav className="flex items-center gap-0.5">
                {LIENS_ROUTES.map(lien => <NavBtn key={lien.id} link={lien} />)}
              </nav>

              <Sep />

              <ThemeController />
        </motion.div>
      </motion.header>

      {/* ── Navigation mobile en bas ─────────────────────────────────────── */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 md:hidden">
        <div className="flex items-center gap-1 px-3 py-2 rounded-full bg-background/80 backdrop-blur-xl border border-border/[0.08] shadow-lg">
          {TOUS_LIENS.map((lien) => {
            const Icone = lien.icon
            const estActif = idActif === lien.id
            return (
              <button
                key={lien.id}
                onClick={() => gererClicLien(lien)}
                onTouchStart={() => gererSurvolLien(lien)}
                className="flex flex-col items-center gap-1 px-1 py-1 transition-colors duration-150"
              >
                <div className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-200",
                  estActif ? "bg-foreground/[0.1]" : ""
                )}>
                  <Icone className={cn(
                    "w-4 h-4 transition-colors duration-150 shrink-0",
                    estActif ? "text-accent" : "text-muted-foreground"
                  )} />
                  {estActif && (
                    <span className="text-xs font-semibold text-accent whitespace-nowrap">
                      {lien.label}
                    </span>
                  )}
                </div>
              </button>
            )
          })}
          <div className="w-px h-4 bg-border/50 mx-1 shrink-0" />
          <div className="px-1">
            <ThemeController />
          </div>
        </div>
      </nav>

    </>
  )
}
