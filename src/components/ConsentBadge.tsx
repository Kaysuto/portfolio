import React, { useState } from 'react'
import { useCookieConsent } from '@/hooks/useCookieConsent'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Cookie, X } from '@phosphor-icons/react'

export function ConsentBadge() {
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
          <Card className="p-6 bg-card rounded-[2rem] border-2 border-foreground/10 shadow-2xl animate-slideInFromBottom">
            <div className="flex items-start gap-4">
              <Cookie size={28} className="text-primary flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-bold text-foreground mb-2 text-lg uppercase italic tracking-tighter">
                  Cookies
                </h3>
                <p className="text-xs text-muted-foreground mb-6 font-medium italic leading-relaxed">
                  Ce site utilise des cookies pour mémoriser vos préférences.
                </p>
                <div className="flex gap-3 flex-col">
                  <Button
                    onClick={handleAccept}
                    size="sm"
                    disabled={consent === 'accepted'}
                    className={consent === 'accepted' 
                      ? "bg-green-500 text-white cursor-default opacity-90" 
                      : "bg-primary hover:bg-primary/90 text-primary-foreground font-bold uppercase text-[10px] tracking-widest rounded-xl h-10"
                    }
                  >
                    {consent === 'accepted' ? '✓ ACCEPTÉ' : 'ACCEPTER'}
                  </Button>
                  <Button
                    onClick={handleReject}
                    variant="outline"
                    size="sm"
                    disabled={consent === 'rejected'}
                    className="border-2 border-foreground/10 hover:bg-secondary font-bold uppercase text-[10px] tracking-widest rounded-xl h-10"
                  >
                    {consent === 'rejected' ? '✗ REFUSÉ' : 'REFUSER'}
                  </Button>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="text-muted-foreground hover:text-foreground transition-colors p-1"
              >
                <X size={20} />
              </button>
            </div>
          </Card>
        </div>

        {/* Version desktop - Banner complet */}
        <div className={`fixed bottom-6 left-6 z-50 hidden md:block ${isClosing ? 'animate-fadeOut' : 'animate-fadeIn'}`}>
          <Card className="p-8 bg-card rounded-[2.5rem] border-2 border-foreground/10 shadow-2xl max-w-sm animate-slideInFromBottom">
            <div className="flex items-start gap-5">
              <Cookie size={32} className="text-primary flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-bold text-foreground mb-2 text-xl uppercase italic tracking-tighter">
                  Cookies
                </h3>
                <p className="text-sm text-muted-foreground mb-6 font-medium italic leading-relaxed">
                  Ce site utilise des cookies pour mémoriser vos préférences de thème.
                </p>
                <div className="flex gap-3">
                  <Button
                    onClick={handleAccept}
                    size="sm"
                    disabled={consent === 'accepted'}
                    className={consent === 'accepted' 
                      ? "bg-green-500 text-white cursor-default opacity-90" 
                      : "bg-primary hover:bg-primary/90 text-primary-foreground font-bold uppercase text-[10px] tracking-widest rounded-xl h-10 px-6"
                    }
                  >
                    {consent === 'accepted' ? '✓ ACCEPTÉ' : 'ACCEPTER'}
                  </Button>
                  <Button
                    onClick={handleReject}
                    variant="outline"
                    size="sm"
                    disabled={consent === 'rejected'}
                    className="border-2 border-foreground/10 hover:bg-secondary font-bold uppercase text-[10px] tracking-widest rounded-xl h-10 px-6"
                  >
                    {consent === 'rejected' ? '✗ REFUSÉ' : 'REFUSER'}
                  </Button>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="text-muted-foreground hover:text-foreground transition-colors p-1"
              >
                <X size={20} />
              </button>
            </div>
          </Card>
        </div>
      </>
    )
  }

  return (
    <>
      {/* Badge uniquement */}
      <div className="fixed bottom-6 left-6 z-50 animate-fadeIn">
        <button
          onClick={() => setIsExpanded(true)}
          className="w-14 h-14 rounded-2xl bg-card border-2 border-foreground/10 hover:border-primary shadow-xl transition-all flex items-center justify-center group"
          title="Cookies"
        >
          <Cookie size={28} className="text-primary group-hover:scale-110 transition-transform" />
        </button>
      </div>
    </>
  )
}
