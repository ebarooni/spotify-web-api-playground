import {NgModule} from "@angular/core";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatInputModule} from "@angular/material/input";

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FontAwesomeModule,
    MatInputModule
  ],
  exports: [
    BrowserAnimationsModule,
    FontAwesomeModule,
    MatInputModule
  ]
})
export class MaterialModule {}
