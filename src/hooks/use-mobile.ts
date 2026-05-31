import { useEffect, useState } from "react"

const SEUIL_MOBILE = 768

export function useIsMobile() {
  const [estMobile, setEstMobile] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    const requeteMedia = window.matchMedia(`(max-width: ${SEUIL_MOBILE - 1}px)`)
    const surChangement = () => {
      setEstMobile(window.innerWidth < SEUIL_MOBILE)
    }
    requeteMedia.addEventListener("change", surChangement)
    setEstMobile(window.innerWidth < SEUIL_MOBILE)
    return () => requeteMedia.removeEventListener("change", surChangement)
  }, [])

  return !!estMobile
}
