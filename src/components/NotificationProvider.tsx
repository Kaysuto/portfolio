import { Toaster, toast } from 'react-hot-toast';

export const NotificationProvider = () => {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: 'var(--popover)',
          color: 'var(--popover-foreground)',
          border: '1px solid var(--border)',
        },
        success: {
          iconTheme: {
            primary: 'hsl(var(--accent))',
            secondary: 'var(--popover)',
          },
        },
        error: {
          iconTheme: {
            primary: 'hsl(var(--destructive))',
            secondary: 'var(--popover)',
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