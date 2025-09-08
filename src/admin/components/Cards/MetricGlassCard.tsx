import React from 'react'
import { adminDesignTokens } from '../../styles/designTokens'

interface MetricGlassCardProps {
  title: string
  value: string | number
  change?: string
  icon?: React.ComponentType<{ className?: string }>
  delay?: number
  className?: string
}

export function MetricGlassCard({
  title,
  value,
  change,
  icon: Icon,
  delay = 0,
  className = ''
}: MetricGlassCardProps) {
  return (
    <div
      className={`${adminDesignTokens.cards.base} ${adminDesignTokens.cards.glass} ${adminDesignTokens.cards.hover} ${adminDesignTokens.cards.transition} ${adminDesignTokens.effects.fadeIn} ${className}`}
      style={{
        animationDelay: `${delay}ms`,
        animationFillMode: 'forwards'
      }}
    >
      <div className={`flex-1 flex flex-col ${adminDesignTokens.cards.padding}`}>
        <div className="flex items-center justify-between mb-3">
          {Icon && (
            <div className={`${adminDesignTokens.cards.iconContainer} rounded-lg bg-accent/80
                            flex items-center justify-center group-hover:scale-110 transition-transform`}>
              <Icon className={`${adminDesignTokens.cards.icon} text-accent-foreground`} />
            </div>
          )}
          {change && (
            <span className={`text-sm font-medium ${
              change.startsWith('+') ? 'text-green-500' :
              change.startsWith('-') ? 'text-red-500' : 'text-muted-foreground'
            }`}>
              {change}
            </span>
          )}
        </div>

        <h3 className="text-xl font-bold text-foreground mb-1">
          {value}
        </h3>
        <p className="text-sm text-muted-foreground mb-1">
          {title}
        </p>
      </div>
    </div>
  )
}
