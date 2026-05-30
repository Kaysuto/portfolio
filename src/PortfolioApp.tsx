import { HeroSection } from "@/components/HeroSection"
import { useEffect } from "react"
import { AboutSection, ProjectsSection, ContactSection, Suspense, AboutSectionSkeleton, ProjectsSectionSkeleton, ContactSectionSkeleton } from "@/components/LazyComponents"
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function PortfolioApp() {
  // Titre fixe sans animation
  useDocumentTitle("Product Builder", {
    enableTypingAnimation: false,
    dynamicSections: false
  });

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
        } catch {
          // Silently fail
        }
      };
      
      if ('requestIdleCallback' in window) {
        requestIdleCallback(registerSW);
      } else {
        registerSW();
      }
    }
  }, []);

  return (
    <div className="relative">
      <HeroSection />
      <Suspense fallback={<AboutSectionSkeleton />}>
        <AboutSection />
      </Suspense>
      <Suspense fallback={<ProjectsSectionSkeleton />}>
        <ProjectsSection />
      </Suspense>
      <Suspense fallback={<ContactSectionSkeleton />}>
        <ContactSection />
      </Suspense>
      
      {/* JSON-LD structured data for SEO */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Kimiya Kaysuto",
            "jobTitle": "Technicien Informatique & Product Builder",
            "description": "Technicien Informatique Polyvalent Junior chez Magna Engineered Glass Europe le jour, Product Builder la nuit — 11 ans de passion autodidacte pour le code, les réseaux et la création.",
            "url": "https://kaysuto.fr",
            "sameAs": [
              "https://github.com/kaysuto",
              "https://linkedin.com/in/kimiya-kaysuto"
            ],
            "knowsAbout": ["React", "TypeScript", "Node.js", "Réseau", "Pixel Art", "Minecraft", "Programmation", "Full-Stack Development"],
            "worksFor": {
              "@type": "Organization",
              "name": "Magna Engineered Glass Europe"
            }
          })
        }}
      />
    </div>
  )
}
