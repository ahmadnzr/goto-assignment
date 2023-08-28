type LocalStorageKey = "FAVORITE";

export const getLocalStorage = <T>(key: LocalStorageKey): T | null => {
  try {
    // if (typeof window === "undefined") return null;
    const value = localStorage.getItem(key);

    if (value === null) {
      return null;
    }

    return JSON.parse(value) as T;
  } catch (error) {
    return null;
  }
};

export const setLocalStorage = <T>(key: LocalStorageKey, value: T) => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.log(error);
  }
};
