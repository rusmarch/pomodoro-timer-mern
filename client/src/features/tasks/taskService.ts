import { $api } from "../../http";
import { AxiosResponse } from 'axios';
import { TaskItem, TaskData, DeleteResponse } from '../../types/taskTypes'

const createTask = async (
   taskData: TaskData
   ):Promise<AxiosResponse<TaskItem>> => {
   return $api.post('/tasks', taskData);
}

const getAllTask = async (): Promise<AxiosResponse<TaskItem[]>> => {
   return await $api.get<TaskItem[]>('/tasks');
}

const removeTask = async (
   taskId: string):
   Promise<AxiosResponse<DeleteResponse>> => {
   return $api.delete(`/tasks/${taskId}`);
}

const updateTask = async (
   updatedTaskData: TaskItem
): Promise<AxiosResponse<TaskItem>> => {
   return $api.put(`/tasks/${updatedTaskData._id}`, updatedTaskData);
}

export const taskService = {
   createTask,
   getAllTask,
   removeTask,
   updateTask
}