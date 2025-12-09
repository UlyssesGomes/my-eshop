import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';

import { UserAddressesCommonForm } from '../../../shared/components/user-addresses-common-form/user-addresses-common-form';

@Component({
  selector: 'app-address',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ButtonModule, UserAddressesCommonForm],
  templateUrl: './address.html',
  styleUrl: './address.scss'
})
export class Address {
  form: FormGroup;

  constructor(private readonly fb: FormBuilder, private readonly http: HttpClient, private messageService: MessageService) {
    this.form = this.fb.group({
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

  }
}
