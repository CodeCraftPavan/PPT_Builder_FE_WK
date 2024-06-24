import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APP_DI_CONFIG } from './app.config';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

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
}
