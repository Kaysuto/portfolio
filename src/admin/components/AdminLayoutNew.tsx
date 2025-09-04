import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '@/hooks/use-theme';
import { Sun, Moon, List, X, SignOut, Code } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { theme, toggle: toggleTheme } = useTheme();
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

  const handleLogout = () => {
    localStorage.removeItem('admin_session');
    localStorage.removeItem('admin_user');
    navigate('/admin/login');
  };

  const adminNavItems = [
    { id: 'dashboard', label: 'Dashboard', path: '/admin/dashboard' },
    { id: 'analytics', label: 'Analytics', path: '/admin/analytics' },
    { id: 'maintenance', label: 'Maintenance', path: '/admin/maintenance' },
    { id: 'security', label: 'Sécurité', path: '/admin/security' },
    { id: 'settings', label: 'Paramètres', path: '/admin/settings' }
  ];

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
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo/Brand */}
            <Link to="/admin/dashboard" className="flex items-center gap-3 animate-slideInFromLeft">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                <Code size={20} className="text-accent" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-foreground">Admin Panel</span>
                <span className="text-xs text-muted-foreground">Kimiya Portfolio</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1 animate-slideInFromTop animate-delay-200">
              {adminNavItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105",
                    location.pathname === item.path
                      ? "text-accent bg-accent/10 shadow-sm"
                      : "text-foreground/80 hover:text-accent hover:bg-accent/5"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Right side buttons */}
            <div className="flex items-center space-x-2 animate-slideInFromRight animate-delay-100">
              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="p-2 hover:bg-accent/10 group transition-all duration-300 hover:scale-110"
              >
                <div className="relative">
                  {theme === 'dark' ? (
                    <Sun size={18} className="text-accent group-hover:rotate-180 transition-transform duration-500" />
                  ) : (
                    <Moon size={18} className="text-accent group-hover:-rotate-12 transition-transform duration-300" />
                  )}
                </div>
              </Button>

              {/* Logout Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="p-2 hover:bg-destructive/10 group transition-all duration-300 hover:scale-110"
              >
                <SignOut size={18} className="text-destructive group-hover:translate-x-1 transition-transform duration-200" />
              </Button>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden p-2 hover:bg-accent/10 transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X size={20} className="text-accent" />
                ) : (
                  <List size={20} className="text-accent" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 py-4 border-t border-border/50 animate-fadeInUp">
              <div className="flex flex-col space-y-2">
                {adminNavItems.map((item) => (
                  <Link
                    key={item.id}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300",
                      location.pathname === item.path
                        ? "text-accent bg-accent/10 shadow-sm"
                        : "text-foreground/80 hover:text-accent hover:bg-accent/5"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
                <button
                  onClick={handleLogout}
                  className="px-4 py-3 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-all duration-300 text-left"
                >
                  Déconnexion
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 pt-24">
        {children}
      </main>
    </div>
  );
};
