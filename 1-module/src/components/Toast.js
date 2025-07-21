import React, { Component } from 'react';

class Toast extends Component {
    render() {
        const { toasts, removeToast } = this.props;

        return (
            <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 1000 }}>
                {toasts.map(toast => (
                    <div
                        key={toast.id}
                        className={`toast toast-${toast.type}`}
                        onClick={() => removeToast(toast.id)}
                    >
                        <div className="toast-content">{toast.message}</div>
                        <div className="toast-progress"></div>
                    </div>
                ))}
            </div>
        );
    }
}

export default Toast;