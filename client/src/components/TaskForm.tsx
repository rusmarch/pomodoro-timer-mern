import React, { FormEvent } from "react";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../hooks/redux-hooks";
import {
  create,
  search,
  selectSearchQuery,
} from "../features/tasks/taskSlice";

interface ITask {
  title: string;
}

export const TaskForm = () => {
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector(selectSearchQuery);

  const [task, setTask] = useState<ITask>({ title: "" });

  const createTask = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTask = { ...task, id: Date.now(), complete: false, totalTime: 0 };
    console.table(newTask);
    dispatch(create(newTask));
    setTask({ title: "" });
  };


  return (
    <div className="form-container">
      <form onSubmit={createTask}>
        <input
          className="form-input"
          type="text"
          placeholder="enter task name"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
        />
     </form>  
     <input
          className="form-input"
          type="text"
          placeholder="search tasks"
          value={searchQuery}
          onChange={(e) => dispatch(search(e.target.value))}
        /> 
    </div>
  );
};
