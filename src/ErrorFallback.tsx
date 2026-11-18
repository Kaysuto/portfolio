import { Alert, AlertTitle, AlertDescription } from "./components/ui/alert";
import { Button } from "./components/ui/button";
import type { FallbackProps } from "react-error-boundary";
import { useLangue } from "./lib/langue";

import { AlertTriangleIcon, RefreshCwIcon } from "lucide-react";

export const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  const { t } = useLangue();

  // En mode développement, on relance l'erreur sans afficher la frontière.
  // L'UI parente se chargera d'afficher un message plus précis.
  if (import.meta.env.DEV) throw error;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Alert variant="destructive" className="mb-6">
          <AlertTriangleIcon />
          <AlertTitle>{t("Une erreur est survenue dans l'application", "Something went wrong in the app")}</AlertTitle>
          <AlertDescription>
            {t(
              "Quelque chose d'inattendu s'est produit lors de l'exécution de l'application. Les détails de l'erreur sont affichés ci-dessous.",
              "Something unexpected happened while the app was running. The error details are shown below."
            )}
          </AlertDescription>
        </Alert>

        <div className="bg-card border rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-base text-muted-foreground mb-2">{t("Détails de l'erreur :", "Error details:")}</h3>
          <pre className="text-sm text-destructive bg-muted/50 p-3 rounded border overflow-auto max-h-32">
            {error instanceof Error ? error.message : String(error)}
          </pre>
        </div>

        <Button
          onClick={resetErrorBoundary}
          className="w-full"
          variant="outline"
        >
          <RefreshCwIcon />
          {t("Réessayer", "Try again")}
        </Button>
      </div>
    </div>
  );
}
