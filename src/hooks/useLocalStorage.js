import { useEffect, useState } from "react";

function getSavedValue(key, value) {
  const savedData = JSON.parse(localStorage.getItem(key, value));
  if (savedData) return savedData;
  return value;
}

function useLocalStorage(key, initValue) {
    const [storeValue, setStoreValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initValue
        } catch (error) {
            return initValue;
        }
    });

    const setValue = (value) => {
        try {
            setStoreValue(value)
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(error);
        }
    }

    const removeItem = (key) => {
        try {
            window.localStorage.removeItem(key)
        } catch (error) {
            console.error(error);
        }
    }

    return [storeValue, setValue, removeItem];
}

export default useLocalStorage;
