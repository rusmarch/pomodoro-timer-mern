// import { Link } from "react-router-dom"
import { FC, useState } from 'react';
import { ITaskItem } from "../types/taskTypes";
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
   selectIsTrackingInPomodoro
} from '../features/timer/timerSlice';

interface Props {
   task: ITaskItem,
}

export const TaskItem: FC<Props> = ({ task }) => {

   const dispatch = useAppDispatch();
   const isTrackingPomodoro = useAppSelector(selectIsTrackingInPomodoro);
   const currentTask = useAppSelector(selectCurrentTask) as ITaskItem | {};

   const isRunning = currentTask && ('_id' in currentTask)
      && currentTask._id === task._id && isTrackingPomodoro;

   const completeTask = async () => {
      const updatedTask = { ...task, complete: !task.complete };
      await dispatch(updateTask(updatedTask));
      dispatch(complete(updatedTask));
   }

   const trackTask = () => {
      if (!isTrackingPomodoro) {
         dispatch(startTrackingTask());
         dispatch(setCurrentTask(task));
      }
   }

   const remove = (id: string) => {
      dispatch(removeTask(id))
   }

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