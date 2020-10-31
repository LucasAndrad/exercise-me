import React, { useState, useEffect } from 'react';
import { getSelectedExercises } from 'app/modules/settings/actions';
import { exercises } from 'app/modules/exercises/data';
import { secondsToMiliseconds } from 'app/modules/exercises/utils';

const { remote } = require('electron');

// 3 seconds: time between each repeat for exercises with duration === false
const EXERCISE_REPEAT_TIME = 1;

// 1 second
const TIMER_INTERVAL = 1000;

type Exercise = {
  id: number;
  duration: boolean | number;
  repeat: boolean | number;
  switchSide: boolean;
  rounds: number;
  image: any;
  title: string;
  description: string;
};

export const ExercisePage = () => {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentExercise, setCurrentExercise] = useState<Exercise | undefined>();
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
  const exerciseDuration = (): number => {
    if (!currentExercise) return 10;

    if (currentExercise.duration) return currentExercise.duration;
    if (!currentExercise.duration && currentExercise.repeat)
      return currentExercise.repeat * EXERCISE_REPEAT_TIME;
  };

  // set the current exercise object
  useEffect(() => {
    const selectedExercises = getSelectedExercises();
    if (currentExerciseIndex >= selectedExercises.length) {
      handleOnClose();
      return;
    }

    const exerciseIndex = selectedExercises[currentExerciseIndex];
    setCurrentExercise(exercises[exerciseIndex]);
  }, [currentExerciseIndex]);

  // set all exercise values when current exercise changes
  useEffect(() => {
    if (!currentExercise) return;

    const firstDuration = exerciseDuration();
    setTotalRounds(currentExercise.rounds);
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
      setCurrentExerciseIndex(currentExerciseIndex + 1);
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

      {currentExercise ? (
        <div>
          <h5>{currentExercise.title}</h5>
          <img src={currentExercise.image} alt="exercise1" />
          <p>{timer}</p>
          <p>{round}</p>
          <p>{currentExercise.description}</p>
          <span>{currentExercise.duration}</span>
        </div>
      ) : null}
    </div>
  );
};
