import { $api } from "../../http";
import { AxiosResponse } from 'axios';
import { ITaskItem, ITaskData, DeleteResponse } from '../../types/taskTypes'

const createTask = async (
   taskData: ITaskData
   ):Promise<AxiosResponse<ITaskItem>> => {
   return $api.post('/tasks', taskData);
}

const getAllTask = async (): Promise<AxiosResponse<ITaskItem[]>> => {
   return await $api.get<ITaskItem[]>('/tasks');
}

const removeTask = async (
   taskId: string):
   Promise<AxiosResponse<DeleteResponse>> => {
   return $api.delete(`/tasks/${taskId}`);
}

const updateTask = async (
   updatedTaskData: ITaskItem
): Promise<AxiosResponse<ITaskItem>> => {
   return $api.put(`/tasks/${updatedTaskData._id}`, updatedTaskData);
}

export const taskService = {
   createTask,
   getAllTask,
   removeTask,
   updateTask
}