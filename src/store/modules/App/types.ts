import { ThemeOptions } from '@material-ui/core';
import { $Values } from 'utility-types';
import { TypeNames } from './enums';

export type PayloadTypes = {
  [TypeNames.HANDLE_CHANGE_THEME_PROPERTYIES]: {
    themePropertyies: ThemeOptions;
  };
  [TypeNames.HANDLE_CHANGE_TIME_FORMAT]: {
    timeFormat: TimeFormatType;
  };
};

export type ActionsValueTypes = {
  toChangeThemePropertyies: {
    type: typeof TypeNames.HANDLE_CHANGE_THEME_PROPERTYIES;
    payload: PayloadTypes[TypeNames.HANDLE_CHANGE_THEME_PROPERTYIES];
  };


  toChangeTimeFormat: {
    type: typeof TypeNames.HANDLE_CHANGE_TIME_FORMAT;
    payload: PayloadTypes[TypeNames.HANDLE_CHANGE_TIME_FORMAT];
  };
};
export type AppActionTypes = $Values<ActionsValueTypes>;

export type TimeFormatType = string

export type AppInitialStateType = {
  themePropertyies: ThemeOptions;

  timeFormat:TimeFormatType
  
};
