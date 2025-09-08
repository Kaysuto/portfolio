import React from 'react'
import { adminDesignTokens } from '../../styles/designTokens'

interface BackgroundGradientProps {
  className?: string
}

export function BackgroundGradient({ className = '' }: BackgroundGradientProps) {
  return (
    <div className={`absolute inset-0 ${adminDesignTokens.effects.gradient} ${className}`} />
  )
}
