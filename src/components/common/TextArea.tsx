import React from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  error,
  fullWidth = true,
  className = '',
  id,
  ...props
}) => {
  const textareaId = id || `textarea-${Math.random().toString(36).substring(2, 9)}`;
  
  const widthClass = fullWidth ? 'w-full' : '';
  const errorClass = error ? 'border-error focus:border-error focus:ring-error/20' : 'border-gray-300 dark:border-gray-600 focus:border-primary-500 focus:ring-primary-500/20';
  
  const baseClasses = `
    block rounded-md shadow-sm 
    ${errorClass}
    bg-white dark:bg-neutral-800 
    dark:text-white
    focus:outline-none focus:ring-4 
    transition-all
    px-4 py-2 min-h-[120px] resize-y
  `;

  return (
    <div className={`${widthClass} ${className}`}>
      {label && (
        <label 
          htmlFor={textareaId} 
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {label}
        </label>
      )}
      
      <textarea
        id={textareaId}
        className={`${baseClasses} ${widthClass}`}
        {...props}
      />
      
      {error && (
        <p className="mt-1 text-sm text-error">{error}</p>
      )}
    </div>
  );
};

export default TextArea;