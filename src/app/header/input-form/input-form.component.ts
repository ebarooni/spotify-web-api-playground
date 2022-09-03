import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthCredentialsStore} from "./auth-credentials.store";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss'],
  providers: [AuthCredentialsStore]
})
export class InputFormComponent implements OnInit {
  private readonly initScope: string[] = [];
  readonly availableScopes = [
    'ugc-image-upload',
    'user-modify-playback-state',
    'user-follow-modify',
    'user-read-recently-played',
    'user-read-playback-position',
    'playlist-read-collaborative',
    'app-remote-control',
    'user-read-playback-state',
    'user-read-email',
    'streaming',
    'user-top-read',
    'playlist-modify-public',
    'user-library-modify',
    'user-follow-read',
    'user-read-currently-playing',
    'user-library-read',
    'playlist-read-private',
    'user-read-private',
    'playlist-modify-private'
  ];
  apiCredentialsFormGroup = this.fb.group({
    clientId: ['', [Validators.required]],
    clientSecret: ['', [Validators.required]],
    scope: [this.initScope,]
  });
  private readonly subs = new Subscription();

  constructor(
    private readonly fb: FormBuilder,
    private readonly authCredentialsStore: AuthCredentialsStore
  ) { }

  ngOnInit(): void {
    this.subs.add(
      this.authCredentialsStore.authCredentialsStore
        .subscribe(
          state => {
            this.apiCredentialsFormGroup.get('clientId')?.setValue(state.clientId);
            this.apiCredentialsFormGroup.get('clientSecret')?.setValue(state.clientSecret);
            this.apiCredentialsFormGroup.get('scope')?.setValue(state.scope);
          }
        )
    );
  }

  onSubmit(): void {
    if (this.apiCredentialsFormGroup.value.clientId && this.apiCredentialsFormGroup.value.clientSecret) {
      this.authCredentialsStore
        .updateAuthCredentialsStore(
          this.apiCredentialsFormGroup.value.clientId,
          this.apiCredentialsFormGroup.value.clientSecret,
          this.apiCredentialsFormGroup.value.scope ? this.apiCredentialsFormGroup.value.scope : []
        );
    }
  }

  resetAuthCredentialsStore(): void {
    this.authCredentialsStore.updateAuthCredentialsStore(null, null, []);
  }

}
