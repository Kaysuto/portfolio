import { Toaster, toast } from 'react-hot-toast';

export const NotificationProvider = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: 'hsl(var(--background))',
          color: 'hsl(var(--foreground))',
          border: '1px solid hsl(var(--border))',
        },
        success: {
          iconTheme: {
            primary: 'hsl(var(--accent))',
            secondary: 'hsl(var(--background))',
          },
        },
        error: {
          iconTheme: {
            primary: 'hsl(var(--destructive))',
            secondary: 'hsl(var(--background))',
          },
        },
      }}
    />
  );
};

// Fonctions utilitaires pour les notifications
export const notifications = {
  success: (message: string) => toast.success(message),
  error: (message: string) => toast.error(message),
  info: (message: string) => toast(message, {
    icon: 'ℹ️',
  }),
  warning: (message: string) => toast(message, {
    icon: '⚠️',
  }),
  loading: (message: string) => toast.loading(message),
  dismiss: (toastId?: string) => toast.dismiss(toastId),
};