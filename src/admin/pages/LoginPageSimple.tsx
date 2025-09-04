export const LoginPageSimple: React.FC = () => {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">Login Admin</h2>
          <p>Test de la page de login admin</p>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input type="email" className="input input-bordered" defaultValue="admin@kaysuto.fr" />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input type="password" className="input input-bordered" defaultValue="admin123" />
          </div>
          <div className="card-actions justify-end">
            <button 
              className="btn btn-primary"
              onClick={() => {
                localStorage.setItem('admin_session', 'test');
                window.location.href = '/admin/dashboard';
              }}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
