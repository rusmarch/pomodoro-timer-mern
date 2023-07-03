import { FC, ChangeEvent } from 'react';
import startImg from '../assets/task-start.png';
import runningImg from '../assets/task-running.png';

interface StartButtonProps {
   isRunning: boolean;
   onChange: (value: boolean) => void;
}

export const StartButton: FC<StartButtonProps> = ({ onChange, isRunning }) => {

   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.checked);
   }

   return (
      <input
         type="checkbox"
         checked={isRunning}
         onChange={handleChange}
         className="task-icon task-tracking"
         style={{ backgroundImage: `url(${isRunning ? runningImg : startImg})` }}
      />
   )
}