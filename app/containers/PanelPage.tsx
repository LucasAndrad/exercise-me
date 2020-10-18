import React, { useState, useEffect } from 'react';
import {
  getSettings,
  getLastBodyExercise,
  getStartDay,
} from 'app/modules/settings/actions';
import { storageKeys } from 'app/modules/settings/constants';
import Counter from 'app/features/counter/Counter';

const { remote } = require('electron');

export const PanelPage = () => {
  const [nextBodyExercise, setNextBodyExercise] = useState(0);

  const openExerciseWindow = () => {
    const { BrowserWindow } = remote;
    const exerciseWindow = new BrowserWindow({
      // frame: false,
      fullscreen: true,
      webPreferences: {
        nodeIntegration: true,
      },
    });
    exerciseWindow.loadURL(`file://${__dirname}/app.html#/exercise`);
  };

  const handleLastBodyExerciseChange = (event) => {
    console.log('event inside of addEventListener');
    console.log(event);
    if (
      event.key === storageKeys.lastBodyExercise &&
      event.oldValue !== event.newValue
    ) {
      const settings = getSettings();
      const bodyInterval = Number(settings.bodyExerciseInterval);
      setNextBodyExercise(Number(event.newValue) + bodyInterval);
    }
  };

  useEffect(() => {
    window.addEventListener('storage', handleLastBodyExerciseChange);

    return () => {
      window.removeEventListener('scroll', handleLastBodyExerciseChange);
    };
  }, []);

  useEffect(() => {
    let exerciseTimeout: any = null;

    if (nextBodyExercise > 0) {
      exerciseTimeout = setTimeout(() => {
        openExerciseWindow();
      }, 10000);
    }

    return () => {
      clearTimeout(exerciseTimeout);
    };
  }, [nextBodyExercise]);

  useEffect(() => {
    const settings = getSettings();
    const bodyInterval = Number(settings.bodyExerciseInterval);
    const lastBodyExercise = getLastBodyExercise();
    const startDay = getStartDay();
    const nextBodyExerciseTime =
      lastBodyExercise > startDay
        ? lastBodyExercise + bodyInterval
        : startDay + bodyInterval;

    setNextBodyExercise(nextBodyExerciseTime);
  }, []);

  return (
    <>
      <h2>Next exercise at TIME HERE</h2>
      <Counter />
    </>
  );
};
