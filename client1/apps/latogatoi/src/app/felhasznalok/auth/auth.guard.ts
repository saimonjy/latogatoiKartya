import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.auth.bejelentkezve.value) {
      return true;
    }
    return this.auth.beVanJelentkezve().pipe(map(res => {
      if(res.loggedIn) {
        this.auth.bejelentkezve.next(true);
        return true;
      } else {
        this.router.navigate(['bejelentkezes']);
        return false;
      }
    }))
  }
  
}
