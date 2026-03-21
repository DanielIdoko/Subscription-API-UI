import { useCallback } from 'react';
import { toastStore, type ToastType } from '../store/toastStore';

export type { ToastType };

export const useToast = () => {
  const toasts = toastStore((state) => state.toasts);
  const showToast = toastStore((state) => state.showToast);
  const removeToast = toastStore((state) => state.removeToast);

  return {
    toasts,
    showToast: useCallback(showToast, [showToast]),
    removeToast: useCallback(removeToast, [removeToast]),
  };
};
