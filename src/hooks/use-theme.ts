import { useEffect, useState, useCallback } from 'react'
import { initTheme, setTheme as persistTheme, applyTheme, type Theme } from '@/lib/theme'

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => initTheme())

  useEffect(() => {
    // Écouter les changements de localStorage
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'theme' && e.newValue) setThemeState(e.newValue as Theme)
    }
    
    // Écouter l'événement personnalisé de changement de thème
    const onThemeChange = (e: CustomEvent) => {
      if (e.detail?.theme && e.detail.theme !== theme) {
        setThemeState(e.detail.theme);
      }
    }
    
    // Écouter les changements de cookies (pour la synchronisation entre onglets)
    const checkCookieChanges = () => {
      const cookieMatch = document.cookie.match(/(?:^|; )theme=([^;]*)/);
      const cookieTheme = cookieMatch ? decodeURIComponent(cookieMatch[1]) as Theme : null;
      const localTheme = localStorage.getItem('theme') as Theme | null;
      
      // Prioriser localStorage, puis cookie
      const currentTheme = localTheme || cookieTheme;
      if (currentTheme && currentTheme !== theme && (currentTheme === 'dark' || currentTheme === 'light')) {
        setThemeState(currentTheme);
      }
    }
    
    // Vérifier les changements de cookies toutes les 500ms (pour détecter les changements cross-tab)
    const cookieInterval = setInterval(checkCookieChanges, 500);
    
    // Écouter les changements de préférence système (seulement si l'utilisateur n'a pas fait de choix)
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const onSystemChange = (e: MediaQueryListEvent) => {
      const hasUserChoice = localStorage.getItem('theme') !== null;
      if (!hasUserChoice) {
        const newTheme = e.matches ? 'dark' : 'light';
        applyTheme(newTheme);
        setThemeState(newTheme);
      }
    }
    
    window.addEventListener('storage', onStorage)
    window.addEventListener('themeChange', onThemeChange as EventListener)
    window.addEventListener('focus', checkCookieChanges)
    mediaQuery.addEventListener('change', onSystemChange)
    
    return () => {
      window.removeEventListener('storage', onStorage)
      window.removeEventListener('themeChange', onThemeChange as EventListener)
      window.removeEventListener('focus', checkCookieChanges)
      mediaQuery.removeEventListener('change', onSystemChange)
      clearInterval(cookieInterval)
    }
  }, [theme])

  const toggle = useCallback(() => {
    const next = theme === 'dark' ? 'light' : 'dark'
    persistTheme(next)
    setThemeState(next)
  }, [theme])

  const setTheme = useCallback((t: Theme) => {
    persistTheme(t)
    setThemeState(t)
  }, [])

  return { theme, setTheme, toggle }
}
