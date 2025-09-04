import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';

// Pages Admin simples pour commencer
const LoginPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-base-200">
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-primary">Connexion Admin</h2>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input 
            type="email" 
            placeholder="admin@kimiya.dev" 
            className="input input-bordered" 
          />
        </div>
        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text">Mot de passe</span>
          </label>
          <input 
            type="password" 
            placeholder="••••••••" 
            className="input input-bordered" 
          />
        </div>
        <div className="card-actions justify-end mt-6">
          <button className="btn btn-primary">Se connecter</button>
        </div>
      </div>
    </div>
  </div>
);

const Dashboard = () => (
  <div className="min-h-screen bg-base-200">
    <div className="navbar bg-base-100 shadow-lg">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl text-primary">Panel Admin</a>
      </div>
      <div className="flex-none">
        <button className="btn btn-ghost">Déconnexion</button>
      </div>
    </div>
    
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="stat bg-base-100 shadow-lg rounded-lg">
          <div className="stat-figure text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div className="stat-title">Visiteurs Today</div>
          <div className="stat-value text-primary">127</div>
          <div className="stat-desc">+12% depuis hier</div>
        </div>
        
        <div className="stat bg-base-100 shadow-lg rounded-lg">
          <div className="stat-figure text-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"></path>
            </svg>
          </div>
          <div className="stat-title">Liens Actifs</div>
          <div className="stat-value text-secondary">8</div>
          <div className="stat-desc">3 nouvelles cette semaine</div>
        </div>
        
        <div className="stat bg-base-100 shadow-lg rounded-lg">
          <div className="stat-figure text-accent">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
            </svg>
          </div>
          <div className="stat-title">Pages Vues</div>
          <div className="stat-value text-accent">1.2K</div>
          <div className="stat-desc">+5% ce mois</div>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
          <div className="card-body">
            <h2 className="card-title text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              Gérer les Liens
            </h2>
            <p>Ajouter, modifier ou supprimer des liens</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary btn-sm">Ouvrir</button>
            </div>
          </div>
        </div>
        
        <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
          <div className="card-body">
            <h2 className="card-title text-secondary">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Analytics
            </h2>
            <p>Voir les statistiques détaillées</p>
            <div className="card-actions justify-end">
              <button className="btn btn-secondary btn-sm">Voir</button>
            </div>
          </div>
        </div>
        
        <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
          <div className="card-body">
            <h2 className="card-title text-accent">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Maintenance
            </h2>
            <p>Configuration du mode maintenance</p>
            <div className="card-actions justify-end">
              <button className="btn btn-accent btn-sm">Config</button>
            </div>
          </div>
        </div>
        
        <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
          <div className="card-body">
            <h2 className="card-title text-warning">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Sécurité
            </h2>
            <p>Gestion whitelist & accès</p>
            <div className="card-actions justify-end">
              <button className="btn btn-warning btn-sm">Gérer</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const AdminApp: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Pour le test, on simule l'authentification
  // En production, on vérifierait avec Supabase
  
  return (
    <div data-theme="light">
      <Routes>
        <Route 
          path="/login" 
          element={<LoginPage />} 
        />
        <Route 
          path="/dashboard" 
          element={<Dashboard />} 
        />
        <Route 
          path="/*" 
          element={<Navigate to="/admin/login" replace />} 
        />
      </Routes>
    </div>
  );
};
