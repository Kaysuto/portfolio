import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PortfolioApp } from '@/PortfolioApp';
import { AdminApp } from './admin/AdminApp';
import { Login } from './admin/pages/Login';
import MaintenancePage from './pages/MaintenancePage';
import BioPage from './pages/BioPage';

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes publiques - Portfolio */}
        <Route path="/" element={<PortfolioApp />} />
        <Route path="/bio" element={<BioPage />} />
        <Route path="/maintenance" element={<MaintenancePage />} />

        {/* Routes admin - Sans sécurité pour le développement */}
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/*" element={<AdminApp />} />

        {/* Redirection de /login vers /admin/login */}
        <Route path="/login" element={<Navigate to="/admin/login" replace />} />

        {/* 404 pour toute autre route - PLACÉ EN DERNIER */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
