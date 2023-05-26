import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"; 
import taskSlice from "../features/tasks/taskSlice";
import timerSlice from "../features/timer/timerSlice";
import auth2 from "../features/auth/authSlice";

export const store = configureStore({
   reducer: {
      tasks: taskSlice,
      timer: timerSlice,
      auth2: auth2 
   }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState, 
unknown,
Action<string>
>;