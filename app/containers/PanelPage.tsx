import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
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
import { localDateTime, minutesToMiliseconds } from 'app/modules/settings/utils';
import { clockIcon, settingsIcon } from 'app/assets/images';
import { Button, Divider, IconClick } from 'app/components';

const { remote } = require('electron');

const Container = styled.div`
  max-width: 100%;
  padding: 2%;
`;

const SettingsRow = styled.div`
  text-align: right;
`;

const Times = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 85vh;
`;

const TimeContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const H2 = styled.h2`
  font-size: 2.5rem;
  font-family: MontserratLight;
`;

type ClockIconProps = {
  ml?: string;
  mr?: string;
};
const ClockIcon = styled.img<ClockIconProps>`
  width: 50px;
  height: 50px;
  margin-left: ${(props) => props.ml || 'inherit'};
  margin-right: ${(props) => props.mr || 'inherit'};
`;

const ButtonNext = styled(Button)`
  font-size: 0.8rem;
  padding: 10px 20px;
  text-transform: uppercase;
  font-weight: 300;
  letter-spacing: 2px;
`;

const ButtonRow = styled.div`
  width: 100%;
  text-align: center;
`;

export const PanelPage = () => {
  const history = useHistory();
  const [nextBodyExercise, setNextBodyExercise] = useState(0);
  const [nextEyesExercise, setNextEyesExercise] = useState(0);
  const [bodyExercisesRunning, setBodyExercisesRunning] = useState(false);
  const [eyesExercisesRunning, setEyesExercisesRunning] = useState(false);

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

  /**
   * Check if any of the exercises is already running,
   * if yes it'll push the next exercise in 30 minutes from now
   */
  const handleOpenWindow = (path: string) => {
    if (eyesExercisesRunning || bodyExercisesRunning) {
      const next = Date.now() + minutesToMiliseconds(30);
      if (path === routes.EXERCISE) setNextBodyExercise(next);
      if (path === routes.EYES_EXERCISE) setNextEyesExercise(next);

      return;
    }
    if (!eyesExercisesRunning && !bodyExercisesRunning) {
      if (path === routes.EXERCISE) setBodyExercisesRunning(true);
      if (path === routes.EYES_EXERCISE) setEyesExercisesRunning(true);
      openExerciseWindow(path);
    }
  };

  const handleLastBodyExerciseChange = (event: any) => {
    if (event.key === storageKeys.lastBodyExercise && event.oldValue !== event.newValue) {
      const settings = getSettings();
      const bodyInterval = Number(settings.bodyExerciseInterval);
      setNextBodyExercise(Number(event.newValue) + bodyInterval);
      setBodyExercisesRunning(false);
    }
  };

  const handleLastEyesExerciseChange = (event: any) => {
    if (event.key === storageKeys.lastEyesExercise && event.oldValue !== event.newValue) {
      const settings = getSettings();
      const eyesExerciseInterval = Number(settings.eyesExerciseInterval);
      const newNextEyesExercise = Number(event.newValue) + eyesExerciseInterval;
      setNextEyesExercise(newNextEyesExercise);
      setEyesExercisesRunning(false);
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
        handleOpenWindow(routes.EXERCISE);
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
        handleOpenWindow(routes.EYES_EXERCISE);
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
    <Container>
      <SettingsRow>
        <IconClick
          width="25"
          height="25"
          src={settingsIcon}
          alt="settings-icon"
          onClick={() => history.push(routes.SETTINGS)}
        />
      </SettingsRow>
      <br />
      <Times>
        <div style={{ width: '100%' }}>
          <TimeContainer>
            <H2>
              Next body exercise at
              {nextBodyExercise > 0 ? ` ${localDateTime(nextBodyExercise)}` : null}
            </H2>
            <ClockIcon src={clockIcon} alt="clock-icon" ml="2%" />
          </TimeContainer>
          <ButtonRow>
            <ButtonNext type="button" onClick={() => handleOpenWindow(routes.EXERCISE)}>
              Run Body Exercises Now
            </ButtonNext>
          </ButtonRow>

          <Divider />

          <TimeContainer>
            <ClockIcon src={clockIcon} alt="clock-icon" mr="2%" />
            <H2>
              Next eyes exercise at
              {nextEyesExercise > 0 ? ` ${localDateTime(nextEyesExercise)}` : null}
            </H2>
          </TimeContainer>
          <ButtonRow>
            <ButtonNext
              type="button"
              onClick={() => handleOpenWindow(routes.EYES_EXERCISE)}
            >
              Run Eyes Exercises Now
            </ButtonNext>
          </ButtonRow>
        </div>
      </Times>
      {/* <button type="button" onClick={() => history.push(routes.HOME)}>
        Home Page
      </button> */}
    </Container>
  );
};
