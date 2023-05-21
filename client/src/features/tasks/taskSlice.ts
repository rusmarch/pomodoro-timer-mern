import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import { ITasks, ITaskItem } from '../../types/taskTypes';
import { taskService } from './taskService';
import { ITaskData } from '../../types/taskTypes';

const initialState: ITasks = {
   tasks: [
      { id: 1, title: 'sleep', complete: false, totalTime: 0 },
      { id: 2, title: 'play Witcher', complete: false, totalTime: 0 },
      { id: 3, title: 'eat', complete: false, totalTime: 0 },
      { id: 4, title: 'have more relax', complete: false, totalTime: 0 },
      { id: 5, title: 'eat again', complete: false, totalTime: 0 }
   ],
   searchQuery: '',
   completedTasks: [],
   currentTask: {},
   isLoading: false,
   isSuccess: false,
   isError: false,
   message: ''
}

export const createNewTask = createAsyncThunk(
   'tasks/create',
   async (taskData: ITaskData, thunkAPI) => { // taskData must be object { title }
      try {
          return await taskService.createTask(taskData);
      } catch (e: any) {
         const message = (e.response 
            && e.response.data
            && e.response.data.message) 
            || e.message || e.toString();

         return thunkAPI.rejectWithValue(message);
      }
   }
)


export const taskSlice = createSlice({
   name: 'tasks',
   initialState,
   reducers: {
      create: (state, action: PayloadAction<ITaskItem>) => {
         state.tasks.push(action.payload);
      },
      remove: (state, action: PayloadAction<number | undefined>) => {
         state.tasks = state.tasks.filter(task => task.id !== action.payload)
      },
      complete: (state, action: PayloadAction<ITaskItem>) => {
         state.completedTasks?.push(action.payload);
         state.tasks = state.tasks
            .map(task => task.id === action.payload.id
               ? { ...task, complete: !task.complete }
               : task
            )
            .filter(task => task.id !== action.payload.id);
      },
      search: (state, action: PayloadAction<string>) => {
         state.searchQuery = action.payload
      },
      setCurrentTask: (state, action: PayloadAction<ITaskItem>) => {
         state.currentTask = action.payload;
      },
      countTotalTime: (state, action: PayloadAction<number>) => {
         state.tasks = state.tasks.map(task =>
            task.id === state.currentTask.id
               ? { ...task, totalTime: task.totalTime + action.payload }
               : task)
      },
      editTask: (state, action: PayloadAction<ITaskItem>) => {
         state.tasks = state.tasks.map(task =>
            task.id === action.payload.id
               ? { ...task, title: action.payload.title }
               : task
         )
      },
   },
   extraReducers: (builder) => {
      builder
      .addCase(createNewTask.pending, (state) => {
        state.isLoading = true; 
      })
      .addCase(createNewTask.fulfilled, (state) => {
         state.isLoading = false;
         state.isSuccess = true;
      })
      .addCase(createNewTask.rejected, (state, action: PayloadAction<any>) => {
         state.isLoading = false;
         state.isError = true;
         state.message = action.payload;
      })
   }
})

export const selectTasks = (state: RootState) => state.tasks.tasks;
export const selectCompletedTasks = (state: RootState) => state.tasks.completedTasks;
export const selectSearchQuery = (state: RootState) => state.tasks.searchQuery;
export const selectCurrentTask = (state: RootState) => state.tasks.currentTask;
export const {
   create,
   remove,
   complete,
   search,
   setCurrentTask,
   countTotalTime,
   editTask,
} = taskSlice.actions;
export default taskSlice.reducer;




