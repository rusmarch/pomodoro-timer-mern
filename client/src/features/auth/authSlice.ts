import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { IUser } from '../../types/userTypes';
import { authService } from "./authService";
import axios from "axios";
import { AuthResponse } from "../../types/AuthResponse";
import { AppThunk } from "../../store/store";
import { API_URL } from "../../http";

export interface authState {
   user: IUser | null;
   isAuth: boolean;
   isLoading: boolean;
   isError: boolean;
   isSuccess: boolean;
}

const initialState: authState = {
   user: null,
   isAuth: false,
   isLoading: false,
   isError: false,
   isSuccess: false,
}


export const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      isAuth: (state, action: PayloadAction<boolean>) => {
         state.isAuth = action.payload;
      },
      setUser: (state, action: PayloadAction<IUser | null>) => {
         state.user = action.payload;
      },
      setIsLoading: (state, action: PayloadAction<boolean>) => {
         state.isLoading = action.payload;
      }

   },

})

export const { isAuth, setIsLoading, setUser } = authSlice.actions;

export const selectIsAuth = (state: RootState) => state.auth.isAuth;
export const selectIsLoading = (state: RootState) => state.auth.isLoading;
export const selectUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;


export const registration = (email: string, password: string): AppThunk =>
   async (dispatch) => {

      try {
         const response = await authService.registration(email, password);
         console.log(response);
         localStorage.setItem('token', response.data.accessToken);
         dispatch(isAuth(true))
         dispatch(setUser(response.data.user));

      } catch (e: any) {
         console.log(e.response?.data?.message);
      }
   }

export const login = (email: string, password: string): AppThunk =>
   async (dispatch) => {

      try {
         const response = await authService.login(email, password);
         console.log(response);
         localStorage.setItem('token', response.data.accessToken);
         dispatch(isAuth(true));
         dispatch(setUser(response.data.user));

      } catch (e: any) {
         console.log(e.response?.data?.message);
      }
   }

export const logout = (): AppThunk =>
   async (dispatch) => {

      try {
         const response = await authService.logout();
         localStorage.removeItem('token')
         dispatch(isAuth(false));
         dispatch(setUser(null));

      } catch (e: any) {
         console.log(e.response?.data?.message);
      }
   }

export const checkAuth = (): AppThunk =>
   async (dispatch) => {
      setIsLoading(true);

      try {
         const response = await axios.get<AuthResponse>(`${API_URL}/refresh`,
            { withCredentials: true })
         console.log(response);
         localStorage.setItem('token', response.data.accessToken);
         dispatch(isAuth(true));
         dispatch(setUser(response.data.user));

      } catch (e: any) {
         console.log(e.response?.data?.message);
      } finally {
         dispatch(setIsLoading(false));
      }
   }