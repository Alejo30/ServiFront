import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthService } from './core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ReservaGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.hasUser().pipe(
      map(user => user === null ? false: true),
      tap(hasUser => {
        if (!hasUser) {
          this.router.navigate(['/auth/login']);
        }else{
          this.router.navigate(['/turno/']);
        }
      })  );
  }
  
}
