import { cn } from "@/lib/utils"

/**
 * Trois points qui s'allument tour à tour (style `.chargeur` dans `index.css`).
 * Décoratif : le texte voisin ou un `aria-busy` dit ce qui se passe.
 */
function Chargeur({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={cn("chargeur", className)}>
      <span />
      <span />
      <span />
    </span>
  )
}

export { Chargeur }
