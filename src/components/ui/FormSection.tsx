import { ReactNode } from 'react';

interface FormSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export const FormSection = ({ title, children, className = '' }: FormSectionProps) => {
  return (
    <div className={`space-y-4 ${className}`}>
      <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
        {title}
      </h3>
      {children}
    </div>
  );
}; 