import { Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/Login';
import Dashboard from './pages/Dashboard';
import LinksManager from './pages/LinksManager';
import Security from './pages/Security';
import { AdminLayout } from './components/AdminLayout';
import { AuthGuard } from './components/AuthGuard';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

export const AdminApp: React.FC = () => {
  // Titre fixe sans animation  
  useDocumentTitle("Administration", { enableTypingAnimation: false });

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
              <Route path="links" element={<LinksManager />} />
              <Route path="security" element={<Security />} />
              <Route path="*" element={<Navigate to="dashboard" replace />} />
            </Routes>
          </AdminLayout>
        </AuthGuard>
      } />
    </Routes>
  );
};
