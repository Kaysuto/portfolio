import { AdminNavbar } from './AdminNavbar';

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export const AdminLayout = ({ children, title, subtitle, actions }: AdminLayoutProps) => {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      {/* Background animé subtle */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-40 left-20 w-32 h-32 bg-accent/3 rounded-full animate-float-slow animate-delay-1000"></div>
        <div className="absolute top-1/2 right-20 w-20 h-20 bg-primary/3 rounded-full animate-float-medium animate-delay-1200"></div>
        <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-accent/2 rounded-full animate-float-slow animate-delay-800"></div>
      </div>

      {/* Navbar */}
      <AdminNavbar />

      {/* Contenu principal avec animation */}
      <main className="container mx-auto px-6 py-8 relative z-10 animate-fadeInUp">
        {/* Header de page */}
        {(title || subtitle || actions) && (
          <div className="mb-8 animate-fadeInUp" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
            <div className="flex items-center justify-between">
              <div>
                {title && (
                  <h1 className="text-3xl font-bold mb-2 text-foreground">{title}</h1>
                )}
                {subtitle && (
                  <p className="text-muted-foreground">{subtitle}</p>
                )}
              </div>
              {actions && (
                <div className="flex items-center space-x-2">
                  {actions}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Contenu avec délai */}
        <div className="animate-fadeInUp" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
          {children}
        </div>
      </main>
    </div>
  );
};
