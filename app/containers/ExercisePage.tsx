import React from 'react';
import { useSelector } from 'react-redux';
import { selectCount } from 'app/features/counter/counterSlice';
import { setLastBodyExercise } from 'app/modules/settings/actions';

const { remote } = require('electron');

export const ExercisePage = () => {
  const value = useSelector(selectCount);

  const handleOnClose = () => {
    setLastBodyExercise();
    remote.getCurrentWindow().close();
  };

  return (
    <div>
      <h1>Exercise Started</h1>
      <h5>{value}</h5>
      <button type="button" onClick={handleOnClose}>
        Close me
      </button>
    </div>
  );
};
