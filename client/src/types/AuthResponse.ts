import { User } from "./user";

export type AuthResponse = {
   accessToken: string,
   refreshToken: string,
   user: User,
};