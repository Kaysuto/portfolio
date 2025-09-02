import { useState, useRef, useEffect } from "react"
import { EnvelopeSimple, LinkedinLogo, GithubLogo, User, Buildings, ChatCircle, PaperPlaneTilt, CheckCircle, Warning } from "@phosphor-icons/react"
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

  // Dropdown states
  const [isProjectTypeOpen, setIsProjectTypeOpen] = useState(false)
  const [isBudgetOpen, setIsBudgetOpen] = useState(false)
  
  // Refs for dropdowns
  const projectTypeRef = useRef<HTMLDivElement>(null)
  const budgetRef = useRef<HTMLDivElement>(null)

  // Close dropdowns when clicking outside
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
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
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
            <div className="bg-card border border-border hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 rounded-lg">
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
                      <label htmlFor="name" className="text-sm font-medium text-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Nom complet *
                      </label>
                      <div className="relative">
                        <User size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <input
                          id="name"
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          className={`flex h-10 w-full rounded-md border px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10 ${
                            errors.name 
                              ? 'border-destructive focus-visible:ring-destructive' 
                              : 'border-input bg-background focus-visible:ring-accent'
                          }`}
                          placeholder="Votre nom complet"
                        />
                      </div>
                      {errors.name && (
                        <div className="flex items-center space-x-1 text-destructive text-xs">
                          <Warning size={12} />
                          <span>{errors.name}</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Email *
                      </label>
                      <div className="relative">
                        <EnvelopeSimple size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className={`flex h-10 w-full rounded-md border px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10 ${
                            errors.email 
                              ? 'border-destructive focus-visible:ring-destructive' 
                              : 'border-input bg-background focus-visible:ring-accent'
                          }`}
                          placeholder="votre@email.com"
                        />
                      </div>
                      {errors.email && (
                        <div className="flex items-center space-x-1 text-destructive text-xs">
                          <Warning size={12} />
                          <span>{errors.email}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Company and Subject Row */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="company" className="text-sm font-medium text-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Entreprise <span className="text-muted-foreground text-xs">(facultatif)</span>
                      </label>
                      <div className="relative">
                        <Buildings size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <input
                          id="company"
                          type="text"
                          value={formData.company}
                          onChange={(e) => handleInputChange("company", e.target.value)}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10"
                          placeholder="Nom de votre entreprise"
                          autoComplete="new-password"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium text-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Objet
                      </label>
                      <input
                        id="subject"
                        type="text"
                        value={formData.subject}
                        onChange={(e) => handleInputChange("subject", e.target.value)}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Sujet de votre message"
                      />
                    </div>
                  </div>

                  {/* Project Type and Budget Row */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Type de projet
                      </label>
                      <div className="relative" ref={projectTypeRef}>
                        <div
                          onClick={() => setIsProjectTypeOpen(!isProjectTypeOpen)}
                          className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                        >
                          <span className={formData.projectType ? 'text-foreground' : 'text-muted-foreground'}>
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
                          <svg className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${isProjectTypeOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                        {isProjectTypeOpen && (
                          <ul className="absolute top-full left-0 w-full mt-1 bg-card rounded-md z-50 p-2 shadow-lg border border-border">
                            <li><a className="flex px-2 py-2 text-sm hover:bg-accent/10 hover:text-accent-foreground rounded-md cursor-pointer" onClick={() => { handleInputChange("projectType", "web-app"); setIsProjectTypeOpen(false); }}>Application Web</a></li>
                            <li><a className="flex px-2 py-2 text-sm hover:bg-accent/10 hover:text-accent-foreground rounded-md cursor-pointer" onClick={() => { handleInputChange("projectType", "mobile-app"); setIsProjectTypeOpen(false); }}>Application Mobile</a></li>
                            <li><a className="flex px-2 py-2 text-sm hover:bg-accent/10 hover:text-accent-foreground rounded-md cursor-pointer" onClick={() => { handleInputChange("projectType", "website"); setIsProjectTypeOpen(false); }}>Site Web</a></li>
                            <li><a className="flex px-2 py-2 text-sm hover:bg-accent/10 hover:text-accent-foreground rounded-md cursor-pointer" onClick={() => { handleInputChange("projectType", "ecommerce"); setIsProjectTypeOpen(false); }}>E-commerce</a></li>
                            <li><a className="flex px-2 py-2 text-sm hover:bg-accent/10 hover:text-accent-foreground rounded-md cursor-pointer" onClick={() => { handleInputChange("projectType", "api"); setIsProjectTypeOpen(false); }}>API/Backend</a></li>
                            <li><a className="flex px-2 py-2 text-sm hover:bg-accent/10 hover:text-accent-foreground rounded-md cursor-pointer" onClick={() => { handleInputChange("projectType", "consultation"); setIsProjectTypeOpen(false); }}>Consultation</a></li>
                            <li><a className="flex px-2 py-2 text-sm hover:bg-accent/10 hover:text-accent-foreground rounded-md cursor-pointer" onClick={() => { handleInputChange("projectType", "other"); setIsProjectTypeOpen(false); }}>Autre</a></li>
                          </ul>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Budget estimé
                      </label>
                      <div className="relative" ref={budgetRef}>
                        <div
                          onClick={() => setIsBudgetOpen(!isBudgetOpen)}
                          className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                        >
                          <span className={formData.budget ? 'text-foreground' : 'text-muted-foreground'}>
                            {formData.budget ? (
                              {
                                '1k-5k': '1k - 5k €',
                                '5k-10k': '5k - 10k €',
                                '10k-25k': '10k - 25k €',
                                '25k+': '25k+ €',
                                'discuss': 'À discuter'
                              }[formData.budget]
                            ) : 'Fourchette de budget'}
                          </span>
                          <svg className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${isBudgetOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                        {isBudgetOpen && (
                          <ul className="absolute top-full left-0 w-full mt-1 bg-card rounded-md z-50 p-2 shadow-lg border border-border">
                            <li><a className="flex px-2 py-2 text-sm hover:bg-accent/10 hover:text-accent-foreground rounded-md cursor-pointer" onClick={() => { handleInputChange("budget", "1k-5k"); setIsBudgetOpen(false); }}>1k - 5k €</a></li>
                            <li><a className="flex px-2 py-2 text-sm hover:bg-accent/10 hover:text-accent-foreground rounded-md cursor-pointer" onClick={() => { handleInputChange("budget", "5k-10k"); setIsBudgetOpen(false); }}>5k - 10k €</a></li>
                            <li><a className="flex px-2 py-2 text-sm hover:bg-accent/10 hover:text-accent-foreground rounded-md cursor-pointer" onClick={() => { handleInputChange("budget", "10k-25k"); setIsBudgetOpen(false); }}>10k - 25k €</a></li>
                            <li><a className="flex px-2 py-2 text-sm hover:bg-accent/10 hover:text-accent-foreground rounded-md cursor-pointer" onClick={() => { handleInputChange("budget", "25k+"); setIsBudgetOpen(false); }}>25k+ €</a></li>
                            <li><a className="flex px-2 py-2 text-sm hover:bg-accent/10 hover:text-accent-foreground rounded-md cursor-pointer" onClick={() => { handleInputChange("budget", "discuss"); setIsBudgetOpen(false); }}>À discuter</a></li>
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      className={`flex min-h-[80px] w-full rounded-md border px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none ${
                        errors.message 
                          ? 'border-destructive focus-visible:ring-destructive' 
                          : 'border-input bg-background focus-visible:ring-accent'
                      }`}
                      placeholder="Décrivez votre projet, vos besoins, vos objectifs... Plus vous serez précis, mieux je pourrai vous aider !"
                    />
                    {errors.message && (
                      <div className="flex items-center space-x-1 text-destructive text-xs">
                        <Warning size={12} />
                        <span>{errors.message}</span>
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting || isSuccess}
                    className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 w-full h-10 px-4 py-2 shadow-sm hover:shadow-lg hover:scale-105 group ${
                      isSuccess 
                        ? 'bg-green-600 text-white hover:bg-green-700' 
                        : 'bg-accent text-accent-foreground hover:bg-accent/90'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></div>
                        Envoi en cours...
                      </>
                    ) : isSuccess ? (
                      <>
                        <CheckCircle size={20} className="mr-2" />
                        Message envoyé !
                      </>
                    ) : (
                      <>
                        <PaperPlaneTilt size={20} className="mr-2 group-hover:rotate-12 transition-transform duration-200" />
                        Envoyer le message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Contact Info & Alternative Methods */}
          <div className="space-y-6">
            {/* Direct Contact */}
            <div className="bg-card border border-border hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 rounded-lg">
              <div className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
                    <EnvelopeSimple size={20} className="text-accent" />
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground">
                    Contact direct
                  </h3>
                </div>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Vous préférez m'écrire directement ? Pas de problème !
                </p>

                <div className="space-y-4">
                  <div className="p-4 bg-secondary/50 rounded-xl">
                    <span className="text-lg font-medium text-foreground">
                      contact@kimiya.pro
                    </span>
                  </div>

                  <button
                    onClick={handleEmailClick}
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground w-full h-10 px-4 py-2 shadow-sm hover:shadow-lg hover:scale-105 group"
                    style={{
                      backgroundColor: typeof window !== 'undefined' && document.documentElement.classList.contains('dark') ? '#D3C0B1' : '#C39B81',
                      color: typeof window !== 'undefined' && document.documentElement.classList.contains('dark') ? '#2A1F1A' : '#080000',
                    }}
                  >
                    <EnvelopeSimple size={18} className="mr-2 group-hover:animate-bounce" />
                    Ouvrir dans votre client email
                  </button>
                </div>
              </div>
            </div>


            {/* Availability Status */}
            <div className="bg-green-600/60 dark:bg-green-800/60 border border-green-700 shadow-xl rounded-lg">
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-semibold text-white dark:text-green-200">
                    Disponible pour de nouveaux projets
                  </span>
                </div>
                <p className="text-white dark:text-green-300 text-sm">
                  Je suis actuellement ouvert à de nouvelles opportunités et collaborations passionnantes.
                </p>
              </div>
            </div>

            {/* Response Time */}
            <div className="bg-blue-600/60 dark:bg-blue-800/60 border border-blue-700 shadow-xl rounded-lg">
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="font-semibold text-white dark:text-blue-200">
                    Réponse sous 24h
                  </span>
                </div>
                <p className="text-white dark:text-blue-300 text-sm">
                  Je m'engage à répondre à tous les messages dans les 24 heures ouvrables.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}