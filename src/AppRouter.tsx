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

/**
 * Seul le contenu de page est animé.
 *
 * Auparavant chaque `Route` montait sa propre instance de `Layout`, si bien que
 * la barre de navigation et le pied de page étaient détruits puis reconstruits
 * à chaque navigation — et surtout, ils se retrouvaient à l'intérieur du bloc
 * animé. Or un ancêtre porteur d'un `transform` devient le bloc conteneur de
 * ses descendants `position: fixed` : le temps de la transition, la barre
 * cessait d'être ancrée au viewport et traversait l'écran (mesuré : de -797 px
 * à 12 px depuis une page défilée).
 *
 * `Layout` est donc monté une seule fois, au-dessus des routes.
 */
const RoutesAnimees: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        variants={variantesPage}
        initial="initial"
        animate="enter"
        exit="exit"
      >
        <Routes location={location}>
          <Route path="/" element={<PortfolioApp />} />
          <Route path="/bio" element={<Suspense fallback={null}><BioPage /></Suspense>} />
          <Route path="/cv" element={<Suspense fallback={null}><CVPage /></Suspense>} />
          <Route path="/legal-notice" element={<Suspense fallback={null}><MentionsLegales /></Suspense>} />

          {/* 404 : redirection vers l'accueil */}
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
      <Layout>
        <RoutesAnimees />
      </Layout>
    </BrowserRouter>
  );
};

export default AppRouter;
