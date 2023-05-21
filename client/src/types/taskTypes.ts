export interface ITaskItem {
   id?: number,
   title: string, 
   complete?: boolean,
   totalTime: number
}

export interface ITasks {
   tasks: ITaskItem[],
   searchQuery: string,
   completedTasks?: ITaskItem[], 
   currentTask?: any,        
   isLoading: boolean,
   isSuccess: boolean,
   isError: boolean,
   message: string
   
}

export interface ITaskData {
   title: string | null
}