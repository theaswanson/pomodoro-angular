import { Subscription } from "rxjs";
import { CountdownTimer } from "./Timer";

export enum Status {
  Working,
  ShortBreak,
  LongBreak
}

export class Pomodoro {
  timer: CountdownTimer;
  working: boolean;
  workIntervalsCompleted: number;
  get status(): Status {
    return this.working ? Status.Working : (this.workIntervalsCompleted % 4 == 0 ? Status.LongBreak : Status.ShortBreak);
  }
  private workTime: number;
  private shortBreakTime: number;
  private longBreakTime: number;
  private subscription: Subscription | null;

  constructor(workMinutes: number, shortBreakMinutes: number, longBreakMinutes: number) {
    this.working = true;
    this.workIntervalsCompleted = 0;
    this.workTime = workMinutes * 60;
    this.shortBreakTime = shortBreakMinutes * 60;
    this.longBreakTime = longBreakMinutes * 60;
    this.timer = new CountdownTimer(this.workTime);
    this.subscription = null;
  }

  start(): void {
    this.cleanup();
    this.timer.start();
    this.subscription = this.timer.finished.subscribe(() => {
      if (this.working) {
        this.completeWorkInterval();
      }
      this.working = !this.working;
      this.setStartTime();
    });
  }

  setWorkTime(workTime: number) {
    this.workTime = Math.max(workTime * 60, 0);
    this.setStartTime();
  }

  setShortBreakTime(shortBreakTime: number) {
    this.shortBreakTime = Math.max(shortBreakTime * 60, 0);
    this.setStartTime();
  }

  setLongBreakTime(longBreakTime: number) {
    this.longBreakTime = Math.max(longBreakTime * 60, 0);
    this.setStartTime();
  }
  
  private cleanup() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }

  private completeWorkInterval(): void {
    this.workIntervalsCompleted++;
  }

  private setStartTime(): void {
    this.timer.startTime = this.getStartTime(this.status);
  }

  private getStartTime(status: Status): number {
    switch (status) {
      case Status.Working:
        return this.workTime;
      case Status.ShortBreak:
        return this.shortBreakTime;
      case Status.LongBreak:
        return this.longBreakTime;
    }
  }
}
