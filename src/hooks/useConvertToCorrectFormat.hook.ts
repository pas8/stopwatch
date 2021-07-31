export const useConvertToCorrectFormat = (value: number): string => {
  let seconds: number | string = value;
  let hours: number | string = Math.floor(seconds / 3600);
  hours >= 1 ? (seconds = seconds - hours * 3600) : (hours = '00');
  let min: number | string = Math.floor(seconds / 60);
  min >= 1 ? (seconds = seconds - min * 60) : (min = '00');
  seconds < 1 ? (seconds = '00') : void 0;

  min.toString().length == 1 ? (min = '0' + min) : void 0;
  seconds.toString().length == 1 ? (seconds = '0' + seconds) : void 0;

  const stopWatchValue = `${hours} : ${min} :  ${seconds}`;
  
  return stopWatchValue;
};
