import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {MaterialModule} from "../material/material.module";
import {HttpClientModule} from "@angular/common/http";
import { AppRoutingModule } from '../app-routing/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './flows/implicit-grant/login/login.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TableComponent } from './table/table.component';
import { InputFormComponent } from './header/input-form/input-form.component';
import { ClientCredentialsComponent } from './flows/client-credentials/client-credentials.component';
import {ReactiveFormsModule} from "@angular/forms";
import {AuthCredentialsStore} from "./header/input-form/auth-credentials.store";
import { WikiComponent } from './header/wiki/wiki.component';
import { SocialMediaIconsComponent } from './footer/social-media-icons/social-media-icons.component';
import { DeleteCredentialsComponent } from './header/input-form/delete-credentials/delete-credentials.component';
import { HeaderComponent } from './header/header.component';
import { FlowsComponent } from './flows/flows.component';
import { PlaceholderComponent } from './flows/placeholder/placeholder.component';
import { ImplicitGrantComponent } from './flows/implicit-grant/implicit-grant.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    FooterComponent,
    NavbarComponent,
    TableComponent,
    InputFormComponent,
    ClientCredentialsComponent,
    WikiComponent,
    SocialMediaIconsComponent,
    DeleteCredentialsComponent,
    HeaderComponent,
    FlowsComponent,
    PlaceholderComponent,
    ImplicitGrantComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthCredentialsStore
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
