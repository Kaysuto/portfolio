import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from "react-error-boundary";
import AppRouter from './AppRouter.tsx'
import { ErrorFallback } from './ErrorFallback.tsx'
import { NotificationProvider } from './components/NotificationProvider'
import './index.css'

window.addEventListener('error', (evenement) => {
  if (evenement.error?.message?.includes('unstable_now') ||
      evenement.error?.message?.includes('runtime.lastError') ||
      evenement.error?.message?.includes('message channel closed')) {
    evenement.preventDefault();
  }
});

window.addEventListener('unhandledrejection', (evenement) => {
  if (evenement.reason?.message?.includes('runtime.lastError') ||
      evenement.reason?.message?.includes('message channel closed') ||
      evenement.reason?.message?.includes('listener indicated an asynchronous response')) {
    evenement.preventDefault();
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.reload()}
    >
      <NotificationProvider />
      <AppRouter />
    </ErrorBoundary>
  </StrictMode>
)

import('web-vitals').catch(() => {});
