import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';
import { getSelectedExercises, setLastBodyExercise } from 'app/modules/settings/actions';
import { exercises } from 'app/modules/exercises/data';
import { Button, Divider, XIcon, TitleXContainer, SlimArrow } from 'app/components';
import i18n from 'app/i18n';
import { xIcon, slimArrowRigth } from 'app/assets/images';

const { remote } = require('electron');

// 3 seconds: time between each repeat for exercises with duration === false
const EXERCISE_REPEAT_TIME = 1;

// 1 second
const TIMER_INTERVAL = 1000;

const INVALID_ROUND = 100;

type Exercise = {
  id: number;
  duration: boolean | number;
  repeat: boolean | number;
  switchSide: boolean;
  rounds: number;
  image: any;
  title: string;
  description: string;
};

const Container = styled.div`
  padding: 2%;
`;

const SkipButton = styled(Button)`
  font-size: 1rem;
  padding: 10px 30px;
`;

const ExerciseContainer = styled.div`
  display: flex;
`;

const TitleImg = styled.div``;

const Info = styled.div`
  margin-left: 2%;
`;

const Description = styled.p`
  margin-top: 0;
  line-height: 1.5;
`;

const Timer = styled.span`
  font-family: MontserratLight;
  text-align: center;
  font-size: 7rem;
  font-weight: 100;
`;

const TimerRound = styled.div`
  text-align: center;
  margin-top: 10%;
`;

export const ExercisePage = () => {
  const timerInterval = useRef(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentExercise, setCurrentExercise] = useState<Exercise | undefined>();
  // const [exercise, setExercise] = useState();
  const [timer, setTimer] = useState(0);
  const [round, setRound] = useState(0);
  const [totalRounds, setTotalRounds] = useState(2);
  const [currentBodySide, setCurrentBodySide] = useState<boolean | string>(false);

  const handleOnClose = () => {
    setLastBodyExercise();
    remote.getCurrentWindow().close();
  };

  // action I should define exercise duration and then rounds number
  const exerciseDuration = (): number => {
    if (!currentExercise) return 10;

    if (currentExercise.duration) return currentExercise.duration;
    if (!currentExercise.duration && currentExercise.repeat)
      return currentExercise.repeat * EXERCISE_REPEAT_TIME;
  };

  // set the current exercise object
  useEffect(() => {
    const selectedExercises = getSelectedExercises();
    if (currentExerciseIndex >= selectedExercises.length) {
      setLastBodyExercise();
      handleOnClose();
      return;
    }

    const exerciseIndex = selectedExercises[currentExerciseIndex];
    setCurrentExercise(exercises[exerciseIndex]);
  }, [currentExerciseIndex]);

  // set all exercise values when current exercise changes
  useEffect(() => {
    if (!currentExercise) return;

    const firstDuration = exerciseDuration();
    setTotalRounds(currentExercise.rounds);
    setTimer(firstDuration);
    setRound(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentExercise]);

  const clearCurrentRoundInterval = () => {
    clearInterval(timerInterval.current);
    // start next round
    if (round < totalRounds) {
      setTimer(exerciseDuration());
      setRound(round + 1);
    }
    // start next exercise
    if (round === totalRounds) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    }
  };

  useEffect(() => {
    if (round === INVALID_ROUND) return;

    let temporaryTimer = timer;

    if (round > 0 && timer > 0) {
      // time interval for each round
      timerInterval.current = setInterval(() => {
        temporaryTimer -= 1;
        setTimer(temporaryTimer);
        if (temporaryTimer < 1) {
          clearCurrentRoundInterval();
        }
      }, TIMER_INTERVAL);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round]);

  const nextExercise = () => {
    // set INVALID_ROUND will trigger the useEffect when the round has a valid value again
    setRound(INVALID_ROUND);
    clearInterval(timerInterval.current);
    setCurrentExerciseIndex(currentExerciseIndex + 1);
  };

  return (
    <Container>
      <ReactTooltip />
      <SlimArrow
        data-tip="Próximo exercício"
        src={slimArrowRigth}
        alt="slim-arrow-right-icon"
        onClick={() => nextExercise()}
      />

      <TitleXContainer>
        <h2>{i18n.t('bodyExercise.title')}</h2>
        <XIcon src={xIcon} alt="x-icon" onClick={() => handleOnClose()} />
      </TitleXContainer>
      <SkipButton type="button" onClick={handleOnClose}>
        {i18n.t('bodyExercise.button')}
      </SkipButton>

      <Divider width="100%" margin="2% auto" />

      {currentExercise ? (
        <>
          <h3>{currentExercise.title}</h3>
          <ExerciseContainer>
            <TitleImg>
              <img src={currentExercise.image} alt="exercise1" />
            </TitleImg>
            <Info>
              <Description>{currentExercise.description}</Description>
              <TimerRound>
                <p>{`Repetição: ${round} / ${currentExercise.rounds}`}</p>
                <Timer>{timer}</Timer>
              </TimerRound>
            </Info>
          </ExerciseContainer>
        </>
      ) : null}
    </Container>
  );
};
