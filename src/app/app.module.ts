import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from "../material/material.module";
import {HttpClientModule} from "@angular/common/http";
import {ClientCredentialsService} from "./client-credentials.service";
import { AppRoutingModule } from '../app-routing/app-routing.module';
import { RedirectCallbackComponent } from './redirect-callback/redirect-callback.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    RedirectCallbackComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    ClientCredentialsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
