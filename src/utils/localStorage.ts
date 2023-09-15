// Functie om gegevens op te slaan in localStorage
export const saveDataToLocalStorage = (key: string, data: any) => {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(key, serializedData);
  } catch (error) {
    console.error(`Error saving data to localStorage: ${error}`);
  }
};

// Functie om gegevens op te halen uit localStorage
export const getDataFromLocalStorage = (key: string): any | null => {
  try {
    const serializedData = localStorage.getItem(key);
    if (serializedData === null) {
      return null;
    }
    return JSON.parse(serializedData);
  } catch (error) {
    console.error(`Error retrieving data from localStorage: ${error}`);
    return null;
  }
};

// Functie om gegevens uit localStorage te verwijderen
export const removeDataFromLocalStorage = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing data from localStorage: ${error}`);
  }
};
