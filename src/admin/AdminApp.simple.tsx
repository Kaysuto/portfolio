import { Routes, Route } from 'react-router-dom';

// Version simple pour tester le routing sans dépendances
export const AdminApp: React.FC = () => {
  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8 text-primary">
          Panel Admin - Test
        </h1>
        
        <Routes>
          <Route 
            path="/login" 
            element={
              <div className="card bg-base-200 shadow-xl max-w-md mx-auto">
                <div className="card-body">
                  <h2 className="card-title">Connexion Admin</h2>
                  <p>Page de connexion - Test</p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary">Se connecter</button>
                  </div>
                </div>
              </div>
            } 
          />
          
          <Route 
            path="/dashboard" 
            element={
              <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title">Dashboard Admin</h2>
                  <p>Dashboard fonctionnel !</p>
                </div>
              </div>
            } 
          />
          
          <Route path="*" element={<div>Admin - 404</div>} />
        </Routes>
      </div>
    </div>
  );
};
