import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {
  isAdmin! : boolean;

  constructor(@Inject (SESSION_STORAGE) private storage: StorageService, private route : Router) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      this.isAdmin = this.storage.get('isAdmin');
      if(this.isAdmin) {
        return true;
      }else {
        this.route.navigate(['/']);
        return false;
      }

  }
}
