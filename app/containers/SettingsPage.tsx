import React from 'react';
import { exercises } from 'app/modules/exercises/data';

export const SettingsPage = () => {
  return (
    <div>
      <h2>Settings</h2>

      <h5>Exercies List</h5>
      <div>
        {Object.values(exercises).map((exercise) => {
          return (
            <div key={exercise.id}>
              <label>
                {exercise.title}
                <input type="checkbox" />
              </label>
              <img src={exercise.image} alt="exercise1" width="60" height="80" />
              <br />
            </div>
          );
        })}
      </div>
    </div>
  );
};
