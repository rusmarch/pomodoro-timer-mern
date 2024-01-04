import { useEffect, useState } from 'react'
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
import { Task } from '../components/TaskItem';
import { TaskForm } from '../components/TaskForm';
import TimerPopover from '../components/timer-popover';

export const Tasks = () => {

   const tasks = useAppSelector(selectAllTasks);
   const isLoading = useAppSelector(selectIsLoading);
   const isSuccess = useAppSelector(selectIsSuccess);
   const dispatch = useAppDispatch();

   const [isCompletedTaskShowing, setIsCompletedTaskShowing] = useState<boolean>(false);

   useEffect(() => {
      return () => {
         if (isSuccess) {
            dispatch(reset());
         }
      }
   }, [dispatch, isSuccess])

   useEffect(() => {
      dispatch(getAllTask())
      // .unwrap()
      // .then(())
   }, [dispatch])

   if (isLoading) {
      return <Spinner />
   }

   const showCompletedTask = () => {
      setIsCompletedTaskShowing(prev => !prev);
   }

   const renderTaskList = (
      <div className="tickets">
         {tasks.map(task => (
            !task.complete && <Task
               key={task._id}
               task={task}
            />
         ))}
      </div>
   );

   const renderCompletedTaskList = (
      <div className="tickets">
         {tasks.map(task => (
            task.complete && <Task
               key={task._id}
               task={task}
            />
         ))}
      </div>
   );

   // console.log(tasks);
   return (
      <>
         <BackButton /* url='/' */ />
         {/* <Timer /> */}
         <h1>Tasks List</h1>
         <TaskForm />
         <h5 style={{ textAlign: 'right' }}>Show  tasks</h5>
         <br />
         {renderTaskList}
         <br />
         <button
            onClick={() => showCompletedTask()}
         >
            {`${isCompletedTaskShowing ? 'Hide' : 'Show'} completed tasks`}
         </button>
         {!isCompletedTaskShowing && renderCompletedTaskList}
         <TimerPopover />
      </>
   );
}

