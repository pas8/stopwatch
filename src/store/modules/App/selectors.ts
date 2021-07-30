import { find } from 'lodash';
import { RootStoreType } from 'models/types';
import { createSelector } from 'reselect';

export const getThemePropertyies = createSelector(
  [(state: RootStoreType) => state.app.themePropertyies],
  themePropertyies => themePropertyies
);
export const getTimeFormat = createSelector(
  [(state: RootStoreType) => state.app.timeFormat],
  timeFormat => timeFormat
);
