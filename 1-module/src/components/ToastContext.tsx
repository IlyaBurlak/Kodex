import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import Toast from './Toast';
import { ToastContextType, ToastItem, ToastType } from "../types/Toast";

const ToastContext = createContext<ToastContextType | undefined>(undefined);

interface ToastProviderProps {
    children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
    const [toasts, setToasts] = useState<ToastItem[]>([]);

    const removeToast = useCallback((id: number) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    }, []);

    const showToast = useCallback((message: string, type: ToastType = 'error') => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);

        setTimeout(() => {
            removeToast(id);
        }, 3000);
    }, [removeToast]);

    return (
      <ToastContext.Provider value={{ showToast }}>
          {children}
          <Toast toasts={toasts} removeToast={removeToast} />
      </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast должен использоваться внутри ToastProvider');
    }
    return context.showToast;
};

export const withToast = <P extends { showToast?: ToastContextType['showToast'] }>(
  Component: React.ComponentType<P>
) => {
    const WithToast: React.FC<Omit<P, 'showToast'>> = React.memo((props) => {
        const showToast = useToast();
        return <Component {...(props as P)} showToast={showToast} />;
    });

    WithToast.displayName = `WithToast(${Component.displayName || Component.name || 'Component'})`;

    return WithToast;
};