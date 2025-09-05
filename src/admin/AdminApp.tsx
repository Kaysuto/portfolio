import { Routes, Route, Navigate } from 'react-router-dom';
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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Vérification plus simple et rapide pour éviter les blocages
        const sessionExists = localStorage.getItem('admin_session') !== null;
        setIsAuthenticated(sessionExists);
      } catch (error) {
        console.error('Auth check error:', error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    // Écouter les changements de localStorage pour détecter la déconnexion
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'admin_session' && e.newValue === null) {
        setIsAuthenticated(false);
      }
    };

    // Écouter les événements de storage sur la même page
    const handleLocalStorageChange = () => {
      const sessionExists = localStorage.getItem('admin_session') !== null;
      setIsAuthenticated(sessionExists);
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Ajouter un listener personnalisé pour les changements locaux
    window.addEventListener('admin-logout', handleLocalStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('admin-logout', handleLocalStorageChange);
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/analytics" element={
          <Suspense fallback={<div className="p-6">Chargement…</div>}>
            <AnalyticsPage />
          </Suspense>
        } />
        <Route path="/links" element={<LinksManager />} />
        <Route path="/maintenance" element={<Maintenance />} />
        <Route path="/security" element={<Security />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </AdminLayout>
  );
};
