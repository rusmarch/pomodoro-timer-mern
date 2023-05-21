import { FC, useState, FormEvent } from 'react';
import { ITaskItem } from '../types/taskTypes';
import { useAppDispatch } from '../hooks/redux-hooks';
import { remove, complete, editTask } from '../features/tasks/taskSlice';
//import { MdDeleteForever } from 'react-icons/md';

interface Props {
   task: ITaskItem,
}

export const Task: FC<Props> = ({ task }) => {

   const [isEditing, setIsEditing] = useState<boolean>(false);
   const [newTitle, setNewTitle] = useState<string | undefined>('');

   const dispatch = useAppDispatch();

   const onEdit = () => {
      setIsEditing(true);
      setNewTitle(task.title);
   }

   const editTitle = (e: FormEvent<HTMLFormElement>): void => {
      e.preventDefault();
      setIsEditing(false);

      if (newTitle?.trim() !== '') {
         const newTask: Partial<ITaskItem> = { ...task, title: newTitle }
         dispatch(editTask(newTask as ITaskItem));
      }
   };


   return (
      <div className="task-block">
         <div className='task-left'>
            <input
               className="check-box"
               type="checkbox"
               checked={task.complete}
               onChange={() => dispatch(complete(task))}
            />
            {isEditing
               ? (
                  <form onSubmit={editTitle}>
                     <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                     />
                  </form>
               ) : (
                  <div>
                     <strong onClick={onEdit}>{task.title}</strong>
                  </div>
               )
            }
         </div>
         <div>
            <button
               className='btn-icon'
               onClick={() => dispatch(remove(task.id))}
            >
               {/* <MdDeleteForever /> */}
            </button>
         </div>
      </div>
   )
}

