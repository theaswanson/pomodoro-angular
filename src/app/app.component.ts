import { Component } from '@angular/core';
import { CountdownTimer } from './Timer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  pomodoroMinutes = 25;
  timer: CountdownTimer = new CountdownTimer();

  start() {
    this.timer.start(this.toSeconds(this.pomodoroMinutes));
  }

  pause() {
    this.timer.pause();
  }

  stop() {
    this.timer.stop();
  }

  private toSeconds(minutes: number) {
    return minutes * 60;
  }
}
