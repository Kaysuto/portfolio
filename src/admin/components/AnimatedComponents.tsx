import { ReactNode } from 'react';

interface AnimatedContainerProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export const AnimatedContainer = ({ children, delay = 0, className = '' }: AnimatedContainerProps) => {
  return (
    <div 
      className={`animate-fadeInUp ${className}`}
      style={{ 
        animationDelay: `${delay * 0.1}s`,
        animationFillMode: 'both'
      }}
    >
      {children}
    </div>
  );
};

interface StaggeredGridProps {
  children: ReactNode[];
  className?: string;
  itemClassName?: string;
  startDelay?: number;
}

export const StaggeredGrid = ({ children, className = '', itemClassName = '', startDelay = 0 }: StaggeredGridProps) => {
  return (
    <div className={className}>
      {children.map((child, index) => (
        <AnimatedContainer 
          key={index}
          delay={startDelay + index}
          className={itemClassName}
        >
          {child}
        </AnimatedContainer>
      ))}
    </div>
  );
};

interface PageAnimationWrapperProps {
  children: ReactNode;
  className?: string;
}

export const PageAnimationWrapper = ({ children, className = '' }: PageAnimationWrapperProps) => {
  return (
    <div className={`animate-fadeInUp ${className}`}>
      {children}
    </div>
  );
};
