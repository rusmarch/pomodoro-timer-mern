import Stack from '@mui/material/Stack';

import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';

import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

// import { selectCurrentTask, countTotalTime } from '../features/tasks/taskSlice';
import {
   selectIsBreak,
   selectIsWorking,
   selectIsPaused,
   startPause,
   stop,
   selectSettings,
} from '../features/timer/timerSlice';
import { useTimeDisplay } from '../hooks/use-time-display';
import { TimerButton } from './timer-button';

// import { TimerState } from '../types/timerTypes';

const red = "#f54e4e";
const blue = "#3399ff";

// type TimerProps = Omit<TimerState, 'workedTime' | 'isTrackingInPomodoro'>;

export const Timer = () => {

   const isBreak = useAppSelector(selectIsBreak);
   const isWorking = useAppSelector(selectIsWorking);
   const isPaused = useAppSelector(selectIsPaused);
   const settings = useAppSelector(selectSettings);

   const { timerTime, percentage } = useTimeDisplay();
   const dispatch = useAppDispatch();

   return (
      <Stack alignItems="center" >
         <h3>{isWorking ? 'WORKING...' : 'Stopped'}</h3>
         <h3>Status Timer: {!isBreak ? 'Pomodoro' : 'Break'}</h3>
         {/* {currentTask.title && <h3>Current task: {currentTask.title}</h3>} */}
         <Stack width={200} height={200} sx={{ m: 2 }}>
            <CircularProgressbar
               value={percentage}
               text={`${timerTime}`}
               styles={buildStyles({
                  strokeLinecap: "butt",
                  pathColor: isBreak ? blue : red,
                  trailColor: "rgba(255,255,255, 0.2)",
                  pathTransitionDuration: 0.3,
               })}
            ></CircularProgressbar>

         </Stack>

         {/* {!isWorking
            ? <button onClick={() => {
               !isWorking
                  ? dispatch(startPause())
                  : !isBreak
                     ? dispatch(startPause())
                     : stopTimer(time) // skipping break when break is running
            }}>
               {!isWorking
                  ? "Start"
                  : !isBreak
                     ? "Pause"
                     : "Skip brake"}
            </button>
            : <div>
               <button onClick={() => dispatch(startPause())}>Continue</button>
               <button onClick={() => stopTimer(time)}>Stop</button>
            </div>
         } */}

         <TimerButton
           isWorking={isWorking}      
           isPaused={isPaused}
           isBreak={isBreak}
           onStartPause={() => dispatch(startPause())}
           onStop={() => dispatch(stop())}
         />

      </Stack>
   );
};