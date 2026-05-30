import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Cookie helpers pour persister le thème utilisateur
export function setCookie(name: string, value: string, days = 365) {
  if (typeof document === 'undefined') return
  const d = new Date()
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000)
  const expires = `expires=${d.toUTCString()}`
  // SameSite=Lax pour éviter certains problèmes CORS tout en restant raisonnablement sûr
  document.cookie = `${name}=${encodeURIComponent(value)};path=/;${expires};SameSite=Lax`
}

export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[\]*+?\\^])/g, '\\$1') + '=([^;]*)'))
  return match ? decodeURIComponent(match[1]) : null
}
