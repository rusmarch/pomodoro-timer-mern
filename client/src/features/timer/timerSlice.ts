import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../store/store';
import { ITimer } from '../../types/timerTypes';
import { useAppSelector, useAppDispatch } from '../../hooks/redux-hooks';
import { countTotalTime } from '../../features/tasks/taskSlice';

const initialState: ITimer = {
   displayTime: 10,
   pomodoroTime: 10,
   breakTime: 5,
   isWorking: false,
   isPausing: false,
   mode: "pomodoro",
   workedTime: 0
}

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
      },
      stop: (state) => {
         state.isWorking = false;
         state.isPausing = false;
         if (state.mode === "pomodoro") {
            state.workedTime = state.pomodoroTime - state.displayTime;
            state.mode = "break";
            state.displayTime = state.breakTime;
         } else {
            state.mode = "pomodoro";
            state.displayTime = state.pomodoroTime;
         }
      },
      pause: (state) => {
         state.isPausing = true;
         state.isWorking = false;
      },
      startTrackingTask: (state) => {
            state.mode = "pomodoro";
            state.displayTime = state.pomodoroTime;
            state.isWorking = true;
            state.isPausing = false;
      }
   }
})

export const { decrement, start, stop, pause, startTrackingTask } = timerSlice.actions;
export const selectDisplayTime = (state: RootState) => state.timer.displayTime;
export const selectIsWorking = (state: RootState) => state.timer.isWorking;
export const selectIsPausing = (state: RootState) => state.timer.isPausing;
export const selectMode = (state: RootState) => state.timer.mode;
export const selectPomodoroTime = (state: RootState) => state.timer.pomodoroTime;
export const selectBreakTime = (state: RootState) => state.timer.breakTime;
export const selectWorkedTime = (state: RootState) => state.timer.workedTime;
export default timerSlice.reducer;


export const formatTime = (time: number) => {
   let minutes = Math.floor(time/600);
   let seconds = time % 60;

   return(
      (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds)
   );
}

export const stopTimer = (): AppThunk => (dispatch, getState) => {
   const currentWorkedTime = selectWorkedTime(getState());
 
   dispatch(countTotalTime(currentWorkedTime));
   dispatch(stop());
}