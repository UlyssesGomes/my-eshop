import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { PasswordModule } from 'primeng/password';

import { EmailValidator } from '../../shared/validators/email/email-validator';
import { ErrorReaderPipe } from '../../shared/pipes/error-reader/error-reader-pipe';


@Component({
  selector: 'app-login',
  imports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule,
    ButtonModule,
    DividerModule,
    FloatLabelModule, 
    InputTextModule, 
    PasswordModule, 
    MessageModule, 
    ErrorReaderPipe
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {

  private readonly emailRegex = /^[a-zA-Z0-9._&$#%+\-]+@[a-zA-Z0-9\-]+(\.[a-zA-Z0-9\-]+)+$/g; 
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', [Validators.required, new EmailValidator(this.emailRegex).validate()]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  submit() {
    window.alert('Logado com sucesso.');
  }
}
