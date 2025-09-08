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
import { AuthGuard } from './components/AuthGuard';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

export const AdminApp: React.FC = () => {
  // Document title with typing animation - auto-detected for admin pages
  useDocumentTitle();

  return (
    <Routes>
      {/* Route de connexion publique */}
      <Route path="login" element={<Login />} />

      {/* Routes protégées admin */}
      <Route path="/*" element={
        <AuthGuard>
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
              <Route path="*" element={<Navigate to="dashboard" replace />} />
            </Routes>
          </AdminLayout>
        </AuthGuard>
      } />
    </Routes>
  );
};
