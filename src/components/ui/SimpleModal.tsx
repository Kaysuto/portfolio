import { ReactNode } from 'react'
import { X } from '@phosphor-icons/react'

interface SimpleModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
}

export function SimpleModal({ isOpen, onClose, title, children }: SimpleModalProps) {
  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose()
        }
      }}
    >
      <div 
        className="bg-card rounded-lg shadow-lg border border-border w-full max-w-md p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-foreground">{title}</h2>
            <button
              onClick={onClose}
              className="p-1 rounded hover:bg-accent/10"
              aria-label="Fermer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
        <div>{children}</div>
      </div>
    </div>
  )
}