import { cn } from "../../../lib/utils";

interface DashboardCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  className?: string;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  description,
  icon,
  trend,
  className
}) => {
  const getTrendColor = () => {
    switch (trend) {
      case 'up': return 'text-success';
      case 'down': return 'text-error';
      default: return 'text-base-content/70';
    }
  };

  return (
    <div className={cn(
      "card bg-base-100 border border-base-300 shadow-sm",
      "transition-all duration-300 hover:shadow-lg",
      className
    )}>
      <div className="card-body p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-base-content/70">
            {title}
          </h3>
          {icon && (
            <div className="text-primary">
              {icon}
            </div>
          )}
        </div>
        <div className="text-2xl font-bold text-base-content mb-1">
          {value}
        </div>
        {description && (
          <div className={cn("text-sm", getTrendColor())}>
            {description}
          </div>
        )}
      </div>
    </div>
  );
};
