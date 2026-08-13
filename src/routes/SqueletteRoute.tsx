import { Skeleton } from "@/components/ui/skeleton"

/**
 * Attente commune aux routes chargées à la demande (/cv, /bio, /legal-notice).
 *
 * Le `fallback` de `Suspense` valait `null` : le temps que le chunk arrive,
 * `<main>` ne mesurait rien et le pied de page remontait se coller sous la
 * barre de navigation. Le squelette reprend donc la coque partagée par ces
 * pages — `min-h-screen`, mêmes marges verticales, même largeur de colonne —
 * pour que la hauteur soit réservée dès la première frame et que le contenu
 * réel s'y substitue sans décalage.
 */
export function SqueletteRoute() {
  return (
    <div
      className="min-h-screen relative flex flex-col"
      role="status"
      aria-live="polite"
    >
      <span className="sr-only">Chargement de la page…</span>

      <div className="flex-1 py-24 md:py-32 px-6 lg:px-12 relative z-10">
        <div className="mx-auto max-w-5xl">
          {/* Bouton « Retour à l'accueil » */}
          <Skeleton className="h-9 w-44 mb-10" />

          {/* En-tête centré : surtitre en capitales, titre, ligne de repères */}
          <div className="flex flex-col items-center gap-4 pb-10 border-b border-border/60">
            <Skeleton className="h-3.5 w-32" />
            <Skeleton className="h-12 md:h-[4.5rem] w-64 md:w-80" />
            <Skeleton className="h-5 w-full max-w-md" />
          </div>

          {/*
            Trois bandes séparées par un filet : c'est le rythme commun au CV
            (parcours, formation, outils) comme à la bio (une bande par
            catégorie de liens).
          */}
          <div className="divide-y divide-border/60">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="flex flex-col items-center gap-6 py-10">
                <Skeleton className="h-3.5 w-36" />
                <div className="w-full max-w-2xl space-y-3">
                  <Skeleton className="h-16 w-full rounded-lg" />
                  <Skeleton className="h-16 w-full rounded-lg" />
                  <Skeleton className="h-16 w-4/5 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
