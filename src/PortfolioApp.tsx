import { HeroSection } from "@/components/HeroSection"
import { useEffect } from "react"
import { motion } from "framer-motion"
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
    <div className="relative">
      {/* Background unifié sur toutes les sections */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-70 dark:opacity-35"
          style={{
            backgroundImage: `radial-gradient(circle, var(--border) 1.5px, transparent 1.5px)`,
            backgroundSize: "28px 28px",
          }}
        />
        {/* Hero — accent top-left */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full blur-[150px]"
          style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 65%)" }}
        />
        {/* À propos — primary droite */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.22, 0.1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute top-[22%] -right-40 w-[550px] h-[550px] rounded-full blur-[150px]"
          style={{ background: "radial-gradient(circle, var(--primary) 0%, transparent 65%)" }}
        />
        {/* À propos — accent centre-gauche */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.18, 0.08] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute top-[28%] -left-32 w-[500px] h-[500px] rounded-full blur-[140px]"
          style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 65%)" }}
        />
        {/* Projets — primary centre-droite */}
        <motion.div
          animate={{ scale: [1, 1.25, 1], opacity: [0.1, 0.22, 0.1] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-[52%] -right-40 w-[600px] h-[600px] rounded-full blur-[150px]"
          style={{ background: "radial-gradient(circle, var(--primary) 0%, transparent 65%)" }}
        />
        {/* Contact — accent bas-gauche */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute bottom-0 left-1/4 w-[600px] h-[400px] rounded-full blur-[130px]"
          style={{ background: "radial-gradient(ellipse, var(--accent) 0%, transparent 65%)" }}
        />
      </div>

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
    </div>
  )
}
