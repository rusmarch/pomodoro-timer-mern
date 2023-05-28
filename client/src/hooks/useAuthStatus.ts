import { useState, useEffect } from 'react';
import { useAppSelector } from './redux-hooks';
import { selectUser } from '../features/auth/authSlice';

export const useAuthStatus = () => {
   
   const [loggedIn, setLoggedIn] = useState<boolean>(false);
   const [checkingStatus, setCheckingStatus] = useState<boolean>(true);

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



