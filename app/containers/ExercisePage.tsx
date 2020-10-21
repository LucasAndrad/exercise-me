import React, { useState, useEffect } from 'react';
import { setLastBodyExercise } from 'app/modules/settings/actions';
import { exercises } from 'app/modules/exercises/data';
import { secondsToMiliseconds } from 'app/modules/exercises/utils';

const { remote } = require('electron');

// 3 seconds: time between each repeat for exercises with duration === false
const EXERCISE_REPEAT_TIME = 1;

// 1 second
const TIMER_INTERVAL = 1000;

export const ExercisePage = () => {
  const [currentExercise, setCurrentExercise] = useState(1);
  // const [exercise, setExercise] = useState();
  const [timer, setTimer] = useState(0);
  const [round, setRound] = useState(0);
  const [totalRounds, setTotalRounds] = useState(2);
  const [currentBodySide, setCurrentBodySide] = useState<boolean | string>(false);

  const handleOnClose = () => {
    // setLastBodyExercise();
    remote.getCurrentWindow().close();
  };

  // action I should define exercise duration and then rounds number
  const exerciseDuration = () => {
    const exercise = exercises[currentExercise];
    if (exercise.duration) return exercise.duration;
    if (!exercise.duration && exercise.repeat)
      return exercise.repeat * EXERCISE_REPEAT_TIME;
  };

  // set all exercise values when currentExercise change
  useEffect(() => {
    const firstDuration = exerciseDuration();
    setTotalRounds(exercises[currentExercise].rounds);
    setTimer(firstDuration);
    setRound(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentExercise]);

  const clearCurrentRoundInterval = (timerInterval: NodeJS.Timer) => {
    clearInterval(timerInterval);
    // start next round
    if (round < totalRounds) {
      setTimer(exerciseDuration());
      setRound(round + 1);
    }
    // start next exercise
    if (round === totalRounds) {
      setCurrentExercise(currentExercise + 1);
    }
  };

  useEffect(() => {
    let timerInterval: NodeJS.Timer;
    let temporaryTimer = timer;

    if (round > 0 && timer > 0) {
      // time interval for each round
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
