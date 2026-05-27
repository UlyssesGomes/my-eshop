import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { PasswordModule } from 'primeng/password';
import { take } from 'rxjs';

import { AuthenticationService } from '../../shared/services/auth/authentication.service';
import { EmailValidator } from '../../shared/validators/email/email-validator';
import { ErrorReaderPipe } from '../../shared/pipes/error-reader/error-reader-pipe';
import { LocalStoageKey } from '../../shared/enums/localstorage-key';
import { TokenUtils } from '../../shared/utils/token-utils';


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
    ErrorReaderPipe,
    RouterLink
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {

  private readonly emailRegex = /^[a-zA-Z0-9._&$#%+\-]+@[a-zA-Z0-9\-]+(\.[a-zA-Z0-9\-]+)+$/;
  form: FormGroup;


  constructor(private fb: FormBuilder, private readonly authentication: AuthenticationService, private messageService: MessageService, private readonly router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, new EmailValidator(this.emailRegex).validate()]],
      password: ['', [Validators.required, Validators.minLength(7)]]
    });
  }

  submit() {
    this.authentication.login(this.form.value.email, this.form.value.password).pipe(take(1)).subscribe({
      next: response => {
        this.messageService.add(
          { severity: 'success', summary: 'Autorizado', detail: `Login realizado com sucesso.`, life: 5000 }
        );
        TokenUtils.receiveJwtToken(response.accessToken);
        this.form.reset();
        this.router.navigate(['/']);
      },
      error: (e) => {
        this.messageService.add(
          { severity: 'error', summary: 'Não Autorizado', detail: `Email ou Senha incorretos.`, life: 5000 }
        );
      }
    });
  }
}
