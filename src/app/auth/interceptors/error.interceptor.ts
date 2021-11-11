import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from 'app/auth/services';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  /**
   * @param {Router} _router
   * @param {AuthenticationService} _authenticationService
   */
  constructor(private _router: Router, private _authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(err => {
        if ([401, 403].indexOf(err.status) !== -1) {
          // Si l'API renvoie une erreur 401 ou 403
          this._router.navigate(['/interdiction']);

          // Déconnexion de l'utilisateur malicieux
           this._authenticationService.deconnexion();
           //location.reload(true);
        }
        // On renvoie l'erreur
        const error = err.error.message || err.statusText;
        return throwError(error);
      })
    );
  }
}
