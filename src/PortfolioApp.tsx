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
        } catch (error) {
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
    <>
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
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Kimiya Kaysuto",
            "jobTitle": "Product Builder",
            "description": "Product Builder polyvalent avec une expertise dans de multiples domaines : réseau, développement, design pixel art, création de mini-jeux Minecraft",
            "url": "https://kaysuto.fr",
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
    </>
  )
}
