import { Link, useNavigate } from 'react-router-dom';
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { useAppSelector, useAppDispatch } from '../hooks/redux-hooks';
import {
   logout,
   reset,
   selectUser
} from '../features/auth/authSlice';

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
      <header className='header'>
         <div className="logo">
            <Link to='/'>Pomodoro App</Link>
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
      </header>
   )
}