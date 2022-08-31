import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthCredentialsRepository} from "./auth-credentials.repository";
import {take} from "rxjs";

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss']
})
export class InputFormComponent implements OnInit {
  apiSecretsFormGroup = this.fb.group({
    clientId: ['', [Validators.minLength(5), Validators.required]],
    clientSecret: ['', [Validators.minLength(5), Validators.required]]
  })

  constructor(
    private readonly fb: FormBuilder,
    private readonly authCredentialsRepository: AuthCredentialsRepository
  ) { }

  ngOnInit(): void {
    this.authCredentialsRepository.authCredentialsStore
      .pipe(
        take(1)
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
    }
  }

}
