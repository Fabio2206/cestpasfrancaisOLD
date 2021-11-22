import { Component, OnInit } from '@angular/core';
import {Subject} from "rxjs";
import {AuthenticationService} from "../../../auth/services";
import {User} from "../../../auth/models";
import {FormBuilder, Validators} from "@angular/forms";
import {confirmMDP} from "../../../auth/validator/confirmMDP.validator";
import {ToastrService} from "ngx-toastr";
import {valueReferenceToExpression} from "@angular/compiler-cli/src/ngtsc/annotations/src/util";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})

export class ProfilComponent implements OnInit {
  // public
  public dataUser: User;
  public chargement: boolean = false;
  public contentHeader: object;

  public passwordTextTypeOld = false;
  public passwordTextTypeNew = false;
  public passwordTextTypeRetype = false;

  // private
  private _unsubscribeAll: Subject<any>;

  formMDP = this.formBuilder.group({
    ancienMotDePasse: ['', Validators.required],
    nouveauMotDePasse: ['', [Validators.required, Validators.minLength(6)]],
    confirmMotDePasse: ['', Validators.required]
  },{
    validators: confirmMDP('nouveauMotDePasse', 'confirmMotDePasse')
  })

  /**
   * Constructor
   *
   */
  constructor(private _authentification: AuthenticationService, private formBuilder: FormBuilder, private _toastrService: ToastrService) {
    this._unsubscribeAll = new Subject();
  }

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Toggle Password Text Type Old
   */
  togglePasswordTextTypeOld() {
    this.passwordTextTypeOld = !this.passwordTextTypeOld;
  }

  /**
   * Toggle Password Text Type New
   */
  togglePasswordTextTypeNew() {
    this.passwordTextTypeNew = !this.passwordTextTypeNew;
  }

  /**
   * Toggle Password Text Type Retype
   */
  togglePasswordTextTypeRetype() {
    this.passwordTextTypeRetype = !this.passwordTextTypeRetype;
  }

  onSubmit(){
    if (this.formMDP.valid) {
      const ancienMotDePasse = this.formMDP.get('ancienMotDePasse')?.value;
      const nouveauMotDePasse = this.formMDP.get('nouveauMotDePasse')?.value;

      this._authentification.newPwd(ancienMotDePasse,nouveauMotDePasse).subscribe(r=>{
        // Si tout est correct
        if (r.value){
          this._toastrService.success(
              'Votre mot de passe a bien été modifié.',
              'Modification effectué !',
              {toastClass: 'toast ngx-toastr', closeButton: true, timeOut: 3000 },
          );
        }

        // Si l'ancien mot de passe ne correspond pas
        if (r.badPwd){
          this._toastrService.error(
              'Erreur dans le formulaire.',
              'Erreur !',
              {toastClass: 'toast ngx-toastr', closeButton: true, timeOut: 3000 },
          );
        }
      })
    } else {
      this._toastrService.error(
          'Erreur dans le formulaire.',
          'Erreur !',
          {toastClass: 'toast ngx-toastr', closeButton: true, timeOut: 3000 },
      );
    }
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit() {
    // content header
    this.contentHeader = {
      headerTitle: 'Profil',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Accueil',
            isLink: true,
            link: '/accueil'
          },
          {
            name: 'Profil',
            isLink: false
          },
        ]
      }
    };

    this.chargement = true;
    this._authentification.getCurrentUser().subscribe(r => {
      this.dataUser = r;
      this.chargement = false;
    })
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
