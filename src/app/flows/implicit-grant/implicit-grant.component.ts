import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AuthCredentialsStore} from "../../header/input-form/auth-credentials.store";
import {ImplicitGrantService} from "./implicit-grant.service";

@Component({
  selector: 'app-implicit-grant',
  templateUrl: './implicit-grant.component.html',
  styleUrls: ['./implicit-grant.component.scss'],
  providers: [ImplicitGrantService]
})
export class ImplicitGrantComponent implements OnInit {
  readonly credentials$ = this.authCredentialsStore.authCredentialsStore;

  constructor(
    readonly implicitGrantService: ImplicitGrantService,
    private readonly route: ActivatedRoute,
    private readonly authCredentialsStore: AuthCredentialsStore
  ) { }

  ngOnInit(): void {
    this.route.fragment.subscribe(fragment => {
      if (fragment !== null) {
        const hashFragments = new URLSearchParams(fragment);
        console.table({
          access_token: hashFragments.get('access_token'),
          token_type: hashFragments.get('token_type'),
          expires_in: hashFragments.get('expires_in'),
          state: hashFragments.get('state')
        });
      }
    })
  }

}
