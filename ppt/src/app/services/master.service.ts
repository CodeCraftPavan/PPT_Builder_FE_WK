import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APP_DI_CONFIG } from './app.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  private baseUrl = 'http://10.0.0.163:8081/get-feed-back';
  constructor(private http: HttpClient)
  { }

 login(data:any){
   return this.http.post<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Authentication.signin,data)
 }

 mergePPt(data:any){
  return this.http.post<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.split.splitPPT,data)
}

addmetadata(data:any){
  return this.http.post<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.split.addmetadata,data)
}

getAllSlides(){
  return this.http.get<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.mergeSlides.getAllSlides)
}

searchSlides(data:any){
  return this.http.get<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.mergeSlides.searchSlides+ `?searchKeyWord=${data}`)
}

mergeSlides(data:any){
  return this.http.post<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.mergeSlides.mergeSlide,data)
}

submitFeedback(feedback: any): Observable<any> {
  return this.http.post(`${this.baseUrl}`, feedback);
}

sendOtp(email: string) {
  //return this.http.post<any>(`https://localhost:44361/api/AuthManagement/VerifyEmail`, { email });
  return this.http.post<any>(`http://10.0.0.163:8081/api/AuthManagement/VerifyEmail`, { email });
}

// sendOtp(email: string): Observable<any> {
//   return this.http.post<any>(`https://localhost:44361/api/AuthManagement/VerifyEmail`, { email });
//   //return this.http.post<any>(`http://10.0.0.163:8081/api/AuthManagement/VerifyEmail`, { email });
// }

verifyOtp(email: string, otp: string): Observable<any> {
  //return this.http.post<any>(`https://localhost:44361/api/AuthManagement/VerifyOTP`, { otp, email });
  return this.http.post<any>(`http://10.0.0.163:8081/api/AuthManagement/VerifyOTP`, { otp, email });
}

createUser(data: any): Observable<any> {
  return this.http.post<any>(`http://10.0.0.163:8081/api/AuthManagement/Create-User `, data);
}
}
