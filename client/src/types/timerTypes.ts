export type TimerMode = 'pomodoro' | 'break';

export type TimerSettings = {
   pomodoroTime: number,
   breakTime: number,
};

export type TimerState = {
   settings: TimerSettings,
   displayTime: number,
   isWorking: boolean,
   isPausing: boolean,
   mode: "pomodoro" | "break",
   workedTime: number,
   isTrackingInPomodoro: boolean,
};
