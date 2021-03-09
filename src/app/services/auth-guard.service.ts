import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { AuthService } from './auth.service';
@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    console.log(this.auth.isAuthenticated());
    if (!this.auth.isAuthenticated()) {
      console.log("yes");
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}