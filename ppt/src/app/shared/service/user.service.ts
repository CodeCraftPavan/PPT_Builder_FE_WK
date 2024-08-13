import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APP_DI_CONFIG } from '../../app.config';
import { passwordReset } from 'src/app/utils/passwordReset';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://10.0.0.163:8081/get-feed-back';
  constructor(private http: HttpClient) { }

  login(data: any) {
    //return this.http.post<any>("https://localhost:44361/api/AuthManagement/Sign-In", data)
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
    //return this.http.post<any>('https://localhost:44361/syncFusion-Split', data)
    
    return this.http.post<any>(APP_DI_CONFIG.parentDomain + APP_DI_CONFIG.endPoints.Split.SplitPPT, data)
  }

  addmetadata(data: any) {
    //return this.http.post<any>('https://localhost:44361/insert-MetaData', data)
    return this.http.post<any>(APP_DI_CONFIG.parentDomain + APP_DI_CONFIG.endPoints.Split.Addmetadata, data)
  }

  getAllSlides(data: any) {
    //return this.http.post<any>("https://localhost:44361/get-all-slides-object-url", data)
    
    return this.http.post<any>(APP_DI_CONFIG.parentDomain + APP_DI_CONFIG.endPoints.MergeSlides.GetAllSlides, data)
  }

  searchSlides(data: any) {
    //return this.http.post<any>("https://localhost:44361/search-slide", data)
    return this.http.post<any>(APP_DI_CONFIG.parentDomain + APP_DI_CONFIG.endPoints.MergeSlides.SearchSlides, data)
  }

  mergeSlides(data: any) {
    return this.http.post<any>(APP_DI_CONFIG.parentDomain + APP_DI_CONFIG.endPoints.MergeSlides.MergeSlide, data)
  }

  submitFeedback(feedback: any): Observable<any> {
    //return this.http.post(`https://localhost:44361/get-feed-back`, feedback);
    return this.http.post(`${this.baseUrl}`, feedback);
  }

  addRating(data: any): Observable<any> {
    //return this.http.post<any>('https://localhost:44361/api/RatingSlides/AddRating',data);
    
    return this.http.post<any>(APP_DI_CONFIG.parentDomain + APP_DI_CONFIG.endPoints.Rating.AddRating,data);
  }

 
  resetPassword(data: passwordReset) {
    return this.http.post<any>(`http://10.0.0.163:8081/api/AuthManagement/ResetPassword`,  data);
  }

  getMetaData(data: number) {
    return this.http.post<any>(`http://10.0.0.163:8081/get-metaData`,  data);
  }

  
}