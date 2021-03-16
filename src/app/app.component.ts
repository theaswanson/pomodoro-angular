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

  timerDisplay(totalSeconds: number): string {
    const elapsed = Math.max(totalSeconds, 0);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  private toSeconds(minutes: number) {
    return minutes * 60;
  }
}
