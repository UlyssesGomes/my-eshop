import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';

import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

import { ErrorReaderPipe } from '../../pipes/error-reader/error-reader-pipe';

@Component({
  selector: 'app-user-info-common-form',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DatePickerModule,
    FloatLabelModule,
    InputNumberModule,
    InputTextModule,
    ErrorReaderPipe,
    MessageModule,
    NgxMaskDirective
  ],
  templateUrl: './user-info-common-form.html',
  styleUrl: './user-info-common-form.scss',
  providers: [provideNgxMask()]
})
export class UserInfoCommonForm {
  @Input()
  form!: FormGroup;

  maxDate = new Date();

  phoneMask: string = '(99) 9 9999-9999';

}
