import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { SECTIONS } from '@/constants';
import { useLangue, type Bilingue, type Langue } from '@/lib/langue';

interface UseDocumentTitleOptions {
  enableTypingAnimation?: boolean;
  typingSpeed?: number;
  dynamicSections?: boolean;
}

const PREFIXE = "Kimiya - ";

const detecterSectionActive = (): string => {
  let sectionActive = "accueil";
  for (const id of SECTIONS) {
    const element = document.getElementById(id);
    if (element) {
      const rectangle = element.getBoundingClientRect();
      if (rectangle.top <= 100 && rectangle.bottom >= 100) {
        sectionActive = id;
      }
    }
  }
  return sectionActive;
};

const TITRES_SECTIONS: Record<string, Bilingue> = {
  accueil: { fr: "Accueil", en: "Home" },
  apropos: { fr: "À propos", en: "About" },
  stack: { fr: "Stack", en: "Stack" },
  projets: { fr: "Projets", en: "Projects" },
  contact: { fr: "Contact", en: "Contact" },
  bio: { fr: "Bio", en: "Bio" },
  maintenance: { fr: "Maintenance", en: "Maintenance" },
  admin: { fr: "Administration", en: "Admin" },
  login: { fr: "Connexion Admin", en: "Admin login" }
};

const obtenirTitreSection = (langue: Langue, section: string, cheminBase: string = ""): string => {
  let cle = TITRES_SECTIONS[section] ? section : "accueil";
  if (cheminBase === "/bio") cle = "bio";
  else if (cheminBase === "/maintenance") cle = "maintenance";
  else if (cheminBase.includes("/admin")) cle = cheminBase.includes("/login") ? "login" : "admin";

  return TITRES_SECTIONS[cle][langue];
};

export const useDocumentTitle = (
  titreBase?: string,
  options: UseDocumentTitleOptions = {}
) => {
  const {
    enableTypingAnimation = true,
    typingSpeed = 100,
    dynamicSections = false
  } = options;

  const location = useLocation();
  const { langue } = useLangue();
  const [titreAffiche, setTitreAffiche] = useState('');
  const [estEnFrappe, setEstEnFrappe] = useState(false);
  const [sectionCourante, setSectionCourante] = useState("accueil");
  const [titreCourant, setTitreCourant] = useState("");

  const refMinuteurFrappe = useRef<ReturnType<typeof setTimeout> | null>(null);
  const refMinuteurDefilement = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Détermine le titre courant en fonction de la route et de la section active
  useEffect(() => {
    let partieTitre: string;
    if (dynamicSections && location.pathname === "/") {
      const section = detecterSectionActive();
      setSectionCourante(section);
      partieTitre = obtenirTitreSection(langue, section);
    } else {
      partieTitre = titreBase || obtenirTitreSection(langue, "", location.pathname);
    }
    setTitreCourant(partieTitre);
  }, [titreBase, location.pathname, dynamicSections, langue]);

  // Suit le défilement pour les titres dynamiques des sections
  useEffect(() => {
    if (!dynamicSections || location.pathname !== "/") return;

    const gererDefilement = () => {
      if (refMinuteurDefilement.current) clearTimeout(refMinuteurDefilement.current);
      refMinuteurDefilement.current = setTimeout(() => {
        const section = detecterSectionActive();
        if (section !== sectionCourante) {
          setSectionCourante(section);
          setTitreCourant(obtenirTitreSection(langue, section));
        }
      }, 100);
    };

    window.addEventListener('scroll', gererDefilement);
    return () => {
      window.removeEventListener('scroll', gererDefilement);
      if (refMinuteurDefilement.current) clearTimeout(refMinuteurDefilement.current);
    };
  }, [dynamicSections, location.pathname, sectionCourante, langue]);

  // Animation de frappe et mise à jour du titre du document
  useEffect(() => {
    if (!enableTypingAnimation) {
      document.title = PREFIXE + titreCourant;
      setTitreAffiche(titreCourant);
      return;
    }

    // Réinitialise l'animation lorsque le titre change
    if (titreAffiche.length > titreCourant.length || !titreCourant.startsWith(titreAffiche)) {
      setTitreAffiche('');
      return;
    }

    if (titreAffiche === titreCourant) {
      document.title = PREFIXE + titreAffiche;
      setEstEnFrappe(false);
      return;
    }

    setEstEnFrappe(true);
    refMinuteurFrappe.current = setTimeout(() => {
      setTitreAffiche(precedent => {
        const suivant = titreCourant.slice(0, precedent.length + 1);
        document.title = PREFIXE + suivant;
        return suivant;
      });
    }, typingSpeed);

    return () => {
      if (refMinuteurFrappe.current) clearTimeout(refMinuteurFrappe.current);
    };
  }, [titreAffiche, titreCourant, typingSpeed, enableTypingAnimation]);

  // Nettoyage au démontage
  useEffect(() => {
    return () => {
      if (refMinuteurFrappe.current) clearTimeout(refMinuteurFrappe.current);
      if (refMinuteurDefilement.current) clearTimeout(refMinuteurDefilement.current);
    };
  }, []);

  return {
    displayTitle: PREFIXE + (enableTypingAnimation ? titreAffiche : titreCourant),
    isTyping: estEnFrappe,
    currentSection: sectionCourante,
    currentTitle: PREFIXE + titreCourant
  };
};
