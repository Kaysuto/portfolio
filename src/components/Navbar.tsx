import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, User, FolderOpen, Mail, FileText, BookOpen } from "lucide-react"
import { ThemeController } from "./ThemeController"
import { cn } from "@/lib/utils"
import { useNavigate, useLocation } from "react-router-dom"

// ─── Animation tokens ────────────────────────────────────────────────────────
const LUMA_EASE = [0.22, 1, 0.36, 1] as const

// ─── Types & data ─────────────────────────────────────────────────────────────
type NavLink = { href: string; id: string; label: string; index: string; icon: React.ElementType }

const SCROLL_LINKS: NavLink[] = [
  { href: "#apropos", id: "apropos", label: "À propos", index: "01", icon: User },
  { href: "#projets", id: "projets", label: "Projets",  index: "02", icon: FolderOpen },
  { href: "#contact", id: "contact", label: "Contact",  index: "03", icon: Mail },
]

const ROUTE_LINKS: NavLink[] = [
  { href: "/cv",  id: "cv",  label: "CV",  index: "04", icon: FileText },
  { href: "/bio", id: "bio", label: "Bio", index: "05", icon: BookOpen },
]

const ALL_LINKS = [...SCROLL_LINKS, ...ROUTE_LINKS]

// ─── Sub-components ───────────────────────────────────────────────────────────
const Sep = () => <div className="w-px h-4 bg-border/50 shrink-0" />

// ─── Component ────────────────────────────────────────────────────────────────
export function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()

  const [isVisible, setIsVisible] = useState(false)
  const [activeId,  setActiveId]  = useState<string | null>(null)

  // Pill visibility: appears after 80 px
  useEffect(() => {
    const onScroll = () => setIsVisible(window.scrollY > 80)
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Scroll spy via IntersectionObserver
  useEffect(() => {
    const routeMatch = ROUTE_LINKS.find(l => l.href === location.pathname)
    if (routeMatch) { setActiveId(routeMatch.id); return }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => { if (e.isIntersecting) setActiveId(e.target.id) })
      },
      { rootMargin: "-40% 0px -55% 0px" }
    )
    SCROLL_LINKS.forEach(l => {
      const el = document.getElementById(l.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [location.pathname])

  // Pending scroll after navigation
  useEffect(() => {
    const target = sessionStorage.getItem("scrollToSection")
    if (!target || location.pathname !== "/") return
    setTimeout(() => {
      document.getElementById(target)?.scrollIntoView({ behavior: "smooth" })
      sessionStorage.removeItem("scrollToSection")
    }, 150)
  }, [location.pathname])

  // ─── Handlers ──────────────────────────────────────────────────────────────
  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }, [])

  const handleLinkClick = useCallback((link: NavLink) => {
    if (link.href.startsWith("/")) { navigate(link.href); return }
    if (location.pathname !== "/") {
      sessionStorage.setItem("scrollToSection", link.id)
      navigate("/")
      return
    }
    scrollTo(link.id)
  }, [navigate, location.pathname, scrollTo])

  const handleLogoClick = useCallback(() => {
    if (location.pathname !== "/") { navigate("/"); return }
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [navigate, location.pathname])

  const handleContactClick = useCallback(() => {
    if (location.pathname !== "/") {
      sessionStorage.setItem("scrollToSection", "contact")
      navigate("/")
      return
    }
    scrollTo("contact")
  }, [navigate, location.pathname, scrollTo])

  // ─── Shared pill animation ──────────────────────────────────────────────────
  const pillMotion = {
    initial:    { y: -16, opacity: 0 },
    animate:    { y: 0, opacity: 1 },
    exit:       { y: -16, opacity: 0 },
    transition: { duration: 0.45, ease: LUMA_EASE },
  }

  // ─── Shared active button ───────────────────────────────────────────────────
  const NavBtn = ({ link }: { link: NavLink }) => (
    <button
      onClick={() => handleLinkClick(link)}
      className={cn(
        "relative px-4 py-2 rounded-full text-sm transition-all duration-150",
        activeId === link.id
          ? "text-foreground font-semibold"
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      {activeId === link.id && (
        <motion.div
          layoutId="nav-active"
          className="absolute inset-0 rounded-full bg-foreground/[0.12]"
          transition={{ type: "spring", stiffness: 420, damping: 38 }}
        />
      )}
      <span className="relative z-10">{link.label}</span>
    </button>
  )

  // ─── Render ─────────────────────────────────────────────────────────────────
  return (
    <>
      {/* ── Desktop pill ─────────────────────────────────────────────────── */}
      <motion.header
        className="fixed top-6 left-1/2 -translate-x-1/2 z-40 hidden md:block"
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: LUMA_EASE }}
      >
        <motion.div
          animate={{
            backgroundColor: isVisible ? "color-mix(in oklch, var(--background) 70%, transparent)" : "transparent",
            borderColor: isVisible ? "color-mix(in oklch, var(--border) 8%, transparent)" : "transparent",
            boxShadow: isVisible ? "0 4px 24px 0 rgba(0,0,0,0.10)" : "none",
            backdropFilter: isVisible ? "blur(20px)" : "blur(0px)",
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="flex items-center gap-4 h-14 px-6 rounded-full border"
        >

              <button
                onClick={handleLogoClick}
                className="font-mono text-base font-semibold text-foreground hover:opacity-60 transition-opacity shrink-0"
              >
                Kaysuto
              </button>

              <Sep />

              <nav className="flex items-center gap-0.5">
                {SCROLL_LINKS.map(l => <NavBtn key={l.id} link={l} />)}
              </nav>

              <Sep />

              <nav className="flex items-center gap-0.5">
                {ROUTE_LINKS.map(l => <NavBtn key={l.id} link={l} />)}
              </nav>

              <Sep />

              <ThemeController />

              <button
                onClick={() => handleContactClick()}
                className="flex items-center gap-1.5 h-9 px-5 rounded-full bg-accent text-background text-sm font-medium hover:opacity-75 transition-opacity shrink-0 ring-1 ring-accent/60"
              >
                Me contacter
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
        </motion.div>
      </motion.header>

      {/* ── Mobile bottom nav ────────────────────────────────────────────── */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 md:hidden">
        <div className="flex items-center gap-1 px-3 py-2 rounded-full bg-background/80 backdrop-blur-xl border border-border/[0.08] shadow-lg">
          {ALL_LINKS.map((link) => {
            const Icon = link.icon
            const isActive = activeId === link.id
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link)}
                className="flex flex-col items-center gap-1 px-1 py-1 transition-colors duration-150"
              >
                <div className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-200",
                  isActive ? "bg-foreground/[0.1]" : ""
                )}>
                  <Icon className={cn(
                    "w-4 h-4 transition-colors duration-150 shrink-0",
                    isActive ? "text-accent" : "text-muted-foreground"
                  )} />
                  {isActive && (
                    <span className="text-xs font-semibold text-accent whitespace-nowrap">
                      {link.label}
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
