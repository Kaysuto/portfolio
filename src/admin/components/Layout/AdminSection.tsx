import React from 'react'
import { adminDesignTokens } from '../../styles/designTokens'

interface AdminSectionProps {
  title: string
  subtitle?: string
  children: React.ReactNode
  gradient?: boolean
  className?: string
}

export function AdminSection({
  title,
  subtitle,
  children,
  gradient = true,
  className = ''
}: AdminSectionProps) {
  return (
    <section className={`${adminDesignTokens.layout.section} ${className}`}>
      {gradient && (
        <div className={`absolute inset-0 ${adminDesignTokens.effects.gradient}`} />
      )}

      <div className={adminDesignTokens.layout.container}>
        <div className="text-center mb-12 animate-fadeInUp">
          <h1 className={adminDesignTokens.typography.hero}>
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-4">
              {subtitle}
            </p>
          )}
        </div>

        {children}
      </div>
    </section>
  )
}
