import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import 'hammerjs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr'; // For auth after login toast

import { CoreModule } from '@core/core.module';
import { CoreCommonModule } from '@core/common.module';
import { CoreSidebarModule, CoreThemeCustomizerModule } from '@core/components';

import { coreConfig } from 'app/app-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { AppRoutingModule } from './app-routing.module';

// Composant
import {ErreurComponent} from "./main/erreur/erreur.component";
import {RouterModule} from "@angular/router";
import {AuthLoginV2Component} from "./main/authentication/auth-login-v2/auth-login-v2.component";
import {AuthRegisterV2Component} from "./main/authentication/auth-register-v2/auth-register-v2.component";
import {SampleComponent} from "./main/sample/sample.component";
import {HomeComponent} from "./main/sample/home.component";
import {ContentHeaderModule} from "./layout/components/content-header/content-header.module";
import { EmailVerificationComponent } from './main/email-verification/email-verification.component';

@NgModule({
  declarations: [
    AppComponent,
    ErreurComponent,
    AuthLoginV2Component,
    AuthRegisterV2Component,
    SampleComponent,
    HomeComponent,
    EmailVerificationComponent
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
    ContentHeaderModule

  ],

  bootstrap: [AppComponent]
})
export class AppModule {}
