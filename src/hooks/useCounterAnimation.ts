import { useState, useEffect, useRef } from 'react'

interface UseCounterAnimationProps {
  end: number
  duration?: number
  start?: number
}

export function useCounterAnimation({ end, duration = 2000, start = 0 }: UseCounterAnimationProps) {
  const [compteur, setCompteur] = useState(start)
  const [estVisible, setEstVisible] = useState(false)
  const [aDejaAnime, setADejaAnime] = useState(false)
  const [valeurFinaleCourante, setValeurFinaleCourante] = useState(end)
  const refElement = useRef<HTMLDivElement>(null)

  // Mettre à jour la valeur finale quand elle change
  useEffect(() => {
    if (end !== valeurFinaleCourante && end > 0) {
      setValeurFinaleCourante(end)
      setADejaAnime(false) // Permettre une nouvelle animation si la valeur change
    }
  }, [end, valeurFinaleCourante])

  useEffect(() => {
    const observateur = new IntersectionObserver(
      ([entree]) => {
        if (entree.isIntersecting && !aDejaAnime && valeurFinaleCourante > 0) {
          setEstVisible(true)
          setADejaAnime(true)
        }
      },
      {
        threshold: 0.3, // Déclenche quand 30% de l'élément est visible
        rootMargin: '0px 0px -100px 0px' // Déclenche un peu avant que l'élément soit complètement visible
      }
    )

    if (refElement.current) {
      observateur.observe(refElement.current)
    }

    return () => {
      if (refElement.current) {
        observateur.unobserve(refElement.current)
      }
    }
  }, [aDejaAnime, valeurFinaleCourante])

  useEffect(() => {
    if (!estVisible || valeurFinaleCourante === 0) return

    const tempsDebut = Date.now()
    const valeurDebut = start
    const valeurFin = valeurFinaleCourante

    const animer = () => {
      const maintenant = Date.now()
      const tempsEcoule = maintenant - tempsDebut
      const progression = Math.min(tempsEcoule / duration, 1)

      // Fonction d'atténuation plus fluide (ease-out quadratique avec transition douce)
      const attenuationSortieQuad = 1 - Math.pow(1 - progression, 2)

      // Interpolation avec nombres entiers uniquement
      const valeurCourante = valeurDebut + (valeurFin - valeurDebut) * attenuationSortieQuad

      // Utilisation de Math.floor pour avoir uniquement des entiers
      setCompteur(Math.floor(valeurCourante))

      if (progression < 1) {
        requestAnimationFrame(animer)
      } else {
        setCompteur(valeurFin)
      }
    }

    requestAnimationFrame(animer)
  }, [estVisible, valeurFinaleCourante, start, duration])

  return { count: compteur, elementRef: refElement }
}
