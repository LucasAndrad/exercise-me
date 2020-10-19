import React, { useState, useEffect } from 'react';
import { setLastBodyExercise } from 'app/modules/settings/actions';
import { exercises } from 'app/modules/exercises/data';
import { secondsToMiliseconds } from 'app/modules/exercises/utils';

const { remote } = require('electron');

// 3 seconds: time between each repeat for exercises with duration === false
const EXERCISE_REPEAT_TIME = 3;

// 1 second
const TIMER_INTERVAL = 1000;

export const ExercisePage = () => {
  const [currentExercise, setCurrentExercise] = useState(1);
  const [timer, setTimer] = useState(0);
  const [round, setRound] = useState(0);
  const [currentBodySide, setCurrentBodySide] = useState<boolean | string>(false);

  const handleOnClose = () => {
    // setLastBodyExercise();
    remote.getCurrentWindow().close();
  };

  // action I should define exercise duration and then rounds number
  const firstExerciseDuration = () => {
    const exercise = exercises[currentExercise];
    if (exercise.duration) return exercise.duration;
    if (!exercise.duration && exercise.repeat)
      return secondsToMiliseconds(exercise.repeat * EXERCISE_REPEAT_TIME);
  };

  useEffect(() => {
    const firstDuration = firstExerciseDuration();
    setTimer(firstDuration);
    setRound(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clearCurrentRoundInterval = (timerInterval: NodeJS.Timer) => {
    clearInterval(timerInterval);
    const totalRounds = 2;
    if (round < totalRounds) {
      setTimer(firstExerciseDuration());
      setRound(round + 1);
    }
  };

  useEffect(() => {
    let timerInterval: NodeJS.Timer;
    let temporaryTimer = timer;
    if (round > 0 && timer > 0) {
      timerInterval = setInterval(() => {
        temporaryTimer -= 1;
        setTimer(temporaryTimer);
        if (temporaryTimer < 1) {
          clearCurrentRoundInterval(timerInterval);
        }
      }, TIMER_INTERVAL);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round]);

  return (
    <div>
      <h1>Exercise Started</h1>
      <button type="button" onClick={handleOnClose}>
        Skip all exercises
      </button>

      <div>
        <h5>{exercises[currentExercise].title}</h5>
        <img src={exercises[currentExercise].image} alt="exercise1" />
        <p>{timer}</p>
        <p>{round}</p>
        <p>{exercises[currentExercise].description}</p>
        <span>{exercises[currentExercise].duration}</span>
      </div>
    </div>
  );
};
