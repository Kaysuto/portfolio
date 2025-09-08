import { useEffect, useState, useCallback } from 'react'
import { initTheme, setTheme as persistTheme, type Theme } from '@/lib/theme'

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => initTheme('dark'))

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
      if (currentTheme && currentTheme !== theme) {
        setThemeState(currentTheme);
      }
    }
    
    // Vérifier les changements de cookies toutes les 500ms (pour détecter les changements cross-tab)
    const cookieInterval = setInterval(checkCookieChanges, 500);
    
    window.addEventListener('storage', onStorage)
    window.addEventListener('themeChange', onThemeChange as EventListener)
    window.addEventListener('focus', checkCookieChanges) // Vérifier au focus de la fenêtre
    
    return () => {
      window.removeEventListener('storage', onStorage)
      window.removeEventListener('themeChange', onThemeChange as EventListener)
      window.removeEventListener('focus', checkCookieChanges)
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
