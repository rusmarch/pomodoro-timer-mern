import { Task } from './Task';
import { useAppSelector } from '../hooks/redux-hooks';
import { selectTasks, selectSearchQuery } from '../features/tasks/taskSlice';

export const TaskList = () => {

   const tasks = useAppSelector(selectTasks);
   const searchQuery = useAppSelector(selectSearchQuery);
   
   const tasksFilteredBySearchQuery = tasks.filter((task) => 
      task.title.toLowerCase().includes(searchQuery.toLowerCase()));

   
   return (
      <div className="task-list">
         {tasksFilteredBySearchQuery.map((task) => 
                  <Task key={task.id} task={task}/>
                  )}
      </div>
   )
}