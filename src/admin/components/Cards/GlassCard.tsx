import React from 'react'
import { adminDesignTokens } from '../../styles/designTokens'

interface GlassCardProps {
  title: string
  icon?: React.ComponentType<{ className?: string }>
  children: React.ReactNode
  delay?: number
  className?: string
}

export function GlassCard({
  title,
  icon: Icon,
  children,
  delay = 0,
  className = ''
}: GlassCardProps) {
  return (
    <div
      className={`${adminDesignTokens.cards.base} ${adminDesignTokens.cards.glass} ${adminDesignTokens.cards.hover} ${adminDesignTokens.cards.transition} ${adminDesignTokens.effects.fadeIn} ${className}`}
      style={{
        animationDelay: `${delay}ms`,
        animationFillMode: 'forwards'
      }}
    >
      <div className={`flex-1 flex flex-col ${adminDesignTokens.cards.padding}`}>
        {(title || Icon) && (
          <div className={`flex items-center ${adminDesignTokens.cards.headerGap} ${adminDesignTokens.cards.headerMargin}`}>
            {Icon && (
              <div className={`${adminDesignTokens.cards.iconContainer} rounded-lg bg-accent/80
                              flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <Icon className={`${adminDesignTokens.cards.icon} text-accent-foreground`} />
              </div>
            )}
            {title && (
              <h3 className={`${adminDesignTokens.typography.card} ${adminDesignTokens.typography.accent}`}>
                {title}
              </h3>
            )}
          </div>
        )}
        {children}
      </div>
    </div>
  )
}
