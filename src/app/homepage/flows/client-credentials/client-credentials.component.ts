import { Component, OnInit } from '@angular/core';
import {AccessTokenResponse, ClientCredentialsService} from "./client-credentials.service";
import {AuthCredentialsStore} from "../../header/input-form/auth-credentials.store";
import {Observable} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-client-credentials',
  templateUrl: './client-credentials.component.html',
  styleUrls: ['./client-credentials.component.scss'],
  providers: [ClientCredentialsService]
})
export class ClientCredentialsComponent implements OnInit {
  apiResponse$?: Observable<AccessTokenResponse | HttpErrorResponse>;
  readonly credentials$ = this.authCredentialsStore.authCredentialsStore;

  constructor(
    private readonly clientCredentialsService: ClientCredentialsService,
    private readonly authCredentialsStore: AuthCredentialsStore
  ) { }

  ngOnInit(): void {
  }

  sendHttpPostRequest(clientId: string, clientSecret: string): void {
    this.apiResponse$ = this.clientCredentialsService.sendAuthRequest(clientId, clientSecret);
  }

}
