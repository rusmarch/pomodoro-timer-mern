import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import { TimerSettings, TimerState } from '../../types/timer';

const storedSettings = localStorage.getItem('timerSettings');
export const savedSettings = storedSettings ? JSON.parse(storedSettings) : null;

export const defaultSettings: TimerSettings = {
   pomodoroTime: .3 * 60,
   breakTime: .3 * 60,
};

const initialState: TimerState = {
   secondsLeft: defaultSettings.pomodoroTime,
   settings: defaultSettings,
   isWorking: false,
   isPaused: false,
   isBreak: false,
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
         if (!state.isWorking) {
            state.isWorking = true;
            state.isPaused = false;
         } else if (!state.isBreak) {
            state.isWorking = false;
            state.isPaused = true;
         } else {
            state.isWorking = false;
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
      startTrackingTask: (state) => {
         state.isBreak = false;
         state.isPaused = false;
         state.isWorking = true;
      },
   }
})

export const {
   startPause,
   stop,
   decrementSecondsLeft,
   startTrackingTask,
   setTimerSettings,
} = timerSlice.actions;

export const selectSecondsLeft = (state: RootState) => state.timer.secondsLeft;
export const selectIsWorking = (state: RootState) => state.timer.isWorking;
export const selectIsPaused = (state: RootState) => state.timer.isPaused;
export const selectIsBreak = (state: RootState) => state.timer.isBreak;
export const selectSettings = (state: RootState) => state.timer.settings;

export default timerSlice.reducer;
