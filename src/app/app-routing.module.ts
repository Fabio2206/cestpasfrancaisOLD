import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {Role} from "./auth/models";

// Composants
import {MauvaisePageComponent} from "./main/erreur/mauvaise-page/mauvaise-page.component";
import {AuthLoginV2Component} from "./main/authentification/connexion/auth-login-v2.component";
import {AuthRegisterV2Component} from "./main/authentification/inscription/auth-register-v2.component";
import {ConfirmationCompteComponent} from "./main/authentification/confirmation-compte/confirmation-compte.component";
import {InterdictionComponent} from "./main/erreur/interdiction/interdiction.component";
import {AuthGuard} from "./auth/guards/auth.guards";
import {ProfilComponent} from "./main/home/profil/profil.component";
import {AccueilComponent} from "./main/home/accueil/accueil.component";

const appRoutes: Routes = [

  /************************** Application **************************/
  { path: 'connexion', component: AuthLoginV2Component },
  { path: 'inscription', component: AuthRegisterV2Component },
  { path: 'confirmation/:codeInscription', component: ConfirmationCompteComponent },

  /************************** Espace client **************************/
  { path: 'accueil', component: AccueilComponent, canActivate: [AuthGuard], data: { animation: 'fadeIn' }},
  { path: 'profil', component: ProfilComponent, canActivate: [AuthGuard], data: { animation: 'fadeIn', roles: [Role.Admin] }},

  /************************** Divers **************************/
  { path: 'interdiction', component: InterdictionComponent },
  { path: '', component: AuthLoginV2Component },
  { path: '**', component: MauvaisePageComponent }

];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes, {
      scrollPositionRestoration: 'enabled', // Add options right here
      relativeLinkResolution: 'legacy'
    }),
  ]
})
export class AppRoutingModule { }
