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
  if (theme === 'dark') document.documentElement.classList.add('dark');
  else document.documentElement.classList.remove('dark');
}

export function setTheme(theme: Theme) {
  try {
    localStorage.setItem(COOKIE_NAME, theme);
    setCookie(COOKIE_NAME, theme);
  } catch (e) { /* best-effort */ }
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
