import { useState, useEffect } from 'react'

export interface CookieChoices {
  essential: boolean;
  preferences: boolean;
  analytics: boolean;
}

export type CookieConsentStatus = 'accepted' | 'rejected' | 'dismissed' | 'granular' | null

const CONSENT_KEY = 'cookie-consent'
const CHOICES_KEY = 'cookie-choices'

const DEFAULT_CHOICES: CookieChoices = {
  essential: true,
  preferences: true,
  analytics: true
}

export function useCookieConsent() {
  const [consent, setConsent] = useState<CookieConsentStatus>(null)
  const [choices, setChoices] = useState<CookieChoices>(DEFAULT_CHOICES)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const storedConsent = localStorage.getItem(CONSENT_KEY) as CookieConsentStatus
    const storedChoices = localStorage.getItem(CHOICES_KEY)
    
    if (storedConsent) {
      setConsent(storedConsent)
    }
    
    if (storedChoices) {
      try {
        setChoices(JSON.parse(storedChoices))
      } catch (e) {
        setChoices(DEFAULT_CHOICES)
      }
    }
    setIsLoaded(true)
  }, [])

  const saveChoices = (newChoices: CookieChoices, status: CookieConsentStatus = 'granular') => {
    setChoices(newChoices)
    setConsent(status)
    localStorage.setItem(CHOICES_KEY, JSON.stringify(newChoices))
    if (status) {
      localStorage.setItem(CONSENT_KEY, status)
    }
  }

  const acceptAll = () => {
    saveChoices(DEFAULT_CHOICES, 'accepted')
  }

  const rejectAll = () => {
    saveChoices({ essential: true, preferences: false, analytics: false }, 'rejected')
  }

  const dismissCookies = () => {
    setConsent('dismissed')
    localStorage.setItem(CONSENT_KEY, 'dismissed')
  }

  return {
    consent,
    choices,
    isLoaded,
    saveChoices,
    acceptAll,
    rejectAll,
    dismissCookies
  }
}