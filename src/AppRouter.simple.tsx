import { useState, useEffect } from 'react';
import { PortfolioApp } from './PortfolioApp';

// Version simple sans react-router pour tester
export default function AppRouter() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  // Si le chemin commence par /admin, afficher l'admin
  if (currentPath.startsWith('/admin')) {
    return (
      <div className="min-h-screen bg-gray-100 text-gray-900" data-theme="light">
        <div className="container mx-auto p-8">
          <h1 className="text-4xl font-bold mb-8 text-blue-600">
            🔧 Panel Admin - Mode Test
          </h1>
          
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Connexion Admin</h2>
            <p className="mb-4">Chemin actuel: {currentPath}</p>
            <p className="text-green-600 mb-4">✅ Routing fonctionne !</p>
            
            <div className="space-y-2">
              <button 
                className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={() => {
                  window.history.pushState({}, '', '/admin/dashboard');
                  setCurrentPath('/admin/dashboard');
                }}
              >
                Aller au Dashboard
              </button>
              
              <button 
                className="w-full bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                onClick={() => {
                  window.history.pushState({}, '', '/');
                  setCurrentPath('/');
                }}
              >
                Retour au Portfolio
              </button>
            </div>
          </div>
          
          {currentPath === '/admin/dashboard' && (
            <div className="bg-white rounded-lg shadow-lg p-6 mt-4">
              <h3 className="text-xl font-semibold mb-2">Dashboard Admin</h3>
              <p>Dashboard fonctionne ! ✅</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Sinon, afficher le portfolio
  return <PortfolioApp />;
}
