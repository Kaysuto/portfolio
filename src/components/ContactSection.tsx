import { useState, useEffect, type ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Copy, Check, ArrowUpRight, Mail, RotateCcw } from "lucide-react"
import { DiscordLogo, GithubLogo, LinkedinLogo } from "@phosphor-icons/react"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Chargeur } from "@/components/ui/chargeur"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { DiscordModal } from "@/components/ui/DiscordModal"
import { GitHubFooterModal, LinkedInFooterModal } from "@/components/ui/SocialModals"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { fadeInUp, staggerContainer, VIEWPORT } from "@/lib/animations"
import { contactSchema, type ContactFormValues } from "@/lib/contact-schema"
import { useLangue } from "@/lib/langue"
import { cn } from "@/lib/utils"

const EMAIL = "contact@kaysuto.fr"
const DISCORD_GUILD = "1352228798585638983"

function ContactForm() {
  const [estEnEnvoi, setEstEnEnvoi] = useState(false)
  const [estEnvoye, setEstEnvoye] = useState(false)

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" },
  })
  const { langue, t } = useLangue()

  // Les messages d'erreur suivent la langue : on revalide les champs déjà en erreur quand elle change.
  useEffect(() => {
    const champs = (["name", "email", "message"] as const).filter((champ) => form.getFieldState(champ).invalid)
    if (champs.length) form.trigger(champs)
  }, [langue, form])

  const surSoumission = async (valeurs: ContactFormValues) => {
    setEstEnEnvoi(true)
    try {
      const reponse = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(valeurs),
      })
      const donnees = await reponse.json()
      if (!reponse.ok) {
        toast.error(donnees.error ?? t("Une erreur est survenue.", "Something went wrong."))
      } else {
        toast.success(t("Message envoyé ! Je te réponds bientôt.", "Message sent! I'll get back to you soon."))
        form.reset()
        setEstEnvoye(true)
      }
    } catch {
      toast.error(t("Impossible d'envoyer le message. Vérifie ta connexion.", "Couldn't send the message. Check your connection."))
    } finally {
      setEstEnEnvoi(false)
    }
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      {estEnvoye ? (
        <motion.div
          key="envoye"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
          className="flex min-h-[22rem] flex-col items-center justify-center gap-4 text-center"
        >
          <span className="grid size-14 place-items-center rounded-full bg-success/15 text-success">
            <Check className="size-7" aria-hidden="true" />
          </span>
          <p className="text-xl font-semibold tracking-tight text-foreground">
            {t("Message bien reçu, merci !", "Message received, thank you!")}
          </p>
          <p className="max-w-xs text-sm text-muted-foreground">
            {t("Je te réponds en général sous 48 h.", "I usually reply within 48 hours.")}
          </p>
          <Button variant="outline" onClick={() => setEstEnvoye(false)} className="mt-2">
            <RotateCcw />
            {t("Écrire un autre message", "Write another message")}
          </Button>
        </motion.div>
      ) : (
        <motion.div
          key="formulaire"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(surSoumission)} className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-foreground">{t("Nom", "Name")}</FormLabel>
                      <FormControl>
                        <Input placeholder={t("Votre nom", "Your name")} className="h-11" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-foreground">Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder={t("votre@email.com", "you@email.com")} className="h-11" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-foreground">Message</FormLabel>
                    <FormControl>
                      <Textarea placeholder={t("Votre projet, votre question…", "Your project, your question…")} rows={5} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Pendant l'envoi, le bouton reste plein : il est occupé, pas indisponible. */}
              <Button
                type="submit"
                disabled={estEnEnvoi}
                aria-busy={estEnEnvoi}
                size="lg"
                className="group h-11 w-full disabled:opacity-100"
              >
                {estEnEnvoi ? (
                  <Chargeur />
                ) : (
                  <Send className="transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                )}
                {estEnEnvoi ? t("Envoi en cours", "Sending") : t("Envoyer le message", "Send message")}
              </Button>
            </form>
          </Form>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/** Un canal de contact secondaire : icône, nom, précision, et une flèche qui s'envole au survol. */
function Canal({
  icone,
  titre,
  detail,
  couleur,
  onClick,
}: {
  icone: ReactNode
  titre: string
  detail: string
  /** Couleur de marque prise par l'icône au survol. */
  couleur: string
  onClick: () => void
}) {
  return (
    <motion.button
      variants={fadeInUp}
      type="button"
      onClick={onClick}
      className="group flex items-center gap-4 rounded-2xl border border-border bg-card/70 p-4 text-left backdrop-blur-sm transition-colors hover:border-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <span className={cn("grid size-11 shrink-0 place-items-center rounded-xl bg-muted text-muted-foreground transition-colors duration-300", couleur)}>
        {icone}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold text-foreground">{titre}</span>
        <span className="block truncate text-sm text-muted-foreground">{detail}</span>
      </span>
      <ArrowUpRight
        className="size-4 shrink-0 text-muted-foreground transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
        aria-hidden="true"
      />
    </motion.button>
  )
}

export function ContactSection() {
  const [discordEnLigne, setDiscordEnLigne] = useState<number | null>(null)
  const [modale, setModale] = useState<"discord" | "linkedin" | "github" | null>(null)
  const [copie, setCopie] = useState(false)
  const { t } = useLangue()

  useEffect(() => {
    fetch(`https://discord.com/api/guilds/${DISCORD_GUILD}/widget.json`)
      .then(reponse => reponse.ok ? reponse.json() : null)
      .then(donnees => { if (donnees?.presence_count != null) setDiscordEnLigne(donnees.presence_count) })
      .catch(() => {})
  }, [])

  const gererCopieEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopie(true)
      setTimeout(() => setCopie(false), 2000)
    } catch {
      toast.error(t("Erreur lors de la copie", "Couldn't copy the email"))
    }
  }

  return (
    <section id="contact" className="py-10 lg:py-14 px-6 lg:px-12 relative overflow-hidden">
      <motion.div
        className="max-w-6xl mx-auto relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        variants={staggerContainer}
      >
        <SectionHeading
          title={t(
            <>Travaillons <span className="text-accent-texte">ensemble.</span></>,
            <>Let&apos;s work <span className="text-accent-texte">together.</span></>
          )}
          lead={t(
            "Un projet, une question, ou juste un bonjour : écris-moi, par le formulaire ou là où tu préfères.",
            "A project, a question or just a hello: write to me, with the form or wherever you prefer."
          )}
        />

        <div className="grid gap-4 lg:grid-cols-[1fr_1.15fr] lg:gap-6">
          {/* Les canaux : l'e-mail en grand, copié d'un clic, puis les réseaux. */}
          <div className="grid content-start gap-4">
            <motion.div
              variants={fadeInUp}
              className="relative overflow-hidden rounded-2xl border border-border bg-card/70 p-6 backdrop-blur-sm md:p-8"
            >
              <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-accent/15 blur-3xl" />
              <span className="grid size-11 place-items-center rounded-xl bg-accent/15 text-accent-texte">
                <Mail className="size-5" aria-hidden="true" />
              </span>
              <p className="mt-6 text-sm text-muted-foreground">{t("Par e-mail", "By email")}</p>
              <p className="mt-1 break-all text-2xl font-semibold tracking-tight text-foreground md:text-3xl">{EMAIL}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                <Button variant="outline" onClick={gererCopieEmail} aria-live="polite">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={copie ? "copie" : "copier"}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.15 }}
                      className="flex items-center gap-2"
                    >
                      {copie ? <Check className="size-4 text-success" /> : <Copy className="size-4" />}
                      {copie ? t("Copiée !", "Copied!") : t("Copier l'adresse", "Copy address")}
                    </motion.span>
                  </AnimatePresence>
                </Button>
                <Button variant="ghost" asChild>
                  <a href={`mailto:${EMAIL}`}>
                    {t("Ouvrir ma messagerie", "Open my mail app")}
                    <ArrowUpRight />
                  </a>
                </Button>
              </div>
            </motion.div>

            <Canal
              icone={<LinkedinLogo size={20} />}
              titre="LinkedIn"
              detail={t("Pour le côté pro", "For the professional side")}
              couleur="group-hover:bg-[#0A66C2]/15 group-hover:text-[#0A66C2]"
              onClick={() => setModale("linkedin")}
            />
            <Canal
              icone={<DiscordLogo size={20} />}
              titre="Discord"
              detail={
                discordEnLigne != null
                  ? t(`Ma communauté · ${discordEnLigne} en ligne`, `My community · ${discordEnLigne} online`)
                  : t("Ma communauté", "My community")
              }
              couleur="group-hover:bg-[#5865F2]/15 group-hover:text-[#5865F2]"
              onClick={() => setModale("discord")}
            />
            <Canal
              icone={<GithubLogo size={20} />}
              titre="GitHub"
              detail={t("Mon code, en public", "My code, in the open")}
              couleur="group-hover:bg-foreground/10 group-hover:text-foreground"
              onClick={() => setModale("github")}
            />
          </div>

          {/* Formulaire, présenté comme une conversation avec moi. */}
          <motion.div variants={fadeInUp} className="rounded-2xl border border-border bg-card/70 p-6 text-left backdrop-blur-sm md:p-8">
            <div className="mb-6 flex items-center gap-3 border-b border-border/60 pb-6">
              <img src="/personnage/kimiya-avatar.webp" alt="" className="size-11 rounded-full bg-muted object-cover ring-1 ring-border" />
              <div className="min-w-0">
                <p className="font-semibold tracking-tight text-foreground">Kimiya</p>
                <p className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span aria-hidden="true" className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-[ping_2.4s_cubic-bezier(0,0,0.2,1)_infinite] rounded-full bg-success opacity-60 motion-reduce:animate-none" />
                    <span className="relative inline-flex size-2 rounded-full bg-success" />
                  </span>
                  {t("Répond en général sous 48 h", "Usually replies within 48 hours")}
                </p>
              </div>
            </div>
            <ContactForm />
          </motion.div>
        </div>
      </motion.div>

      <DiscordModal isOpen={modale === "discord"} onClose={() => setModale(null)} />
      <LinkedInFooterModal isOpen={modale === "linkedin"} onClose={() => setModale(null)} />
      <GitHubFooterModal isOpen={modale === "github"} onClose={() => setModale(null)} />
    </section>
  )
}
