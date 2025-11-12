import { createContext, useContext, useState, useCallback, ReactNode, FC, ComponentType, memo } from 'react';

import Toast from './elements/Toast';
import { ToastContextType, ToastItem, ToastType } from "../types/Toast";
import '../styles/components/_toast.scss'

const ToastContext = createContext<ToastContextType | undefined>(undefined);

interface ToastProviderProps {
    children: ReactNode;
}

export const ToastProvider: FC<ToastProviderProps> = ({ children }) => {
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
  Component: ComponentType<P>
) => {
    const WithToast: FC<Omit<P, 'showToast'>> = memo((props) => {
        const showToast = useToast();
        return <Component {...(props as P)} showToast={showToast} />;
    });

    WithToast.displayName = `WithToast(${Component.displayName || Component.name || 'Component'})`;

    return WithToast;
};