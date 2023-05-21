import { IUser } from "../types/userTypes";

export interface AuthResponse {
   accessToken: string;
   refreshToken: string;
   user: IUser;
}