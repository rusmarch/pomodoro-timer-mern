import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { FaUser } from "react-icons/fa";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from "../hooks/redux-hooks";
import {
   selectUser,
   selectIsAuth,
   selectIsLoading,
   selectIsError,
   selectMessage,
   register,
   reset,
} from '../features/auth/authSlice';
import { Spinner } from "../components/Spinner";

type FormData = {
   email: string,
   name: string,
   password: string,
   password2: string,
};

export const Register = () => {

   const [formData, setFormData] = useState<FormData>({
      email: '',
      name: '',
      password: '',
      password2: '',
   });

   const user = useAppSelector(selectUser);
   const isAuth = useAppSelector(selectIsAuth);
   const isLoading = useAppSelector(selectIsLoading);
   const isError = useAppSelector(selectIsError);
   const message = useAppSelector(selectMessage);
   const dispatch = useAppDispatch();
   const navigate = useNavigate();

   const { name, email, password, password2 } = formData;

   useEffect(() => {
      if (isError) {
         toast.error(message);
      }
      // Redirect when logged in (if it isAuth)
      if (isAuth || user) {
         navigate('/')
      }
      dispatch(reset());
   }, [isError, isAuth, user, message, navigate, dispatch]);

   const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
         ...prev,
         [e.target.name]: e.target.value,
      }));
   };

   const onSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (password !== password2) {
         toast.error('Passwords do not match');
      } else {
         const userData = {
            email,
            password,
            name,
         };

         dispatch(register(userData));
      }
   };

   if (isLoading) {
      return <Spinner />
   }

   return (
      <>
         <section className="heading">
            <h1><FaUser />Register</h1>
            <p>Please create an account</p>
         </section>
         <section className="form">
            <form onSubmit={onSubmit}>
               <div className="form-group">
                  <input
                     className="form-control"
                     type="text"
                     name="name"
                     placeholder="Enter your name"
                     required
                     id="name"
                     value={name}
                     onChange={onChange}
                  />
               </div>
               <div className="form-group">
                  <input
                     className="form-control"
                     type="email"
                     name="email"
                     placeholder="Enter your email"
                     required
                     id="email"
                     value={email}
                     onChange={onChange}
                  />
               </div>
               <div className="form-group">
                  <input
                     className="form-control"
                     type="password"
                     name="password"
                     placeholder="Enter your password"
                     required
                     id="password"
                     value={password}
                     onChange={onChange}
                  />
               </div>
               <div className="form-group">
                  <input
                     className="form-control"
                     type="password"
                     name="password2"
                     placeholder="Confirm password"
                     required
                     id="password2"
                     value={password2}
                     onChange={onChange}
                  />
               </div>
               <div className="form-group">
                  <button className="btn btn-block">Submit</button>
               </div>
            </form>
         </section>
      </>
   )
};