import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react"
import { cn } from "@/lib/utils"

/**
 * Bande de logos qui défile sans fin, inspirée de `LogoLoop` (React Bits),
 * réduite à ce dont le site a besoin :
 * - vitesse qui ralentit en douceur au survol (ou au focus clavier) au lieu de
 *   s'arrêter net, et repart de même ;
 * - glisser à la souris ou au doigt, avec un élan qui retombe sur la vitesse
 *   de croisière ;
 * - logos en gris tant qu'on ne les survole pas, grossis et légendés au survol ;
 * - fondu aux deux bouts par masque, donc sur n'importe quel fond.
 *
 * Le défilement est piloté en `requestAnimationFrame` et écrit directement le
 * `transform` de la piste : aucun rendu React par image. Il s'arrête quand la
 * bande sort de l'écran ou que l'onglet est caché. Sous « réduire les
 * animations », la bande reste immobile et se fait défiler à la main.
 */

export type Logo = { src: string; titre: string; classeImage?: string }

const AMORTI_VITESSE = 0.25 // s : temps de réponse du ralenti au survol
const AMORTI_ELAN = 0.8 // s : temps que met un lancer à retomber sur la croisière
const SEUIL_GLISSER = 6 // px avant qu'un appui devienne un glisser
const ELAN_MAX = 4000 // px/s

export function LogoLoop({
  logos,
  vitesse = 40,
  vitesseSurvol = 0,
  hauteurLogo = 28,
  ecart = 48,
  onClic,
  ariaLabel,
  className,
}: {
  logos: Logo[]
  /** Pixels par seconde, vers la gauche. */
  vitesse?: number
  /** Vitesse visée au survol : 0 pour s'arrêter en douceur. */
  vitesseSurvol?: number
  hauteurLogo?: number
  ecart?: number
  onClic?: (index: number) => void
  ariaLabel: string
  className?: string
}) {
  const racineRef = useRef<HTMLDivElement>(null)
  const pisteRef = useRef<HTMLDivElement>(null)
  const sequenceRef = useRef<HTMLUListElement>(null)
  const [copies, setCopies] = useState(2)
  const [reduit] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches)
  // Un glisser vient d'avoir lieu : le clic qui le termine ne doit pas ouvrir de logo.
  const glisseRef = useRef(false)

  // Assez de copies pour couvrir la largeur plus une séquence de marge.
  useLayoutEffect(() => {
    const racine = racineRef.current
    const sequence = sequenceRef.current
    if (!racine || !sequence) return
    const mesurer = () => {
      const largeur = sequence.offsetWidth
      if (largeur > 0) setCopies(Math.max(2, Math.ceil(racine.offsetWidth / largeur) + 2))
    }
    mesurer()
    const observateur = new ResizeObserver(mesurer)
    observateur.observe(racine)
    observateur.observe(sequence)
    return () => observateur.disconnect()
  }, [])

  useEffect(() => {
    const racine = racineRef.current
    const piste = pisteRef.current
    const sequence = sequenceRef.current
    if (!racine || !piste || !sequence || reduit) return

    let decalage = 0
    let vitesseCourante = vitesse
    let survol = false
    let visible = true
    let glisser: { x: number; decalage: number; dernierX: number; dernierT: number; actif: boolean } | null = null
    let elan = false
    let image = 0
    let precedent = performance.now()

    const poser = () => {
      const periode = sequence.offsetWidth + ecart
      if (periode > 0) decalage = ((decalage % periode) + periode) % periode
      piste.style.transform = `translate3d(${-decalage}px, 0, 0)`
    }

    const boucle = (maintenant: number) => {
      const dt = Math.min(0.05, (maintenant - precedent) / 1000)
      precedent = maintenant
      if (!glisser?.actif) {
        const cible = survol ? vitesseSurvol : vitesse
        const tau = elan ? AMORTI_ELAN : AMORTI_VITESSE
        vitesseCourante += (cible - vitesseCourante) * (1 - Math.exp(-dt / tau))
        if (elan && Math.abs(vitesseCourante - cible) < 2) elan = false
        decalage += vitesseCourante * dt
      }
      poser()
      image = visible && !document.hidden ? requestAnimationFrame(boucle) : 0
    }
    const relancer = () => {
      if (image || !visible || document.hidden) return
      precedent = performance.now()
      image = requestAnimationFrame(boucle)
    }

    const observateur = new IntersectionObserver(([entree]) => {
      visible = entree.isIntersecting
      relancer()
    })
    observateur.observe(racine)

    const entrer = () => (survol = true)
    const sortir = () => (survol = false)
    const surFocus = () => (survol = true)
    const surFlou = (e: FocusEvent) => {
      if (!racine.contains(e.relatedTarget as Node)) survol = false
    }

    const appui = (e: PointerEvent) => {
      if (e.button !== 0) return
      glisser = { x: e.clientX, decalage, dernierX: e.clientX, dernierT: performance.now(), actif: false }
      glisseRef.current = false
    }
    const deplacement = (e: PointerEvent) => {
      if (!glisser) return
      const ecartX = e.clientX - glisser.x
      if (!glisser.actif && Math.abs(ecartX) > SEUIL_GLISSER) {
        glisser.actif = true
        glisseRef.current = true
        racine.setPointerCapture(e.pointerId)
      }
      if (!glisser.actif) return
      const t = performance.now()
      const dtGlisser = Math.max(1, t - glisser.dernierT) / 1000
      vitesseCourante = Math.max(-ELAN_MAX, Math.min(ELAN_MAX, -(e.clientX - glisser.dernierX) / dtGlisser))
      glisser.dernierX = e.clientX
      glisser.dernierT = t
      decalage = glisser.decalage - ecartX
    }
    const relache = () => {
      if (glisser?.actif) elan = true
      glisser = null
    }

    racine.addEventListener("pointerenter", entrer)
    racine.addEventListener("pointerleave", sortir)
    racine.addEventListener("focusin", surFocus)
    racine.addEventListener("focusout", surFlou)
    racine.addEventListener("pointerdown", appui)
    racine.addEventListener("pointermove", deplacement)
    racine.addEventListener("pointerup", relache)
    racine.addEventListener("pointercancel", relache)
    document.addEventListener("visibilitychange", relancer)
    relancer()

    return () => {
      cancelAnimationFrame(image)
      observateur.disconnect()
      racine.removeEventListener("pointerenter", entrer)
      racine.removeEventListener("pointerleave", sortir)
      racine.removeEventListener("focusin", surFocus)
      racine.removeEventListener("focusout", surFlou)
      racine.removeEventListener("pointerdown", appui)
      racine.removeEventListener("pointermove", deplacement)
      racine.removeEventListener("pointerup", relache)
      racine.removeEventListener("pointercancel", relache)
      document.removeEventListener("visibilitychange", relancer)
    }
  }, [vitesse, vitesseSurvol, ecart, reduit])

  const style = { "--hauteur-logo": `${hauteurLogo}px`, gap: ecart } as CSSProperties

  return (
    <div
      ref={racineRef}
      role="region"
      aria-label={ariaLabel}
      className={cn(
        "relative select-none [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]",
        reduit ? "overflow-x-auto" : "cursor-grab touch-pan-y overflow-hidden active:cursor-grabbing",
        className
      )}
    >
      <div ref={pisteRef} className="flex w-max will-change-transform" style={style}>
        {Array.from({ length: reduit ? 1 : copies }, (_, copie) => (
          <ul
            key={copie}
            ref={copie === 0 ? sequenceRef : undefined}
            aria-hidden={copie > 0 || undefined}
            className="flex shrink-0 items-start pb-6 pt-3"
            style={{ gap: ecart }}
          >
            {logos.map((logo, index) => (
              <li key={logo.titre} className="shrink-0">
                <button
                  type="button"
                  tabIndex={copie > 0 ? -1 : undefined}
                  draggable={false}
                  onClick={() => {
                    if (glisseRef.current) return
                    onClic?.(index)
                  }}
                  className="group relative flex flex-col items-center rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <img
                    src={logo.src}
                    alt={logo.titre}
                    draggable={false}
                    loading="lazy"
                    className={cn(
                      "h-(--hauteur-logo) w-auto max-w-24 object-contain opacity-55 grayscale transition-[filter,opacity,scale] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-115 group-hover:opacity-100 group-hover:grayscale-0 group-focus-visible:scale-115 group-focus-visible:opacity-100 group-focus-visible:grayscale-0",
                      logo.classeImage
                    )}
                  />
                  {/* Légende au survol, sous le logo. */}
                  <span className="pointer-events-none absolute top-full mt-2 whitespace-nowrap text-[11px] text-muted-foreground opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                    {logo.titre}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}
