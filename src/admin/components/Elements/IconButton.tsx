import React from 'react'
import { Button } from '@/components/ui/button'
import { adminDesignTokens } from '../../styles/designTokens'

interface IconButtonProps {
  icon: React.ComponentType<{ className?: string }>
  children: React.ReactNode
  variant?: 'primary' | 'outline'
  onClick?: () => void
  className?: string
}

export function IconButton({
  icon: Icon,
  children,
  variant = 'primary',
  onClick,
  className = ''
}: IconButtonProps) {
  const buttonClasses = variant === 'primary'
    ? adminDesignTokens.buttons.primary
    : adminDesignTokens.buttons.outline

  return (
    <Button
      className={`${buttonClasses} ${adminDesignTokens.buttons.hover} ${className}`}
      onClick={onClick}
    >
      <Icon className="mr-2 group-hover:translate-x-1 transition-transform duration-200" />
      {children}
    </Button>
  )
}
