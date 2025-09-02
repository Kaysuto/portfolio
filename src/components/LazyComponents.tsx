import { Suspense, lazy } from 'react'

// Lazy load components for better performance
const AboutSection = lazy(() => import('./AboutSection').then(module => ({ default: module.AboutSection })))
const ProjectsSection = lazy(() => import('./ProjectsSection').then(module => ({ default: module.ProjectsSection })))
const ContactSection = lazy(() => import('./ContactSection').then(module => ({ default: module.ContactSection })))

// Skeleton components for loading states
const SectionSkeleton = () => (
  <div className="min-h-screen animate-pulse bg-background/50 rounded-lg" role="status" aria-label="Loading section">
    <div className="h-32 bg-accent/10 rounded mb-4"></div>
    <div className="space-y-2">
      <div className="h-4 bg-accent/5 rounded w-3/4"></div>
      <div className="h-4 bg-accent/5 rounded w-1/2"></div>
    </div>
  </div>
)

export { AboutSection, ProjectsSection, ContactSection, SectionSkeleton, Suspense };
