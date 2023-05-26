import { useState } from 'react';
import { register, login, logout, selectIsAuth, selectUser } from '../../features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';

export const Form = () => {

   const [email, setMail] = useState<string>('');
   const [password, setPassword] = useState<string>('');

   const isAuth = useAppSelector(selectIsAuth);
   const user = useAppSelector(selectUser);
   const dispatch = useAppDispatch();

   return (
      <div>
         {isAuth && (
            <h1>User: {user?.email}</h1>
            )}
         <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setMail(e.target.value)}
         />
         <input
            type="text"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
         />
         <button
            onClick={() => dispatch(register({email, password}))}
         >Register</button>
         <button
            onClick={() => dispatch(login({email, password}))}
         >Login</button>
         <button
            onClick={() => dispatch(logout())}
         >Logout</button>
      </div>
   )
}