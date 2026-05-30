import { lazy } from 'react'

/**
 * Routes secondaires chargées à la demande (code-splitting).
 * Chaque entrée expose un `preload()` pour précharger le chunk au survol
 * du lien correspondant dans la navbar → navigation quasi instantanée.
 */

const importBio = () => import('@/pages/BioPage')
const importCV = () => import('@/pages/CVPage')
const importLegal = () => import('@/pages/MentionsLegales')

export const BioPage = lazy(importBio)
export const CVPage = lazy(importCV)
export const MentionsLegales = lazy(importLegal)

export const ROUTE_PRELOADERS: Record<string, () => Promise<unknown>> = {
  '/bio': importBio,
  '/cv': importCV,
  '/legal-notice': importLegal,
}

export function preloadRoute(path: string) {
  ROUTE_PRELOADERS[path]?.()
}
