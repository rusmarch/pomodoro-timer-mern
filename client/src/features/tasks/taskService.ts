import { $api } from "../../http";
import { AxiosResponse } from 'axios';
import { AuthResponse } from "../../types/AuthResponse";
import { ITaskData, task } from '../../types/taskTypes'

const createTask = async (
   taskData: ITaskData): Promise<AxiosResponse<AuthResponse>> => {
   return $api.post('/tasks', taskData);
}

const getAllTask = async (): Promise<AxiosResponse<task[]>> => {
   const response = await $api.get('/tasks'); 
   return response.data;
}

export const taskService = {
   createTask,
   getAllTask
}