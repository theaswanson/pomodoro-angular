import { Component } from '@angular/core';
import { Pomodoro, Status } from './Pomodoro';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  pomodoroMinutes = 25;
  shortBreakMinutes = 5;
  longBreakMinutes = 15;
  workIntervalsCompleted = 0;
  pomodoro: Pomodoro;
  statusNames: Map<Status, string>;

  constructor() {
    this.pomodoro = new Pomodoro(this.pomodoroMinutes, this.shortBreakMinutes, this.longBreakMinutes);
    this.statusNames = new Map([
      [Status.Working, "Focus"],
      [Status.ShortBreak, "Relax"],
      [Status.LongBreak, "Long Break"]
    ]);
  }

  start() {
    this.pomodoro.start();
  }

  pause() {
    this.pomodoro.timer.pause();
  }

  stop() {
    this.pomodoro.timer.stop();
  }

  timerDisplay(totalSeconds: number): string {
    const elapsed = Math.max(totalSeconds, 0);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  statusName(status: Status): string {
    return this.statusNames.get(status) ?? "Unknown";
  }
}
