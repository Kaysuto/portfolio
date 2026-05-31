import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Send, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { DiscordModal } from "@/components/ui/DiscordModal"
import { fadeInUp, staggerContainer, VIEWPORT } from "@/lib/animations"
import { contactSchema, type ContactFormValues } from "@/lib/contact-schema"

const EMAIL = "contact@kaysuto.fr"
const DISCORD_GUILD = "1352228798585638983"

function ContactForm() {
  const [estEnEnvoi, setEstEnEnvoi] = useState(false)

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
          className="w-full h-11 rounded-xl bg-accent text-background text-sm font-medium flex items-center justify-center gap-2 hover:opacity-80 transition-opacity disabled:opacity-50"
        >
          {estEnEnvoi ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          Envoyer le message
        </button>
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
    <section id="contact" className="py-24 px-6 relative overflow-hidden">

      <motion.div
        className="max-w-5xl mx-auto relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        variants={staggerContainer}
      >
        {/* En-tête */}
        <motion.div variants={fadeInUp} className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            Travaillons <span className="text-accent">ensemble.</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto">
            Projet, question, simple bonjour : écris-moi. Je réponds sous 48h en général.
            Tu peux aussi passer par{" "}
            <button onClick={gererCopieEmail} className="text-foreground underline underline-offset-2 hover:text-accent transition-colors">
              mail direct
            </button>{" "}
            si tu préfères.
          </p>
        </motion.div>

        {/* Formulaire */}
        <motion.div variants={fadeInUp} className="max-w-2xl mx-auto">
          <ContactForm />
        </motion.div>

        {/* Badges de statut */}
      </motion.div>

      <DiscordModal isOpen={afficherModaleDiscord} onClose={() => setAfficherModaleDiscord(false)} />
    </section>
  )
}
