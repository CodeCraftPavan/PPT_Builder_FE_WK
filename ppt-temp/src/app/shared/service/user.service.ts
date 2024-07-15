import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APP_DI_CONFIG } from '../../app.config';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://10.0.0.163:8081/get-feed-back';
  constructor(private http: HttpClient)
  { }

 login(data:any){
   return this.http.post<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Authentication.signin,data);
   //return this.http.post<any>(`https://localhost:44361/api/AuthManagement/Sign-In`,  data );
 }

 mergePPt(data:any){
  return this.http.post<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.split.splitPPT,data)
}

addmetadata(data:any){
  return this.http.post<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.split.addmetadata,data)
}

getAllSlides(data:any){
  return this.http.post<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.mergeSlides.getAllSlides,data)
}

searchSlides(data: any){
  return this.http.get<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.mergeSlides.searchSlides+ `?searchKeyWord=${data}`)
}

mergeSlides(data:any){
  return this.http.post<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.mergeSlides.mergeSlide,data)
}

submitFeedback(feedback: any): Observable<any> {
  return this.http.post(`${this.baseUrl}`, feedback);
}

addRating(data: any): Observable<any> {
  return this.http.post<any>(`http://10.0.0.163:8081/api/RatingSlides/AddRating`, { data });
}

sendOtp(email: any) {
  return this.http.post<any>(`http://10.0.0.163:8081/api/AuthManagement/VerifyEmail`, { email }  );
}


verifyOtp(otp: string, email: string): Observable<any> {
  return this.http.post<any>(`http://10.0.0.163:8081/api/AuthManagement/VerifyOTP`, { otp, email });
}

createUser(data: any): Observable<any> {
  return this.http.post<any>(`http://10.0.0.163:8081/api/AuthManagement/Create-User `, data);
}

sendResetPasswordEmail(data: any): Observable<any> {
  return this.http.post<any>(`http://10.0.0.163:8081/api/AuthManagement/VerifyEmail `, data);
}

resetPassword(email: string, newPassword: string): Observable<any> {
  return this.http.post<any>(`http://10.0.0.163:8081/api/AuthManagement/ResetPassword'`, { email, newPassword });
}

signUp(userData: any): Observable<any> {
  const url = 'http://10.0.0.163:8081/api/AuthManagement/Create-User';
  return this.http.post<any>(url, userData);
}
}