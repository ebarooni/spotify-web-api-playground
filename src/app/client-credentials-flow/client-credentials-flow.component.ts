import { Component, OnInit } from '@angular/core';
import {ClientCredentialsFlowService} from "./client-credentials-flow.service";
import {AuthCredentialsProps} from "../auth-credentials.repository";
import {AccessTokenProps, AccessTokenRepository} from "./access-token.repository";
import {filter, map} from "rxjs";
import * as moment from "moment";

@Component({
  selector: 'app-client-credentials-flow',
  templateUrl: './client-credentials-flow.component.html',
  styleUrls: ['./client-credentials-flow.component.scss'],
  providers: [ClientCredentialsFlowService, AccessTokenRepository]
})
export class ClientCredentialsFlowComponent implements OnInit {
  readonly spotifyAccessToken$ = this.accessTokenRepository.accessTokenStore
    .pipe(
      filter(token => token.access_token !== null),
      filter(token => moment(token.expires_in).isAfter(moment.now())),
      map(token =>
        <AccessTokenProps>{
        access_token: token.access_token,
          expires_in: token.expires_in? (token.expires_in - moment.now()) / 1000 : token.expires_in,
          token_type: token.token_type}
      )
    );
  readonly errorHandler$ = this.clientCredentialsFlowService.errorHandlerSubject$;

  constructor(
    private readonly accessTokenRepository: AccessTokenRepository,
    private readonly clientCredentialsFlowService: ClientCredentialsFlowService
  ) { }

  ngOnInit(): void {
  }

  sendHttpPostRequest(event: AuthCredentialsProps): void {
    if (event.clientId && event.clientSecret) {
      this.clientCredentialsFlowService.sendAuthRequest(event.clientId, event.clientSecret);
    }
  }

}
