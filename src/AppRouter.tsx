import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PortfolioApp } from '@/PortfolioApp';
import { AdminApp } from './admin/AdminApp';
import BioPage from './pages/BioPage';

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes publiques - Portfolio */}
        <Route path="/" element={<PortfolioApp />} />
        <Route path="/bio" element={<BioPage />} />
        
        {/* Routes admin - Sans sécurité pour le développement */}
        <Route 
          path="/admin/*" 
          element={<AdminApp />}
        />
        
        {/* 404 pour toute autre route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
