import { $api } from "../../http";
import { AxiosResponse } from 'axios';
import { AuthResponse } from "../../types/AuthResponse";
import { ITaskData } from '../../types/taskTypes'

const createTask = async (
   taskData: ITaskData): Promise<AxiosResponse<AuthResponse>> => {

      return $api.post('/task', taskData); // taskData must be object { title }
}


export const taskService = {
   createTask
}