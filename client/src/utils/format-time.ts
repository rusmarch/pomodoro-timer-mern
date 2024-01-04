export const formatTimerTime = (time: number): string => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
  return `${formattedMinutes}:${formattedSeconds}`;
};

export const formatPopoverTime = (time: number): number => {
   let minutes = Math.floor(time / 60);

   if (minutes === 0 && time <= 59) {
      minutes = 1;
   }

   return minutes;
} 