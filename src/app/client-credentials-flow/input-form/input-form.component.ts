import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthCredentialsProps, AuthCredentialsRepository} from "./auth-credentials.repository";
import {filter, take} from "rxjs";

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss']
})
export class InputFormComponent implements OnInit {
  @Output() authCredentialsPropsEventEmitter = new EventEmitter<AuthCredentialsProps>();
  apiSecretsFormGroup = this.fb.group({
    clientId: ['', [Validators.required]],
    clientSecret: ['', [Validators.required]]
  })

  constructor(
    private readonly fb: FormBuilder,
    private readonly authCredentialsRepository: AuthCredentialsRepository
  ) { }

  ngOnInit(): void {
    this.authCredentialsRepository.authCredentialsStore
      .pipe(
        take(1),
        filter(state => state.clientId !== null && state.clientSecret !== null)
      )
      .subscribe(
        state => {
          this.apiSecretsFormGroup.get('clientId')?.setValue(state.clientId);
          this.apiSecretsFormGroup.get('clientSecret')?.setValue(state.clientSecret);
        }
      )
  }

  onSubmit(): void {
    if (this.apiSecretsFormGroup.value.clientId && this.apiSecretsFormGroup.value.clientSecret) {
      this.authCredentialsRepository
        .batchUpdateClientIdAndClientSecret(
          this.apiSecretsFormGroup.value.clientId,
          this.apiSecretsFormGroup.value.clientSecret
        );
      this.authCredentialsPropsEventEmitter.emit(<AuthCredentialsProps>this.apiSecretsFormGroup.value);
    }
  }

}
