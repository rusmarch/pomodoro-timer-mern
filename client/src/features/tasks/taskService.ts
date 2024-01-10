import { $api } from "../../http";
import { AxiosResponse } from 'axios';
import { Task, TaskData, DeleteResponse } from '../../types/taskTypes'

const createTask = async (
   taskData: TaskData
   ):Promise<AxiosResponse<Task>> => {
   return $api.post('/tasks', taskData);
}

const getAllTask = async (): Promise<AxiosResponse<Task[]>> => {
   return await $api.get<Task[]>('/tasks');
}

const removeTask = async (
   taskId: string):
   Promise<AxiosResponse<DeleteResponse>> => {
   return $api.delete(`/tasks/${taskId}`);
}

const updateTask = async (
   updatedTaskData: Task
): Promise<AxiosResponse<Task>> => {
   return $api.put(`/tasks/${updatedTaskData._id}`, updatedTaskData);
}

export const taskService = {
   createTask,
   getAllTask,
   removeTask,
   updateTask
}