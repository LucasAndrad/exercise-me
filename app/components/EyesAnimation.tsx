import React from 'react';
import styled, { keyframes } from 'styled-components';
import { EyesAnimationsNames } from 'app/modules/exercises/constants';
import { colors } from 'app/constants';

const UpDown = keyframes`
  0%, 100% {
    margin-top: -50%;
  }
  50% {
    margin-top: 50%;
  }
`;

const LeftRight = keyframes`
  0%, 100% {
    margin-right: -50%;
  }
  50% {
    margin-right: 50%;
  }
`;

const ClockWise = keyframes`
  from{
    -webkit-transform: rotate(0deg);
  }
  to{
    -webkit-transform: rotate(360deg);
  }
`;

const Container = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  justify-content: center;
  margin: 5% 0;
`;
type EyeBorderProps = {
  mr?: string;
};

const EyeBorder = styled.div<EyeBorderProps>`
  height: 60px;
  border: 2px solid ${colors.white};
  width: 60px;
  border-radius: 50%;
  justify-content: center;
  padding: 5px;
  margin-right: ${(props) => props.mr || '0px'};
  display: flex;
  align-items: center;
`;

type EyeProps = {
  animationName: any;
  animationTime: string;
};

const Eye = styled.div<EyeProps>`
  height: 10px;
  width: 10px;
  background: ${colors.white};
  border-radius: 50%;
  border: 1px solid ${colors.white};
  animation: ${(props) => props.animationName || UpDown}
    ${(props) => props.animationTime || '2s'} linear infinite;
`;

const Square = styled.div`
  width: 90%;
  height: 60%;
  animation: ${ClockWise} 5s linear infinite;
`;
type Props = {
  animationName: string;
};

const AnimationKeyframe = {
  [EyesAnimationsNames.UpDown]: UpDown,
  [EyesAnimationsNames.LeftRight]: LeftRight,
};

export const EyesAnimation = ({ animationName }: Props) => {
  if (animationName === EyesAnimationsNames.ClockWise) {
    return (
      <Container>
        <EyeBorder mr="20px">
          <Square>
            <Eye animationName="none" animationTime="0s" />
          </Square>
        </EyeBorder>

        <EyeBorder>
          <Square>
            <Eye animationName="none" animationTime="0s" />
          </Square>
        </EyeBorder>
      </Container>
    );
  }

  const animationTime = '2s';
  return (
    <Container>
      <EyeBorder mr="20px">
        <Eye
          animationName={AnimationKeyframe[animationName]}
          animationTime={animationTime}
        />
      </EyeBorder>

      <EyeBorder>
        <Eye
          animationName={AnimationKeyframe[animationName]}
          animationTime={animationTime}
        />
      </EyeBorder>
    </Container>
  );
};
