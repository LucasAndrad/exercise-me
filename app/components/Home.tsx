import React from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../constants/routes';
import styles from './Home.css';

const { remote } = require('electron');

export default function Home(): JSX.Element {
  const notification = () => {
    const myNotification = new Notification('Time to exercise', {
      body: 'Click here to start the next exercise',
    });
    return myNotification;
  };

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

  return (
    <div className={styles.container} data-tid="container">
      <h2>Lucas</h2>
      <br />
      <button type="button" onClick={notification}>
        Show notification
      </button>
      <button type="button" onClick={openExerciseWindow}>
        Open Exercise Window
      </button>
    </div>
  );
}
