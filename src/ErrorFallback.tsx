import { Alert, AlertTitle, AlertDescription } from "./components/ui/alert";
import { Button } from "./components/ui/button";
import type { FallbackProps } from "react-error-boundary";

import { AlertTriangleIcon, RefreshCwIcon } from "lucide-react";

export const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  // En mode développement, on relance l'erreur sans afficher la frontière.
  // L'UI parente se chargera d'afficher un message plus précis.
  if (import.meta.env.DEV) throw error;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Alert variant="destructive" className="mb-6">
          <AlertTriangleIcon />
          <AlertTitle>Une erreur est survenue dans l'application</AlertTitle>
          <AlertDescription>
            Quelque chose d'inattendu s'est produit lors de l'exécution de l'application. Les détails de l'erreur sont affichés ci-dessous.
          </AlertDescription>
        </Alert>

        <div className="bg-card border rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-base text-muted-foreground mb-2">Détails de l'erreur :</h3>
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
          Réessayer
        </Button>
      </div>
    </div>
  );
}
