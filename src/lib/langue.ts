import { useSyncExternalStore } from "react"
import { flushSync } from "react-dom"

/**
 * Langue du site : français ou anglais.
 *
 * Un petit magasin partagé plutôt qu'un contexte React : n'importe quel
 * composant lit la langue avec `useLangue()` sans fournisseur à monter, et le
 * code hors React (schéma du formulaire, titre de l'onglet) passe par
 * `langueCourante()`.
 *
 * Première visite : la langue du navigateur décide (français si elle commence
 * par « fr », anglais sinon). Ensuite, le choix du visiteur est mémorisé.
 */
export type Langue = "fr" | "en"

/** Un texte dans les deux langues, pour les données (projets, stack, CV…). */
export type Bilingue = { fr: string; en: string }

const CLE_STOCKAGE = "kimiya-langue"

function langueInitiale(): Langue {
  try {
    const memorisee = localStorage.getItem(CLE_STOCKAGE)
    if (memorisee === "fr" || memorisee === "en") return memorisee
  } catch {
    // Stockage indisponible (navigation privée stricte) : on retombe sur le navigateur.
  }
  // Les robots d'indexation (Googlebot annonce de l'anglais) voient la version
  // française, celle que le site sert à son public et décrit dans ses métadonnées.
  if (/bot|crawl|spider|slurp|lighthouse/i.test(navigator.userAgent)) return "fr"
  return navigator.language?.toLowerCase().startsWith("fr") ? "fr" : "en"
}

let courante: Langue = typeof window === "undefined" ? "fr" : langueInitiale()
const abonnes = new Set<() => void>()

if (typeof document !== "undefined") document.documentElement.lang = courante

export function langueCourante(): Langue {
  return courante
}

export function setLangue(langue: Langue) {
  if (langue === courante) return
  try {
    localStorage.setItem(CLE_STOCKAGE, langue)
  } catch {
    // Le choix vaut pour la visite, même sans mémoire.
  }

  const appliquer = () => {
    courante = langue
    document.documentElement.lang = langue
    // Rendu synchrone : la transition doit photographier la page déjà traduite.
    flushSync(() => abonnes.forEach((prevenir) => prevenir()))
  }

  /*
    Transition de vue native : le navigateur photographie la page, applique la
    nouvelle langue, puis passe de l'une à l'autre (fondu flouté, voir
    `html[data-transition="langue"]` dans index.css). Sans l'API, ou sous
    « réduire les animations », le texte change simplement d'un coup.
  */
  const racine = document.documentElement
  if (!document.startViewTransition || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    appliquer()
    return
  }
  racine.dataset.transition = "langue"
  document.startViewTransition(appliquer).finished.finally(() => {
    delete racine.dataset.transition
  })
}

function sAbonner(prevenir: () => void) {
  abonnes.add(prevenir)
  return () => {
    abonnes.delete(prevenir)
  }
}

/**
 * Langue courante et deux aides de traduction :
 * - `t("Bonjour", "Hello")` choisit entre deux textes écrits sur place ;
 * - `l({ fr, en })` lit un texte bilingue venu des données.
 */
export function useLangue() {
  const langue = useSyncExternalStore(sAbonner, langueCourante, () => "fr" as Langue)
  const t = <T,>(fr: T, en: T): T => (langue === "fr" ? fr : en)
  const l = (texte: Bilingue): string => texte[langue]
  return { langue, setLangue, t, l }
}
