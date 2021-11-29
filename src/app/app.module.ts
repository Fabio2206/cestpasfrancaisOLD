import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import 'hammerjs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr'; // For auth after login toast
import {ContentHeaderModule} from "./layout/components/content-header/content-header.module";
import {RouterModule} from "@angular/router";

import { CoreModule } from '@core/core.module';
import { CoreCommonModule } from '@core/common.module';
import { CoreSidebarModule, CoreThemeCustomizerModule } from '@core/components';

import { coreConfig } from 'app/app-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import {JwtInterceptor} from "./auth/interceptors/jwt.interceptor";
import { AppRoutingModule } from './app-routing.module';

// Composant
import {MauvaisePageComponent} from "./main/erreur/mauvaise-page/mauvaise-page.component";
import {AuthLoginV2Component} from "./main/authentification/connexion/auth-login-v2.component";
import {AuthRegisterV2Component} from "./main/authentification/inscription/auth-register-v2.component";
import { ConfirmationCompteComponent } from './main/authentification/confirmation-compte/confirmation-compte.component';
import { InterdictionComponent } from './main/erreur/interdiction/interdiction.component';
import {ErrorInterceptor} from "./auth/interceptors/error.interceptor";
import { ProfilComponent } from './main/home/profil/profil.component';
import { AccueilComponent } from './main/home/accueil/accueil.component';
import { AutorisationComponent } from './main/home/administrateur/gestion/autorisation/autorisation.component';
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {NgSelectModule} from "@ng-select/ng-select";
import { AjouterAutorisationComponent } from './main/home/administrateur/gestion/ajouter-autorisation/ajouter-autorisation.component';

@NgModule({
  declarations: [
    AppComponent,
    MauvaisePageComponent,
    AuthLoginV2Component,
    AuthRegisterV2Component,
    ConfirmationCompteComponent,
    InterdictionComponent,
    ProfilComponent,
    AccueilComponent,
    AutorisationComponent,
    AjouterAutorisationComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        TranslateModule.forRoot(),

        // NgBootstrap
        NgbModule,
        ToastrModule.forRoot(),

        // Core modules
        CoreModule.forRoot(coreConfig),
        CoreCommonModule,
        CoreSidebarModule,
        CoreThemeCustomizerModule,

        // App modules
        LayoutModule,
        AppRoutingModule,
        RouterModule,
        ContentHeaderModule,
        NgxDatatableModule,
        NgSelectModule
    ],

  bootstrap: [AppComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ]
})
export class AppModule {}
