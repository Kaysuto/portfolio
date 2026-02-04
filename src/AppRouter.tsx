import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PortfolioApp } from '@/PortfolioApp';
import BioPage from './pages/BioPage';
import { Layout } from '@/components/Layout';
import { ScrollToTop } from '@/components/ScrollToTop';

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <ScrollToTop />
      <Routes>
        {/* Routes publiques - Portfolio avec Layout commun */}
        <Route path="/" element={<Layout><PortfolioApp /></Layout>} />
        <Route path="/bio" element={<Layout><BioPage /></Layout>} />

        {/* 404 pour toute autre route - Redirection vers l'accueil */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
