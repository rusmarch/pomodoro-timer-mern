import { ChangeEvent } from 'react';
import startImg from '../assets/task-start.png';
import runningImg from '../assets/task-running.png';

type StartButtonProps = {
   isTaskTracking: boolean,
   onChange: (value: boolean) => void,
};

export const TrackTaskButton = ({ onChange, isTaskTracking }: StartButtonProps) => {

   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.checked);
   };

   return (
      <input
         type="checkbox"
         checked={isTaskTracking}
         onChange={handleChange}
         className="task-icon task-tracking"
         style={{ backgroundImage: `url(${isTaskTracking ? runningImg : startImg})` }}
      />
   )
}