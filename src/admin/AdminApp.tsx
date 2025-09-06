import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Login } from './pages/Login';
import Dashboard from './pages/Dashboard';
import LinksManager from './pages/LinksManager';
import { lazy, Suspense } from 'react';
const AnalyticsPage = lazy(() => import('./pages/Analytics').then(m => ({ default: (m as any).default ?? (m as any).Analytics })));
import Maintenance from './pages/Maintenance';
import { Security } from './pages/Security';
import { Settings } from './pages/Settings';
import { AdminLayout } from './components/AdminLayout';
import { useState, useEffect } from 'react';

export const AdminApp: React.FC = () => {
  const location = useLocation();
  console.log('AdminApp rendered at path:', location.pathname);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('AdminApp useEffect: checking auth');
    const checkAuth = async () => {
      try {
        // Temporairement désactivé pour le développement
        // const sessionExists = localStorage.getItem('admin_session') !== null;
        // setIsAuthenticated(sessionExists);
        setIsAuthenticated(true); // Toujours authentifié en mode développement
        console.log('AdminApp: Set isAuthenticated to true (dev mode)');
      } catch (error) {
        console.error('Auth check error:', error);
        setIsAuthenticated(true); // En cas d'erreur, permettre l'accès
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    // Temporairement désactivé pour le développement
    // Écouter les changements de localStorage pour détecter la déconnexion
    // const handleStorageChange = (e: StorageEvent) => {
    //   if (e.key === 'admin_session' && e.newValue === null) {
    //     setIsAuthenticated(false);
    //   }
    // };

    // Écouter les événements de storage sur la même page
    // const handleLocalStorageChange = () => {
    //   const sessionExists = localStorage.getItem('admin_session') !== null;
    //   setIsAuthenticated(sessionExists);
    // };

    // window.addEventListener('storage', handleStorageChange);

    // Ajouter un listener personnalisé pour les changements locaux
    // window.addEventListener('admin-logout', handleLocalStorageChange);

    return () => {
      // Temporairement désactivé pour le développement
      // window.removeEventListener('storage', handleStorageChange);
      // window.removeEventListener('admin-logout', handleLocalStorageChange);
    };
  }, []);

  if (loading) {
    console.log('AdminApp: Loading state active');
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log('AdminApp: Not authenticated, redirecting to /admin/login from', location.pathname);
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  console.log('AdminApp: Authenticated, rendering protected routes at', location.pathname);

  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="analytics" element={
          <Suspense fallback={<div className="p-6">Chargement…</div>}>
            <AnalyticsPage />
          </Suspense>
        } />
        <Route path="links" element={<LinksManager />} />
        <Route path="maintenance" element={<Maintenance />} />
        <Route path="security" element={<Security />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={
          <>
            {console.log('AdminApp: Catch-all route hit at', location.pathname)}
            <Navigate to="dashboard" replace />
          </>
        } />
      </Routes>
    </AdminLayout>
  );
};
