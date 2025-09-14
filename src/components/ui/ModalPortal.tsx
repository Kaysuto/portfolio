import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface ModalPortalProps {
  children: ReactNode;
}

export function ModalPortal({ children }: ModalPortalProps) {
  const [mounted, setMounted] = useState(false);
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // Créer ou récupérer l'élément portal
    let modalRoot = document.getElementById('modal-root');
    
    if (!modalRoot) {
      modalRoot = document.createElement('div');
      modalRoot.id = 'modal-root';
      modalRoot.style.position = 'fixed';
      modalRoot.style.top = '0';
      modalRoot.style.left = '0';
      modalRoot.style.width = '100%';
      modalRoot.style.height = '100%';
      modalRoot.style.zIndex = '9999';
      // Retirer pointerEvents = 'none' qui bloque les interactions
      document.body.appendChild(modalRoot);
    }

    setPortalElement(modalRoot);
    setMounted(true);

    return () => {
      // Nettoyer seulement si c'est le dernier modal et que le conteneur est vide
      const currentModalRoot = document.getElementById('modal-root');
      if (currentModalRoot && currentModalRoot.children.length === 0) {
        try {
          document.body.removeChild(currentModalRoot);
        } catch (e) {
          // Ignorer les erreurs si l'élément a déjà été supprimé
        }
      }
    };
  }, []);

  if (!mounted || !portalElement) {
    return null;
  }

  return createPortal(children, portalElement);
}
