import { TaskData } from './../../types/taskTypes';
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import { TaskItem } from '../../types/taskTypes';
import { taskService } from './taskService';

export type TaskState = {
   currentTask: TaskItem | {},
   oneTask: TaskItem | {},
   allTasks: TaskItem[] | [],
   isLoading: boolean,
   isSuccess: boolean,
   isError: boolean,
   message: string,
   searchQuery: string,
}

const initialState: TaskState = {
   allTasks: [],
   currentTask: {},
   oneTask: {},
   isLoading: false,
   isSuccess: false,
   isError: false,
   message: '',
   searchQuery: '',
}

export const createNewTask = createAsyncThunk(
   'tasks/create',
   async (taskData: TaskData, thunkAPI) => {
      try {
         const response = await taskService.createTask(taskData);
         return response.data;
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
         const response = await taskService.getAllTask();
         return response.data;
      } catch (e: any) {
         const message = (e.response
            && e.response.data
            && e.response.data.message)
            || e.message || e.toString();

         return thunkAPI.rejectWithValue(message);
      }
   }
)

export const removeTask = createAsyncThunk(
   'tasks/remove',
   async (taskId: string, thunkAPI) => {
      try {
         await taskService.removeTask(taskId);
         return taskId;
      } catch (e: any) {
         const message = (e.responsg
            && e.response.data
            && e.response.data.message)
            || e.message || e.toString();

         return thunkAPI.rejectWithValue(message);
      }
   }
)

export const updateTask = createAsyncThunk(
   'task/update',
   async (updatedTaskData: TaskItem, thunkAPI) => {
      try {
         const response = await taskService.updateTask(updatedTaskData);
         return response.data;
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
      setCurrentTask: (state, action: PayloadAction<TaskItem>) => {
         state.currentTask = action.payload;
      },
      complete: (state, action: PayloadAction<TaskItem>) => {
         state.allTasks = state.allTasks.map((task) =>
            task._id === action.payload._id
               ? { ...task, complete: action.payload.complete }
               : task)
      },
      setSearchQuery: (state, action: PayloadAction<string>) => {
         state.searchQuery = action.payload;
      },
      // editTask: (state, action: PayloadAction<TaskItem>) => {
      //    state.tasks = state.tasks.map(task =>
      //       task.id === action.payload.id
      //          ? { ...task, title: action.payload.title }
      //          : task
      //    )
      // },
   },
   extraReducers: (builder) => {
      builder
         .addCase(createNewTask.fulfilled, (state, action: PayloadAction<TaskItem>) => {
            state.allTasks = [...state.allTasks, action.payload];
         })
         .addCase(getAllTask.fulfilled, (state, action: PayloadAction<TaskItem[]>) => {
            state.allTasks = action.payload;
         })
         .addCase(removeTask.fulfilled, (state, action: PayloadAction<string>) => {
            state.allTasks = state.allTasks.filter(task => task._id !== action.payload);
         })
         .addCase(updateTask.fulfilled, (state, action: PayloadAction<TaskItem>) => {
            state.allTasks = state.allTasks.map(task =>
               task._id === action.payload._id
                  ? action.payload : task
            )
         })
   }
})

export const selectCurrentTask = (state: RootState) => state.tasks.currentTask;
export const selectAllTasks = (state: RootState) => state.tasks.allTasks;
export const selectOneTask = (state: RootState) => state.tasks.oneTask;
export const selectIsSuccess = (state: RootState) => state.tasks.isError;
export const selectIsLoading = (state: RootState) => state.tasks.isLoading;
export const selectIsError = (state: RootState) => state.tasks.isError;
export const selectMessage = (state: RootState) => state.tasks.message;
export const selectSearchQuery = (state: RootState) => state.tasks.searchQuery;

export const {
   reset,
   setCurrentTask,
   complete,
   setSearchQuery,
} = taskSlice.actions;

export default taskSlice.reducer;