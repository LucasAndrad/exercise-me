import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { setStartDay } from 'app/modules/settings/actions';
import { routes, colors } from 'app/constants';
import { Button } from 'app/components';

const StartDayButton = styled(Button)`
  padding: 15px 30px;
  font-size: 1.8rem;
  width: 200px;
  text-transform: uppercase;
  font-family: MontserratLight;
  letter-spacing: 2px;
`;

const Container = styled.div`
  text-align: center;
  width: 100%;
  height: 100vh;
  overflow-y: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FullRow = styled.div`
  width: 100%;
`;

const H1 = styled.h1`
  font-size: 3rem;
  text-transform: uppercase;
  font-family: MontserratLight;
  margin-top: ${(props) => props.mt || 'auto'};
`;

export const StartDayPage = () => {
  const history = useHistory();

  const handleStartDay = () => {
    setStartDay();
    history.push(routes.PANEL);
  };

  return (
    <Container>
      <div>
        <H1 mt="0px">Start your day!</H1>
        <StartDayButton type="button" onClick={() => handleStartDay()}>
          Start
        </StartDayButton>
      </div>
    </Container>
  );
};
