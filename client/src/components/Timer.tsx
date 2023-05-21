import * as React from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/redux-hooks';
import { selectCurrentTask } from '../features/tasks/taskSlice';
import {
   selectDisplayTime,
   selectIsWorking,
   selectIsPausing,
   selectMode,
   selectWorkedTime,
   formatTime,
   decrement,
   start,
   pause,
   stopTimer,
} from '../features/timer/timerSlice';

export const Timer = () => {

   const isWorking = useAppSelector(selectIsWorking);
   const displayTime = useAppSelector(selectDisplayTime);
   const isPausing = useAppSelector(selectIsPausing);
   const currentTask = useAppSelector(selectCurrentTask);
   const mode = useAppSelector(selectMode);
   const dispatch = useAppDispatch();

   React.useEffect(() => {
      let timer = setInterval(decrementTime, 1000);

      function decrementTime() {
         if (isWorking) {
            if (displayTime > 0) {
               dispatch(decrement());
            } else {
               dispatch(stopTimer());
               clearInterval(timer);
            }
         }
      }
      return () => clearInterval(timer);
   }, [displayTime, isWorking, dispatch]);


   return (
      <div className={`timer ${mode === "pomodoro" ? "work-mode" : "brake-mode"}`}>
         <div className='timer-content'>
            <h3>Status Timer: {mode}</h3>
            {currentTask.title && <h3>Current task: {currentTask.title}</h3>}
            <h2>{formatTime(displayTime)}</h2>
            {!isPausing
               ? <button onClick={() => {
                  !isWorking
                     ? dispatch(start())
                     : mode === "pomodoro"
                        ? dispatch(pause())
                        : dispatch(stopTimer())
               }}>
                  {!isWorking
                     ? "Start"
                     : mode === "pomodoro"
                        ? "Pause"
                        : "Skip brake"}
               </button>
               : <div>
                  <button onClick={() => dispatch(start())}>Continue</button>
                  <button onClick={() => dispatch(stopTimer())}>Stop</button>
               </div>
            }
         </div>
      </div>

   )
}