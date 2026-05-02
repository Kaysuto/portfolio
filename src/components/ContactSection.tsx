import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Mail, Copy, ExternalLink, Send, Loader2, ArrowUpRight } from "lucide-react"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { DiscordModal } from "@/components/ui/DiscordModal"
import { fadeInUp, staggerContainer, VIEWPORT } from "@/lib/animations"
import { contactSchema, type ContactFormValues } from "@/lib/contact-schema"
import { cn } from "@/lib/utils"

const EMAIL = "contact@kaysuto.fr"
const DISCORD_GUILD = "1352228798585638983"
const DISCORD_INVITE = "https://discord.gg/AYrvJCA2DW"

const DiscordIcon = ({ className }: { className?: string }) => (
  <svg role="img" viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1971.3728.2914a.077.077 0 01-.0066.1277 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.419-2.157 2.419zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419z" />
  </svg>
)

function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" },
  })

  const onSubmit = async (values: ContactFormValues) => {
    setIsSubmitting(true)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
      const data = await res.json()
      if (!res.ok) {
        toast.error(data.error ?? "Une erreur est survenue.")
      } else {
        toast.success("Message envoyé ! Je te réponds bientôt.")
        form.reset()
      }
    } catch {
      toast.error("Impossible d'envoyer le message. Vérifie ta connexion.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                    className="h-11 bg-accent/8 dark:bg-accent/8 border-accent/20 rounded-xl focus-visible:ring-accent/30 text-sm"
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
                    className="h-11 bg-accent/8 dark:bg-accent/8 border-accent/20 rounded-xl focus-visible:ring-accent/30 text-sm"
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
                  className="bg-accent/8 border-accent/20 rounded-xl focus-visible:ring-accent/30 resize-none text-sm p-4"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-11 rounded-xl bg-accent text-background text-sm font-medium flex items-center justify-center gap-2 hover:opacity-80 transition-opacity disabled:opacity-50"
        >
          {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          Envoyer le message
        </button>
      </form>
    </Form>
  )
}

export function ContactSection() {
  const [discordOnline, setDiscordOnline] = useState<number | null>(null)
  const [showDiscordModal, setShowDiscordModal] = useState(false)

  useEffect(() => {
    fetch(`https://discord.com/api/guilds/${DISCORD_GUILD}/widget.json`)
      .then(r => r.ok ? r.json() : null)
      .then(d => { if (d?.presence_count != null) setDiscordOnline(d.presence_count) })
      .catch(() => {})
  }, [])

  const handleCopyEmail = async () => {
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
        {/* Header */}
        <motion.div variants={fadeInUp} className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            Travaillons <span className="text-accent">ensemble.</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto">
            Projet, question, simple bonjour : écris-moi. Je réponds sous 48h en général.
            Tu peux aussi passer par{" "}
            <button onClick={handleCopyEmail} className="text-foreground underline underline-offset-2 hover:text-accent transition-colors">
              mail direct
            </button>{" "}
            si tu préfères.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div variants={fadeInUp} className="max-w-2xl mx-auto">
          <ContactForm />
        </motion.div>

        {/* Status badges */}
      </motion.div>

      <DiscordModal isOpen={showDiscordModal} onClose={() => setShowDiscordModal(false)} />
    </section>
  )
}
