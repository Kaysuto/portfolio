import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '@/hooks/use-theme';
import { useAuth } from '../../hooks/useAuth.tsx';
import { Sun, Moon, List, X, SignOut, Code, User, CaretDown } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { theme, toggle: toggleTheme } = useTheme();
  const { signOut, profile, user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/admin/login');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      // En cas d'erreur, forcer la navigation
      navigate('/admin/login');
    }
  };

  const adminNavItems = [
    { id: 'dashboard', label: 'Dashboard', path: '/admin/dashboard' },
    { id: 'analytics', label: 'Analytics', path: '/admin/analytics' },
    { id: 'links', label: 'Liens', path: '/admin/links' },
    { id: 'maintenance', label: 'Maintenance', path: '/admin/maintenance' },
    { id: 'security', label: 'Sécurité', path: '/admin/security' },
    { id: 'settings', label: 'Paramètres', path: '/admin/settings' }
  ];

  // Fonction pour générer l'URL Gravatar
  const getGravatarUrl = (email: string, size: number = 40) => {
    // Fonction simple de hash MD5 pour le navigateur
    const hash = email ? simpleMD5(email.toLowerCase().trim()) : '00000000000000000000000000000000';
    return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=mp&r=g`;
  };

  // Fonction simple de hash MD5 pour le navigateur
  const simpleMD5 = (str: string): string => {
    // Pour simplifier, on utilise une approche basique
    // En production, il faudrait une vraie implémentation MD5
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convertir en 32 bits
    }
    return Math.abs(hash).toString(16).padStart(32, '0');
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden theme-fade">
      {/* Animated background shapes - identiques à la page principale */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-20 left-10 w-24 h-24 bg-accent/5 rounded-full animate-float-slow animate-delay-700"></div>
        <div className="absolute top-1/3 right-16 w-16 h-16 bg-primary/8 rounded-full animate-float-medium animate-delay-800"></div>
        <div className="absolute bottom-32 left-1/4 w-12 h-12 bg-secondary/10 rounded-full animate-float-fast animate-delay-900"></div>
        <div className="absolute top-1/2 left-8 w-8 h-8 bg-accent/10 rounded-full animate-bounce-slow animate-delay-1000"></div>
        <div className="absolute bottom-1/4 right-20 w-20 h-20 bg-muted/15 rounded-full animate-pulse-slow animate-delay-600"></div>
      </div>

      {/* Navbar - inspirée de la navbar principale */}
      <nav className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 animate-fadeIn",
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border/50 shadow-lg"
          : "bg-transparent"
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Logo/Brand */}
            <Link to="/admin/dashboard" className="flex items-center gap-2 sm:gap-3 animate-slideInFromLeft min-w-0 group">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/30 transition-all duration-300 group-hover:scale-110">
                <Code size={16} className="sm:hidden text-accent group-hover:scale-110 transition-transform duration-200" />
                <Code size={20} className="hidden sm:block text-accent group-hover:scale-110 transition-transform duration-200" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-base sm:text-lg font-bold text-foreground truncate group-hover:text-accent transition-colors duration-200">
                  Kimiya
                </span>
                <span className="text-xs sm:text-sm text-muted-foreground font-medium group-hover:text-accent/80 transition-colors duration-200">
                  Admin
                </span>
              </div>
            </Link>

            {/* Desktop Navigation - Centré */}
            <div className="hidden lg:flex items-center space-x-1 animate-slideInFromTop animate-delay-200">
              {adminNavItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  className={cn(
                    "px-3 xl:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 whitespace-nowrap",
                    location.pathname === item.path
                      ? "text-accent bg-accent/10 shadow-sm"
                      : "text-foreground/80 hover:text-accent hover:bg-accent/5"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* User Info - Desktop */}
            <div className="hidden md:flex items-center mr-2">
              <div className="flex items-center space-x-3 px-3 py-2 bg-accent/10 rounded-xl border border-accent/20 hover:bg-accent/15 transition-all duration-300 hover:scale-[1.02] cursor-pointer group">
                {/* Avatar Gravatar */}
                <div className="relative">
                  <img
                    src={getGravatarUrl(user?.email || '', 32)}
                    alt="Avatar"
                    className="w-8 h-8 rounded-full border-2 border-accent/30 group-hover:border-accent/50 transition-all duration-300"
                    onError={(e) => {
                      // Fallback to default avatar if Gravatar fails
                      const target = e.target as HTMLImageElement;
                      target.src = `data:image/svg+xml;base64,${btoa(`
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="16" cy="16" r="16" fill="#f3f4f6"/>
                          <circle cx="16" cy="12" r="5" fill="#6b7280"/>
                          <path d="M6 26c0-5.5 4.5-10 10-10s10 4.5 10 10" fill="#6b7280"/>
                        </svg>
                      `)}`;
                    }}
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                </div>

                {/* User Info */}
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-semibold text-foreground truncate max-w-32">
                    {profile?.nickname || user?.email?.split('@')[0] || 'Kimiya'}
                  </span>
                  <div className="flex items-center space-x-1">
                    <span className="text-xs text-accent font-medium capitalize">
                      {profile?.role || 'admin'}
                    </span>
                    <CaretDown size={10} className="text-accent/70 group-hover:text-accent transition-colors duration-200" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right side buttons */}
            <div className="flex items-center space-x-1 sm:space-x-2 animate-slideInFromRight animate-delay-100 flex-shrink-0">
              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="p-1.5 sm:p-2 hover:bg-accent/10 group transition-all duration-300 hover:scale-110"
              >
                <div className="relative">
                  {theme === 'dark' ? (
                    <Sun size={16} className="sm:hidden text-accent group-hover:rotate-180 transition-transform duration-500" />
                  ) : (
                    <Moon size={16} className="sm:hidden text-accent group-hover:-rotate-12 transition-transform duration-300" />
                  )}
                  {theme === 'dark' ? (
                    <Sun size={18} className="hidden sm:block text-accent group-hover:rotate-180 transition-transform duration-500" />
                  ) : (
                    <Moon size={18} className="hidden sm:block text-accent group-hover:-rotate-12 transition-transform duration-300" />
                  )}
                </div>
              </Button>

              {/* Logout Button - Hidden on mobile */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="hidden md:flex p-1.5 sm:p-2 hover:bg-destructive/10 group transition-all duration-300 hover:scale-110"
              >
                <SignOut size={16} className="sm:hidden text-destructive group-hover:translate-x-1 transition-transform duration-200" />
                <SignOut size={18} className="hidden sm:block text-destructive group-hover:translate-x-1 transition-transform duration-200" />
              </Button>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden p-2 hover:bg-accent/10 transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <div className="w-5 h-5 flex flex-col justify-center items-center">
                  <div className={cn(
                    "w-4 h-0.5 bg-accent transition-all duration-300 ease-out",
                    isMobileMenuOpen ? "rotate-45 translate-y-0.5" : "translate-y-0"
                  )} />
                  <div className={cn(
                    "w-4 h-0.5 bg-accent transition-all duration-300 ease-out my-0.5",
                    isMobileMenuOpen ? "opacity-0" : "opacity-100"
                  )} />
                  <div className={cn(
                    "w-4 h-0.5 bg-accent transition-all duration-300 ease-out",
                    isMobileMenuOpen ? "-rotate-45 -translate-y-0.5" : "translate-y-0"
                  )} />
                </div>
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Overlay */}
        <div className={cn(
          "lg:hidden fixed inset-0 z-40 transition-all duration-300 top-20",
          isMobileMenuOpen ? "visible opacity-100" : "invisible opacity-0"
        )}>
          {/* Backdrop */}
          <div 
            className={cn(
              "absolute inset-0 bg-black/20 backdrop-blur-sm transition-all duration-300",
              isMobileMenuOpen ? "opacity-100" : "opacity-0"
            )}
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Mobile Menu */}
          <div className={cn(
            "absolute top-4 left-4 right-4 bg-background/95 backdrop-blur-md border border-border/50 rounded-2xl shadow-2xl transition-all duration-300",
            isMobileMenuOpen 
              ? "opacity-100 translate-y-0 scale-100" 
              : "opacity-0 -translate-y-4 scale-95"
          )}>
            <div className="p-4 space-y-1 max-h-[calc(100vh-8rem)] overflow-y-auto">
              {adminNavItems.map((item, index) => (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300",
                    "hover:scale-[1.02] hover:shadow-sm",
                    location.pathname === item.path
                      ? "text-accent bg-accent/10 shadow-sm border border-accent/20"
                      : "text-foreground/80 hover:text-accent hover:bg-accent/5"
                  )}
                  style={{
                    animationDelay: isMobileMenuOpen ? `${index * 30}ms` : '0ms'
                  }}
                >
                  <span>{item.label}</span>
                  {location.pathname === item.path && (
                    <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  )}
                </Link>
              ))}
              
              {/* User Info for Mobile */}
              <div className="px-4 py-3 bg-accent/5 rounded-xl border border-accent/20">
                <div className="flex items-center space-x-3">
                  {/* Avatar Gravatar Mobile */}
                  <div className="relative">
                    <img
                      src={getGravatarUrl(user?.email || '', 40)}
                      alt="Avatar"
                      className="w-10 h-10 rounded-full border-2 border-accent/30"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `data:image/svg+xml;base64,${btoa(`
                          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="20" cy="20" r="20" fill="#f3f4f6"/>
                            <circle cx="20" cy="15" r="6" fill="#6b7280"/>
                            <path d="M8 33c0-6.6 5.4-12 12-12s12 5.4 12 12" fill="#6b7280"/>
                          </svg>
                        `)}`;
                      }}
                    />
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-foreground">
                      {profile?.nickname || user?.email?.split('@')[0] || 'Kimiya'}
                    </span>
                    <span className="text-xs text-accent font-medium capitalize">
                      {profile?.role || 'admin'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="my-3 border-t border-border/50" />

              {/* Logout Button for Mobile */}
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleLogout();
                }}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-all duration-300 hover:scale-[1.02]"
              >
                <span>Déconnexion</span>
                <SignOut size={16} className="text-destructive" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 pt-28">
        {children}
      </main>
    </div>
  );
};
