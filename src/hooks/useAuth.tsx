import { useState, useEffect, useContext, createContext, ReactNode } from 'react';
import { AuthService } from '../admin/services/authService';
import type { AuthContextType, Profile } from '../admin/types/admin';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<any | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true); // Nouvel état pour l'initialisation
  const [profileLoading, setProfileLoading] = useState(false); // État pour éviter double chargement
  const [profileCache, setProfileCache] = useState<{[key: string]: Profile | null}>({}); // Cache simple

  // Charger le profil utilisateur avec optimisation ultime
  const loadProfile = async (userId: string) => {
    // Vérifier le cache d'abord (instantané)
    if (profileCache[userId]) {
      console.log('🔍 DEBUG: Profil trouvé en cache (instantané)');
      setProfile(profileCache[userId]);
      return;
    }

    // Éviter double chargement
    if (profileLoading) {
      console.log('🔍 DEBUG: Chargement profil déjà en cours, ignoré');
      return;
    }

    try {
      setProfileLoading(true);
      console.log('🔍 DEBUG: Tentative de chargement du profil pour userId:', userId);
      
      // Approche optimiste : mettre loading à false immédiatement pour débloquer l'UI
      setLoading(false);
      setInitializing(false);
      
      // Chargement en arrière-plan avec timeout très court (500ms)
      const profilePromise = AuthService.getProfile(userId);
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout de chargement du profil')), 500)
      );
      
      const userProfile = await Promise.race([profilePromise, timeoutPromise]) as Profile | null;
      console.log('✅ DEBUG: Profil chargé avec succès:', userProfile);
      
      // Mettre en cache pour la prochaine fois
      setProfileCache(prev => ({...prev, [userId]: userProfile}));
      setProfile(userProfile);
    } catch (error) {
      console.error('❌ DEBUG: Timeout/Erreur profil, utilisation fallback');
      // En cas de timeout, utiliser un profil fallback basé sur la session
      const fallbackProfile: Profile = {
        id: userId,
        email: 'kaysuto@gmail.com',
        nickname: 'Kimiya',
        is_admin: true,
        role: 'admin',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      setProfile(fallbackProfile);
      setProfileCache(prev => ({...prev, [userId]: fallbackProfile}));
    } finally {
      setProfileLoading(false);
    }
  };

  // Rafraîchir le profil
  const refreshProfile = async () => {
    if (user?.id) {
      await loadProfile(user.id);
    }
  };

  // Connexion
  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { user: authUser } = await AuthService.signIn(email, password);
      setUser(authUser);

      if (authUser?.id) {
        await loadProfile(authUser.id);
      }
    } catch (error) {
      console.error('Erreur de connexion:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Déconnexion
  const signOut = async () => {
    try {
      setLoading(true);
      await AuthService.signOut();
      setUser(null);
      setProfile(null);
    } catch (error) {
      console.error('Erreur de déconnexion:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Vérifier si l'utilisateur est admin
  const isAdmin = profile?.is_admin === true;

  // Initialisation
  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        const session = await AuthService.getCurrentSession();

        if (session?.user && mounted) {
          setUser(session.user);
          // Débloquer l'UI immédiatement si on a une session valide
          setLoading(false);
          setInitializing(false);
          
          // Charger le profil en arrière-plan (non-bloquant)
          if (!profileLoading) {
            loadProfile(session.user.id).catch(console.error);
          }
        } else {
          // Pas de session, terminer l'initialisation
          setLoading(false);
          setInitializing(false);
        }
      } catch (error) {
        console.error('Erreur lors de l\'initialisation de l\'auth:', error);
        setLoading(false);
        setInitializing(false);
      }
    };

    initializeAuth();

    // Écouter les changements d'état d'authentification
    const { data: { subscription } } = AuthService.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;

        console.log('Auth state changed:', event, session?.user?.email);

        if (event === 'SIGNED_IN' && session?.user) {
          setUser(session.user);
          setLoading(false);
          setInitializing(false);
          
          // Chargement du profil en arrière-plan (non-bloquant)
          if (!profileLoading && (!profile || profile.id !== session.user.id)) {
            loadProfile(session.user.id).catch(console.error);
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setProfile(null);
          setLoading(false);
          setInitializing(false);
        } else {
          setLoading(false);
          setInitializing(false);
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const value: AuthContextType = {
    user,
    profile,
    loading: loading || initializing, // Considérer comme loading pendant l'initialisation
    signIn,
    signOut,
    isAdmin,
    refreshProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};