import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminAuthService } from '../services/adminServices';
import { AdminButton } from '../components/ui/AdminButton';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

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
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary-content">K</span>
            </div>
            <h1 className="text-2xl font-bold text-base-content">Admin Panel</h1>
            <p className="text-base-content/70">Connexion sécurisée</p>
          </div>

          {/* Error message */}
          {error && (
            <div className="alert alert-error mb-4">
              <span>{error}</span>
            </div>
          )}

          {/* Login form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="admin@example.com"
                className="input input-bordered w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Mot de passe</span>
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="input input-bordered w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="form-control mt-6">
              <AdminButton
                type="submit"
                daisyVariant="btn-primary"
                className="w-full"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-sm mr-2"></span>
                    Connexion...
                  </>
                ) : (
                  'Se connecter'
                )}
              </AdminButton>
            </div>
          </form>

          {/* Development note */}
          <div className="mt-6 p-4 bg-base-200 rounded-lg">
            <p className="text-xs text-base-content/70 text-center">
              <strong>Mode développement</strong><br />
              Email: admin@kaysuto.fr<br />
              Mot de passe: admin123
            </p>
          </div>

          {/* Back to portfolio */}
          <div className="text-center mt-4">
            <button
              onClick={() => window.location.href = '/'}
              className="link link-primary text-sm"
            >
              Retour au portfolio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
