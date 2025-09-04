import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
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
    <Card className={cn(
      "transition-all duration-300 hover:shadow-lg",
      "bg-base-100 border border-base-300",
      className
    )}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between text-sm font-medium text-base-content">
          {title}
          {icon && <div className="text-primary text-xl">{icon}</div>}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-primary mb-1">
          {value}
        </div>
        {description && (
          <div className={cn("text-sm", getTrendColor())}>
            {description}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
