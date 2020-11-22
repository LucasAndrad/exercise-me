import React, { useState, useEffect } from 'react';
import {
  getSelectedEyesExercises,
  setLastEyesExercise,
} from 'app/modules/settings/actions';
import { eyesExercises } from 'app/modules/exercises/eyesExercises';
import { EyesAnimation } from 'app/components/EyesAnimation';

const { remote } = require('electron');

type EyeExercise = {
  name: string;
  description: string;
  duration: number;
  hasAnimation: boolean;
  animationName?: string;
};

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
    <div>
      <h2>Eyes Exercise!</h2>

      {currentExercise ? (
        <div>
          <h4>{currentExercise.name}</h4>
          <p>{currentExercise.description}</p>
          {timer}

          {currentExercise.hasAnimation && currentExercise.animationName ? (
            <EyesAnimation animationName={currentExercise.animationName} />
          ) : null}
        </div>
      ) : null}
    </div>
  );
};
