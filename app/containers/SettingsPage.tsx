import React from 'react';
import styled from 'styled-components';
import { exercises } from 'app/modules/exercises/data';

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

const ExerciseInput = ({ exercise }) => (
  <InputContainer>
    <label>
      {exercise.title}
      <input type="checkbox" />
    </label>
    <img src={exercise.image} alt="exercise1" width="60" height="80" />
    <br />
  </InputContainer>
);

export const SettingsPage = () => {
  return (
    <div>
      <h2>Settings</h2>

      <h5>Exercies List</h5>
      <ExercisesContainer>
        {Object.values(exercises).map((exercise) => (
          <ExerciseInput key={exercise.id} exercise={exercise} />
        ))}
      </ExercisesContainer>
    </div>
  );
};
