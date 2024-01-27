import unfinishedImg from '../assets/task-unfinished.png'
import finishedImg from '../assets/task_done.png'

type CheckboxProps = {
   isChecked: boolean,
   onChange: (isChecked: boolean) => void,
};

export const Checkbox = ({ isChecked, onChange }: CheckboxProps) => {

   const handleChange = () => {
      const updatedValue = !isChecked;
      onChange(updatedValue);
   }

   return (
      <input
         type="checkbox"
         checked={isChecked}
         onChange={handleChange}
         className="task-icon task-checkbox"
         style={{ backgroundImage: `url(${isChecked ? finishedImg : unfinishedImg})` }}
      />
   )
};