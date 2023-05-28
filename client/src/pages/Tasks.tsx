import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import {
   selectAllTasks,
   selectIsLoading,
   selectIsSuccess,
   getAllTask,
   reset
} from '../features/tasks/taskSlice';
import { Spinner } from '../components/Spinner';
import { BackButton } from '../components/BackButton';
import { TaskItem } from '../components/TaskItem';
import { TaskForm } from '../components/TaskForm';

export const Tasks = () => {

   const tasks = useAppSelector(selectAllTasks);
   const isLoading = useAppSelector(selectIsLoading);
   const isSuccess = useAppSelector(selectIsSuccess);
   const dispatch = useAppDispatch();

   useEffect(() => {
      return () => {
         if (isSuccess) {
            dispatch(reset());
         }
      }
   }, [dispatch, isSuccess])

   useEffect(() => {
      dispatch(getAllTask())
   }, [dispatch])

   if (isLoading) {
      return <Spinner />
   }


   return (
      <>
         <BackButton /* url='/' */ />
         <h1>Tasks List</h1>
         <TaskForm />
         <br />
         <div className="tickets">
            {tasks.map(task =>
               <TaskItem
                  key={task._id}
                  task={task}
               />
            )}
         </div>
      </>
   )
}