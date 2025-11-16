import { FC, memo } from "react";
import { ToastItem as ToastItemType, ToastType } from '../../types/Toast';

export interface ToastItemProps {
  toast: ToastItemType;
  removeToast: (id: number) => void;
}

const ToastItem: FC<ToastItemProps> = memo(({ toast, removeToast }) => {
  const getIcon = (type: ToastType) => {
    const icons: Record<ToastType, string> = {
      success: '✓',
      error: '✕',
      warning: '⚠',
      info: 'ⓘ',
    };
    return icons[type];
  };

  return (
    <div
      className={`toast toast-${toast.type}`}
      onClick={() => removeToast(toast.id)}
    >
      <div className="toast-icon">{getIcon(toast.type)}</div>
      <div className="toast-content">{toast.message}</div>
      <div className="toast-progress" />
    </div>
  );
});

export default ToastItem;