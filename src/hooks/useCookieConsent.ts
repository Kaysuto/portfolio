import { useState, useEffect } from 'react'

export interface CookieChoices {
  essential: boolean;
  preferences: boolean;
  analytics: boolean;
}

export type CookieConsentStatus = 'accepted' | 'rejected' | 'dismissed' | 'granular' | null

const CLE_CONSENTEMENT = 'cookie-consent'
const CLE_CHOIX = 'cookie-choices'

const CHOIX_PAR_DEFAUT: CookieChoices = {
  essential: true,
  preferences: true,
  analytics: true
}

export function useCookieConsent() {
  const [consentement, setConsentement] = useState<CookieConsentStatus>(null)
  const [choix, setChoix] = useState<CookieChoices>(CHOIX_PAR_DEFAUT)
  const [estCharge, setEstCharge] = useState(false)

  useEffect(() => {
    const consentementStocke = localStorage.getItem(CLE_CONSENTEMENT) as CookieConsentStatus
    const choixStockes = localStorage.getItem(CLE_CHOIX)

    if (consentementStocke) {
      setConsentement(consentementStocke)
    }

    if (choixStockes) {
      try {
        setChoix(JSON.parse(choixStockes))
      } catch {
        setChoix(CHOIX_PAR_DEFAUT)
      }
    }
    setEstCharge(true)
  }, [])

  // Synchronise le consentement Google Tag
  useEffect(() => {
    if (estCharge && typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        'analytics_storage': choix.analytics ? 'granted' : 'denied'
      });
    }
  }, [choix.analytics, estCharge])

  const enregistrerChoix = (nouveauxChoix: CookieChoices, statut: CookieConsentStatus = 'granular') => {
    setChoix(nouveauxChoix)
    setConsentement(statut)
    localStorage.setItem(CLE_CHOIX, JSON.stringify(nouveauxChoix))
    if (statut) {
      localStorage.setItem(CLE_CONSENTEMENT, statut)
    }
  }

  const toutAccepter = () => {
    enregistrerChoix(CHOIX_PAR_DEFAUT, 'accepted')
  }

  const toutRefuser = () => {
    enregistrerChoix({ essential: true, preferences: false, analytics: false }, 'rejected')
  }

  const ignorerCookies = () => {
    setConsentement('dismissed')
    localStorage.setItem(CLE_CONSENTEMENT, 'dismissed')
  }

  return {
    consent: consentement,
    choices: choix,
    isLoaded: estCharge,
    saveChoices: enregistrerChoix,
    acceptAll: toutAccepter,
    rejectAll: toutRefuser,
    dismissCookies: ignorerCookies
  }
}
