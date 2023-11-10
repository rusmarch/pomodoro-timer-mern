export interface ITaskItem {
   _id: string
   user: string,
   title: string, 
   complete: boolean,
   totalTime: number,
   __v?: number
}

export interface ITaskState {
   currentTask: ITaskItem | {},        
   oneTask: ITaskItem | {},
   allTasks: ITaskItem[] | [],
   isLoading: boolean,
   isSuccess: boolean,
   isError: boolean,
   message: string
}

export interface ITaskData {
   title: string
}

export interface DeleteResponse {
   success: boolean;
}