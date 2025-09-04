import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/use-theme';
import { Sun, Moon, ArrowLeft, Eye, Link, ChartBar, Gear, Shield } from '@phosphor-icons/react';

// Import des pages
import { LinksManagerPage } from './pages/LinksManagerClean';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { MaintenancePage } from './pages/MaintenancePage';
import { SecurityPage } from './pages/SecurityPage';
import { AdminLayout } from './components/AdminLayout';

// Composant de protection des routes
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('admin_authenticated');
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const isAuthenticated = localStorage.getItem('admin_authenticated');
  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};

// Page de connexion élégante
const LoginPage = () => {
  const { theme, toggle: toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Credentials temporaires pour le test
  const TEMP_CREDENTIALS = {
    email: 'admin@kimiya.dev',
    password: 'admin123'
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulation d'une vérification async
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (email === TEMP_CREDENTIALS.email && password === TEMP_CREDENTIALS.password) {
      // Connexion réussie
      localStorage.setItem('admin_authenticated', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('Email ou mot de passe incorrect');
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      {/* Background avec particules comme l'accueil */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-20 left-10 w-24 h-24 bg-accent/10 rounded-full animate-float-slow animate-delay-700"></div>
        <div className="absolute top-1/3 right-16 w-16 h-16 bg-primary/15 rounded-full animate-float-medium animate-delay-800"></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-accent/5 rounded-full animate-float-slow animate-delay-500"></div>
        <div className="absolute bottom-1/3 right-1/4 w-12 h-12 bg-primary/10 rounded-full animate-float-medium animate-delay-600"></div>
      </div>

      {/* Header avec boutons */}
      <div className="absolute top-0 left-0 right-0 z-20">
        <div className="flex justify-between items-center p-6">
          {/* Bouton retour */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="p-2 hover:bg-accent/10 group transition-all duration-300 hover:scale-110"
          >
            <ArrowLeft size={18} className="text-accent group-hover:-translate-x-1 transition-transform duration-300" />
          </Button>

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
        </div>
      </div>

      {/* Contenu principal centré */}
      <div className="flex items-center justify-center min-h-screen px-6 relative z-10">
        <div className="w-full max-w-md animate-fadeInUp">
          {/* Logo/Titre */}
          <div className="text-center mb-8 animate-fadeInUp animate-delay-200">
            <div className="inline-flex items-center gap-3 mb-4 group">
              <div className="p-3 bg-accent/10 rounded-xl group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300">
                <Shield size={24} className="text-accent group-hover:animate-pulse" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Panel Admin</h1>
                <p className="text-sm text-muted-foreground">Portfolio Kimiya</p>
              </div>
            </div>
          </div>

          {/* Carte de connexion */}
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl shadow-xl border border-border p-8 animate-fadeInUp animate-delay-400">
            <h2 className="text-xl font-semibold text-center mb-6 text-foreground">Connexion Sécurisée</h2>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Email</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@kimiya.dev" 
                  className="w-full px-4 py-3 bg-input rounded-lg border border-border focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-200 text-foreground placeholder:text-muted-foreground"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Mot de passe</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="w-full px-4 py-3 bg-input rounded-lg border border-border focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-200 text-foreground placeholder:text-muted-foreground"
                  required
                />
              </div>

              {error && (
                <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-2 rounded-lg text-sm">
                  {error}
                </div>
              )}
              
              <Button 
                type="submit"
                disabled={loading}
                className="w-full mt-6 bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-3 text-base font-medium group transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent/25 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Shield size={18} className="mr-2 group-hover:animate-pulse" />
                {loading ? 'Connexion...' : 'Se connecter'}
              </Button>
            </form>
            
            <div className="mt-4 p-3 bg-accent/10 rounded-lg">
              <p className="text-xs text-accent text-center font-medium">
                🔧 Mode Test - Credentials temporaires
              </p>
              <p className="text-xs text-muted-foreground text-center mt-1">
                Email: admin@kimiya.dev | Password: admin123
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Dashboard élégant
const Dashboard = () => {
  const navigate = useNavigate();

  // Vérifier l'authentification
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('admin_authenticated');
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const stats = [
    { icon: Eye, label: "Visiteurs Today", value: "127", change: "+12%", color: "text-blue-500" },
    { icon: Link, label: "Liens Actifs", value: "8", change: "+3 nouveaux", color: "text-green-500" },
    { icon: ChartBar, label: "Pages Vues", value: "1.2K", change: "+5% ce mois", color: "text-purple-500" },
  ];

  const quickActions = [
    { icon: Link, title: "Gérer les Liens", desc: "Style solo.to avec drag & drop", color: "bg-blue-500/10 text-blue-600", path: "/admin/links" },
    { icon: ChartBar, title: "Analytics", desc: "Google Analytics & Cloudflare", color: "bg-green-500/10 text-green-600", path: "/admin/analytics" },
    { icon: Gear, title: "Maintenance", desc: "Configuration page maintenance", color: "bg-orange-500/10 text-orange-600", path: "/admin/maintenance" },
    { icon: Shield, title: "Sécurité", desc: "Whitelist IP & 2FA optionnel", color: "bg-red-500/10 text-red-600", path: "/admin/security" },
  ];

  return (
    <AdminLayout 
      title="Bienvenue, Kimiya" 
      subtitle="Gérez votre portfolio et vos liens en un coup d'œil"
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div 
            key={index}
            className="bg-card/80 backdrop-blur-sm rounded-xl p-6 border border-border hover:border-accent/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent/10 animate-fadeInUp group"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-all duration-300`}>
                <stat.icon size={20} className="text-accent group-hover:animate-pulse" />
              </div>
              <span className="text-xs text-muted-foreground">{stat.change}</span>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-accent">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickActions.map((action, index) => (
          <div 
            key={index}
            onClick={() => navigate(action.path)}
            className="bg-card/80 backdrop-blur-sm rounded-xl p-6 border border-border hover:border-accent/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent/10 cursor-pointer animate-fadeInUp group"
            style={{ animationDelay: `${(index + 3) * 0.1}s` }}
          >
            <div className="mb-4">
              <div className={`inline-flex p-3 rounded-lg ${action.color} group-hover:scale-110 transition-all duration-300`}>
                <action.icon size={24} className="group-hover:animate-pulse" />
              </div>
            </div>
            <h3 className="font-semibold text-foreground mb-2 group-hover:text-accent transition-colors duration-300">
              {action.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {action.desc}
            </p>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export const AdminApp: React.FC = () => {
  return (
    <div className="theme-fade">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/links" element={
          <ProtectedRoute>
            <LinksManagerPage />
          </ProtectedRoute>
        } />
        <Route path="/analytics" element={
          <ProtectedRoute>
            <AnalyticsPage />
          </ProtectedRoute>
        } />
        <Route path="/maintenance" element={
          <ProtectedRoute>
            <MaintenancePage />
          </ProtectedRoute>
        } />
        <Route path="/security" element={
          <ProtectedRoute>
            <SecurityPage />
          </ProtectedRoute>
        } />
        <Route path="/*" element={<Navigate to="/admin/login" replace />} />
      </Routes>
    </div>
  );
};
