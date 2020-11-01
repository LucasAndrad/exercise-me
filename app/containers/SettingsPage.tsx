import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { exercises } from 'app/modules/exercises/data';
import { getSelectedExercises, setSelectedExercises } from 'app/modules/settings/actions';
import { routes } from 'app/constants/routes';

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
  const [exercisesList, setExercisesList] = useState(getSelectedExercises());
  const history = useHistory();

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

  return (
    <div>
      <h2>Settings</h2>
      <button type="button" onClick={() => history.push(routes.PANEL)}>
        Panel
      </button>
      <h5>Exercies List</h5>
      <ExercisesContainer>
        {Object.values(exercises).map((exercise) => (
          <InputContainer key={exercise.id}>
            <label>
              {exercise.title}
              <input
                type="checkbox"
                checked={exercisesList.includes(exercise.id)}
                onChange={() => updateSelectedExercise(exercise.id)}
              />
            </label>
            <img src={exercise.image} alt="exercise1" width="60" height="80" />
            <br />
          </InputContainer>
        ))}
      </ExercisesContainer>
    </div>
  );
};
