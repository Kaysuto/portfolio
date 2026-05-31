export type Theme = 'dark' | 'light';

const COOKIE_NAME = 'theme';
const COOKIE_DAYS = 365;

function definirCookie(nom: string, valeur: string, jours = COOKIE_DAYS) {
  const dateExpiration = new Date();
  dateExpiration.setTime(dateExpiration.getTime() + jours * 24 * 60 * 60 * 1000);
  document.cookie = `${nom}=${valeur}; Path=/; Expires=${dateExpiration.toUTCString()}; SameSite=Lax${location.protocol === 'https:' ? '; Secure' : ''}`;
}

function obtenirCookie(nom: string) {
  const correspondance = document.cookie.match(new RegExp('(?:^|; )' + nom + '=([^;]*)'));
  return correspondance ? decodeURIComponent(correspondance[1]) : null;
}

export function applyTheme(theme: Theme) {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
  } else {
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
  }
}

export function setTheme(theme: Theme) {
  try {
    // Toujours sauvegarder dans localStorage pour la synchronisation immédiate
    localStorage.setItem(COOKIE_NAME, theme);

    // Vérifier le consentement des cookies avant de les définir
    const consentement = localStorage.getItem('cookie-consent');
    if (consentement === 'accepted') {
      definirCookie(COOKIE_NAME, theme);
    } else {
      // Si pas de consentement, définir quand même un cookie de session (sans expiration)
      // pour que le thème persiste pendant la session de navigation
      document.cookie = `${COOKIE_NAME}=${theme}; Path=/; SameSite=Lax${location.protocol === 'https:' ? '; Secure' : ''}`;
    }

    // Déclencher un événement personnalisé pour synchroniser toutes les instances
    window.dispatchEvent(new CustomEvent('themeChange', { detail: { theme } }));
  } catch (erreur) {
    console.warn('Impossible de sauvegarder la préférence de thème :', erreur);
  }
  applyTheme(theme);
}

export function initTheme(): Theme {
  try {
    const themeCookie = obtenirCookie(COOKIE_NAME) as Theme | null;
    const themeLocal = (localStorage.getItem(COOKIE_NAME) as Theme | null);

    if (themeCookie === 'dark' || themeCookie === 'light') return themeCookie;
    if (themeLocal === 'dark' || themeLocal === 'light') return themeLocal;

    // Si aucun choix manuel, utiliser la préférence système
    const themeSysteme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    applyTheme(themeSysteme);
    return themeSysteme;
  } catch {
    const themeParDefaut = 'light';
    applyTheme(themeParDefaut);
    return themeParDefaut;
  }
}
