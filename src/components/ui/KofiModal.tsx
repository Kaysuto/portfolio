import React, { useEffect } from 'react';
import { Coffee } from '@phosphor-icons/react';
import { Button } from './button';
import { Modal } from './Modal';
import { useModal } from '@/hooks/useModal';

interface KofiModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function KofiModal({
  isOpen,
  onClose
}: KofiModalProps) {
  const { modalMounted, isClosing, openModal, closeModal } = useModal();

  useEffect(() => {
    if (isOpen && !modalMounted) {
      openModal();
    } else if (!isOpen && modalMounted) {
      closeModal();
    }
  }, [isOpen, modalMounted, openModal, closeModal]);

  const handleClose = () => {
    closeModal();
    setTimeout(() => onClose(), 220);
  };

  const handleOpenKofi = () => {
    window.open("https://ko-fi.com/kaysuto", "_blank", "noopener,noreferrer");
    handleClose();
  };

  if (!modalMounted) return null;

  return (
    <Modal
      isOpen={modalMounted}
      onClose={handleClose}
      maxWidth="max-w-lg"
      isClosing={isClosing}
    >
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center">
            <Coffee className="h-6 w-6 text-accent" weight="fill" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-foreground">Soutenir mon travail</h3>
            <p className="text-sm text-muted-foreground">
              Si vous appréciez mes projets, vous pouvez m'offrir un café !
            </p>
          </div>
        </div>

        <div className="bg-muted/50 rounded-xl p-4 border border-border/50">
          <p className="text-sm text-muted-foreground mb-2">
            Vous allez être redirigé vers ma page Ko-fi :
          </p>
          <div className="bg-background border border-border rounded-lg p-3">
            <code className="text-sm text-accent break-all font-mono">
              https://ko-fi.com/kaysuto
            </code>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            className="flex-1 rounded-xl"
          >
            Plus tard
          </Button>
          <Button
            type="button"
            onClick={handleOpenKofi}
            className="flex-1 bg-accent hover:bg-accent-dark text-white font-bold rounded-xl shadow-lg shadow-accent/20"
          >
            <Coffee className="h-5 w-5 mr-2" weight="bold" />
            M'offrir un café
          </Button>
        </div>
      </div>
    </Modal>
  );
}
