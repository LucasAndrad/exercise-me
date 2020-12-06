import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { colors } from 'app/constants';
import i18n from 'app/i18n';

const Container = styled.div`
  width: 100%;
  height: 60%;
  text-align: center;
  display: flex;
  align-items: center;
`;

const PointersContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

type PointProps = {
  background: string;
  delay: string;
  ml?: string;
};
const Point = styled.div<PointProps>`
  background: ${(props) => props.background || 'transparent'};
  width: 30px;
  height: 30px;
  margin-left: ${(props) => props.ml || '20px'};
  border: 3px solid ${colors.white};
  border-radius: 50%;
  color: ${colors.prussianBlue};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  transition: all 0.5s ease-out;
  transition-delay: ${(props) => props.delay || '0.5s'};
`;

export const SwitchExercisesAnimation = () => {
  const [background, setBackground] = useState('transparent');

  useEffect(() => {
    setBackground(colors.white);

    return () => {
      setBackground('transparent');
    };
  }, []);

  return (
    <Container>
      <div style={{ width: '100%' }}>
        <h3>{i18n.t('switchExerciseAnimation.title')}</h3>
        <PointersContainer>
          <Point ml="0px" background={background} delay="0.5s">
            5
          </Point>
          <Point background={background} delay="1.5s">
            4
          </Point>
          <Point background={background} delay="2.5s">
            3
          </Point>
          <Point background={background} delay="3.5s">
            2
          </Point>
          <Point background={background} delay="4.5s">
            1
          </Point>
        </PointersContainer>
      </div>
    </Container>
  );
};
