import React, { useState } from 'react'
import { useCookieConsent, type CookieChoices } from '@/hooks/useCookieConsent'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Cookie, X, Settings, Check, ChevronRight, Lock } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

export function PrivacyBadge() {
  const { consent, choices, acceptAll, rejectAll, saveChoices, dismissCookies, isLoaded } = useCookieConsent()
  const [isExpanded, setIsExpanded] = useState(false)
  const [view, setView] = useState<'summary' | 'manage'>('summary')
  const [tempChoices, setTempChoices] = useState<CookieChoices>(choices)
  const [isSaved, setIsSaved] = useState(false)

  if (!isLoaded) return null

  const handleAcceptAll = () => {
    acceptAll()
    setIsExpanded(false)
  }

  const handleRejectAll = () => {
    rejectAll()
    setIsExpanded(false)
  }

  const handleSaveSelection = () => {
    saveChoices(tempChoices)
    setIsSaved(true)
    setTimeout(() => {
      setIsSaved(false)
      setIsExpanded(false)
      setView('summary')
    }, 1500)
  }

  const handleDismiss = () => {
    if (consent === null) dismissCookies()
    setIsExpanded(false)
    setView('summary')
  }

  const toggleChoice = (key: keyof CookieChoices) => {
    if (key === 'essential') return // Essential is always true
    setTempChoices(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const isVisible = consent === null || isExpanded

  return (
    <AnimatePresence mode="wait">
      {isVisible ? (
        <motion.div
          key="cookie-banner"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          className="fixed bottom-6 left-6 right-6 md:left-6 md:right-auto md:max-w-md z-[100]"
        >
          <Card className="bg-card/95 backdrop-blur-2xl border-border/50 shadow-2xl rounded-[2.5rem] overflow-hidden relative">
            <AnimatePresence mode="wait">
              {view === 'summary' ? (
                <motion.div
                  key="summary-view"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="p-6 space-y-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Cookie className="w-6 h-6 text-accent" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-foreground tracking-tight">Confidentialité</h3>
                        <button onClick={handleDismiss} className="p-1 hover:bg-accent/10 rounded-lg transition-colors text-muted-foreground">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                        Nous utilisons des cookies pour optimiser votre expérience. Personnalisez vos choix ci-dessous.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                      <Button 
                        onClick={handleAcceptAll} 
                        disabled={consent === 'accepted'}
                        className={cn(
                          "flex-1 rounded-xl font-bold h-10 transition-all",
                          consent === 'accepted' 
                            ? "bg-green-500/20 text-green-500 border border-green-500/20 hover:bg-green-500/20 cursor-default shadow-none" 
                            : "bg-accent hover:bg-accent/90 text-accent-foreground"
                        )}
                      >
                        {consent === 'accepted' ? (
                          <span className="flex items-center gap-2"><Check className="w-4 h-4" /> Accepté</span>
                        ) : "Accepter tout"}
                      </Button>
                      <Button 
                        onClick={handleRejectAll} 
                        variant="outline" 
                        disabled={consent === 'rejected'}
                        className={cn(
                          "flex-1 rounded-xl border-border/50 font-bold h-10 transition-all",
                          consent === 'rejected'
                            ? "bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500/10 cursor-default"
                            : "hover:bg-accent/10 hover:text-foreground"
                        )}
                      >
                         {consent === 'rejected' ? (
                          <span className="flex items-center gap-2"><X className="w-4 h-4" /> Refusé</span>
                        ) : "Refuser"}
                      </Button>
                    </div>
                    <Button 
                      variant="ghost" 
                      onClick={() => {
                        setTempChoices(choices)
                        setView('manage')
                      }}
                      className="w-full h-10 rounded-xl text-muted-foreground hover:text-foreground font-semibold flex items-center justify-center gap-2 group"
                    >
                      <Settings className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                      Gérer mes préférences
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="manage-view"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="p-6 space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                      <Settings className="w-5 h-5 text-accent" />
                      Préférences Cookies
                    </h3>
                    <button onClick={() => setView('summary')} className="text-sm font-bold text-accent hover:underline">Retour</button>
                  </div>

                  <div className="space-y-4">
                    {/* Granular Toggles */}
                    {[
                      { key: 'essential', label: 'Essentiels', desc: 'Nécessaires au fonctionnement du site.', icon: Lock, required: true },
                      { key: 'preferences', label: 'Personnalisation', desc: 'Mémorise vos thèmes et réglages.', icon: Settings },
                      { key: 'analytics', label: 'Analytiques', desc: 'Améliore le site via des mesures anonymes.', icon: Check }
                    ].map((item) => (
                      <div 
                        key={item.key}
                        onClick={() => !item.required && toggleChoice(item.key as keyof CookieChoices)}
                        className={cn(
                          "flex items-center gap-4 p-3 rounded-2xl border transition-all cursor-pointer",
                          tempChoices[item.key as keyof CookieChoices] 
                            ? "bg-accent/5 border-accent/20" 
                            : "bg-muted/5 border-transparent opacity-60"
                        )}
                      >
                        <div className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
                          tempChoices[item.key as keyof CookieChoices] ? "bg-accent/10 text-accent" : "bg-muted/20 text-muted-foreground"
                        )}>
                          <item.icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-bold">{item.label}</p>
                          <p className="text-[10px] text-muted-foreground font-medium leading-tight">{item.desc}</p>
                        </div>
                        <div className={cn(
                          "w-10 h-6 rounded-full relative transition-colors p-1",
                          tempChoices[item.key as keyof CookieChoices] ? "bg-accent" : "bg-muted"
                        )}>
                          <motion.div 
                            animate={{ x: tempChoices[item.key as keyof CookieChoices] ? 16 : 0 }}
                            className="w-4 h-4 bg-white rounded-full shadow-sm"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <Button 
                    onClick={handleSaveSelection}
                    disabled={isSaved}
                    className="w-full h-12 rounded-xl bg-foreground text-background font-bold hover:bg-foreground/90 transition-all flex items-center justify-center gap-2"
                  >
                    {isSaved ? (
                      <>
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}><Check className="w-5 h-5" /></motion.div>
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
          onClick={() => setIsExpanded(true)}
          className="fixed bottom-6 left-6 w-12 h-12 bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl shadow-xl z-[100] flex items-center justify-center text-accent hover:text-foreground transition-colors group"
        >
          <Cookie className="w-6 h-6 group-hover:rotate-12 transition-transform" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
