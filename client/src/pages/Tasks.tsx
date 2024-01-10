import { useCallback, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import {
   selectAllTasks,
   selectSearchQuery,
   selectIsLoading,
   selectIsSuccess,
   getAllTask,
   reset,
   setSearchQuery,
} from '../features/tasks/taskSlice';
import { Spinner } from '../components/Spinner';
import { BackButton } from '../components/BackButton';
import { TaskItem } from '../components/task-item';
import { TaskForm } from '../components/TaskForm';
import TimerPopover from '../components/timer-popover';
import { SearchInput } from '../components/search-input';
import TaskSort from '../components/task-sort';

export const POST_SORT_OPTIONS = [
   { value: 'latest', label: 'Latest' },
   { value: 'popular', label: 'Popular' },
   { value: 'oldest', label: 'Oldest' },
];

export const Tasks = () => {

   const tasks = useAppSelector(selectAllTasks);
   const searchQuery = useAppSelector(selectSearchQuery);
   const isLoading = useAppSelector(selectIsLoading);
   const isSuccess = useAppSelector(selectIsSuccess);
   const dispatch = useAppDispatch();

   const [isCompletedTaskShowing, setIsCompletedTaskShowing] = useState<boolean>(false);
   const [sortBy, setSortBy] = useState('latest');

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

   const handleSortBy = useCallback((newValue: string) => {
      setSortBy(newValue);
   }, []);

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
      return <Spinner />
   }

   return (
      <>
         <BackButton /* url='/' */ />
         {/* <Timer /> */}
         <h1>Tasks List</h1>
         <TaskForm />

         <SearchInput
            query={searchQuery}
            onSearch={onSearch}
            sx={{ mb: 2 }}
         />
         <TaskSort sort={sortBy} onSort={handleSortBy} sortOptions={POST_SORT_OPTIONS} />
         <h5 style={{ textAlign: 'right' }}>Show tasks</h5>
         <br />
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

