import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {
  constructor(private authService: AuthService,private router: Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     this.authService.getAuthToken();
    return this.authService.currentUser().pipe(map(user =>{
         if(user){
          this.authService.loginUser.next(user)
          return true
         }
        
         return this.router.createUrlTree(['/sign-in'])
     }))
  }
  
}
