import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.tsx';
import { useTheme } from '@/hooks/use-theme';
import { CaretLeft, Sun, Moon, Lock, User } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { supabase } from '../../lib/supabase';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

export const Login: React.FC = () => {
  // Document title with typing animation - auto-detected for admin login
  useDocumentTitle();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showResetForm, setShowResetForm] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const navigate = useNavigate();
  const { theme, toggle: toggleTheme } = useTheme();
  const { signIn, loading, user, isAdmin, profile } = useAuth();

  // Redirection automatique une fois que le profil admin est chargé
  useEffect(() => {
    if (user && profile && isLoggingIn) {
      if (isAdmin) {
        navigate('/admin/dashboard', { replace: true });
      } else {
        setError('Accès non autorisé. Vous devez être administrateur.');
        setIsLoggingIn(false);
      }
    }
  }, [user, profile, isAdmin, isLoggingIn, navigate]);

  // Fonction pour traduire les erreurs Supabase en français
  const translateAuthError = (error: any): string => {
    if (!error) return 'Erreur de connexion inconnue';

    // Erreurs courantes de Supabase Auth
    const errorMessages: { [key: string]: string } = {
      'Invalid login credentials': 'Identifiants de connexion invalides',
      'Email not confirmed': 'Email non confirmé. Vérifiez votre boîte mail.',
      'Too many requests': 'Trop de tentatives. Veuillez réessayer plus tard.',
      'User not found': 'Utilisateur non trouvé',
      'Invalid email': 'Adresse email invalide',
      'Password should be at least 6 characters': 'Le mot de passe doit contenir au moins 6 caractères',
      'Signup is disabled': 'Les inscriptions sont désactivées',
      'Email link is invalid or has expired': 'Le lien email est invalide ou a expiré',
      'Token has expired or is invalid': 'Le token a expiré ou est invalide',
      'User already registered': 'Cet utilisateur est déjà enregistré',
      'Weak password': 'Mot de passe trop faible',
      'Server error': 'Erreur du serveur. Veuillez réessayer.',
      'Network error': 'Erreur de réseau. Vérifiez votre connexion.',
    };

    // Chercher par message d'erreur
    const message = error.message || error.error_description || error.msg || error.toString();

    // Recherche exacte
    if (errorMessages[message]) {
      return errorMessages[message];
    }

    // Recherche partielle
    for (const [key, value] of Object.entries(errorMessages)) {
      if (message.includes(key)) {
        return value;
      }
    }

    // Si aucune correspondance trouvée, retourner le message original ou un message générique
    return message || 'Une erreur inattendue s\'est produite';
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      setIsLoggingIn(true);
      await signIn(email, password);
      // La redirection se fera dans useEffect une fois le profil chargé
    } catch (error: any) {
      console.error('Erreur de connexion:', error);
      setError(translateAuthError(error));
      setIsLoggingIn(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!resetEmail) {
      setError('Veuillez saisir votre adresse email.');
      return;
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
        redirectTo: `${window.location.origin}/admin/reset-password`,
      });

      if (error) throw error;

      setSuccess('Un email de réinitialisation a été envoyé à votre adresse.');
      setResetEmail('');
      setTimeout(() => setShowResetForm(false), 3000);
    } catch (error: any) {
      console.error('Erreur réinitialisation:', error);
      setError(translateAuthError(error));
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
      <div className="fixed top-6 left-20 z-50 flex gap-3 animate-slideInFromLeft">
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

      <div className="fixed top-6 right-20 z-50 animate-slideInFromRight">
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
          <div className={`backdrop-blur-md border rounded-xl p-8 hover:border-accent/30 transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl hover:shadow-accent/10 group ${
            theme === 'dark' 
              ? 'bg-[#231813]/90 border-[#231813]/50 hover:bg-[#231813]/95' 
              : 'bg-[#FFFBF4]/90 border-[#FFFBF4]/50 hover:bg-[#FFFBF4]/95'
          }`}>
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center">
                <Lock size={32} className="text-accent" />
              </div>
            </div>

            <form onSubmit={showResetForm ? handlePasswordReset : handleLogin} className="space-y-6">
              {error && (
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm animate-shake">
                  {error}
                </div>
              )}

              {success && (
                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-500 text-sm">
                  {success}
                </div>
              )}

              {showResetForm ? (
                // Formulaire de réinitialisation
                <>
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Réinitialiser le mot de passe
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Entrez votre adresse email pour recevoir un lien de réinitialisation.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <User size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                      <input
                        type="email"
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        placeholder="admin@kimiya.dev"
                        className={`w-full pl-10 pr-4 py-3 rounded-lg border border-border/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-300 ${
                          theme === 'dark' 
                            ? 'bg-[#231813]/60' 
                            : 'bg-[#FFFBF4]/60'
                        }`}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setShowResetForm(false);
                        setError('');
                        setSuccess('');
                      }}
                      className="flex-1"
                    >
                      Annuler
                    </Button>
                    <Button
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground py-3 text-lg font-medium group transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent/25"
                    >
                      {loading ? (
                        <span className="loading loading-spinner loading-sm"></span>
                      ) : (
                        'Envoyer'
                      )}
                    </Button>
                  </div>
                </>
              ) : (
                // Formulaire de connexion normal
                <>
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
                        className={`w-full pl-10 pr-4 py-3 rounded-lg border border-border/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-300 ${
                          theme === 'dark' 
                            ? 'bg-[#231813]/60' 
                            : 'bg-[#FFFBF4]/60'
                        }`}
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
                        className={`w-full pl-10 pr-4 py-3 rounded-lg border border-border/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-300 ${
                          theme === 'dark' 
                            ? 'bg-[#231813]/60' 
                            : 'bg-[#FFFBF4]/60'
                        }`}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => setShowResetForm(true)}
                      className="text-sm text-accent hover:text-accent/80 transition-colors duration-200"
                    >
                      Mot de passe oublié ?
                    </button>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-3 text-lg font-medium group transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent/25"
                  >
                    {loading ? (
                      <span className="loading loading-spinner loading-sm"></span>
                    ) : (
                      <>
                        <Lock size={20} className="mr-2 group-hover:scale-110 transition-transform duration-200" />
                        Se connecter
                      </>
                    )}
                  </Button>
                </>
              )}
            </form>

          </div>
        </div>
      </div>
    </div>
  );

};

export default Login;
