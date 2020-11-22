/* eslint react/jsx-props-no-spreading: off */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { routes } from './constants/routes';
import App from './containers/App';
import {
  StartDayPage,
  PanelPage,
  ExercisePage,
  SettingsPage,
  EyesExercisePage,
} from './containers';

// Lazily load routes and code split with webpack
const LazyCounterPage = React.lazy(() =>
  import(/* webpackChunkName: "CounterPage" */ './containers/CounterPage')
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CounterPage = (props: Record<string, any>) => (
  <React.Suspense fallback={<h1>Loading...</h1>}>
    <LazyCounterPage {...props} />
  </React.Suspense>
);

export default function Routes() {
  return (
    <App>
      <Switch>
        <Route path={routes.COUNTER} component={CounterPage} />
        <Route path={routes.EXERCISE} component={ExercisePage} />
        <Route path={routes.EYES_EXERCISE} component={EyesExercisePage} />
        <Route path={routes.PANEL} component={PanelPage} />
        <Route path={routes.SETTINGS} component={SettingsPage} />
        <Route path={routes.START_DAY} component={StartDayPage} />
      </Switch>
    </App>
  );
}
