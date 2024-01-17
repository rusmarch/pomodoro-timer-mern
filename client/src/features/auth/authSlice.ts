import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { User } from '../../types/user';
import { userCredentials } from "../../types/userData";
import { authService } from "./authService";

export interface authState {
   user: User | null;
   isAuth: boolean;
   isLoading: boolean;
   isError: boolean;
   message: string;
};

const initialState: authState = {
   user: null,
   isAuth: false,
   isLoading: false,
   isError: false,
   message: '',
};

export const register = createAsyncThunk(
   'auth/register',
   async (userData: userCredentials, thunkAPI) => {
      try {
         const { email, password } = userData;
         const response = await authService.registration(email, password);
         console.log(response);
         localStorage.setItem('token', response.data.accessToken);
         return response.data.user;
      } catch (e: any) {
         const message = (e.response
            && e.response.data
            && e.response.data.message)
            || e.message || e.toString()

         return thunkAPI.rejectWithValue(message);
      }
   }
);

export const login = createAsyncThunk(
   'auth/login',
   async (userData: userCredentials, thunkAPI) => {
      try {
         const { email, password } = userData;
         const response = await authService.login(email, password);
         console.log(response);
         localStorage.setItem('token', response.data.accessToken);
         return response.data.user;
      } catch (e: any) {
         const message = (e.response
            && e.response.data
            && e.response.data.message)
            || e.message || e.toString()

         return thunkAPI.rejectWithValue(message);
      }
   }
);

export const logout = createAsyncThunk(
   'auth/logout',
   async () => {
      await authService.logout();
      localStorage.removeItem('token');
   }
);

export const checkAuth = createAsyncThunk(
   'auth/checkAuth',
   async (_, thunkAPI) => {
      try {
         const response = await authService.checkAuth();
         localStorage.setItem('token', response.data.accessToken);
         return response.data.user;
      } catch (e: any) {
         const message = (e.response
            && e.response.data
            && e.response.data.message)
            || e.message || e.toString()

         return thunkAPI.rejectWithValue(message);
      }
   }
);

export const authSlice = createSlice({
   name: 'auth2',
   initialState,
   reducers: {
      reset: (state) => {
         state.isLoading = false;
         state.isError = false;
         state.isAuth = false;
         state.message = '';
      }
   },
   extraReducers: (builder) => {
      builder
         .addCase(register.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(register.fulfilled, (state, action: PayloadAction<User | null>) => {
            state.isLoading = false;
            state.isAuth = true;
            state.user = action.payload;
         })
         .addCase(register.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload as string;
            state.user = null;
         })
         .addCase(login.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(login.fulfilled, (state, action: PayloadAction<User | null>) => {
            console.log(action.payload);
            state.isLoading = false;
            state.isAuth = true;
            state.user = action.payload;
         })
         .addCase(login.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload as string;
            state.user = null;
         })
         .addCase(logout.fulfilled, (state) => {
            state.isAuth = false;
            state.user = null;
         })
         .addCase(checkAuth.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(checkAuth.fulfilled, (state, action: PayloadAction<User | null>) => {
            state.isLoading = false;
            state.isAuth = true;
            state.user = action.payload;
         })
         .addCase(checkAuth.rejected, (state, action) => {

            state.isLoading = false;
            state.isError = true;
            state.message = action.payload as string;
            // state.user = null;
         })
   }
});

export const { reset } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth.user;
export const selectIsAuth = (state: RootState) => state.auth.isAuth;
export const selectIsLoading = (state: RootState) => state.auth.isLoading;
export const selectIsError = (state: RootState) => state.auth.isError;
export const selectMessage = (state: RootState) => state.auth.message;

export default authSlice.reducer;