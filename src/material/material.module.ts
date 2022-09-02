import {NgModule} from "@angular/core";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FontAwesomeModule,
    MatButtonModule,
    MatTooltipModule,
    MatDividerModule,
    MatIconModule
  ],
  exports: [
    BrowserAnimationsModule,
    FontAwesomeModule,
    MatButtonModule,
    MatTooltipModule,
    MatDividerModule,
    MatIconModule
  ]
})
export class MaterialModule {}
