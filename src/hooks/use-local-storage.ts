'use client';

import { useState, useCallback, useSyncExternalStore } from 'react';

function useLocalStoragePrimitive<T>(key: string, initialValue: T) {
  // Use useSyncExternalStore for reading localStorage (React 18+)
  const getSnapshot = () => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  };

  const subscribe = (callback: () => void) => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === key) callback();
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  };

  const storedValue = useSyncExternalStore(subscribe, getSnapshot, () => initialValue);

  const [isLoaded, setIsLoaded] = useState(false);

  // Mark as loaded after initial render
  useSyncExternalStore(
    () => () => {},
    () => {
      if (!isLoaded) setIsLoaded(true);
      return true;
    },
    () => false
  );

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        window.dispatchEvent(new StorageEvent('storage', { key }));
      } catch (error) {
        console.error(`Error saving localStorage key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      window.dispatchEvent(new StorageEvent('storage', { key }));
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key]);

  return { value: storedValue, setValue, removeValue, isLoaded };
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  return useLocalStoragePrimitive(key, initialValue);
}
