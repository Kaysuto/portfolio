import { useState, useEffect } from 'react'

export type CookieConsent = 'accepted' | 'rejected' | null

const CONSENT_KEY = 'cookie-consent'

export function useCookieConsent() {
  const [consent, setConsent] = useState<CookieConsent>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Vérifier le consentement au montage
    const stored = localStorage.getItem(CONSENT_KEY) as CookieConsent
    
    if (stored === 'accepted' || stored === 'rejected') {
      setConsent(stored)
    } else {
      setConsent(null)
    }
    setIsLoaded(true)
  }, [])

  const acceptCookies = () => {
    setConsent('accepted')
    localStorage.setItem(CONSENT_KEY, 'accepted')
  }

  const rejectCookies = () => {
    setConsent('rejected')
    localStorage.setItem(CONSENT_KEY, 'rejected')
  }

  const hasConsent = consent === 'accepted'

  return {
    consent,
    hasConsent,
    acceptCookies,
    rejectCookies,
    isLoaded
  }
}