import { useState, useEffect } from 'react';
import { useAppSelector } from './redux-hooks';
import { selectUser } from '../features/auth/authSlice';

export const useAuthStatus = () => {
   
   const [loggedIn, setLoggedIn] = useState(false);
   const [checkingStatus, setCheckingStatus] = useState(true);

   const user = useAppSelector(selectUser);

   useEffect(() => {
      
      if (user) {
         setLoggedIn(true);
      } else {
         setLoggedIn(false);
      }

      setCheckingStatus(false);

   }, [user])

   return { loggedIn, checkingStatus }

}



