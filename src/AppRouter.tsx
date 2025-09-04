import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PortfolioApp } from '@/PortfolioApp';
import { AdminApp } from './admin/AdminApp.simple';
import { WhitelistGuard } from './admin/components/security/WhitelistGuard.simple';

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes publiques - Portfolio inchangé */}
        <Route path="/" element={<PortfolioApp />} />
        
        {/* Routes admin - Complètement sécurisées et séparées */}
        <Route 
          path="/admin/*" 
          element={
            <WhitelistGuard>
              <AdminApp />
            </WhitelistGuard>
          } 
        />
        
        {/* 404 pour toute autre route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
