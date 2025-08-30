export type ToastType = 'error' | 'success' | 'info' | 'warning';

export interface ToastItem {
  id: number;
  message: string;
  type: ToastType;
}

export interface ToastProps {
  toasts: ToastItem[];
  removeToast: (id: number) => void;
}

export interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}