import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';
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
import {
  clockIcon,
  settingsIcon,
  bodyIcon,
  eyeIcon,
  questionIcon,
} from 'app/assets/images';
import { Button, Divider, IconClick } from 'app/components';
import i18n from 'app/i18n';
import { notification } from 'app/utils';

// 20 seconds before the exercise
const NOTIFICATION_TIME = 20000;

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
  font-size: 2rem;
  font-family: MontserratLight;
  @media only screen and (max-width: 1024px) {
    font-size: 1.7rem;
  }
`;

type ClockIconProps = {
  ml?: string;
  mr?: string;
};
const ClockIcon = styled.img<ClockIconProps>`
  width: 35px;
  height: 35px;
  margin-left: ${(props) => props.ml || 'inherit'};
  margin-right: ${(props) => props.mr || 'inherit'};
  @media only screen and (max-width: 1024px) {
    width: 25px;
    height: 25px;
  }
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
      frame: false,
      fullscreen: true,
      webPreferences: {
        nodeIntegration: true,
      },
    });
    // File path is different from dev and production,
    // this flow below get the correct path for both cases
    const pathFirstEntry = 'app.html#';
    const pathUrl = window.location.href.split(pathFirstEntry)[0];
    const finalPath = `${pathUrl}${pathFirstEntry}${path}`;

    exerciseWindow.loadURL(finalPath);
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
    let bodyNotificationInterval: number;
    if (nextBodyExercise > 0) {
      interval = setInterval(() => {
        handleOpenWindow(routes.EXERCISE);
      }, getBodyExerciseInterval());

      bodyNotificationInterval = setTimeout(() => {
        notification({
          title: i18n.t('panel.notifications.body.title'),
          body: i18n.t('panel.notifications.body.description'),
        });
      }, nextBodyExercise - NOTIFICATION_TIME);
    }

    return () => {
      clearInterval(interval);
      clearTimeout(bodyNotificationInterval);
    };
  }, [nextBodyExercise]);

  useEffect(() => {
    let interval: number;
    let eyesNotificationInterval: number;
    if (nextEyesExercise > 0) {
      interval = setInterval(() => {
        handleOpenWindow(routes.EYES_EXERCISE);
      }, getEyesExerciseInterval());

      eyesNotificationInterval = setTimeout(() => {
        notification({
          title: i18n.t('panel.notifications.eyes.title'),
          body: i18n.t('panel.notifications.eyes.description'),
        });
      }, nextEyesExercise - NOTIFICATION_TIME);
    }

    return () => {
      clearInterval(interval);
      clearTimeout(eyesNotificationInterval);
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
      <ReactTooltip />
      <SettingsRow>
        <IconClick
          width="25"
          height="25"
          src={settingsIcon}
          alt="settings-icon"
          onClick={() => history.push(routes.SETTINGS)}
          data-tip="Configurações"
        />
        <IconClick
          style={{ marginLeft: '20px' }}
          width="25"
          height="25"
          src={questionIcon}
          alt="question-icon"
          onClick={() => history.push(routes.SETTINGS)}
          data-tip="Sobre o aplicatico"
        />
      </SettingsRow>
      <br />
      <Times>
        <div style={{ width: '100%' }}>
          <TimeContainer>
            <ClockIcon src={bodyIcon} alt="body-icon" mr="2%" />
            <H2>
              {i18n.t('panel.nextBody')}
              {nextBodyExercise > 0 ? ` ${localDateTime(nextBodyExercise)}` : null}
            </H2>
            <ClockIcon src={clockIcon} alt="clock-icon" ml="2%" />
          </TimeContainer>
          <ButtonRow>
            <ButtonNext type="button" onClick={() => handleOpenWindow(routes.EXERCISE)}>
              {i18n.t('panel.runBody')}
            </ButtonNext>
          </ButtonRow>

          <Divider />

          <TimeContainer>
            <ClockIcon src={eyeIcon} alt="eye-icon" mr="2%" />
            <H2>
              {i18n.t('panel.nextEye')}
              {nextEyesExercise > 0 ? ` ${localDateTime(nextEyesExercise)}` : null}
            </H2>
            <ClockIcon src={clockIcon} alt="clock-icon" ml="2%" />
          </TimeContainer>
          <ButtonRow>
            <ButtonNext
              type="button"
              onClick={() => handleOpenWindow(routes.EYES_EXERCISE)}
            >
              {i18n.t('panel.runEye')}
            </ButtonNext>
          </ButtonRow>
        </div>
      </Times>
    </Container>
  );
};
