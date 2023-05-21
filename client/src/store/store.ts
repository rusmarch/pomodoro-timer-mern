import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"; 
import authSlice from "../features/auth/authSlice";
import taskSlice from "../features/tasks/taskSlice";
import timerSlice from "../features/timer/timerSlice";

export const store = configureStore({
   reducer: {
      auth: authSlice,
      tasks: taskSlice,
      timer: timerSlice,
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