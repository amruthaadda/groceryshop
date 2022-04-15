import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  isLoggedIn! : boolean;

  constructor(@Inject (SESSION_STORAGE) private storage: StorageService, private router: Router) { }

  canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.isLoggedIn = this.storage.get('isLoggedIn');
    if (this.isLoggedIn) {
      return true;
    }else{
      this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
      return false;
    }
      
  }
}
