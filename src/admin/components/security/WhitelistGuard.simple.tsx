import { ReactNode } from 'react';

interface WhitelistGuardProps {
  children: ReactNode;
}

// Version simple pour tester sans Supabase
export const WhitelistGuard: React.FC<WhitelistGuardProps> = ({ children }) => {
  // Pour le test, on autorise toujours l'accès
  // En production, ici on vérifierait l'IP avec Supabase
  
  return (
    <div>
      {/* Affichage temporaire pour le test */}
      <div className="alert alert-info mb-4">
        <span>Mode test - Whitelist désactivée</span>
      </div>
      {children}
    </div>
  );
};
