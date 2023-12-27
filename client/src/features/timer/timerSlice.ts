import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../store/store';
import { selectCurrentTask, setCurrentTask, updateTask } from '../tasks/taskSlice';
import { TimerSettings, TimerState } from '../../types/timerTypes';

const storedSettings = localStorage.getItem('timerSettings') ;
const savedSettings = storedSettings ? JSON.parse(storedSettings) : null;

const defaultSettings: TimerSettings = {
   pomodoroTime: 1 * 60,
   breakTime: .5 * 60,
};

const initialState: TimerState = {
   settings: savedSettings ?? defaultSettings,
   displayTime: defaultSettings.pomodoroTime,
   isWorking: false,
   isPausing: false,
   mode: "pomodoro",
   workedTime: 0,
   isTrackingInPomodoro: false
};

export const timerSlice = createSlice({
   name: 'timer',
   initialState,
   reducers: {
      decrement: (state) => {
         state.displayTime -= 1;
      },
      start: (state) => {
         state.isWorking = true;
         state.isPausing = false;
         if (state.mode === "pomodoro") {
            state.isTrackingInPomodoro = true;
         }
      },
      stop: (state) => {
         state.isWorking = false;
         state.isPausing = false;
         if (state.mode === "pomodoro") {
            state.mode = "break";
            state.displayTime = state.settings.breakTime;
            state.isTrackingInPomodoro = false;
         } else {
            state.mode = "pomodoro";
            state.displayTime = state.settings.pomodoroTime;
         }
      },
      pause: (state) => {
         state.isPausing = true;
         state.isWorking = false;
      },
      setTimerSettings: (state, action: PayloadAction<TimerSettings>) => {
         if (!state.isWorking) {
            state.displayTime = action.payload.pomodoroTime;
            state.settings = action.payload;
         }
      },
      setWorkedTime: (state) => {
         if (state.mode === "pomodoro") {
            state.workedTime = state.settings.pomodoroTime - state.displayTime;
         }
      },
      startTrackingTask: (state) => {
         state.mode = "pomodoro";
         state.displayTime = state.settings.pomodoroTime;
         state.isWorking = true;
         state.isPausing = false;
      },
   }
})

export const {
   decrement,
   start,
   stop,
   pause,
   setWorkedTime,
   startTrackingTask,
   setTimerSettings,
} = timerSlice.actions;

export const selectDisplayTime = (state: RootState) => state.timer.displayTime;
export const selectIsWorking = (state: RootState) => state.timer.isWorking;
export const selectIsPausing = (state: RootState) => state.timer.isPausing;
export const selectMode = (state: RootState) => state.timer.mode;

// export const selectPomodoroTime = (state: RootState) => state.timer.pomodoroTime;
// export const selectBreakTime = (state: RootState) => state.timer.breakTime;
export const selectSettings = (state: RootState) => state.timer.settings;

export const selectWorkedTime = (state: RootState) => state.timer.workedTime;
export default timerSlice.reducer;


export const formatTime = (time: number) => {
   let minutes = Math.floor(time / 60);
   let seconds = time % 60;

   return (
      (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds)
   );
}


export const stopTimer = (): AppThunk => (dispatch, getState) => {
   dispatch(setWorkedTime());

   const workedTime = selectWorkedTime(getState());
   const currentTask = selectCurrentTask(getState());
   const mode = selectMode(getState());

   if (mode === "pomodoro" && currentTask && 'totalTime' in currentTask) {

      const updatedTask = { ...currentTask, totalTime: currentTask.totalTime + workedTime }

      dispatch(setCurrentTask(updatedTask));
      dispatch(updateTask(updatedTask))
   }

   dispatch(stop());
}

