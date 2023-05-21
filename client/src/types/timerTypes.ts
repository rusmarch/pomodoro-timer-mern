export interface ITimer {
   displayTime: number,
   pomodoroTime: number,
   breakTime: number,
   isWorking: boolean,
   isPausing: boolean,
   mode: "pomodoro" | "break",
   workedTime: number,
}

