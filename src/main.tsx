import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from "react-error-boundary";
import AppRouter from './AppRouter.tsx'
import { ErrorFallback } from './ErrorFallback.tsx'
import { NotificationProvider } from './components/NotificationProvider'
import './index.css'

window.addEventListener('error', (event) => {
  if (event.error?.message?.includes('unstable_now') ||
      event.error?.message?.includes('runtime.lastError') ||
      event.error?.message?.includes('message channel closed')) {
    event.preventDefault();
  }
});

window.addEventListener('unhandledrejection', (event) => {
  if (event.reason?.message?.includes('runtime.lastError') ||
      event.reason?.message?.includes('message channel closed') ||
      event.reason?.message?.includes('listener indicated an asynchronous response')) {
    event.preventDefault();
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
