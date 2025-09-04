import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPageSimple as LoginPage } from './pages/LoginPageSimple';
import { Dashboard } from './pages/Dashboard';

export const AdminAppSimple: React.FC = () => {
  console.log('AdminAppSimple rendered');
  
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/admin/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={
          <div className="min-h-screen bg-base-100 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">Page Admin - Debug</h1>
              <p>Route actuelle: {window.location.pathname}</p>
              <div className="space-y-2 mt-4">
                <a href="/admin/login" className="btn btn-primary block">Aller au Login</a>
                <a href="/admin/dashboard" className="btn btn-secondary block">Aller au Dashboard</a>
              </div>
            </div>
          </div>
        } />
      </Routes>
    </div>
  );
};
