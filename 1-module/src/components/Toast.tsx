import * as React from 'react';

interface ToastProps {
    toasts: Array<{
        id: number;
        message: string;
        type: 'error' | 'success' | 'info' | 'warning';
    }>;
    removeToast: (id: number) => void;
}

const Toast: React.FC<ToastProps> = ({ toasts, removeToast }) => (
    <div className="toast-container">
        {toasts.map(toast => {
            let icon = '';
            switch (toast.type) {
                case 'success':
                    icon = '✓';
                    break;
                case 'error':
                    icon = '✕';
                    break;
                case 'warning':
                    icon = '⚠';
                    break;
                case 'info':
                    icon = 'ⓘ';
                    break;
                default:
                    icon = 'ⓘ';
            }

            return (
                <div
                    key={toast.id}
                    className={`toast toast-${toast.type}`}
                    onClick={() => removeToast(toast.id)}
                >
                    <div className="toast-icon">{icon}</div>
                    <div className="toast-content">{toast.message}</div>
                    <div className="toast-progress" />
                </div>
            );
        })}
    </div>
);

export default Toast;