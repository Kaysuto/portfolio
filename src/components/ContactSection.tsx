import { useState } from "react"
import { EnvelopeSimple, User, Buildings, ChatCircle, PaperPlaneTilt, CheckCircle, Warning, Copy } from "@phosphor-icons/react"
import { toast } from "sonner"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"

interface FormData {
  name: string
  email: string
  company: string
  subject: string
  message: string
}

export function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: ""
  })
  
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}
    if (!formData.name.trim()) newErrors.name = "Requis"
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Email invalide"
    if (!formData.message.trim()) newErrors.message = "Requis"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    setIsSubmitting(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      setIsSuccess(true)
      toast.success("Message envoyé !")
      setFormData({ name: "", email: "", company: "", subject: "", message: "" })
      setTimeout(() => setIsSuccess(false), 5000)
    } catch (error) {
      toast.error("Erreur lors de l'envoi")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText("contact@kimiya.pro")
    toast.success("Email copié !")
  }

  return (
    <section id="contact" className="py-24 px-6 bg-secondary/30 relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Parlons de votre <span className="text-accent">projet</span></h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Une idée ? Un besoin spécifique ? Je suis à votre écoute.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 bg-card/50 border-border/50">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-accent/10 rounded-lg text-accent">
                  <ChatCircle size={24} />
                </div>
                <h3 className="text-2xl font-semibold">Contactez-moi</h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom</Label>
                    <Input 
                      id="name" 
                      value={formData.name} 
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className={errors.name ? "border-destructive" : ""}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={formData.email} 
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className={errors.email ? "border-destructive" : ""}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Sujet</Label>
                  <Input 
                    id="subject" 
                    value={formData.subject} 
                    onChange={e => setFormData({...formData, subject: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <textarea
                    id="message"
                    className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                  disabled={isSubmitting || isSuccess}
                >
                  {isSubmitting ? "Envoi..." : isSuccess ? <CheckCircle size={20} /> : "Envoyer"}
                </Button>
              </form>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Card className="p-8 bg-card/50 border-border/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-accent/10 rounded-lg text-accent">
                  <EnvelopeSimple size={24} />
                </div>
                <h3 className="text-2xl font-semibold">Contact direct</h3>
              </div>
              <p className="text-muted-foreground mb-6">
                Pour toute demande urgente ou professionnelle.
              </p>
              <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-xl border border-border/50">
                <span className="font-medium">contact@kimiya.pro</span>
                <Button variant="ghost" size="icon" onClick={handleCopyEmail}>
                  <Copy size={18} />
                </Button>
              </div>
            </Card>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="p-6 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center gap-4"
            >
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <div>
                <p className="font-semibold text-green-600 dark:text-green-400">Disponible</p>
                <p className="text-sm text-muted-foreground">Ouvert à de nouvelles opportunités.</p>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="p-6 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center gap-4"
            >
              <div className="w-3 h-3 bg-blue-500 rounded-full" />
              <div>
                <p className="font-semibold text-blue-600 dark:text-blue-400">Réponse rapide</p>
                <p className="text-sm text-muted-foreground">Sous 24 heures ouvrables.</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
