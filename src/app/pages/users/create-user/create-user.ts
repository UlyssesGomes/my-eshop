import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { SelectModule } from 'primeng/select';

import { provideNgxMask } from 'ngx-mask';

import { ContentPanel } from '../../../shared/components/content-panel/content-panel';
import { CpfValidator } from '../../../shared/validators/cpf/cpf-validator';
import { ErrorReaderPipe } from '../../../shared/pipes/error-reader/error-reader-pipe';
import { EmailValidator } from '../../../shared/validators/email/email-validator';
import { UserType } from '../../../shared/enums/user-type';
import { UserCommonForm } from '../../../shared/components/user-common-form/user-common-form';

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
    UserCommonForm
  ],
  templateUrl: './create-user.html',
  styleUrl: './create-user.scss'
})
export class CreateUser {

  form!: FormGroup;

  userTypes = [
    { type: 'Proprietário', value: UserType.OWNER },
    { type: 'Administrador', value: UserType.ADMIN },
    { type: 'Funcionário', value: UserType.EMPLOYEE },
    { type: 'Consumidor', value: UserType.CUSTOMER }
  ];

  private readonly emailRegex = /^[a-zA-Z0-9._&$#%+\-]+@[a-zA-Z0-9\-]+(\.[a-zA-Z0-9\-]+)+$/;

  constructor(private readonly fb: FormBuilder, private readonly http: HttpClient, private messageService: MessageService) {
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

  save() {
    console.log('Salvando usuário: ', this.form.value);
    
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
