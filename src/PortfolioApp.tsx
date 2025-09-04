import { Navbar } from "@/components/Navbar"
import { HeroSection } from "@/components/HeroSection"
import { Footer } from "@/components/Footer"
import { Toaster } from "sonner"
import { useEffect } from "react"
import { AboutSection, ProjectsSection, ContactSection, SectionSkeleton, Suspense } from "@/components/LazyComponents"

export function PortfolioApp() {
  // Register Service Worker for PWA with better error handling
  useEffect(() => {
    if ('serviceWorker' in navigator && 'caches' in window) {
      const registerSW = async () => {
        try {
          const registration = await navigator.serviceWorker.register('/sw.js', {
            scope: '/',
            updateViaCache: 'none'
          });
          if (registration.waiting) {
            registration.waiting.postMessage({ type: 'SKIP_WAITING' });
          }
          console.log('SW registered successfully');
        } catch (error) {
          console.warn('SW registration failed:', error);
        }
      };
      
      // Register on idle if possible
      if ('requestIdleCallback' in window) {
        requestIdleCallback(registerSW);
      } else {
        registerSW();
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden theme-fade">
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
      <Toaster />
      
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
