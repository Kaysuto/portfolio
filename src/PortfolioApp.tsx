import { HeroSection } from "@/components/HeroSection"
import { useEffect } from "react"
import { AboutSection, StackSection, ProjectsSection, ContactSection, Suspense, AboutSectionSkeleton, StackSectionSkeleton, ProjectsSectionSkeleton, ContactSectionSkeleton } from "@/components/LazyComponents"
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function PortfolioApp() {
  // Titre fixe sans animation
  useDocumentTitle("Product Builder", {
    enableTypingAnimation: false,
    dynamicSections: false
  });

  useEffect(() => {
    if ('serviceWorker' in navigator && 'caches' in window) {
      const enregistrerSW = async () => {
        try {
          const enregistrement = await navigator.serviceWorker.register('/sw.js', {
            scope: '/',
            updateViaCache: 'none'
          });
          if (enregistrement.waiting) {
            enregistrement.waiting.postMessage({ type: 'SKIP_WAITING' });
          }
        } catch {
          // Échec silencieux
        }
      };

      if ('requestIdleCallback' in window) {
        requestIdleCallback(enregistrerSW);
      } else {
        enregistrerSW();
      }
    }
  }, []);

  return (
    <div className="relative">
      <HeroSection />
      <Suspense fallback={<AboutSectionSkeleton />}>
        <AboutSection />
      </Suspense>
      <Suspense fallback={<StackSectionSkeleton />}>
        <StackSection />
      </Suspense>
      <Suspense fallback={<ProjectsSectionSkeleton />}>
        <ProjectsSection />
      </Suspense>
      <Suspense fallback={<ContactSectionSkeleton />}>
        <ContactSection />
      </Suspense>
      
      {/* Données structurées JSON-LD pour le SEO */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Kimiya",
            "jobTitle": "Technicien Informatique & Product Builder",
            "description": "Technicien Informatique Polyvalent Junior chez Magna Engineered Glass Europe le jour, Product Builder la nuit — plus de 12 ans de passion autodidacte pour le code, les réseaux et la création.",
            "url": "https://kaysuto.fr",
            "sameAs": [
              "https://github.com/kaysuto",
              "https://linkedin.com/in/kimiya-kaysuto"
            ],
            "knowsAbout": ["React", "TypeScript", "Node.js", "Redis", "MySQL", "Docker", "Réseau", "Pixel Art", "Minecraft", "Programmation", "Full-Stack Development"],
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
