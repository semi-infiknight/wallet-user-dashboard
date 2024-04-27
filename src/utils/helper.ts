import { toSvg } from 'jdenticon';


export const generateAddressIcon = (address: string) => {
  const svgString = toSvg(address, 100);
  const svg = new Blob([svgString], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(svg);

  return url;
};

export const getShortDisplayString: any = (address: string) => {
  const firstFourDigit = address?.slice(0, 4);
  const lastFourDigit = address?.slice(Number(address?.length) - 4);

  return `${firstFourDigit}+...${lastFourDigit}`
  ;
};



export const getFromLocalStorage = <T>(key: string): T | null => {
    const item = localStorage.getItem(key);
    if (item) {
        try {
            return JSON.parse(item) as T;
        } catch (error) {
            console.error(`Error parsing localStorage item for key '${key}':`, error);
            return null;
        }
    } else {
        return null;
    }
}

export const setToLocalStorage = <T>(key: string, value: T): void => {
    try {
        const serializedValue = JSON.stringify(value);
        localStorage.setItem(key, serializedValue);
    } catch (error) {
        console.error(`Error storing value to localStorage for key '${key}':`, error);
    }
};

// Define the removeItem function
export const removeFromLocalStorage = (key: string): void => {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error(`Error removing value from localStorage for key '${key}':`, error);
    }
};

