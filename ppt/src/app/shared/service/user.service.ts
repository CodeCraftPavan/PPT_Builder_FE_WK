import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APP_DI_CONFIG } from '../../app.config';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://10.0.0.163:8081/get-feed-back';
  constructor(private http: HttpClient) { }

  login(data: any) {
    return this.http.post<any>(APP_DI_CONFIG.parentDomain + APP_DI_CONFIG.endPoints.Authentication.Login, data);
  }

  verifyEmail(data: any) {
    return this.http.post<any>(APP_DI_CONFIG.parentDomain + APP_DI_CONFIG.endPoints.Authentication.VerifyEmail, data);
  }

  verifyOTP(data: any) {
    return this.http.post<any>(APP_DI_CONFIG.parentDomain + APP_DI_CONFIG.endPoints.Authentication.VerifyOTP, data);
  }

  createUser(data: any) {
    return this.http.post<any>(APP_DI_CONFIG.parentDomain + APP_DI_CONFIG.endPoints.Authentication.CreateUser, data);
  }


  mergePPt(data: any) {
    return this.http.post<any>(APP_DI_CONFIG.parentDomain + APP_DI_CONFIG.endPoints.split.splitPPT, data)
  }

  addmetadata(data: any) {
    return this.http.post<any>(APP_DI_CONFIG.parentDomain + APP_DI_CONFIG.endPoints.split.addmetadata, data)
  }

  getAllSlides(data: any) {
    return this.http.post<any>(APP_DI_CONFIG.parentDomain + APP_DI_CONFIG.endPoints.mergeSlides.getAllSlides, data)
  }

  searchSlides(data: any) {
    return this.http.post<any>(APP_DI_CONFIG.parentDomain + APP_DI_CONFIG.endPoints.mergeSlides.searchSlides, data)
  }

  mergeSlides(data: any) {
    return this.http.post<any>(APP_DI_CONFIG.parentDomain + APP_DI_CONFIG.endPoints.mergeSlides.mergeSlide, data)
  }

  submitFeedback(feedback: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, feedback);
  }

  addRating(data: any): Observable<any> {
    return this.http.post<any>(`http://10.0.0.163:8081/api/RatingSlides/AddRating`, { data });
  }



 
  resetPassword(email: string, newPassword: string): Observable<any> {
    return this.http.post<any>(`http://10.0.0.163:8081/api/AuthManagement/ResetPassword'`, { email, newPassword });
  }

  
}