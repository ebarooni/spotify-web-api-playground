import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AuthCredentialsStore} from "../../header/input-form/auth-credentials.store";
import {ImplicitGrantService} from "./implicit-grant.service";
import {filter, map} from "rxjs";

export interface ImplicitGrantResponse {
  access_token: string,
  token_type: string,
  expires_in: string,
  state: string
}

export interface ImplicitGrantError {
  error: string,
  state: string
}

@Component({
  selector: 'app-implicit-grant',
  templateUrl: './implicit-grant.component.html',
  styleUrls: ['./implicit-grant.component.scss'],
  providers: [ImplicitGrantService]
})
export class ImplicitGrantComponent implements OnInit {
  readonly credentials$ = this.authCredentialsStore.authCredentialsStore;
  data?: ImplicitGrantResponse | ImplicitGrantError;
  codeVerifier?: string | null;

  constructor(
    readonly implicitGrantService: ImplicitGrantService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly authCredentialsStore: AuthCredentialsStore
  ) { }

  ngOnInit(): void {
    this.activatedRoute.fragment
      .pipe(
        filter(fragment => fragment !== null),
        map(fragment => {
          if (fragment !== null) {
            return new URLSearchParams(fragment);
          } else {
            return null;
          }
        }),
        filter(fragment => fragment !== null && (<string>fragment.get('access_token') !== null))
      )
      .subscribe(fragment => {
      if (fragment !== null) {
        this.data = {
          access_token: fragment.get('access_token')!,
          token_type: fragment.get('token_type')!,
          expires_in: fragment.get('expires_in')!,
          state: fragment.get('state')!
        };
        this.codeVerifier = localStorage.getItem('code_verifier') ? localStorage.getItem('code_verifier') : null;
        this.implicitGrantService.clearBrowserUrl();
      }
    });
    this.activatedRoute.queryParams.subscribe(params => {
      const error = params['error'];
      const state = params['state'];
      if (error) {
        this.data = {
          error: error,
          state: state
        };
        this.codeVerifier = localStorage.getItem('code_verifier') ? localStorage.getItem('code_verifier') : null;
        this.implicitGrantService.clearBrowserUrl();
      }
    });
  }

}
