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
  const savedScrollY = useRef<number>(0)
  const isModalMounted = useRef<boolean>(false)

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl'
  }

  useEffect(() => {
    if (isOpen && !isModalMounted.current) {
      // Modal s'ouvre - sauvegarder la position et bloquer le scroll
      isModalMounted.current = true
      previousActiveElement.current = document.activeElement as HTMLElement
      savedScrollY.current = window.scrollY
      
      const body = document.body
      
      body.style.overflow = 'hidden'
      body.style.position = 'fixed'
      body.style.top = `-${savedScrollY.current}px`
      body.style.width = '100%'
      body.classList.add('modal-open')
      
      setTimeout(() => {
        if (modalRef.current) {
          modalRef.current.focus()
        }
      }, 100)
      
    } else if (!isOpen && isModalMounted.current) {
      // Modal se ferme - restaurer la position
      isModalMounted.current = false
      
      const body = document.body
      
      body.style.overflow = ''
      body.style.position = ''
      body.style.top = ''
      body.style.width = ''
      body.classList.remove('modal-open')
      
      // Restaurer la position de scroll
      window.scrollTo(0, savedScrollY.current)
      
      setTimeout(() => {
        if (previousActiveElement.current) {
          try {
            previousActiveElement.current.focus()
          } catch (e) {
            // Ignorer les erreurs de focus
          }
        }
      }, 100)
    }
  }, [isOpen])

  // Gestion des événements clavier
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
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