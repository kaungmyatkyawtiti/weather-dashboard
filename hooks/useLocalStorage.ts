import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initValue;
    } catch (error) {
      console.log("Local storage error:", error);
      return initValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error("Local storage error:", error);
    }
  }, [storedValue]);

  return [storedValue, setStoredValue] as const;
}
