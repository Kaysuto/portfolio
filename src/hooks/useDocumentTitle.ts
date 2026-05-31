import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { SECTIONS } from '@/constants';

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

const obtenirTitreSection = (section: string, cheminBase: string = ""): string => {
  const mapTitres: Record<string, string> = {
    accueil: "Accueil",
    apropos: "À propos",
    projets: "Projets",
    contact: "Contact",
    bio: "Bio",
    maintenance: "Maintenance",
    admin: "Administration",
    login: "Connexion Admin"
  };

  if (cheminBase === "/bio") return mapTitres.bio;
  if (cheminBase === "/maintenance") return mapTitres.maintenance;
  if (cheminBase.includes("/admin")) {
    return cheminBase.includes("/login") ? mapTitres.login : mapTitres.admin;
  }

  return mapTitres[section] || mapTitres.accueil;
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
      partieTitre = obtenirTitreSection(section);
    } else {
      partieTitre = titreBase || obtenirTitreSection("", location.pathname);
    }
    setTitreCourant(partieTitre);
  }, [titreBase, location.pathname, dynamicSections]);

  // Suit le défilement pour les titres dynamiques des sections
  useEffect(() => {
    if (!dynamicSections || location.pathname !== "/") return;

    const gererDefilement = () => {
      if (refMinuteurDefilement.current) clearTimeout(refMinuteurDefilement.current);
      refMinuteurDefilement.current = setTimeout(() => {
        const section = detecterSectionActive();
        if (section !== sectionCourante) {
          setSectionCourante(section);
          setTitreCourant(obtenirTitreSection(section));
        }
      }, 100);
    };

    window.addEventListener('scroll', gererDefilement);
    return () => {
      window.removeEventListener('scroll', gererDefilement);
      if (refMinuteurDefilement.current) clearTimeout(refMinuteurDefilement.current);
    };
  }, [dynamicSections, location.pathname, sectionCourante]);

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
