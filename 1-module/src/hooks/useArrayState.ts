import { useState, useCallback } from 'react';

export const useArrayState = (initialLength: number) => {
  const [array, setArray] = useState<string[]>(Array(initialLength).fill(''));

  const updateArray = useCallback((index: number, value: string) => {
    setArray(prev => {
      const newArray = [...prev];
      newArray[index] = value;
      return newArray;
    });
  }, []);

  const resizeArray = useCallback((newLength: number) => {
    setArray(Array(newLength).fill(''));
  }, []);

  return { array, updateArray, resizeArray };
};