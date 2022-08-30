import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {MaterialModule} from "../material/material.module";
import {HttpClientModule} from "@angular/common/http";
import {ClientCredentialsService} from "./client-credentials.service";
import { AppRoutingModule } from '../app-routing/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TableComponent } from './table/table.component';
import { InputFormComponent } from './client-credentials-flow/input-form/input-form.component';
import { ClientCredentialsFlowComponent } from './client-credentials-flow/client-credentials-flow.component';
import {ReactiveFormsModule} from "@angular/forms";
import { ErrorTableComponent } from './table/error-table/error-table.component';
import {AuthCredentialsRepository} from "./client-credentials-flow/input-form/auth-credentials.repository";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    FooterComponent,
    NavbarComponent,
    TableComponent,
    InputFormComponent,
    ClientCredentialsFlowComponent,
    ErrorTableComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    ClientCredentialsService,
    AuthCredentialsRepository
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
