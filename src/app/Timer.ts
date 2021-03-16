import { Observable, Subscription, timer } from 'rxjs';

export class Timer {
  // TODO: add subscribe/unsubscribe methods and don't expose timer
  get timer(): Observable<number> | null { return this._timer; }
  private _timer: Observable<number> | null;
  private delay = 0;
  private period = 1000;

  constructor() {
    this._timer = null;
  }

  start() {
    if (!this.timer) {
      this._timer = timer(this.delay, this.period);
    }
  }

  stop() {
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
  private _startTime: number;
  private _secondsElapsedSinceLastStart: number;
  private _secondsElapsedAtLastPause: number;
  private timer: Timer;
  private timerSubscription: Subscription | null;

  constructor() {
    this._startTime = 0;
    this._secondsElapsedSinceLastStart = 0;
    this._secondsElapsedAtLastPause = 0;
    this.timer = new Timer();
    this.timerSubscription = null;
  }

  start(startTime: number) {
    if (this.running) {
      this.stop();
    }
    console.log("Starting timer.")
    this._startTime = startTime;
    this.timer.start();
    if (this.timer.timer) {
      this.timerSubscription = this.timer.timer.subscribe(val => {
        this._secondsElapsedSinceLastStart = val;
      })
    }
  }

  pause() {
    console.log("Pausing timer.");
    this.saveElapsed();
    this.stopTimer();
  }

  stop() {
    console.log("Stopping timer.");
    this.stopTimer();
    this.resetElapsed();
  }

  reset() {
    console.log("Resetting timer.");
    this.resetElapsed();
  }

  private saveElapsed() {
    this._secondsElapsedAtLastPause = this.elapsed;
  }

  private stopTimer() {
    this.timerSubscription?.unsubscribe();
    this.timerSubscription = null;
    this.timer.stop();
    this._secondsElapsedSinceLastStart = 0;
  }

  private resetElapsed() {
    this._secondsElapsedSinceLastStart = 0;
    this._secondsElapsedAtLastPause = 0;
  }
}