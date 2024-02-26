export function getDataFromLocalStorage(storedName: string, defaultReturn: string) {
  const selectedData = localStorage.getItem(storedName);
  return selectedData ? JSON.parse(selectedData) : defaultReturn;
}

export function saveDataToLocalStorage(storedName: string, data: string) {
  localStorage.setItem(storedName, JSON.stringify(data));
}
