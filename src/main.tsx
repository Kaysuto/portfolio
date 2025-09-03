import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from "react-error-boundary";
import App from './App.tsx'
import { ErrorFallback } from './ErrorFallback.tsx'
import './index.css'

// Error handling for runtime issues
window.addEventListener('error', (event) => {
  if (event.error?.message?.includes('unstable_now')) {
    event.preventDefault();
    console.warn('Scheduler warning suppressed:', event.error.message);
  }
});

// Suppress Chrome extension runtime errors
window.addEventListener('unhandledrejection', (event) => {
  if (event.reason?.message?.includes('runtime.lastError') || 
      event.reason?.message?.includes('message channel closed')) {
    event.preventDefault();
    console.warn('Extension error suppressed:', event.reason.message);
  }
});

// Performance monitoring
const reportWebVitals = (metric: any) => {
  if (import.meta.env.PROD) {
    console.log(metric);
  }
};

// Initialize app
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
import('web-vitals').then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
  onCLS(reportWebVitals);
  onINP(reportWebVitals);
  onFCP(reportWebVitals);
  onLCP(reportWebVitals);
  onTTFB(reportWebVitals);
}).catch(() => {
  // web-vitals not available, continue without metrics
});
