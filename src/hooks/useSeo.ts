import { useEffect } from 'react'

interface SeoOptions {
  /** Titre complet de l'onglet (sans préfixe ajouté). */
  title: string
  description?: string
  /** Chemin canonique relatif (ex: "/cv") ou URL absolue. */
  path?: string
  image?: string
  type?: 'website' | 'article' | 'profile'
}

const URL_SITE = 'https://kaysuto.fr'
const IMAGE_PAR_DEFAUT = `${URL_SITE}/og-image.jpg`

function definirMeta(selecteur: string, attribut: 'name' | 'property', cle: string, contenu: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selecteur)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribut, cle)
    document.head.appendChild(element)
  }
  element.setAttribute('content', contenu)
}

function definirCanonical(lien: string) {
  let elementLien = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!elementLien) {
    elementLien = document.createElement('link')
    elementLien.setAttribute('rel', 'canonical')
    document.head.appendChild(elementLien)
  }
  elementLien.setAttribute('href', lien)
}

/**
 * Met à jour titre, description, canonical et balises Open Graph / Twitter
 * pour la page courante. Restaure les valeurs par défaut au démontage.
 */
export function useSeo({ title, description, path, image, type = 'website' }: SeoOptions) {
  useEffect(() => {
    const titrePrecedent = document.title
    const url = path
      ? path.startsWith('http')
        ? path
        : `${URL_SITE}${path}`
      : URL_SITE
    const imageOg = image ?? IMAGE_PAR_DEFAUT

    document.title = title
    if (description) {
      definirMeta('meta[name="description"]', 'name', 'description', description)
      definirMeta('meta[property="og:description"]', 'property', 'og:description', description)
      definirMeta('meta[property="twitter:description"]', 'property', 'twitter:description', description)
    }
    definirMeta('meta[property="og:title"]', 'property', 'og:title', title)
    definirMeta('meta[property="og:url"]', 'property', 'og:url', url)
    definirMeta('meta[property="og:type"]', 'property', 'og:type', type)
    definirMeta('meta[property="og:image"]', 'property', 'og:image', imageOg)
    definirMeta('meta[property="twitter:title"]', 'property', 'twitter:title', title)
    definirMeta('meta[property="twitter:url"]', 'property', 'twitter:url', url)
    definirMeta('meta[property="twitter:image"]', 'property', 'twitter:image', imageOg)
    definirCanonical(url)

    return () => {
      document.title = titrePrecedent
    }
  }, [title, description, path, image, type])
}
