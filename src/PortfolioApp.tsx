import { HeroSection } from "@/components/HeroSection"
import { useEffect } from "react"
import { AboutSection, StackSection, ProjectsSection, LoisirsSection, ContactSection, Suspense, AboutSectionSkeleton, StackSectionSkeleton, ProjectsSectionSkeleton, LoisirsSectionSkeleton, ContactSectionSkeleton } from "@/components/LazyComponents"
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useLangue } from "@/lib/langue";

export function PortfolioApp() {
  const { t } = useLangue();

  // Titre fixe sans animation
  useDocumentTitle(t("Informaticien polyvalent", "IT generalist"), {
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
      <Suspense fallback={<LoisirsSectionSkeleton />}>
        <LoisirsSection />
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
            "jobTitle": "Informaticien Polyvalent",
            "description": `Informaticien polyvalent expérimenté, qui conçoit et met en ligne ses propres projets. Électrotechnicien de formation (BAC PRO MELEC) et assistant web marketing (titre professionnel BAC+2), trois ans d'exploitation en datacenter pour les systèmes et réseaux, et treize ans de développement fullstack en autodidacte.`,
            "url": "https://kaysuto.fr",
            "sameAs": [
              "https://github.com/kaysuto",
              "https://www.linkedin.com/in/enzo-lauret/"
            ],
            "knowsAbout": ["React", "TypeScript", "Node.js", "Redis", "MySQL", "Docker", "Réseau", "Systèmes", "IoT", "SEO", "Community Management", "Pixel Art", "Minecraft", "Programmation", "Full-Stack Development"]
          })
        }}
      />
    </div>
  )
}
