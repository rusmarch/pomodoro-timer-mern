import Stack from '@mui/material/Stack';

import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';

import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { selectCurrentTask, updateTask } from '../features/tasks/taskSlice';
import {
   selectSecondsLeft,
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

   const secondsLeft = useAppSelector(selectSecondsLeft);
   const currentTask = useAppSelector(selectCurrentTask);
   const isBreak = useAppSelector(selectIsBreak);
   const isWorking = useAppSelector(selectIsWorking);
   const isPaused = useAppSelector(selectIsPaused);
   const settings = useAppSelector(selectSettings);

   const { timerTime, percentage } = useTimeDisplay();
   const dispatch = useAppDispatch();

   const onStop = () => {

      if (currentTask && 'totalTime' in currentTask) {
         const workedTime = settings.pomodoroTime - secondsLeft;
         const updatedTask = { ...currentTask, totalTime: currentTask.totalTime + workedTime }
         dispatch(updateTask(updatedTask))
      }
      dispatch(stop());
   };

   return (
      <Stack alignItems="center" >
         {currentTask && 'totalTime' in currentTask &&
            <h3>Current task: {currentTask.title}</h3>}
         <h3>{isWorking ? 'WORKING...' : 'Stopped'}</h3>
         <h3>Status Timer: {!isBreak ? 'Pomodoro' : 'Break'}</h3>
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

         <TimerButton
            isWorking={isWorking}
            isPaused={isPaused}
            isBreak={isBreak}
            onStartPause={() => dispatch(startPause())}
            onStop={onStop}
         />

      </Stack>
   );
};