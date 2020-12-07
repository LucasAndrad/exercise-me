/* eslint react/jsx-props-no-spreading: off */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { routes } from './constants/routes';
import App from './containers/App';
import {
  AboutPage,
  BurnoutPage,
  StartDayPage,
  PanelPage,
  ExercisePage,
  SettingsPage,
  EyesExercisePage,
} from './containers';

export default function Routes() {
  return (
    <App>
      <Switch>
        <Route path={routes.EXERCISE} component={ExercisePage} />
        <Route path={routes.BURNOUT} component={BurnoutPage} />
        <Route path={routes.EYES_EXERCISE} component={EyesExercisePage} />
        <Route path={routes.PANEL} component={PanelPage} />
        <Route path={routes.SETTINGS} component={SettingsPage} />
        <Route path={routes.ABOUT} component={AboutPage} />
        <Route path={routes.START_DAY} component={StartDayPage} />
      </Switch>
    </App>
  );
}
