/* eslint-disable jsx-a11y/media-has-caption */
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import {
  getSelectedEyesExercises,
  setLastEyesExercise,
} from 'app/modules/settings/actions';
import { eyesExercises } from 'app/modules/exercises/eyesExercises';
import { EyesAnimation, Button, Divider, XIcon, TitleXContainer } from 'app/components';
import i18n from 'app/i18n';
import { xIcon, slimArrowRigth } from 'app/assets/images';
import { indianBell } from 'app/assets/sounds';

const { remote } = require('electron');

const EXERCISE_DISPLAY_INTERVAL = 3500;

type EyeExercise = {
  name: string;
  description: string;
  duration: number;
  hasAnimation: boolean;
  animationName?: string;
};

const Container = styled.div`
  padding: 2%;
`;

const Timer = styled.h1`
  font-family: MontserratLight;
  text-align: center;
  font-size: 7rem;
  font-weight: 100;
  margin-top: 0;
  margin-bottom: 0;
`;

const SkipButton = styled(Button)`
  font-size: 0.85rem;
  padding: 10px 30px;
  text-transform: uppercase;
  font-weight: 300;
  letter-spacing: 2px;
`;

const SlimArrow = styled.img`
  position: absolute;
  left: calc(98% - 25px);
  top: 50%;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 50px;
  cursor: pointer;
`;

// 1 second
const TIMER_INTERVAL = 1000;

export const EyesExercisePage = () => {
  let soundInterval: NodeJS.Timer;
  const timerInterval = useRef(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState<number>(0);
  const [currentExercise, setCurrentExercise] = useState<EyeExercise | undefined>();
  const [timer, setTimer] = useState(0);
  const audioRef = useRef(null);

  const handleOnClose = () => {
    setLastEyesExercise();
    remote.getCurrentWindow().close();
  };

  // set the current exercise object
  useEffect(() => {
    const selectedEyesExercises = getSelectedEyesExercises();
    if (currentExerciseIndex >= selectedEyesExercises.length) {
      setLastEyesExercise();
      clearInterval(soundInterval);
      handleOnClose();
      return;
    }
    const exerciseIndex = selectedEyesExercises[currentExerciseIndex];
    const nextExercise = eyesExercises[exerciseIndex];
    setTimer(nextExercise.duration);
    setCurrentExercise(nextExercise);
  }, [currentExerciseIndex]);

  const clearCurrentInterval = () => {
    clearInterval(timerInterval.current);
    if (audioRef) audioRef.current.play();

    soundInterval = setTimeout(() => {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    }, EXERCISE_DISPLAY_INTERVAL);
  };

  useEffect(() => {
    // let timerInterval: NodeJS.Timer;
    let temporaryTimer = timer;

    if (timer > 0) {
      // time interval for each round
      timerInterval.current = setInterval(() => {
        temporaryTimer -= 1;
        setTimer(temporaryTimer);
        if (temporaryTimer < 1) {
          clearCurrentInterval();
        }
      }, TIMER_INTERVAL);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentExercise]);

  const nextExercise = () => {
    clearInterval(timerInterval.current);
    setCurrentExerciseIndex(currentExerciseIndex + 1);
  };

  return (
    <Container>
      <audio ref={audioRef}>
        <source src={indianBell} type="audio/mpeg" />
        <source src={indianBell} type="audio/mp3" />
      </audio>
      <SlimArrow
        data-tip="Próximo exercício"
        src={slimArrowRigth}
        alt="slim-arrow-right-icon"
        onClick={() => nextExercise()}
      />
      <TitleXContainer>
        <h2>{i18n.t('eyesExercise.title')}</h2>
        <XIcon src={xIcon} alt="x-icon" onClick={() => handleOnClose()} />
      </TitleXContainer>
      <SkipButton type="button" onClick={handleOnClose}>
        {i18n.t('eyesExercise.button')}
      </SkipButton>

      <Divider width="100%" />

      {currentExercise ? (
        <div>
          <h3>{currentExercise.name}</h3>
          <p>{currentExercise.description}</p>

          {currentExercise.hasAnimation && currentExercise.animationName ? (
            <EyesAnimation animationName={currentExercise.animationName} />
          ) : null}

          <Timer>{timer}</Timer>
        </div>
      ) : null}
    </Container>
  );
};
