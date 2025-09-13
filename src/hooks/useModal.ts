import { useState, useEffect } from 'react';

export interface UseModalReturn {
  isModalOpen: boolean;
  modalMounted: boolean;
  isClosing: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useModal = (): UseModalReturn => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMounted, setModalMounted] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const openModal = () => {
    setIsClosing(false);
    setModalMounted(true);
    // Allow mount then trigger visible state to run transition
    setTimeout(() => setIsModalOpen(true), 10);
  };

  const closeModal = () => {
    setIsClosing(true);
    setIsModalOpen(false);
    // Wait for animation to finish then unmount
    setTimeout(() => {
      setModalMounted(false);
      setIsClosing(false);
    }, 270);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    if (isModalOpen) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isModalOpen]);

  return {
    isModalOpen,
    modalMounted,
    isClosing,
    openModal,
    closeModal,
  };
};
