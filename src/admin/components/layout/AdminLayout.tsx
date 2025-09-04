import { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ChartBarIcon, 
  LinkIcon, 
  WrenchScrewdriverIcon,
  Cog6ToothIcon,
  ShieldCheckIcon,
  Bars3Icon,
  XMarkIcon,
  ChartPieIcon
} from '@heroicons/react/24/outline';
import { AdminButton } from '../ui/AdminButton';
import '../../styles/admin.css';

interface AdminLayoutProps {
  children: ReactNode;
}

const menuItems = [
  {
    path: '/admin/dashboard',
    label: 'Tableau de bord',
    icon: ChartBarIcon
  },
  {
    path: '/admin/analytics',
    label: 'Analytics',
    icon: ChartPieIcon
  },
  {
    path: '/admin/links',
    label: 'Gestion des liens',
    icon: LinkIcon
  },
  {
    path: '/admin/maintenance',
    label: 'Maintenance',
    icon: WrenchScrewdriverIcon
  },
  {
    path: '/admin/security',
    label: 'Sécurité',
    icon: ShieldCheckIcon
  },
  {
    path: '/admin/settings',
    label: 'Paramètres',
    icon: Cog6ToothIcon
  }
];

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('admin_session');
    window.location.href = '/';
  };

  return (
    <div className="drawer lg:drawer-open admin-container" data-theme="light">
      <input 
        id="admin-drawer" 
        type="checkbox" 
        className="drawer-toggle" 
        checked={sidebarOpen}
        onChange={(e) => setSidebarOpen(e.target.checked)}
      />
      
      {/* Main content */}
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar bg-base-100 border-b border-base-300">
          <div className="flex-none lg:hidden">
            <label 
              htmlFor="admin-drawer" 
              className="btn btn-square btn-ghost"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </label>
          </div>
          
          <div className="flex-1">
            <h1 className="text-xl font-bold text-primary">Admin Panel</h1>
          </div>
          
          <div className="flex-none">
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full bg-primary text-primary-content flex items-center justify-center">
                  <span className="text-sm font-medium">A</span>
                </div>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 border border-base-300">
                <li>
                  <a className="justify-between">
                    Profil
                  </a>
                </li>
                <li>
                  <Link to="/admin/settings">Paramètres</Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="text-error">
                    Déconnexion
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 p-6 bg-base-200">
          {children}
        </main>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label 
          htmlFor="admin-drawer" 
          aria-label="close sidebar" 
          className="drawer-overlay"
          onClick={() => setSidebarOpen(false)}
        ></label>
        
        <aside className="min-h-full w-64 bg-base-100 border-r border-base-300">
          {/* Logo */}
          <div className="p-4 border-b border-base-300">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-content font-bold text-sm">K</span>
              </div>
              <span className="font-bold text-lg">Kimiya Admin</span>
            </Link>
          </div>

          {/* Navigation menu */}
          <nav className="p-4">
            <ul className="menu menu-vertical space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                        isActive 
                          ? 'bg-primary text-primary-content' 
                          : 'hover:bg-base-200 text-base-content'
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-base-200 rounded-lg p-3">
              <p className="text-xs text-base-content/70 text-center">
                Admin Panel v1.0
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
