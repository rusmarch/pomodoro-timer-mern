export type User = {
  id: string,
  name: string,
  email: string,
};

export type UserRegisterData = Omit<User, 'id'> & {
   password: string,
};

export type UserLoginData = Omit<UserRegisterData, 'id' | 'name'>;
