import { formatPopoverTime } from './../../utils/format-time';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../store/store';
import { selectCurrentTask, setCurrentTask, updateTask } from '../tasks/taskSlice';
import { TimerSettings, TimerState } from '../../types/timerTypes';

const storedSettings = localStorage.getItem('timerSettings');
export const savedSettings = storedSettings ? JSON.parse(storedSettings) : null;

export const defaultSettings: TimerSettings = {
   pomodoroTime: 2.3 * 60,
   breakTime: .3 * 60,
};

const initialState: TimerState = {
   secondsLeft: defaultSettings.pomodoroTime,
   settings: defaultSettings,
   isWorking: false,
   isPaused: false,
   isBreak: false,
   workedTime: 0,
   isTrackingInPomodoro: false
};

export const timerSlice = createSlice({
   name: 'timer',
   initialState,
   reducers: {
      decrementSecondsLeft: (state) => {
         state.secondsLeft -= 1;
      },
      startPause: (state) => {
         if (!state.isWorking) {      // Two cases:
            state.isWorking = true;   // 1 - click "Continue" when paused
            state.isPaused = false;   // 2 - click "Start" whin unpaused
         } else if (!state.isBreak) { //  All the rest - when is working
            state.isWorking = false;  // click "Pause" in working
            state.isPaused = true;
         } else {
            state.isWorking = false;  // click Skip break 
            state.isPaused = false;
            state.secondsLeft = state.settings.pomodoroTime;
            state.isBreak = false;
         }
         // to fix it then
         if (!state.isBreak) {
            state.isTrackingInPomodoro = true;
         }
      },
      stop: (state) => {
         state.isWorking = false;
         state.isPaused = false;

         if (!state.isBreak) {
            state.workedTime = state.settings.pomodoroTime - state.secondsLeft;
            state.secondsLeft = state.settings.breakTime;
         } else {
            state.secondsLeft = state.settings.pomodoroTime;
         }

         state.isBreak = !state.isBreak;
         state.isTrackingInPomodoro = false; // WTF??? remove this then
      },
      setTimerSettings: (state, action: PayloadAction<TimerSettings>) => {
         if (!state.isWorking && !state.isPaused) {
            state.settings = action.payload;
         }
      },
      // setWorkedTime: (state, action: PayloadAction<number>) => {
      //    if (!state.isBreak) {
      //       state.workedTime = state.settings.pomodoroTime - action.payload;
      //    }
      // },
      startTrackingTask: (state) => {
         state.isBreak = false;
         state.isWorking = true;
         state.isPaused = false;
      },
   }
})

export const {
   startPause,
   stop,
   decrementSecondsLeft,
   // setWorkedTime,
   startTrackingTask,
   setTimerSettings,
} = timerSlice.actions;

export const selectSecondsLeft = (state: RootState) => state.timer.secondsLeft;
export const selectIsWorking = (state: RootState) => state.timer.isWorking;
export const selectIsPaused = (state: RootState) => state.timer.isPaused;
export const selectIsBreak = (state: RootState) => state.timer.isBreak;
export const selectSettings = (state: RootState) => state.timer.settings;
export const selectWorkedTime = (state: RootState) => state.timer.workedTime;
export default timerSlice.reducer;

// export const stopTimer = (): AppThunk => (dispatch, getState) => {

//    const workedTime = selectWorkedTime(getState());
//    const currentTask = selectCurrentTask(getState());
//    const isBreak = selectIsBreak(getState());

//    if (!isBreak && currentTask && 'totalTime' in currentTask) {

//       const updatedTask = { ...currentTask, totalTime: currentTask.totalTime + workedTime }

//       dispatch(setCurrentTask(updatedTask));
//       dispatch(updateTask(updatedTask))
//    }

//    dispatch(stop());
// }
