import { createSlice } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../store/store';
import { ITimer } from '../../types/timerTypes';
import { selectCurrentTask, setCurrentTask, updateTask } from '../tasks/taskSlice';

const initialState: ITimer = {
   displayTime: 10,
   pomodoroTime: 10,
   breakTime: 5,
   isWorking: false,
   isPausing: false,
   mode: "pomodoro",
   workedTime: 0,
   isTrackingInPomodoro: false
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
         if (state.mode === "pomodoro") {
            state.isTrackingInPomodoro = true;
         }
      },
      stop: (state) => {
         state.isWorking = false;
         state.isPausing = false;
         if (state.mode === "pomodoro") {
            state.mode = "break";
            state.displayTime = state.breakTime;
            state.isTrackingInPomodoro = false;
         } else {
            state.mode = "pomodoro";
            state.displayTime = state.pomodoroTime;
         }
      },
      pause: (state) => {
         state.isPausing = true;
         state.isWorking = false;
      },
      setWorkedTime: (state) => {
         if (state.mode === "pomodoro") {
            state.workedTime = state.pomodoroTime - state.displayTime;
         }
      },
      startTrackingTask: (state) => {
         state.mode = "pomodoro";
         state.displayTime = state.pomodoroTime;
         state.isTrackingInPomodoro = true;
         state.isWorking = true;
         state.isPausing = false;
      },
   }
})

export const { decrement, start, stop, pause, setWorkedTime, startTrackingTask } = timerSlice.actions;
export const selectDisplayTime = (state: RootState) => state.timer.displayTime;
export const selectIsWorking = (state: RootState) => state.timer.isWorking;
export const selectIsPausing = (state: RootState) => state.timer.isPausing;
export const selectMode = (state: RootState) => state.timer.mode;
export const selectPomodoroTime = (state: RootState) => state.timer.pomodoroTime;
export const selectBreakTime = (state: RootState) => state.timer.breakTime;
export const selectWorkedTime = (state: RootState) => state.timer.workedTime;
export const selectIsTrackingInPomodoro = (state: RootState) => state.timer.isTrackingInPomodoro;
export default timerSlice.reducer;


export const formatTime = (time: number) => {
   let minutes = Math.floor(time / 600);
   let seconds = time % 60;

   return (
      (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds)
   );
}


export const stopTimer = (): AppThunk =>  (dispatch, getState) => {
   dispatch(setWorkedTime());
   
   const workedTime = selectWorkedTime(getState());
   const currentTask = selectCurrentTask(getState());
   const mode = selectMode(getState());
   
   if (mode === "pomodoro" && currentTask && 'totalTime' in currentTask) {
      
      const updatedTask = { ...currentTask,totalTime: currentTask.totalTime + workedTime }
      
      dispatch(setCurrentTask(updatedTask));
      dispatch(updateTask(updatedTask))
   }
   
   dispatch(stop());
}