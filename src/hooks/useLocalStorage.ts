import { useState, useEffect } from 'react';

function getStorage() {
  if (typeof window !== 'undefined') {
    return window.localStorage;
  }
  return null;
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  // 使用函数初始化状态，确保只在客户端执行
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    const storage = getStorage();
    if (!storage) return;

    try {
      const item = storage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
    }
  }, [key]);

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);

      const storage = getStorage();
      if (storage) {
        storage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue] as const;
} 