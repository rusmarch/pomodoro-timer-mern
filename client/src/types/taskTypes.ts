export interface ITaskItem {
   id?: number,
   title: string, 
   complete?: boolean,
   totalTime: number
}

export interface task {
   title: string, 
   complete?: boolean,
   totalTime: number
   user: string,
   _id: string
}

export interface ITasks {
   tasks: ITaskItem[],
   searchQuery: string,
   completedTasks?: ITaskItem[], 
   currentTask?: any,        
   oneTask: task | {} | null,
   allTasks: task[] | [],
   isLoading: boolean,
   isSuccess: boolean,
   isError: boolean,
   message: string
}

export interface ITaskData {
   title: string
}