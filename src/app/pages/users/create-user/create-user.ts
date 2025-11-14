import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';

import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

import { ContentPanel } from '../../../shared/components/content-panel/content-panel';
import { ErrorReaderPipe } from '../../../shared/pipes/error-reader/error-reader-pipe';
import { EmailValidator } from '../../../shared/validators/email/email-validator';
import { UserType } from '../../../shared/enums/user-type';
import { CpfValidator } from '../../../shared/validators/cpf/cpf-validator';

@Component({
  selector: 'app-create-user',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    ContentPanel,
    DatePickerModule,
    ErrorReaderPipe,
    FloatLabelModule,
    InputNumberModule,
    InputTextModule,
    MessageModule,
    SelectModule,
    NgxMaskDirective
  ],
  templateUrl: './create-user.html',
  styleUrl: './create-user.scss',
  providers: [provideNgxMask()]
})
export class CreateUser {

  form!: FormGroup;

  maxDate = new Date();
  phoneMask: string = '(99) 9 9999-9999';

  userTypes = [
    { type: 'Proprietário', value: UserType.OWNER },
    { type: 'Administrador', value: UserType.ADMIN },
    { type: 'Funcionário', value: UserType.EMPLOYEE },
    { type: 'Consumidor', value: UserType.CUSTOMER }
  ];

  private readonly emailRegex = /^[a-zA-Z0-9._&$#%+\-]+@[a-zA-Z0-9\-]+(\.[a-zA-Z0-9\-]+)+$/;

  constructor(private readonly fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(250), Validators.minLength(10)]],
      type: [0, [Validators.required]],
      cpf: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(14), new CpfValidator().validate()]],
      birth: [null, [Validators.required]],
      email: ['', [Validators.required, new EmailValidator(this.emailRegex).validate()]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(11)]]
    })
  }

  save() {
    console.log('Salvando usuário: ', this.form.value);
    this.form.reset();
  }
}
