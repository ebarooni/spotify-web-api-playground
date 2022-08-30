import {NgModule} from "@angular/core";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatInputModule} from "@angular/material/input";
import {MatTooltipModule} from "@angular/material/tooltip";

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FontAwesomeModule,
    MatInputModule,
    MatTooltipModule
  ],
  exports: [
    BrowserAnimationsModule,
    FontAwesomeModule,
    MatInputModule,
    MatTooltipModule
  ]
})
export class MaterialModule {}
