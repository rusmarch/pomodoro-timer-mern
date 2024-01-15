import { useEffect, useState } from 'react'

import Stack from '@mui/material/Stack';

import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import { Spinner } from '../components/Spinner';
import { BackButton } from '../components/BackButton';
import { TaskItem } from '../components/task-item';
import { TaskForm } from '../components/TaskForm';
import { TimerPopover } from '../components/timer-popover';
import { SearchInput } from '../components/search-input';

import {
   selectAllTasks,
   selectSearchQuery,
   selectIsLoading,
   selectIsSuccess,
   getAllTask,
   reset,
   setSearchQuery,
} from '../features/tasks/taskSlice';

export const Tasks = () => {

   const tasks = useAppSelector(selectAllTasks);
   const searchQuery = useAppSelector(selectSearchQuery);
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

   const filteredTasks = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()));

   const onSearch = (v: string) => {
      dispatch(setSearchQuery(v));
   };

   const showCompletedTask = () => {
      setIsCompletedTaskShowing(prev => !prev);
   };

   const renderTaskList = (
      <div className="tickets">
         {filteredTasks.map(task => (
            !task.complete && <TaskItem
               key={task._id}
               task={task}
            />
         ))}
      </div>
   );

   const renderCompletedTaskList = (
      <div className="tickets">
         {tasks.map(task => (
            task.complete && <TaskItem
               key={task._id}
               task={task}
            />
         ))}
      </div>
   );

   if (isLoading) {
      return <Spinner />;
   }

   return (
      <>
         <BackButton /* url='/' */ />
         <h1>Tasks List</h1>
         <TaskForm />

         <SearchInput
            query={searchQuery}
            onSearch={onSearch}
            sx={{ mb: 2 }}
         />

         {renderTaskList}
         <br />
         <button
            onClick={() => showCompletedTask()}
         >
            {`${isCompletedTaskShowing ? 'Hide' : 'Show'} completed tasks`}
         </button>
         {isCompletedTaskShowing && renderCompletedTaskList}
         <TimerPopover />
      </>
   );
};
