export type TimerSettings = {
   pomodoroTime: number,
   breakTime: number,
};

export type TimerState = {
   secondsLeft: number,
   settings: TimerSettings,
   isWorking: boolean,
   isPaused: boolean,
   isBreak: boolean,
   workedTime: number,
   isTrackingInPomodoro: boolean,
};
