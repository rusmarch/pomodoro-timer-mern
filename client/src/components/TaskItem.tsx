// import { Link } from "react-router-dom"
import { FC, useState } from 'react';
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
   selectSettings,
} from '../features/timer/timerSlice';
// import { useTimeDisplay } from '../hooks/use-time-display';

type Props = {
   task: TaskItem,
}

export const Task: FC<Props> = ({ task }) => {

   const isBreak = useAppSelector(selectIsBreak);
   const currentTask = useAppSelector(selectCurrentTask) as TaskItem | {};
   const settings = useAppSelector(selectSettings);
   const dispatch = useAppDispatch();
   // const { time } = useTimeDisplay();

   const isRunning = currentTask && ('_id' in currentTask)
      && currentTask._id === task._id && !isBreak;

   const completeTask = async () => {
      const updatedTask = { ...task, complete: !task.complete };
      await dispatch(updateTask(updatedTask));
      dispatch(complete(updatedTask));
   }

   const trackTask = () => {
      if (!isBreak) {
         // setDisplayTime(settings.pomodoroTime);
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