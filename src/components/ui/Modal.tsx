import React from 'react';
import { X } from '@phosphor-icons/react';
import { useModal } from '@/hooks/useModal';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: string;
  showCloseButton?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = 'max-w-lg',
  showCloseButton = true
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/40 modal-overlay opacity-100"
        onClick={onClose}
      />
      <div
        className={`relative bg-card rounded-lg w-[90%] ${maxWidth} p-6 z-50 shadow-lg border border-border modal-panel transition-opacity duration-300 opacity-100`}
        role="dialog"
        aria-modal="true"
      >
        {showCloseButton && (
          <button
            aria-label="Fermer"
            className="absolute top-3 right-3 p-1 rounded-md hover:bg-accent/10 transition-colors"
            onClick={onClose}
          >
            <X size={18} />
          </button>
        )}
        <h3 className="text-lg font-semibold mb-4 pr-8">{title}</h3>
        {children}
      </div>
    </div>
  );
};

// Hook pour utiliser le modal avec les animations standard
export const useStandardModal = () => {
  const modal = useModal();

  const ModalWrapper: React.FC<Omit<ModalProps, 'isOpen' | 'onClose'>> = (props) => (
    <Modal
      {...props}
      isOpen={modal.modalMounted}
      onClose={modal.closeModal}
    />
  );

  return {
    ...modal,
    Modal: ModalWrapper,
  };
};
