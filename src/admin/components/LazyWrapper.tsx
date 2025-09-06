import React, { Suspense } from 'react';
import { CircleNotch as Loader2 } from '@phosphor-icons/react';

interface LazyWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
}

export const LazyWrapper: React.FC<LazyWrapperProps> = ({
  children,
  fallback,
  className = ""
}) => {
  const defaultFallback = (
    <div className={`flex items-center justify-center min-h-64 ${className}`}>
      <div className="text-center space-y-4">
        <Loader2 className="h-12 w-12 animate-spin text-accent mx-auto" />
        <p className="text-muted-foreground text-lg">Chargement du composant...</p>
      </div>
    </div>
  );

  return (
    <Suspense fallback={fallback || defaultFallback}>
      {children}
    </Suspense>
  );
};