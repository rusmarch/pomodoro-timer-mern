import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/redux-hooks';

import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import Stack from '@mui/material/Stack';

// import { selectCurrentTask, countTotalTime } from '../features/tasks/taskSlice';
import {
   selectDisplayTime,
   selectIsWorking,
   selectIsPausing,
   selectPomodoroTime,
   selectBreakTime,
   selectMode,
   formatTime,
   decrement,
   start,
   pause,
   stopTimer,
} from '../features/timer/timerSlice';

const red = "#f54e4e";
const blue = "#4670F6";

export const Timer = () => {

   const isWorking = useAppSelector(selectIsWorking);
   const displayTime = useAppSelector(selectDisplayTime);
   const isPausing = useAppSelector(selectIsPausing);
   const pomodoroTime = useAppSelector(selectPomodoroTime);
   const breakTime = useAppSelector(selectBreakTime);
   
   const mode = useAppSelector(selectMode);
   const dispatch = useAppDispatch();

   let totalTime: number = mode === 'pomodoro' ? pomodoroTime : breakTime;
   let percentage: number = (displayTime / totalTime) * 100;
   let time: string = formatTime(displayTime);

   useEffect(() => {
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
      <div >
         <Stack alignItems="center">
            <h3>Status Timer: {mode}</h3>
            {/* {currentTask.title && <h3>Current task: {currentTask.title}</h3>} */}
            <Stack width={200} height={200} sx={{ m: 2 }}>
               <CircularProgressbar
                  value={percentage}
                  text={`${time}`}
                  className="centered"
                  styles={buildStyles({
                     strokeLinecap: "butt",
                     textColor: "#fff",
                     pathColor: mode === "pomodoro" ? red : blue,
                     trailColor: "rgba(255,255,255, 0.2)",
                     pathTransitionDuration: 0.3,
                  })}
               ></CircularProgressbar>
               
            </Stack>

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
         </Stack>

      </div >

   )
}