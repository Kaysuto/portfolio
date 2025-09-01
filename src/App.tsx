import { Navbar } from "@/components/Navbar"
import { HeroSection } from "@/components/HeroSection"
import { AboutSection } from "@/components/AboutSection"
import { ProjectsSection } from "@/components/ProjectsSection"
import { ContactSection } from "@/components/ContactSection"
import { Footer } from "@/components/Footer"
import { FloatingParticles } from "@/components/FloatingParticles"
import { Toaster } from "sonner"

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <FloatingParticles />
      <div className="relative z-10">
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
      <Toaster />
    </div>
  )
}

export default App