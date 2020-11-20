import { storageKeys } from './constants';
import { minutesToMiliseconds } from './utils';

const defaultSettings = {
  exercisesSelected: [1, 5],
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

export const setLastBodyExercise = () => {
  const timestampString = Date.now().toString();
  localStorage.setItem(storageKeys.lastBodyExercise, timestampString);
};

export const getLastEyesExercise = () => {
  return Number(localStorage.getItem(storageKeys.lastEyesExercise));
};

export const setLastEyesExercise = () => {
  const timestampString = Date.now().toString();
  localStorage.setItem(storageKeys.lastEyesExercise, timestampString);
};

export const getSelectedExercises = () => {
  const settings = getSettings();
  return settings.exercisesSelected;
};

export const setSelectedExercises = (newExercises: Array<number>) => {
  const settings = getSettings();
  settings.exercisesSelected = newExercises;
  localStorage.setItem(storageKeys.settings, JSON.stringify(settings));
};

export const getBodyExerciseInterval = () => {
  const settings = getSettings();
  return settings.bodyExerciseInterval;
};

export const setBodyExerciseInterval = (newInterval: number) => {
  const settings = getSettings();
  settings.bodyExerciseInterval = newInterval;
  localStorage.setItem(storageKeys.settings, JSON.stringify(settings));
};
