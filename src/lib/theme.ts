export type Theme = 'dark' | 'light';

const COOKIE_NAME = 'theme';
const COOKIE_DAYS = 365;

function setCookie(name: string, value: string, days = COOKIE_DAYS) {
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value}; Path=/; Expires=${d.toUTCString()}; SameSite=Lax${location.protocol === 'https:' ? '; Secure' : ''}`;
}

function getCookie(name: string) {
  const m = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
  return m ? decodeURIComponent(m[1]) : null;
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
    const consent = localStorage.getItem('cookie-consent');
    if (consent === 'accepted') {
      setCookie(COOKIE_NAME, theme);
    } else {
      // Si pas de consentement, définir quand même un cookie de session (sans expiration)
      // pour que le thème persiste pendant la session de navigation
      document.cookie = `${COOKIE_NAME}=${theme}; Path=/; SameSite=Lax${location.protocol === 'https:' ? '; Secure' : ''}`;
    }

    // Déclencher un événement personnalisé pour synchroniser toutes les instances
    window.dispatchEvent(new CustomEvent('themeChange', { detail: { theme } }));
  } catch (e) { 
    console.warn('Could not save theme preference:', e);
  }
  applyTheme(theme);
}

export function initTheme(defaultTheme: Theme = 'dark') {
  try {
    const cookie = getCookie(COOKIE_NAME) as Theme | null;
    const ls = (localStorage.getItem(COOKIE_NAME) as Theme | null);
    const chosen = cookie || ls || defaultTheme;
    applyTheme(chosen);
    return chosen;
  } catch (e) {
    applyTheme(defaultTheme);
    return defaultTheme;
  }
}
