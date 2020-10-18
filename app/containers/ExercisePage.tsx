import React from 'react';

const { remote } = require('electron');

export const ExercisePage = () => {
  return (
    <div>
      <h1>Exercise Started</h1>
      <button type="button" onClick={() => remote.getCurrentWindow().close()}>
        Close me
      </button>
    </div>
  );
};
