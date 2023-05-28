import { FC } from 'react';
import startImg from '../assets/task-start.png';
import runningImg from '../assets/task-running.png';

interface StartButtonProps {
   isRunning: boolean;
   onChange: (isRunning: boolean) => void;
}

export const StartButton: FC<StartButtonProps> = ({ isRunning, onChange }) => {

   const handleChange = () => {
      const updatedValue = !isRunning;
      onChange(updatedValue);
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