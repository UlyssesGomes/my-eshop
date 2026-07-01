import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { PasswordModule } from 'primeng/password';

import { emailRegex } from '../../../shared/utils/email-regex';
import { ErrorReaderPipe } from '../../../shared/pipes/error-reader/error-reader-pipe';
import { UserProfileService } from '../user-profile.service';
import { EmailValidator } from '../../../shared/validators/email/email-validator';
import { FieldConfirmValidator } from '../../../shared/validators/confirm-field/field-confirm-validator';
import { NotificationService } from '../../../shared/services/notification/notification.service';
import { TokenUtils } from '../../../shared/utils/token-utils';

@Component({
  selector: 'app-change-email',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    ConfirmDialogModule,
    FloatLabelModule,
    MessageModule,
    PasswordModule,
    InputTextModule,
    ErrorReaderPipe,
  ],
  templateUrl: './change-email.html',
  styleUrl: './change-email.scss'
})
export class ChangeEmail {

  form: FormGroup;

  private readonly customEmailRegex = emailRegex;

  constructor(
    private readonly fb: FormBuilder,
    private readonly userProfileService: UserProfileService,
    private readonly messageService: NotificationService,
    private readonly confirmationService: ConfirmationService,
    private readonly router: Router) {
    this.form = this.fb.group({
      'password': ['', [Validators.required, Validators.minLength(7)]],
      'newEmail': ['', [Validators.required, new EmailValidator(this.customEmailRegex).validate(), new FieldConfirmValidator('confirmNewEmail').validate()]],
      'confirmNewEmail': ['', [Validators.required, new EmailValidator(this.customEmailRegex).validate(), new FieldConfirmValidator('newEmail').validate()]]
    });
  }

  save(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Você tem certeza que deseja mudar o email? Após a mudança, um novo login deve ser realizado.',
      header: 'Atenção!',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true
      },
      acceptButtonProps: {
        label: 'Alterar',
        severity: 'primary'
      },

      accept: () => {
        this.userProfileService.updateEmail(this.form.value).subscribe({
          next: () => {
            this.messageService.success('Atualizado', 'Email atualizado com sucesso.');
            this.form.reset();
            TokenUtils.clearUserAndToken();
            this.router.navigate(['login']);
          },
          error: (error) => { this.messageService.error(error.title, error.description); }
        });
      },
      reject: () => {
        this.messageService.warning('Cancelado', 'Operação de remoção cancelada.');
      }
    });
  }
}
