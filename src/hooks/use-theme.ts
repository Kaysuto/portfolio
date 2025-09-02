import { useEffect, useState, useCallback } from 'react'
import { initTheme, setTheme as persistTheme, type Theme } from '@/lib/theme'

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => initTheme('dark'))

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'theme' && e.newValue) setThemeState(e.newValue as Theme)
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const toggle = useCallback(() => {
    const next = theme === 'dark' ? 'light' : 'dark'
    persistTheme(next)
    setThemeState(next)
  }, [theme])

  return { theme, setTheme: (t: Theme) => { persistTheme(t); setThemeState(t) }, toggle }
}
