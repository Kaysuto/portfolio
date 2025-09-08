import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface UseDocumentTitleOptions {
  enableTypingAnimation?: boolean;
  typingSpeed?: number;
  dynamicSections?: boolean;
}

// Fonction pour détecter la section active sur la page d'accueil
const detectActiveSection = (): string => {
  const sections = [
    { id: "accueil" },
    { id: "apropos" }, 
    { id: "projets" },
    { id: "contact" },
  ];

  let activeSection = "accueil";
  
  for (const section of sections) {
    const element = document.getElementById(section.id);
    if (element) {
      const rect = element.getBoundingClientRect();
      if (rect.top <= 100 && rect.bottom >= 100) {
        activeSection = section.id;
      }
    }
  }
  
  return activeSection;
};

// Map des sections vers les titres
const getSectionTitle = (section: string, basePath: string = ""): string => {
  const titleMap: Record<string, string> = {
    accueil: "Accueil",
    apropos: "À propos", 
    projets: "Projets",
    contact: "Contact",
    bio: "Bio",
    maintenance: "Maintenance",
    admin: "Administration",
    login: "Connexion Admin"
  };

  // Pour les pages spécifiques
  if (basePath === "/bio") return titleMap.bio;
  if (basePath === "/maintenance") return titleMap.maintenance;
  if (basePath.includes("/admin")) {
    return basePath.includes("/login") ? titleMap.login : titleMap.admin;
  }
  
  // Pour la page d'accueil avec sections
  return titleMap[section] || titleMap.accueil;
};

export const useDocumentTitle = (
  baseTitle?: string,
  options: UseDocumentTitleOptions = {}
) => {
  const {
    enableTypingAnimation = true,
    typingSpeed = 100,
    dynamicSections = false
  } = options;

  const location = useLocation();
  const [displayTitle, setDisplayTitle] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentSection, setCurrentSection] = useState("accueil");
  const [currentTitle, setCurrentTitle] = useState("");
  
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const PREFIX = "Kimiya - "; // Partie fixe du titre

  // Déterminer le titre actuel basé sur la route et la section
  useEffect(() => {
    let titlePart = baseTitle || "";
    
    if (dynamicSections && location.pathname === "/") {
      // Page d'accueil avec sections dynamiques
      const section = detectActiveSection();
      setCurrentSection(section);
      titlePart = getSectionTitle(section);
    } else {
      // Pages spécifiques
      titlePart = baseTitle || getSectionTitle("", location.pathname);
    }
    
    setCurrentTitle(titlePart);
  }, [baseTitle, location.pathname, dynamicSections]);

  // Observer les changements de scroll pour les sections dynamiques
  useEffect(() => {
    if (!dynamicSections || location.pathname !== "/") return;

    const handleScroll = () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      scrollTimeoutRef.current = setTimeout(() => {
        const section = detectActiveSection();
        if (section !== currentSection) {
          setCurrentSection(section);
          const newTitlePart = getSectionTitle(section);
          setCurrentTitle(newTitlePart);
        }
      }, 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [dynamicSections, location.pathname, currentSection]);

  // Animation de frappe simplifiée
  useEffect(() => {
    if (!enableTypingAnimation) {
      document.title = PREFIX + currentTitle;
      return;
    }

    // Si on a déjà fini d'animer ce titre
    if (displayTitle === currentTitle) {
      document.title = PREFIX + displayTitle;
      return;
    }

    // Reset l'animation quand le titre change
    if (displayTitle.length > currentTitle.length || !currentTitle.startsWith(displayTitle)) {
      setDisplayTitle('');
      return;
    }

    setIsTyping(true);
    
    const typeNextChar = () => {
      setDisplayTitle(prev => {
        const nextLength = prev.length + 1;
        const nextTitle = currentTitle.slice(0, nextLength);
        
        if (nextTitle === currentTitle) {
          setIsTyping(false);
        }
        
        return nextTitle;
      });
    };

    typingTimeoutRef.current = setTimeout(typeNextChar, typingSpeed);

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [displayTitle, currentTitle, typingSpeed, enableTypingAnimation]);

  // Mettre à jour le titre du document
  useEffect(() => {
    if (enableTypingAnimation) {
      // "Kimiya - " + partie animée
      document.title = PREFIX + displayTitle;
    } else {
      // "Kimiya - " + titre complet
      document.title = PREFIX + currentTitle;
    }
  }, [displayTitle, currentTitle, enableTypingAnimation]);

  // Réinitialiser l'animation quand le titre change
  useEffect(() => {
    if (enableTypingAnimation) {
      setDisplayTitle('');
    }
  }, [currentTitle, enableTypingAnimation]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return {
    displayTitle: PREFIX + (enableTypingAnimation ? displayTitle : currentTitle),
    isTyping,
    currentSection,
    currentTitle: PREFIX + currentTitle
  };
};
