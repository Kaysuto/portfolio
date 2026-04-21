import { useState, useEffect, useCallback } from 'react';

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

  const openModal = useCallback(() => {
    setIsClosing(false);
    setModalMounted(true);
    setTimeout(() => setIsModalOpen(true), 10);
  }, []);

  const closeModal = useCallback(() => {
    setIsClosing(true);
    setIsModalOpen(false);
    setTimeout(() => {
      setModalMounted(false);
      setIsClosing(false);
    }, 220);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    if (isModalOpen) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isModalOpen, closeModal]);

  return {
    isModalOpen,
    modalMounted,
    isClosing,
    openModal,
    closeModal,
  };
};
