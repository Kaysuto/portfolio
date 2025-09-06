import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.tsx';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({
  children,
  requireAdmin = true
}) => {
  const { user, profile, loading, isAdmin } = useAuth();
  const location = useLocation();

  // Debug temporaire - à nettoyer en production
  // console.log('🔍 DEBUG AuthGuard:', debugInfo);

  // Afficher un loader seulement pendant l'initialisation critique
  if (loading && !user) {
    // console.log('🔍 DEBUG AuthGuard: Chargement initial');
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // Rediriger vers login si pas connecté
  if (!user) {
    // console.log('🔍 DEBUG AuthGuard: Pas d\'utilisateur, redirection vers login');
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // Si on a un utilisateur connecté, on autorise l'accès même sans profil complet
  // L'admin check sera fait dans les composants individuels si nécessaire
  if (requireAdmin) {
    // Pour l'email kaysuto@gmail.com, on fait confiance
    const isKnownAdmin = user.email === 'kaysuto@gmail.com';
    const hasAdminProfile = profile?.is_admin === true;
    
    if (!isKnownAdmin && !hasAdminProfile) {
      // console.log('🔍 DEBUG AuthGuard: Utilisateur non admin');
      return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }
  }

  // console.log('🔍 DEBUG AuthGuard: Accès autorisé');
  return <>{children}</>;
};