import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let result = request.url.includes("AuthManagement/Sign-In");

    if(result){
      return next.handle(request);
    }

    let Token: any = localStorage.getItem("Token");
      const Authorization = Token;
    return next.handle(request.clone({ setHeaders: { Authorization } }));

  }
}
