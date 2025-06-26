import { forwardRef } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface FormInputProps {
  label: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'textarea';
  placeholder?: string;
  error?: string;
  register?: UseFormRegisterReturn;
  rows?: number;
  required?: boolean;
  className?: string;
}

export const FormInput = forwardRef<HTMLInputElement | HTMLTextAreaElement, FormInputProps>(
  ({ label, type = 'text', placeholder, error, register, rows, required, className = '' }, ref) => {
    const baseInputClasses = "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";
    const errorClasses = error ? "border-red-300 focus:ring-red-500" : "";
    
    const inputClasses = `${baseInputClasses} ${errorClasses} ${className}`;

    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        
        {type === 'textarea' ? (
          <textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            {...register}
            rows={rows || 4}
            className={inputClasses}
            placeholder={placeholder}
          />
        ) : (
          <input
            ref={ref as React.Ref<HTMLInputElement>}
            type={type}
            {...register}
            className={inputClasses}
            placeholder={placeholder}
          />
        )}
        
        {error && (
          <p className="mt-1 text-sm text-red-600">
            {error}
          </p>
        )}
      </div>
    );
  }
);

FormInput.displayName = 'FormInput'; 