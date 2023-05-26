import { $api } from "../../http";
import { AxiosResponse } from 'axios';
import { AuthResponse } from "../../types/AuthResponse";
import { API_URL } from "../../http";
import axios from "axios";

const registration =
   async (
      email: string, password: string
   ): Promise<AxiosResponse<AuthResponse>> => {
      return $api.post<AuthResponse>('/registration', { email, password })
   }

const login =
   async (
      email: string, password: string
   ): Promise<AxiosResponse<AuthResponse>> => {
      return $api.post<AuthResponse>('/login', { email, password })
   }

const logout = (): Promise<void> => {
   return $api.post('/logout')
}

const checkAuth =
   async (): Promise<AxiosResponse<AuthResponse>> => {
      return $api.get<AuthResponse>('/refresh');
   }

const checkAuth2 =
   async (): Promise<AxiosResponse<AuthResponse>> => {
     return await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true})
   }


export const authService = {
   registration,
   login,
   logout,
   checkAuth,
   checkAuth2
}
