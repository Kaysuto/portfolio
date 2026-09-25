import { useState } from "react"
import { motion } from "framer-motion"
import {
  GithubLogo as Github,
  LinkedinLogo as Linkedin,
  TwitchLogo as Twitch,
  YoutubeLogo as Youtube,
} from "@phosphor-icons/react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { preloadRoute } from "@/routes/lazyRoutes"
import {
  GitHubFooterModal,
  LinkedInFooterModal,
  TwitchFooterModal,
  YouTubeFooterModal,
} from "./ui/SocialModals"
import { fadeIn, VIEWPORT } from "@/lib/animations"

/**
 * Aucun réseau n'ouvre son lien directement : chacun passe par l'interstitiel
 * de sortie du site, comme partout ailleurs.
 */
const RESEAUX = [
  { id: "github", label: "GitHub", icon: Github },
  { id: "linkedin", label: "LinkedIn", icon: Linkedin },
  { id: "youtube", label: "YouTube", icon: Youtube },
  { id: "twitch", label: "Twitch", icon: Twitch },
] as const

type IdReseau = (typeof RESEAUX)[number]["id"]

const SECTIONS_ACCUEIL = [
  { id: "apropos", label: "À propos" },
  { id: "stack", label: "Stack" },
  { id: "projets", label: "Projets" },
  { id: "contact", label: "Contact" },
]

const PAGES = [
  { to: "/cv", label: "CV" },
  { to: "/bio", label: "Bio" },
  { to: "/legal-notice", label: "Mentions légales" },
]

const intertitre = "font-mono text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground"
const lien = "text-sm text-muted-foreground hover:text-foreground transition-colors"

export function Footer() {
  const anneeCourante = new Date().getFullYear()
  const [reseauOuvert, setReseauOuvert] = useState<IdReseau | null>(null)
  const fermerModale = () => setReseauOuvert(null)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  /*
    Même trajet que les liens de la barre de navigation : `scrollIntoView` et le
    `scroll-margin-top` des sections. Hors de l'accueil (CV, Bio), la section
    n'existe pas : la cible passe par `scrollToSection`, que la navbar consomme
    une fois revenue sur « / ». Sans ce relais, les liens ne faisaient rien.
  */
  const defilerVersSection = (id: string) => {
    if (pathname !== "/") {
      sessionStorage.setItem("scrollToSection", id)
      navigate("/")
      return
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    /*
      Un pied de page classique, sur toute la largeur et fermé par un filet : il
      termine la page au lieu de flotter dessus comme une carte de plus. Le fond
      opaque arrête la trame animée, qui s'arrête ainsi là où le contenu s'arrête.
    */
    <motion.footer
      className="mt-16 border-t border-border/60 bg-background px-6 lg:px-12"
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={fadeIn}
    >
      <div className="max-w-6xl mx-auto py-12 grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        {/* Identité et réseaux */}
        <div>
          <button
            onClick={() => defilerVersSection("accueil")}
            className="font-display text-xl font-semibold text-foreground tracking-tight leading-none hover:text-accent-texte transition-colors"
            aria-label="Retour en haut de la page d'accueil"
          >
            Kimiya
          </button>
          <p className="mt-3 max-w-xs text-sm/relaxed text-muted-foreground">
            Technicien informatique et développeur fullstack.
          </p>

          <div className="mt-6 flex items-center gap-2">
            {RESEAUX.map(({ id, label, icon: Icone }) => (
              <Button
                key={id}
                variant="outline"
                size="icon"
                aria-label={label}
                onClick={() => setReseauOuvert(id)}
              >
                <Icone className="size-5" />
              </Button>
            ))}
          </div>
        </div>

        {/* Deux colonnes côte à côte même sur mobile : chacune ne tient que
            quelques mots, les empiler allongeait le pied de page pour rien. */}
        <div className="grid grid-cols-2 gap-10 md:contents">
          <nav aria-label="Accueil">
            <h2 className={intertitre}>Accueil</h2>
            <ul className="mt-4 space-y-2.5">
              {SECTIONS_ACCUEIL.map(({ id, label }) => (
                <li key={id}>
                  <button onClick={() => defilerVersSection(id)} className={lien}>
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Pages">
            <h2 className={intertitre}>Pages</h2>
            <ul className="mt-4 space-y-2.5">
              {PAGES.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    onMouseEnter={() => preloadRoute(to)}
                    onFocus={() => preloadRoute(to)}
                    className={lien}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <div className="max-w-6xl mx-auto py-5 border-t border-border/60 text-xs text-muted-foreground">
        <span className="font-mono tabular-nums">© 2015–{anneeCourante}</span> Kimiya · Tous droits réservés
      </div>

      <GitHubFooterModal isOpen={reseauOuvert === "github"} onClose={fermerModale} />
      <LinkedInFooterModal isOpen={reseauOuvert === "linkedin"} onClose={fermerModale} />
      <YouTubeFooterModal isOpen={reseauOuvert === "youtube"} onClose={fermerModale} />
      <TwitchFooterModal isOpen={reseauOuvert === "twitch"} onClose={fermerModale} />
    </motion.footer>
  )
}
