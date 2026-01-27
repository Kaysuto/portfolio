import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, Variants } from "framer-motion"
import { 
  Mail, 
  User, 
  Building2, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  ChevronDown,
  Clock,
  Zap,
  ExternalLink
} from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface FormData {
  name: string
  email: string
  company: string
  subject: string
  projectType: string
  budget: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

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
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    subject: "",
    projectType: "",
    budget: "",
    message: ""
  })
  
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  
  const [isProjectTypeOpen, setIsProjectTypeOpen] = useState(false)
  const [isBudgetOpen, setIsBudgetOpen] = useState(false)
  
  const projectTypeRef = useRef<HTMLDivElement>(null)
  const budgetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (projectTypeRef.current && !projectTypeRef.current.contains(event.target as Node)) {
        setIsProjectTypeOpen(false)
      }
      if (budgetRef.current && !budgetRef.current.contains(event.target as Node)) {
        setIsBudgetOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Le nom est requis"
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Le nom doit contenir au moins 2 caractères"
    }

    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis"
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Veuillez entrer un email valide"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Le message est requis"
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Le message doit contenir au moins 10 caractères"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      toast.error("Veuillez corriger les erreurs dans le formulaire")
      return
    }

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
        budget: "",
        message: ""
      })
      
      setTimeout(() => setIsSuccess(false), 5000)
    } catch (error) {
      toast.error("Erreur lors de l'envoi.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("contact@kimiya.pro")
      toast.success("Email copié !")
    } catch (err) {
      toast.error("Erreur lors de la copie")
    }
  }

  return (
    <section id="contact" className="py-32 px-6 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl"
        />
      </div>

      <motion.div 
        className="max-w-7xl mx-auto relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        {/* Section Header */}
        <motion.div className="text-center mb-20" variants={itemVariants}>
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 tracking-tight">
            Parlons de votre <span className="text-accent">projet</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Vous avez une idée ? Un projet en tête ? Remplissez ce formulaire et 
            je vous répondrai dans les plus brefs délais.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Contact Form */}
          <motion.div className="lg:col-span-3" variants={itemVariants}>
            <Card className="bg-card/40 backdrop-blur-md border-border/50 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-accent/5">
              <CardContent className="p-8 md:p-12">
                <div className="flex items-center gap-4 mb-10">
                  <div className="p-3 bg-accent/10 rounded-2xl">
                    <MessageSquare className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">Envoyer un message</h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="name" className="text-sm font-semibold ml-1">Nom complet *</Label>
                      <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-accent transition-colors" />
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          className={cn(
                            "pl-12 h-12 rounded-xl bg-background/50 border-border/50 focus:border-accent/50 transition-all",
                            errors.name && "border-destructive/50 focus:border-destructive/50"
                          )}
                          placeholder="John Doe"
                        />
                      </div>
                      {errors.name && <p className="text-xs text-destructive font-medium ml-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.name}</p>}
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="email" className="text-sm font-semibold ml-1">Email *</Label>
                      <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-accent transition-colors" />
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className={cn(
                            "pl-12 h-12 rounded-xl bg-background/50 border-border/50 focus:border-accent/50 transition-all",
                            errors.email && "border-destructive/50 focus:border-destructive/50"
                          )}
                          placeholder="john@example.com"
                        />
                      </div>
                      {errors.email && <p className="text-xs text-destructive font-medium ml-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="company" className="text-sm font-semibold ml-1">Entreprise (optionnel)</Label>
                      <div className="relative group">
                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-accent transition-colors" />
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(e) => handleInputChange("company", e.target.value)}
                          className="pl-12 h-12 rounded-xl bg-background/50 border-border/50 focus:border-accent/50 transition-all"
                          placeholder="Nom de l'entreprise"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-sm font-semibold ml-1">Type de projet</Label>
                      <div className="relative" ref={projectTypeRef}>
                        <button
                          type="button"
                          onClick={() => setIsProjectTypeOpen(!isProjectTypeOpen)}
                          className="flex h-12 w-full items-center justify-between rounded-xl border border-border/50 bg-background/50 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all"
                        >
                          <span className={formData.projectType ? 'text-foreground font-medium' : 'text-muted-foreground'}>
                            {formData.projectType ? (
                              {
                                'web-app': 'Application Web',
                                'mobile-app': 'Application Mobile',
                                'website': 'Site Web',
                                'ecommerce': 'E-commerce',
                                'api': 'API/Backend',
                                'consultation': 'Consultation',
                                'other': 'Autre'
                              }[formData.projectType]
                            ) : 'Sélectionnez un type'}
                          </span>
                          <ChevronDown className={cn("w-4 h-4 text-muted-foreground transition-transform", isProjectTypeOpen && "rotate-180")} />
                        </button>
                        <AnimatePresence>
                          {isProjectTypeOpen && (
                            <motion.ul 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              className="absolute top-full left-0 w-full mt-2 bg-card border border-border/50 rounded-xl z-50 p-2 shadow-xl backdrop-blur-xl"
                            >
                              {[
                                { id: 'web-app', label: 'Application Web' },
                                { id: 'mobile-app', label: 'Application Mobile' },
                                { id: 'website', label: 'Site Web' },
                                { id: 'ecommerce', label: 'E-commerce' },
                                { id: 'api', label: 'API/Backend' },
                                { id: 'consultation', label: 'Consultation' },
                                { id: 'other', label: 'Autre' }
                              ].map((item) => (
                                <li key={item.id}>
                                  <button
                                    type="button"
                                    className="w-full text-left px-4 py-2.5 text-sm hover:bg-accent/10 hover:text-accent rounded-lg transition-colors font-medium"
                                    onClick={() => { handleInputChange("projectType", item.id); setIsProjectTypeOpen(false); }}
                                  >
                                    {item.label}
                                  </button>
                                </li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="message" className="text-sm font-semibold ml-1">Message *</Label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      rows={5}
                      className={cn(
                        "flex w-full rounded-xl border border-border/50 bg-background/50 px-4 py-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/20 transition-all resize-none",
                        errors.message && "border-destructive/50 focus-visible:ring-destructive/20"
                      )}
                      placeholder="Décrivez votre projet..."
                    />
                    {errors.message && <p className="text-xs text-destructive font-medium ml-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.message}</p>}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting || isSuccess}
                    className={cn(
                      "w-full h-14 rounded-2xl text-lg font-bold transition-all shadow-lg",
                      isSuccess 
                        ? "bg-green-500 hover:bg-green-600 text-white" 
                        : "bg-accent hover:bg-accent/90 text-accent-foreground shadow-accent/20"
                    )}
                  >
                    {isSubmitting ? (
                      <div className="w-6 h-6 border-3 border-current border-t-transparent rounded-full animate-spin" />
                    ) : isSuccess ? (
                      <div className="flex items-center gap-2"><CheckCircle2 className="w-6 h-6" /> Message envoyé !</div>
                    ) : (
                      <div className="flex items-center gap-2"><Send className="w-5 h-5" /> Envoyer le message</div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Sidebar Info */}
          <motion.div className="lg:col-span-2 space-y-8" variants={itemVariants}>
            {/* Direct Contact Card */}
            <Card className="bg-card/40 backdrop-blur-md border-border/50 rounded-[2.5rem] overflow-hidden shadow-xl shadow-accent/5">
              <CardContent className="p-8 md:p-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-accent/10 rounded-2xl">
                    <Mail className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">Contact direct</h3>
                </div>
                
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  Vous préférez m'écrire directement ? Copiez mon adresse email ou ouvrez votre client habituel.
                </p>

                <div className="space-y-4">
                  <div className="p-5 bg-accent/5 rounded-2xl border border-accent/10 flex items-center justify-between group">
                    <span className="text-lg font-bold text-foreground tracking-tight">contact@kimiya.pro</span>
                    <button
                      onClick={handleCopyEmail}
                      className="p-2 hover:bg-accent/20 rounded-xl transition-all text-accent"
                      title="Copier l'email"
                    >
                      <Copy className="w-5 h-5" />
                    </button>
                  </div>

                  <Button 
                    className="w-full h-14 rounded-2xl bg-accent hover:bg-accent/90 text-accent-foreground font-bold gap-2 shadow-lg shadow-accent/20"
                    onClick={() => window.location.href = "mailto:contact@kimiya.pro"}
                  >
                    <ExternalLink className="w-5 h-5" />
                    Ouvrir le client email
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Status Cards */}
            <div className="grid gap-4">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="p-6 bg-green-500/10 border border-green-500/20 rounded-[2rem] flex items-start gap-4"
              >
                <div className="p-3 bg-green-500/20 rounded-2xl">
                  <Zap className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-1">Disponible</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">Ouvert à de nouvelles opportunités et collaborations passionnantes.</p>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="p-6 bg-blue-500/10 border border-blue-500/20 rounded-[2rem] flex items-start gap-4"
              >
                <div className="p-3 bg-blue-500/20 rounded-2xl">
                  <Clock className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-1">Réponse rapide</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">Je m'engage à vous répondre dans les 24 heures ouvrables.</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
