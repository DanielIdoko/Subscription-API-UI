import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className = '', type, ...props }, ref) => {
    const isPassword = type === 'password';
    const [showPassword, setShowPassword] = useState(false);

    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-sans px-1 text-gray-900 dark:text-gray-100 mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            type={inputType}
            className={`w-full px-4 py-2.5 rounded-full border transition-colors bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100 ${
              error
                ? 'border-red-300 focus:ring-red-500 dark:border-red-400 dark:focus:ring-red-400'
                : 'border-gray-300 focus:ring-blue-500 dark:border-slate-700 dark:focus:ring-blue-500'
            } focus:outline-none focus:ring-2 focus:border-transparent ${className}`}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <FiEyeOff className="w-4 h-4 cursor-pointer" /> : <FiEye className="cursor-pointer w-4 h-4" />}
            </button>
          )}
        </div>
        {error && <p className="mt-2 text-sm text-red-500 px-2">{error}</p>}
        {hint && !error && <p className="mt-2 text-sm text-gray-500">{hint}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
