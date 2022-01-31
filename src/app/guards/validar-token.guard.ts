import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ValidarTokenGuard implements CanActivate, CanLoad {

  constructor(
    private _authService: AuthService,
    private _router     : Router
  ) { }

  canActivate(): Observable<boolean> | boolean {
    console.log('canActivate');
    return this._authService.validarToken().pipe( tap( valid => {
      if ( !valid ) {
        this._router.navigateByUrl('/auth');
      }
    }));
  }
  canLoad(): Observable<boolean> | boolean {
    console.log('canLoad');
    return this._authService.validarToken().pipe( tap( valid => {
      if ( !valid ) {
        this._router.navigateByUrl('/auth');
      }
    }));
  }
}
