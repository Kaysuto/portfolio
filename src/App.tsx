import { Navbar } from "@/components/Navbar"
import { HeroSection } from "@/components/HeroSection"
import { Footer } from "@/components/Footer"
import { PrivacyBadge } from "@/components/PrivacyBadge"
import { Toaster } from "sonner"
import { useEffect } from "react"
import { AboutSection, ProjectsSection, ContactSection, SectionSkeleton, Suspense } from "@/components/LazyComponents"
import { useQuery } from '@tanstack/react-query'
import { getMaintenanceStatus } from '@/services/maintenanceService'
import { Wrench, Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import { useTheme } from "@/hooks/use-theme"

function MaintenancePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-center px-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="p-12 bg-card/40 backdrop-blur-xl border border-border/50 rounded-[3rem] shadow-2xl max-w-md w-full"
      >
        <div className="w-20 h-20 bg-accent/10 rounded-3xl flex items-center justify-center mx-auto mb-8">
          <Wrench className="w-10 h-10 text-accent animate-pulse" />
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4 tracking-tighter">Maintenance</h1>
        <p className="text-muted-foreground text-lg font-medium leading-relaxed">
          Nous peaufinons les derniers détails. Le site sera de retour très bientôt !
        </p>
      </motion.div>
    </div>
  )
}

function App() {
  const { theme } = useTheme()
  const { data: maintenanceStatus, isLoading } = useQuery({
    queryKey: ['maintenanceStatus'],
    queryFn: getMaintenanceStatus,
  })

  useEffect(() => {
    if ('serviceWorker' in navigator && 'caches' in window) {
      const registerSW = async () => {
        try {
          await navigator.serviceWorker.register('/sw.js', {
            scope: '/',
            updateViaCache: 'none'
          })
        } catch (error) {
          console.warn('SW registration failed:', error)
        }
      }
      
      if ('requestIdleCallback' in window) {
        requestIdleCallback(registerSW)
      } else {
        registerSW()
      }
    }
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-accent animate-spin" />
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">Initialisation</span>
        </div>
      </div>
    )
  }

  if (maintenanceStatus?.is_enabled) {
    return <MaintenancePage />
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-accent-foreground transition-colors duration-500">
      <Navbar />
      
      <main className="relative" role="main">
        <HeroSection />
        
        <Suspense fallback={<SectionSkeleton />}>
          <AboutSection />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <ProjectsSection />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <ContactSection />
        </Suspense>
      </main>

      <Footer />
      <PrivacyBadge />
      <Toaster position="bottom-right" expand={false} richColors />
      
      {/* JSON-LD structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Kimiya Kaysuto",
            "jobTitle": "Product Builder",
            "description": "Product Builder polyvalent avec une expertise dans de multiples domaines : réseau, développement, design pixel art, création de mini-jeux Minecraft",
            "url": "https://kimiya-portfolio.vercel.app",
            "sameAs": [
              "https://github.com/kaysuto",
              "https://linkedin.com/in/kimiya-kaysuto"
            ],
            "knowsAbout": ["React", "TypeScript", "Node.js", "Réseau", "Pixel Art", "Minecraft", "Programmation", "Full-Stack Development"],
            "worksFor": {
              "@type": "Organization",
              "name": "Freelance"
            }
          })
        }}
      />
    </div>
  )
}

export default App
