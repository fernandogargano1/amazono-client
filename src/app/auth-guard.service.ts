import { Injectable } from '@angular/core';
import { 
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';

import { UserLoggedInService } from './user-logged-in.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      
      

      if (localStorage.getItem('token')) {
          //this.router.navigate(['/']);
          // return false;
          return state.url.startsWith('/profile')
              ? true
              : (this.router.navigate(['/']), false);      
      } else {         
          // return true;
          return state.url.startsWith('/profile') 
              ? (this.router.navigate(['/']), false)
              : true;
      }
  }

}
