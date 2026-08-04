import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Un retour vers l'accueil demandé depuis une autre page vise une section
    // précise : la Navbar a déposé sa cible et va la rejoindre. Remonter en
    // haut ici provoquerait un aller-retour visible.
    if (sessionStorage.getItem("scrollToSection")) return;
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
