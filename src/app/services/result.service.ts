import { BehaviorSubject, Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResultService {
  sumTest = new BehaviorSubject<number>(0);
  public maxSumTestAnxiety = 99;
  setSumTest(value:number){
    this.sumTest.next(value);
  }
}
