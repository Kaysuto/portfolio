import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Star } from "lucide-react"
import { toast } from "sonner"
import { useLangue } from "@/lib/langue"
import { avisDisponibles, envoyerAvis, lireResumeAvis, memoriserNote, noteDejaDonnee, type ResumeAvis } from "@/lib/avis"
import { cn } from "@/lib/utils"

/**
 * « Ton avis sur le portfolio ? » : cinq étoiles, un clic suffit, pas de
 * commentaire. La moyenne et le nombre d'avis s'affichent à côté. Une note par
 * navigateur ; ensuite les étoiles restent sur la note donnée.
 */
export function AvisPortfolio() {
  const { langue, t } = useLangue()
  const [noteDonnee, setNoteDonnee] = useState<number | null>(noteDejaDonnee)
  const [survol, setSurvol] = useState(0)
  const [envoi, setEnvoi] = useState(false)
  const [resume, setResume] = useState<ResumeAvis | null>(null)

  useEffect(() => {
    lireResumeAvis().then(setResume).catch(() => {})
  }, [])

  if (!avisDisponibles) return null

  const noter = async (note: number) => {
    if (noteDonnee || envoi) return
    setEnvoi(true)
    try {
      if (!(await envoyerAvis(note))) throw new Error("refusé")
      memoriserNote(note)
      setNoteDonnee(note)
      // Mise à jour immédiate de la moyenne, sans attendre une relecture.
      setResume((avant) => {
        const total = (avant?.total ?? 0) + 1
        const moyenne = ((avant?.moyenne ?? 0) * (total - 1) + note) / total
        return { total, moyenne: Math.round(moyenne * 10) / 10 }
      })
    } catch {
      toast.error(t("La note n'a pas pu être envoyée, réessaie plus tard.", "Your rating couldn't be sent, please try again later."))
    } finally {
      setEnvoi(false)
    }
  }

  const affichee = survol || noteDonnee || 0
  const moyenne = resume?.total
    ? resume.moyenne.toLocaleString(langue === "fr" ? "fr-FR" : "en-GB", { minimumFractionDigits: 1, maximumFractionDigits: 1 })
    : null

  return (
    <div className="mt-8">
      <p className="text-sm text-foreground">
        {noteDonnee ? t("Merci pour ta note !", "Thanks for your rating!") : t("Ton avis sur le portfolio ?", "What do you think of this portfolio?")}
      </p>
      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2">
        <div
          role="radiogroup"
          aria-label={t("Noter le portfolio sur 5", "Rate the portfolio out of 5")}
          className="flex"
          onMouseLeave={() => setSurvol(0)}
        >
          {[1, 2, 3, 4, 5].map((note) => {
            const pleine = note <= affichee
            return (
              <motion.button
                key={note}
                type="button"
                role="radio"
                aria-checked={noteDonnee === note}
                aria-label={t(`${note} sur 5`, `${note} out of 5`)}
                disabled={!!noteDonnee || envoi}
                onMouseEnter={() => !noteDonnee && setSurvol(note)}
                onFocus={() => !noteDonnee && setSurvol(note)}
                onBlur={() => setSurvol(0)}
                onClick={() => noter(note)}
                whileTap={noteDonnee ? undefined : { scale: 0.85 }}
                className="rounded-md p-1 transition-transform outline-none focus-visible:ring-2 focus-visible:ring-ring enabled:hover:scale-110 disabled:cursor-default"
              >
                <Star
                  className={cn(
                    "size-6 transition-colors duration-150",
                    pleine ? "fill-accent text-accent" : "fill-transparent text-muted-foreground/50"
                  )}
                  aria-hidden="true"
                />
              </motion.button>
            )
          })}
        </div>
        {moyenne && resume && (
          <p className="text-sm text-muted-foreground">
            <span className="font-medium tabular-nums text-foreground">{moyenne}</span> / 5 ·{" "}
            {t(`${resume.total} avis`, `${resume.total} ${resume.total > 1 ? "ratings" : "rating"}`)}
          </p>
        )}
      </div>
    </div>
  )
}
