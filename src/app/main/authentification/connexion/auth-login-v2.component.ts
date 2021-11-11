import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { CoreConfigService } from '@core/services/config.service';
import {AuthenticationService} from "../../../auth/services";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-auth-login-v2',
  templateUrl: './auth-login-v2.component.html',
  styleUrls: ['./auth-login-v2.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AuthLoginV2Component implements OnInit {
  //  Public
  public coreConfig: any;
  public loginForm: FormGroup;
  public loading = false;
  public submitted = false;
  public returnUrl: string;
  public error = '';
  public passwordTextType: boolean;

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {CoreConfigService} _coreConfigService
   * @param _formBuilder
   * @param _route
   * @param _router
   * @param _authenticationService
   * @param _toastrService
   */
  constructor(
    private _coreConfigService: CoreConfigService,
    private _formBuilder: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router,
    private _authenticationService: AuthenticationService,
    private _toastrService: ToastrService
  ) {
    this._unsubscribeAll = new Subject();

    // Configure the layout
    this._coreConfigService.config = {
      layout: {
        navbar: {
          hidden: true
        },
        menu: {
          hidden: true
        },
        footer: {
          hidden: true
        },
        customizer: false,
        enableLocalStorage: false
      }
    };
  }

  // Récupération des données entrée dans le formulaire
  get f() {
    return this.loginForm.controls;
  }

  // Affichage du mot de passe dans le formulaire
  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  // Lancement de la connexion
  onSubmit() {
    this.submitted = true;
    this.loading = true;

    // On sort de la fonction si le formulaire est invalide
    if (this.loginForm.invalid) {
      this.loading = false;
      return;
    }

    this._authenticationService.connexion(this.f.email.value.toLowerCase(), this.f.motDePasse.value).subscribe(
        (data) => {
          if (data.badUser){
            this._toastrService.error(
                'Mauvais mot de passe ou adresse email.',
                'Erreur !',
                {toastClass: 'toast ngx-toastr', closeButton: true, timeOut: 5000 },
            );
          } else {
            this._toastrService.success(
                'Super, vous êtes bien connecté. 🎉',
                '👋 Bonjour, ' + JSON.parse(localStorage.getItem('currentUser')).prenom,
                { toastClass: 'toast ngx-toastr', closeButton: true, timeOut: 3000 },
            );
            this._router.navigate(['/accueil']);
          }

          this.loading = false;
        },
    (error)=> {
          console.log(error);
          this.loading = false;
        }
    );
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Redirection automatique si l'utilisateur est déjà connecté
    if (this._authenticationService.currentUserValue) {
      this._router.navigate(['/accueil']);
    }

    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      motDePasse: ['', Validators.required]
    });

    // Récupération d'un lien en paramètre lors de la connexion iminente ou redirection à la connexion
    this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';

    // Subscribe to config changes
    this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
      this.coreConfig = config;
    });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
