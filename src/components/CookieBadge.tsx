import React, { useState } from 'react'
import { useCookieConsent } from '@/hooks/useCookieConsent'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Cookie, X } from '@phosphor-icons/react'

export function CookieBadge() {
  const { consent, acceptCookies, rejectCookies, isLoaded } = useCookieConsent()
  const [isExpanded, setIsExpanded] = useState(false)

  // Ne pas afficher si pas encore chargé
  if (!isLoaded) {
    return null
  }

  const handleAccept = () => {
    acceptCookies()
    setIsExpanded(false)
  }

  const handleReject = () => {
    rejectCookies()
    setIsExpanded(false)
  }

  // Si expanded, afficher le banner complet
  if (isExpanded) {
    return (
      <>
        {/* Version mobile */}
        <div className="fixed bottom-4 left-4 right-4 max-w-[320px] z-50 md:hidden animate-fadeIn">
          {/* Badge collapse button */}
          <div className="flex justify-end mb-2">
            <button
              onClick={() => setIsExpanded(false)}
              className="w-8 h-8 rounded-full bg-background/80 border border-border/50 backdrop-blur-md transition-all duration-300 hover:scale-110 flex items-center justify-center animate-fadeIn"
              title="Réduire"
            >
              <X size={16} className="text-muted-foreground" />
            </button>
          </div>
          
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
                      : "bg-accent hover:bg-accent/90 text-accent-foreground font-medium transition-all duration-200 hover:scale-105"
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
            </div>
          </Card>
        </div>

        {/* Version desktop - Banner complet */}
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
                      : "bg-accent hover:bg-accent/90 text-accent-foreground font-medium transition-all duration-200 hover:scale-105"
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
      <div className="fixed bottom-4 left-4 z-50 md:hidden">
        <button
          onClick={() => setIsExpanded(true)}
          className="w-12 h-12 rounded-full bg-accent/90 hover:bg-accent border border-accent/50 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 flex items-center justify-center"
          title="Configurer les cookies"
        >
          <Cookie size={20} className="text-accent-foreground" />
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
                      : "bg-accent hover:bg-accent/90 text-accent-foreground font-medium transition-all duration-200 hover:scale-105"
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
            </div>
          </Card>
        </div>
      ) : (
        <div className="fixed bottom-4 left-4 z-50 hidden md:block">
          <button
            onClick={() => setIsExpanded(true)}
            className="w-12 h-12 rounded-full bg-accent/90 hover:bg-accent border border-accent/50 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 flex items-center justify-center"
            title="Configurer les cookies"
          >
            <Cookie size={20} className="text-accent-foreground" />
          </button>
        </div>
      )}
    </>
  )
}
