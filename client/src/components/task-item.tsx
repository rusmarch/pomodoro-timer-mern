// import { Link } from "react-router-dom"
import { Task } from "../types/taskTypes";
import { Checkbox } from './Checkbox';
import { TrackTaskButton } from './track-task-button';
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
   selectIsWorking,
   selectIsBreak,
   startTrackingTask,
} from '../features/timer/timerSlice';

type Props = {
   task: Task,
}

export const TaskItem = ({ task }: Props) => {

   const isWorking = useAppSelector(selectIsWorking);
   const isBreak = useAppSelector(selectIsBreak);
   const currentTask = useAppSelector(selectCurrentTask);
   const dispatch = useAppDispatch();

   const isTaskTracking = currentTask && ('_id' in currentTask)
      && currentTask._id === task._id && isWorking && !isBreak;

   const completeTask = async () => {
      const updatedTask = { ...task, complete: !task.complete };
      await dispatch(updateTask(updatedTask));
      dispatch(complete(updatedTask));
   }

   const trackTask = () => {
         dispatch(startTrackingTask());
         dispatch(setCurrentTask(task));
   };

   const onRemove = (id: string) => {
      dispatch(removeTask(id))
   };

   return (
      <div className="task">
         <div className="task-content">
            <Checkbox isChecked={task.complete} onChange={completeTask} />
            <TrackTaskButton isTaskTracking={isTaskTracking} onChange={trackTask} />
            <div>{task.title}: <b>{task.totalTime}</b></div>
         </div>
         <div className="task-actions">
            <RiDeleteBinLine
               className="task-delete"
               onClick={() => onRemove(task._id)}
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