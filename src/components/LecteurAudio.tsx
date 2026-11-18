import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { Music2, Pause, Play, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react"
import { PLAYLIST, type Piste } from "@/data/musique"
import {
  analyserParoles,
  fenetresDesMots,
  indexLigneCourante,
  AUCUNE_PAROLE,
  type LigneParole,
  type Paroles,
} from "@/lib/lrc"
import { EASE_OUT } from "@/lib/animations"
import { cn } from "@/lib/utils"
import { useLangue } from "@/lib/langue"

const CLE_STOCKAGE = "kimiya-lecteur-v1"

type EtatPersiste = { index: number; volume: number; ouvert: boolean }

const ETAT_PAR_DEFAUT: EtatPersiste = { index: 0, volume: 0.8, ouvert: false }

/** Relit l'état du lecteur ; toute anomalie de stockage retombe sur les valeurs par défaut. */
function lireEtat(): EtatPersiste {
  try {
    const brut = localStorage.getItem(CLE_STOCKAGE)
    if (!brut) return ETAT_PAR_DEFAUT
    const parse = JSON.parse(brut) as Partial<EtatPersiste>
    return {
      index: Math.min(Math.max(parse.index ?? 0, 0), PLAYLIST.length - 1),
      volume: Math.min(Math.max(parse.volume ?? 0.8, 0), 1),
      ouvert: parse.ouvert === true,
    }
  } catch {
    return ETAT_PAR_DEFAUT
  }
}

const formaterTemps = (secondes: number) => {
  if (!Number.isFinite(secondes) || secondes < 0) return "0:00"
  const m = Math.floor(secondes / 60)
  const s = Math.floor(secondes % 60)
  return `${m}:${String(s).padStart(2, "0")}`
}

/**
 * Pochette de la piste, avec repli sur son monogramme.
 *
 * L'échec est mémorisé par identifiant de piste plutôt que par un booléen
 * remis à zéro dans un effet : changer de titre suffit à réessayer, et un
 * fichier manquant ne laisse jamais l'icône d'image cassée du navigateur.
 */
function Pochette({ piste }: { piste: Piste }) {
  const [pisteEnEchec, setPisteEnEchec] = useState<string | null>(null)

  if (piste.pochette && pisteEnEchec !== piste.id) {
    return (
      <img
        src={piste.pochette}
        alt=""
        aria-hidden="true"
        onError={() => setPisteEnEchec(piste.id)}
        className="size-12 shrink-0 rounded-md object-cover border border-border"
      />
    )
  }

  return (
    <span
      aria-hidden="true"
      className="grid size-12 shrink-0 place-items-center rounded-md border border-border bg-input/30 font-display text-lg font-semibold text-accent-texte"
    >
      {piste.titre.trim().charAt(0).toUpperCase()}
    </span>
  )
}

/**
 * Mots d'un vers, dans l'ordre où ils seront allumés.
 *
 * Le découpage vient du fichier quand il est horodaté au mot, pour que les
 * `<span>` rendus correspondent un pour un aux fenêtres de `fenetresDesMots`.
 * Un vers absent rend une espace insécable de garde : la zone de paroles ne
 * doit pas changer de hauteur entre deux phrases.
 */
function decouperEnMots(ligne: LigneParole | undefined): string[] {
  if (ligne?.mots?.length) return ligne.mots.map((mot) => mot.texte)
  const texte = ligne?.texte?.trim()
  // `" ".split(" ")` rend deux chaînes vides, donc deux `<span>` fantômes sur
  // les repères de silence : on rend l'espace de garde telle quelle.
  return texte ? texte.split(/\s+/) : [" "]
}

/**
 * La platine : un îlot flottant en bas à gauche, du même vocabulaire que la
 * barre de navigation et le pied de page (`surface-flottante`, coins arrondis,
 * filet d'accent sur l'arête). Replié, il tient en une ligne ; déplié, il
 * ouvre pochette, molette de lecture, volume et sommaire des pistes.
 *
 * Le composant est monté par `Layout`, au-dessus des routes : c'est ce qui
 * permet à un morceau de continuer pendant qu'on passe de l'accueil au CV. Le
 * remonter à l'intérieur d'une page couperait le son à chaque navigation.
 */
function Platine() {
  const [etatInitial] = useState(lireEtat)
  const [index, setIndex] = useState(etatInitial.index)
  const [volume, setVolume] = useState(etatInitial.volume)
  const [ouvert, setOuvert] = useState(etatInitial.ouvert)
  const [muet, setMuet] = useState(false)
  const [enLecture, setEnLecture] = useState(false)
  const [temps, setTemps] = useState(0)
  const [duree, setDuree] = useState(0)
  const [erreur, setErreur] = useState(false)
  /*
    Les paroles sont mémorisées avec l'identifiant de leur piste plutôt que
    remises à zéro à chaque changement de titre : ça évite un rendu
    intermédiaire, et surtout une réponse arrivée en retard ne peut pas coller
    les paroles d'un morceau sur un autre.
  */
  const [parolesChargees, setParolesChargees] = useState<{
    id: string
    contenu: Paroles
  } | null>(null)

  const [rangParole, setRangParole] = useState(-1)

  const refAudio = useRef<HTMLAudioElement>(null)
  const refLigneActive = useRef<HTMLSpanElement>(null)
  const refListeParoles = useRef<HTMLDivElement>(null)
  // Instant du dernier défilement à la main : le suivi automatique s'efface 3 s.
  const refDefilementManuel = useRef(0)
  const refCanvas = useRef<HTMLCanvasElement>(null)
  const refGraphe = useRef<{ contexte: AudioContext; analyseur: AnalyserNode } | null>(null)
  const mouvementReduit = useReducedMotion()
  const { t } = useLangue()

  const piste = PLAYLIST[index]

  useEffect(() => {
    try {
      localStorage.setItem(CLE_STOCKAGE, JSON.stringify({ index, volume, ouvert }))
    } catch {
      // Navigation privée, quota plein : le lecteur marche très bien sans mémoire.
    }
  }, [index, volume, ouvert])

  useEffect(() => {
    const audio = refAudio.current
    if (audio) audio.volume = muet ? 0 : volume
  }, [volume, muet])

  /*
    Le graphe Web Audio n'existe qu'à partir de la première lecture : le
    construire au montage créerait un `AudioContext` suspendu chez tous les
    visiteurs, y compris ceux qui n'appuieront jamais sur lecture. Il doit être
    (ré)activé dans le geste de l'utilisateur, sans quoi Chrome le laisse
    suspendu et l'égaliseur reste plat.
  */
  const activerGraphe = useCallback(async () => {
    const audio = refAudio.current
    if (!audio) return

    if (!refGraphe.current) {
      const Constructeur = window.AudioContext
      if (!Constructeur) return
      try {
        const contexte = new Constructeur()
        const source = contexte.createMediaElementSource(audio)
        const analyseur = contexte.createAnalyser()
        analyseur.fftSize = 128
        analyseur.smoothingTimeConstant = 0.82
        source.connect(analyseur)
        analyseur.connect(contexte.destination)
        refGraphe.current = { contexte, analyseur }
      } catch {
        // Pas d'égaliseur, mais le son doit continuer de sortir.
        return
      }
    }

    if (refGraphe.current.contexte.state === "suspended") {
      await refGraphe.current.contexte.resume()
    }
  }, [])

  const basculerLecture = useCallback(async () => {
    const audio = refAudio.current
    if (!audio) return

    if (audio.paused) {
      await activerGraphe()
      try {
        await audio.play()
      } catch {
        setErreur(true)
      }
    } else {
      audio.pause()
    }
  }, [activerGraphe])

  const allerA = useCallback((delta: number) => {
    setErreur(false)
    setTemps(0)
    setDuree(0)
    setIndex((precedent) => (precedent + delta + PLAYLIST.length) % PLAYLIST.length)
  }, [])

  const choisirPiste = useCallback((cible: number) => {
    setErreur(false)
    setTemps(0)
    setDuree(0)
    setIndex(cible)
  }, [])

  /*
    Changement de piste : `<audio src>` étant piloté par React, le navigateur
    recharge la source tout seul. Il ne reste qu'à relancer si on était déjà en
    lecture — et surtout à ne rien lancer au montage, où `enLecture` est faux :
    aucune lecture automatique, ni ici ni ailleurs.
  */
  useEffect(() => {
    const audio = refAudio.current
    if (!audio || !enLecture) return
    audio.play().catch(() => setErreur(true))
    // `enLecture` est volontairement hors des dépendances : cet effet réagit au
    // changement de piste, pas à la mise en pause.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index])

  /*
    Égaliseur.

    Il remplace la note du bouton rond pendant la lecture : trois barres larges
    dans 20 px, une silhouette qu'on reconnaît du coin de l'œil, ce qui est
    tout ce qu'on demande à un témoin de lecture.

    Chaque barre moyenne une bande de fréquences au lieu d'échantillonner un
    seul bin — sans cette moyenne, la barre sautait au gré d'une harmonique
    isolée. Et l'effet dessine aussi l'état au repos : sans lui, la dernière
    image restait figée à l'écran après une pause.
  */
  useEffect(() => {
    const canvas = refCanvas.current
    if (!canvas) return

    const contexte2d = canvas.getContext("2d")
    if (!contexte2d) return

    const densite = window.devicePixelRatio || 1
    const largeur = canvas.clientWidth
    const hauteur = canvas.clientHeight
    canvas.width = largeur * densite
    canvas.height = hauteur * densite
    contexte2d.scale(densite, densite)

    // `currentColor` suit le thème ; la couleur est lue une fois, pas par image.
    const couleur = getComputedStyle(canvas).color
    const nombreBarres = 3
    const ecart = 2.5
    const largeurBarre = (largeur - ecart * (nombreBarres - 1)) / nombreBarres
    const rayon = largeurBarre / 2
    const socle = 2.5

    const barre = (rang: number, hauteurBarre: number) => {
      const x = rang * (largeurBarre + ecart)
      const y = (hauteur - hauteurBarre) / 2
      if (typeof contexte2d.roundRect === "function") {
        contexte2d.beginPath()
        contexte2d.roundRect(x, y, largeurBarre, hauteurBarre, rayon)
        contexte2d.fill()
      } else {
        contexte2d.fillRect(x, y, largeurBarre, hauteurBarre)
      }
    }

    const dessinerRepos = () => {
      contexte2d.clearRect(0, 0, largeur, hauteur)
      contexte2d.fillStyle = couleur
      contexte2d.globalAlpha = 0.35
      for (let i = 0; i < nombreBarres; i++) barre(i, socle)
      contexte2d.globalAlpha = 1
    }

    const graphe = refGraphe.current
    if (!enLecture || !graphe || mouvementReduit) {
      dessinerRepos()
      return
    }

    const donnees = new Uint8Array(graphe.analyseur.frequencyBinCount)
    // Les aigus d'un morceau compressé sont quasi plats : on ne lit que le bas
    // du spectre, là où il se passe réellement quelque chose.
    const binsUtiles = Math.floor(donnees.length * 0.5)
    const parBande = Math.max(1, Math.floor(binsUtiles / nombreBarres))
    let image = 0

    const dessiner = () => {
      graphe.analyseur.getByteFrequencyData(donnees)
      contexte2d.clearRect(0, 0, largeur, hauteur)
      contexte2d.fillStyle = couleur

      for (let i = 0; i < nombreBarres; i++) {
        let somme = 0
        for (let j = 0; j < parBande; j++) somme += donnees[i * parBande + j]
        const moyenne = somme / parBande / 255
        barre(i, Math.max(socle, moyenne * hauteur))
      }

      image = requestAnimationFrame(dessiner)
    }

    dessiner()
    return () => cancelAnimationFrame(image)
  }, [enLecture, mouvementReduit])

  /*
    Paroles : le `.lrc` n'est chargé qu'à l'arrivée sur la piste, et la requête
    est annulée si on change de titre avant la fin — sinon deux réponses en vol
    peuvent se croiser et afficher les paroles du morceau précédent.
  */
  useEffect(() => {
    const fichier = piste.paroles
    if (!fichier) return

    const controleur = new AbortController()
    fetch(fichier, { signal: controleur.signal })
      .then((reponse) => (reponse.ok ? reponse.text() : Promise.reject(new Error("introuvable"))))
      .then((texte) => setParolesChargees({ id: piste.id, contenu: analyserParoles(texte) }))
      .catch(() => {
        // Fichier absent ou requête annulée : le panneau se passe de paroles.
      })

    return () => controleur.abort()
  }, [piste])

  const paroles = useMemo(
    () => (parolesChargees?.id === piste.id ? parolesChargees.contenu : AUCUNE_PAROLE),
    [parolesChargees, piste.id]
  )

  useEffect(() => {
    const liste = refListeParoles.current
    const active = liste?.querySelector<HTMLElement>('[aria-current="true"]')
    if (!liste || !active || Date.now() - refDefilementManuel.current < 3000) return
    liste.scrollTo({
      top: active.offsetTop - liste.clientHeight / 2 + active.offsetHeight / 2,
      behavior: mouvementReduit ? "auto" : "smooth",
    })
  }, [rangParole, mouvementReduit])

  /*
    Synchronisation des paroles.

    Le rang de la ligne était calculé depuis l'état `temps`, mis à jour par
    l'événement `timeupdate` — soit environ quatre fois par seconde. Sur du
    karaoké, un quart de seconde de retard se voit. Cette boucle lit
    `currentTime` à chaque image : elle ne déclenche un rendu que lorsque la
    ligne change, et écrit le remplissage directement sur le nœud.

    Elle ne tourne que panneau ouvert et paroles horodatées ; en pause, la
    lecture de `currentTime` est stable, donc rien ne bouge et aucun rendu
    n'est déclenché — mais un déplacement dans la piste reste suivi.

    Le remplissage est écrit mot par mot, et non en un seul dégradé sur le vers.
    Un dégradé horizontal s'étale sur toute la boîte : dès qu'un vers passe à la
    ligne dans un quai de 19 rem, la fin de la deuxième ligne s'allume avant le
    milieu de la première. Mot par mot, le balayage suit le texte où qu'il
    retombe — et il suit l'horodatage du fichier plutôt qu'une cadence
    théorique, ce qui est tout l'intérêt d'un `.lrc` horodaté au mot.
  */
  useEffect(() => {
    if (!ouvert || !paroles.synchronise) return
    const audio = refAudio.current
    if (!audio) return

    let image = 0
    let dernierRang = Number.NaN
    let fenetres: Array<[number, number]> = []
    let rangDesFenetres = Number.NaN

    // Le son sort du graphe Web Audio avec un léger retard sur `currentTime`
    // (latence de sortie, 20 à 50 ms selon la machine) : les paroles suivent
    // ce qu'on entend, pas ce que le décodeur vient de lire.
    const contexte = refGraphe.current?.contexte
    const latence = contexte ? (contexte.outputLatency || 0) + (contexte.baseLatency || 0) : 0

    const suivre = () => {
      const instant = Math.max(0, audio.currentTime - latence)
      const rang = indexLigneCourante(paroles.lignes, instant)

      if (rang !== dernierRang) {
        dernierRang = rang
        setRangParole(rang)
      }

      const noeud = refLigneActive.current
      if (noeud && rang >= 0) {
        const mots = noeud.children

        // Les fenêtres sont recalculées au changement de vers, pas par image.
        // Le test sur le nombre de mots rattrape l'image où le rang a déjà
        // avancé mais où React n'a pas encore remonté les `<span>`.
        if (rangDesFenetres !== rang || fenetres.length !== mots.length) {
          rangDesFenetres = rang
          fenetres = fenetresDesMots(
            paroles.lignes,
            rang,
            Array.from(mots, (mot) => mot.textContent?.trim().length ?? 0),
            audio.duration
          )
        }

        for (let i = 0; i < mots.length; i++) {
          const [ouverture, fermeture] = fenetres[i] ?? [0, 0]
          const local = mouvementReduit
            ? 1
            : Math.min(
                1,
                Math.max(0, (instant - ouverture) / Math.max(0.05, fermeture - ouverture))
              )
          const pourcentage = `${(local * 100).toFixed(1)}%`
          ;(mots[i] as HTMLElement).style.backgroundImage =
            `linear-gradient(90deg, var(--parole-remplie) ${pourcentage}, var(--parole-vide) ${pourcentage})`
        }
      }

      image = requestAnimationFrame(suivre)
    }

    suivre()
    return () => cancelAnimationFrame(image)
  }, [ouvert, paroles, mouvementReduit])

  /* Commandes du système (touches média du clavier, écran verrouillé, casque). */
  useEffect(() => {
    if (!("mediaSession" in navigator)) return

    navigator.mediaSession.metadata = new MediaMetadata({
      title: piste.titre,
      artist: piste.artiste ?? "",
      artwork: piste.pochette ? [{ src: piste.pochette }] : [],
    })

    navigator.mediaSession.setActionHandler("play", () => void basculerLecture())
    navigator.mediaSession.setActionHandler("pause", () => void basculerLecture())
    navigator.mediaSession.setActionHandler(
      "previoustrack",
      PLAYLIST.length > 1 ? () => allerA(-1) : null
    )
    navigator.mediaSession.setActionHandler(
      "nexttrack",
      PLAYLIST.length > 1 ? () => allerA(1) : null
    )
  }, [piste, basculerLecture, allerA])

  const deplacerLecture = (valeur: number) => {
    const audio = refAudio.current
    if (!audio) return
    audio.currentTime = valeur
    setTemps(valeur)
  }

  return (
    <div
      className="fixed left-3 md:left-4 md:!bottom-5 z-30"
      style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 5.75rem)" }}
    >
      {/*
        Le panneau complet (pochette, paroles, réglages, liste) est une carte
        posée au-dessus de la pastille : il s'ouvre depuis elle, coin bas
        gauche, sans que la pastille change de taille.
      */}
      <AnimatePresence initial={false}>
        {ouvert && (
          <motion.div
            key="panneau"
            id="lecteur-panneau"
            initial={mouvementReduit ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={mouvementReduit ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.2, ease: EASE_OUT }}
            className="absolute bottom-full left-0 mb-2 w-[min(19rem,calc(100vw-1.5rem))] origin-bottom-left overflow-hidden rounded-2xl surface-flottante"
          >
              <div className="max-h-[calc(100dvh-12rem)] overflow-y-auto overscroll-contain p-4">
                <div className="flex items-center gap-3">
                  <Pochette piste={piste} />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground tracking-tight">
                      {piste.titre}
                    </p>
                    {(erreur || piste.artiste) && (
                      <p className="truncate font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                        {erreur ? t("Piste indisponible", "Track unavailable") : piste.artiste}
                      </p>
                    )}
                  </div>
                </div>

                {/*
                  Toutes les paroles, comme sur Spotify : la ligne en cours en
                  clair et centrée, les passées atténuées, les suivantes plus
                  encore. Un clic sur une ligne y amène la lecture, ce qui
                  permet aussi de vérifier la synchronisation vers par vers.

                  `aria-live` est volontairement à « off » : une phrase relue par
                  le lecteur d'écran toutes les quatre secondes rendrait le reste
                  du site inaudible.
                */}
                {paroles.lignes.length > 0 && (
                  <div className="mt-4 border-t border-border/60 pt-3" aria-live="off">
                    {paroles.synchronise ? (
                      <div
                        ref={refListeParoles}
                        onWheel={() => (refDefilementManuel.current = Date.now())}
                        onTouchMove={() => (refDefilementManuel.current = Date.now())}
                        className="relative h-44 overflow-y-auto overscroll-contain [mask-image:linear-gradient(transparent,black_18%,black_82%,transparent)] [scrollbar-width:none]"
                      >
                        {/* Marges hautes et basses : la première et la dernière ligne peuvent aussi se centrer. */}
                        <div className="py-16">
                          {paroles.lignes.map((ligne, rang) => {
                            const enCours = rang === rangParole
                            return (
                              <button
                                key={`${rang}-${ligne.temps}`}
                                type="button"
                                onClick={() => {
                                  refDefilementManuel.current = 0
                                  deplacerLecture(ligne.temps)
                                }}
                                aria-current={enCours ? "true" : undefined}
                                className={cn(
                                  "block w-full rounded-md px-1.5 py-1 text-left text-sm leading-snug transition-[color,opacity] duration-300 hover:bg-muted/60",
                                  enCours
                                    ? "font-semibold"
                                    : rang < rangParole
                                      ? "text-muted-foreground/70"
                                      : "text-muted-foreground/45 hover:text-muted-foreground"
                                )}
                              >
                                {enCours ? (
                                  /*
                                    Un `<span>` par mot : la boucle de
                                    synchronisation les allume un à un, en suivant
                                    les repères du fichier quand il en porte.
                                  */
                                  <span ref={refLigneActive}>
                                    {decouperEnMots(ligne).map((mot, rangMot, tous) => (
                                      <span key={`${rangMot}-${mot}`} className="parole-active">
                                        {rangMot < tous.length - 1 ? `${mot} ` : mot}
                                      </span>
                                    ))}
                                  </span>
                                ) : (
                                  ligne.texte || "♪"
                                )}
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    ) : (
                      /*
                        Sans horodatage, impossible de suivre la piste : le texte
                        est rendu en bloc défilant, à lire à son rythme. Le dire
                        évite de laisser croire que la synchronisation est en panne.
                      */
                      <>
                        <p className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70">
                          {t("Paroles non synchronisées", "Unsynced lyrics")}
                        </p>
                        <div className="max-h-24 overflow-y-auto pr-1">
                          {paroles.lignes.map((ligne, rang) => (
                            <p
                              key={`${rang}-${ligne.texte}`}
                              className="text-[11px] leading-relaxed text-muted-foreground"
                            >
                              {ligne.texte}
                            </p>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                )}

                <div className="mt-4 flex items-center gap-2">
                  <span className="font-mono text-[10px] text-muted-foreground tabular-nums">
                    {formaterTemps(temps)}
                  </span>
                  <input
                    type="range"
                    min={0}
                    max={duree || 0}
                    step={0.1}
                    value={temps}
                    onChange={(evenement) => deplacerLecture(Number(evenement.target.value))}
                    aria-label={t("Position dans la piste", "Track position")}
                    className="h-5 flex-1 accent-accent cursor-pointer"
                  />
                  <span className="font-mono text-[10px] text-muted-foreground tabular-nums">
                    {formaterTemps(duree)}
                  </span>
                </div>

                <div className="mt-3 flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => allerA(-1)}
                    aria-label={t("Piste précédente", "Previous track")}
                    className="grid size-9 md:size-8 place-items-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  >
                    <SkipBack className="size-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => void basculerLecture()}
                    aria-label={enLecture ? t("Mettre en pause", "Pause") : t("Lire", "Play")}
                    aria-pressed={enLecture}
                    className="grid size-9 place-items-center rounded-full bg-accent text-accent-foreground hover:bg-accent/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                  >
                    {enLecture ? <Pause className="size-4" aria-hidden="true" /> : <Play className="size-4" aria-hidden="true" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => allerA(1)}
                    aria-label={t("Piste suivante", "Next track")}
                    className="grid size-9 md:size-8 place-items-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  >
                    <SkipForward className="size-4" aria-hidden="true" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setMuet((precedent) => !precedent)}
                    aria-label={muet ? t("Rétablir le son", "Unmute") : t("Couper le son", "Mute")}
                    aria-pressed={muet}
                    className="ml-2 grid size-9 md:size-8 place-items-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  >
                    {muet ? (
                      <VolumeX className="size-4" aria-hidden="true" />
                    ) : (
                      <Volume2 className="size-4" aria-hidden="true" />
                    )}
                  </button>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={muet ? 0 : volume}
                    onChange={(evenement) => {
                      setMuet(false)
                      setVolume(Number(evenement.target.value))
                    }}
                    aria-label="Volume"
                    className="h-5 flex-1 accent-accent cursor-pointer"
                  />
                </div>

                {PLAYLIST.length > 1 && (
                  <ul className="mt-4 border-t border-border/60 pt-2">
                    {PLAYLIST.map((autre, rang) => (
                      <li key={autre.id}>
                        <button
                          type="button"
                          onClick={() => choisirPiste(rang)}
                          aria-current={rang === index ? "true" : undefined}
                          className={cn(
                            "flex w-full items-baseline gap-2 rounded-md px-2 py-1.5 text-left transition-colors",
                            rang === index
                              ? "text-accent-texte"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted"
                          )}
                        >
                          <span
                            aria-hidden="true"
                            className={cn("size-1.5 shrink-0 self-center rounded-full", rang === index ? "bg-accent" : "bg-border")}
                          />
                          <span className="truncate text-xs">{autre.titre}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/*
        Fermé, le lecteur n'est qu'un bouton rond : une note de musique, qui
        devient un petit égaliseur pendant la lecture. Il ouvre le panneau,
        où se trouvent lecture, réglages et liste des pistes.
      */}
      <motion.button
        type="button"
        onClick={() => setOuvert((precedent) => !precedent)}
        aria-label={ouvert ? t("Fermer le lecteur audio", "Close the audio player") : t("Ouvrir le lecteur audio", "Open the audio player")}
        aria-expanded={ouvert}
        aria-controls="lecteur-panneau"
        title={piste.artiste ? `${piste.titre} — ${piste.artiste}` : piste.titre}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        whileTap={mouvementReduit ? undefined : { scale: 0.94 }}
        transition={{ duration: mouvementReduit ? 0 : 0.3, ease: EASE_OUT, delay: 0.2 }}
        className={cn(
          "grid size-11 place-items-center rounded-full surface-flottante transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
          enLecture || ouvert ? "text-accent-texte" : "text-muted-foreground hover:text-foreground"
        )}
      >
        {enLecture ? (
          <canvas ref={refCanvas} aria-hidden="true" className="h-4 w-5 text-accent-texte" />
        ) : (
          <Music2 className="size-[18px]" aria-hidden="true" />
        )}
      </motion.button>

      <audio
        ref={refAudio}
        src={piste.src}
        preload="metadata"
        onPlay={() => setEnLecture(true)}
        onPause={() => setEnLecture(false)}
        onTimeUpdate={(evenement) => setTemps(evenement.currentTarget.currentTime)}
        onLoadedMetadata={(evenement) => setDuree(evenement.currentTarget.duration)}
        /*
          Fin de piste : on enchaîne sur la suivante (la dernière boucle sur la
          première). L'élément a déjà émis « pause » juste avant « ended », ce
          qui a remis `enLecture` à faux : on le relève ici, sinon l'effet de
          changement de piste ne relancerait pas la lecture.
        */
        onEnded={() => {
          if (PLAYLIST.length > 1) {
            setEnLecture(true)
            allerA(1)
          } else {
            setEnLecture(false)
          }
        }}
        onError={() => setErreur(true)}
      />
    </div>
  )
}

/**
 * Sans piste déclarée dans `src/data/musique.ts`, il n'y a rien à écouter : le
 * lecteur ne rend rien plutôt que d'occuper un coin de l'écran pour du vide.
 */
export function LecteurAudio() {
  if (PLAYLIST.length === 0) return null
  return <Platine />
}
