import { useEffect, useRef, ReactNode } from 'react'
import { X } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { ModalPortal } from '@/components/ui/ModalPortal'
import { cn } from '@/lib/utils'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showCloseButton?: boolean
  closeOnOverlayClick?: boolean
  className?: string
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
  closeOnOverlayClick = true,
  className
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const previousActiveElement = useRef<HTMLElement | null>(null)

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl'
  }

  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement
      
      // Bloquer le scroll de manière simple - sans event listeners
      const body = document.body
      const html = document.documentElement
      const scrollY = window.scrollY
      
      body.style.overflow = 'hidden'
      body.style.position = 'fixed'
      body.style.top = `-${scrollY}px`
      body.style.width = '100%'
      body.classList.add('modal-open')
      
      // Focus management simple
      setTimeout(() => {
        if (modalRef.current) {
          modalRef.current.focus()
        }
      }, 100)
      
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose()
        }
      }

      document.addEventListener('keydown', handleKeyDown)
      
      return () => {
        document.removeEventListener('keydown', handleKeyDown)
        
        // Restore scroll
        body.style.overflow = ''
        body.style.position = ''
        body.style.top = ''
        body.style.width = ''
        body.classList.remove('modal-open')
        
        window.scrollTo(0, scrollY)
        
        setTimeout(() => {
          previousActiveElement.current?.focus()
        }, 100)
      }
    }
  }, [isOpen, onClose])

  if (!isOpen) {
    return null
  }

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <ModalPortal>
      <div 
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 animate-fadeIn"
        onClick={handleOverlayClick}
        aria-hidden="true"
      >
        <div
          ref={modalRef}
          className={cn(
            'relative bg-card rounded-lg shadow-lg border border-border animate-modalSlideIn cursor-default',
            'w-full',
            sizeClasses[size],
            className
          )}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? "modal-title" : undefined}
          tabIndex={-1}
          onClick={(e) => e.stopPropagation()}
        >
          {(title || showCloseButton) && (
            <div className="flex items-center justify-between p-6 pb-4">
              {title && (
                <h2 id="modal-title" className="text-xl font-semibold text-foreground">
                  {title}
                </h2>
              )}
              {showCloseButton && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onClose}
                  className="h-8 w-8 p-0 ml-auto"
                  aria-label="Fermer le modal"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          )}
          
          <div className={cn("p-6", (title || showCloseButton) && "pt-0")}>
            {children}
          </div>
        </div>
      </div>
    </ModalPortal>
  )
}