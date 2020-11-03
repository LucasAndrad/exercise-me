import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  getSettings,
  getLastBodyExercise,
  getStartDay,
} from 'app/modules/settings/actions';
import { storageKeys } from 'app/modules/settings/constants';
import { routes } from 'app/constants/routes';
import { localDateTime } from 'app/modules/settings/utils';

const { remote } = require('electron');

export const PanelPage = () => {
  const history = useHistory();
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

  const handleLastBodyExerciseChange = (event: any) => {
    if (event.key === storageKeys.lastBodyExercise && event.oldValue !== event.newValue) {
      const settings = getSettings();
      const bodyInterval = Number(settings.bodyExerciseInterval);
      setNextBodyExercise(Number(event.newValue) + bodyInterval);
    }
  };

  useEffect(() => {
    window.addEventListener('storage', handleLastBodyExerciseChange);

    return () => {
      window.removeEventListener('storage', handleLastBodyExerciseChange);
    };
  }, []);

  useEffect(() => {
    let exerciseTimeout: NodeJS.Timeout;

    if (nextBodyExercise > 0) {
      exerciseTimeout = setTimeout(() => {
        openExerciseWindow();
        // this should be the interval
      }, 5000);
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
      <button type="button" onClick={() => history.push(routes.HOME)}>
        Home Page
      </button>
      <br />
      <button type="button" onClick={() => history.push(routes.SETTINGS)}>
        Settings
      </button>
      <br />
      <h2>
        Next exercise at
        <br />
        {nextBodyExercise > 0 ? localDateTime(nextBodyExercise) : null}
      </h2>
    </>
  );
};
