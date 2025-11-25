import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { ButtonModule } from 'primeng/button';

import { ContentPanel } from '../../shared/components/content-panel/content-panel';
import { CpfValidator } from '../../shared/validators/cpf/cpf-validator';
import { EmailValidator } from '../../shared/validators/email/email-validator';
import { UserCommonForm } from '../../shared/components/user-common-form/user-common-form';

@Component({
  selector: 'app-new-user',
  imports: [ CommonModule, FormsModule, ReactiveFormsModule, ButtonModule, ContentPanel, UserCommonForm ],
  templateUrl: './new-user.html',
  styleUrl: './new-user.scss'
})
export class NewUser {

  form!: FormGroup;

  private readonly emailRegex = /^[a-zA-Z0-9._&$#%+\-]+@[a-zA-Z0-9\-]+(\.[a-zA-Z0-9\-]+)+$/;

  constructor(private readonly fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(250), Validators.minLength(10)]],
      cpf: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(14), new CpfValidator().validate()]],
      birth: [null, []],
      email: ['', [Validators.required, new EmailValidator(this.emailRegex).validate()]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(11)]],
      addresses: this.fb.array([
        this.fb.group(
          {
            cep: ['', [Validators.required]],
            street: ['', [Validators.required, Validators.maxLength(60)]],
            number: ['', [Validators.required, Validators.minLength(1)]],
            complement: ['', [Validators.maxLength(20)]],
            neighborhood: ['', [Validators.required, Validators.maxLength(20)]],
            city: ['', [Validators.required, Validators.maxLength(20)]],
            state: ['', [Validators.required, Validators.maxLength(20)]]
          })])
    });
  }

  save() {
    console.log('Salvendo: ', this.form.value);
    let formArray: FormArray = this.form.get('addresses') as FormArray;
    if(formArray.length > 1) {
      const formArrayLength = formArray.length - 1;
      for(let u = 0; u < formArrayLength; u++) {
        formArray.removeAt(1);
      }
    }
    this.form.reset();
  }
}
