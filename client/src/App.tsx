import { useEffect } from 'react';
import './App.css';
import { useAppDispatch, useAppSelector } from './hooks/redux-hooks';
import {
  selectAllTasks,
  selectIsSuccess,
  getAllTask,
  reset,
} from './features/tasks/taskSlice';
import { selectIsAuth } from './features/auth/authSlice';
import { checkAuth } from './features/auth/authSlice';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Form } from './components/test/Form';
import { NewTask } from './components/test/NewTask';

function App() {

  const tasks = useAppSelector(selectAllTasks);
  const isSuccess = useAppSelector(selectIsSuccess);
  const isAuth = useAppSelector(selectIsAuth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkAuth());
    }
  }, [dispatch])

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    }
  }, [isSuccess, dispatch])

  useEffect(() => {
    dispatch(getAllTask());
  }, [dispatch, isSuccess])

  return (
    <div className="App">
      <h1>Tasks</h1>
      <Form />
      <NewTask/>
       {isAuth && 
        tasks.map(t =>
        <div key={t._id}>{t.title}</div>
      )
      }
      <ToastContainer />
    </div>
  );
}

export default App;
