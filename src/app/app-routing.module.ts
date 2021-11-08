import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";

// Composants
import {ErreurComponent} from "./main/erreur/erreur.component";
import {HomeComponent} from "./main/sample/home.component";
import {AuthLoginV2Component} from "./main/authentication/auth-login-v2/auth-login-v2.component";
import {AuthRegisterV2Component} from "./main/authentication/auth-register-v2/auth-register-v2.component";
import {SampleComponent} from "./main/sample/sample.component";
import {EmailVerificationComponent} from "./main/email-verification/email-verification.component";

const appRoutes: Routes = [

  /************************** Application **************************/
  { path: 'connexion', component: AuthLoginV2Component },
  { path: 'inscription', component: AuthRegisterV2Component },
  { path: 'verification', component: EmailVerificationComponent },

  /************************** Espace client **************************/
  { path: 'sample', component: SampleComponent, data: { animation: 'sample'} },
  { path: 'home', component: HomeComponent, data: { animation: 'home' }},

  /************************** Divers **************************/
  { path: '', component: AuthLoginV2Component },
  { path: '**', component: ErreurComponent }

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
