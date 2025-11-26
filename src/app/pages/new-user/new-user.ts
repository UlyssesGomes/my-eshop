import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { PasswordModule } from 'primeng/password';

import { ContentPanel } from '../../shared/components/content-panel/content-panel';
import { EmailValidator } from '../../shared/validators/email/email-validator';
import { ErrorReaderPipe } from '../../shared/pipes/error-reader/error-reader-pipe';
import { FieldConfirmValidator } from '../../shared/validators/confirm-field/field-confirm-validator';
import { UserService } from '../users/user-service';
import { take } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-new-user',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    ContentPanel,
    FloatLabelModule,
    ErrorReaderPipe,
    InputTextModule,
    MessageModule,
    PasswordModule
  ],
  templateUrl: './new-user.html',
  styleUrl: './new-user.scss'
})
export class NewUser {

  form!: FormGroup;

  private readonly emailRegex = /^[a-zA-Z0-9._&$#%+\-]+@[a-zA-Z0-9\-]+(\.[a-zA-Z0-9\-]+)+$/;

  constructor(private readonly fb: FormBuilder, private readonly service: UserService, private messageService: MessageService) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(250), Validators.minLength(10)]],
      email: ['', [Validators.required, new EmailValidator(this.emailRegex).validate(), new FieldConfirmValidator('confirmEmail').validate()]],
      confirmEmail: ['', [Validators.required, new EmailValidator(this.emailRegex).validate(), new FieldConfirmValidator('email').validate()]],
      password: ['', [Validators.required, Validators.minLength(7), new FieldConfirmValidator('confirmPassword').validate()]],
      confirmPassword: ['', [Validators.required, Validators.minLength(7), new FieldConfirmValidator('password').validate()]]
    });
  }

  save() {
    const newUser = this.extractDataFromForm(this.form.value); 
    this.service.createNewCustomer(newUser).pipe(take(1)).subscribe(response => this.messageService.add(
      { severity: 'success', summary: 'Criado Com Sucesso', detail: `Cadastro de ${response.name} realizado com sucesso.` }
    ));
    this.form.reset();
  }

  private extractDataFromForm(valueObject: any) {
    const { name, email, password } = valueObject;
    const outputObject = { name, email, password };
    return outputObject;
  }
}
