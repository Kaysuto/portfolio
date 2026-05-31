import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Suspense } from 'react';
import { PortfolioApp } from '@/PortfolioApp';
import { BioPage, CVPage, MentionsLegales } from '@/routes/lazyRoutes';
import { Layout } from '@/components/Layout';
import { ScrollToTop } from '@/components/ScrollToTop';
import { EASE_OUT } from '@/lib/animations';

const variantesPage = {
  initial: { opacity: 0, y: 12 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE_OUT } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2, ease: EASE_OUT } },
};

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        variants={variantesPage}
        initial="initial"
        animate="enter"
        exit="exit"
        style={{ backgroundColor: 'var(--background)', minHeight: '100vh' }}
      >
        <Routes location={location}>
          {/* Routes publiques - Portfolio avec Layout commun */}
          <Route path="/" element={<Layout><PortfolioApp /></Layout>} />
          <Route path="/bio" element={<Layout><Suspense fallback={null}><BioPage /></Suspense></Layout>} />
          <Route path="/cv" element={<Layout><Suspense fallback={null}><CVPage /></Suspense></Layout>} />
          <Route path="/legal-notice" element={<Layout><Suspense fallback={null}><MentionsLegales /></Suspense></Layout>} />

          {/* 404 pour toute autre route - Redirection vers l'accueil */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AnimatedRoutes />
    </BrowserRouter>
  );
};

export default AppRouter;
