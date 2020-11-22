import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  getSettings,
  getLastBodyExercise,
  getStartDay,
  getLastEyesExercise,
  getEyesExerciseInterval,
  getBodyExerciseInterval,
} from 'app/modules/settings/actions';
import { storageKeys } from 'app/modules/settings/constants';
import { routes } from 'app/constants/routes';
import { localDateTime } from 'app/modules/settings/utils';
import { eyesExercises } from 'app/modules/exercises/eyesExercises';

const { remote } = require('electron');

export const PanelPage = () => {
  const history = useHistory();
  const [nextBodyExercise, setNextBodyExercise] = useState(0);
  const [nextEyesExercise, setNextEyesExercise] = useState(0);

  const openExerciseWindow = (path: string) => {
    const { BrowserWindow } = remote;
    const exerciseWindow = new BrowserWindow({
      // frame: false,
      fullscreen: true,
      webPreferences: {
        nodeIntegration: true,
      },
    });
    exerciseWindow.loadURL(`file://${__dirname}/app.html#${path}`);
  };

  const handleLastBodyExerciseChange = (event: any) => {
    if (event.key === storageKeys.lastBodyExercise && event.oldValue !== event.newValue) {
      const settings = getSettings();
      const bodyInterval = Number(settings.bodyExerciseInterval);
      setNextBodyExercise(Number(event.newValue) + bodyInterval);
    }
  };

  const handleLastEyesExerciseChange = (event: any) => {
    if (event.key === storageKeys.lastEyesExercise && event.oldValue !== event.newValue) {
      const settings = getSettings();
      const eyesExerciseInterval = Number(settings.eyesExerciseInterval);
      const newNextEyesExercise = Number(event.newValue) + eyesExerciseInterval;
      setNextEyesExercise(newNextEyesExercise);
    }
  };

  useEffect(() => {
    window.addEventListener('storage', handleLastBodyExerciseChange);
    window.addEventListener('storage', handleLastEyesExerciseChange);

    return () => {
      window.removeEventListener('storage', handleLastBodyExerciseChange);
      window.removeEventListener('storage', handleLastEyesExerciseChange);
    };
  }, []);

  useEffect(() => {
    let interval: number;
    if (nextBodyExercise > 0) {
      interval = setInterval(() => {
        openExerciseWindow(routes.EXERCISE);
      }, getBodyExerciseInterval());
    }

    return () => {
      clearTimeout(interval);
    };
  }, [nextBodyExercise]);

  useEffect(() => {
    let interval: number;
    if (nextEyesExercise > 0) {
      interval = setInterval(() => {
        openExerciseWindow(routes.EYES_EXERCISE);
      }, getEyesExerciseInterval());
    }

    return () => {
      clearTimeout(interval);
    };
  }, [nextEyesExercise]);

  useEffect(() => {
    const settings = getSettings();
    const startDay = getStartDay();
    // set next body exercise when the page loads
    const bodyInterval = Number(settings.bodyExerciseInterval);
    const lastBodyExercise = getLastBodyExercise();
    const nextBodyExerciseTime =
      lastBodyExercise > startDay
        ? lastBodyExercise + bodyInterval
        : startDay + bodyInterval;

    setNextBodyExercise(nextBodyExerciseTime);

    // set next eyes exercise when the page loads
    const eyesExerciseInterval = Number(settings.eyesExerciseInterval);
    const lastEyesExercise = getLastEyesExercise();
    const nextEyesExerciseTime =
      lastEyesExercise > startDay
        ? lastEyesExercise + eyesExerciseInterval
        : startDay + eyesExerciseInterval;

    setNextEyesExercise(nextEyesExerciseTime);
  }, []);

  return (
    <>
      <button type="button" onClick={() => history.push(routes.HOME)}>
        Home Page
      </button>
      <br />
      <button type="button" onClick={() => history.push(routes.SETTINGS)}>
        Settings
      </button>
      <br />
      <h2>
        Next body exercise at
        <br />
        {nextBodyExercise > 0 ? localDateTime(nextBodyExercise) : null}
      </h2>
      <button type="button" onClick={() => openExerciseWindow(routes.EXERCISE)}>
        Run Body Exercises Now
      </button>
      <br />
      <h2>
        Next eyes exercise at
        <br />
        {nextEyesExercise > 0 ? localDateTime(nextEyesExercise) : null}
      </h2>
      <button type="button" onClick={() => openExerciseWindow(routes.EYES_EXERCISE)}>
        Run Eyes Exercises Now
      </button>
    </>
  );
};
