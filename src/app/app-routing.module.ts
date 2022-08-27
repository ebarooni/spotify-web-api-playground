import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {RedirectCallbackComponent} from "./redirect-callback/redirect-callback.component";
import {LoginComponent} from "./login/login.component";

const routes: Routes = [
  {path: 'callback', component: RedirectCallbackComponent},
  {path: 'login', component: LoginComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
