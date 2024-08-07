import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { MasterService } from '../shared/service/master.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private masterService:MasterService,
    private route:Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.masterService.isLoggedIn()){
        console.log("auth guard added.")
        return true;
        
      }
      else{
        console.log('No token found')
        this.route.navigate(['/']);
        return false;
      }
  }
  
}
