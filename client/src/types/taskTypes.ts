export type TaskItem = {
   _id: string
   user: string,
   title: string, 
   complete: boolean,
   totalTime: number,
   __v?: number
   tags: [] | string[];
}

export type TaskData = {
   title: string
}

export type DeleteResponse = {
   success: boolean;
}