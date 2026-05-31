import { useEffect, useState, useCallback } from 'react'
import { initTheme, setTheme as persisterTheme, applyTheme, type Theme } from '@/lib/theme'

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => initTheme())

  useEffect(() => {
    const surStockage = (evenement: StorageEvent) => {
      if (evenement.key === 'theme' && evenement.newValue) setThemeState(evenement.newValue as Theme)
    }

    const surChangementTheme = (evenement: CustomEvent) => {
      if (evenement.detail?.theme && evenement.detail.theme !== theme) {
        setThemeState(evenement.detail.theme);
      }
    }

    const verifierChangementsCookies = () => {
      const correspondanceCookie = document.cookie.match(/(?:^|; )theme=([^;]*)/);
      const themeCookie = correspondanceCookie ? decodeURIComponent(correspondanceCookie[1]) as Theme : null;
      const themeLocal = localStorage.getItem('theme') as Theme | null;
      const themeActuel = themeLocal || themeCookie;
      if (themeActuel && themeActuel !== theme && (themeActuel === 'dark' || themeActuel === 'light')) {
        setThemeState(themeActuel);
      }
    }

    const requeteMedia = window.matchMedia('(prefers-color-scheme: dark)')
    const surChangementSysteme = (evenement: MediaQueryListEvent) => {
      const aChoixUtilisateur = localStorage.getItem('theme') !== null;
      if (!aChoixUtilisateur) {
        const nouveauTheme = evenement.matches ? 'dark' : 'light';
        applyTheme(nouveauTheme);
        setThemeState(nouveauTheme);
      }
    }

    window.addEventListener('storage', surStockage)
    window.addEventListener('themeChange', surChangementTheme as EventListener)
    window.addEventListener('focus', verifierChangementsCookies)
    requeteMedia.addEventListener('change', surChangementSysteme)

    return () => {
      window.removeEventListener('storage', surStockage)
      window.removeEventListener('themeChange', surChangementTheme as EventListener)
      window.removeEventListener('focus', verifierChangementsCookies)
      requeteMedia.removeEventListener('change', surChangementSysteme)
    }
  }, [theme])

  const basculer = useCallback(() => {
    const suivant = theme === 'dark' ? 'light' : 'dark'
    persisterTheme(suivant)
    setThemeState(suivant)
  }, [theme])

  const setTheme = useCallback((nouveauTheme: Theme) => {
    persisterTheme(nouveauTheme)
    setThemeState(nouveauTheme)
  }, [])

  return { theme, setTheme, toggle: basculer }
}
