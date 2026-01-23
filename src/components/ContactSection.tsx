import { useState } from "react"
import { 
  Mail, 
  User, 
  Building2, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  ChevronDown, 
  Copy, 
  Check,
  Clock,
  MapPin,
  Sparkles
} from "lucide-react"
import { toast } from "sonner"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface FormData {
  name: string
  email: string
  company: string
  subject: string
  projectType: string
  message: string
}

export function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    subject: "",
    projectType: "",
    message: ""
  })
  
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [emailCopied, setEmailCopied] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

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
      toast.success("Message envoyé avec succès !")
      setFormData({ 
        name: "", 
        email: "", 
        company: "", 
        subject: "", 
        projectType: "", 
        message: "" 
      })
      setTimeout(() => setIsSuccess(false), 5000)
    } catch {
      toast.error("Erreur lors de l'envoi")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText("contact@kimiya.pro")
    setEmailCopied(true)
    toast.success("Email copié !")
    setTimeout(() => setEmailCopied(false), 2000)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <section id="contact" className="py-32 px-6 relative overflow-hidden noise-bg">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(166,139,124,0.03),transparent_70%)]" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-secondary text-primary mb-6 border-2 border-foreground/10"
          >
            <Sparkles size={16} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Disponible pour de nouveaux projets</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 uppercase italic tracking-tighter">
            Parlons de votre <span className="text-primary">projet</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-medium italic">
            "Une idée ? Un besoin spécifique ? Je suis à votre écoute."
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-5 gap-6"
        >
          {/* Colonne de gauche - Informations de contact */}
          <motion.div variants={itemVariants} className="lg:col-span-2 space-y-4">
            {/* Carte Email */}
            <div className="bg-card rounded-3xl p-6 border-2 border-foreground/10 shadow-xl hover:border-primary transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-secondary text-primary border-2 border-foreground/5">
                  <Mail size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="font-black text-base mb-1 uppercase italic tracking-tighter">Email direct</h3>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 px-3 py-2 bg-secondary rounded-lg text-[10px] font-black uppercase tracking-tighter border-2 border-foreground/5">
                      contact@kimiya.pro
                    </code>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={handleCopyEmail}
                      className="h-10 w-10 rounded-lg bg-card border-2 border-foreground/10 hover:bg-primary hover:text-primary-foreground transition-all"
                    >
                      {emailCopied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Carte Disponibilité */}
            <div className="bg-card rounded-3xl p-6 border-2 border-foreground/10 shadow-xl hover:border-primary transition-all duration-300 group">
              <div className="flex items-start gap-4">
                <div className="relative">
                  <div className="p-3 rounded-xl bg-secondary text-primary border-2 border-foreground/5">
                    <Clock size={20} />
                  </div>
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse border-2 border-card" />
                </div>
                <div>
                  <h3 className="font-black text-base mb-1 uppercase italic tracking-tighter">Disponibilité</h3>
                  <p className="text-xs text-muted-foreground font-medium italic">
                    Ouvert aux collaborations.
                  </p>
                </div>
              </div>
            </div>

            {/* Carte Localisation */}
            <div className="bg-card rounded-3xl p-6 border-2 border-foreground/10 shadow-xl hover:border-primary transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-secondary text-primary border-2 border-foreground/5">
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 className="font-black text-base mb-1 uppercase italic tracking-tighter">Localisation</h3>
                  <p className="text-xs text-muted-foreground font-medium italic">
                    France • Remote
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Colonne de droite - Formulaire */}
          <motion.div variants={itemVariants} className="lg:col-span-3">
            <div className="bg-card rounded-[2rem] p-8 border-2 border-foreground/10 shadow-2xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-xl bg-primary text-primary-foreground">
                  <MessageSquare size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-black uppercase italic tracking-tighter">Envoyez un message</h3>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Nom */}
                  <div className="space-y-2">
                    <Label 
                      htmlFor="name" 
                      className="text-[9px] font-black uppercase tracking-widest text-muted-foreground"
                    >
                      Nom complet *
                    </Label>
                    <div className="relative group">
                      <User 
                        className={cn(
                          "absolute left-4 top-1/2 -translate-y-1/2 transition-colors",
                          focusedField === 'name' ? "text-primary" : "text-muted-foreground"
                        )} 
                        size={16} 
                      />
                      <Input 
                        id="name" 
                        placeholder="JEAN DUPONT"
                        value={formData.name} 
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        className={cn(
                          "pl-10 h-12 rounded-xl bg-secondary/50 border-2 border-foreground/5 focus:border-primary transition-all font-black uppercase text-[10px] tracking-tighter",
                          errors.name && "border-destructive"
                        )}
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label 
                      htmlFor="email"
                      className="text-[9px] font-black uppercase tracking-widest text-muted-foreground"
                    >
                      Email *
                    </Label>
                    <div className="relative group">
                      <Mail 
                        className={cn(
                          "absolute left-4 top-1/2 -translate-y-1/2 transition-colors",
                          focusedField === 'email' ? "text-primary" : "text-muted-foreground"
                        )} 
                        size={16} 
                      />
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="JEAN@EXEMPLE.COM"
                        value={formData.email} 
                        onChange={e => setFormData({...formData, email: e.target.value})}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        className={cn(
                          "pl-10 h-12 rounded-xl bg-secondary/50 border-2 border-foreground/5 focus:border-primary transition-all font-black uppercase text-[10px] tracking-tighter",
                          errors.email && "border-destructive"
                        )}
                      />
                    </div>
                  </div>
                </div>

                {/* Type de projet */}
                <div className="space-y-2">
                  <Label 
                    htmlFor="projectType"
                    className="text-[9px] font-black uppercase tracking-widest text-muted-foreground"
                  >
                    Type de projet
                  </Label>
                  <div className="relative">
                    <select
                      id="projectType"
                      value={formData.projectType}
                      onChange={e => setFormData({...formData, projectType: e.target.value})}
                      onFocus={() => setFocusedField('projectType')}
                      onBlur={() => setFocusedField(null)}
                      className={cn(
                        "w-full h-12 pl-4 pr-10 rounded-xl text-[10px] font-black uppercase tracking-tighter appearance-none transition-all",
                        "bg-secondary/50 border-2 border-foreground/5 focus:border-primary focus:outline-none"
                      )}
                    >
                      <option value="" disabled>SÉLECTIONNEZ UN TYPE</option>
                      <option value="web">🌐 SITE WEB / APP</option>
                      <option value="mobile">📱 APP MOBILE</option>
                      <option value="design">🎨 DESIGN UI/UX</option>
                      <option value="other">✨ AUTRE</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" size={16} />
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label 
                    htmlFor="message"
                    className="text-[9px] font-black uppercase tracking-widest text-muted-foreground"
                  >
                    Message *
                  </Label>
                  <textarea
                    id="message"
                    placeholder="DÉCRIVEZ VOTRE PROJET..."
                    className={cn(
                      "flex min-h-[120px] w-full rounded-2xl px-4 py-3 text-[10px] font-medium italic transition-all resize-none",
                      "bg-secondary/50 border-2 border-foreground/5 focus:border-primary focus:outline-none",
                      errors.message && "border-destructive"
                    )}
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>

                {/* Bouton Submit */}
                <Button 
                  type="submit" 
                  className={cn(
                    "w-full h-14 text-base font-black rounded-xl transition-all duration-300 uppercase italic tracking-tighter shadow-xl",
                    "bg-primary hover:bg-primary/90 text-primary-foreground shadow-primary/20",
                    isSuccess && "bg-green-500 hover:bg-green-600"
                  )}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-4 border-white/30 border-t-white rounded-full"
                    />
                  ) : isSuccess ? (
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={24} />
                      <span>Transmis</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <Send size={20} />
                      <span>Envoyer</span>
                    </div>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
