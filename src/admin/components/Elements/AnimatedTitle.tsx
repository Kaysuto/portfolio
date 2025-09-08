import React from 'react'
import { adminDesignTokens } from '../../styles/designTokens'

interface AnimatedTitleProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export function AnimatedTitle({
  children,
  delay = 0,
  className = ''
}: AnimatedTitleProps) {
  return (
    <h1
      className={`${adminDesignTokens.typography.hero} ${className}`}
      style={{
        animationDelay: `${delay}ms`
      }}
    >
      {children}
    </h1>
  )
}
