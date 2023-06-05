import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const usuarioLogueado = localStorage.getItem('usuarioLogueado');
    if (usuarioLogueado == 'true') {
      return true;
    } else {
      return this.router.navigate(['']).then(() => false).catch(error => {
        console.error('Error al navegar:', error);
        return false;
      });
    }
  }
  
}
