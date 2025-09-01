import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from "react-error-boundary";
// ...existing code...

import App from './App.tsx'
import { ErrorFallback } from './ErrorFallback.tsx'



createRoot(document.getElementById('root')!).render(
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <App />
   </ErrorBoundary>
)
