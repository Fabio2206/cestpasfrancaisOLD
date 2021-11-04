import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {map} from 'rxjs/operators';

import { User, Role } from 'app/auth/models';
import { ToastrService } from 'ngx-toastr';
import { ConfigurationService } from "../configuration/config.service";

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  //public
  public currentUser: Observable<User>;

  //private
  private currentUserSubject: BehaviorSubject<User>;
  private headers = new HttpHeaders();

  /**
   *
   * @param {HttpClient} _http
   * @param {ToastrService} _toastrService
   * @param http
   * @param _configService
   */
  constructor(private _http: HttpClient,
              private _toastrService: ToastrService,
              private _configService: ConfigurationService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    this.headers = this.headers.set('Content-Type', 'application/json; charset=utf-8');

  }

  // récupération de l'utilisateur en cours
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  /**
   *  Confirmation si l'utilisateur est un administrateur
   */
  get isAdmin() {
    return this.currentUser && this.currentUserSubject.value.role === Role.Admin;
  }

  /**
   *  Confirmation si l'utilisateur est un professeur
   */
  get isClient() {
    return this.currentUser && this.currentUserSubject.value.role === Role.Client;
  }

  /**
   * Connexion d'un utilisateur
   *
   * @param email
   * @param password
   * @returns user
   */
  login(email: string, password: string) {

    return this._http
      .post<any>(this._configService.apiUrl + 'auth/connexion', { email, password })
      .pipe(
        map(user => {
          // login successful if there's a jwt token in the response
          if (user && user.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));

            // Display welcome toast!
            setTimeout(() => {
              this._toastrService.success(
                'You have successfully logged in as an ' +
                  user.role +
                  ' user to Vuexy. Now you can start to explore. Enjoy! 🎉',
                '👋 Welcome, ' + user.firstName + '!',
                { toastClass: 'toast ngx-toastr', closeButton: true }
              );
            }, 2500);

            // notify
            this.currentUserSubject.next(user);
          }

          return user;
        })
      );
  }

    /**
     * Création d'un utilisateur
     *
     */
    createNewUser(user: User) {

      return new Promise((resolve, reject) => {
        this._http.post(this._configService.apiUrl + 'auth/inscription', user, {headers: this.headers}).subscribe(
            (response) => {
              console.log(response);

              this._toastrService.success(
                          'Super ! Votre inscription a bien été effectué. 🎉',
                          '👋 Bienvenue',
                          { toastClass: 'toast ngx-toastr', closeButton: true, timeOut: 2500 },
                      );
              resolve(response);
            },
            (error) => {
              this._toastrService.error(
                  'Une erreur s\'est produite lors de votre inscription.',
                  'Erreur',
                  {toastClass: 'toast ngx-toastr', closeButton: true, timeOut: 2500},
              );
              reject(error);
            }
        );
      });

    }

  /**
   * Déconnexion d'un utilisateur
   *
   */
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    // notify
    this.currentUserSubject.next(null);
  }
}
