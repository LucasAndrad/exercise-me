import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  getSelectedEyesExercises,
  setLastEyesExercise,
} from 'app/modules/settings/actions';
import { eyesExercises } from 'app/modules/exercises/eyesExercises';
import { EyesAnimation, Button, Divider } from 'app/components';
import i18n from 'app/i18n';

const { remote } = require('electron');

type EyeExercise = {
  name: string;
  description: string;
  duration: number;
  hasAnimation: boolean;
  animationName?: string;
};

const Container = styled.div`
  padding: 2%;
`;

const Timer = styled.h1`
  font-family: MontserratLight;
  text-align: center;
  font-size: 7rem;
  font-weight: 100;
  margin-top: 0;
  margin-bottom: 0;
`;

const SkipButton = styled(Button)`
  font-size: 0.85rem;
  padding: 10px 30px;
  text-transform: uppercase;
  font-weight: 300;
  letter-spacing: 2px;
`;

// 1 second
const TIMER_INTERVAL = 1000;

export const EyesExercisePage = () => {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState<number>(0);
  const [currentExercise, setCurrentExercise] = useState<EyeExercise | undefined>();
  const [timer, setTimer] = useState(0);

  const handleOnClose = () => {
    setLastEyesExercise();
    remote.getCurrentWindow().close();
  };

  // set the current exercise object
  useEffect(() => {
    const selectedEyesExercises = getSelectedEyesExercises();
    if (currentExerciseIndex >= selectedEyesExercises.length) {
      setLastEyesExercise();
      handleOnClose();
      return;
    }
    const exerciseIndex = selectedEyesExercises[currentExerciseIndex];
    const nextExercise = eyesExercises[exerciseIndex];
    setTimer(nextExercise.duration);
    setCurrentExercise(nextExercise);
  }, [currentExerciseIndex]);

  const clearCurrentInterval = (timerInterval: NodeJS.Timer) => {
    clearInterval(timerInterval);
    setCurrentExerciseIndex(currentExerciseIndex + 1);
  };

  useEffect(() => {
    let timerInterval: NodeJS.Timer;
    let temporaryTimer = timer;

    if (timer > 0) {
      // time interval for each round
      timerInterval = setInterval(() => {
        temporaryTimer -= 1;
        setTimer(temporaryTimer);
        if (temporaryTimer < 1) {
          clearCurrentInterval(timerInterval);
        }
      }, TIMER_INTERVAL);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentExercise]);

  return (
    <Container>
      <h2>{i18n.t('eyesExercise.title')}</h2>

      <SkipButton type="button" onClick={handleOnClose}>
        {i18n.t('eyesExercise.button')}
      </SkipButton>

      <Divider width="100%" />

      {currentExercise ? (
        <div>
          <h3>{currentExercise.name}</h3>
          <p>{currentExercise.description}</p>

          {currentExercise.hasAnimation && currentExercise.animationName ? (
            <EyesAnimation animationName={currentExercise.animationName} />
          ) : null}

          <Timer>{timer}</Timer>
        </div>
      ) : null}
    </Container>
  );
};
