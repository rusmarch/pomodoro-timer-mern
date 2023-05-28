import { FC, useState } from 'react';
// import { Link } from "react-router-dom"
import { ITaskItem } from "../types/taskTypes";
import { Checkbox } from './Checkbox';
import { StartButton } from './StartButton';
import { RiDeleteBinLine } from 'react-icons/ri'


interface Props {
   task: ITaskItem,
}

export const TaskItem: FC<Props> = ({ task }) => {

   const [isChecked, setIsChecked] = useState<boolean>(false);
   const [isTrackingTask, setIsTrackingTask] = useState<boolean>(false);

   const handleCheckbox = (value: boolean) => {
      setIsChecked(value);
   }

   const handleTrackingTask = (value: boolean) => {
      setIsTrackingTask(value);
   }

   return (
      <div className="task">
         <div className="task-content">
            <Checkbox isChecked={isChecked} onChange={handleCheckbox} />
            <StartButton isRunning={isTrackingTask} onChange={handleTrackingTask} />
            <div>{task.title}</div>
         </div>
         <div className="task-actions">
            <RiDeleteBinLine className="task-delete">
               <button onClick={() => console.log('Hello!')} />
            </RiDeleteBinLine>
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