import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Loader2, Copy } from "lucide-react"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { DiscordModal } from "@/components/ui/DiscordModal"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { Sticker } from "@/components/ui/Sticker"
import { fadeInUp, staggerContainer, VIEWPORT } from "@/lib/animations"
import { contactSchema, type ContactFormValues } from "@/lib/contact-schema"

const EMAIL = "contact@kaysuto.fr"
const DISCORD_GUILD = "1352228798585638983"

function ContactForm() {
  const [estEnEnvoi, setEstEnEnvoi] = useState(false)
  const [estEnvoye, setEstEnvoye] = useState(false)

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" },
  })

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
        toast.error(donnees.error ?? "Une erreur est survenue.")
      } else {
        toast.success("Message envoyé ! Je te réponds bientôt.")
        form.reset()
        setEstEnvoye(true)
        setTimeout(() => setEstEnvoye(false), 6000)
      }
    } catch {
      toast.error("Impossible d'envoyer le message. Vérifie ta connexion.")
    } finally {
      setEstEnEnvoi(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(surSoumission)} className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Nom</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Votre nom"
                    className="h-11 bg-input border-accent/20 rounded-xl focus-visible:ring-accent/30 text-sm"
                    {...field}
                  />
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
                <FormLabel className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="votre@email.com"
                    className="h-11 bg-input border-accent/20 rounded-xl focus-visible:ring-accent/30 text-sm"
                    {...field}
                  />
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
              <FormLabel className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Votre projet, votre question…"
                  rows={5}
                  className="bg-input border-accent/20 rounded-xl focus-visible:ring-accent/30 resize-none text-sm p-4"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <button
          type="submit"
          disabled={estEnEnvoi}
          className="w-full h-11 rounded-xl bg-accent text-accent-foreground text-sm font-medium flex items-center justify-center gap-2 hover:opacity-80 transition-opacity disabled:opacity-50"
        >
          {estEnEnvoi ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          Envoyer le message
        </button>

        {/* Confirmation visuelle après l'envoi, en complément du toast */}
        <AnimatePresence>
          {estEnvoye && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex items-center justify-center gap-3 text-sm font-bold text-sage pt-2"
            >
              <Sticker name="pouce" size={88} />
              Message bien reçu, merci !
            </motion.p>
          )}
        </AnimatePresence>
      </form>
    </Form>
  )
}

export function ContactSection() {
  const [, setDiscordEnLigne] = useState<number | null>(null)
  const [afficherModaleDiscord, setAfficherModaleDiscord] = useState(false)

  useEffect(() => {
    fetch(`https://discord.com/api/guilds/${DISCORD_GUILD}/widget.json`)
      .then(reponse => reponse.ok ? reponse.json() : null)
      .then(donnees => { if (donnees?.presence_count != null) setDiscordEnLigne(donnees.presence_count) })
      .catch(() => {})
  }, [])

  const gererCopieEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      toast.success("Email copié !")
    } catch {
      toast.error("Erreur lors de la copie")
    }
  }

  return (
    <section id="contact" className="py-24 lg:py-32 px-6 lg:px-12 relative overflow-hidden">
      <motion.div
        className="max-w-6xl mx-auto relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        variants={staggerContainer}
      >
        <SectionHeading index="03" title={<>Travaillons <span className="text-accent">ensemble.</span></>} />

        <div className="grid lg:grid-cols-12 gap-x-12 gap-y-10 pt-12 border-t border-border/60">
          {/* Colonne éditoriale */}
          <motion.div variants={fadeInUp} className="lg:col-span-5 space-y-8">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Projet, question, simple bonjour : écris-moi. Je réponds sous 48h en général.
              Tu peux aussi passer par{" "}
              <button
                onClick={gererCopieEmail}
                className="text-foreground underline underline-offset-2 hover:text-accent transition-colors"
              >
                mail direct
              </button>{" "}
              si tu préfères.
            </p>

            <div className="border-l-2 border-accent/30 pl-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-muted-foreground mb-2">
                Mail direct
              </p>
              <button
                onClick={gererCopieEmail}
                className="flex items-center gap-2 text-base font-bold text-foreground hover:text-accent transition-colors group"
              >
                <span className="font-mono">{EMAIL}</span>
                <Copy className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
              </button>
            </div>
          </motion.div>

          {/* Formulaire */}
          <motion.div variants={fadeInUp} className="lg:col-span-7">
            <ContactForm />
          </motion.div>
        </div>
      </motion.div>

      <DiscordModal isOpen={afficherModaleDiscord} onClose={() => setAfficherModaleDiscord(false)} />
    </section>
  )
}
