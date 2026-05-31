import { useState, useEffect, useCallback } from 'react';

export interface UseModalReturn {
  isModalOpen: boolean;
  modalMounted: boolean;
  isClosing: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useModal = (): UseModalReturn => {
  const [estModaleOuverte, setEstModaleOuverte] = useState(false);
  const [modaleMontee, setModaleMontee] = useState(false);
  const [estEnFermeture, setEstEnFermeture] = useState(false);

  const ouvrirModale = useCallback(() => {
    setEstEnFermeture(false);
    setModaleMontee(true);
    setTimeout(() => setEstModaleOuverte(true), 10);
  }, []);

  const fermerModale = useCallback(() => {
    setEstEnFermeture(true);
    setEstModaleOuverte(false);
    setTimeout(() => {
      setModaleMontee(false);
      setEstEnFermeture(false);
    }, 220);
  }, []);

  useEffect(() => {
    const surTouche = (evenement: KeyboardEvent) => {
      if (evenement.key === "Escape") fermerModale();
    };
    if (estModaleOuverte) document.addEventListener("keydown", surTouche);
    return () => document.removeEventListener("keydown", surTouche);
  }, [estModaleOuverte, fermerModale]);

  return {
    isModalOpen: estModaleOuverte,
    modalMounted: modaleMontee,
    isClosing: estEnFermeture,
    openModal: ouvrirModale,
    closeModal: fermerModale,
  };
};
