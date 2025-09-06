import { QueryClient } from '@tanstack/react-query';

// Configuration optimisée de React Query pour les performances
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Cache pendant 5 minutes
      staleTime: 5 * 60 * 1000, // 5 minutes
      // Garder en cache pendant 10 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (anciennement cacheTime)
      // Retry 2 fois en cas d'erreur
      retry: 2,
      // Retry delay exponentiel
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      // Refetch en background quand la fenêtre retrouve le focus
      refetchOnWindowFocus: false,
      // Refetch quand on reconnecte
      refetchOnReconnect: true,
      // Refetch à intervalle régulier (désactivé par défaut)
      refetchInterval: false,
    },
    mutations: {
      // Retry 1 fois pour les mutations
      retry: 1,
      // Retry delay pour les mutations
      retryDelay: 1000,
    },
  },
});