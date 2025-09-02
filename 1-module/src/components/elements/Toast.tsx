import React, { FC }  from 'react';
import { ToastProps } from '../../types/Toast';
import ToastItem from './ToastItem';
import '../../styles/components/_toast.scss';

const Toast: FC<ToastProps> = React.memo(({ toasts, removeToast }) => (
  <div className="toast-container">
    {toasts.map(toast => (
      <ToastItem
        key={toast.id}
        toast={toast}
        removeToast={removeToast}
      />
    ))}
  </div>
));

export default Toast;