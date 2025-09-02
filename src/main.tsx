import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from "react-error-boundary";
import App from './App.tsx'
import { ErrorFallback } from './ErrorFallback.tsx'
import './index.css'

// Les polices sont chargées via <link rel="preload/stylesheet"> dans index.html pour éviter le CLS
const preloadCriticalResources = () => {};

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
        if (import.meta.env.DEV) {
          console.error('App Error:', error, errorInfo);
        }
      }}
      onReset={() => window.location.reload()}
    >
      <App />
    </ErrorBoundary>
  </StrictMode>
)

// Report web vitals for performance monitoring
import('web-vitals').then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
  onCLS(reportWebVitals);
  onINP(reportWebVitals);
  onFCP(reportWebVitals);
  onLCP(reportWebVitals);
  onTTFB(reportWebVitals);
}).catch(() => {
  // web-vitals not available, continue without metrics
});
