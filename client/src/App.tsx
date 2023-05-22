import { useEffect } from 'react';
import './App.css';
import { Form } from './components/test/Form';
import { useAppDispatch, useAppSelector } from './hooks/redux-hooks';
import {
  selectAllTasks,
  selectIsSuccess,
  selectIsError,
  getAllTask,
  reset
} from './features/tasks/taskSlice';
import { Task } from './components/Task';

function App() {

  const tasks = useAppSelector(selectAllTasks);
  const isSuccess = useAppSelector(selectIsSuccess);
  const isError = useAppSelector(selectIsError);
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    }
  }, [isSuccess, dispatch])

  useEffect(() => {
    dispatch(getAllTask());
  }, [dispatch])


  return (
    <div className="App">
      <h1>Tasks</h1>
      <Form />

      <form >
        
      </form>

      {tasks.map(t => 
        <div key={t._id}>{t.title}</div>
        )}
    </div>
  );
}

export default App;
