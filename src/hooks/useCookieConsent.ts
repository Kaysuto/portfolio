import { useState, useEffect } from 'react'

export type CookieConsent = 'accepted' | 'rejected' | 'dismissed' | null

const CONSENT_KEY = 'cookie-consent'

export function useCookieConsent() {
  const [consent, setConsent] = useState<CookieConsent>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Vérifier le consentement au montage
    const stored = localStorage.getItem(CONSENT_KEY) as CookieConsent
    
    if (stored === 'accepted' || stored === 'rejected' || stored === 'dismissed') {
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

  const dismissCookies = () => {
    setConsent('dismissed')
    localStorage.setItem(CONSENT_KEY, 'dismissed')
  }

  const hasConsent = consent === 'accepted'

  return {
    consent,
    hasConsent,
    acceptCookies,
    rejectCookies,
    dismissCookies,
    isLoaded
  }
}