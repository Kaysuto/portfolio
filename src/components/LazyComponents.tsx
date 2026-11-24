import { Suspense, lazy } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

const AboutSection = lazy(() => import('./AboutSection').then(module => ({ default: module.AboutSection })))
const StackSection = lazy(() => import('./StackSection').then(module => ({ default: module.StackSection })))
const ProjectsSection = lazy(() => import('./ProjectsSection').then(module => ({ default: module.ProjectsSection })))
const ContactSection = lazy(() => import('./ContactSection').then(module => ({ default: module.ContactSection })))

/** Même gabarit que la section : portrait à gauche, titre, chapeau et parcours à droite. */
function AboutSkeleton() {
  return (
    <div className="py-10 lg:py-14 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto grid items-start gap-y-8 lg:grid-cols-[25rem_1fr] lg:gap-x-18">
        <Skeleton className="mx-auto aspect-square w-full max-w-xs rounded-2xl lg:aspect-[4/5] lg:max-w-none" />
        <div className="space-y-4">
          <Skeleton className="h-12 w-72 md:h-16" />
          <Skeleton className="h-7 w-full" />
          <Skeleton className="h-7 w-5/6" />
          <div className="space-y-3 pt-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-14 w-full" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function StackSkeleton() {
  return (
    <div className="py-24 px-6 max-w-5xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <Skeleton className="h-10 w-48 mx-auto" />
        <Skeleton className="h-5 w-96 mx-auto" />
      </div>
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-40 rounded-lg" />
        ))}
      </div>
    </div>
  )
}

function ProjectsSkeleton() {
  return (
    <div className="py-24 px-6 max-w-5xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <Skeleton className="h-10 w-48 mx-auto" />
        <Skeleton className="h-5 w-72 mx-auto" />
      </div>
      <div className="flex gap-6 overflow-hidden">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="min-w-[300px] md:min-w-[420px] h-[500px] rounded-lg shrink-0" />
        ))}
      </div>
    </div>
  )
}

function ContactSkeleton() {
  return (
    <div className="py-24 px-6 max-w-5xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <Skeleton className="h-10 w-64 mx-auto" />
        <Skeleton className="h-5 w-80 mx-auto" />
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <Skeleton className="h-64 rounded-lg" />
        <Skeleton className="h-64 rounded-lg" />
        <Skeleton className="h-24 rounded-lg" />
        <Skeleton className="h-24 rounded-lg" />
      </div>
      <Skeleton className="h-80 rounded-lg" />
    </div>
  )
}

export { AboutSection, StackSection, ProjectsSection, ContactSection, Suspense }
export {
  AboutSkeleton as AboutSectionSkeleton,
  StackSkeleton as StackSectionSkeleton,
  ProjectsSkeleton as ProjectsSectionSkeleton,
  ContactSkeleton as ContactSectionSkeleton
}
