import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Mail, Copy, Clock, Zap, ExternalLink, Send, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { DiscordModal } from "@/components/ui/DiscordModal"
import { fadeInUp, staggerContainer, VIEWPORT } from "@/lib/animations"
import { contactSchema, type ContactFormValues } from "@/lib/contact-schema"

const EMAIL = "contact@kaysuto.fr"

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

  const onSubmit = (values: ContactFormValues) => {
    setIsSubmitting(true)
    const subject = encodeURIComponent(`Message de ${values.name}`)
    const body = encodeURIComponent(
      `Nom : ${values.name}\nEmail : ${values.email}\n\n${values.message}`
    )
    setTimeout(() => {
      window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`
      toast.success("Message préparé ! Votre client email va s'ouvrir.")
      setIsSubmitting(false)
      form.reset()
    }, 800)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid sm:grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold">Nom</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Votre nom"
                    className="rounded-xl h-11 bg-background/50 border-border/60 focus-visible:ring-accent/40"
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
                <FormLabel className="text-sm font-semibold">Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="votre@email.fr"
                    className="rounded-xl h-11 bg-background/50 border-border/60 focus-visible:ring-accent/40"
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
              <FormLabel className="text-sm font-semibold">Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Dites-moi tout..."
                  rows={5}
                  className="rounded-xl bg-background/50 border-border/60 focus-visible:ring-accent/40 resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-12 rounded-2xl bg-accent hover:bg-accent/90 text-accent-foreground font-bold gap-2 transition-all active:scale-[0.98]"
        >
          {isSubmitting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
          Envoyer le message
        </Button>
      </form>
    </Form>
  )
}

export function ContactSection() {
  const [discordOnline, setDiscordOnline] = useState<number | null>(null)
  const [showDiscordModal, setShowDiscordModal] = useState(false)

  useEffect(() => {
    fetch("https://discord.com/api/guilds/1352228798585638983/widget.json")
      .then((res) => {
        if (!res.ok) return
        return res.json()
      })
      .then((data) => {
        if (data && typeof data.presence_count === "number") {
          setDiscordOnline(data.presence_count)
        }
      })
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
    <section id="contact" className="py-16 px-6 bg-background relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.03, 0.08, 0.03] }}
          transition={{ duration: 15, repeat: Infinity, delay: 2 }}
          className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        className="max-w-5xl mx-auto relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        variants={staggerContainer}
      >
        {/* Header */}
        <motion.div className="text-center mb-10" variants={fadeInUp}>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">
            On reste en <span className="text-accent">contact</span> ?
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium">
            Que ce soit pour un projet, une question ou simplement rejoindre ma communauté,
            choisissez le canal qui vous convient le mieux.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {/* Email Card */}
          <motion.div variants={fadeInUp}>
            <Card className="bg-card/40 backdrop-blur-md border-border/50 rounded-[2.5rem] overflow-hidden shadow-2xl h-full hover:bg-card/50 transition-colors">
              <CardContent className="p-8 text-center flex flex-col items-center justify-between h-full">
                <div className="flex flex-col items-center gap-4">
                  <div className="p-4 bg-accent/10 rounded-2xl mb-2">
                    <Mail className="w-8 h-8 text-accent" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-foreground tracking-tight">Contact direct</h3>
                    <p className="text-sm text-muted-foreground font-medium">
                      Copiez mon adresse email ou ouvrez votre client habituel.
                    </p>
                  </div>
                </div>

                <div className="w-full space-y-4 mt-6">
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="w-full p-4 bg-accent/5 rounded-2xl border border-accent/10 flex items-center justify-between hover:bg-accent/10 transition-colors cursor-pointer"
                  >
                    <span className="text-lg font-bold text-foreground tracking-tight">{EMAIL}</span>
                    <Copy className="w-5 h-5 text-accent shrink-0" />
                  </button>
                  <Button
                    asChild
                    className="w-full h-14 rounded-2xl bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-base gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    <a href={`mailto:${EMAIL}`}>Ouvrir le client email</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Discord Card */}
          <motion.div variants={fadeInUp}>
            <Card className="bg-card/40 backdrop-blur-md border-border/50 rounded-[2.5rem] overflow-hidden shadow-2xl h-full hover:bg-card/50 transition-colors">
              <CardContent className="p-8 text-center flex flex-col items-center justify-between h-full">
                <div className="flex flex-col items-center gap-4">
                  <div className="p-4 bg-accent/10 rounded-2xl mb-2">
                    <DiscordIcon className="w-8 h-8 text-accent" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-foreground tracking-tight">Communauté Discord</h3>
                    <p className="text-sm text-muted-foreground font-medium">
                      Rejoignez mon serveur pour échanger et suivre mon actualité en direct.
                    </p>
                  </div>
                </div>

                <div className="w-full mt-6">
                  {discordOnline !== null && (
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                      </span>
                      <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                        {discordOnline} Membres en ligne
                      </span>
                    </div>
                  )}
                  <Button
                    className="w-full h-14 rounded-2xl bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-base gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all"
                    onClick={() => setShowDiscordModal(true)}
                  >
                    Rejoindre le serveur
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Info cards */}
          <motion.div
            variants={fadeInUp}
            whileHover={{ y: -4 }}
            className="p-6 bg-green-500/10 border border-green-500/20 rounded-[2.5rem] flex items-start gap-5 transition-all"
          >
            <div className="p-3 bg-green-500/20 rounded-2xl shrink-0">
              <Zap className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-foreground mb-1">Disponible</h4>
              <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                Prêt pour de nouvelles opportunités et collaborations passionnantes.
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            whileHover={{ y: -4 }}
            className="p-6 bg-blue-500/10 border border-blue-500/20 rounded-[2.5rem] flex items-start gap-5 transition-all"
          >
            <div className="p-3 bg-blue-500/20 rounded-2xl shrink-0">
              <Clock className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-foreground mb-1">Réponse rapide</h4>
              <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                Je m'engage à traiter vos demandes en moins de 24 heures ouvrables.
              </p>
            </div>
          </motion.div>
        </div>


      </motion.div>

      <DiscordModal isOpen={showDiscordModal} onClose={() => setShowDiscordModal(false)} />
    </section>
  )
}
