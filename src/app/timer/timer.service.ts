import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  private countdownTimerRef: any = null;
  private init:number = 0;
  private countdownSource = new BehaviorSubject<number>(0); //Observable para tener el contador
  private countdownEndSource = new Subject(); //Observable para emitir un evento cuando el contador termine
  public countdown$ = this.countdownSource.asObservable();//Exponemos el observable para que sea consumido desde el componente
  /*
    countdownEnd$ , exponemos un observable para emitir un evento cuando el contador
    llegue a 0. Es publico porque queremos que sea expuesto al componente.
  */
  public countdownEnd$ = this.countdownEndSource.asObservable();

  constructor() { }

  // Este es el que hace la resta y emite un nuevo valor en el observable
  private doCountDown(){
    if (this.countdownSource.getValue() >0){
      this.countdownTimerRef = setTimeout(() => {
        this.countdownSource.next(this.countdownSource.getValue()-1);
        this.processCountDown();
      }, 1000);
    }
  }

  // valida si el ultimo valor emitido es 0 sino seguimos restando
  private processCountDown(){
    if (this.countdownSource.getValue() <=0){
      this.countdownEndSource.next();
    }
    else {
      this.doCountDown();
    }
  }

  // limpia la referencia al contador.
  private clearTimeout(){
    if (this.countdownTimerRef){
      this.countdownTimerRef = null;
    }
  }

  // Reinicia el timer
  restarCountDown(init?){
    if (init){
      this.init = init;
    }
    if (this.init && this.init >0){
      this.clearTimeout();
      //emitimos el valor inicial ingresado en el componente
      this.countdownSource.next(this.init);
      //realizmos la resta
      this.doCountDown();
    }
  }

  destroy():void{
    this.clearTimeout();
  }
}
