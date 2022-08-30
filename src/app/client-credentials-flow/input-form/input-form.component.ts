import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";

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

  constructor(private readonly fb: FormBuilder) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log(this.apiSecretsFormGroup.value);
  }

}
