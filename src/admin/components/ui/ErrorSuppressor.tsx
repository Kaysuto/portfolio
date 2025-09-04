import { useEffect } from 'react';

/**
 * Hook pour supprimer les erreurs d'extensions de navigateur
 * Utilisé dans les pages admin pour éviter les pollutions de console
 */
export const useErrorSuppression = () => {
  useEffect(() => {
    // Fonction pour supprimer les erreurs d'extensions
    const suppressExtensionErrors = (event: ErrorEvent) => {
      const message = event.error?.message || '';
      if (
        message.includes('runtime.lastError') ||
        message.includes('message channel closed') ||
        message.includes('listener indicated an asynchronous response') ||
        message.includes('Extension context invalidated')
      ) {
        event.preventDefault();
        event.stopPropagation();
        return false;
      }
    };

    const suppressPromiseRejections = (event: PromiseRejectionEvent) => {
      const message = event.reason?.message || '';
      if (
        message.includes('runtime.lastError') ||
        message.includes('message channel closed') ||
        message.includes('listener indicated an asynchronous response')
      ) {
        event.preventDefault();
        return false;
      }
    };

    // Ajouter les listeners
    window.addEventListener('error', suppressExtensionErrors, true);
    window.addEventListener('unhandledrejection', suppressPromiseRejections, true);

    // Cleanup
    return () => {
      window.removeEventListener('error', suppressExtensionErrors, true);
      window.removeEventListener('unhandledrejection', suppressPromiseRejections, true);
    };
  }, []);
};

/**
 * Composant wrapper pour supprimer les erreurs d'extensions
 */
export const ErrorSuppressor: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useErrorSuppression();
  return <>{children}</>;
};
