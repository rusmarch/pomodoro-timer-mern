
export const formatTimerTime = (time: number) => {
   let minutes = Math.floor(time / 60);
   let seconds = time % 60;
   
   return (
      (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds)
   );
};

export const formatPopoverTime = (time: number) => {
   let minutes = Math.floor(time / 60);

   if (minutes === 0 && time <= 59) {
      minutes = 1;
   }

   return minutes;
} 