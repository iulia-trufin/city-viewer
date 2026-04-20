import { useEffect, useState } from "react";

export const useSessionStorageState = <T>(key: string, initialValue: T) => {
  const [value, setValue] = useState<T>(() => {
    const stored = sessionStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
};
