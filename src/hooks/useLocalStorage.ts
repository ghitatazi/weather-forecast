import { useEffect, useState } from "react";

const getSavedValue = (
  key: string,
  initialValue: Function | string
): string => {
  if (!!localStorage.getItem(key)) {
    const savedValue = localStorage.getItem(key);
    if (savedValue) return savedValue;
  }

  if (initialValue instanceof Function) return initialValue();
  return initialValue;
};

export const useLocalStorage = (
  key: string,
  initialValue: string
): [string, (value: string) => void] => {
  const [value, setValue] = useState<string>(() =>
    getSavedValue(key, initialValue)
  );

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value]);

  return [value, setValue];
};
