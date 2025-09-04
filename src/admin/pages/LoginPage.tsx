import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AdminAuthService } from '../services/adminServices';
import { useTheme } from '@/hooks/use-theme';
import { CaretLeft, Sun, Moon, Lock, User } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { theme, toggle: toggleTheme } = useTheme();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const user = await AdminAuthService.login(email, password);

      if (user) {
        // Sauvegarder la session
        localStorage.setItem('admin_session', JSON.stringify(user));
        navigate('/admin/dashboard');
      } else {
        setError('Email ou mot de passe incorrect');
      }
    } catch (error) {
      setError('Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden theme-fade">
      {/* Animated background shapes - identiques à HeroSection */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-20 left-10 w-24 h-24 bg-accent/10 rounded-full animate-float-slow animate-delay-700"></div>
        <div className="absolute top-1/3 right-16 w-16 h-16 bg-primary/15 rounded-full animate-float-medium animate-delay-800"></div>
        <div className="absolute bottom-32 left-1/4 w-12 h-12 bg-secondary/20 rounded-full animate-float-fast animate-delay-900"></div>
        <div className="absolute top-1/2 left-8 w-8 h-8 bg-accent/20 rounded-full animate-bounce-slow animate-delay-1000"></div>
        <div className="absolute bottom-1/4 right-20 w-20 h-20 bg-muted/30 rounded-full animate-pulse-slow animate-delay-600"></div>
      </div>

      {/* Boutons flottants en haut */}
      <div className="fixed top-6 left-6 right-6 z-50 flex items-center justify-between">
        {/* Bouton retour */}
        <Link 
          to="/" 
          className="flex items-center gap-2 text-foreground/80 hover:text-accent transition-colors duration-300 group bg-background/20 backdrop-blur-sm border border-border/30 rounded-lg px-3 py-2"
        >
          <CaretLeft 
            size={20} 
            className="group-hover:-translate-x-1 transition-transform duration-200" 
          />
          <span className="text-sm font-medium hidden sm:block">Retour</span>
        </Link>

        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleTheme}
          className="p-2 hover:bg-accent/10 group transition-all duration-300 hover:scale-110 bg-background/20 backdrop-blur-sm border border-border/30 rounded-lg"
        >
          <div className="relative">
            {theme === 'dark' ? (
              <Sun size={18} className="text-accent group-hover:rotate-180 transition-transform duration-500" />
            ) : (
              <Moon size={18} className="text-accent group-hover:-rotate-12 transition-transform duration-300" />
            )}
          </div>
        </Button>
      </div>

      {/* Contenu principal - style HeroSection */}
      <main className="min-h-screen flex items-center justify-center px-6 relative">
        <div className="max-w-md w-full mx-auto relative z-10">
          
          {/* Titre avec style accent */}
          <div className="text-center mb-8 animate-fadeInUp">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center">
                <Lock size={28} className="text-accent" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              <span className="text-foreground">Admin</span>
              <br />
              <span className="text-accent">Panel</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Connexion sécurisée
            </p>
          </div>

          {/* Carte de login avec glassmorphism */}
          <div className="animate-fadeInUp animate-delay-200">
            <div className="bg-background/40 backdrop-blur-md border border-border/50 rounded-xl p-8 shadow-xl">
              
              {/* Message d'erreur */}
              {error && (
                <div className="bg-destructive/10 border border-destructive/20 text-destructive text-sm p-3 rounded-lg mb-6 animate-fadeIn">
                  {error}
                </div>
              )}

              {/* Formulaire */}
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label 
                      htmlFor="email" 
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Email
                    </label>
                    <div className="relative">
                      <User 
                        size={18} 
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
                      />
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={loading}
                        className="w-full pl-10 pr-4 py-3 bg-background/50 border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-300 disabled:opacity-50"
                        placeholder="admin@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label 
                      htmlFor="password" 
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Mot de passe
                    </label>
                    <div className="relative">
                      <Lock 
                        size={18} 
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
                      />
                      <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={loading}
                        className="w-full pl-10 pr-4 py-3 bg-background/50 border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-300 disabled:opacity-50"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                </div>

                {/* Bouton de connexion - style HeroSection */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 text-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                      Connexion...
                    </div>
                  ) : (
                    'Se connecter'
                  )}
                </Button>
              </form>

              {/* Note de développement */}
              <div className="mt-6 p-4 bg-accent/5 border border-accent/20 rounded-lg">
                <p className="text-xs text-muted-foreground text-center">
                  <strong className="text-accent">Mode développement</strong><br />
                  Email: admin@kaysuto.fr<br />
                  Mot de passe: admin123
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
