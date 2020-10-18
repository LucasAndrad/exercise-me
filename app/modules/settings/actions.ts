import { storageKeys } from './constants';
import { minutesToMiliseconds } from './utils';

const defaultSettings = {
  bodyExerciseInterval: minutesToMiliseconds(120),
  eyesExerciseInterval: minutesToMiliseconds(20),
};

// localStorage actions
export const getSettings = () => {
  const settingsString = localStorage.getItem(storageKeys.settings);
  const settings = settingsString ? JSON.parse(settingsString) : null;
  return settings || defaultSettings;
};

export const setSettings = (params) => {};

export const shouldStartNewDay = () => {};

export const getStartDay = () => {
  return Number(localStorage.getItem(storageKeys.startDay));
};

export const setStartDay = () => {
  const timestampString = Date.now().toString();
  localStorage.setItem(storageKeys.startDay, timestampString);
};

export const getLastBodyExercise = () => {
  return Number(localStorage.getItem(storageKeys.lastBodyExercise));
};
