import { Navbar } from "@/components/Navbar"
import { HeroSection } from "@/components/HeroSection"
import { Footer } from "@/components/Footer"
import { FloatingParticles } from "@/components/FloatingParticles"
import { Toaster } from "sonner"
import { useEffect, useState } from "react"
import { AboutSection, ProjectsSection, ContactSection, SectionSkeleton, Suspense } from "@/components/LazyComponents"

function App() {
  const [showToaster, setShowToaster] = useState(false)
  // Register Service Worker for PWA
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(() => console.log('SW registered'))
        .catch(() => console.log('SW registration failed'));
    }
  }, []);

  // Monte le Toaster quand le thread est idle pour ne pas impacter le LCP
  useEffect(() => {
    const id = (window as any).requestIdleCallback
      ? (window as any).requestIdleCallback(() => setShowToaster(true), { timeout: 1200 })
      : (setTimeout(() => setShowToaster(true), 300) as unknown as number)
    return () => {
      if ((window as any).cancelIdleCallback && id) {
        ;(window as any).cancelIdleCallback(id)
      } else if (id) {
        clearTimeout(id as unknown as number)
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden theme-fade">
      <FloatingParticles />
      <div className="relative z-10">
        <Navbar />
        <main className="theme-fade" role="main">
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
      </div>
  {showToaster ? <Toaster /> : null}
      
      {/* JSON-LD structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Kimiya Kaysuto",
            "jobTitle": "Full-Stack Maker",
            "description": "Full-Stack Maker polyvalent avec une expertise dans de multiples domaines : réseau, développement, design pixel art, création de mini-jeux Minecraft",
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