import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { SECTIONS } from '@/constants';

interface UseDocumentTitleOptions {
  enableTypingAnimation?: boolean;
  typingSpeed?: number;
  dynamicSections?: boolean;
}

const PREFIX = "Kimiya - ";

const detectActiveSection = (): string => {
  let activeSection = "accueil";
  for (const id of SECTIONS) {
    const element = document.getElementById(id);
    if (element) {
      const rect = element.getBoundingClientRect();
      if (rect.top <= 100 && rect.bottom >= 100) {
        activeSection = id;
      }
    }
  }
  return activeSection;
};

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

  if (basePath === "/bio") return titleMap.bio;
  if (basePath === "/maintenance") return titleMap.maintenance;
  if (basePath.includes("/admin")) {
    return basePath.includes("/login") ? titleMap.login : titleMap.admin;
  }

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

  // Determine the current title based on route and active section
  useEffect(() => {
    let titlePart: string;
    if (dynamicSections && location.pathname === "/") {
      const section = detectActiveSection();
      setCurrentSection(section);
      titlePart = getSectionTitle(section);
    } else {
      titlePart = baseTitle || getSectionTitle("", location.pathname);
    }
    setCurrentTitle(titlePart);
  }, [baseTitle, location.pathname, dynamicSections]);

  // Track scroll for dynamic section titles
  useEffect(() => {
    if (!dynamicSections || location.pathname !== "/") return;

    const handleScroll = () => {
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        const section = detectActiveSection();
        if (section !== currentSection) {
          setCurrentSection(section);
          setCurrentTitle(getSectionTitle(section));
        }
      }, 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [dynamicSections, location.pathname, currentSection]);

  // Typing animation and document title update
  useEffect(() => {
    if (!enableTypingAnimation) {
      document.title = PREFIX + currentTitle;
      setDisplayTitle(currentTitle);
      return;
    }

    // Reset animation when title changes
    if (displayTitle.length > currentTitle.length || !currentTitle.startsWith(displayTitle)) {
      setDisplayTitle('');
      return;
    }

    if (displayTitle === currentTitle) {
      document.title = PREFIX + displayTitle;
      setIsTyping(false);
      return;
    }

    setIsTyping(true);
    typingTimeoutRef.current = setTimeout(() => {
      setDisplayTitle(prev => {
        const next = currentTitle.slice(0, prev.length + 1);
        document.title = PREFIX + next;
        return next;
      });
    }, typingSpeed);

    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    };
  }, [displayTitle, currentTitle, typingSpeed, enableTypingAnimation]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  return {
    displayTitle: PREFIX + (enableTypingAnimation ? displayTitle : currentTitle),
    isTyping,
    currentSection,
    currentTitle: PREFIX + currentTitle
  };
};
