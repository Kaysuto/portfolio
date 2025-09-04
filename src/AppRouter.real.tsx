import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PortfolioApp } from './PortfolioApp';
import { AdminApp } from './admin/AdminApp.beautiful';
import BioPage from './pages/BioPage';

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes publiques - Portfolio inchangé */}
        <Route path="/" element={<PortfolioApp />} />
        
        {/* Page Bio publique */}
        <Route path="/bio" element={<BioPage />} />
        
        {/* Routes admin sécurisées */}
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
