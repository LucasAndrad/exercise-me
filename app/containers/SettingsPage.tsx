import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { exercises } from 'app/modules/exercises/data';
import { eyesExercises } from 'app/modules/exercises/eyesExercises';
import {
  getSelectedExercises,
  setSelectedExercises,
  getBodyExerciseInterval,
  setBodyExerciseInterval,
  getSelectedEyesExercises,
  setSelectedEyesExercises,
  getEyesExerciseInterval,
  setEyesExerciseInterval,
} from 'app/modules/settings/actions';
import { routes } from 'app/constants/routes';
import { minutesToMiliseconds, milesecondsToMinutes } from 'app/modules/settings/utils';
import { Input, Checkbox } from 'app/components';

const InputContainer = styled.div`
  padding: 10px;
  width: 25%;
`;

const ExercisesContainer = styled.div`
  margin: auto;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

export const SettingsPage = () => {
  // in minutes
  const [bodyInterval, setBodyInterval] = useState(0);
  const [exercisesList, setExercisesList] = useState(getSelectedExercises());

  const [eyesInterval, setEyesInterval] = useState(0);
  const [eyesExercisesList, setEyesExercisesList] = useState(getSelectedEyesExercises());

  const history = useHistory();

  useEffect(() => {
    // Body
    const currentBodyInterval = getBodyExerciseInterval();
    const bodyIntervalInMinutes = milesecondsToMinutes(currentBodyInterval);
    setBodyInterval(bodyIntervalInMinutes);

    // Eyes
    const currentEyesInterval = getEyesExerciseInterval();
    const eyesIntervalInMinutes = milesecondsToMinutes(currentEyesInterval);
    setEyesInterval(eyesIntervalInMinutes);
  }, []);

  const updateBodyInterval = (event: any) => {
    const bodyIntervalInMinutes = minutesToMiliseconds(Number(event.target.value));
    setBodyInterval(Number(event.target.value));
    setBodyExerciseInterval(bodyIntervalInMinutes);
  };

  const updateEyesInterval = (event: any) => {
    const eyesIntervalInMinutes = minutesToMiliseconds(Number(event.target.value));
    setEyesInterval(Number(event.target.value));
    setEyesExerciseInterval(eyesIntervalInMinutes);
  };

  const updateSelectedExercise = (id: number) => {
    const selectedExercises = getSelectedExercises();
    // remove from list
    if (selectedExercises.includes(id)) {
      const newSelectedExercises = selectedExercises.filter(
        (exerciseId: number) => exerciseId !== id
      );
      setSelectedExercises(newSelectedExercises);
      setExercisesList(newSelectedExercises);
      return;
    }

    // add to the list
    const newSelectedExercises = [...selectedExercises, id];
    // sort the array
    newSelectedExercises.sort((a: number, b: number) => a - b);
    setSelectedExercises(newSelectedExercises);
    setExercisesList(newSelectedExercises);
  };

  const updateSelectedEyesExercise = (id: number) => {
    const selectedEyesExercises = getSelectedEyesExercises();
    // remove from list
    if (selectedEyesExercises.includes(id)) {
      const newSelectedEyesExercises = selectedEyesExercises.filter(
        (exerciseId: number) => exerciseId !== id
      );
      setSelectedEyesExercises(newSelectedEyesExercises);
      setEyesExercisesList(newSelectedEyesExercises);
      return;
    }

    // add to the list
    const newSelectedEyesExercises = [...selectedEyesExercises, id];
    // sort the array
    newSelectedEyesExercises.sort((a: number, b: number) => a - b);
    setSelectedEyesExercises(newSelectedEyesExercises);
    setEyesExercisesList(newSelectedEyesExercises);
  };

  return (
    <div>
      <h2>Settings</h2>
      <button type="button" onClick={() => history.push(routes.PANEL)}>
        Panel
      </button>
      <h5>Eyes Exercies Interval</h5>
      <Input
        type="text"
        value={eyesInterval}
        onChange={(event) => updateEyesInterval(event)}
      />
      <h5>Body Exercies List</h5>
      <ExercisesContainer>
        {Object.values(eyesExercises).map((eyesExercise) => (
          <InputContainer key={eyesExercise.id}>
            <Checkbox
              type="checkbox"
              checked={eyesExercisesList.includes(eyesExercise.id)}
              onChange={() => updateSelectedEyesExercise(eyesExercise.id)}
            />
            <h5>{eyesExercise.name}</h5>
          </InputContainer>
        ))}
      </ExercisesContainer>
      <h5>Body Exercies Interval</h5>
      <Input
        type="text"
        value={bodyInterval}
        onChange={(event) => updateBodyInterval(event)}
      />
      <h5>Body Exercies List</h5>
      <ExercisesContainer>
        {Object.values(exercises).map((exercise) => (
          <InputContainer key={exercise.id}>
            <label>
              {exercise.title}
              <Checkbox
                type="checkbox"
                checked={exercisesList.includes(exercise.id)}
                onChange={() => updateSelectedExercise(exercise.id)}
              />
            </label>
            <img src={exercise.image} alt="exercise1" width="85" height="110" />
            <br />
          </InputContainer>
        ))}
      </ExercisesContainer>
    </div>
  );
};
