import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserCommonForm } from '../../../shared/components/user-common-form/user-common-form';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmailValidator } from '../../../shared/validators/email/email-validator';
import { CpfValidator } from '../../../shared/validators/cpf/cpf-validator';

@Component({
  selector: 'app-personal-info',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, UserCommonForm],
  templateUrl: './personal-info.html',
  styleUrl: './personal-info.scss'
})
export class PersonalInfo {

  form: FormGroup;

  private readonly emailRegex = /^[a-zA-Z0-9._&$#%+\-]+@[a-zA-Z0-9\-]+(\.[a-zA-Z0-9\-]+)+$/;

  constructor(private readonly fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(10)]],
      type: [0, [Validators.required]],
      cpf: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(14), new CpfValidator().validate()]],
      birth: [null, []],
      email: ['', [Validators.required, Validators.maxLength(255), new EmailValidator(this.emailRegex).validate()]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(11)]],
      addresses: this.fb.array([
        this.fb.group(
          {
            cep: ['', [Validators.required]],
            street: ['', [Validators.required, Validators.maxLength(60)]],
            number: ['', [Validators.required, Validators.minLength(1)]],
            complement: ['', [Validators.maxLength(20)]],
            neighborhood: ['', [Validators.required, Validators.maxLength(40)]],
            city: ['', [Validators.required, Validators.maxLength(40)]],
            state: ['', [Validators.required, Validators.maxLength(20)]]
          })])
    });
  }
}
