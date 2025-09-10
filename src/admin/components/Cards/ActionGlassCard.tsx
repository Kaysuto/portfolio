import React from 'react'
import { adminDesignTokens } from '../../styles/designTokens'
import { Button } from '@/components/ui/button'

interface ActionGlassCardProps {
  title: string
  description?: string
  icon?: React.ComponentType<{ className?: string }>
  onClick?: () => void
  delay?: number
  className?: string
}

export function ActionGlassCard({
  title,
  description,
  icon: Icon,
  onClick,
  delay = 0,
  className = ''
}: ActionGlassCardProps) {
  return (
    <div
      className={`${adminDesignTokens.cards.base} ${adminDesignTokens.cards.glass} ${adminDesignTokens.cards.hover} ${adminDesignTokens.cards.transition} ${adminDesignTokens.effects.fadeIn} cursor-pointer ${className}`}
      style={{
        animationDelay: `${delay}ms`,
        animationFillMode: 'forwards'
      }}
      onClick={onClick}
    >
      <div className={`flex-1 flex flex-col ${adminDesignTokens.cards.padding} text-center`}>
        {Icon && (
          <div className={`${adminDesignTokens.cards.iconContainer} rounded-lg bg-accent/80
                          flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
            <Icon className={`${adminDesignTokens.cards.icon} text-[#231813] dark:text-[#231813]`} />
          </div>
        )}

        <h3 className="text-lg font-semibold mb-2">
          {title}
        </h3>

        {description && (
          <p className="text-sm text-muted-foreground mb-3">
            {description}
          </p>
        )}

        <Button
          className={`${adminDesignTokens.buttons.primary} ${adminDesignTokens.buttons.hover} w-full mt-auto`}
          onClick={(e) => {
            e.stopPropagation()
            onClick?.()
          }}
        >
          Accéder
        </Button>
      </div>
    </div>
  )
}
