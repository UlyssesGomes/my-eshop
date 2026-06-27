import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { PasswordModule } from 'primeng/password';

import { ContentPanel } from '../../shared/components/content-panel/content-panel';
import { EmailValidator } from '../../shared/validators/email/email-validator';
import { emailRegex } from '../../shared/utils/email-regex';
import { ErrorReaderPipe } from '../../shared/pipes/error-reader/error-reader-pipe';
import { FieldConfirmValidator } from '../../shared/validators/confirm-field/field-confirm-validator';
import { NewUserService } from './new-user-service';

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

  private readonly customEmailRegex = emailRegex;

  constructor(private readonly fb: FormBuilder, private messageService: MessageService, private readonly newUserService: NewUserService, private readonly router: Router) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(250), Validators.minLength(10)]],
      email: ['', [Validators.required, new EmailValidator(this.customEmailRegex).validate(), new FieldConfirmValidator('confirmEmail').validate()]],
      confirmEmail: ['', [Validators.required, new EmailValidator(this.customEmailRegex).validate(), new FieldConfirmValidator('email').validate()]],
      password: ['', [Validators.required, Validators.minLength(7), new FieldConfirmValidator('confirmPassword').validate()]],
      confirmPassword: ['', [Validators.required, Validators.minLength(7), new FieldConfirmValidator('password').validate()]]
    });
  }

  save() {
    const newUser = this.extractDataFromForm(this.form.value); 
    this.newUserService.create(newUser).subscribe({
      next: (response) => {
        this.messageService.add(
            { severity: 'success', summary: 'Criado Com Sucesso', detail: `Cadastro de ${response.name} realizado com sucesso.`, life: 5000 }
        );
        this.form.reset();
        this.router.navigate(['login']);
      },
      error: (error) => {
        this.messageService.add(
            { severity: 'error', summary: error.title, detail: error.description, life: 5000 }
        );
      }
    });
  }

  private extractDataFromForm(valueObject: any) {
    const { name, email, password } = valueObject;
    const outputObject = { name, email, password };
    return outputObject;
  }
}
