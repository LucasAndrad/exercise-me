import React, { useState, useEffect } from 'react';
import { getSettings } from 'app/modules/settings/actions';

const { remote } = require('electron');

export const PanelPage = () => {
  const [nextExercise, setNextExercise] = useState();
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

  setInterval(() => {
    openExerciseWindow();
  }, 10000);

  // useEffect(() => {
  //   const settings = getSettings();
  //   // add a last exercise value
  //   // check if lastExercise > startDay
  //   // if yes nextExercise = lastExercise + interval
  //   // if no nextExercise = startDay + interval
  //   setNextExercise();
  // }, []);

  return <h2>Next exercise at TIME HERE</h2>;
};
