import * as React from 'react';

type ToastType = 'error' | 'success' | 'info' | 'warning';

interface ToastItem {
    id: number;
    message: string;
    type: ToastType;
}

interface ToastProps {
    toasts: ToastItem[];
    removeToast: (id: number) => void;
}

const ToastItem = React.memo(({ toast, removeToast }: { toast: ToastItem; removeToast: (id: number) => void }) => {
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

const Toast: React.FC<ToastProps> = React.memo(({ toasts, removeToast }) => (
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