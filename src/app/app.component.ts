import { Component } from '@angular/core';
import { Pomodoro, Status } from './Pomodoro';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  workMinutes = 25;
  shortBreakMinutes = 5;
  longBreakMinutes = 15;
  workIntervalsCompleted = 0;
  pomodoro: Pomodoro;
  statusNames: Map<Status, string>;
  optionsShown: boolean;

  constructor() {
    this.pomodoro = new Pomodoro(this.workMinutes, this.shortBreakMinutes, this.longBreakMinutes);
    this.statusNames = new Map([
      [Status.Working, "Focus"],
      [Status.ShortBreak, "Relax"],
      [Status.LongBreak, "Long Break"]
    ]);
    this.optionsShown = false;
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

  toggleOptions(): void {
    this.optionsShown = !this.optionsShown;
  }

  updateWorkMinutes() {
    this.pomodoro.setWorkTime(this.workMinutes);
  }

  updateShortBreakMinutes() {
    this.pomodoro.setShortBreakTime(this.shortBreakMinutes);
  }

  updateLongBreakMinutes() {
    this.pomodoro.setLongBreakTime(this.longBreakMinutes);
  }
}
