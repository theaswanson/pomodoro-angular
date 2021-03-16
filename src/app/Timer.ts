import { EventEmitter } from '@angular/core';
import { Observable, Subscription, timer } from 'rxjs';

export class Timer {
  // TODO: add subscribe/unsubscribe methods and don't expose timer
  get timer(): Observable<number> | null {
    return this._timer;
  }
  private _timer: Observable<number> | null;
  private delay = 0;
  private period = 1000;

  constructor() {
    this._timer = null;
  }

  start(): void {
    if (!this.timer) {
      this._timer = timer(this.delay, this.period);
    }
  }

  stop(): void {
    this._timer = null;
  }
}

export class CountdownTimer {
  get secondsLeft(): number {
    return Math.max(this._startTime - this.elapsed, 0);
  }
  get elapsed(): number {
    return this._secondsElapsedSinceLastStart + this._secondsElapsedAtLastPause;
  }
  get running(): boolean {
    return this.timerSubscription != undefined || this.timerSubscription != null;
  }
  set startTime(startTime: number) {
    this._startTime = startTime;
  }
  finished = new EventEmitter<void>();
  private _startTime: number;
  private _secondsElapsedSinceLastStart: number;
  private _secondsElapsedAtLastPause: number;
  private timer: Timer;
  private timerSubscription: Subscription | null;

  constructor(startTime?: number) {
    this._startTime = startTime ?? 0;
    this._secondsElapsedSinceLastStart = 0;
    this._secondsElapsedAtLastPause = 0;
    this.timer = new Timer();
    this.timerSubscription = null;
  }

  start(): void {
    if (this.running) {
      this.stop();
    }
    this.timer.start();
    if (this.timer.timer) {
      this.timerSubscription = this.timer.timer.subscribe(val => {
        this._secondsElapsedSinceLastStart = val;
        if (this.secondsLeft === 0) {
          this.finished.emit();
          this.stop();
        }
      })
    }
  }

  pause(): void {
    this.saveElapsed();
    this.stopTimer();
  }

  stop(): void {
    this.stopTimer();
    this.resetElapsed();
  }

  reset(): void {
    this.resetElapsed();
  }

  private saveElapsed(): void {
    this._secondsElapsedAtLastPause = this.elapsed;
  }

  private stopTimer(): void {
    this.timerSubscription?.unsubscribe();
    this.timerSubscription = null;
    this.timer.stop();
    this._secondsElapsedSinceLastStart = 0;
  }

  private resetElapsed(): void {
    this._secondsElapsedSinceLastStart = 0;
    this._secondsElapsedAtLastPause = 0;
  }
}
