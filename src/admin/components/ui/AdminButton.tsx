import { Button } from "../../../components/ui/button";
import { cn } from "../../../lib/utils";

interface AdminButtonProps extends Omit<React.ComponentProps<typeof Button>, 'variant'> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'admin';
  daisyVariant?: 'btn-primary' | 'btn-secondary' | 'btn-accent' | 'btn-neutral' | 'btn-success' | 'btn-warning' | 'btn-error';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export const AdminButton: React.FC<AdminButtonProps> = ({ 
  className, 
  variant = 'default',
  daisyVariant,
  size = 'default',
  children,
  ...props 
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'btn-sm';
      case 'lg': return 'btn-lg';
      default: return '';
    }
  };

  return (
    <Button
      className={cn(
        // Classes de base avec transition
        "transition-all duration-300",
        // Classes DaisyUI si spécifiées
        daisyVariant,
        getSizeClasses(),
        // Variant admin spécifique
        variant === 'admin' && "bg-primary hover:bg-primary/90 text-primary-content",
        className
      )}
      variant={variant === 'admin' ? 'default' : variant}
      {...props}
    >
      {children}
    </Button>
  );
};
