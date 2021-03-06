import { storageKeys } from './constants';
import { minutesToMiliseconds } from './utils';

const defaultSettings = {
  // eslint-disable-next-line prettier/prettier
  exercisesSelected: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28],
  bodyExerciseInterval: minutesToMiliseconds(240),
  eyesExercisesSelected: [1, 2, 3, 4, 5],
  eyesExerciseInterval: minutesToMiliseconds(30),
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

// Body exercises
export const getLastBodyExercise = () => {
  return Number(localStorage.getItem(storageKeys.lastBodyExercise));
};

export const setLastBodyExercise = () => {
  const timestampString = Date.now().toString();
  localStorage.setItem(storageKeys.lastBodyExercise, timestampString);
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

// Eyes exercises
export const getLastEyesExercise = () => {
  return Number(localStorage.getItem(storageKeys.lastEyesExercise));
};

export const setLastEyesExercise = () => {
  const timestampString = Date.now().toString();
  localStorage.setItem(storageKeys.lastEyesExercise, timestampString);
};

export const getSelectedEyesExercises = () => {
  const settings = getSettings();
  const selected =
    settings?.eyesExercisesSelected || defaultSettings.eyesExercisesSelected;
  return selected;
};

export const setSelectedEyesExercises = (newExercises: Array<number>) => {
  const settings = getSettings();
  settings.eyesExercisesSelected = newExercises;
  localStorage.setItem(storageKeys.settings, JSON.stringify(settings));
};

export const getEyesExerciseInterval = () => {
  const settings = getSettings();
  return settings.eyesExerciseInterval;
};

export const setEyesExerciseInterval = (newInterval: number) => {
  const settings = getSettings();
  settings.eyesExerciseInterval = newInterval;
  localStorage.setItem(storageKeys.settings, JSON.stringify(settings));
};
