import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { CoreConfigService } from '@core/services/config.service';
import {confirmMDP} from "../../../auth/validator/confirmMDP.validator";
import {User} from "../../../auth/models";
import {AuthenticationService} from "../../../auth/services";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth-register-v2',
  templateUrl: './auth-register-v2.component.html',
  styleUrls: ['./auth-register-v2.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AuthRegisterV2Component implements OnInit {
  // Public
  public coreConfig: any;
  public inscriptionForm: FormGroup;
  public submitted = false;
  public erreurMessage: string;

  //Affichage du div pour avertir qu'un email a été envoyé
  public validerEmail: boolean = false;

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {CoreConfigService} _coreConfigService
   * @param {FormBuilder} _formBuilder
   * @param _authentificationService
   * @param _toastrService
   * @param router
   */
  constructor(private _coreConfigService: CoreConfigService,
              private _formBuilder: FormBuilder,
              private _authentificationService: AuthenticationService,
              private _toastrService: ToastrService,
              private router: Router) {
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

  // convenience getter for easy access to form fields
  get f() {
    return this.inscriptionForm.controls;
  }

  /**
   * On Submit
   */
  onSignup() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.inscriptionForm.invalid) {
      return;
    }

    if (this.inscriptionForm.valid){
      const user = new User();
      user.sexe = this.inscriptionForm.get('sexe')?.value;
      user.prenom = this.inscriptionForm.get('prenom')?.value;
      user.nom = this.inscriptionForm.get('nom')?.value;
      user.email = this.inscriptionForm.get('email')?.value.toLowerCase();
      user.motDePasse = this.inscriptionForm.get('motDePasse')?.value;
      user.acceptCond = this.inscriptionForm.get('acceptCond')?.value;
      user.date = new Date();

      this._authentificationService.inscription(user).subscribe(
          (response) => {
            this._toastrService.success(
                'Super ! Votre inscription a bien été effectué. 🎉',
                '👋 Bienvenue',
                { toastClass: 'toast ngx-toastr', closeButton: true, timeOut: 5000 },
            );

            this.validerEmail = true;
          }, (error) => {
            this._toastrService.error(
                'Une erreur s\'est produite lors de votre inscription.',
                'Erreur',
                {toastClass: 'toast ngx-toastr', closeButton: true, timeOut: 5000 },
            );
          }
      )

    } else {
      this.erreurMessage = "Une erreur est survenue dans votre inscription. Veuillez réessayer.";
    }
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this.inscriptionForm = this._formBuilder.group({
      sexe: ['', Validators.required],
      prenom: ['', [Validators.required, Validators.pattern('[A-Za-zÀ-ÿ]*'), Validators.minLength(2)]],
      nom: ['', [Validators.required, Validators.pattern('[A-Za-zÀ-ÿ]*'), Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      motDePasse: ['', [Validators.required, Validators.minLength(6)]],
      confirmMotDePasse: ['', Validators.required],
      acceptCond: [false, Validators.requiredTrue]
    },{
      validators: confirmMDP('motDePasse', 'confirmMotDePasse')
    })

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
