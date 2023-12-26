import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';

import { Link, useNavigate } from 'react-router-dom';
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { useAppSelector, useAppDispatch } from '../hooks/redux-hooks';
import {
   logout,
   reset,
   selectUser
} from '../features/auth/authSlice';
import AccountPopover from './account-popover';
import SettingsPopover from './settings-popover';

export const Header = () => {

   const user = useAppSelector(selectUser);
   const navigate = useNavigate();
   const dispatch = useAppDispatch();

   const onLogout = () => {
      dispatch(logout());
      dispatch(reset());
      navigate('/');
   }


   return (
      <AppBar
         position="fixed"
         color="default"
      >
         <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ px: 2, py: 1 }}
         >
            <Stack
               direction="row"
               spacing={2}
            >
               <div>
                  {/* <Link to='/'>Pomodoro App</Link> */}

                  <AccountPopover />

               </div>
               <ul>
                  {user ? (
                     <li>
                        <button
                           className='btn'
                           onClick={onLogout}
                        >
                           <FaSignOutAlt />Logout
                        </button>
                     </li>
                  ) : (
                     <>
                        <li>
                           <Link to='/login'>
                              <FaSignInAlt />Login
                           </Link>
                        </li>
                        <li>
                           <Link to='/register'>
                              <FaUser />Register
                           </Link>
                        </li>
                     </>
                  )}

               </ul>

               <SettingsPopover />
            </Stack>

            <Stack
               spacing={2}
               direction="row"
            >
               <SettingsPopover />
            </Stack>

         </Stack>
      </AppBar>
   )
}