import { TypeNames } from './enums';
import { AppActionTypes, AppInitialStateType } from './types';

export const initialState: AppInitialStateType = {
  themePropertyies: {
    shape: { borderRadius: 8 },
    palette: {
      success: { main: '#4caf50' },
      type: 'dark',

      primary: {
        main: '#9e80fc'
      },
      secondary: {
        main: '#a34442'
      },
      background: {
        paper: '#282828',
        default: '#202020'
      }
    }
  },
  timeFormat: 'HH: MM: SS'
};

export const AppReducer = (state = initialState, action: AppActionTypes): AppInitialStateType => {
  switch (action.type) {
    case TypeNames.HANDLE_CHANGE_THEME_PROPERTYIES: {
      return { ...state, themePropertyies: { ...state.themePropertyies, ...action.payload.themePropertyies } };
    }

    case TypeNames.HANDLE_CHANGE_TIME_FORMAT: {
      return { ...state, ...action.payload };
    }

    default:
      return state;
  }
};
