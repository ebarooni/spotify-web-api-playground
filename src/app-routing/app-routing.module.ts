import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {BuildComponent} from "../app/footer/build/build.component";
import {HomepageComponent} from "../app/homepage/homepage.component";

const routes: Routes = [
  { path: '', component:  HomepageComponent, title: 'Spotify web API playground' },
  { path: 'build', component: BuildComponent, title: 'Build | Spotify web API playground' }
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
