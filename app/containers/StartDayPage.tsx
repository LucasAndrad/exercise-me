import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { setStartDay } from 'app/modules/settings/actions';
import { routes } from 'app/constants';
import { Button } from 'app/components';
import i18n from 'app/i18n';

const StartDayButton = styled(Button)`
  padding: 15px 30px;
  font-size: 1.8rem;
  min-width: 200px;
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

type H1Props = {
  mt: string;
};

const H1 = styled.h1<H1Props>`
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
        <H1 mt="0px">{i18n.t('startDay.title')}</H1>
        <StartDayButton type="button" onClick={() => handleStartDay()}>
          {i18n.t('startDay.button')}
        </StartDayButton>
      </div>
    </Container>
  );
};
