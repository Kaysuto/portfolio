import { useState, useEffect } from "react"
import { motion, Variants } from "framer-motion"
import { 
  Mail, 
  Copy, 
  Clock,
  Zap,
  ExternalLink
} from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DiscordModal } from "@/components/ui/DiscordModal"

const DiscordIcon = ({ className }: { className?: string }) => (
  <svg 
    role="img" 
    viewBox="0 0 24 24" 
    className={className} 
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1971.3728.2914a.077.077 0 01-.0066.1277 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.419-2.157 2.419zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419z"/>
  </svg>
)

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
}

export function ContactSection() {
  const [discordOnline, setDiscordOnline] = useState<number | null>(null)
  const [showDiscordModal, setShowDiscordModal] = useState(false)

  useEffect(() => {
    fetch("https://discord.com/api/guilds/1352228798585638983/widget.json")
      .then(res => res.json())
      .then(data => {
        if (data && typeof data.presence_count === "number") {
          setDiscordOnline(data.presence_count)
        }
      })
      .catch(() => {})
  }, [])

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("contact@kimiya.pro")
      toast.success("Email copié !")
    } catch (err) {
      toast.error("Erreur lors de la copie")
    }
  }

  return (
    <section id="contact" className="py-16 px-6 bg-background relative overflow-hidden">
      {/* Background Elements */}
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
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        {/* Section Header */}
        <motion.div className="text-center mb-10" variants={itemVariants}>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">
            On reste en <span className="text-accent">contact</span> ?
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium">
            Que ce soit pour un projet, une question ou simplement rejoindre ma communauté, 
            choisissez le canal qui vous convient le mieux.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          
          {/* Direct Email Card */}
          <motion.div variants={itemVariants}>
            <Card className="bg-card/40 backdrop-blur-md border-border/50 rounded-[2.5rem] overflow-hidden shadow-2xl h-full transition-colors hover:bg-card/50">
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
                  <div 
                    onClick={handleCopyEmail}
                    className="p-4 bg-accent/5 rounded-2xl border border-accent/10 flex items-center justify-between group transition-all hover:bg-accent/10 cursor-pointer"
                  >
                    <span className="text-lg font-bold text-foreground tracking-tight">contact@kimiya.pro</span>
                    <Copy className="w-5 h-5 text-accent" />
                  </div>

                  <Button 
                    asChild
                    className="w-full h-14 rounded-2xl bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-base gap-3 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <a href="mailto:contact@kimiya.pro">
                      Ouvrir le client email
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Discord Community Card */}
          <motion.div variants={itemVariants}>
            <Card className="bg-card/40 backdrop-blur-md border-border/50 rounded-[2.5rem] overflow-hidden shadow-2xl h-full transition-colors hover:bg-card/50">
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
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                      </span>
                      <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{discordOnline} Membres en ligne</span>
                    </div>
                  )}
                  <Button 
                    className="w-full h-14 rounded-2xl bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-base gap-3 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    onClick={() => setShowDiscordModal(true)}
                  >
                    Rejoindre le serveur
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Availability Card */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="p-6 bg-green-500/10 border border-green-500/20 rounded-[2.5rem] flex items-start gap-5 transition-all"
          >
            <div className="p-3 bg-green-500/20 rounded-2xl">
              <Zap className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-foreground mb-1">Disponible</h4>
              <p className="text-sm text-muted-foreground leading-relaxed font-medium">Prêt pour de nouvelles opportunités et collaborations passionnantes.</p>
            </div>
          </motion.div>

          {/* Response Time Card */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="p-6 bg-blue-500/10 border border-blue-500/20 rounded-[2.5rem] flex items-start gap-5 transition-all"
          >
            <div className="p-3 bg-blue-500/20 rounded-2xl">
              <Clock className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-foreground mb-1">Réponse rapide</h4>
              <p className="text-sm text-muted-foreground leading-relaxed font-medium">Je m'engage à traiter vos demandes en moins de 24 heures ouvrables.</p>
            </div>
          </motion.div>

        </div>
      </motion.div>

      <DiscordModal 
        isOpen={showDiscordModal}
        onClose={() => setShowDiscordModal(false)}
      />
    </section>
  )
}
