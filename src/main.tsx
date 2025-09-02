import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from "react-error-boundary";
import App from './App.tsx'
import { ErrorFallback } from './ErrorFallback.tsx'
import './index.css'

// Critical resource hints for performance
const preloadCriticalResources = () => {
  // Preload critical fonts
  const font = new FontFace('Inter', 'url(https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2)');
  font.load().then(() => document.fonts.add(font));
};

// Performance monitoring
const reportWebVitals = (metric: any) => {
  if (import.meta.env.PROD) {
    console.log(metric);
  }
};

// Initialize app
preloadCriticalResources();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary 
      FallbackComponent={ErrorFallback}
      onError={(error, errorInfo) => {
        console.error('App Error:', error, errorInfo);
      }}
      onReset={() => window.location.reload()}
    >
      <App />
    </ErrorBoundary>
  </StrictMode>
)

// Report web vitals for performance monitoring
import('web-vitals').then(({ onCLS, onFID, onFCP, onLCP, onTTFB }) => {
  onCLS(reportWebVitals);
  onFID(reportWebVitals);
  onFCP(reportWebVitals);
  onLCP(reportWebVitals);
  onTTFB(reportWebVitals);
}).catch(() => {
  // web-vitals not available, continue without metrics
});
