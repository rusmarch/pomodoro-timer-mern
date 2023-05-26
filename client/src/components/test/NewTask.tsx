import { useEffect, useState, FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import {
   selectIsSuccess,
   selectIsError,
   selectMessage,
   createNewTask,
   reset,
   getAllTask,
} from "../../features/tasks/taskSlice";
import { toast } from "react-toastify";


export const NewTask = () => {

   const isSuccess = useAppSelector(selectIsSuccess);
   const isError = useAppSelector(selectIsError);
   const message = useAppSelector(selectMessage);
   const dispatch = useAppDispatch();

   const [title, setTitle] = useState<string>('');

   useEffect(() => {
      if (isError) {
         toast.error(message);
      }

      if (isSuccess) {
         dispatch(reset());
      }
   }, [isError, message, isSuccess, dispatch])


  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const some = { title };
    dispatch(createNewTask(some));
    dispatch(getAllTask());
  }

   return (
      <div>
      <form onSubmit={onSubmit} >
        <input
          type="text"
          placeholder='Enter title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </form>

      </div>
   )
}