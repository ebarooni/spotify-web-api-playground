import { Component } from '@angular/core';
import {ClientCredentialsService} from "./client-credentials.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  readonly tableColumns: string[] = ['Access token', 'Expires in', 'Token type'];
  readonly spotifyAccessToken$ = this.clientCredentialsService.sendAuthRequest();

  constructor(readonly clientCredentialsService: ClientCredentialsService) { }
}
