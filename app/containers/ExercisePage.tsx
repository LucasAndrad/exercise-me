import React, { useState, useEffect } from 'react';
import { setLastBodyExercise } from 'app/modules/settings/actions';
import { exercises } from 'app/modules/exercises/data';
import { secondsToMiliseconds } from 'app/modules/exercises/utils';

const { remote } = require('electron');

// 3 seconds: time between each repeat for exercises with duration === false
const EXERCISE_REPEAT_TIME = 3;

export const ExercisePage = () => {
  const [currentExercise, setCurrentExercise] = useState(1);
  const [exerciseRunning, setExerciseRunning] = useState(true);
  const [currentBodySide, setCurrentBodySide] = useState<boolean | string>(false);

  const handleOnClose = () => {
    // setLastBodyExercise();
    remote.getCurrentWindow().close();
  };

  const firstExerciseDuration = () => {
    const exercise = exercises[currentExercise];
    if (exercise.duration) return exercise.duration;
    if (!exercise.duration && exercise.repeat)
      return secondsToMiliseconds(exercise.repeat * EXERCISE_REPEAT_TIME);
  };

  // useEffect(() => {
  //   const firstDuration = firstExerciseDuration();

  //   setTimeout(() => {});
  // }, []);

  return (
    <div>
      <h1>Exercise Started</h1>
      <button type="button" onClick={handleOnClose}>
        Skip all exercises
      </button>

      <div>
        <h5>{exercises[currentExercise].title}</h5>
        <img src={exercises[currentExercise].image} alt="exercise1" />
        <p>{exercises[currentExercise].description}</p>
        <span>{exercises[currentExercise].duration}</span>
      </div>
    </div>
  );
};
