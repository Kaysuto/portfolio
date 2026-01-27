import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import { Wrench, Clock, Settings, MessageCircle, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { PrivacyBadge } from '@/components/PrivacyBadge';
import { ThemeController } from '@/components/ThemeController';
import { motion, AnimatePresence } from 'framer-motion';

const MaintenancePage: React.FC = () => {
  useDocumentTitle("Maintenance | Kimiya", { enableTypingAnimation: false });

  const { user, isAdmin } = useAuth();

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
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full"
        />
      </div>
    );
  }

  const config = maintenanceConfig?.[0] || { 
    message: 'Le site est temporairement en maintenance.', 
    estimated_time: 'Bientôt de retour.' 
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden flex flex-col items-center justify-center font-['Montserrat']">
      {/* Background Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-accent/20 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[100px]"
        />
      </div>

      {/* Theme Controller Position */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeController />
      </div>

      <main className="relative z-10 w-full max-w-2xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-8"
        >
          {/* Main Status Card */}
          <Card className="bg-card/40 backdrop-blur-2xl border-border/50 rounded-[3rem] overflow-hidden shadow-2xl shadow-accent/5">
            <CardContent className="p-8 md:p-12 text-center">
              <motion.div 
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
                className="w-24 h-24 bg-accent/10 rounded-[2rem] flex items-center justify-center mx-auto mb-10 group"
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Wrench className="w-12 h-12 text-accent" />
                </motion.div>
              </motion.div>

              <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6 tracking-tight leading-tight">
                Pardon pour le <br />
                <span className="text-accent underline decoration-accent/20 decoration-4 underline-offset-8">contretemps</span>
              </h1>

              <p className="text-xl text-muted-foreground font-medium mb-10 leading-relaxed max-w-lg mx-auto">
                {config.message}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                <div className="p-5 bg-accent/5 rounded-2xl border border-accent/10 flex items-center gap-4">
                  <div className="p-2.5 bg-accent/10 rounded-xl">
                    <Clock className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-accent block">Estimation</span>
                    <span className="text-sm font-bold text-foreground">{config.estimated_time || 'Inconnue'}</span>
                  </div>
                </div>

                <div className="p-5 bg-primary/5 rounded-2xl border border-primary/10 flex items-center gap-4">
                  <div className="p-2.5 bg-primary/10 rounded-xl">
                    <Settings className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary block">État</span>
                    <span className="text-sm font-bold text-foreground">Maintenance</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Admin Backlink */}
          <AnimatePresence>
            {user && isAdmin && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="text-center"
              >
                <Link to="/admin">
                  <Button
                    size="lg"
                    className="h-14 px-8 rounded-2xl bg-accent hover:bg-accent/90 text-accent-foreground font-bold shadow-xl shadow-accent/20 transition-all hover:scale-105 active:scale-95"
                  >
                    Accéder au Panneau Admin
                  </Button>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>

      {/* Footer Info */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="fixed bottom-8 flex flex-col items-center gap-4 text-center px-6"
      >
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground opacity-50">
          © {new Date().getFullYear()} Kaysuto Kimiya • Tous droits réservés
        </p>
      </motion.div>

      <PrivacyBadge />
    </div>
  );
};

export default MaintenancePage;
