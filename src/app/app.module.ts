import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {MaterialModule} from "../material/material.module";
import {HttpClientModule} from "@angular/common/http";
import { AppRoutingModule } from '../app-routing/app-routing.module';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TableComponent } from './table/table.component';
import { InputFormComponent } from './homepage/header/input-form/input-form.component';
import { ClientCredentialsComponent } from './homepage/flows/client-credentials/client-credentials.component';
import {ReactiveFormsModule} from "@angular/forms";
import {AuthCredentialsStore} from "./homepage/header/input-form/auth-credentials.store";
import { WikiComponent } from './homepage/header/wiki/wiki.component';
import { SocialMediaIconsComponent } from './footer/social-media-icons/social-media-icons.component';
import { DeleteCredentialsComponent } from './homepage/header/input-form/delete-credentials/delete-credentials.component';
import { HeaderComponent } from './homepage/header/header.component';
import { FlowsComponent } from './homepage/flows/flows.component';
import { PlaceholderComponent } from './homepage/flows/placeholder/placeholder.component';
import { ImplicitGrantComponent } from './homepage/flows/implicit-grant/implicit-grant.component';
import { ImplicitGrantDialogComponent } from './homepage/flows/implicit-grant/implicit-grant-dialog/implicit-grant-dialog.component';
import { AuthorizationCodeComponent } from './homepage/flows/authorization-code/authorization-code.component';
import { AuthorizationCodeDialogComponent } from './homepage/flows/authorization-code/authorization-code-dialog/authorization-code-dialog.component';
import { BuildComponent } from './footer/build/build.component';
import { HomepageComponent } from './homepage/homepage.component';
import { VersionComponent } from './navbar/version/version.component';

@NgModule({
  declarations: [
    AppComponent,
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
    ImplicitGrantComponent,
    ImplicitGrantDialogComponent,
    AuthorizationCodeComponent,
    AuthorizationCodeDialogComponent,
    BuildComponent,
    HomepageComponent,
    VersionComponent,
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
