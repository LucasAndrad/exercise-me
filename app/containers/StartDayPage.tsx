import React from 'react';
import { useHistory } from 'react-router-dom';
import { setStartDay } from 'app/modules/settings/settings';
import { routes } from 'app/constants/routes';

export const StartDayPage = () => {
  const history = useHistory();

  const handleStartDay = () => {
    setStartDay();
    history.push(routes.COUNTER);
  };

  return (
    <div>
      <h2>Start your day now!</h2>
      <button type="button" onClick={() => handleStartDay()}>
        Start
      </button>
    </div>
  );
};
