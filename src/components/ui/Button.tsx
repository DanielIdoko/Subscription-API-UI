import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

const variantClasses = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-400 dark:bg-blue-700 dark:hover:bg-blue-600 dark:disabled:bg-blue-500',
  secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 disabled:bg-gray-50 dark:bg-slate-700 dark:text-gray-100 dark:hover:bg-slate-600 dark:disabled:bg-slate-800',
  danger: 'bg-red-600 text-white hover:bg-red-700 disabled:bg-red-400 dark:bg-red-700 dark:hover:bg-red-600 dark:disabled:bg-red-500',
  outline: 'border border-gray-300 text-gray-900 hover:bg-gray-50 disabled:opacity-50 dark:border-slate-600 dark:text-gray-100 dark:hover:bg-slate-800 dark:disabled:opacity-50',
};

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2.5 text-base',
  lg: 'px-6 py-3 text-base',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled = false,
      children,
      className = '',
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`inline-flex items-center justify-center gap-2 rounded-full font-sans transition-colors focus:outline-none focus:ring-2 cursor-pointer focus:ring-offset-2 ${variantClasses[variant]} ${sizeClasses[size]} disabled:cursor-not-allowed ${className}`}
        {...props}
      >
        {isLoading && (
          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
            <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-75" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
