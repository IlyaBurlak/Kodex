import { useState, useEffect, Dispatch, SetStateAction } from "react";

export function useLocalStorage<T>(
    key: string,
    initialValue: T
): [T, Dispatch<SetStateAction<T>>] {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (e) {
            console.error('Ошибка чтения localStorage', e);
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(storedValue));
        } catch (e) {
            console.error('Ошибка сохранения в LocalStorage', e);
        }
    }, [key, storedValue]);

    return [storedValue, setStoredValue];
}