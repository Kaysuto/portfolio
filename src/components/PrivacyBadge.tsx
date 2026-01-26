import React, { useState } from 'react'
import { useCookieConsent } from '@/hooks/useCookieConsent'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Cookie, X } from '@phosphor-icons/react'

export function PrivacyBadge() {
  const { consent, acceptCookies, rejectCookies, dismissCookies, isLoaded } = useCookieConsent()
  const [isExpanded, setIsExpanded] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  // Ne pas afficher si pas encore chargé
  if (!isLoaded) {
    return null
  }

  const handleAccept = () => {
    acceptCookies()
    handleClose()
  }

  const handleReject = () => {
    rejectCookies()
    handleClose()
  }

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      dismissCookies() // Utiliser dismissCookies au lieu de simplement fermer
      setIsExpanded(false)
      setIsClosing(false)
    }, 300) // Délai pour l'animation de fermeture
  }

  // Si expanded, afficher le banner complet
  if (isExpanded) {
    return (
      <>
        {/* Version mobile */}
        <div className={`fixed bottom-4 left-4 right-4 max-w-[320px] z-50 md:hidden ${isClosing ? 'animate-fadeOut' : 'animate-fadeIn'}`}>
          <Card className="p-4 bg-background/95 backdrop-blur-md border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 animate-slideInFromBottom">
            <div className="flex items-start gap-3">
              <Cookie size={24} className="text-accent flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-2 text-lg">
                  Cookies & Confidentialité
                </h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  Ce site utilise des cookies pour mémoriser vos préférences de thème et améliorer votre expérience de navigation. 
                  Aucune donnée personnelle n'est collectée ou partagée.
                </p>
                <div className="flex gap-2 flex-col">
                  <Button
                    onClick={handleAccept}
                    size="sm"
                    disabled={consent === 'accepted'}
                    className={consent === 'accepted' 
                      ? "bg-green-500 text-white cursor-default opacity-90" 
                      : "bg-accent hover:bg-accent/90 text-[#231813] dark:text-[#231813] font-medium transition-all duration-200 hover:scale-105"
                    }
                  >
                    {consent === 'accepted' ? '✓ Accepté' : 'Accepter'}
                  </Button>
                  <Button
                    onClick={handleReject}
                    variant={consent === 'rejected' ? 'default' : 'outline'}
                    size="sm"
                    disabled={consent === 'rejected'}
                    className={consent === 'rejected'
                      ? "bg-red-500 text-white cursor-default opacity-90"
                      : "border-border/50 hover:bg-muted/50 font-medium transition-all duration-200"
                    }
                  >
                    {consent === 'rejected' ? '✗ Refusé' : 'Refuser'}
                  </Button>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200 p-1 rounded-md hover:bg-muted/50"
                title="Fermer"
              >
                <X size={20} />
              </button>
            </div>
          </Card>
        </div>

        {/* Version desktop - Banner complet */}
        <div className={`fixed bottom-4 left-4 right-4 max-w-md z-50 hidden md:block ${isClosing ? 'animate-fadeOut' : 'animate-fadeIn'}`}>
          <Card className="p-6 bg-background/95 backdrop-blur-md border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 animate-slideInFromBottom">
            <div className="flex items-start gap-3">
              <Cookie size={24} className="text-accent flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-2 text-lg">
                  Cookies & Confidentialité
                </h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  Ce site utilise des cookies pour mémoriser vos préférences de thème et améliorer votre expérience de navigation. 
                  Aucune donnée personnelle n'est collectée ou partagée.
                </p>
                <div className="flex gap-2">
                  <Button
                    onClick={handleAccept}
                    size="sm"
                    disabled={consent === 'accepted'}
                    className={consent === 'accepted' 
                      ? "bg-green-500 text-white cursor-default opacity-90" 
                      : "bg-accent hover:bg-accent/90 text-[#231813] dark:text-[#231813] font-medium transition-all duration-200 hover:scale-105"
                    }
                  >
                    {consent === 'accepted' ? '✓ Accepté' : 'Accepter'}
                  </Button>
                  <Button
                    onClick={handleReject}
                    variant={consent === 'rejected' ? 'default' : 'outline'}
                    size="sm"
                    disabled={consent === 'rejected'}
                    className={consent === 'rejected'
                      ? "bg-red-500 text-white cursor-default opacity-90"
                      : "border-border/50 hover:bg-muted/50 font-medium transition-all duration-200"
                    }
                  >
                    {consent === 'rejected' ? '✗ Refusé' : 'Refuser'}
                  </Button>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200 p-1 rounded-md hover:bg-muted/50"
                title="Fermer"
              >
                <X size={20} />
              </button>
            </div>
          </Card>
        </div>
      </>
    )
  }

  // Afficher toujours le badge cookie, peu importe le statut
  return (
    <>
      {/* Version mobile - Badge uniquement */}
      <div className="fixed bottom-4 left-4 z-50 md:hidden animate-fadeIn">
        <button
          onClick={() => setIsExpanded(true)}
          className="w-12 h-12 rounded-full bg-accent/90 hover:bg-accent border border-accent/50 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 flex items-center justify-center"
          title="Configurer les cookies"
        >
          <Cookie size={20} className="text-[#231813] dark:text-[#231813]" />
        </button>
      </div>

      {/* Version desktop - Banner complet directement si aucun consentement, sinon badge */}
      {consent === null ? (
        <div className="fixed bottom-4 left-4 right-4 max-w-md z-50 hidden md:block animate-fadeIn">
          <Card className="p-6 bg-background/95 backdrop-blur-md border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 animate-slideInFromBottom">
            <div className="flex items-start gap-3">
              <Cookie size={24} className="text-accent flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-2 text-lg">
                  Cookies & Confidentialité
                </h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  Ce site utilise des cookies pour mémoriser vos préférences de thème et améliorer votre expérience de navigation. 
                  Aucune donnée personnelle n'est collectée ou partagée.
                </p>
                <div className="flex gap-2">
                  <Button
                    onClick={handleAccept}
                    size="sm"
                    disabled={consent === 'accepted'}
                    className={consent === 'accepted' 
                      ? "bg-green-500 text-white cursor-default opacity-90" 
                      : "bg-accent hover:bg-accent/90 text-[#231813] dark:text-[#231813] font-medium transition-all duration-200 hover:scale-105"
                    }
                  >
                    {consent === 'accepted' ? '✓ Accepté' : 'Accepter'}
                  </Button>
                  <Button
                    onClick={handleReject}
                    variant={consent === 'rejected' ? 'default' : 'outline'}
                    size="sm"
                    disabled={consent === 'rejected'}
                    className={consent === 'rejected'
                      ? "bg-red-500 text-white cursor-default opacity-90"
                      : "border-border/50 hover:bg-muted/50 font-medium transition-all duration-200"
                    }
                  >
                    {consent === 'rejected' ? '✗ Refusé' : 'Refuser'}
                  </Button>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200 p-1 rounded-md hover:bg-muted/50"
                title="Fermer"
              >
                <X size={20} />
              </button>
            </div>
          </Card>
        </div>
      ) : (
        <div className="fixed bottom-4 left-4 z-50 hidden md:block animate-fadeIn">
          <button
            onClick={() => setIsExpanded(true)}
            className="w-12 h-12 rounded-full bg-accent/90 hover:bg-accent border border-accent/50 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 flex items-center justify-center"
            title="Configurer les cookies"
          >
            <Cookie size={20} className="text-[#231813] dark:text-[#231813]" />
          </button>
        </div>
      )}
    </>
  )
}
