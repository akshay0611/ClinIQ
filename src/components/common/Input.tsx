import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  leftIcon,
  rightIcon,
  fullWidth = true,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;
  
  const widthClass = fullWidth ? 'w-full' : '';
  const errorClass = error ? 'border-error focus:border-error focus:ring-error/20' : 'border-gray-300 dark:border-gray-600 focus:border-primary-500 focus:ring-primary-500/20';
  
  const baseClasses = `
    block rounded-md shadow-sm 
    ${errorClass}
    bg-white dark:bg-neutral-800 
    dark:text-white
    focus:outline-none focus:ring-4 
    transition-all
    ${leftIcon ? 'pl-10' : 'pl-4'} 
    ${rightIcon ? 'pr-10' : 'pr-4'} 
    py-2
  `;

  return (
    <div className={`${widthClass} ${className}`}>
      {label && (
        <label 
          htmlFor={inputId} 
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {label}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500 dark:text-gray-400">
            {leftIcon}
          </div>
        )}
        
        <input
          id={inputId}
          className={`${baseClasses} ${widthClass}`}
          {...props}
        />
        
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 dark:text-gray-400">
            {rightIcon}
          </div>
        )}
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-error">{error}</p>
      )}
    </div>
  );
};

export default Input;