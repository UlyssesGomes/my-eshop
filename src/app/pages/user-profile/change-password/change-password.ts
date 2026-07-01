import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { MessageModule } from 'primeng/message';
import { PasswordModule } from 'primeng/password';

import { ErrorReaderPipe } from '../../../shared/pipes/error-reader/error-reader-pipe';
import { FieldConfirmValidator } from '../../../shared/validators/confirm-field/field-confirm-validator';
import { NotificationService } from '../../../shared/services/notification/notification.service';
import { UserProfileService } from '../user-profile.service';

@Component({
  selector: 'app-change-password',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    FloatLabelModule,
    MessageModule,
    PasswordModule,
    ErrorReaderPipe
  ],
  templateUrl: './change-password.html',
  styleUrl: './change-password.scss'
})
export class ChangePassword {

  form!: FormGroup;

  constructor(private readonly fb: FormBuilder, private readonly userProfileService: UserProfileService, private readonly message: NotificationService) {
    this.form = this.fb.group({
      'oldPassword': ['', [Validators.required, Validators.minLength(7)]],
      'newPassword': ['', [Validators.required, Validators.minLength(7), new FieldConfirmValidator('passwordConfirm').validate()]],
      'passwordConfirm': ['', [Validators.required, Validators.minLength(7), new FieldConfirmValidator('newPassword').validate()]]
    });
  }

  public save() {
    this.userProfileService.updatePassword(this.form.value).subscribe({
      next: () => {
        this.message.success('Atualizado', 'Senha atualizada com sucesso.');
        this.form.reset();
      },
      error: error => this.message.error(error.title, error.description)
    });
  }
}
