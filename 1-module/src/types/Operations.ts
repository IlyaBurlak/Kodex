import { ToastType } from './Toast';

export interface OperationsProps {
  showToast: (message: string, type?: ToastType) => void;
}