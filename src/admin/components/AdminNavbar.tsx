import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/use-theme';
import { 
  Sun, 
  Moon, 
  ArrowLeft, 
  Shield, 
  User, 
  SignOut, 
  House,
  Link,
  ChartBar,
  Gear,
  List,
  Bell
} from '@phosphor-icons/react';

// Hook personnalisé pour les animations de scroll
const useScrollAnimation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return isScrolled;
};

export const AdminNavbar = () => {
  const { theme, toggle: toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isScrolled = useScrollAnimation();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('admin_authenticated');
    navigate('/admin/login');
  };

  // Navigation items
  const navItems = [
    { icon: House, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: Link, label: 'Liens', path: '/admin/links' },
    { icon: ChartBar, label: 'Analytics', path: '/admin/analytics' },
    { icon: Gear, label: 'Maintenance', path: '/admin/maintenance' },
    { icon: Shield, label: 'Sécurité', path: '/admin/security' },
  ];

  const isActivePath = (path: string) => location.pathname === path;

  return (
    <header className={`sticky top-0 z-50 backdrop-blur-sm transition-all duration-300 ${
      isScrolled ? 'bg-background/95 shadow-lg border-b border-border' : 'bg-background/80'
    }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo et titre */}
          <div className="flex items-center gap-4 group">
            <div 
              onClick={() => navigate('/admin/dashboard')}
              className="p-2 bg-accent/10 rounded-lg group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300 cursor-pointer"
            >
              <Shield size={20} className="text-accent group-hover:animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Panel Admin</h1>
              <p className="text-xs text-muted-foreground">Portfolio Management</p>
            </div>
          </div>

          {/* Navigation desktop */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Button
                key={item.path}
                variant="ghost"
                size="sm"
                onClick={() => navigate(item.path)}
                className={`px-3 py-2 transition-all duration-300 hover:scale-105 ${
                  isActivePath(item.path)
                    ? 'bg-accent/20 text-accent border border-accent/30'
                    : 'hover:bg-accent/10 text-foreground'
                }`}
                title={item.label}
              >
                <item.icon size={16} className="mr-2" />
                <span className="text-sm font-medium">{item.label}</span>
              </Button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {/* Notifications */}
            <Button
              variant="ghost"
              size="sm"
              className="p-2 hover:bg-accent/10 group transition-all duration-300 hover:scale-110 relative"
              title="Notifications"
            >
              <Bell size={18} className="text-accent group-hover:animate-pulse" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs flex items-center justify-center">
                <span className="w-2 h-2 bg-red-400 rounded-full animate-ping absolute"></span>
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              </span>
            </Button>

            {/* Bouton retour portfolio */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="p-2 hover:bg-accent/10 group transition-all duration-300 hover:scale-110"
              title="Retour au portfolio"
            >
              <ArrowLeft size={18} className="text-accent group-hover:-translate-x-1 transition-transform duration-300" />
            </Button>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="p-2 hover:bg-accent/10 group transition-all duration-300 hover:scale-110"
              title="Changer le thème"
            >
              <div className="relative">
                {theme === 'dark' ? (
                  <Sun size={18} className="text-accent group-hover:rotate-180 transition-transform duration-500" />
                ) : (
                  <Moon size={18} className="text-accent group-hover:-rotate-12 transition-transform duration-300" />
                )}
              </div>
            </Button>

            {/* User Menu */}
            <Button
              variant="ghost"
              size="sm"
              className="p-2 hover:bg-accent/10 group transition-all duration-300 hover:scale-110"
              title="Profil admin"
            >
              <User size={18} className="text-accent group-hover:animate-pulse" />
            </Button>

            {/* Déconnexion */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="p-2 hover:bg-destructive/10 group transition-all duration-300 hover:scale-110"
              title="Déconnexion"
            >
              <SignOut size={18} className="text-destructive group-hover:animate-pulse" />
            </Button>

            {/* Mobile menu toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 hover:bg-accent/10 group transition-all duration-300"
              title="Menu"
            >
              <List size={18} className="text-accent" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {showMobileMenu && (
          <div className="md:hidden mt-4 pb-4 border-t border-border pt-4 animate-fadeInUp">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  variant="ghost"
                  onClick={() => {
                    navigate(item.path);
                    setShowMobileMenu(false);
                  }}
                  className={`justify-start px-3 py-2 transition-all duration-300 ${
                    isActivePath(item.path)
                      ? 'bg-accent/20 text-accent border border-accent/30'
                      : 'hover:bg-accent/10 text-foreground'
                  }`}
                >
                  <item.icon size={16} className="mr-3" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Button>
              ))}
            </nav>
          </div>
        )}
      </div>

      {/* Breadcrumb */}
      <div className="border-t border-border bg-background/50">
        <div className="container mx-auto px-6 py-2">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span 
              onClick={() => navigate('/admin/dashboard')}
              className="hover:text-accent cursor-pointer transition-colors"
            >
              Admin
            </span>
            <span>/</span>
            <span className="text-accent font-medium">
              {navItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
