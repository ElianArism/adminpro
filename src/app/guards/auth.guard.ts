import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanLoad, Route, UrlSegment } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad{

  constructor(private UsuarioService: UsuarioService, private router: Router) {}
  
  
  canLoad(route: Route, segments: import('@angular/router').UrlSegment[]): boolean | import('@angular/router').UrlTree | import('rxjs').Observable<boolean | import('@angular/router').UrlTree> | Promise<boolean | import('@angular/router').UrlTree> {
    return this.UsuarioService.validarToken().pipe(
      // si no esta autenticado, navega hacia el login
      tap(estaAutenticado => { if(!estaAutenticado) this.router.navigateByUrl('/auth/login') })
    );
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

    return this.UsuarioService.validarToken().pipe(
      // si no esta autenticado, navega hacia el login
      tap(estaAutenticado => { if(!estaAutenticado) this.router.navigateByUrl('/auth/login') })
    );
  }
  
  
}
