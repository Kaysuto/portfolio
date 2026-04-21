import { Suspense, lazy } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

const AboutSection = lazy(() => import('./AboutSection').then(module => ({ default: module.AboutSection })))
const ProjectsSection = lazy(() => import('./ProjectsSection').then(module => ({ default: module.ProjectsSection })))
const ContactSection = lazy(() => import('./ContactSection').then(module => ({ default: module.ContactSection })))

function AboutSkeleton() {
  return (
    <div className="py-16 px-6 max-w-5xl mx-auto space-y-16">
      <div className="text-center space-y-4">
        <Skeleton className="h-10 w-64 mx-auto" />
        <Skeleton className="h-5 w-96 mx-auto" />
      </div>
      <div className="grid lg:grid-cols-2 gap-16">
        <div className="space-y-4">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-[2rem]" />
          ))}
        </div>
      </div>
    </div>
  )
}

function ProjectsSkeleton() {
  return (
    <div className="py-16 px-6 max-w-5xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <Skeleton className="h-10 w-48 mx-auto" />
        <Skeleton className="h-5 w-72 mx-auto" />
      </div>
      <div className="flex gap-6 overflow-hidden">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="min-w-[300px] md:min-w-[420px] h-[500px] rounded-[2.5rem] shrink-0" />
        ))}
      </div>
    </div>
  )
}

function ContactSkeleton() {
  return (
    <div className="py-16 px-6 max-w-5xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <Skeleton className="h-10 w-64 mx-auto" />
        <Skeleton className="h-5 w-80 mx-auto" />
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <Skeleton className="h-64 rounded-[2.5rem]" />
        <Skeleton className="h-64 rounded-[2.5rem]" />
        <Skeleton className="h-24 rounded-[2.5rem]" />
        <Skeleton className="h-24 rounded-[2.5rem]" />
      </div>
      <Skeleton className="h-80 rounded-[2.5rem]" />
    </div>
  )
}

export { AboutSection, ProjectsSection, ContactSection, Suspense }
export { AboutSkeleton as AboutSectionSkeleton, ProjectsSkeleton as ProjectsSectionSkeleton, ContactSkeleton as ContactSectionSkeleton }
