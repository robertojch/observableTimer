import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { TimerService } from './timer.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit,OnDestroy {

  @Output() onComplete = new EventEmitter();
  @Input() init:number = 20;
  private countDownEndRef :Subscription = null;
  constructor(public timer:TimerService) { }

  ngOnInit() {
    this.timer.restarCountDown(this.init);
    this.countDownEndRef = this.timer.countdownEnd$.subscribe(()=> {
      this.onComplete.emit();
    });

  }

  ngOnDestroy(){
    this.timer.destroy();
    this.countDownEndRef.unsubscribe();
  }



}
