/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { exercises } from 'app/modules/exercises/data';
import { eyesExercises } from 'app/modules/exercises/eyesExercises';
import {
  getSelectedExercises,
  setSelectedExercises,
  getBodyExerciseInterval,
  setBodyExerciseInterval,
  getSelectedEyesExercises,
  setSelectedEyesExercises,
  getEyesExerciseInterval,
  setEyesExerciseInterval,
} from 'app/modules/settings/actions';
import { routes } from 'app/constants/routes';
import { minutesToMiliseconds, milesecondsToMinutes } from 'app/modules/settings/utils';
import { Input, Checkbox, Divider, IconClick } from 'app/components';
import { arrowLeftIcon } from 'app/assets/images';
import i18n from 'app/i18n';

const Container = styled.div`
  padding: 2%;
`;

const EyesInputContainer = styled.div`
  width: calc(25% - 40px);
  display: flex;
  align-items: center;
  background-color: #18436b;
  border-radius: 3px;
  height: fit-content;
  padding: 15px 10px;
  margin: 10px;
  @media only screen and (max-width: 1024px) {
    width: calc(30% - 30px);
  }
`;

const BodyInputContainer = styled.div`
  width: calc(25% - 40px);
  display: flex;
  justify-content: space-between;
  background-color: #18436b;
  border-radius: 3px;
  height: fit-content;
  padding: 15px 10px;
  margin: 10px;

  @media only screen and (max-width: 1024px) {
    width: calc(30% - 30px);
  }
`;

const ExercisesContainer = styled.div`
  margin: auto;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const CheckboxBody = styled(Checkbox)`
  margin: 0;
  margin-right: 5px;
`;

const CheckboxEyes = styled(Checkbox)`
  margin: 0;
  margin-right: 10px;
  margin-top: -5px;
`;

const H5 = styled.h5`
  margin: 0%;
`;

const BodyInputLabel = styled.span`
  font-size: 0.85rem;
  line-height: 1.5;
`;

const BodyImg = styled.img`
  margin-left: 5px;
`;

export const SettingsPage = () => {
  // in minutes
  const [bodyInterval, setBodyInterval] = useState(0);
  const [exercisesList, setExercisesList] = useState(getSelectedExercises());

  const [eyesInterval, setEyesInterval] = useState(0);
  const [eyesExercisesList, setEyesExercisesList] = useState(getSelectedEyesExercises());

  const history = useHistory();

  useEffect(() => {
    // Body
    const currentBodyInterval = getBodyExerciseInterval();
    const bodyIntervalInMinutes = milesecondsToMinutes(currentBodyInterval);
    setBodyInterval(bodyIntervalInMinutes);

    // Eyes
    const currentEyesInterval = getEyesExerciseInterval();
    const eyesIntervalInMinutes = milesecondsToMinutes(currentEyesInterval);
    setEyesInterval(eyesIntervalInMinutes);
  }, []);

  const updateBodyInterval = (event: any) => {
    const bodyIntervalInMinutes = minutesToMiliseconds(Number(event.target.value));
    setBodyInterval(Number(event.target.value));
    setBodyExerciseInterval(bodyIntervalInMinutes);
  };

  const updateEyesInterval = (event: any) => {
    const eyesIntervalInMinutes = minutesToMiliseconds(Number(event.target.value));
    setEyesInterval(Number(event.target.value));
    setEyesExerciseInterval(eyesIntervalInMinutes);
  };

  const updateSelectedExercise = (id: number) => {
    const selectedExercises = getSelectedExercises();
    // remove from list
    if (selectedExercises.includes(id)) {
      const newSelectedExercises = selectedExercises.filter(
        (exerciseId: number) => exerciseId !== id
      );
      setSelectedExercises(newSelectedExercises);
      setExercisesList(newSelectedExercises);
      return;
    }

    // add to the list
    const newSelectedExercises = [...selectedExercises, id];
    // sort the array
    newSelectedExercises.sort((a: number, b: number) => a - b);
    setSelectedExercises(newSelectedExercises);
    setExercisesList(newSelectedExercises);
  };

  const updateSelectedEyesExercise = (id: number) => {
    const selectedEyesExercises = getSelectedEyesExercises();
    // remove from list
    if (selectedEyesExercises.includes(id)) {
      const newSelectedEyesExercises = selectedEyesExercises.filter(
        (exerciseId: number) => exerciseId !== id
      );
      setSelectedEyesExercises(newSelectedEyesExercises);
      setEyesExercisesList(newSelectedEyesExercises);
      return;
    }

    // add to the list
    const newSelectedEyesExercises = [...selectedEyesExercises, id];
    // sort the array
    newSelectedEyesExercises.sort((a: number, b: number) => a - b);
    setSelectedEyesExercises(newSelectedEyesExercises);
    setEyesExercisesList(newSelectedEyesExercises);
  };

  return (
    <Container>
      <IconClick
        width="25"
        height="25"
        src={arrowLeftIcon}
        alt="arrow-left-icon"
        onClick={() => history.push(routes.PANEL)}
      />
      <h2>{i18n.t('settings.title')}</h2>
      <h4>
        {`${i18n.t('settings.eyesInterval')} ${i18n.t('settings.eyesIntervalUnit')}`}
      </h4>
      <Input
        type="text"
        value={eyesInterval}
        onChange={(event) => updateEyesInterval(event)}
      />
      <h4>{i18n.t('settings.eyesExercisesList')}</h4>
      <ExercisesContainer>
        {Object.values(eyesExercises).map((eyesExercise) => (
          <EyesInputContainer key={eyesExercise.id}>
            <CheckboxEyes
              type="checkbox"
              checked={eyesExercisesList.includes(eyesExercise.id)}
              onChange={() => updateSelectedEyesExercise(eyesExercise.id)}
            />
            <H5>{eyesExercise.name}</H5>
          </EyesInputContainer>
        ))}
      </ExercisesContainer>

      <Divider width="100%" />

      <h4>
        {`${i18n.t('settings.bodyInterval')} ${i18n.t('settings.bodyIntervalUnit')}`}
      </h4>
      <Input
        type="text"
        value={bodyInterval}
        onChange={(event) => updateBodyInterval(event)}
      />
      <h4>{i18n.t('settings.bodyExercisesList')}</h4>
      <ExercisesContainer>
        {Object.values(exercises).map((exercise) => (
          <BodyInputContainer key={exercise.id}>
            <div>
              <CheckboxBody
                type="checkbox"
                checked={exercisesList.includes(exercise.id)}
                onChange={() => updateSelectedExercise(exercise.id)}
              />
              <BodyInputLabel>{exercise.title}</BodyInputLabel>
            </div>
            <BodyImg src={exercise.image} alt="exercise1" width="85" height="110" />
          </BodyInputContainer>
        ))}
      </ExercisesContainer>
    </Container>
  );
};
