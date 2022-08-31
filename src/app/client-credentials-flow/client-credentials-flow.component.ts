import { Component, OnInit } from '@angular/core';
import {ClientCredentialsFlowService, ClientCredentialsFlowResponse} from "./client-credentials-flow.service";
import {Observable} from "rxjs";
import {AuthCredentialsProps} from "./input-form/auth-credentials.repository";

@Component({
  selector: 'app-client-credentials-flow',
  templateUrl: './client-credentials-flow.component.html',
  styleUrls: ['./client-credentials-flow.component.scss'],
  providers: [ClientCredentialsFlowService]
})
export class ClientCredentialsFlowComponent implements OnInit {
  spotifyAccessToken$?: Observable<ClientCredentialsFlowResponse>;
  readonly errorHandler$ = this.clientCredentialsFlowService.errorHandlerSubject$;

  constructor(readonly clientCredentialsFlowService: ClientCredentialsFlowService) { }

  ngOnInit(): void {
  }

  sendHttpPostRequest(event: AuthCredentialsProps): void {
    if (event.clientId && event.clientSecret) {
      this.spotifyAccessToken$ = this.clientCredentialsFlowService.sendAuthRequest(event.clientId, event.clientSecret);
    }
  }

}
