import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Aides pour les cookies, permettant de persister le thème utilisateur
export function setCookie(name: string, value: string, days = 365) {
  if (typeof document === 'undefined') return
  const dateExpiration = new Date()
  dateExpiration.setTime(dateExpiration.getTime() + days * 24 * 60 * 60 * 1000)
  const expires = `expires=${dateExpiration.toUTCString()}`
  // SameSite=Lax pour éviter certains problèmes CORS tout en restant raisonnablement sûr
  document.cookie = `${name}=${encodeURIComponent(value)};path=/;${expires};SameSite=Lax`
}

export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  const correspondance = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[\]*+?\\^])/g, '\\$1') + '=([^;]*)'))
  return correspondance ? decodeURIComponent(correspondance[1]) : null
}
