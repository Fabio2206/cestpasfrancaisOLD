import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import { User, Role } from 'app/auth/models';
import {environment} from "../../../../environments/environment";
import {ConfigService} from "../configuration/config.service";

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  //public
  public currentUser: Observable<User>;

  //private
  private currentUserSubject: BehaviorSubject<User>;
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  /**
   * @param {HttpClient} _http
   * @param _configService
   */
  constructor(private _http: HttpClient,
              private _configService: ConfigService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // récupération de l'utilisateur en cours
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  // Vérification si l'utilisateur est un administrateur
  get isAdmin() {
    return this.currentUser && this.currentUserSubject.value.role === Role.Admin;
  }

  // Vérification si l'utilisateur est un utilisateur
  get isUser() {
    return this.currentUser && this.currentUserSubject.value.role === Role.User;
  }

  /**
   * Connexion d'un utilisateur
   *
   * @param email
   * @param motDePasse
   * @returns user
   */
  connexion(email: string, motDePasse: string) {
    return this._http
      .post<any>(`${environment.apiUrl}/auth/connection`, { email, motDePasse })
      .pipe(
        map(user => {
          // login successful if there's a jwt token in the response
          if (user && user.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));

            // mise à jour avec l'utilisateur connecté
            this.currentUserSubject.next(user);
          }

          return user;
        })
      );
  }

  /**
   * Création d'un utilisateur
   *
   * @param user
   */
  inscription(user: User): Observable<User> {
    return this._http.post<any>(`${environment.apiUrl}/auth/registration`, user, {headers: this.headers, observe:'body', responseType: 'json'})
        .pipe(catchError(this._configService.handleError))
  }

  /**
   * Activation du compte
   *
   * @param codeInscription
   */
  confirmEmail(codeInscription: string) {
    return this._http.post<any>(`${environment.apiUrl}/auth/confirmation/`,
        {codeInscription: codeInscription},
        {headers: this.headers, observe:'body', responseType: 'json'})
        .pipe(catchError(this._configService.handleError))
  }

  /**
   * Déconnexion d'un utilisateur
   *
   */
  deconnexion() {
    // suppression du compte utilisateur enregistré dans le localstorage
    localStorage.removeItem('currentUser');
    // notify
    this.currentUserSubject.next(null);
  }
}
