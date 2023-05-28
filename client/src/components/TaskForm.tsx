import { FC, useState } from 'react';



export const TaskForm: FC = () => {

   const [isChecked, setIsChecked] = useState<boolean>(false);

   const handleCheckbox = (value: boolean) => {
      setIsChecked(value);
   }


   return (
      <form className="task-form">
         <input
            className="task-form-input"
            type="text"
            placeholder="Add task and press Enter..."
         />
      </form>
   )
}