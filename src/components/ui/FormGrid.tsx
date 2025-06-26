import { ReactNode } from 'react';

interface FormGridProps {
  children: ReactNode;
  cols?: 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const FormGrid = ({ children, cols = 2, gap = 'md', className = '' }: FormGridProps) => {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  };

  const gridGap = {
    sm: 'gap-3',
    md: 'gap-4',
    lg: 'gap-6'
  };

  const gridClasses = `grid ${gridCols[cols]} ${gridGap[gap]} ${className}`;

  return (
    <div className={gridClasses}>
      {children}
    </div>
  );
}; 