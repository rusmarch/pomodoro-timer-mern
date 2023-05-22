import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import { ITasks, ITaskItem, ITaskData, task } from '../../types/taskTypes';
import { taskService } from './taskService';

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
   allTasks: [],
   oneTask: {},
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

export const getAllTask = createAsyncThunk(
   'tasks/getAll',
   async (_, thunkAPI) => {
      try {
         return taskService.getAllTask();
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
      reset: (state) => {
         state.allTasks = [];
         state.oneTask = {};
         state.isLoading = false;
         state.isSuccess = false;
         state.isError = false;
         state.message = '';
      },
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
         .addCase(createNewTask.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload as string;
            state.oneTask = null;
         })
         .addCase(getAllTask.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(getAllTask.fulfilled, (state, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.allTasks = action.payload;
         })
         .addCase(getAllTask.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload as string;
            state.oneTask = null;
         })

   }
})

export const selectTasks = (state: RootState) => state.tasks.tasks;
export const selectCompletedTasks = (state: RootState) => state.tasks.completedTasks;
export const selectSearchQuery = (state: RootState) => state.tasks.searchQuery;
export const selectCurrentTask = (state: RootState) => state.tasks.currentTask;
export const selectAllTasks = (state: RootState) => state.tasks.allTasks;
export const selectOneTask = (state: RootState) => state.tasks.oneTask;
export const selectIsSuccess = (state: RootState) => state.tasks.isError;
export const selectIsError = (state: RootState) => state.tasks.isError;
export const selectMessage = (state: RootState) => state.tasks.message;


export const {
   create,
   remove,
   complete,
   search,
   setCurrentTask,
   countTotalTime,
   editTask,
   reset,
} = taskSlice.actions;
export default taskSlice.reducer;




