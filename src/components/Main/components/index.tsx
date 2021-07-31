import { FC } from 'react';
import { fromEvent, interval, merge, NEVER, mapTo, scan, startWith, switchMap, tap, debounceTime } from 'rxjs';
import { $Values } from 'utility-types';

import { TimerControlNames } from 'models/enums';
import { useConvertToCorrectFormat } from 'hooks/useConvertToCorrectFormat.hook';
import { StopWatchStartWithParamType } from 'models/types';

const StopWatch: FC = () => {
  const eventNames = {
    CLICK: 'click',
    DOUBLE_CLICK: 'doubleClick'
  } as const;

  const handleGetHtmlElement = (id: string): HTMLElement => document.getElementById(id)!;
  const handleSetMergeItemProperties = (id: string, eventName: $Values<typeof eventNames>, obj: {}) =>
    fromEvent(handleGetHtmlElement(id), eventName).pipe(mapTo(obj));

  const setValue = (value: number) => {
    handleGetHtmlElement(TimerControlNames.COUNTER).innerText = useConvertToCorrectFormat(value);
  };

  const handleWaitForDobleClickAndSetMergeItemPropertyies = (id: string, obj: {}) =>
    fromEvent(handleGetHtmlElement(id), eventNames.CLICK).pipe(debounceTime(300), mapTo(obj));

  const events$ = merge(
    handleSetMergeItemProperties(TimerControlNames.START, eventNames.CLICK, { count: true, countup: true }),
    handleSetMergeItemProperties(TimerControlNames.STOP, eventNames.CLICK, { count: false, value: 0, countup: false }),
    handleWaitForDobleClickAndSetMergeItemPropertyies(TimerControlNames.WAIT, { count: false }),
    handleSetMergeItemProperties(TimerControlNames.RESET, eventNames.CLICK, { value: 0 })
  );

  const stopWatch$ = events$.pipe(
    startWith({
      count: false,
      speed: 1000,
      value: 0,
      countup: true,
      increase: 1
    }),

    scan(
      (acc: StopWatchStartWithParamType, curr): StopWatchStartWithParamType => ({ ...acc, ...curr }),
      {} as StopWatchStartWithParamType
    ),
    tap((state: StopWatchStartWithParamType) => setValue(state.value)),
    switchMap((state: StopWatchStartWithParamType) =>
      state.count
        ? interval(state.speed).pipe(
            tap(_ => (state.value += state.countup ? state.increase : -state.increase)),
            tap(_ => setValue(state.value))
          )
        : NEVER
    )
  );

  stopWatch$.subscribe();

  return <></>;
};

export default StopWatch;
