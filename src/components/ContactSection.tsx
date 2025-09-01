import { useState } from "react"
import { EnvelopeSimple, LinkedinLogo, GithubLogo, User, Buildings, ChatCircle, PaperPlaneTilt, CheckCircle, Warning } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
// ...existing code...

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
  
  // Store submitted messages for later review
  const [messages, setMessages] = useState<any[]>([])

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
      // Simulate form submission delay
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Store the message
      const newMessage = {
        ...formData,
        timestamp: new Date().toISOString(),
        id: Date.now()
      }
      
      setMessages((current) => [...current, newMessage])
      
      setIsSuccess(true)
      toast.success("Message envoyé avec succès ! Je vous répondrai rapidement.")
      
      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        company: "",
        subject: "",
        projectType: "",
        budget: "",
        message: ""
      })
      
      // Reset success state after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000)
      
    } catch (error) {
      toast.error("Erreur lors de l'envoi. Veuillez réessayer ou m'envoyer un email directement.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const handleEmailClick = () => {
    window.location.href = "mailto:contact@kimiya.pro"
  }

  return (
    <section id="contact" className="py-32 px-6 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Parlons de votre projet
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Vous avez une idée ? Un projet en tête ? Remplissez ce formulaire et 
            je vous répondrai dans les plus brefs délais pour en discuter ensemble.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div>
            <Card className="bg-card border border-border hover:shadow-lg hover:shadow-accent/5 transition-all duration-300">
              <div className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
                    <ChatCircle size={20} className="text-accent" />
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground">
                    Formulaire de contact
                  </h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name and Email Row */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium text-foreground">
                        Nom complet *
                      </Label>
                      <div className="relative">
                        <User size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          className={`pl-10 transition-all duration-200 ${errors.name ? 'border-red-500 focus:border-red-500' : 'focus:border-accent'}`}
                          placeholder="Votre nom complet"
                        />
                      </div>
                      {errors.name && (
                        <div className="flex items-center space-x-1 text-red-500 text-xs">
                          <Warning size={12} />
                          <span>{errors.name}</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium text-foreground">
                        Email *
                      </Label>
                      <div className="relative">
                        <EnvelopeSimple size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className={`pl-10 transition-all duration-200 ${errors.email ? 'border-red-500 focus:border-red-500' : 'focus:border-accent'}`}
                          placeholder="votre@email.com"
                        />
                      </div>
                      {errors.email && (
                        <div className="flex items-center space-x-1 text-red-500 text-xs">
                          <Warning size={12} />
                          <span>{errors.email}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Company and Subject Row */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-sm font-medium text-foreground">
                        Entreprise
                      </Label>
                      <div className="relative">
                        <Buildings size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(e) => handleInputChange("company", e.target.value)}
                          className="pl-10 focus:border-accent transition-all duration-200"
                          placeholder="Nom de votre entreprise"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-sm font-medium text-foreground">
                        Objet
                      </Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => handleInputChange("subject", e.target.value)}
                        className="focus:border-accent transition-all duration-200"
                        placeholder="Sujet de votre message"
                      />
                    </div>
                  </div>

                  {/* Project Type and Budget Row */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-foreground">
                        Type de projet
                      </Label>
                      <Select value={formData.projectType} onValueChange={(value) => handleInputChange("projectType", value)}>
                        <SelectTrigger className="focus:border-accent transition-all duration-200">
                          <SelectValue placeholder="Sélectionnez un type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="web-app">Application Web</SelectItem>
                          <SelectItem value="mobile-app">Application Mobile</SelectItem>
                          <SelectItem value="website">Site Web</SelectItem>
                          <SelectItem value="ecommerce">E-commerce</SelectItem>
                          <SelectItem value="api">API/Backend</SelectItem>
                          <SelectItem value="consultation">Consultation</SelectItem>
                          <SelectItem value="other">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-foreground">
                        Budget estimé
                      </Label>
                      <Select value={formData.budget} onValueChange={(value) => handleInputChange("budget", value)}>
                        <SelectTrigger className="focus:border-accent transition-all duration-200">
                          <SelectValue placeholder="Fourchette de budget" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1k-5k">1k - 5k €</SelectItem>
                          <SelectItem value="5k-10k">5k - 10k €</SelectItem>
                          <SelectItem value="10k-25k">10k - 25k €</SelectItem>
                          <SelectItem value="25k+">25k+ €</SelectItem>
                          <SelectItem value="discuss">À discuter</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm font-medium text-foreground">
                      Message *
                    </Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      className={`min-h-32 resize-none transition-all duration-200 ${errors.message ? 'border-red-500 focus:border-red-500' : 'focus:border-accent'}`}
                      placeholder="Décrivez votre projet, vos besoins, vos objectifs... Plus vous serez précis, mieux je pourrai vous aider !"
                    />
                    {errors.message && (
                      <div className="flex items-center space-x-1 text-red-500 text-xs">
                        <Warning size={12} />
                        <span>{errors.message}</span>
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting || isSuccess}
                    className={`w-full py-3 text-lg font-medium transition-all duration-300 ${
                      isSuccess 
                        ? 'bg-green-500 hover:bg-green-500 text-white' 
                        : 'bg-accent hover:bg-accent/90 text-accent-foreground'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin mr-2 w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
                        Envoi en cours...
                      </>
                    ) : isSuccess ? (
                      <>
                        <CheckCircle size={20} className="mr-2" />
                        Message envoyé !
                      </>
                    ) : (
                      <>
                        <PaperPlaneTilt size={20} className="mr-2" />
                        Envoyer le message
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </Card>
          </div>

          {/* Contact Info & Alternative Methods */}
          <div className="space-y-6">
            {/* Direct Contact */}
            <Card className="bg-card border border-border hover:shadow-lg hover:shadow-accent/5 transition-all duration-300">
              <div className="p-8">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-6">
                  <EnvelopeSimple size={32} className="text-accent" />
                </div>
                
                <h3 className="text-2xl font-semibold text-foreground mb-4">
                  Contact direct
                </h3>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Vous préférez m'écrire directement ? Pas de problème !
                </p>

                <div className="space-y-4">
                  <div className="p-4 bg-secondary/50 rounded-xl">
                    <span className="text-lg font-medium text-foreground">
                      contact@kimiya.pro
                    </span>
                  </div>

                  <Button
                    onClick={handleEmailClick}
                    variant="outline"
                    className="w-full border-accent hover:bg-accent hover:text-accent-foreground transition-all duration-200"
                  >
                    <EnvelopeSimple size={18} className="mr-2" />
                    Ouvrir dans votre client email
                  </Button>
                </div>
              </div>
            </Card>

            {/* Social Links */}
            <Card className="bg-card border border-border hover:shadow-lg hover:shadow-accent/5 transition-all duration-300">
              <div className="p-8">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Réseaux
                </h3>
                
                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    size="lg"
                    className="flex-1 border-border hover:border-accent hover:bg-accent/10 group"
                    onClick={() => window.open("https://github.com/Kaysuto", "_blank")}
                  >
                    <GithubLogo 
                      size={20} 
                      className="text-muted-foreground group-hover:text-accent transition-colors duration-200" 
                    />
                  </Button>

                  <Button
                    variant="outline"
                    size="lg"
                    className="flex-1 border-border hover:border-accent hover:bg-accent/10 group"
                    onClick={() => window.open("https://linkedin.com/in/kimiya", "_blank")}
                  >
                    <LinkedinLogo 
                      size={20} 
                      className="text-muted-foreground group-hover:text-accent transition-colors duration-200" 
                    />
                  </Button>
                </div>
              </div>
            </Card>

            {/* Availability Status */}
            <Card className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-semibold text-green-800 dark:text-green-200">
                    Disponible pour de nouveaux projets
                  </span>
                </div>
                <p className="text-green-700 dark:text-green-300 text-sm">
                  Je suis actuellement ouvert à de nouvelles opportunités et collaborations passionnantes.
                </p>
              </div>
            </Card>

            {/* Response Time */}
            <Card className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="font-semibold text-blue-800 dark:text-blue-200">
                    Réponse sous 24h
                  </span>
                </div>
                <p className="text-blue-700 dark:text-blue-300 text-sm">
                  Je m'engage à répondre à tous les messages dans les 24 heures ouvrables.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}