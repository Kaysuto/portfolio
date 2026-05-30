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

const SITE_URL = 'https://kaysuto.fr'
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`

function setMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setCanonical(href: string) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    document.head.appendChild(link)
  }
  link.setAttribute('href', href)
}

/**
 * Met à jour titre, description, canonical et balises Open Graph / Twitter
 * pour la page courante. Restaure les valeurs par défaut au démontage.
 */
export function useSeo({ title, description, path, image, type = 'website' }: SeoOptions) {
  useEffect(() => {
    const previousTitle = document.title
    const url = path
      ? path.startsWith('http')
        ? path
        : `${SITE_URL}${path}`
      : SITE_URL
    const ogImage = image ?? DEFAULT_IMAGE

    document.title = title
    if (description) {
      setMeta('meta[name="description"]', 'name', 'description', description)
      setMeta('meta[property="og:description"]', 'property', 'og:description', description)
      setMeta('meta[property="twitter:description"]', 'property', 'twitter:description', description)
    }
    setMeta('meta[property="og:title"]', 'property', 'og:title', title)
    setMeta('meta[property="og:url"]', 'property', 'og:url', url)
    setMeta('meta[property="og:type"]', 'property', 'og:type', type)
    setMeta('meta[property="og:image"]', 'property', 'og:image', ogImage)
    setMeta('meta[property="twitter:title"]', 'property', 'twitter:title', title)
    setMeta('meta[property="twitter:url"]', 'property', 'twitter:url', url)
    setMeta('meta[property="twitter:image"]', 'property', 'twitter:image', ogImage)
    setCanonical(url)

    return () => {
      document.title = previousTitle
    }
  }, [title, description, path, image, type])
}
