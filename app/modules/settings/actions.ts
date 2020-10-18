import { storageKeys } from './constants';
import { minutesToMiliseconds } from './utils';

const defaultSettings = {
  bodyStretchingInterval: minutesToMiliseconds(120),
  eyesStretchingInterval: minutesToMiliseconds(20),
};

// localStorage actions
export const getSettings = () => {
  const settings = localStorage.getItem(storageKeys.settings);
  return settings || defaultSettings;
};

export const setSettings = (params) => {};

export const shouldStartNewDay = () => {};

export const setStartDay = () => {
  const timestampString = Date.now().toString();
  localStorage.setItem(storageKeys.startDay, timestampString);
};
