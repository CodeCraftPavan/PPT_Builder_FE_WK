import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  private cartSource = new BehaviorSubject(null);
  currentCatObj = this.cartSource.asObservable();

  sendMemberIdAndCartId(cartObj: any) {
    this.cartSource.next(cartObj);
  }

  private cartData = new BehaviorSubject(null);
  oldCartData = this.cartData.asObservable();

  sendOldCartData(cartObj: any) {
    this.cartData.next(cartObj);
  }



}
