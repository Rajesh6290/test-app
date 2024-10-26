export interface MENUARRPROPS {
  id: number;
  name: string;
  icon?: React.ReactNode;
  menus: boolean;
  item?: SUBMENU[];
  route?: string;
}
export interface SUBMENU {
  id: number;
  name: string;
  icon: React.ReactNode;
  route?: string;
}

export const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;

//? SET To LocalStorage
export const saveToLocalStorage = (key: string, value: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, value);
  }
};
export const setLocalStorageItem = (key: string, value: any): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};
//? GET From LocalStorage
export const getFromLocalStorage = (key: string) => {
  return typeof window !== "undefined"
    ? (localStorage.getItem(key) ?? null)
    : null;
};
export const getLocalStorageItem = (key: string): any | null => {
  if (typeof window !== "undefined") {
    const storedItem = localStorage.getItem(key);
    if (storedItem) {
      return JSON.parse(storedItem);
    }
  }
  return null;
};
//? Remove from LocalStorage
export const removeFromLocalStorage = (key: string) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};
