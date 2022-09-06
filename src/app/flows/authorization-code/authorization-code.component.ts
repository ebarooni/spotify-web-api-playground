import { Component, OnInit } from '@angular/core';
import {AuthorizationCodeService} from "./authorization-code.service";
import {AuthCredentialsStore} from "../../header/input-form/auth-credentials.store";
import {ActivatedRoute} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {AuthorizationCodeDialogComponent} from "./authorization-code-dialog/authorization-code-dialog.component";

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
  providers: [AuthorizationCodeService]
})
export class AuthorizationCodeComponent implements OnInit {
  readonly credentials$ = this.authCredentialsStore.authCredentialsStore;
  dataFirstStep?: AuthorizationCodeResponse | AuthorizationCodeError;
  codeVerifier?: string | null;
  disableHttpRequest = true;

  constructor(
    readonly authorizationCodeService: AuthorizationCodeService,
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

  private openDialog(): void {
    this.dialog.open(AuthorizationCodeDialogComponent);
  }

}
