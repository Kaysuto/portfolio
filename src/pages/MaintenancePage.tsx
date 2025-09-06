import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTheme } from '@/hooks/use-theme';
import { CaretLeft } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const MaintenancePage: React.FC = () => {
  const { theme } = useTheme();

  // Fetch maintenance config
  const { data: maintenanceConfig, isLoading } = useQuery({
    queryKey: ['maintenanceStatus'],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/maintenance?select=*`, {
        headers: {
          apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch maintenance status');
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const config = maintenanceConfig && maintenanceConfig.length > 0 ? maintenanceConfig[0] : { message: 'Le site est temporairement en maintenance.', estimated_time: 'Bientôt de retour.' };

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden theme-fade">
      {/* Animated background shapes */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-20 left-10 w-24 h-24 bg-accent/10 rounded-full animate-float-slow animate-delay-700"></div>
        <div className="absolute top-1/3 right-16 w-16 h-16 bg-primary/15 rounded-full animate-float-medium animate-delay-800"></div>
        <div className="absolute bottom-32 left-1/4 w-12 h-12 bg-secondary/20 rounded-full animate-float-fast animate-delay-900"></div>
        <div className="absolute top-1/2 left-8 w-8 h-8 bg-accent/10 rounded-full animate-bounce-slow animate-delay-1000"></div>
        <div className="absolute bottom-1/4 right-20 w-20 h-20 bg-muted/15 rounded-full animate-pulse-slow animate-delay-600"></div>
      </div>

      <div className="flex items-center justify-center min-h-screen px-6 py-12">
        <div className="w-full max-w-md animate-fadeInUp">
          {/* Hero Text */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-foreground">Site</span>
              <br />
              <span className="text-accent">en Maintenance</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              {config.message}
            </p>
            {config.estimated_time && (
              <p className="text-lg text-muted-foreground mt-2">
                Retour prévu : {config.estimated_time}
              </p>
            )}
          </div>

          {/* Back to Admin Button */}
          <Link to="/admin">
            <Button
              variant="ghost"
              size="lg"
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-3 text-lg font-medium group transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent/25"
            >
              Retour au Panneau Admin
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MaintenancePage;