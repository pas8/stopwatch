import { AppInitialStateType } from 'store/modules/App/types';

export type RootStoreType = {
  app: AppInitialStateType;
};

export type StopWatchStartWithParamType = {
  [Property in 'speed' | 'value' | 'increase']: number;
} &
  {
    [Property in 'countup' | 'count']: boolean;
  };
