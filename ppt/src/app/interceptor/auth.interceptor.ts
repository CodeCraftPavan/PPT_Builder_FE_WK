import { Injectable } from '@angular/core';
import {HttpRequest,HttpHandler,HttpEvent,HttpInterceptor, HttpErrorResponse} from '@angular/common/http';
import { BehaviorSubject, catchError, filter, finalize, Observable, switchMap, take, throwError } from 'rxjs';
import { MasterService } from '../shared/service/master.service';


const TOKEN_HEADER_KEY = 'Authorization';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  
  isRefreshingToken: boolean = false;
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<Object>> {

    let result = req.url.includes("AuthManagement/Sign-In");

    if(result){
      return next.handle(req);
    }
    let Token: any = localStorage.getItem("Token");
    const Authorization = Token;
   // return next.handle(req.clone({ setHeaders: { Authorization } }));
    return  Token !== null ? next.handle(req.clone({ setHeaders: { Authorization } })) : next.handle(req.clone({}));
    

  

  //   let authReq = req;
  //   const token = this.masterService.getToken();
  // //  console.log(token,'logged token')
  //   if (token != null) {
  //     authReq = this.addTokenHeader(req, token);
  //   }

  //   return next.handle(authReq).pipe(catchError(error => {
  //     if (error instanceof HttpErrorResponse && error.status === 401) {
  //       return this.handle401Error(authReq, next);
  //     }

  //     return throwError(error);
  //   }));
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (this.isRefreshing == false){
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      // const token :any= this.masterService.getToken();
      // const refreshToken:any = this.masterService.getRefreshToken();
      // var refreshTokenObj = new FormData();
      // refreshTokenObj.append('accessToken',token);
      // refreshTokenObj.append('refreshToken',refreshToken);

      // if (token)    
      //   return this._commonService.refreshToken(refreshTokenObj).pipe(switchMap((newtoken: any) => {
      //       this.isRefreshing = false;
      //      // console.log(newtoken.body.access_token,'newtoken in isRefreshing')
      //       let newToken = newtoken.body.access_token;
      //       this.masterService.saveToken(newToken);
      //       this.refreshTokenSubject.next(newToken);
            
      //       return next.handle(this.addTokenHeader(request, newToken));
      //     }),
      //     catchError((err) => {
      //       this.isRefreshing = false;
      //       this.masterService.signOut();
      //       return throwError(err);
      //     })
      //   );
   }

    return this.refreshTokenSubject.pipe(filter(token => token !== null),take(1),
      switchMap((token) => next.handle(this.addTokenHeader(request, token)))
    );
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
  //  console.log(token,'token in addtokenheader')
    return request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
  }

}





