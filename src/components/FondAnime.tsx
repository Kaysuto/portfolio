import { useEffect, useRef } from 'react'

/**
 * Couche de fond posée sous toute la page : une trame de points qui se déforme
 * au passage du curseur, plus un grain qui casse les bandes de dégradé — une
 * palette à faible chroma les rend particulièrement visibles sur les grandes
 * surfaces.
 *
 * Pourquoi un canvas et non un `background-image` répété comme avant : une
 * trame CSS est une seule image, ses points n'existent pas individuellement et
 * rien ne peut en bouger un sans bouger tous les autres. Le seul effet qu'on
 * puisse en tirer au survol est un masque qui les révèle — c'est-à-dire un
 * projecteur, pas des points animés. Un point qui s'écarte, grossit et change
 * de couleur selon sa distance au curseur demande de les traiter un par un.
 *
 * Les couleurs sont lues sur les tokens (`--foreground`, `--accent`), donc la
 * trame suit le thème et n'importe quelle palette sans modification. Elles sont
 * relues sur l'événement `themeChange` émis par `lib/theme.ts`.
 */

/** Pas de la trame, en pixels CSS. Multiple de l'échelle d'espacement du site. */
const PAS = 26
/** Rayon d'influence du curseur. Au-delà, un point est au repos. */
const RAYON = 150
/** Écartement maximal d'un point, au centre de l'influence. */
const POUSSEE = 11
/**
 * Côté d'un point, en pixels CSS : au repos, puis le gain maximal au centre de
 * l'influence. Des carrés et non des disques — un disque de rayon 1 px est
 * étalé par l'anticrénelage sur les quatre pixels qu'il chevauche, et n'en
 * atteint aucun à plus de 40 % de son opacité : à 16 % demandés, il en reste
 * 6 % à l'écran, c'est-à-dire rien. Posé sur des coordonnées entières, un carré
 * de 1 px allume exactement un pixel à l'opacité demandée.
 */
const TAILLE_REPOS = 1
const TAILLE_GAIN = 3.4
/** Opacité d'un point au repos, puis au centre de l'influence. */
const OPACITE_REPOS = 0.34
const OPACITE_REPOS_SOMBRE = 0.26
const OPACITE_ACTIVE = 0.9
/** Lissage du suivi : part du chemin parcourue à chaque frame. */
const LISSAGE = 0.16

export function FondAnime() {
  const refCanvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = refCanvas.current
    if (!canvas) return
    const contexte = canvas.getContext('2d')
    if (!contexte) return

    const mouvementReduit = window.matchMedia('(prefers-reduced-motion: reduce)')
    const pointeurFin = window.matchMedia('(pointer: fine)')

    // Positions de la trame, en pixels CSS. Un seul tableau réutilisé d'une
    // frame à l'autre : recalculer la grille à chaque dessin allouerait
    // plusieurs milliers de nombres soixante fois par seconde.
    let points = new Float32Array(0)
    let largeur = 0
    let hauteur = 0

    let couleurRepos = '#000'
    let couleurActive = '#000'
    let opaciteRepos = OPACITE_REPOS

    // Position lissée du curseur, sa cible, et l'intensité de l'effet — cette
    // dernière retombe à zéro quand le curseur quitte la fenêtre, ce qui rend
    // la trame au repos en douceur au lieu de la figer déformée.
    let x = -9999
    let y = -9999
    let cibleX = -9999
    let cibleY = -9999
    let intensite = 0
    let cibleIntensite = 0
    let frame = 0

    /** Relit les couleurs sur les tokens du thème courant. */
    const lireCouleurs = () => {
      const lire = (expression: string) => {
        canvas.style.color = expression
        return getComputedStyle(canvas).color
      }
      couleurRepos = lire('var(--foreground)')
      couleurActive = lire('var(--accent)')
      canvas.style.color = ''
      opaciteRepos = document.documentElement.classList.contains('dark')
        ? OPACITE_REPOS_SOMBRE
        : OPACITE_REPOS
    }

    /** Recalcule la taille du canvas et les positions de la trame. */
    const mesurer = () => {
      largeur = window.innerWidth
      hauteur = window.innerHeight
      // Plafonné à 2 : au-delà, le nombre de pixels à peindre double encore
      // pour un gain invisible sur des points d'un pixel.
      const densite = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(largeur * densite)
      canvas.height = Math.round(hauteur * densite)
      contexte.setTransform(densite, 0, 0, densite, 0, 0)

      const colonnes = Math.ceil(largeur / PAS) + 1
      const lignes = Math.ceil(hauteur / PAS) + 1
      points = new Float32Array(colonnes * lignes * 2)
      let i = 0
      for (let ligne = 0; ligne < lignes; ligne++) {
        for (let colonne = 0; colonne < colonnes; colonne++) {
          points[i++] = colonne * PAS
          points[i++] = ligne * PAS
        }
      }
    }

    const RAYON_CARRE = RAYON * RAYON
    // Indices des points sous influence, réutilisé d'une frame à l'autre.
    let actifs = new Int32Array(1024)

    const dessiner = () => {
      contexte.clearRect(0, 0, largeur, hauteur)

      // Deux passes. Celle-ci trace tous les points au repos : même couleur,
      // même opacité, même taille, donc un seul réglage d'état pour plusieurs
      // milliers de `fillRect`. C'est la passe qui domine le coût, et c'est
      // celle qui ne change jamais.
      contexte.globalAlpha = opaciteRepos
      contexte.fillStyle = couleurRepos
      let nombreActifs = 0
      for (let i = 0; i < points.length; i += 2) {
        const px = points[i]
        const py = points[i + 1]
        const dx = px - x
        const dy = py - y
        if (intensite > 0.001 && dx * dx + dy * dy < RAYON_CARRE) {
          if (nombreActifs === actifs.length) {
            const agrandi = new Int32Array(actifs.length * 2)
            agrandi.set(actifs)
            actifs = agrandi
          }
          actifs[nombreActifs++] = i
          continue
        }
        contexte.fillRect(px, py, TAILLE_REPOS, TAILLE_REPOS)
      }

      // Seconde passe : les points sous influence. Chacun a son opacité et sa
      // taille, donc chacun son appel — mais ils sont quelques dizaines, pas
      // quelques milliers, et c'est tout l'intérêt de les avoir séparés.
      contexte.fillStyle = couleurActive
      for (let n = 0; n < nombreActifs; n++) {
        const i = actifs[n]
        const px = points[i]
        const py = points[i + 1]
        const dx = px - x
        const dy = py - y
        const distance = Math.hypot(dx, dy) || 0.001
        // Quadratique plutôt que linéaire : le relief se concentre sous le
        // curseur au lieu de s'étaler en une bosse molle sur tout le rayon.
        const proximite = (1 - distance / RAYON) ** 2 * intensite
        const ecart = proximite * POUSSEE
        const cote = TAILLE_REPOS + TAILLE_GAIN * proximite
        // Le carré grandit depuis son centre, sinon la trame se décalerait vers
        // le bas à droite au lieu de respirer sur place.
        const decalage = (cote - TAILLE_REPOS) / 2
        contexte.globalAlpha = opaciteRepos + (OPACITE_ACTIVE - opaciteRepos) * proximite
        contexte.fillRect(
          px + (dx / distance) * ecart - decalage,
          py + (dy / distance) * ecart - decalage,
          cote,
          cote
        )
      }
      contexte.globalAlpha = 1
    }

    /**
     * Boucle d'animation. Elle s'arrête d'elle-même dès que la trame a rejoint
     * son état cible : un `requestAnimationFrame` permanent réveillerait le fil
     * principal soixante fois par seconde pour redessiner une image identique,
     * et viderait la batterie d'un portable resté sur la page.
     */
    const avancer = () => {
      x += (cibleX - x) * LISSAGE
      y += (cibleY - y) * LISSAGE
      intensite += (cibleIntensite - intensite) * LISSAGE
      dessiner()

      const stable =
        Math.abs(cibleX - x) < 0.5 &&
        Math.abs(cibleY - y) < 0.5 &&
        Math.abs(cibleIntensite - intensite) < 0.005
      if (stable) {
        x = cibleX
        y = cibleY
        intensite = cibleIntensite
        frame = 0
        dessiner()
        return
      }
      frame = requestAnimationFrame(avancer)
    }

    const relancer = () => {
      if (!frame) frame = requestAnimationFrame(avancer)
    }

    const surDeplacement = (evenement: PointerEvent) => {
      // Première entrée dans la fenêtre : on pose la trame directement sous le
      // curseur plutôt que de la faire glisser depuis sa position d'attente,
      // hors écran — sinon une vague traverse la page à chaque retour de souris.
      if (cibleIntensite === 0) {
        x = evenement.clientX
        y = evenement.clientY
      }
      cibleX = evenement.clientX
      cibleY = evenement.clientY
      cibleIntensite = 1
      relancer()
    }

    const surSortie = () => {
      cibleIntensite = 0
      relancer()
    }

    const surRedimensionnement = () => {
      mesurer()
      dessiner()
    }

    const surChangementTheme = () => {
      lireCouleurs()
      dessiner()
    }

    lireCouleurs()
    mesurer()
    dessiner()

    window.addEventListener('resize', surRedimensionnement)
    window.addEventListener('themeChange', surChangementTheme)

    // Le suivi du curseur n'est installé que là où il a un sens : sur un écran
    // tactile il n'y a pas de curseur, et sous `prefers-reduced-motion` une
    // trame qui poursuit la souris est exactement le mouvement que ce réglage
    // demande d'éviter. Dans les deux cas la trame reste, dessinée au repos.
    const suivre = pointeurFin.matches && !mouvementReduit.matches
    if (suivre) {
      window.addEventListener('pointermove', surDeplacement, { passive: true })
      document.addEventListener('pointerleave', surSortie)
    }

    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('resize', surRedimensionnement)
      window.removeEventListener('themeChange', surChangementTheme)
      if (suivre) {
        window.removeEventListener('pointermove', surDeplacement)
        document.removeEventListener('pointerleave', surSortie)
      }
    }
  }, [])

  return (
    <div className="fond-anime" aria-hidden="true">
      <canvas className="fond-trame" ref={refCanvas} />
      <div className="fond-grain" />
    </div>
  )
}
