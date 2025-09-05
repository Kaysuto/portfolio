import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AdminAuthService } from '../services/adminServices';
import { useTheme } from '@/hooks/use-theme';
import { CaretLeft, Sun, Moon, Lock, User } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';

export const Login: React.FC = () => {
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
        setTimeout(() => {
          navigate('/admin/dashboard');
          window.location.reload();
        }, 100);
      }
    } catch (error: any) {
      setError(error.message || 'Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

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

      {/* Floating Controls */}
      <div className="fixed top-6 left-6 z-50 flex gap-3 animate-slideInFromLeft">
        <Link to="/">
          <Button
            variant="ghost"
            size="sm"
            className="p-3 bg-background/20 backdrop-blur-md border border-border/30 hover:bg-background/30 transition-all duration-300 hover:scale-110 group"
          >
            <CaretLeft size={20} className="text-accent group-hover:-translate-x-1 transition-transform duration-200" />
          </Button>
        </Link>
      </div>

      <div className="fixed top-6 right-6 z-50 animate-slideInFromRight">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleTheme}
          className="p-3 bg-background/20 backdrop-blur-md border border-border/30 hover:bg-background/30 transition-all duration-300 hover:scale-110 group"
        >
          {theme === 'dark' ? (
            <Sun size={20} className="text-accent group-hover:rotate-180 transition-transform duration-500" />
          ) : (
            <Moon size={20} className="text-accent group-hover:-rotate-12 transition-transform duration-300" />
          )}
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen px-6 py-12">
        <div className="w-full max-w-md animate-fadeInUp">
          {/* Hero Text */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-foreground">Admin</span>
              <br />
              <span className="text-accent">Portal</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Accédez au panneau d'administration
            </p>
          </div>

          {/* Login Form */}
          <div className="bg-background/40 backdrop-blur-md border border-border/50 rounded-xl p-8 hover:bg-background/50 transition-all duration-300 hover:scale-[1.02] shadow-lg">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center">
                <Lock size={32} className="text-accent" />
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              {error && (
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm animate-shake">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <div className="relative">
                  <User size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@kimiya.dev"
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-background/60 border border-border/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-300"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Mot de passe
                </label>
                <div className="relative">
                  <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-background/60 border border-border/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-300"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-3 text-lg font-medium group transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent/25"
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-accent-foreground border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Lock size={20} className="mr-2 group-hover:scale-110 transition-transform duration-200" />
                    Se connecter
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 p-4 rounded-lg bg-accent/10 border border-accent/20">
              <p className="text-sm text-accent text-center">
                <strong>Demo:</strong> admin@kimiya.dev / admin123
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
