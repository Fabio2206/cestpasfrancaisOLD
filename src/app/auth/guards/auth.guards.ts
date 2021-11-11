import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from 'app/auth/services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  /**
   *
   * @param {Router} _router
   * @param {AuthenticationService} _authenticationService
   */
  constructor(private _router: Router, private _authenticationService: AuthenticationService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this._authenticationService.currentUserValue;

    if (currentUser) {
      // On regarde si la route comporte un role necessaire pour y avoir accès
      if (route.data.roles && route.data.roles.indexOf(currentUser.role) === -1) {
        // Redirection vers l'avertissement d'interdiction si l'utilisation n'a pas le rôle requis
        this._router.navigate(['/interdiction']);
        return false;
      }

      // Si l'utilisateur est autorisé on retourne true
      return true;
    }

    // Si l'utilisateur n'est pas connecté
    this._router.navigate(['/'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
