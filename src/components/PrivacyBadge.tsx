import React, { useState } from 'react'
import { useCookieConsent, type CookieChoices } from '@/hooks/useCookieConsent'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Cookie, X, Settings, Check, ChevronRight, Lock } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

export function PrivacyBadge() {
  const { consent, choices, acceptAll, rejectAll, saveChoices, dismissCookies, isLoaded } = useCookieConsent()
  const [estDeploye, setEstDeploye] = useState(false)
  const [vue, setVue] = useState<'summary' | 'manage'>('summary')
  const [choixTemporaires, setChoixTemporaires] = useState<CookieChoices>(choices)
  const [estEnregistre, setEstEnregistre] = useState(false)

  if (!isLoaded) return null

  const gererAcceptationTotale = () => {
    acceptAll()
    setEstDeploye(false)
  }

  const gererRefusTotal = () => {
    rejectAll()
    setEstDeploye(false)
  }

  const gererEnregistrementSelection = () => {
    saveChoices(choixTemporaires)
    setEstEnregistre(true)
    setTimeout(() => {
      setEstEnregistre(false)
      setEstDeploye(false)
      setVue('summary')
    }, 1500)
  }

  const gererFermeture = () => {
    if (consent === null) dismissCookies()
    setEstDeploye(false)
    setVue('summary')
  }

  const basculerChoix = (cle: keyof CookieChoices) => {
    if (cle === 'essential') return // Les cookies essentiels sont toujours actifs
    setChoixTemporaires(precedent => ({ ...precedent, [cle]: !precedent[cle] }))
  }

  const estVisible = consent === null || estDeploye

  return (
    <AnimatePresence mode="wait">
      {estVisible ? (
        <motion.div
          key="cookie-banner"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          className="fixed bottom-4 left-4 right-4 md:left-4 md:right-auto md:max-w-sm z-[100]"
        >
          <Card className="surface-flottante rounded-xl overflow-hidden relative ring-0">
            <AnimatePresence mode="wait">
              {vue === 'summary' ? (
                <motion.div
                  key="summary-view"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="p-4 space-y-3"
                >
                  <div className="flex items-start gap-3">
                    <div className="size-8 bg-muted rounded-md flex items-center justify-center flex-shrink-0">
                      <Cookie className="size-4 text-accent-texte" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-foreground tracking-tight">Confidentialité</h3>
                        <button onClick={gererFermeture} className="grid place-items-center size-6 hover:bg-muted rounded-sm transition-colors text-muted-foreground" aria-label="Fermer">
                          <X className="size-3.5" />
                        </button>
                      </div>
                      <p className="text-xs/relaxed text-muted-foreground">
                        Nous utilisons des cookies pour optimiser votre expérience. Personnalisez vos choix ci-dessous.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <div className="flex gap-1.5">
                      <Button
                        onClick={gererAcceptationTotale}
                        disabled={consent === 'accepted'}
                        className={cn(
                          "flex-1",
                          consent === 'accepted'
                            ? "bg-success/15 text-success hover:bg-success/15 cursor-default"
                            : ""
                        )}
                      >
                        {consent === 'accepted' ? (<><Check /> Accepté</>) : "Accepter tout"}
                      </Button>
                      <Button
                        onClick={gererRefusTotal}
                        variant="outline"
                        disabled={consent === 'rejected'}
                        className={cn(
                          "flex-1",
                          consent === 'rejected' && "bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/10 cursor-default"
                        )}
                      >
                        {consent === 'rejected' ? (<><X /> Refusé</>) : "Refuser"}
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setChoixTemporaires(choices)
                        setVue('manage')
                      }}
                      className="w-full text-muted-foreground hover:text-foreground group"
                    >
                      <Settings className="group-hover:rotate-45 transition-transform" />
                      Gérer mes préférences
                      <ChevronRight />
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="manage-view"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="p-4 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Settings className="size-4 text-accent-texte" />
                      Préférences cookies
                    </h3>
                    <button onClick={() => setVue('summary')} className="text-xs font-medium text-accent-texte hover:underline">Retour</button>
                  </div>

                  <div className="space-y-2">
                    {/* Interrupteurs granulaires */}
                    {[
                      { key: 'essential', label: 'Essentiels', desc: 'Nécessaires au fonctionnement du site.', icon: Lock, required: true },
                      { key: 'preferences', label: 'Personnalisation', desc: 'Mémorise vos thèmes et réglages.', icon: Settings },
                      { key: 'analytics', label: 'Analytiques', desc: 'Améliore le site via des mesures anonymes.', icon: Check }
                    ].map((element) => (
                      <div
                        key={element.key}
                        onClick={() => !element.required && basculerChoix(element.key as keyof CookieChoices)}
                        className={cn(
                          "flex items-center gap-3 p-2 rounded-md border transition-colors cursor-pointer",
                          choixTemporaires[element.key as keyof CookieChoices]
                            ? "bg-muted/60 border-border"
                            : "bg-transparent border-transparent opacity-60"
                        )}
                      >
                        <div className={cn(
                          "size-7 rounded-sm flex items-center justify-center flex-shrink-0",
                          choixTemporaires[element.key as keyof CookieChoices] ? "bg-accent/10 text-accent-texte" : "bg-muted text-muted-foreground"
                        )}>
                          <element.icon className="size-3.5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium">{element.label}</p>
                          <p className="text-[10px] text-muted-foreground leading-tight">{element.desc}</p>
                        </div>
                        <div className={cn(
                          "w-8 h-[18px] rounded-full relative transition-colors p-0.5 shrink-0",
                          choixTemporaires[element.key as keyof CookieChoices] ? "bg-accent" : "bg-muted-foreground/30"
                        )}>
                          <motion.div
                            animate={{ x: choixTemporaires[element.key as keyof CookieChoices] ? 14 : 0 }}
                            className="size-3.5 bg-white rounded-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <Button
                    onClick={gererEnregistrementSelection}
                    disabled={estEnregistre}
                    className="w-full h-9"
                  >
                    {estEnregistre ? (
                      <>
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}><Check className="size-3.5" /></motion.div>
                        Choix enregistrés !
                      </>
                    ) : 'Enregistrer ma sélection'}
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>
      ) : (
        <motion.button
          key="cookie-badge"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setEstDeploye(true)}
          className="surface-flottante fixed bottom-4 left-4 size-10 rounded-md z-[100] flex items-center justify-center text-accent-texte hover:text-foreground transition-colors group"
          aria-label="Préférences de confidentialité"
        >
          <Cookie className="size-4 group-hover:rotate-12 transition-transform" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
