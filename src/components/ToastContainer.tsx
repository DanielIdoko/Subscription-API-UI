import React from 'react';
import { Toast } from './ui/ToastComponent';
import { toastStore } from '../store/toastStore';

export const ToastContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const toasts = toastStore((state) => state.toasts);
  const removeToast = toastStore((state) => state.removeToast);

  return (
    <>
      {children}
      <div className="fixed bottom-4 right-4 space-y-2 z-50 max-w-md">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </>
  );
};
