import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { WhitelistService } from '../../services/adminServices';
import type { SecurityCheck } from '../../types/admin';

interface WhitelistGuardProps {
  children: React.ReactNode;
}

// Composant page d'accès refusé (ne révèle pas l'existence de l'admin)
const AccessDenied: React.FC<{ reason: string }> = ({ reason }) => {
  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
      <div className="text-center max-w-md mx-auto">
        <div className="text-6xl mb-6">🔒</div>
        <h1 className="text-2xl font-bold text-error mb-4">
          Accès Non Autorisé
        </h1>
        <p className="text-base-content/70 mb-6">
          Cette ressource n'est pas accessible depuis votre localisation.
        </p>
        <button 
          onClick={() => window.location.href = '/'}
          className="btn btn-primary"
        >
          Retour à l'accueil
        </button>
      </div>
    </div>
  );
};

// Composant de chargement
const SecurityLoading: React.FC = () => {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <div className="text-center">
        <div className="loading loading-spinner loading-lg text-primary mb-4"></div>
        <p className="text-base-content/70">Vérification des accès...</p>
      </div>
    </div>
  );
};

export const WhitelistGuard: React.FC<WhitelistGuardProps> = ({ children }) => {
  const [securityCheck, setSecurityCheck] = useState<SecurityCheck | null>(null);
  const [loading, setLoading] = useState(true);

  // Fonction pour obtenir l'IP du client (simulation pour le dev local)
  const getClientIP = async (): Promise<string> => {
    try {
      // En développement, utiliser une IP de test
      if (import.meta.env.DEV) {
        return '127.0.0.1'; // IP locale pour les tests
      }

      // En production, récupérer la vraie IP via un service
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.error('Erreur récupération IP:', error);
      return '127.0.0.1'; // Fallback
    }
  };

  useEffect(() => {
    const validateAccess = async () => {
      try {
        // Étape 1: Vérification IP
        const clientIP = await getClientIP();
        
        // En développement, toujours autoriser l'IP locale
        let ipAllowed = false;
        if (import.meta.env.DEV && clientIP === '127.0.0.1') {
          ipAllowed = true;
        } else {
          ipAllowed = await WhitelistService.validateIP(clientIP);
        }

        if (!ipAllowed) {
          setSecurityCheck({
            ipAllowed: false,
            sessionValid: false,
            userAuthenticated: false
          });
          setLoading(false);
          return;
        }

        // Étape 2: Vérification session (simplifié pour le moment)
        const sessionValid = localStorage.getItem('admin_session') !== null;

        setSecurityCheck({
          ipAllowed: true,
          sessionValid,
          userAuthenticated: sessionValid // Pour le moment, session = auth
        });

      } catch (error) {
        console.error('Erreur validation sécurité:', error);
        // En cas d'erreur, bloquer l'accès
        setSecurityCheck({
          ipAllowed: false,
          sessionValid: false,
          userAuthenticated: false
        });
      } finally {
        setLoading(false);
      }
    };

    validateAccess();
  }, []);

  if (loading) {
    return <SecurityLoading />;
  }

  // Si IP pas autorisée, afficher page d'erreur générique
  if (!securityCheck?.ipAllowed) {
    return <AccessDenied reason="network" />;
  }

  // Si pas de session valide, rediriger vers login admin
  if (!securityCheck?.sessionValid || !securityCheck?.userAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  // Accès autorisé
  return <>{children}</>;
};
