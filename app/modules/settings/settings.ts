import { storageKeys } from './constants';

const defaultSettings = {
  startDay: '',
  bodyStretchingInterval: '',
  eyesStretchingInterval: '',
};

// localStorage actions
export const getSettings = () => {};

export const setSettings = (params) => {};

export const shouldStartNewDay = () => {};

export const setStartDay = () => {
  const timestampString = Date.now().toString();
  console.log(`start day === ${timestampString}`);
  localStorage.setItem(storageKeys.startDay, timestampString);
};
