import { useState, FormEvent } from 'react';
import { useAppDispatch } from '../hooks/redux-hooks';
import { createNewTask } from '../features/tasks/taskSlice';

export const TaskForm = () => {

   const dispatch = useAppDispatch();

   const [title, setTitle] = useState<string>('');

   const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const taskData = { title: title }
      dispatch(createNewTask(taskData));
      // .unwrap()
      // .then((res) => console.table(res))
      setTitle('');
   }

   return (
      <form
         className="task-form"
         onSubmit={onSubmit}
      >
         <input
            className="task-form-input"
            type="text"
            placeholder="Add task and press Enter..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
         />
      </form>
   )
}