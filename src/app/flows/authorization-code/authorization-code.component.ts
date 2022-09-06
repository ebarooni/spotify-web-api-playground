import { Component, OnInit } from '@angular/core';
import {AuthorizationCodeService} from "./authorization-code.service";
import {AuthCredentialsStore} from "../../header/input-form/auth-credentials.store";
import {ActivatedRoute} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {AuthorizationCodeDialogComponent} from "./authorization-code-dialog/authorization-code-dialog.component";
import {AccessTokenRequestService, AccessTokenResponse} from "./access-token-request.service";
import {Observable} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";

export interface AuthorizationCodeResponse {
  code: string,
  state: string
}

export interface AuthorizationCodeError {
  error: string,
  state: string
}

@Component({
  selector: 'app-authorization-code',
  templateUrl: './authorization-code.component.html',
  styleUrls: ['./authorization-code.component.scss'],
  providers: [AuthorizationCodeService, AccessTokenRequestService]
})
export class AuthorizationCodeComponent implements OnInit {
  apiResponse$?: Observable<AccessTokenResponse | HttpErrorResponse>;
  readonly credentials$ = this.authCredentialsStore.authCredentialsStore;
  dataFirstStep?: AuthorizationCodeResponse | AuthorizationCodeError;
  codeVerifier?: string | null;
  disableHttpRequest = true;
  requestPacket = {
    code: '',
    codeVerifier: ''
  };

  constructor(
    readonly authorizationCodeService: AuthorizationCodeService,
    readonly accessTokenRequestService: AccessTokenRequestService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly authCredentialsStore: AuthCredentialsStore,
    private readonly dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      const code = params['code'];
      const error = params['error'];
      const state = params['state'];
      if (code) {
        this.disableHttpRequest = false;
        this.dataFirstStep = <AuthorizationCodeResponse>{
          code: code,
          state: state
        };
        this.requestPacket = {
          code: code,
          codeVerifier: state
        };
        this.codeVerifier = localStorage.getItem('code_verifier_authorization_code') ? localStorage.getItem('code_verifier_authorization_code') : null;
        this.authorizationCodeService.clearBrowserUrl();
        this.openDialog();
      } else if (error) {
        this.dataFirstStep = <AuthorizationCodeError>{
          error: error,
          state: state
        };
        this.openDialog();
      }
    });
  }

  sendHttpPostRequest(clientId: string, clientSecret: string): void {
    this.apiResponse$ = this.accessTokenRequestService.sendAuthRequest(
      clientId, clientSecret, this.requestPacket.code, this.requestPacket.codeVerifier
    );
  }

  private openDialog(): void {
    this.dialog.open(AuthorizationCodeDialogComponent);
  }

}
