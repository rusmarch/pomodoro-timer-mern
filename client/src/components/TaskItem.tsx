// import { Link } from "react-router-dom"
import { TaskItem } from "../types/taskTypes";
import { Checkbox } from './Checkbox';
import { StartButton } from './StartButton';
import { RiDeleteBinLine } from 'react-icons/ri'
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import {
   selectCurrentTask,
   removeTask,
   setCurrentTask,
   updateTask,
   complete,
} from '../features/tasks/taskSlice';
import {
   startTrackingTask,
   selectIsBreak,
} from '../features/timer/timerSlice';

type Props = {
   task: TaskItem,
}

export const Task = ({ task }: Props) => {

   const isBreak = useAppSelector(selectIsBreak);
   const currentTask = useAppSelector(selectCurrentTask) as TaskItem | {};
   const dispatch = useAppDispatch();

   const isRunning = currentTask && ('_id' in currentTask)
      && currentTask._id === task._id && !isBreak;

   const completeTask = async () => {
      const updatedTask = { ...task, complete: !task.complete };
      await dispatch(updateTask(updatedTask));
      dispatch(complete(updatedTask));
   }

   const trackTask = () => {
      if (!isBreak) {
         dispatch(startTrackingTask());
         dispatch(setCurrentTask(task));
      }
   };

   const remove = (id: string) => {
      dispatch(removeTask(id))
   };

   return (
      <div className="task">
         <div className="task-content">
            <Checkbox
               isChecked={task.complete}
               onChange={completeTask}
            />
            <StartButton
               isRunning={isRunning}
               onChange={trackTask}
            />
            <div>{task.title}: <b>{task.totalTime}</b></div>
         </div>
         <div className="task-actions">
            <RiDeleteBinLine
               className="task-delete"
               onClick={() => remove(task._id)}
            />
            {/* <Link
               to={`/task/${task.id}`}
               className="btn btn-reverse btn-sm"
            >
               View
            </Link> */}
         </div>
      </div>
   )
}