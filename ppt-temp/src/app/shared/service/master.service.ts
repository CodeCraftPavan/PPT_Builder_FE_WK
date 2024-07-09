import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';

const TOKEN_KEY = 'auth-token';;
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
 
  private sharedData: Subject<any> = new Subject<any>();
  sharedData$: Observable<any> = this.sharedData.asObservable();
  private message!: any;
  metricsData :any

  constructor(private router: Router) { }

  isLoggedIn(){
    return localStorage.getItem(TOKEN_KEY) != null;
  }

  isLoggedOut(){
    localStorage.clear();
    return this.router.navigate(['/'])
  }

  public saveToken(token: string): void { 
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
   
  }

  public getToken(): string | null {
    return window.localStorage.getItem(TOKEN_KEY);
  }


  sendData(data:any) {
    this.sharedData.next(data);
  }

  sendProjectDetails(newMessage:any) {
    this.message = newMessage;
  }
  getProjectDetails() {
    return this.message;
  }

  sendMetricsDetails(data: any) {
    this.metricsData = data;
  }
  getMetricsDetails(){
    return this.metricsData;
  }

  
}