import * as React from "react";

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
        {toasts.map(toast => (
            <div
                key={toast.id}
                className={`toast toast-${toast.type}`}
                onClick={() => removeToast(toast.id)}
            >
                <div className="toast-content">{toast.message}</div>
                <div className="toast-progress" />
            </div>
        ))}
    </div>
);

export default Toast;