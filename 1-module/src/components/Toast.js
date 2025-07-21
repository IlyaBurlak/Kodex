import React from 'react';

const Toast = ({ toasts, removeToast }) => (
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